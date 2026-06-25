<?php

declare(strict_types=1);

define('TARGET_DIR', __DIR__ . '/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024);
define('META_FILE', TARGET_DIR . '.meta.json');

header('Content-Type: application/json; charset=utf-8');

if (!is_dir(TARGET_DIR)) {
    mkdir(TARGET_DIR, 0775, true);
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function normalizeFileName(string $name): string
{
    $clean = trim(basename($name));
    $clean = preg_replace('/[^A-Za-z0-9._-]/', '_', $clean) ?? '';
    $clean = ltrim($clean, '.');

    return $clean === '' ? 'file' : $clean;
}

function buildUniqueTargetPath(string $baseName): array
{
    $ext = pathinfo($baseName, PATHINFO_EXTENSION);
    $nameOnly = pathinfo($baseName, PATHINFO_FILENAME);
    $suffix = 0;
    $candidate = $baseName;

    while (file_exists(TARGET_DIR . $candidate)) {
        $suffix += 1;
        $candidate = $nameOnly . '-' . $suffix . ($ext !== '' ? '.' . $ext : '');
    }

    return [$candidate, TARGET_DIR . $candidate];
}

/**
 * @return list<string>
 */
function getStorageFiles(): array
{
    $entries = scandir(TARGET_DIR) ?: [];
    $files = [];

    foreach ($entries as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }
        if (str_starts_with($entry, '.')) {
            continue;
        }
        if (!is_file(TARGET_DIR . $entry)) {
            continue;
        }
        $files[] = $entry;
    }

    sort($files);
    return $files;
}

/**
 * @return array<string, array<string, scalar|null>>
 */
function readMeta(): array
{
    if (!is_file(META_FILE)) {
        return [];
    }

    $raw = file_get_contents(META_FILE);
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return [];
    }

    $meta = [];
    foreach ($decoded as $id => $payload) {
        if (!is_string($id) || !is_array($payload)) {
            continue;
        }

        $cleanId = normalizeFileName($id);
        $record = [];

        foreach ($payload as $key => $value) {
            if (!is_string($key)) {
                continue;
            }
            if (!is_scalar($value) && $value !== null) {
                continue;
            }
            $record[$key] = $value;
        }

        $meta[$cleanId] = $record;
    }

    return $meta;
}

/**
 * @param array<string, array<string, scalar|null>> $meta
 */
function writeMeta(array $meta): void
{
    $json = json_encode($meta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (!is_string($json)) {
        respond(500, ['error' => 'Impossible de sérialiser les métadonnées.']);
    }

    if (file_put_contents(META_FILE, $json, LOCK_EX) === false) {
        respond(500, ['error' => 'Impossible d’enregistrer les métadonnées.']);
    }
}

/**
 * @param array<string, array<string, scalar|null>> $meta
 * @param list<string> $files
 * @return array<string, array<string, scalar|null>>
 */
function normalizeMetaForFiles(array $meta, array $files): array
{
    $sortable = [];

    foreach ($files as $fileName) {
        $record = $meta[$fileName] ?? [];
        $order = isset($record['order']) ? (int) $record['order'] : PHP_INT_MAX;
        $sortable[] = ['id' => $fileName, 'order' => max(1, $order)];
    }

    usort(
        $sortable,
        static fn(array $a, array $b): int => ($a['order'] <=> $b['order']) ?: strcmp($a['id'], $b['id'])
    );

    $normalized = [];
    foreach ($sortable as $index => $item) {
        $id = $item['id'];
        $record = $meta[$id] ?? [];
        $record['order'] = $index + 1;
        $normalized[$id] = $record;
    }

    return $normalized;
}

/**
 * @return array<string, array<string, scalar|null>>
 */
function syncMetaWithDisk(): array
{
    $files = getStorageFiles();
    $meta = normalizeMetaForFiles(readMeta(), $files);
    writeMeta($meta);
    return $meta;
}

function fileDataFromPath(string $fileName, array $meta): array
{
    $path = TARGET_DIR . $fileName;
    $mime = mime_content_type($path) ?: 'application/octet-stream';

    $base = [
        'id' => $fileName,
        'name' => $fileName,
        'size' => filesize($path),
        'type' => $mime,
        'updatedAt' => date('Y-m-d H:i', (int) filemtime($path)),
        'url' => 'uploads/' . rawurlencode($fileName),
    ];

    $record = $meta[$fileName] ?? [];
    foreach ($record as $key => $value) {
        if (!is_string($key)) {
            continue;
        }
        if (!is_scalar($value) && $value !== null) {
            continue;
        }
        $base[$key] = $value;
    }

    return $base;
}

/**
 * @param array<string, array<string, scalar|null>> $meta
 * @return array<string, array<string, scalar|null>>
 */
function reorderMeta(array $meta, string $targetId, int $targetOrder): array
{
    $ids = array_keys($meta);
    usort($ids, static function (string $a, string $b) use ($meta): int {
        $aOrder = (int) ($meta[$a]['order'] ?? PHP_INT_MAX);
        $bOrder = (int) ($meta[$b]['order'] ?? PHP_INT_MAX);
        return ($aOrder <=> $bOrder) ?: strcmp($a, $b);
    });

    $currentIndex = array_search($targetId, $ids, true);
    if ($currentIndex === false) {
        return $meta;
    }

    array_splice($ids, $currentIndex, 1);

    $maxPos = count($ids) + 1;
    $nextPos = min(max($targetOrder, 1), $maxPos);
    array_splice($ids, $nextPos - 1, 0, [$targetId]);

    $result = [];
    foreach ($ids as $index => $id) {
        $record = $meta[$id] ?? [];
        $record['order'] = $index + 1;
        $result[$id] = $record;
    }

    return $result;
}

/**
 * @return list<array{name:string,tmp_name:string,size:int,error:int}>
 */
function collectUploadedFiles(array $files): array
{
    $normalized = [];

    foreach ($files as $file) {
        if (!is_array($file)) {
            continue;
        }

        $names = $file['name'] ?? null;
        $tmpNames = $file['tmp_name'] ?? null;
        $sizes = $file['size'] ?? null;
        $errors = $file['error'] ?? null;

        if (is_array($names)) {
            foreach ($names as $index => $name) {
                $normalized[] = [
                    'name' => (string) $name,
                    'tmp_name' => (string) ($tmpNames[$index] ?? ''),
                    'size' => (int) ($sizes[$index] ?? 0),
                    'error' => (int) ($errors[$index] ?? UPLOAD_ERR_NO_FILE),
                ];
            }
            continue;
        }

        $normalized[] = [
            'name' => (string) ($names ?? ''),
            'tmp_name' => (string) ($tmpNames ?? ''),
            'size' => (int) ($sizes ?? 0),
            'error' => (int) ($errors ?? UPLOAD_ERR_NO_FILE),
        ];
    }

    return $normalized;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $meta = syncMetaWithDisk();
    $files = [];

    foreach (array_keys($meta) as $fileName) {
        if (!is_file(TARGET_DIR . $fileName)) {
            continue;
        }
        $files[] = fileDataFromPath($fileName, $meta);
    }

    usort(
        $files,
        static fn(array $a, array $b): int => ((int) ($a['order'] ?? PHP_INT_MAX) <=> (int) ($b['order'] ?? PHP_INT_MAX))
            ?: strcmp($b['updatedAt'], $a['updatedAt'])
    );

    respond(200, ['files' => $files]);
}

if ($method === 'POST') {
    // The front sends the full ordering as a JSON body { "order": [ids...] }.
    // Distinguish it from a multipart file upload by the Content-Type.
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (str_contains($contentType, 'application/json')) {
        $raw = file_get_contents('php://input') ?: '';
        $json = json_decode($raw, true);

        if (!is_array($json) || !isset($json['order']) || !is_array($json['order'])) {
            respond(400, ['error' => 'Payload invalide: order doit être un tableau.']);
        }

        $meta = syncMetaWithDisk();

        // Place the ids the front listed first, in the given order, ignoring
        // unknown or duplicated entries.
        $ordered = [];
        foreach ($json['order'] as $rawId) {
            if (!is_string($rawId)) {
                continue;
            }
            $fileName = normalizeFileName($rawId);
            if (isset($meta[$fileName]) && !in_array($fileName, $ordered, true)) {
                $ordered[] = $fileName;
            }
        }

        // Any file missing from the payload keeps its current relative position,
        // appended after the listed ones.
        foreach (array_keys($meta) as $fileName) {
            if (!in_array($fileName, $ordered, true)) {
                $ordered[] = $fileName;
            }
        }

        $result = [];
        foreach ($ordered as $index => $fileName) {
            $record = $meta[$fileName];
            $record['order'] = $index + 1;
            $result[$fileName] = $record;
        }

        writeMeta($result);

        $files = [];
        foreach (array_keys($result) as $fileName) {
            if (!is_file(TARGET_DIR . $fileName)) {
                continue;
            }
            $files[] = fileDataFromPath($fileName, $result);
        }

        respond(200, ['files' => $files]);
    }

    if (empty($_FILES)) {
        respond(400, ['error' => 'Aucun fichier transmis.']);
    }

    $uploads = collectUploadedFiles($_FILES);
    if ($uploads === []) {
        respond(400, ['error' => 'Payload invalide.']);
    }

    $savedFiles = [];

    foreach ($uploads as $upload) {
        if ($upload['error'] !== UPLOAD_ERR_OK) {
            respond(400, ['error' => 'Erreur upload (code ' . $upload['error'] . ').']);
        }

        $tmpPath = $upload['tmp_name'];
        $originalName = normalizeFileName($upload['name'] !== '' ? $upload['name'] : 'file');
        $size = $upload['size'];

        if ($size <= 0) {
            respond(400, ['error' => 'Fichier vide.']);
        }

        if ($size > MAX_FILE_SIZE) {
            respond(400, ['error' => 'Fichier trop volumineux (max 5 Mo).']);
        }

        if (!is_uploaded_file($tmpPath)) {
            respond(400, ['error' => 'Source upload invalide.']);
        }

        [$targetName, $targetPath] = buildUniqueTargetPath($originalName);

        if (!move_uploaded_file($tmpPath, $targetPath)) {
            respond(500, ['error' => 'Impossible de déplacer le fichier uploadé.']);
        }

        $savedFiles[] = $targetName;
    }

    $meta = syncMetaWithDisk();

    foreach ($savedFiles as $savedName) {
        if (!isset($meta[$savedName])) {
            $meta[$savedName] = ['order' => count($meta) + 1];
        }
    }

    $meta = normalizeMetaForFiles($meta, getStorageFiles());
    writeMeta($meta);

    respond(201, [
        'id' => $savedFiles[0],
        'file' => fileDataFromPath($savedFiles[0], $meta),
    ]);
}

if ($method === 'PATCH') {
    $raw = file_get_contents('php://input') ?: '';
    $json = json_decode($raw, true);

    if (!is_array($json) || !isset($json['id']) || !is_string($json['id'])) {
        respond(400, ['error' => 'Payload invalide: id requis.']);
    }

    $id = normalizeFileName($json['id']);
    if ($id === '' || !is_file(TARGET_DIR . $id)) {
        respond(404, ['error' => 'Fichier introuvable.']);
    }

    $changes = $json['changes'] ?? $json;
    if (!is_array($changes)) {
        respond(400, ['error' => 'Payload invalide: changes doit être un objet.']);
    }

    unset($changes['id'], $changes['changes']);

    $meta = syncMetaWithDisk();
    $record = $meta[$id] ?? ['order' => count($meta) + 1];

    $nextOrder = null;

    foreach ($changes as $key => $value) {
        if (!is_string($key)) {
            continue;
        }

        if ($key === 'order') {
            if (!is_int($value) && !is_string($value) && !is_float($value)) {
                respond(400, ['error' => 'Champ order invalide.']);
            }
            $nextOrder = max(1, (int) $value);
            continue;
        }

        if (!is_scalar($value) && $value !== null) {
            respond(400, ['error' => 'Valeur invalide pour ' . $key . '.']);
        }

        $record[$key] = $value;
    }

    $meta[$id] = $record;

    if ($nextOrder !== null) {
        $meta = reorderMeta($meta, $id, $nextOrder);
    } else {
        $meta = normalizeMetaForFiles($meta, getStorageFiles());
    }

    writeMeta($meta);

    respond(200, [
        'id' => $id,
        'file' => fileDataFromPath($id, $meta),
    ]);
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';

    if (trim($id) === '') {
        respond(400, ['error' => 'Identifiant manquant.']);
    }

    $fileName = normalizeFileName($id);
    $targetPath = TARGET_DIR . $fileName;

    if (!is_file($targetPath)) {
        respond(404, ['error' => 'Fichier introuvable.']);
    }

    if (!unlink($targetPath)) {
        respond(500, ['error' => 'Suppression impossible.']);
    }

    $meta = syncMetaWithDisk();
    unset($meta[$fileName]);
    $meta = normalizeMetaForFiles($meta, getStorageFiles());
    writeMeta($meta);

    respond(200, ['deleted' => $fileName]);
}

respond(405, ['error' => 'Méthode non autorisée.']);

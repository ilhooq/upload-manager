//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = class extends Error {
	cause;
	isNetworkError;
	request;
	constructor(e, t = null) {
		super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t;
	}
}, u = class {
	#e;
	#t = !1;
	#n;
	#r;
	constructor(e, t) {
		this.#r = e, this.#n = () => t(e);
	}
	progress() {
		this.#t || this.#r > 0 && (clearTimeout(this.#e), this.#e = setTimeout(this.#n, this.#r));
	}
	done() {
		this.#t ||= (clearTimeout(this.#e), this.#e = void 0, !0);
	}
}, d = () => {};
function f(e, t = {}) {
	let { body: n = null, headers: r = {}, method: i = "GET", onBeforeRequest: a = d, onUploadProgress: o = d, shouldRetry: s = () => !0, onAfterResponse: c = d, onTimeout: f = d, responseType: p, retries: m = 3, signal: h = null, timeout: g = 3e4, withCredentials: _ = !1 } = t, v = (e) => .3 * 2 ** (e - 1) * 1e3, y = new u(g, f);
	function b(t = 0) {
		return new Promise(async (u, d) => {
			let f = new XMLHttpRequest(), g = (e) => {
				s(f) && t < m ? setTimeout(() => {
					b(t + 1).then(u, d);
				}, v(t)) : (y.done(), d(e));
			};
			f.open(i, e, !0), f.withCredentials = _, p && (f.responseType = p), f.onload = async () => {
				try {
					await c(f, t);
				} catch (e) {
					e.request = f, g(e);
					return;
				}
				f.status >= 200 && f.status < 300 ? (y.done(), u(f)) : s(f) && t < m ? setTimeout(() => {
					b(t + 1).then(u, d);
				}, v(t)) : (y.done(), d(new l(f.statusText, f)));
			}, f.onerror = () => g(new l(f.statusText, f)), f.upload.onprogress = (e) => {
				y.progress(), o(e);
			}, r && Object.keys(r).forEach((e) => {
				f.setRequestHeader(e, r[e]);
			});
			function x() {
				f.abort(), d(new DOMException("Aborted", "AbortError"));
			}
			if (h?.addEventListener("abort", x), h?.aborted) {
				x();
				return;
			}
			await a(f, t), f.send(n);
		});
	}
	return b();
}
//#endregion
//#region node_modules/@uppy/utils/lib/fileFilters.js
var p = (e) => "error" in e && !!e.error, m = (e) => e.progress.uploadComplete;
function h(e) {
	return e.filter((e) => !p(e) && !m(e));
}
function g(e) {
	return e.filter((e) => !e.progress?.uploadStarted || !e.isRestored);
}
//#endregion
//#region node_modules/@uppy/utils/lib/getFileNameAndExtension.js
function _(e) {
	let t = e.lastIndexOf(".");
	return t === -1 || t === e.length - 1 ? {
		name: e,
		extension: void 0
	} : {
		name: e.slice(0, t),
		extension: e.slice(t + 1)
	};
}
//#endregion
//#region node_modules/@uppy/utils/lib/mimeTypes.js
var v = {
	__proto__: null,
	md: "text/markdown",
	markdown: "text/markdown",
	mp4: "video/mp4",
	mp3: "audio/mp3",
	svg: "image/svg+xml",
	jpg: "image/jpeg",
	png: "image/png",
	webp: "image/webp",
	gif: "image/gif",
	heic: "image/heic",
	heif: "image/heif",
	yaml: "text/yaml",
	yml: "text/yaml",
	csv: "text/csv",
	tsv: "text/tab-separated-values",
	tab: "text/tab-separated-values",
	avi: "video/x-msvideo",
	mks: "video/x-matroska",
	mkv: "video/x-matroska",
	mov: "video/quicktime",
	dicom: "application/dicom",
	doc: "application/msword",
	msg: "application/vnd.ms-outlook",
	docm: "application/vnd.ms-word.document.macroenabled.12",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	dot: "application/msword",
	dotm: "application/vnd.ms-word.template.macroenabled.12",
	dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
	xla: "application/vnd.ms-excel",
	xlam: "application/vnd.ms-excel.addin.macroenabled.12",
	xlc: "application/vnd.ms-excel",
	xlf: "application/x-xliff+xml",
	xlm: "application/vnd.ms-excel",
	xls: "application/vnd.ms-excel",
	xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
	xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	xlt: "application/vnd.ms-excel",
	xltm: "application/vnd.ms-excel.template.macroenabled.12",
	xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
	xlw: "application/vnd.ms-excel",
	txt: "text/plain",
	text: "text/plain",
	conf: "text/plain",
	log: "text/plain",
	pdf: "application/pdf",
	zip: "application/zip",
	"7z": "application/x-7z-compressed",
	rar: "application/x-rar-compressed",
	tar: "application/x-tar",
	gz: "application/gzip",
	dmg: "application/x-apple-diskimage"
};
//#endregion
//#region node_modules/@uppy/utils/lib/getFileType.js
function y(e) {
	if (e.type) return e.type;
	let t = e.name ? _(e.name).extension?.toLowerCase() : null;
	return t && t in v ? v[t] : "application/octet-stream";
}
//#endregion
//#region node_modules/@uppy/utils/lib/generateFileID.js
function b(e) {
	return e.charCodeAt(0).toString(32);
}
function x(e) {
	let t = "";
	return e.replace(/[^A-Z0-9]/gi, (e) => (t += `-${b(e)}`, "/")) + t;
}
function S(e, t) {
	let n = t || "uppy";
	return typeof e.name == "string" && (n += `-${x(e.name.toLowerCase())}`), e.type !== void 0 && (n += `-${e.type}`), e.meta && typeof e.meta.relativePath == "string" && (n += `-${x(e.meta.relativePath.toLowerCase())}`), e.data?.size !== void 0 && (n += `-${e.data.size}`), e.data.lastModified !== void 0 && (n += `-${e.data.lastModified}`), n;
}
function C(e) {
	return !e.isRemote || !e.remote ? !1 : new Set([
		"box",
		"dropbox",
		"drive",
		"facebook",
		"unsplash"
	]).has(e.remote.provider);
}
function w(e, t) {
	if (C(e)) return e.id;
	let n = y(e);
	return S({
		...e,
		type: n
	}, t);
}
//#endregion
//#region node_modules/@uppy/utils/lib/getAllowedMetaFields.js
function ee(e, t) {
	return e === !0 ? Object.keys(t) : Array.isArray(e) ? e : [];
}
//#endregion
//#region node_modules/@uppy/utils/lib/getTimeStamp.js
function te(e) {
	return e < 10 ? `0${e}` : e.toString();
}
function T() {
	let e = /* @__PURE__ */ new Date();
	return `${te(e.getHours())}:${te(e.getMinutes())}:${te(e.getSeconds())}`;
}
//#endregion
//#region node_modules/@uppy/utils/lib/isNetworkError.js
function E(e) {
	return e ? e.readyState === 4 && e.status === 0 : !1;
}
//#endregion
//#region node_modules/@uppy/utils/lib/TaskQueue.js
var D = class {
	#e = [];
	#t = 0;
	#n;
	#r = !1;
	constructor(e) {
		let t = e?.concurrency;
		this.#n = typeof t != "number" || t === 0 ? Infinity : t;
	}
	add(e) {
		let t = new AbortController(), n, r, i = new Promise((e, t) => {
			n = e, r = t;
		}), a = {
			run: () => e(t.signal),
			resolve: n,
			reject: r,
			controller: t
		};
		return t.signal.addEventListener("abort", () => {
			let e = this.#e.indexOf(a);
			e !== -1 && (this.#e.splice(e, 1), r(t.signal.reason ?? new DOMException("Aborted", "AbortError")));
		}, { once: !0 }), i.abort = (e) => {
			t.abort(e ?? new DOMException("Aborted", "AbortError"));
		}, i.abortOn = (e) => {
			if (e) {
				let t = () => i.abort(e.reason);
				e.addEventListener("abort", t, { once: !0 }), i.then(() => e.removeEventListener("abort", t), () => e.removeEventListener("abort", t));
			}
			return i;
		}, !this.#r && this.#t < this.#n ? this.#i(a) : this.#e.push(a), i;
	}
	#i(e) {
		if (this.#t++, e.controller.signal.aborted) {
			this.#t--, e.reject(e.controller.signal.reason ?? new DOMException("Aborted", "AbortError")), this.#a();
			return;
		}
		let t;
		try {
			t = e.run();
		} catch (e) {
			t = Promise.reject(e);
		}
		t.then((t) => {
			e.controller.signal.aborted ? e.reject(e.controller.signal.reason ?? new DOMException("Aborted", "AbortError")) : e.resolve(t);
		}, (t) => {
			e.reject(t);
		}).finally(() => {
			this.#t--, this.#a();
		});
	}
	#a() {
		queueMicrotask(() => {
			if (!(this.#r || this.#t >= this.#n)) for (; this.#e.length > 0;) {
				let e = this.#e.shift();
				if (!e.controller.signal.aborted) {
					this.#i(e);
					return;
				}
			}
		});
	}
	pause() {
		this.#r = !0;
	}
	resume() {
		this.#r = !1;
		let e = this.#n - this.#t;
		for (let t = 0; t < e; t++) this.#a();
	}
	clear(e) {
		let t = this.#e.splice(0), n = e ?? new DOMException("Cleared", "AbortError");
		for (let e of t) e.controller.abort(n), e.reject(n);
	}
	get concurrency() {
		return this.#n;
	}
	set concurrency(e) {
		if (this.#n = typeof e != "number" || e === 0 ? Infinity : e, !this.#r) {
			let e = this.#n - this.#t;
			for (let t = 0; t < e; t++) this.#a();
		}
	}
	get pending() {
		return this.#e.length;
	}
	get running() {
		return this.#t;
	}
	get isPaused() {
		return this.#r;
	}
	wrapPromiseFunction(e) {
		return (...t) => this.add((n) => e(...t));
	}
};
//#endregion
//#region node_modules/@uppy/utils/lib/Translator.js
function ne(e, t, n) {
	let r = [];
	return e.forEach((e) => typeof e == "string" ? t[Symbol.split](e).forEach((e, t, i) => {
		e !== "" && r.push(e), t < i.length - 1 && r.push(n);
	}) : r.push(e)), r;
}
function re(e, t) {
	let n = /\$/g, r = [e];
	if (t == null) return r;
	for (let e of Object.keys(t)) if (e !== "_") {
		let i = t[e];
		typeof i == "string" && (i = n[Symbol.replace](i, "$$$$")), r = ne(r, RegExp(`%\\{${e}\\}`, "g"), i);
	}
	return r;
}
var ie = (e) => {
	throw Error(`missing string: ${e}`);
}, ae = class {
	locale;
	constructor(e, { onMissingKey: t = ie } = {}) {
		this.locale = {
			strings: {},
			pluralize(e) {
				return e === 1 ? 0 : 1;
			}
		}, Array.isArray(e) ? e.forEach(this.#t, this) : this.#t(e), this.#e = t;
	}
	#e;
	#t(e) {
		if (!e?.strings) return;
		let t = this.locale;
		Object.assign(this.locale, {
			strings: {
				...t.strings,
				...e.strings
			},
			pluralize: e.pluralize || t.pluralize
		});
	}
	translate(e, t) {
		return this.translateArray(e, t).join("");
	}
	translateArray(e, t) {
		let n = this.locale.strings[e];
		if (n ??= (this.#e(e), e), typeof n == "object") {
			if (t && t.smart_count !== void 0) {
				let e = this.locale.pluralize(t.smart_count);
				return re(n[e], t);
			}
			throw Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
		}
		if (typeof n != "string") throw Error("string was not a string");
		return re(n, t);
	}
}, oe = class {
	uppy;
	opts;
	id;
	defaultLocale;
	i18n;
	i18nArray;
	type;
	VERSION;
	constructor(e, t) {
		this.uppy = e, this.opts = t ?? {};
	}
	getPluginState() {
		let { plugins: e } = this.uppy.getState();
		return e?.[this.id] || {};
	}
	setPluginState(e) {
		let { plugins: t } = this.uppy.getState();
		this.uppy.setState({ plugins: {
			...t,
			[this.id]: {
				...t[this.id],
				...e
			}
		} });
	}
	setOptions(e) {
		this.opts = {
			...this.opts,
			...e
		}, this.setPluginState(void 0), this.i18nInit();
	}
	i18nInit() {
		let e = new ae([
			this.defaultLocale,
			this.uppy.locale,
			this.opts.locale
		]);
		this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState(void 0);
	}
	addTarget(e) {
		throw Error("Extend the addTarget method to add your plugin to another plugin's target");
	}
	install() {}
	uninstall() {}
	update(e) {}
	afterUpdate() {}
}, se = class {
	#e;
	#t = [];
	constructor(e) {
		this.#e = e;
	}
	on(e, t) {
		return this.#t.push([e, t]), this.#e.on(e, t);
	}
	remove() {
		for (let [e, t] of this.#t.splice(0)) this.#e.off(e, t);
	}
	onFilePause(e, t) {
		this.on("upload-pause", (n, r) => {
			e === n?.id && t(r);
		});
	}
	onFileRemove(e, t) {
		this.on("file-removed", (n) => {
			e === n.id && t(n.id);
		});
	}
	onPause(e, t) {
		this.on("upload-pause", (n, r) => {
			e === n?.id && t(r);
		});
	}
	onRetry(e, t) {
		this.on("upload-retry", (n) => {
			e === n?.id && t();
		});
	}
	onRetryAll(e, t) {
		this.on("retry-all", () => {
			this.#e.getFile(e) && t();
		});
	}
	onPauseAll(e, t) {
		this.on("pause-all", () => {
			this.#e.getFile(e) && t();
		});
	}
	onCancelAll(e, t) {
		this.on("cancel-all", (...n) => {
			this.#e.getFile(e) && t(...n);
		});
	}
	onResumeAll(e, t) {
		this.on("resume-all", () => {
			this.#e.getFile(e) && t();
		});
	}
}, ce = {
	debug: () => {},
	warn: () => {},
	error: (...e) => console.error(`[Uppy] [${T()}]`, ...e)
}, le = {
	debug: (...e) => console.debug(`[Uppy] [${T()}]`, ...e),
	warn: (...e) => console.warn(`[Uppy] [${T()}]`, ...e),
	error: (...e) => console.error(`[Uppy] [${T()}]`, ...e)
}, ue = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		if (typeof e != "number" || Number.isNaN(e)) throw TypeError(`Expected a number, got ${typeof e}`);
		let t = e < 0, n = Math.abs(e);
		if (t && (n = -n), n === 0) return "0 B";
		let r = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB",
			"PB",
			"EB",
			"ZB",
			"YB"
		], i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), r.length - 1), a = Number(n / 1024 ** i), o = r[i];
		return `${a >= 10 || a % 1 == 0 ? Math.round(a) : a.toFixed(1)} ${o}`;
	};
})), de = /* @__PURE__ */ o(((e, t) => {
	function n(e, t) {
		this.text = e ||= "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t);
	}
	n.prototype.match = function(e) {
		var t = !0, n = this.parts, r, i = n.length, a;
		if (typeof e == "string" || e instanceof String) if (!this.hasWild && this.text != e) t = !1;
		else {
			for (a = (e || "").split(this.separator), r = 0; t && r < i; r++) if (n[r] === "*") continue;
			else t = r < a.length ? n[r] === a[r] : !1;
			t &&= a;
		}
		else if (typeof e.splice == "function") for (t = [], r = e.length; r--;) this.match(e[r]) && (t[t.length] = e[r]);
		else if (typeof e == "object") for (var o in t = {}, e) this.match(o) && (t[o] = e[o]);
		return t;
	}, t.exports = function(e, t, r) {
		var i = new n(e, r || /[\/\.]/);
		return t === void 0 ? i : i.match(t);
	};
})), fe = /* @__PURE__ */ o(((e, t) => {
	var n = de(), r = /[\/\+\.]/;
	t.exports = function(e, t) {
		function i(t) {
			var i = n(t, e, r);
			return i && i.length >= 2;
		}
		return t ? i(t.split(";")[0]) : i;
	};
})), pe = /* @__PURE__ */ c(ue(), 1), me = /* @__PURE__ */ c(fe(), 1), he = {
	maxFileSize: null,
	minFileSize: null,
	maxTotalFileSize: null,
	maxNumberOfFiles: null,
	minNumberOfFiles: null,
	allowedFileTypes: null,
	requiredMetaFields: []
}, O = class extends Error {
	isUserFacing;
	file;
	constructor(e, t) {
		super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
	}
	isRestriction = !0;
}, ge = class {
	getI18n;
	getOpts;
	constructor(e, t) {
		this.getI18n = t, this.getOpts = () => {
			let t = e();
			if (t.restrictions?.allowedFileTypes != null && !Array.isArray(t.restrictions.allowedFileTypes)) throw TypeError("`restrictions.allowedFileTypes` must be an array");
			return t;
		};
	}
	validateAggregateRestrictions(e, t) {
		let { maxTotalFileSize: n, maxNumberOfFiles: r } = this.getOpts().restrictions;
		if (r && e.filter((e) => !e.isGhost).length + t.length > r) throw new O(`${this.getI18n()("youCanOnlyUploadX", { smart_count: r })}`);
		if (n) {
			let r = [...e, ...t].reduce((e, t) => e + (t.size ?? 0), 0);
			if (r > n) throw new O(this.getI18n()("aggregateExceedsSize", {
				sizeAllowed: (0, pe.default)(n),
				size: (0, pe.default)(r)
			}));
		}
	}
	validateSingleFile(e) {
		let { maxFileSize: t, minFileSize: n, allowedFileTypes: r } = this.getOpts().restrictions;
		if (r && !r.some((t) => t.includes("/") ? e.type ? (0, me.default)(e.type.replace(/;.*?$/, ""), t) : !1 : t[0] === "." && e.extension ? e.extension.toLowerCase() === t.slice(1).toLowerCase() : !1)) {
			let t = r.join(", ");
			throw new O(this.getI18n()("youCanOnlyUploadFileTypes", { types: t }), { file: e });
		}
		if (t && e.size != null && e.size > t) throw new O(this.getI18n()("exceedsSize", {
			size: (0, pe.default)(t),
			file: e.name ?? this.getI18n()("unnamed")
		}), { file: e });
		if (n && e.size != null && e.size < n) throw new O(this.getI18n()("inferiorSize", { size: (0, pe.default)(n) }), { file: e });
	}
	validate(e, t) {
		t.forEach((e) => {
			this.validateSingleFile(e);
		}), this.validateAggregateRestrictions(e, t);
	}
	validateMinNumberOfFiles(e) {
		let { minNumberOfFiles: t } = this.getOpts().restrictions;
		if (t && Object.keys(e).length < t) throw new O(this.getI18n()("youHaveToAtLeastSelectX", { smart_count: t }));
	}
	getMissingRequiredMetaFields(e) {
		let t = new O(this.getI18n()("missingRequiredMetaFieldOnFile", { fileName: e.name ?? this.getI18n()("unnamed") })), { requiredMetaFields: n } = this.getOpts().restrictions, r = [];
		for (let t of n) (!Object.hasOwn(e.meta, t) || e.meta[t] === "") && r.push(t);
		return {
			missingFields: r,
			error: t
		};
	}
}, _e = {
	name: "@uppy/store-default",
	description: "The default simple object-based store for Uppy.",
	version: "5.0.0",
	license: "MIT",
	main: "lib/index.js",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --environment=jsdom --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-store"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	devDependencies: {
		jsdom: "^26.1.0",
		typescript: "^5.8.3",
		vitest: "^3.2.4"
	},
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	exports: {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	]
}, ve = class {
	static VERSION = _e.version;
	state = {};
	#e = /* @__PURE__ */ new Set();
	getState() {
		return this.state;
	}
	setState(e) {
		let t = { ...this.state }, n = {
			...this.state,
			...e
		};
		this.state = n, this.#t(t, n, e);
	}
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	#t(...e) {
		this.#e.forEach((t) => {
			t(...e);
		});
	}
}, ye = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), be = /* @__PURE__ */ o(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), xe = /* @__PURE__ */ o(((e, t) => {
	var n = be(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), Se = /* @__PURE__ */ o(((e, t) => {
	var n = xe();
	t.exports = function() {
		return n.Date.now();
	};
})), Ce = /* @__PURE__ */ o(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), we = /* @__PURE__ */ o(((e, t) => {
	var n = Ce(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), Te = /* @__PURE__ */ o(((e, t) => {
	t.exports = xe().Symbol;
})), Ee = /* @__PURE__ */ o(((e, t) => {
	var n = Te(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
	function s(e) {
		var t = i.call(e, o), n = e[o];
		try {
			e[o] = void 0;
			var r = !0;
		} catch {}
		var s = a.call(e);
		return r && (t ? e[o] = n : delete e[o]), s;
	}
	t.exports = s;
})), De = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), Oe = /* @__PURE__ */ o(((e, t) => {
	var n = Te(), r = Ee(), i = De(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), ke = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), Ae = /* @__PURE__ */ o(((e, t) => {
	var n = Oe(), r = ke(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), je = /* @__PURE__ */ o(((e, t) => {
	var n = we(), r = ye(), i = Ae(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
	function u(e) {
		if (typeof e == "number") return e;
		if (i(e)) return a;
		if (r(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = r(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = n(e);
		var u = s.test(e);
		return u || c.test(e) ? l(e.slice(2), u ? 2 : 8) : o.test(e) ? a : +e;
	}
	t.exports = u;
})), Me = /* @__PURE__ */ o(((e, t) => {
	var n = ye(), r = Se(), i = je(), a = "Expected a function", o = Math.max, s = Math.min;
	function c(e, t, c) {
		var l, u, d, f, p, m, h = 0, g = !1, _ = !1, v = !0;
		if (typeof e != "function") throw TypeError(a);
		t = i(t) || 0, n(c) && (g = !!c.leading, _ = "maxWait" in c, d = _ ? o(i(c.maxWait) || 0, t) : d, v = "trailing" in c ? !!c.trailing : v);
		function y(t) {
			var n = l, r = u;
			return l = u = void 0, h = t, f = e.apply(r, n), f;
		}
		function b(e) {
			return h = e, p = setTimeout(C, t), g ? y(e) : f;
		}
		function x(e) {
			var n = e - m, r = e - h, i = t - n;
			return _ ? s(i, d - r) : i;
		}
		function S(e) {
			var n = e - m, r = e - h;
			return m === void 0 || n >= t || n < 0 || _ && r >= d;
		}
		function C() {
			var e = r();
			if (S(e)) return w(e);
			p = setTimeout(C, x(e));
		}
		function w(e) {
			return p = void 0, v && l ? y(e) : (l = u = void 0, f);
		}
		function ee() {
			p !== void 0 && clearTimeout(p), h = 0, l = m = u = p = void 0;
		}
		function te() {
			return p === void 0 ? f : w(r());
		}
		function T() {
			var e = r(), n = S(e);
			if (l = arguments, u = this, m = e, n) {
				if (p === void 0) return b(m);
				if (_) return clearTimeout(p), p = setTimeout(C, t), y(m);
			}
			return p === void 0 && (p = setTimeout(C, t)), f;
		}
		return T.cancel = ee, T.flush = te, T;
	}
	t.exports = c;
})), Ne = /* @__PURE__ */ o(((e, t) => {
	var n = Me(), r = ye(), i = "Expected a function";
	function a(e, t, a) {
		var o = !0, s = !0;
		if (typeof e != "function") throw TypeError(i);
		return r(a) && (o = "leading" in a ? !!a.leading : o, s = "trailing" in a ? !!a.trailing : s), n(e, t, {
			leading: o,
			maxWait: t,
			trailing: s
		});
	}
	t.exports = a;
})), Pe = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = {}, t = e._fns = {};
		e.emit = function(e, t, i, a, o, s, c) {
			var l = n(e);
			l.length && r(e, l, [
				t,
				i,
				a,
				o,
				s,
				c
			]);
		}, e.on = function(e, n) {
			t[e] || (t[e] = []), t[e].push(n);
		}, e.once = function(t, n) {
			function r() {
				n.apply(this, arguments), e.off(t, r);
			}
			this.on(t, r);
		}, e.off = function(e, t) {
			var n = [];
			if (e && t) for (var r = this._fns[e], i = 0, a = r ? r.length : 0; i < a; i++) r[i] !== t && n.push(r[i]);
			n.length ? this._fns[e] = n : delete this._fns[e];
		};
		function n(e) {
			for (var n = t[e] ? t[e] : [], r = e.indexOf(":"), i = r === -1 ? [e] : [e.substring(0, r), e.substring(r + 1)], a = Object.keys(t), o = 0, s = a.length; o < s; o++) {
				var c = a[o];
				if (c === "*" && (n = n.concat(t[c])), i.length === 2 && i[0] === c) {
					n = n.concat(t[c]);
					break;
				}
			}
			return n;
		}
		function r(e, t, n) {
			for (var r = 0, i = t.length; r < i && t[r]; r++) t[r].event = e, t[r].apply(t[r], n);
		}
		return e;
	};
})), Fe = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Ie = (e = 21) => {
	let t = "", n = e | 0;
	for (; n--;) t += Fe[Math.random() * 64 | 0];
	return t;
}, Le = {
	name: "@uppy/core",
	description: "Core module for the extensible JavaScript file upload widget with support for drag&drop, resumable uploads, previews, restrictions, file processing/encoding, remote providers like Instagram, Dropbox, Google Drive, S3 and more :dog:",
	version: "5.2.0",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --environment=jsdom --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	],
	exports: {
		".": "./lib/index.js",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.css": "./dist/style.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	},
	dependencies: {
		"@transloadit/prettier-bytes": "^0.3.4",
		"@uppy/store-default": "^5.0.0",
		"@uppy/utils": "^7.1.4",
		lodash: "^4.17.21",
		"mime-match": "^1.0.2",
		"namespace-emitter": "^2.0.1",
		nanoid: "^5.0.9",
		preact: "^10.5.13"
	},
	devDependencies: {
		"@types/deep-freeze": "^0",
		cssnano: "^7.0.7",
		"deep-freeze": "^0.0.1",
		jsdom: "^26.1.0",
		postcss: "^8.5.6",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^5.8.3",
		vitest: "^3.2.4"
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/getFileName.js
function Re(e, t) {
	return t.name ? t.name : e.split("/")[0] === "image" ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname";
}
//#endregion
//#region node_modules/@uppy/core/lib/locale.js
var ze = { strings: {
	addBulkFilesFailed: {
		0: "Failed to add %{smart_count} file due to an internal error",
		1: "Failed to add %{smart_count} files due to internal errors"
	},
	youCanOnlyUploadX: {
		0: "You can only upload %{smart_count} file",
		1: "You can only upload %{smart_count} files"
	},
	youHaveToAtLeastSelectX: {
		0: "You have to select at least %{smart_count} file",
		1: "You have to select at least %{smart_count} files"
	},
	aggregateExceedsSize: "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
	exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
	missingRequiredMetaField: "Missing required meta fields",
	missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
	inferiorSize: "This file is smaller than the allowed size of %{size}",
	youCanOnlyUploadFileTypes: "You can only upload: %{types}",
	noMoreFilesAllowed: "Cannot add more files",
	noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
	companionError: "Connection with Companion failed",
	authAborted: "Authentication aborted",
	companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
	failedToUpload: "Failed to upload %{file}",
	noInternetConnection: "No Internet connection",
	connectedToInternet: "Connected to the Internet",
	noFilesFound: "You have no files or folders here",
	noSearchResults: "Unfortunately, there are no results for this search",
	selectX: {
		0: "Select %{smart_count}",
		1: "Select %{smart_count}"
	},
	allFilesFromFolderNamed: "All files from folder %{name}",
	openFolderNamed: "Open folder %{name}",
	cancel: "Cancel",
	logOut: "Log out",
	logIn: "Log in",
	pickFiles: "Pick files",
	pickPhotos: "Pick photos",
	filter: "Filter",
	resetFilter: "Reset filter",
	loading: "Loading...",
	loadedXFiles: "Loaded %{numFiles} files",
	authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
	authenticateWith: "Connect to %{pluginName}",
	signInWithGoogle: "Sign in with Google",
	searchImages: "Search for images",
	enterTextToSearch: "Enter text to search for images",
	search: "Search",
	resetSearch: "Reset search",
	emptyFolderAdded: "No files were added from empty folder",
	addedNumFiles: "Added %{numFiles} file(s)",
	folderAlreadyAdded: "The folder \"%{folder}\" was already added",
	folderAdded: {
		0: "Added %{smart_count} file from %{folder}",
		1: "Added %{smart_count} files from %{folder}"
	},
	additionalRestrictionsFailed: "%{count} additional restrictions were not fulfilled",
	unnamed: "Unnamed",
	pleaseWait: "Please wait"
} };
//#endregion
//#region node_modules/@uppy/core/lib/supportsUploadProgress.js
function Be(e) {
	if (e == null && typeof navigator < "u" && (e = navigator.userAgent), !e) return !0;
	let t = /Edge\/(\d+\.\d+)/.exec(e);
	if (!t) return !0;
	let n = t[1].split(".", 2), r = parseInt(n[0], 10), i = parseInt(n[1], 10);
	return r < 15 || r === 15 && i < 15063 || r > 18 || r === 18 && i >= 18218;
}
//#endregion
//#region node_modules/@uppy/core/lib/Uppy.js
var Ve = /* @__PURE__ */ c(Ne(), 1), He = /* @__PURE__ */ c(Pe(), 1), Ue = {
	totalProgress: 0,
	allowNewUpload: !0,
	error: null,
	recoveredState: null
}, We = class e {
	static VERSION = Le.version;
	#e = Object.create(null);
	#t;
	#n;
	#r = (0, He.default)();
	#i = /* @__PURE__ */ new Set();
	#a = /* @__PURE__ */ new Set();
	#o = /* @__PURE__ */ new Set();
	defaultLocale;
	locale;
	opts;
	store;
	i18n;
	i18nArray;
	scheduledAutoProceed = null;
	wasOffline = !1;
	constructor(t) {
		this.defaultLocale = ze;
		let n = {
			id: "uppy",
			autoProceed: !1,
			allowMultipleUploadBatches: !0,
			debug: !1,
			restrictions: he,
			meta: {},
			onBeforeFileAdded: (e, t) => !Object.hasOwn(t, e.id),
			onBeforeUpload: (e) => e,
			store: new ve(),
			logger: ce,
			infoTimeout: 5e3
		}, r = {
			...n,
			...t
		};
		this.opts = {
			...r,
			restrictions: {
				...n.restrictions,
				...t?.restrictions
			}
		}, t?.logger && t.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : t?.debug && (this.opts.logger = le), this.log(`Using Core v${e.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
			...Ue,
			plugins: {},
			files: {},
			currentUploads: {},
			capabilities: {
				uploadProgress: Be(),
				individualCancellation: !0,
				resumableUploads: !1
			},
			meta: { ...this.opts.meta },
			info: []
		}), this.#t = new ge(() => this.opts, () => this.i18n), this.#n = this.store.subscribe((e, t, n) => {
			this.emit("state-update", e, t, n), this.updateAll(t);
		}), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), this.#b();
	}
	emit(e, ...t) {
		this.#r.emit(e, ...t);
	}
	on(e, t) {
		return this.#r.on(e, t), this;
	}
	once(e, t) {
		return this.#r.once(e, t), this;
	}
	off(e, t) {
		return this.#r.off(e, t), this;
	}
	updateAll(e) {
		this.iteratePlugins((t) => {
			t.update(e);
		});
	}
	setState(e) {
		this.store.setState(e);
	}
	getState() {
		return this.store.getState();
	}
	patchFilesState(e) {
		let t = this.getState().files;
		this.setState({ files: {
			...t,
			...Object.fromEntries(Object.entries(e).map(([e, n]) => [e, {
				...t[e],
				...n
			}]))
		} });
	}
	setFileState(e, t) {
		if (!this.getState().files[e]) throw Error(`Can’t set state for ${e} (the file could have been removed)`);
		this.patchFilesState({ [e]: t });
	}
	i18nInit() {
		let e = new ae([this.defaultLocale, this.opts.locale], { onMissingKey: (e) => this.log(`Missing i18n string: ${e}`, "error") });
		this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.locale = e.locale;
	}
	setOptions(e) {
		this.opts = {
			...this.opts,
			...e,
			restrictions: {
				...this.opts.restrictions,
				...e?.restrictions
			}
		}, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((t) => {
			t.setOptions(e);
		}), this.setState(void 0);
	}
	resetProgress() {
		let e = {
			percentage: 0,
			bytesUploaded: !1,
			uploadComplete: !1,
			uploadStarted: null
		}, t = { ...this.getState().files }, n = Object.create(null);
		Object.keys(t).forEach((r) => {
			n[r] = {
				...t[r],
				progress: {
					...t[r].progress,
					...e
				},
				tus: void 0,
				transloadit: void 0
			};
		}), this.setState({
			files: n,
			...Ue
		});
	}
	clear() {
		let { capabilities: e, currentUploads: t } = this.getState();
		if (Object.keys(t).length > 0 && !e.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
		this.setState({
			...Ue,
			files: {}
		});
	}
	addPreProcessor(e) {
		this.#i.add(e);
	}
	removePreProcessor(e) {
		return this.#i.delete(e);
	}
	addPostProcessor(e) {
		this.#o.add(e);
	}
	removePostProcessor(e) {
		return this.#o.delete(e);
	}
	addUploader(e) {
		this.#a.add(e);
	}
	removeUploader(e) {
		return this.#a.delete(e);
	}
	setMeta(e) {
		let t = {
			...this.getState().meta,
			...e
		}, n = { ...this.getState().files };
		Object.keys(n).forEach((t) => {
			n[t] = {
				...n[t],
				meta: {
					...n[t].meta,
					...e
				}
			};
		}), this.log("Adding metadata:"), this.log(e), this.setState({
			meta: t,
			files: n
		});
	}
	setFileMeta(e, t) {
		let n = { ...this.getState().files };
		if (!n[e]) {
			this.log(`Was trying to set metadata for a file that has been removed: ${e}`);
			return;
		}
		let r = {
			...n[e].meta,
			...t
		};
		n[e] = {
			...n[e],
			meta: r
		}, this.setState({ files: n });
	}
	getFile(e) {
		return this.getState().files[e];
	}
	getFiles() {
		let { files: e } = this.getState();
		return Object.values(e);
	}
	getFilesByIds(e) {
		return e.map((e) => this.getFile(e));
	}
	getObjectOfFilesPerState() {
		let { files: e, totalProgress: t, error: n } = this.getState(), r = Object.values(e), i = [], a = [], o = [], s = [], c = [], l = [], u = [], d = [], f = [];
		for (let e of r) {
			let { progress: t } = e;
			!t.uploadComplete && t.uploadStarted && (i.push(e), e.isPaused || d.push(e)), t.uploadStarted || a.push(e), (t.uploadStarted || t.preprocess || t.postprocess) && o.push(e), t.uploadStarted && s.push(e), e.isPaused && c.push(e), t.uploadComplete && l.push(e), e.error && u.push(e), (t.preprocess || t.postprocess) && f.push(e);
		}
		return {
			newFiles: a,
			startedFiles: o,
			uploadStartedFiles: s,
			pausedFiles: c,
			completeFiles: l,
			erroredFiles: u,
			inProgressFiles: i,
			inProgressNotPausedFiles: d,
			processingFiles: f,
			isUploadStarted: s.length > 0,
			isAllComplete: t === 100 && l.length === r.length && f.length === 0,
			isAllErrored: !!n && u.length === r.length,
			isAllPaused: i.length !== 0 && c.length === i.length,
			isUploadInProgress: i.length > 0,
			isSomeGhost: r.some((e) => e.isGhost)
		};
	}
	#s(e) {
		for (let t of e) t.isRestriction ? this.emit("restriction-failed", t.file, t) : this.emit("error", t, t.file), this.log(t, "warning");
		let t = e.filter((e) => e.isUserFacing), n = t.slice(0, 4), r = t.slice(4);
		n.forEach(({ message: e, details: t = "" }) => {
			this.info({
				message: e,
				details: t
			}, "error", this.opts.infoTimeout);
		}), r.length > 0 && this.info({ message: this.i18n("additionalRestrictionsFailed", { count: r.length }) });
	}
	validateRestrictions(e, t = this.getFiles()) {
		try {
			this.#t.validate(t, [e]);
		} catch (e) {
			return e;
		}
		return null;
	}
	validateSingleFile(e) {
		try {
			this.#t.validateSingleFile(e);
		} catch (e) {
			return e.message;
		}
		return null;
	}
	validateAggregateRestrictions(e) {
		let t = this.getFiles();
		try {
			this.#t.validateAggregateRestrictions(t, e);
		} catch (e) {
			return e.message;
		}
		return null;
	}
	#c(e) {
		let { missingFields: t, error: n } = this.#t.getMissingRequiredMetaFields(e);
		return t.length > 0 ? (this.setFileState(e.id, {
			missingRequiredMetaFields: t,
			error: n.message
		}), this.log(n.message), this.emit("restriction-failed", e, n), !1) : (t.length === 0 && e.missingRequiredMetaFields && this.setFileState(e.id, { missingRequiredMetaFields: [] }), !0);
	}
	#l(e) {
		let t = !0;
		for (let n of Object.values(e)) this.#c(n) || (t = !1);
		return t;
	}
	#u(e) {
		let { allowNewUpload: t } = this.getState();
		if (t === !1) {
			let t = new O(this.i18n("noMoreFilesAllowed"), { file: e });
			throw this.#s([t]), t;
		}
	}
	checkIfFileAlreadyExists(e) {
		let { files: t } = this.getState();
		return !!(t[e] && !t[e].isGhost);
	}
	#d(e) {
		let t = e instanceof File ? {
			name: e.name,
			type: e.type,
			size: e.size,
			data: e,
			meta: {},
			isRemote: !1,
			source: void 0,
			preview: void 0
		} : e, n = y(t), r = Re(n, t), i = _(r).extension, a = w(t, this.getID()), o = {
			...t.meta,
			name: r,
			type: n
		}, s = Number.isFinite(t.data.size) ? t.data.size : null;
		return {
			source: t.source || "",
			id: a,
			name: r,
			extension: i || "",
			meta: {
				...this.getState().meta,
				...o
			},
			type: n,
			progress: {
				percentage: 0,
				bytesUploaded: !1,
				bytesTotal: s,
				uploadComplete: !1,
				uploadStarted: null
			},
			size: s,
			isGhost: !1,
			...t.isRemote ? {
				isRemote: !0,
				remote: t.remote,
				data: t.data
			} : {
				isRemote: !1,
				data: t.data
			},
			preview: t.preview
		};
	}
	#f() {
		this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
			this.scheduledAutoProceed = null, this.upload().catch((e) => {
				e.isRestriction || this.log(e.stack || e.message || e);
			});
		}, 4));
	}
	#p(e) {
		let { files: t } = this.getState(), n = { ...t }, r = [], i = [];
		for (let a of e) try {
			let e = this.#d(a);
			this.#u(e);
			let i = t[e.id], o = i?.isGhost;
			if (o && !e.isRemote) {
				if (e.data == null) throw Error("File data is missing");
				e = {
					...i,
					isGhost: !1,
					data: e.data
				}, this.log(`Replaced the blob in the restored ghost file: ${e.name}, ${e.id}`);
			}
			let s = this.opts.onBeforeFileAdded(e, n);
			if (t = this.getState().files, n = {
				...t,
				...n
			}, !s && this.checkIfFileAlreadyExists(e.id)) throw new O(this.i18n("noDuplicates", { fileName: e.name ?? this.i18n("unnamed") }), { file: e });
			if (s === !1 && !o) throw new O("Cannot add the file because onBeforeFileAdded returned false.", {
				isUserFacing: !1,
				file: e
			});
			typeof s == "object" && s && (e = s), this.#t.validateSingleFile(e), n[e.id] = e, r.push(e);
		} catch (e) {
			i.push(e);
		}
		try {
			this.#t.validateAggregateRestrictions(Object.values(t), r);
		} catch (e) {
			return i.push(e), {
				nextFilesState: t,
				validFilesToAdd: [],
				errors: i
			};
		}
		return {
			nextFilesState: n,
			validFilesToAdd: r,
			errors: i
		};
	}
	addFile(e) {
		let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p([e]), i = r.filter((e) => e.isRestriction);
		if (this.#s(i), r.length > 0) throw r[0];
		this.setState({ files: t });
		let [a] = n;
		return this.emit("file-added", a), this.emit("files-added", n), this.log(`Added file: ${a.name}, ${a.id}, mime type: ${a.type}`), this.#f(), a.id;
	}
	addFiles(e) {
		let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p(e), i = r.filter((e) => e.isRestriction);
		this.#s(i);
		let a = r.filter((e) => !e.isRestriction);
		if (a.length > 0) {
			let e = "Multiple errors occurred while adding files:\n";
			if (a.forEach((t) => {
				e += `\n * ${t.message}`;
			}), this.info({
				message: this.i18n("addBulkFilesFailed", { smart_count: a.length }),
				details: e
			}, "error", this.opts.infoTimeout), typeof AggregateError == "function") throw AggregateError(a, e);
			{
				let t = Error(e);
				throw t.errors = a, t;
			}
		}
		this.setState({ files: t }), n.forEach((e) => {
			this.emit("file-added", e);
		}), this.emit("files-added", n), n.length > 5 ? this.log(`Added batch of ${n.length} files`) : Object.values(n).forEach((e) => {
			this.log(`Added file: ${e.name}\n id: ${e.id}\n type: ${e.type}`);
		}), n.length > 0 && this.#f();
	}
	removeFiles(e) {
		let { files: t, currentUploads: n } = this.getState(), r = { ...t }, i = { ...n }, a = Object.create(null);
		e.forEach((e) => {
			t[e] && (a[e] = t[e], delete r[e]);
		});
		function o(e) {
			return a[e] === void 0;
		}
		Object.keys(i).forEach((e) => {
			let t = n[e].fileIDs.filter(o);
			if (t.length === 0) {
				delete i[e];
				return;
			}
			let { capabilities: r } = this.getState();
			if (t.length !== n[e].fileIDs.length && !r.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
			i[e] = {
				...n[e],
				fileIDs: t
			};
		});
		let s = {
			currentUploads: i,
			files: r
		};
		Object.keys(r).length === 0 && (s.allowNewUpload = !0, s.error = null, s.recoveredState = null), this.setState(s), this.#v();
		let c = Object.keys(a);
		c.forEach((e) => {
			this.emit("file-removed", a[e]);
		}), c.length > 5 ? this.log(`Removed ${c.length} files`) : this.log(`Removed files: ${c.join(", ")}`);
	}
	removeFile(e) {
		this.removeFiles([e]);
	}
	pauseResume(e) {
		if (!this.getState().capabilities.resumableUploads || this.getFile(e).progress.uploadComplete) return;
		let t = this.getFile(e), n = !t.isPaused;
		return this.setFileState(e, { isPaused: n }), this.emit("upload-pause", t, n), n;
	}
	pauseAll() {
		let e = { ...this.getState().files };
		Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
			e[t] = {
				...e[t],
				isPaused: !0
			};
		}), this.setState({ files: e }), this.emit("pause-all");
	}
	resumeAll() {
		let e = { ...this.getState().files };
		Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
			e[t] = {
				...e[t],
				isPaused: !1,
				error: null
			};
		}), this.setState({ files: e }), this.emit("resume-all");
	}
	#m() {
		let { files: e } = this.getState();
		return Object.keys(e).filter((t) => {
			let n = e[t];
			return n.error && (!n.missingRequiredMetaFields || n.missingRequiredMetaFields.length === 0);
		});
	}
	async #h() {
		let e = this.#m(), t = { ...this.getState().files };
		if (e.forEach((e) => {
			t[e] = {
				...t[e],
				isPaused: !1,
				error: null
			};
		}), this.setState({
			files: t,
			error: null
		}), this.emit("retry-all", this.getFilesByIds(e)), e.length === 0) return {
			successful: [],
			failed: []
		};
		let n = this.#C(e, { forceAllowNewUpload: !0 });
		return this.#E(n);
	}
	async retryAll() {
		let e = await this.#h();
		return this.emit("complete", e), e;
	}
	cancelAll() {
		this.emit("cancel-all");
		let { files: e } = this.getState(), t = Object.keys(e);
		t.length && this.removeFiles(t), this.setState(Ue);
	}
	retryUpload(e) {
		this.setFileState(e, {
			error: null,
			isPaused: !1
		}), this.emit("upload-retry", this.getFile(e));
		let t = this.#C([e], { forceAllowNewUpload: !0 });
		return this.#E(t);
	}
	logout() {
		this.iteratePlugins((e) => {
			e.provider?.logout?.();
		});
	}
	#g = (e, t) => {
		let n = e ? this.getFile(e.id) : void 0;
		if (e == null || !n) {
			this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
			return;
		}
		if (n.progress.percentage === 100) {
			this.log(`Not setting progress for a file that has been already uploaded: ${e.id}`);
			return;
		}
		let r = {
			bytesTotal: t.bytesTotal,
			percentage: t.bytesTotal != null && Number.isFinite(t.bytesTotal) && t.bytesTotal > 0 ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : void 0
		};
		n.progress.uploadStarted == null ? this.setFileState(e.id, { progress: {
			...n.progress,
			...r
		} }) : this.setFileState(e.id, { progress: {
			...n.progress,
			...r,
			bytesUploaded: t.bytesUploaded
		} }), this.#v();
	};
	#_() {
		let e = this.#y(), t = null;
		e != null && (t = Math.round(e * 100), t > 100 ? t = 100 : t < 0 && (t = 0)), this.emit("progress", t ?? 0), this.setState({ totalProgress: t ?? 0 });
	}
	#v = (0, Ve.default)(() => this.#_(), 500, {
		leading: !0,
		trailing: !0
	});
	[Symbol.for("uppy test: updateTotalProgress")]() {
		return this.#_();
	}
	#y() {
		let e = this.getFiles().filter((e) => e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess);
		if (e.length === 0) return 0;
		if (e.every((e) => e.progress.uploadComplete)) return 1;
		let t = (e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0, n = e.filter(t), r = e.filter((e) => !t(e));
		if (n.every((e) => e.progress.uploadComplete) && r.length > 0 && !r.every((e) => e.progress.uploadComplete)) return null;
		let i = n.reduce((e, t) => e + (t.progress.bytesTotal ?? 0), 0), a = n.reduce((e, t) => e + (t.progress.bytesUploaded || 0), 0);
		return i === 0 ? 0 : a / i;
	}
	#b() {
		let e = (e, t, n) => {
			let r = e.message || "Unknown error";
			e.details && (r += ` ${e.details}`), this.setState({ error: r }), t != null && t.id in this.getState().files && this.setFileState(t.id, {
				error: r,
				response: n
			});
		};
		this.on("error", e), this.on("upload-error", (t, n, r) => {
			if (e(n, t, r), typeof n == "object" && n.message) {
				this.log(n.message, "error");
				let e = Error(this.i18n("failedToUpload", { file: t?.name ?? "" }));
				e.isUserFacing = !0, e.details = n.message, n.details && (e.details += ` ${n.details}`), this.#s([e]);
			} else this.#s([n]);
		});
		let t = null;
		this.on("upload-stalled", (e, n) => {
			let { message: r } = e, i = n.map((e) => e.meta.name).join(", ");
			t ||= (this.info({
				message: r,
				details: i
			}, "warning", this.opts.infoTimeout), setTimeout(() => {
				t = null;
			}, this.opts.infoTimeout)), this.log(`${r} ${i}`.trim(), "warning");
		}), this.on("upload", () => {
			this.setState({ error: null });
		}), this.on("upload-start", (e) => {
			let t = e.filter((e) => {
				let t = e != null && this.getFile(e.id);
				return t || this.log(`Not setting progress for a file that has been removed: ${e?.id}`), t;
			}), n = Object.fromEntries(t.map((e) => [e.id, { progress: {
				uploadStarted: Date.now(),
				uploadComplete: !1,
				bytesUploaded: 0,
				bytesTotal: e.size
			} }]));
			this.patchFilesState(n);
		}), this.on("upload-progress", this.#g), this.on("upload-success", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let n = this.getFile(e.id).progress, r = this.#o.size > 0;
			this.setFileState(e.id, {
				progress: {
					...n,
					postprocess: r ? { mode: "indeterminate" } : void 0,
					uploadComplete: !0,
					...!r && { complete: !0 },
					percentage: 100,
					bytesUploaded: n.bytesTotal
				},
				response: t,
				uploadURL: t.uploadURL,
				isPaused: !1
			}), e.size ?? this.setFileState(e.id, { size: t.bytesUploaded || n.bytesTotal }), this.#v();
		}), this.on("preprocess-progress", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			this.setFileState(e.id, { progress: {
				...this.getFile(e.id).progress,
				preprocess: t
			} });
		}), this.on("preprocess-complete", (e) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let t = { ...this.getState().files };
			t[e.id] = {
				...t[e.id],
				progress: { ...t[e.id].progress }
			}, delete t[e.id].progress.preprocess, this.setState({ files: t });
		}), this.on("postprocess-progress", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			this.setFileState(e.id, { progress: {
				...this.getState().files[e.id].progress,
				postprocess: t
			} });
		}), this.on("postprocess-complete", (e) => {
			let t = e && this.getFile(e.id);
			if (t == null) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let { postprocess: n, ...r } = t.progress;
			this.patchFilesState({ [t.id]: { progress: {
				...r,
				complete: !0
			} } });
		}), this.on("restored", () => {
			this.#v();
		}), this.on("dashboard:file-edit-complete", (e) => {
			e && this.#c(e);
		}), typeof window < "u" && window.addEventListener && (window.addEventListener("online", this.#x), window.addEventListener("offline", this.#x), setTimeout(this.#x, 3e3));
	}
	updateOnlineStatus() {
		window.navigator.onLine ?? !0 ? (this.emit("is-online"), this.wasOffline &&= (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
	}
	#x = this.updateOnlineStatus.bind(this);
	getID() {
		return this.opts.id;
	}
	use(e, ...t) {
		if (typeof e != "function") throw TypeError(`Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`);
		let n = new e(this, ...t), r = n.id;
		if (!r) throw Error("Your plugin must have an id");
		if (!n.type) throw Error("Your plugin must have a type");
		let i = this.getPlugin(r);
		if (i) {
			let e = `Already found a plugin named '${i.id}'. Tried to use: '${r}'.\nUppy plugins must have unique \`id\` options.`;
			throw Error(e);
		}
		return e.VERSION && this.log(`Using ${r} v${e.VERSION}`), n.type in this.#e ? this.#e[n.type].push(n) : this.#e[n.type] = [n], n.install(), this.emit("plugin-added", n), this;
	}
	getPlugin(e) {
		for (let t of Object.values(this.#e)) {
			let n = t.find((t) => t.id === e);
			if (n != null) return n;
		}
	}
	[Symbol.for("uppy test: getPlugins")](e) {
		return this.#e[e];
	}
	iteratePlugins(e) {
		Object.values(this.#e).flat(1).forEach(e);
	}
	removePlugin(e) {
		this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
		let t = this.#e[e.type], n = t.findIndex((t) => t.id === e.id);
		n !== -1 && t.splice(n, 1);
		let r = { plugins: {
			...this.getState().plugins,
			[e.id]: void 0
		} };
		this.setState(r);
	}
	destroy() {
		this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll(), this.#n(), this.iteratePlugins((e) => {
			this.removePlugin(e);
		}), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", this.#x), window.removeEventListener("offline", this.#x));
	}
	hideInfo() {
		let { info: e } = this.getState();
		this.setState({ info: e.slice(1) }), this.emit("info-hidden");
	}
	info(e, t = "info", n = 3e3) {
		let r = typeof e == "object";
		this.setState({ info: [...this.getState().info, {
			type: t,
			message: r ? e.message : e,
			details: r ? e.details : null
		}] }), setTimeout(() => this.hideInfo(), n), this.emit("info-visible");
	}
	log(e, t) {
		let { logger: n } = this.opts;
		switch (t) {
			case "error":
				n.error(e);
				break;
			case "warning":
				n.warn(e);
				break;
			default:
				n.debug(e);
				break;
		}
	}
	#S = /* @__PURE__ */ new Map();
	registerRequestClient(e, t) {
		this.#S.set(e, t);
	}
	getRequestClientForFile(e) {
		if (!("remote" in e && e.remote)) throw Error(`Tried to get RequestClient for a non-remote file ${e.id}`);
		let t = this.#S.get(e.remote.requestClientId);
		if (t == null) throw Error(`requestClientId "${e.remote.requestClientId}" not registered for file "${e.id}"`);
		return t;
	}
	async restore(e) {
		this.log(`Core: Running restored upload "${e}"`);
		let t = await this.#E(e);
		return this.emit("complete", t), t;
	}
	#C(e, t = {}) {
		let { forceAllowNewUpload: n = !1 } = t, { allowNewUpload: r, currentUploads: i } = this.getState();
		if (!r && !n) throw Error("Cannot create a new upload: already uploading.");
		let a = Ie();
		return this.emit("upload", a, this.getFilesByIds(e)), this.setState({
			allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
			currentUploads: {
				...i,
				[a]: {
					fileIDs: e,
					step: 0,
					result: {}
				}
			}
		}), a;
	}
	[Symbol.for("uppy test: createUpload")](...e) {
		return this.#C(...e);
	}
	#w(e) {
		let { currentUploads: t } = this.getState();
		return t[e];
	}
	addResultData(e, t) {
		if (!this.#w(e)) {
			this.log(`Not setting result for an upload that has been removed: ${e}`);
			return;
		}
		let { currentUploads: n } = this.getState(), r = {
			...n[e],
			result: {
				...n[e].result,
				...t
			}
		};
		this.setState({ currentUploads: {
			...n,
			[e]: r
		} });
	}
	#T(e) {
		let { [e]: t, ...n } = this.getState().currentUploads;
		this.setState({ currentUploads: n });
	}
	async #E(e) {
		let t = () => {
			let { currentUploads: t } = this.getState();
			return t[e];
		}, n = t();
		if (!n) throw Error("Nonexistent upload");
		let r = [
			...this.#i,
			...this.#a,
			...this.#o
		];
		try {
			for (let i = n.step || 0; i < r.length; i++) {
				let a = r[i];
				this.setState({ currentUploads: {
					...this.getState().currentUploads,
					[e]: {
						...n,
						step: i
					}
				} });
				let { fileIDs: o } = n;
				if (await a(o, e), n = t(), !n) break;
			}
		} catch (t) {
			throw this.#T(e), t;
		}
		if (n) {
			n.fileIDs.forEach((e) => {
				let t = this.getFile(e);
				t?.progress.postprocess && this.emit("postprocess-complete", t);
			});
			let r = n.fileIDs.map((e) => this.getFile(e)), i = r.filter((e) => !e.error), a = r.filter((e) => e.error);
			this.addResultData(e, {
				successful: i,
				failed: a,
				uploadID: e
			}), n = t();
		}
		let i;
		return n && (i = n.result, this.#T(e)), i ??= (this.log(`Not setting result for an upload that has been removed: ${e}`), {
			successful: [],
			failed: [],
			uploadID: e
		}), i;
	}
	async upload() {
		this.#e.uploader?.length || this.log("No uploader type plugins are used", "warning");
		let { files: e } = this.getState();
		if (this.#m().length > 0) {
			let t = await this.#h();
			if (!(this.getFiles().filter((e) => e.progress.uploadStarted == null).length > 0)) return this.emit("complete", t), t;
			({files: e} = this.getState());
		}
		let t = this.opts.onBeforeUpload(e);
		if (t === !1) throw Error("Not starting the upload because onBeforeUpload returned false");
		t && typeof t == "object" && (e = t, this.setState({ files: e }));
		try {
			if (this.#t.validateMinNumberOfFiles(e), !this.#l(e)) throw new O(this.i18n("missingRequiredMetaField"));
			let { currentUploads: t } = this.getState(), n = Object.values(t).flatMap((e) => e.fileIDs), r = Object.keys(e).filter((e) => {
				let t = this.getFile(e);
				return t && !t.progress.uploadStarted && !n.includes(e);
			}), i = this.#C(r), a = await this.#E(i);
			return this.emit("complete", a), a;
		} catch (e) {
			throw this.#s([e]), e;
		}
	}
}, Ge = {
	name: "@uppy/xhr-upload",
	description: "Plain and simple classic HTML multipart form uploads with Uppy, as well as uploads using the HTTP PUT method.",
	version: "5.2.0",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'",
		"test:e2e": "vitest run --project browser"
	},
	keywords: [
		"file uploader",
		"xhr",
		"xhr upload",
		"XMLHttpRequest",
		"ajax",
		"fetch",
		"uppy",
		"uppy-plugin"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	],
	exports: {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	},
	dependencies: {
		"@uppy/companion-client": "^5.1.1",
		"@uppy/utils": "^7.2.0"
	},
	devDependencies: {
		"@uppy/core": "^5.2.0",
		"@uppy/dashboard": "^5.1.1",
		"@vitest/browser": "^3.2.4",
		jsdom: "^26.1.0",
		msw: "^2.10.4",
		nock: "^13.1.0",
		playwright: "1.57.0",
		typescript: "^5.8.3",
		vitest: "^3.2.4"
	},
	peerDependencies: { "@uppy/core": "^5.2.0" }
}, Ke = { strings: { uploadStalled: "Upload has not made any progress for %{seconds} seconds. You may want to retry it." } };
//#endregion
//#region node_modules/@uppy/xhr-upload/lib/index.js
function qe(e, t) {
	let n = t;
	return n ||= /* @__PURE__ */ Error("Upload error"), typeof n == "string" && (n = Error(n)), n instanceof Error || (n = Object.assign(/* @__PURE__ */ Error("Upload error"), { data: n })), E(e) ? (n = new l(n, e), n) : (n.request = e, n);
}
function Je(e) {
	return e.data.slice(0, e.data.size, e.meta.type);
}
var Ye = {
	formData: !0,
	fieldName: "file",
	method: "post",
	allowedMetaFields: !0,
	bundle: !1,
	headers: {},
	timeout: 30 * 1e3,
	limit: 5,
	withCredentials: !1,
	responseType: ""
}, Xe = class extends oe {
	static VERSION = Ge.version;
	#e;
	#t;
	uploaderEvents;
	constructor(e, t) {
		if (super(e, {
			...Ye,
			fieldName: t.bundle ? "files[]" : "file",
			...t
		}), this.type = "uploader", this.id = this.opts.id || "XHRUpload", this.defaultLocale = Ke, this.i18nInit(), this.#t = new D({ concurrency: this.opts.limit }), this.opts.bundle && !this.opts.formData) throw Error("`opts.formData` must be true when `opts.bundle` is enabled.");
		if (this.opts.bundle && typeof this.opts.headers == "function") throw Error("`opts.headers` can not be a function when the `bundle: true` option is set.");
		if (t?.allowedMetaFields === void 0 && "metaFields" in this.opts) throw Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
		this.uploaderEvents = Object.create(null), this.#e = (e) => async (t, n) => {
			try {
				let r = await f(t, {
					...n,
					onBeforeRequest: (t, n) => this.opts.onBeforeRequest?.(t, n, e),
					shouldRetry: this.opts.shouldRetry,
					onAfterResponse: this.opts.onAfterResponse,
					onTimeout: (t) => {
						let n = Math.ceil(t / 1e3), r = Error(this.i18n("uploadStalled", { seconds: n }));
						this.uppy.emit("upload-stalled", r, e);
					},
					onUploadProgress: (t) => {
						if (t.lengthComputable) for (let { id: n } of e) {
							let e = this.uppy.getFile(n);
							e != null && this.uppy.emit("upload-progress", e, {
								uploadStarted: e.progress.uploadStarted ?? 0,
								bytesUploaded: t.loaded / t.total * e.size,
								bytesTotal: e.size
							});
						}
					}
				}), i = await this.opts.getResponseData?.(r);
				if (r.responseType === "json") i ??= r.response;
				else try {
					i ??= JSON.parse(r.responseText);
				} catch (e) {
					throw Error("@uppy/xhr-upload expects a JSON response (with a `url` property). To parse non-JSON responses, use `getResponseData` to turn your response into JSON.", { cause: e });
				}
				let a = typeof i?.url == "string" ? i.url : void 0;
				for (let { id: t } of e) this.uppy.emit("upload-success", this.uppy.getFile(t), {
					status: r.status,
					body: i,
					uploadURL: a
				});
				return r;
			} catch (t) {
				if (t.name === "AbortError") return;
				let n = t.request;
				for (let r of e) this.uppy.emit("upload-error", this.uppy.getFile(r.id), qe(n, t), n);
				throw t;
			}
		};
	}
	getOptions(e) {
		let t = this.uppy.getState().xhrUpload, { headers: n } = this.opts, r = {
			...this.opts,
			...t || {},
			...e.xhrUpload || {},
			headers: {}
		};
		return typeof n == "function" ? r.headers = n(e) : Object.assign(r.headers, this.opts.headers), t && Object.assign(r.headers, t.headers), e.xhrUpload && Object.assign(r.headers, e.xhrUpload.headers), r;
	}
	addMetadata(e, t, n) {
		ee(n.allowedMetaFields, t).forEach((n) => {
			let r = t[n];
			Array.isArray(r) ? r.forEach((t) => e.append(n, t)) : e.append(n, r);
		});
	}
	createFormDataUpload(e, t) {
		let n = new FormData();
		this.addMetadata(n, e.meta, t);
		let r = Je(e);
		return e.name ? n.append(t.fieldName, r, e.meta.name) : n.append(t.fieldName, r), n;
	}
	createBundledUpload(e, t) {
		let n = new FormData(), { meta: r } = this.uppy.getState();
		return this.addMetadata(n, r, t), e.forEach((e) => {
			let t = this.getOptions(e), r = Je(e);
			e.name ? n.append(t.fieldName, r, e.name) : n.append(t.fieldName, r);
		}), n;
	}
	async #n(e) {
		let t = new se(this.uppy), n = new AbortController();
		t.onFileRemove(e.id, () => n.abort()), t.onCancelAll(e.id, () => n.abort());
		try {
			await this.#t.add(async (t) => {
				let r = this.getOptions(e), i = this.#e([e]), a = r.formData ? this.createFormDataUpload(e, r) : e.data;
				return i(typeof r.endpoint == "string" ? r.endpoint : await r.endpoint(e), {
					...r,
					body: a,
					signal: AbortSignal.any([t, n.signal])
				});
			});
		} catch (e) {
			if (e.name === "AbortError") return;
			throw e;
		} finally {
			t.remove();
		}
	}
	async #r(e) {
		let t = new AbortController();
		function n() {
			t.abort();
		}
		this.uppy.once("cancel-all", n);
		try {
			await this.#t.add(async (n) => {
				let r = this.uppy.getState().xhrUpload ?? {}, i = this.#e(e), a = this.createBundledUpload(e, {
					...this.opts,
					...r
				});
				return i(typeof this.opts.endpoint == "string" ? this.opts.endpoint : await this.opts.endpoint(e), {
					...this.opts,
					body: a,
					signal: AbortSignal.any([n, t.signal])
				});
			});
		} catch (e) {
			if (e.name === "AbortError") return;
			throw e;
		} finally {
			this.uppy.off("cancel-all", n);
		}
	}
	#i(e) {
		let t = this.getOptions(e), n = ee(t.allowedMetaFields, e.meta);
		return {
			...e.remote?.body,
			protocol: "multipart",
			endpoint: t.endpoint,
			size: e.data.size,
			fieldname: t.fieldName,
			metadata: Object.fromEntries(n.map((t) => [t, e.meta[t]])),
			httpMethod: t.method,
			useFormData: t.formData,
			headers: t.headers
		};
	}
	async #a(e) {
		await Promise.allSettled(e.map((e) => {
			if (e.isRemote) {
				let t = () => this.#t, n = new AbortController(), r = (t) => {
					t.id === e.id && n.abort();
				};
				return this.uppy.on("file-removed", r), this.uppy.getRequestClientForFile(e).uploadRemoteFile(e, this.#i(e), {
					signal: n.signal,
					getQueue: t
				}).finally(() => {
					this.uppy.off("file-removed", r);
				});
			}
			return this.#n(e);
		}));
	}
	#o = async (e) => {
		if (e.length === 0) {
			this.uppy.log("[XHRUpload] No files to upload!");
			return;
		}
		this.opts.limit === 0 && this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning"), this.uppy.log("[XHRUpload] Uploading...");
		let t = h(this.uppy.getFilesByIds(e)), n = g(t);
		if (this.uppy.emit("upload-start", n), this.opts.bundle) {
			if (t.some((e) => e.isRemote)) throw Error("Can’t upload remote files when the `bundle: true` option is set");
			if (typeof this.opts.headers == "function") throw TypeError("`headers` may not be a function when the `bundle: true` option is set");
			await this.#r(t);
		} else await this.#a(t);
	};
	install() {
		if (this.opts.bundle) {
			let { capabilities: e } = this.uppy.getState();
			this.uppy.setState({ capabilities: {
				...e,
				individualCancellation: !1
			} });
		}
		this.uppy.addUploader(this.#o);
	}
	uninstall() {
		if (this.opts.bundle) {
			let { capabilities: e } = this.uppy.getState();
			this.uppy.setState({ capabilities: {
				...e,
				individualCancellation: !0
			} });
		}
		this.uppy.removeUploader(this.#o);
	}
}, Ze = {
	pluralize: (e) => e === 1 ? 0 : 1,
	strings: {
		addFiles: "Ajouter des fichiers",
		startUpload: "Démarrer l'upload",
		cancel: "Annuler",
		dropzone: "Glissez-déposez vos fichiers ici ou utilisez « Ajouter des fichiers ».",
		ariaDropzone: "Zone de dépôt",
		ariaGlobalProgress: "Progression globale",
		empty: "Aucun fichier ajouté",
		headerPreview: "Aperçu",
		headerFile: "Fichier",
		headerSize: "Taille",
		headerCaption: "Légende",
		headerStatus: "Statut",
		headerProgress: "Progression",
		headerActions: "Actions",
		serverState: "Déjà sur serveur",
		captionPlaceholder: "Ajouter une légende",
		previewAlt: "Aperçu de %{name}",
		fallbackFileName: "fichier",
		unknownType: "type inconnu",
		statusDone: "Terminé",
		statusError: "Erreur",
		statusUploading: "Upload en cours",
		statusWaiting: "En attente",
		moveUp: "Monter",
		moveDown: "Descendre",
		remove: "Supprimer"
	}
}, Qe = {
	pluralize: (e) => e === 1 ? 0 : 1,
	strings: {
		addFiles: "Add files",
		startUpload: "Start upload",
		cancel: "Cancel",
		dropzone: "Drag and drop your files here or use \"Add files\".",
		ariaDropzone: "Drop zone",
		ariaGlobalProgress: "Overall progress",
		empty: "No file added",
		headerPreview: "Preview",
		headerFile: "File",
		headerSize: "Size",
		headerCaption: "Caption",
		headerStatus: "Status",
		headerProgress: "Progress",
		headerActions: "Actions",
		serverState: "Already on server",
		captionPlaceholder: "Add a caption",
		previewAlt: "Preview of %{name}",
		fallbackFileName: "file",
		unknownType: "unknown type",
		statusDone: "Done",
		statusError: "Error",
		statusUploading: "Uploading",
		statusWaiting: "Waiting",
		moveUp: "Move up",
		moveDown: "Move down",
		remove: "Remove"
	}
}, $e = {
	fr: Ze,
	en: Qe
}, et = "en", tt = $e.en.strings, nt = {
	endpoint: "./app.php",
	listEndpoint: "./app.php",
	deleteEndpoint: "./app.php",
	orderEndpoint: "./app.php",
	updateEndpoint: "./app.php",
	fieldName: "file",
	maxFileSize: 5 * 1024 * 1024,
	autoProceed: !1,
	multiple: !0,
	showRemoteFiles: !0,
	persistOrder: !0,
	locale: "en",
	labels: {}
}, rt = (e, t = {}) => {
	let n = $e.en, r = typeof e == "string" ? $e[e] || n : e || n;
	return {
		strings: {
			...n.strings,
			...r.strings,
			...t
		},
		pluralize: r.pluralize || n.pluralize
	};
}, it = (e) => {
	if (!Number.isFinite(e) || e <= 0) return "-";
	let t = [
		"o",
		"Ko",
		"Mo",
		"Go",
		"To"
	], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1), r = e / 1024 ** n;
	return `${r.toFixed(r >= 10 || n === 0 ? 0 : 1)} ${t[n]}`;
}, at = class {
	constructor(e = {}) {
		this.options = {
			...nt,
			...e
		}, this.options.updateEndpoint = e.updateEndpoint ?? e.orderEndpoint ?? "./app.php";
		let t = rt(this.options.locale, this.options.labels);
		this.strings = t.strings, this.pluralize = t.pluralize, this.labels = this.strings, this.remoteFiles = [], this.localOrder = [], this.remoteOrder = [], this.previewUrls = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Set(), this.eventListeners = /* @__PURE__ */ new Map(), this.uppy = new We({
			autoProceed: this.options.autoProceed,
			allowMultipleUploadBatches: !0,
			restrictions: {
				maxNumberOfFiles: this.options.multiple ? null : 1,
				maxFileSize: this.options.maxFileSize
			}
		}), this.uppy.use(Xe, {
			endpoint: this.options.endpoint,
			method: "post",
			fieldName: this.options.fieldName,
			formData: !0
		}), this.bindUppyEvents();
	}
	async init() {
		this.options.showRemoteFiles && await this.loadRemoteFiles(), this.emit("ready", { state: this.getState() }), this.notify();
	}
	on(e, t) {
		return this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), this.eventListeners.get(e).add(t), () => {
			this.eventListeners.get(e)?.delete(t);
		};
	}
	emit(e, t = {}) {
		let n = this.eventListeners.get(e);
		if (n) for (let r of n) try {
			r(t);
		} catch (t) {
			console.error(`Event listener failed for ${e}`, t);
		}
	}
	subscribe(e) {
		return this.listeners.add(e), e(this.getState()), () => {
			this.listeners.delete(e);
		};
	}
	notify() {
		let e = this.getState();
		for (let t of this.listeners) t(e);
		this.emit("change", { state: e });
	}
	bindUppyEvents() {
		this.uppy.on("upload-progress", () => this.notify()), this.uppy.on("upload-success", (e, t) => {
			let n = t?.body?.id || t?.body?.file?.id;
			n && (this.uppy.setFileMeta(e.id, { serverId: n }), this.remoteFiles = this.remoteFiles.filter((e) => String(e.id) !== String(n))), this.emit("uploadSuccess", {
				file: e,
				response: t,
				serverId: n,
				state: this.getState()
			}), this.notify();
		}), this.uppy.on("upload-error", (e, t, n) => {
			this.emit("uploadError", {
				file: e,
				error: t,
				response: n,
				state: this.getState()
			}), this.notify();
		}), this.uppy.on("file-removed", (e) => {
			this.revokePreview(e.id), this.notify();
		}), this.uppy.on("file-added", () => {
			this.syncLocalOrder(), this.notify();
		});
	}
	getState() {
		let e = this.getOrderedLocalFiles(), t = this.getOrderedRemoteFiles(), n = e.reduce((e, t) => e + (t.progress?.bytesTotal || t.size || 0), 0), r = e.reduce((e, t) => e + (t.progress?.bytesUploaded || 0), 0), i = n > 0 ? Math.round(r / n * 100) : 0;
		return {
			localFiles: e,
			remoteFiles: t,
			counts: {
				local: e.length,
				remote: t.length
			},
			progress: i
		};
	}
	t(e, t = {}) {
		let n = this.strings[e];
		if (n == null) return e;
		if (typeof n == "object") {
			let e = this.pluralize(Number(t.count ?? 0));
			n = n[e] ?? n[0] ?? "";
		}
		return String(n).replace(/%\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e);
	}
	computeFileStatus(e) {
		return e.progress?.uploadComplete ? this.t("statusDone") : e.error ? this.t("statusError") : e.progress?.uploadStarted ? this.t("statusUploading") : this.t("statusWaiting");
	}
	getPreviewUrl(e) {
		if (!e.type?.startsWith("image/")) return null;
		let t = this.previewUrls.get(e.id);
		if (t) return t;
		let n = URL.createObjectURL(e.data);
		return this.previewUrls.set(e.id, n), n;
	}
	revokePreview(e) {
		let t = this.previewUrls.get(e);
		t && (URL.revokeObjectURL(t), this.previewUrls.delete(e));
	}
	addFiles(e) {
		e.forEach((e) => {
			try {
				this.uppy.addFile({
					name: e.name,
					type: e.type,
					data: e
				});
			} catch (t) {
				console.error("Impossible d'ajouter le fichier", e.name, t);
			}
		}), this.syncLocalOrder(), this.notify();
	}
	async startUpload() {
		await this.uppy.upload(), this.notify();
	}
	cancelAll() {
		this.uppy.cancelAll(), this.notify();
	}
	moveLocal(e, t) {
		this.moveInOrder(this.localOrder, e, t), this.emit("reorder", {
			scope: "local",
			id: e,
			direction: t,
			order: [...this.localOrder],
			persisted: !1,
			state: this.getState()
		}), this.notify();
	}
	async moveRemote(e, t) {
		let n = [...this.remoteOrder];
		if (this.moveInOrder(this.remoteOrder, e, t), this.notify(), this.options.persistOrder) try {
			let t = this.remoteOrder.indexOf(String(e)) + 1, n = await this.updateRemoteFile(String(e), { order: t }), r = String(n?.file?.id || e);
			await this.loadRemoteFiles(), e = r;
		} catch (r) {
			this.remoteOrder = n, this.notify(), this.emit("reorder", {
				scope: "remote",
				id: e,
				direction: t,
				order: [...this.remoteOrder],
				persisted: !1,
				error: r,
				state: this.getState()
			});
			return;
		}
		this.emit("reorder", {
			scope: "remote",
			id: e,
			direction: t,
			order: [...this.remoteOrder],
			persisted: !!this.options.persistOrder,
			state: this.getState()
		}), this.notify();
	}
	async removeRemoteById(e) {
		try {
			await this.deleteRemoteById(e), this.emit("deleteSuccess", {
				id: e,
				scope: "remote",
				state: this.getState()
			}), this.remoteFiles = this.remoteFiles.filter((t) => String(t.id) !== String(e)), this.syncRemoteOrder(), this.notify();
		} catch (t) {
			throw this.emit("deleteError", {
				id: e,
				scope: "remote",
				error: t,
				state: this.getState()
			}), t;
		}
	}
	async removeLocalById(e) {
		let t = this.uppy.getFile(e);
		if (t?.progress?.uploadComplete) try {
			await this.deleteRemoteFile(t), this.emit("deleteSuccess", {
				id: t.meta?.serverId || t.response?.body?.id || t.response?.body?.file?.id || e,
				scope: "remote",
				state: this.getState()
			});
		} catch (t) {
			throw this.emit("deleteError", {
				id: e,
				scope: "remote",
				error: t,
				state: this.getState()
			}), t;
		}
		this.revokePreview(e), this.uppy.removeFile(e), this.emit("deleteSuccess", {
			id: e,
			scope: "local",
			state: this.getState()
		}), this.notify();
	}
	moveInOrder(e, t, n) {
		let r = e.indexOf(String(t));
		if (r === -1) return;
		let i = n === "up" ? r - 1 : r + 1;
		if (i < 0 || i >= e.length) return;
		let [a] = e.splice(r, 1);
		e.splice(i, 0, a);
	}
	syncLocalOrder() {
		let e = this.uppy.getFiles().map((e) => String(e.id));
		this.localOrder = this.syncOrderArray(this.localOrder, e);
	}
	syncRemoteOrder() {
		let e = this.remoteFiles.map((e) => String(e.id));
		this.remoteOrder = this.syncOrderArray(this.remoteOrder, e);
	}
	syncOrderArray(e, t) {
		let n = e.filter((e) => t.includes(e)), r = t.filter((e) => !n.includes(e));
		return [...n, ...r];
	}
	getOrderedLocalFiles() {
		this.syncLocalOrder();
		let e = new Map(this.uppy.getFiles().map((e) => [String(e.id), e]));
		return this.localOrder.map((t) => e.get(t)).filter(Boolean);
	}
	getOrderedRemoteFiles() {
		this.syncRemoteOrder();
		let e = new Map(this.remoteFiles.map((e) => [String(e.id), e]));
		return this.remoteOrder.map((t) => e.get(t)).filter(Boolean);
	}
	async deleteRemoteFile(e) {
		let t = e?.meta?.serverId || e?.response?.body?.id || e?.response?.body?.file?.id;
		t && await this.deleteRemoteById(t);
	}
	async deleteRemoteById(e) {
		let t = `${this.options.deleteEndpoint}?id=${encodeURIComponent(e)}`, n = await fetch(t, { method: "DELETE" });
		if (!n.ok) {
			let e = await n.json().catch(() => ({}));
			throw Error(e.error || `Suppression refusee (${n.status})`);
		}
	}
	async updateRemoteFile(e, t) {
		let n = await fetch(this.options.updateEndpoint, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: e,
				changes: t
			})
		}), r = await n.json().catch(() => ({}));
		if (!n.ok) {
			let i = Error(r.error || `Mise a jour fichier refusee (${n.status})`);
			throw this.emit("fileUpdateError", {
				id: e,
				changes: t,
				error: i,
				state: this.getState()
			}), i;
		}
		return this.emit("fileUpdate", {
			id: e,
			changes: t,
			file: r.file,
			state: this.getState()
		}), r;
	}
	async saveRemoteCaption(e, t) {
		let n = this.remoteFiles.find((t) => String(t.id) === String(e)), r = String(n?.caption || ""), i = String(t || "").trim();
		if (r !== i) try {
			let t = await this.updateRemoteFile(String(e), { caption: i });
			this.remoteFiles = this.remoteFiles.map((n) => String(n.id) === String(e) ? {
				...n,
				...t.file
			} : n), this.notify();
		} catch (e) {
			throw e;
		}
	}
	async loadRemoteFiles() {
		try {
			let e = await fetch(this.options.listEndpoint, { method: "GET" });
			if (!e.ok) return;
			let t = await e.json().catch(() => ({}));
			Array.isArray(t.files) && (this.remoteFiles = t.files, this.syncRemoteOrder());
		} catch (e) {
			console.error("Chargement des fichiers serveur impossible", e);
		}
	}
	async reload() {
		await this.loadRemoteFiles(), this.notify();
	}
	destroy() {
		this.uppy.cancelAll(), this.uppy.close();
		for (let e of this.previewUrls.values()) URL.revokeObjectURL(e);
		this.previewUrls.clear(), this.listeners.clear(), this.eventListeners.clear();
	}
};
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/constants.js
var ot = {}, k = Symbol("uninitialized"), st = "http://www.w3.org/1999/xhtml", ct = Array.isArray, lt = Array.prototype.indexOf, ut = Array.prototype.includes, dt = Array.from, ft = Object.keys, pt = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, ht = Object.getOwnPropertyDescriptors, gt = Object.prototype, _t = Array.prototype, vt = Object.getPrototypeOf, yt = Object.isExtensible, bt = () => {};
function xt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function St() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var A = 1024, j = 2048, Ct = 4096, wt = 8192, Tt = 16384, Et = 32768, Dt = 1 << 25, Ot = 65536, kt = 1 << 19, At = 1 << 20, jt = 1 << 25, Mt = 65536, Nt = 1 << 21, Pt = 1 << 22, Ft = 1 << 23, It = Symbol("$state"), Lt = Symbol("legacy props"), Rt = Symbol(""), zt = Symbol("attributes"), Bt = Symbol("class"), Vt = Symbol("style"), Ht = Symbol("text"), Ut = Symbol("form reset"), Wt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Gt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function Kt(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function qt() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Jt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Yt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Xt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Zt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Qt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function $t() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function en(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function tn() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function nn() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function rn() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function an() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function on() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function sn(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function cn() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var M = !1;
function ln(e) {
	M = e;
}
var N;
function P(e) {
	if (e === null) throw sn(), ot;
	return N = e;
}
function un() {
	return P(/* @__PURE__ */ Rr(N));
}
function F(e) {
	if (M) {
		if (/* @__PURE__ */ Rr(N) !== null) throw sn(), ot;
		N = e;
	}
}
function dn(e = 1) {
	if (M) {
		for (var t = e, n = N; t--;) n = /* @__PURE__ */ Rr(n);
		N = n;
	}
}
function fn(e = !0) {
	for (var t = 0, n = N;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Rr(n);
		e && n.remove(), n = i;
	}
}
function pn(e) {
	if (!e || e.nodeType !== 8) throw sn(), ot;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function mn(e) {
	return e === this.v;
}
function hn(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function gn(e) {
	return !hn(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var _n = !1, vn = !1, I = null;
function yn(e) {
	I = e;
}
function bn(e, t = !1, n) {
	I = {
		p: I,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: q,
		l: vn && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function xn(e) {
	var t = I, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Qr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, I = t.p, e ?? {};
}
function Sn() {
	return !vn || I !== null && I.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Cn = [];
function wn() {
	var e = Cn;
	Cn = [], xt(e);
}
function Tn(e) {
	if (Cn.length === 0 && !Bn) {
		var t = Cn;
		queueMicrotask(() => {
			t === Cn && wn();
		});
	}
	Cn.push(e);
}
function En() {
	for (; Cn.length > 0;) wn();
}
function Dn(e) {
	var t = q;
	if (t === null) return G.f |= Ft, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	On(e, t);
}
function On(e, t) {
	for (; t !== null;) {
		if (t.f & 128) {
			if (!(t.f & 32768)) throw e;
			try {
				t.b.error(e);
				return;
			} catch (t) {
				e = t;
			}
		}
		t = t.parent;
	}
	throw e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var kn = ~(j | Ct | A);
function L(e, t) {
	e.f = e.f & kn | t;
}
function An(e) {
	e.f & 512 || e.deps === null ? L(e, A) : L(e, Ct);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function jn(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= Mt, jn(t.deps));
}
function Mn(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), jn(e.deps), L(e, A);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Nn = !1, Pn = !1;
function Fn(e) {
	var t = Pn;
	try {
		return Pn = !1, [e(), Pn];
	} finally {
		Pn = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var In = null, Ln = null, R = null, Rn = null, z = null, zn = null, Bn = !1, Vn = !1, Hn = null, Un = null, Wn = 0, Gn = 1, Kn = class e {
	id = Gn++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Ln === null ? In = Ln = this : (Ln.#n = this, this.#t = Ln), Ln = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) L(r, j), t(r);
			for (r of n.m) L(r, Ct), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Wn++ > 1e3 && (this.#S(), Jn());
		for (let e of this.#u) this.#d.delete(e), L(e, j), this.schedule(e);
		for (let e of this.#d) L(e, Ct), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Hn = [], r = [], i = Un = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw tr(e), this.#h() || this.discard(), t;
		}
		if (R = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Hn = null, Un = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) er(e, t);
			i.length > 0 && R.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Rn = this, Xn(r), Xn(n), Rn = null, this.#s?.resolve();
		var s = R;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), _n && (this.#x(), R = s)), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= A;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= A : i & 4 ? t.push(r) : _n && i & 16777224 ? n.push(r) : ji(r) && (i & 16 && this.#d.add(r), Ii(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#y(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), L(i, j), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), R = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Mn(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== k && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), z?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		R = this;
	}
	deactivate() {
		R = null, z = null;
	}
	flush() {
		try {
			Vn = !0, R = this, this.#g();
		} finally {
			Wn = 0, zn = null, Hn = null, Un = null, Vn = !1, R = null, z = null, xr.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear(), this.#S(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	#x() {
		for (let l = In; l !== null; l = l.#n) {
			var e = l.id < this.id, t = [];
			for (let [r, [i, a]] of this.current) {
				if (l.current.has(r)) {
					var n = l.current.get(r)[0];
					if (e && i !== n) l.current.set(r, [i, a]);
					else continue;
				}
				t.push(r);
			}
			if (e) for (let [e, t] of this.async_deriveds) {
				let n = l.async_deriveds.get(e);
				n && t.promise.then(n.resolve).catch(n.reject);
			}
			if (l.#e) {
				var r = [...l.current.keys()].filter((e) => !l.current.get(e)[1] && !this.current.has(e));
				if (r.length === 0) e && l.discard();
				else if (t.length > 0) {
					if (e) for (let e of this.#p) l.unskip_effect(e, (e) => {
						e.f & 4194320 ? l.schedule(e) : l.#b([e]);
					});
					l.activate();
					var i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
					for (var o of t) Zn(o, r, i, a);
					a = /* @__PURE__ */ new Map();
					var s = [...l.current].filter(([e, t]) => {
						let n = this.current.get(e);
						return n ? n[0] !== t[0] || n[1] !== t[1] : !0;
					}).map(([e]) => e);
					if (s.length > 0) for (let e of this.#l) !(e.f & 155648) && Qn(e, s, a) && (e.f & 4194320 ? (L(e, j), l.schedule(e)) : l.#u.add(e));
					if (l.#c.length > 0 && !l.#m) {
						l.apply();
						for (var c of l.#c) l.#_(c, [], []);
						l.#c = [];
					}
					l.deactivate();
				}
			}
		}
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, Tn(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= St()).promise;
	}
	static ensure() {
		if (R === null) {
			let t = R = new e();
			!Vn && !Bn && Tn(() => {
				t.#e || t.flush();
			});
		}
		return R;
	}
	apply() {
		if (!_n || !this.is_fork && this.#t === null && this.#n === null) {
			z = null;
			return;
		}
		z = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) z.set(e, t);
		for (let t = In; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
			var e = !1;
			if (t.id < this.id) {
				for (let [n, [, r]] of t.current) if (!r && this.current.has(n)) {
					e = !0;
					break;
				}
			}
			if (!e) for (let [e, n] of t.previous) z.has(e) || z.set(e, n);
		}
	}
	schedule(e) {
		if (zn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Hn !== null && t === q && (_n || (G === null || !(G.f & 2)) && !Nn)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= A;
			}
		}
		this.#c.push(t);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null ? In = t : e.#n = t, t === null ? Ln = e : t.#t = e, this.linked = !1;
		}
	}
};
function qn(e) {
	var t = Bn;
	Bn = !0;
	try {
		var n;
		for (e && (R !== null && !R.is_fork && R.flush(), n = e());;) {
			if (En(), R === null) return n;
			R.flush();
		}
	} finally {
		Bn = t;
	}
}
function Jn() {
	try {
		Qt();
	} catch (e) {
		On(e, zn);
	}
}
var Yn = null;
function Xn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ji(r) && (Yn = /* @__PURE__ */ new Set(), Ii(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ui(r), Yn?.size > 0)) {
				xr.clear();
				for (let e of Yn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Yn.has(n) && (Yn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Ii(n);
					}
				}
				Yn.clear();
			}
		}
		Yn = null;
	}
}
function Zn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Zn(i, t, n, r) : e & 4194320 && !(e & 2048) && Qn(i, t, r) && (L(i, j), $n(i));
	}
}
function Qn(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (ut.call(t, r)) return !0;
		if (r.f & 2 && Qn(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function $n(e) {
	R.schedule(e);
}
function er(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), L(e, A);
		for (var n = e.first; n !== null;) er(n, t), n = n.next;
	}
}
function tr(e) {
	L(e, A);
	for (var t = e.first; t !== null;) tr(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function nr(e) {
	let t = 0, n = Cr(0), r;
	return () => {
		Yr() && (X(n), ri(() => (t === 0 && (r = zi(() => e(() => Or(n)))), t += 1, () => {
			Tn(() => {
				--t, t === 0 && (r?.(), r = void 0, Or(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var rr = Ot | kt;
function ir(e, t, n, r) {
	new ar(e, t, n, r);
}
var ar = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = M ? N : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = nr(() => (this.#m = Cr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = q.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = ai(() => {
			if (M) {
				let e = this.#t;
				un();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, rr), M && (this.#e = N);
	}
	#g() {
		try {
			this.#a = U(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = U(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = U(() => e(this.#e)), Tn(() => {
			var e = this.#c = document.createDocumentFragment(), t = Ir();
			e.append(t), this.#a = this.#x(() => U(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, di(this.#o, () => {
				this.#o = null;
			}), this.#b(R));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = U(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				hi(this.#a, e);
				let t = this.#n.pending;
				this.#o = U(() => t(this.#e));
			} else this.#b(R);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Mn(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = q, n = G, r = I;
		xi(this.#i), K(this.#i), yn(this.#i.ctx);
		try {
			return Kn.ensure(), e();
		} catch (e) {
			return Dn(e), null;
		} finally {
			xi(t), K(n), yn(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && di(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Tn(() => {
			this.#d = !1, this.#m && Er(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), X(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		R?.is_fork ? (this.#a && R.skip_effect(this.#a), this.#o && R.skip_effect(this.#o), this.#s && R.skip_effect(this.#s), R.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (W(this.#a), null), this.#o &&= (W(this.#o), null), this.#s &&= (W(this.#s), null), M && (P(this.#t), dn(), P(fn()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				cn();
				return;
			}
			r = !0, i && an(), this.#s !== null && di(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				On(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return U(() => {
						var t = q;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return On(e, this.#i.parent), null;
				}
			}));
		};
		Tn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				On(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => On(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function or(e, t, n, r) {
	let i = Sn() ? ur : mr;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q, c = sr(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				On(e, s);
			}
			cr();
		}
	}
	var d = lr();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ fr(e))).then(u).catch((e) => On(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), cr();
	}) : f();
}
function sr() {
	var e = q, t = G, n = I, r = R;
	return function(i = !0) {
		xi(e), K(t), yn(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function cr(e = !0) {
	xi(null), K(null), yn(null), e && R?.deactivate();
}
function lr() {
	var e = q, t = e.b, n = R, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ur(e) {
	var t = 2 | j;
	return q !== null && (q.f |= kt), {
		ctx: I,
		deps: null,
		effects: null,
		equals: mn,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: k,
		wv: 0,
		parent: q,
		ac: null
	};
}
var dr = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function fr(e, t, n) {
	let r = q;
	r === null && qt();
	var i = void 0, a = Cr(k), o = !G, s = /* @__PURE__ */ new Set();
	return ni(() => {
		var t = q, n = St();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Wt && n.reject(e);
			}).finally(cr);
		} catch (e) {
			n.reject(e), cr();
		}
		var c = R;
		if (o) {
			if (t.f & 32768) var l = lr();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(dr);
			else for (let e of s.values()) e.reject(dr);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== dr && (c.activate(), t ? (a.f |= Ft, Er(a, t)) : (a.f & 8388608 && (a.f ^= Ft), Er(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Xr(() => {
		for (let e of s) e.reject(dr);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function pr(e) {
	let t = /* @__PURE__ */ ur(e);
	return _n || Ci(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function mr(e) {
	let t = /* @__PURE__ */ ur(e);
	return t.equals = gn, t;
}
function hr(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) W(t[n]);
	}
}
function gr(e) {
	var t, n = q, r = e.parent;
	if (!vi && r !== null && e.v !== k && r.f & 24576) return on(), e.v;
	xi(r);
	try {
		e.f &= ~Mt, hr(e), t = Ni(e);
	} finally {
		xi(n);
	}
	return t;
}
function _r(e) {
	var t = gr(e);
	if (!e.equals(t) && (e.wv = Ai(), (!R?.is_fork || e.deps === null) && (R === null ? e.v = t : (R.capture(e, t, !0), Rn?.capture(e, t, !0)), e.deps === null))) {
		L(e, A);
		return;
	}
	vi || (z === null ? An(e) : (Yr() || R?.is_fork) && z.set(e, t));
}
function vr(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Wt), t.fn !== null && (t.teardown = bt), t.ac = null, Fi(t, 0), si(t));
}
function yr(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Ii(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Map(), Sr = !1;
function Cr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: mn,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function wr(e, t) {
	let n = Cr(e, t);
	return Ci(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Tr(e, t = !1, n = !0) {
	let r = Cr(e);
	return t || (r.equals = gn), vn && n && I !== null && I.l !== null && (I.l.s ??= []).push(r), r;
}
function B(e, t, n = !1) {
	return G !== null && (!bi || G.f & 131072) && Sn() && G.f & 4325394 && (Si === null || !Si.has(e)) && rn(), Er(e, n ? Ar(t) : t, Un);
}
function Er(e, t, n = null) {
	if (!e.equals(t)) {
		xr.set(e, vi ? t : e.v);
		var r = Kn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && gr(t), z === null && An(t);
		}
		e.wv = Ai(), kr(e, j, n), Sn() && q !== null && q.f & 1024 && !(q.f & 96) && (wi === null ? Ti([e]) : wi.push(e)), !r.is_fork && br.size > 0 && !Sr && Dr();
	}
	return t;
}
function Dr() {
	Sr = !1;
	for (let e of br) {
		e.f & 1024 && L(e, Ct);
		let t;
		try {
			t = ji(e);
		} catch {
			t = !0;
		}
		t && Ii(e);
	}
	br.clear();
}
function Or(e) {
	B(e, e.v + 1);
}
function kr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Sn(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === q)) {
			var l = (c & j) === 0;
			if (l && L(s, t), c & 131072) br.add(s);
			else if (c & 2) {
				var u = s;
				z?.delete(u), c & 65536 || (c & 512 && (q === null || !(q.f & 2097152)) && (s.f |= Mt), kr(u, Ct, n));
			} else if (l) {
				var d = s;
				c & 16 && Yn !== null && Yn.add(d), n === null ? $n(d) : n.push(d);
			}
		}
	}
}
function Ar(e) {
	if (typeof e != "object" || !e || It in e) return e;
	let t = vt(e);
	if (t !== gt && t !== _t) return e;
	var n = /* @__PURE__ */ new Map(), r = ct(e), i = /* @__PURE__ */ wr(0), a = null, o = Oi, s = (e) => {
		if (Oi === o) return e();
		var t = G, n = Oi;
		K(null), ki(o);
		var r = e();
		return K(t), ki(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ wr(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && tn();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ wr(r.value, a);
				return n.set(t, e), e;
			}) : B(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ wr(k, a));
					n.set(t, e), Or(i);
				}
			} else B(r, k), Or(i);
			return !0;
		},
		get(t, r, i) {
			if (r === It) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || mt(t, r)?.writable) && (o = s(() => /* @__PURE__ */ wr(Ar(c ? t[r] : k), a)), n.set(r, o)), o !== void 0) {
				var l = X(o);
				return l === k ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = X(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== k) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === It) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== k || Reflect.has(e, t);
			return (r !== void 0 || q !== null && (!i || mt(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ wr(i ? Ar(e[t]) : k, a)), n.set(t, r)), X(r) === k) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ wr(k, a)), n.set(d + "", f)) : B(f, k);
			}
			if (l === void 0) (!u || mt(e, t)?.writable) && (l = s(() => /* @__PURE__ */ wr(void 0, a)), B(l, Ar(o)), n.set(t, l));
			else {
				u = l.v !== k;
				var p = s(() => Ar(o));
				B(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && B(h, g + 1);
				}
				Or(i);
			}
			return !0;
		},
		ownKeys(e) {
			X(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== k;
			});
			for (var [r, a] of n) a.v !== k && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			nn();
		}
	});
}
new Set([
	"copyWithin",
	"fill",
	"pop",
	"push",
	"reverse",
	"shift",
	"sort",
	"splice",
	"unshift"
]);
var jr, Mr, Nr, Pr;
function Fr() {
	if (jr === void 0) {
		jr = window, Mr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Nr = mt(t, "firstChild").get, Pr = mt(t, "nextSibling").get, yt(e) && (e[Bt] = void 0, e[zt] = null, e[Vt] = void 0, e.__e = void 0), yt(n) && (n[Ht] = void 0);
	}
}
function Ir(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Lr(e) {
	return Nr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Rr(e) {
	return Pr.call(e);
}
function V(e, t) {
	if (!M) return /* @__PURE__ */ Lr(e);
	var n = /* @__PURE__ */ Lr(N);
	if (n === null) n = N.appendChild(Ir());
	else if (t && n.nodeType !== 3) {
		var r = Ir();
		return n?.before(r), P(r), r;
	}
	return t && Hr(n), P(n), n;
}
function H(e, t = 1, n = !1) {
	let r = M ? N : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Rr(r);
	if (!M) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Ir();
			return r === null ? i?.after(a) : r.before(a), P(a), a;
		}
		Hr(r);
	}
	return P(r), r;
}
function zr(e) {
	e.textContent = "";
}
function Br() {
	return !_n || Yn !== null ? !1 : (q.f & Et) !== 0;
}
function Vr(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Hr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
var Ur = !1;
function Wr() {
	Ur || (Ur = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Ut]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Gr(e) {
	var t = G, n = q;
	K(null), xi(null);
	try {
		return e();
	} finally {
		K(t), xi(n);
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function Kr(e) {
	q === null && (G === null && Zt(e), Xt()), vi && Yt(e);
}
function qr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Jr(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= wt);
	var r = {
		ctx: I,
		deps: null,
		nodes: null,
		f: e | j | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	R?.register_created_effect(r);
	var i = r;
	if (e & 4) Hn === null ? Kn.ensure().schedule(r) : Hn.push(r);
	else if (t !== null) {
		try {
			Ii(r);
		} catch (e) {
			throw W(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Ot));
	}
	if (i !== null && (i.parent = n, n !== null && qr(i, n), G !== null && G.f & 2 && !(e & 64))) {
		var a = G;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Yr() {
	return G !== null && !bi;
}
function Xr(e) {
	let t = Jr(8, null);
	return L(t, A), t.teardown = e, t;
}
function Zr(e) {
	Kr("$effect");
	var t = q.f;
	if (!G && t & 32 && I !== null && !I.i) {
		var n = I;
		(n.e ??= []).push(e);
	} else return Qr(e);
}
function Qr(e) {
	return Jr(4 | At, e);
}
function $r(e) {
	Kn.ensure();
	let t = Jr(64 | kt, e);
	return () => {
		W(t);
	};
}
function ei(e) {
	Kn.ensure();
	let t = Jr(64 | kt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? di(t, () => {
			W(t), n(void 0);
		}) : (W(t), n(void 0));
	});
}
function ti(e) {
	return Jr(4, e);
}
function ni(e) {
	return Jr(Pt | kt, e);
}
function ri(e, t = 0) {
	return Jr(8 | t, e);
}
function ii(e, t = [], n = [], r = []) {
	or(r, t, n, (t) => {
		Jr(8, () => {
			e(...t.map(X));
		});
	});
}
function ai(e, t = 0) {
	return Jr(16 | t, e);
}
function U(e) {
	return Jr(32 | kt, e);
}
function oi(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = vi, n = G;
		yi(!0), K(null);
		try {
			t.call(null);
		} finally {
			yi(e), K(n);
		}
	}
}
function si(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Gr(() => {
			e.abort(Wt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : W(n, t), n = r;
	}
}
function ci(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || W(t), t = n;
	}
}
function W(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (li(e.nodes.start, e.nodes.end), n = !0), e.f |= Dt, si(e, t && !n), Fi(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	oi(e), e.f ^= Dt, e.f |= Tt;
	var i = e.parent;
	i !== null && i.first !== null && ui(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function li(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Rr(e);
		e.remove(), e = n;
	}
}
function ui(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function di(e, t, n = !0) {
	var r = [];
	fi(e, r, !0);
	var i = () => {
		n && W(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function fi(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= wt;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				fi(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function pi(e) {
	mi(e, !0);
}
function mi(e, t) {
	if (e.f & 8192) {
		e.f ^= wt, e.f & 1024 || (L(e, j), Kn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			mi(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function hi(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Rr(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var gi = null, _i = !1, vi = !1;
function yi(e) {
	vi = e;
}
var G = null, bi = !1;
function K(e) {
	G = e;
}
var q = null;
function xi(e) {
	q = e;
}
var Si = null;
function Ci(e) {
	G !== null && (!_n || G.f & 2) && (Si ??= /* @__PURE__ */ new Set()).add(e);
}
var J = null, Y = 0, wi = null;
function Ti(e) {
	wi = e;
}
var Ei = 1, Di = 0, Oi = Di;
function ki(e) {
	Oi = e;
}
function Ai() {
	return ++Ei;
}
function ji(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~Mt), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ji(a) && _r(a), a.wv > e.wv) return !0;
		}
		t & 512 && z === null && L(e, A);
	}
	return !1;
}
function Mi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!_n && Si !== null && Si.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Mi(a, t, !1) : t === a && (n ? L(a, j) : a.f & 1024 && L(a, Ct), $n(a));
	}
}
function Ni(e) {
	var t = J, n = Y, r = wi, i = G, a = Si, o = I, s = bi, c = Oi, l = e.f;
	J = null, Y = 0, wi = null, G = l & 96 ? null : e, Si = null, yn(e.ctx), bi = !1, Oi = ++Di, e.ac !== null && (Gr(() => {
		e.ac.abort(Wt);
	}), e.ac = null);
	try {
		e.f |= Nt;
		var u = e.fn, d = u();
		e.f |= Et;
		var f = e.deps, p = R?.is_fork;
		if (J !== null) {
			var m;
			if (p || Fi(e, Y), f !== null && Y > 0) for (f.length = Y + J.length, m = 0; m < J.length; m++) f[Y + m] = J[m];
			else e.deps = f = J;
			if (Yr() && e.f & 512) for (m = Y; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Y < f.length && (Fi(e, Y), f.length = Y);
		if (Sn() && wi !== null && !bi && f !== null && !(e.f & 6146)) for (m = 0; m < wi.length; m++) Mi(wi[m], e);
		if (i !== null && i !== e) {
			if (Di++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Di;
			if (t !== null) for (let e of t) e.rv = Di;
			wi !== null && (r === null ? r = wi : r.push(...wi));
		}
		return e.f & 8388608 && (e.f ^= Ft), d;
	} catch (e) {
		return Dn(e);
	} finally {
		e.f ^= Nt, J = t, Y = n, wi = r, G = i, Si = a, yn(o), bi = s, Oi = c;
	}
}
function Pi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = lt.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (J === null || !ut.call(J, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~Mt), a.v !== k && An(a), vr(a), Fi(a, 0);
	}
}
function Fi(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Pi(e, n[r]);
}
function Ii(e) {
	var t = e.f;
	if (!(t & 16384)) {
		L(e, A);
		var n = q, r = _i;
		q = e, _i = !0;
		try {
			t & 16777232 ? ci(e) : si(e), oi(e);
			var i = Ni(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Ei;
		} finally {
			_i = r, q = n;
		}
	}
}
function X(e) {
	var t = (e.f & 2) != 0;
	if (gi?.add(e), G !== null && !bi && !(q !== null && q.f & 16384) && (Si === null || !Si.has(e))) {
		var n = G.deps;
		if (G.f & 2097152) e.rv < Di && (e.rv = Di, J === null && n !== null && n[Y] === e ? Y++ : J === null ? J = [e] : J.push(e));
		else {
			G.deps ??= [], ut.call(G.deps, e) || G.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [G] : ut.call(r, G) || r.push(G);
		}
	}
	if (vi && xr.has(e)) return xr.get(e);
	if (t) {
		var i = e;
		if (vi) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Ri(i)) && (a = gr(i)), xr.set(i, a), a;
		}
		var o = (i.f & 512) == 0 && !bi && G !== null && (_i || (G.f & 512) != 0), s = (i.f & Et) === 0;
		ji(i) && (o && (i.f |= 512), _r(i)), o && !s && (yr(i), Li(i));
	}
	if (z?.has(e)) return z.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Li(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (yr(t), Li(t));
}
function Ri(e) {
	if (e.v === k) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (xr.has(t) || t.f & 2 && Ri(t)) return !0;
	return !1;
}
function zi(e) {
	var t = bi;
	try {
		return bi = !0, e();
	} finally {
		bi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Bi = Symbol("events"), Vi = /* @__PURE__ */ new Set(), Hi = /* @__PURE__ */ new Set();
function Ui(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ji.call(t, e), !e.cancelBubble) return Gr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Tn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Wi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Ui(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Xr(() => {
		t.removeEventListener(e, o, a);
	});
}
function Gi(e, t, n) {
	(t[Bi] ??= {})[e] = n;
}
function Ki(e) {
	for (var t = 0; t < e.length; t++) Vi.add(e[t]);
	for (var n of Hi) n(e);
}
var qi = null;
function Ji(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	qi = e;
	var o = 0, s = qi === e && e[Bi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Bi] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		pt(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = G, d = q;
		K(null), xi(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[Bi]?.[r];
					m != null && (!a.disabled || e.target === a) && m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[Bi] = t, delete e.currentTarget, K(u), xi(d);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Yi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Xi(e) {
	return Yi?.createHTML(e) ?? e;
}
function Zi(e) {
	var t = Vr("template");
	return t.innerHTML = Xi(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Qi(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function $i(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (M) return Qi(N, null), N;
		i === void 0 && (i = Zi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Lr(i)));
		var t = r || Mr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Lr(t), s = t.lastChild;
			Qi(o, s);
		} else Qi(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ea(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = (t & 1) != 0, a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (M) return Qi(N, null), N;
		if (!o) {
			var e = /* @__PURE__ */ Lr(Zi(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Lr(e);) o.appendChild(/* @__PURE__ */ Lr(e));
			else o = /* @__PURE__ */ Lr(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Lr(t), r = t.lastChild;
			Qi(n, r);
		} else Qi(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ta(e, t) {
	return /* @__PURE__ */ ea(e, t, "svg");
}
function Z(e, t) {
	if (M) {
		var n = q;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = N), un();
		return;
	}
	e !== null && e.before(t);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var na = ["touchstart", "touchmove"];
function ra(e) {
	return na.includes(e);
}
function Q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Ht] ??= e.nodeValue) && (e[Ht] = n, e.nodeValue = `${n}`);
}
function ia(e, t) {
	return sa(e, t);
}
function aa(e, t) {
	Fr(), t.intro = t.intro ?? !1;
	let n = t.target, r = M, i = N;
	try {
		for (var a = /* @__PURE__ */ Lr(n); a && (a.nodeType !== 8 || a.data !== "[");) a = /* @__PURE__ */ Rr(a);
		if (!a) throw ot;
		ln(!0), P(a);
		let r = sa(e, {
			...t,
			anchor: a
		});
		return ln(!1), r;
	} catch (r) {
		if (r instanceof Error && r.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw r;
		return r !== ot && console.warn("Failed to hydrate: ", r), t.recover === !1 && $t(), Fr(), zr(n), ln(!1), ia(e, t);
	} finally {
		ln(r), P(i);
	}
}
var oa = /* @__PURE__ */ new Map();
function sa(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Fr();
	var c = void 0, l = ei(() => {
		var o = n ?? t.appendChild(Ir());
		ir(o, { pending: () => {} }, (t) => {
			bn({});
			var n = I;
			if (a && (n.c = a), i && (r.$$events = i), M && Qi(t, null), c = e(t, r) || {}, M && (q.nodes.end = N, N === null || N.nodeType !== 8 || N.data !== "]")) throw sn(), ot;
			xn();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = ra(r);
					for (let e of [t, document]) {
						var a = oa.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), oa.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ji, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(dt(Vi)), Hi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = oa.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Ji), r.delete(e), r.size === 0 && oa.delete(n)) : r.set(e, i);
			}
			Hi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return ca.set(c, l), c;
}
var ca = /* @__PURE__ */ new WeakMap();
function la(e, t) {
	let n = ca.get(e);
	return n ? (ca.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
var ua = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) pi(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (pi(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (W(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						hi(r, t), t.append(Ir()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else W(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), di(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (W(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = R, r = Br();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = Ir();
			i.append(a), this.#n.set(e, {
				effect: U(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, U(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else M && (this.anchor = N), this.#a(n);
	}
};
function da(e) {
	I === null && Kt("onMount"), vn && I.l !== null ? fa(I).m.push(e) : Zr(() => {
		let t = zi(e);
		if (typeof t == "function") return t;
	});
}
function fa(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function pa(e, t, n = !1) {
	var r;
	M && (r = N, un());
	var i = new ua(e), a = n ? Ot : 0;
	function o(e, t) {
		if (M) {
			var n = pn(r);
			if (e !== parseInt(n.substring(1))) {
				var a = fn();
				P(a), i.anchor = a, ln(!1), i.ensure(e, t), ln(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	ai(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function ma(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		di(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					ha(e, dt(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			zr(u), u.append(l), e.items.clear();
		}
		ha(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function ha(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= jt, hi(a, document.createDocumentFragment())) : W(t[i], n);
	}
}
var ga;
function _a(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = M ? P(/* @__PURE__ */ Lr(c)) : c.appendChild(Ir());
	}
	M && un();
	var l = null, u = /* @__PURE__ */ mr(() => {
		var e = n();
		return ct(e) ? e : e == null ? [] : dt(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ya(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= jt, xa(l, null, o)) : pi(l) : di(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: ai(() => {
			d = X(u);
			var e = d.length;
			let c = !1;
			M && pn(o) === "[!" != (e === 0) && (o = fn(), P(o), ln(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = R, v = Br(), y = 0; y < e; y += 1) {
				M && N.nodeType === 8 && N.data === "]" && (o = N, c = !0, ln(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && Er(S.v, b), S.i && Er(S.i, y), v && _.unskip_effect(S.e)) : (S = ba(s, p ? o : ga ??= Ir(), b, x, y, i, t, n), p || (S.e.f |= jt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = U(() => a(o)) : (l = U(() => a(ga ??= Ir())), l.f |= jt)), e > g.size && Jt("", "", ""), M && e > 0 && P(fn()), !p) if (f.set(_, g), v) {
				for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
				_.oncommit(m), _.ondiscard(h);
			} else m(_);
			c && ln(!0), X(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, M && (o = N);
}
function va(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ya(e, t, n, r, i) {
	var a = (r & 8) != 0, o = t.length, s = e.items, c = va(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (pi(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) if (g.f ^= jt, g === c) xa(g, null, n);
		else {
			var v = u ? u.next : c;
			g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), Sa(e, u, g), Sa(e, g, v), xa(g, v, n), u = g, f = [], p = [], c = va(u.next);
			continue;
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) xa(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					Sa(e, x.prev, S.next), Sa(e, u, x), Sa(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), xa(g, c, n), Sa(e, g.prev, g.next), Sa(e, g, u === null ? e.effect.first : u.next), Sa(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = va(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = va(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ha(e, dt(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = va(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			ma(e, C, ee);
		}
	}
	a && Tn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function ba(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Cr(n) : /* @__PURE__ */ Tr(n, !1, !1) : null, l = o & 2 ? Cr(i) : null;
	return {
		v: c,
		i: l,
		e: U(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function xa(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Rr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Sa(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Ca = [..." 	\n\r\f\xA0\v﻿"];
function wa(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Ca.includes(r[o - 1])) && (s === r.length || Ca.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Ta(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Ea(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Da(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Ea)), i && c.push(...Object.keys(i).map(Ea));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Ea(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Ta(r)), i && (n += Ta(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Oa(e, t, n, r, i, a) {
	var o = e[Bt];
	if (M || o !== n || o === void 0) {
		var s = wa(n, r, a);
		(!M || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[Bt] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function ka(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Aa(e, t, n, r) {
	var i = e[Vt];
	if (M || i !== t) {
		var a = Da(t, r);
		(!M || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Vt] = t;
	} else r && (Array.isArray(r) ? (ka(e, n?.[0], r[0]), ka(e, n?.[1], r[1], "important")) : ka(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ja = Symbol("is custom element"), Ma = Symbol("is html"), Na = Gt ? "link" : "LINK", Pa = Gt ? "progress" : "PROGRESS";
function Fa(e) {
	if (M) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					$(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					$(e, "checked", null), e.checked = r;
				}
			}
		};
		e[Ut] = n, Tn(n), Wr();
	}
}
function Ia(e, t) {
	var n = La(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Pa) || (e.value = t ?? "");
}
function $(e, t, n, r) {
	var i = La(e);
	M && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Na) || i[t] !== (i[t] = n) && (t === "loading" && (e[Rt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && za(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function La(e) {
	return e[zt] ??= {
		[ja]: e.nodeName.includes("-"),
		[Ma]: e.namespaceURI === st
	};
}
var Ra = /* @__PURE__ */ new Map();
function za(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ra.get(t);
	if (n) return n;
	Ra.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = ht(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = vt(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ba(e, t) {
	return e === t || e?.[It] === t;
}
function Va(e = {}, t, n, r) {
	var i = I.r, a = q;
	return ti(() => {
		var o, s;
		return ri(() => {
			o = s, s = r?.() || [], zi(() => {
				Ba(n(...s), e) || (t(e, ...s), o && Ba(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ba(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Ha(e, t, n, r) {
	var i = !vn || (n & 2) != 0, a = (n & 8) != 0, o = (n & 16) != 0, s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ ur(r), X(l)) : (c && (c = !1, s = o ? zi(r) : r), s);
	let d;
	if (a) {
		var f = It in e || Lt in e;
		d = mt(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Fn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && en(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var _ = !1, v = (n & 1 ? ur : mr)(() => (_ = !1, h()));
	a && X(v);
	var y = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? X(v) : i && a ? Ar(e) : e;
			return B(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return vi && _ || y.f & 16384 ? v.v : X(v);
	});
}
//#endregion
//#region node_modules/svelte/src/legacy/legacy-client.js
function Ua(e) {
	return new Wa(e);
}
var Wa = class {
	#e;
	#t;
	constructor(e) {
		var t = /* @__PURE__ */ new Map(), n = (e, n) => {
			var r = /* @__PURE__ */ Tr(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return X(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === Lt ? !0 : (X(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return B(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		this.#t = (e.hydrate ? aa : ia)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		}), !_n && (!e?.props?.$$host || e.sync === !1) && qn(), this.#e = r.$$events;
		for (let e of Object.keys(this.#t)) e === "$set" || e === "$destroy" || e === "$on" || pt(this, e, {
			get() {
				return this.#t[e];
			},
			set(t) {
				this.#t[e] = t;
			},
			enumerable: !0
		});
		this.#t.$set = (e) => {
			Object.assign(r, e);
		}, this.#t.$destroy = () => {
			la(this.#t);
		};
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		let n = (...e) => t.call(this, ...e);
		return this.#e[e].push(n), () => {
			this.#e[e] = this.#e[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		this.#t.$destroy();
	}
}, Ga;
typeof HTMLElement == "function" && (Ga = class extends HTMLElement {
	$$ctor;
	$$s;
	$$c;
	$$cn = !1;
	$$d = {};
	$$r = !1;
	$$p_d = {};
	$$l = {};
	$$l_u = /* @__PURE__ */ new Map();
	$$me;
	$$shadowRoot = null;
	constructor(e, t, n) {
		super(), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
	}
	addEventListener(e, t, n) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
			let n = this.$$c.$on(e, t);
			this.$$l_u.set(t, n);
		}
		super.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		if (super.removeEventListener(e, t, n), this.$$c) {
			let e = this.$$l_u.get(t);
			e && (e(), this.$$l_u.delete(t));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (t) => {
					let n = Vr("slot");
					e !== "default" && (n.name = e), Z(t, n);
				};
			}
			let t = {}, n = qa(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = Ka(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Ua({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = $r(() => {
				ri(() => {
					this.$$r = !0;
					for (let e of ft(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = Ka(e, this.$$d[e], this.$$p_d, "toAttribute");
						t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
					}
					this.$$r = !1;
				});
			});
			for (let e in this.$$l) for (let t of this.$$l[e]) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ka(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return ft(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function Ka(e, t, n, r) {
	let i = n[e]?.type;
	if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (i) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t ?? null;
		default: return t;
	}
	else switch (i) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function qa(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Ja(e, t, n, r, i, a) {
	let o = class extends Ga {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return ft(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return ft(t).forEach((e) => {
		pt(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = Ka(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (mt(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		pt(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
//#endregion
//#region src/ui/UploaderElement.svelte
var Ya = (e) => {
	Z(e, Qa());
}, Xa = (e) => {
	Z(e, $a());
}, Za = (e) => {
	Z(e, eo());
}, Qa = /* @__PURE__ */ ta("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><polyline points=\"18 15 12 9 6 15\"></polyline></svg>"), $a = /* @__PURE__ */ ta("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>"), eo = /* @__PURE__ */ ta("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line></svg>"), to = /* @__PURE__ */ $i("<tr><td colspan=\"7\" class=\"empty\"> </td></tr>"), no = /* @__PURE__ */ $i("<img class=\"thumb\"/>"), ro = /* @__PURE__ */ $i("<div class=\"thumb thumb-placeholder\">FILE</div>"), io = /* @__PURE__ */ $i("<tr><td><!></td><td><a class=\"name\" target=\"_blank\" rel=\"noopener\"> </a> <div class=\"meta\"> </div></td><td> </td><td><input type=\"text\"/></td><td> </td><td><span class=\"row-progress-label\">100%</span></td><td><button type=\"button\" class=\"btn btn-mini btn-primary\"><!></button> <button type=\"button\" class=\"btn btn-mini btn-primary\"><!></button> <button type=\"button\" class=\"btn btn-mini btn-danger\"><!></button></td></tr>"), ao = /* @__PURE__ */ $i("<tr><td><!></td><td><div class=\"name\"> </div> <div class=\"meta\"> </div></td><td> </td><td><span class=\"row-progress-label\">-</span></td><td> </td><td><div class=\"row-progress\"><div class=\"row-progress-bar\"></div></div> <span class=\"row-progress-label\"> </span></td><td><button type=\"button\" class=\"btn btn-mini btn-primary\"><!></button> <button type=\"button\" class=\"btn btn-mini btn-primary\"><!></button> <button type=\"button\" class=\"btn btn-mini btn-danger\"><!></button></td></tr>"), oo = /* @__PURE__ */ $i("<main class=\"uploader\"><header class=\"toolbar\"><button type=\"button\" class=\"btn btn-primary\"> </button> <button type=\"button\" class=\"btn btn-success\"> </button> <button type=\"button\" class=\"btn btn-warning\"> </button> <input type=\"file\" hidden=\"\"/></header> <section> </section> <section class=\"global-progress-wrap\"><div class=\"global-progress\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"><div class=\"global-progress-bar\"></div></div> <span> </span></section> <section class=\"table-wrap\"><table class=\"file-table\"><thead><tr><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th></tr></thead><tbody><!><!><!></tbody></table></section></main>");
function so(e, t) {
	bn(t, !0);
	let n = Ha(t, "core", 7), r = /* @__PURE__ */ wr(Ar({
		localFiles: [],
		remoteFiles: [],
		counts: {
			local: 0,
			remote: 0
		},
		progress: 0
	})), i, a = /* @__PURE__ */ wr(!1), o = /* @__PURE__ */ wr(Ar({}));
	da(() => {
		if (!n()) return;
		B(r, n().getState(), !0);
		let e = n().subscribe((e) => {
			B(r, e, !0);
		});
		return () => {
			e?.();
		};
	});
	function s(e) {
		let t = [...e.currentTarget.files || []];
		t.length > 0 && n().addFiles(t), e.currentTarget.value = "";
	}
	async function c() {
		await n().startUpload();
	}
	function l() {
		n().cancelAll();
	}
	function u(e) {
		e.preventDefault(), B(a, !1);
		let t = [...e.dataTransfer?.files || []];
		t.length > 0 && n().addFiles(t);
	}
	async function d(e, t) {
		let r = X(o);
		B(o, {
			...X(o),
			[e]: !0
		}, !0);
		try {
			await n().saveRemoteCaption(e, t);
		} finally {
			B(o, {
				...r,
				[e]: !1
			}, !0);
		}
	}
	async function f(e) {
		try {
			await n().removeRemoteById(e);
		} catch {}
	}
	async function p(e) {
		try {
			await n().removeLocalById(e);
		} catch {}
	}
	var m = {
		get core() {
			return n();
		},
		set core(e) {
			n(e), qn();
		}
	}, h = oo(), g = V(h), _ = V(g), v = V(_, !0);
	F(_);
	var y = H(_, 2), b = V(y, !0);
	F(y);
	var x = H(y, 2), S = V(x, !0);
	F(x);
	var C = H(x, 2);
	Va(C, (e) => i = e, () => i), F(g);
	var w = H(g, 2);
	let ee;
	var te = V(w, !0);
	F(w);
	var T = H(w, 2), E = V(T), D = V(E);
	F(E);
	var ne = H(E, 2), re = V(ne);
	F(ne), F(T);
	var ie = H(T, 2), ae = V(ie), oe = V(ae), se = V(oe), ce = V(se), le = V(ce, !0);
	F(ce);
	var ue = H(ce), de = V(ue, !0);
	F(ue);
	var fe = H(ue), pe = V(fe, !0);
	F(fe);
	var me = H(fe), he = V(me, !0);
	F(me);
	var O = H(me), ge = V(O, !0);
	F(O);
	var _e = H(O), ve = V(_e, !0);
	F(_e);
	var ye = H(_e), be = V(ye, !0);
	F(ye), F(se), F(oe);
	var xe = H(oe), Se = V(xe), Ce = (e) => {
		var t = to(), r = V(t), i = V(r, !0);
		F(r), F(t), ii((e) => Q(i, e), [() => n().t("empty")]), Z(e, t);
	};
	pa(Se, (e) => {
		X(r).localFiles.length === 0 && X(r).remoteFiles.length === 0 && e(Ce);
	});
	var we = H(Se);
	return _a(we, 19, () => X(r).remoteFiles, (e) => String(e.id), (e, t, i) => {
		let a = /* @__PURE__ */ pr(() => typeof X(t).type == "string" && X(t).type.startsWith("image/"));
		var s = io(), c = V(s), l = V(c), u = (e) => {
			var r = no();
			ii((e) => {
				$(r, "src", X(t).url), $(r, "alt", e);
			}, [() => n().t("previewAlt", { name: X(t).name || n().t("fallbackFileName") })]), Z(e, r);
		}, p = (e) => {
			Z(e, ro());
		};
		pa(l, (e) => {
			X(a) && X(t).url ? e(u) : e(p, -1);
		}), F(c);
		var m = H(c), h = V(m), g = V(h, !0);
		F(h);
		var _ = H(h, 2), v = V(_, !0);
		F(_), F(m);
		var y = H(m), b = V(y, !0);
		F(y);
		var x = H(y), S = V(x);
		Fa(S);
		let C;
		F(x);
		var w = H(x), ee = V(w, !0);
		F(w);
		var te = H(w, 2), T = V(te);
		Ya(V(T)), F(T);
		var E = H(T, 2);
		Xa(V(E)), F(E);
		var D = H(E, 2);
		Za(V(D)), F(D), F(te), F(s), ii((e, n, a, o, s, c, l, u, d, f, p, m, _, y, x) => {
			$(h, "href", X(t).url), $(h, "title", e), Q(g, n), Q(v, a), Q(b, o), C = Oa(S, 1, "caption-input", null, C, s), Ia(S, c), $(S, "placeholder", l), S.disabled = u, Q(ee, d), $(T, "title", f), $(T, "aria-label", p), T.disabled = X(i) === 0, $(E, "title", m), $(E, "aria-label", _), E.disabled = X(i) === X(r).remoteFiles.length - 1, $(D, "title", y), $(D, "aria-label", x);
		}, [
			() => X(t).name || n().t("fallbackFileName"),
			() => X(t).name || n().t("fallbackFileName"),
			() => X(t).type || n().t("unknownType"),
			() => it(Number(X(t).size || 0)),
			() => ({ "is-saving": X(o)[String(X(t).id)] }),
			() => String(X(t).caption || ""),
			() => n().t("captionPlaceholder"),
			() => !!X(o)[String(X(t).id)],
			() => n().t("serverState"),
			() => n().t("moveUp"),
			() => n().t("moveUp"),
			() => n().t("moveDown"),
			() => n().t("moveDown"),
			() => n().t("remove"),
			() => n().t("remove")
		]), Gi("change", S, (e) => d(String(X(t).id), e.currentTarget.value)), Gi("keydown", S, (e) => {
			e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur()), e.key === "Escape" && (e.preventDefault(), e.currentTarget.value = String(X(t).caption || ""), e.currentTarget.blur());
		}), Gi("click", T, () => n().moveRemote(String(X(t).id), "up")), Gi("click", E, () => n().moveRemote(String(X(t).id), "down")), Gi("click", D, () => f(String(X(t).id))), Z(e, s);
	}), _a(H(we), 19, () => X(r).localFiles, (e) => e.id, (e, t, i) => {
		let a = /* @__PURE__ */ pr(() => Math.round(X(t).progress?.percentage || 0)), o = /* @__PURE__ */ pr(() => n().computeFileStatus(X(t))), s = /* @__PURE__ */ pr(() => n().getPreviewUrl(X(t)));
		var c = ao(), l = V(c), u = V(l), d = (e) => {
			var r = no();
			ii((e) => {
				$(r, "src", X(s)), $(r, "alt", e);
			}, [() => n().t("previewAlt", { name: X(t).name })]), Z(e, r);
		}, f = (e) => {
			Z(e, ro());
		};
		pa(u, (e) => {
			X(s) ? e(d) : e(f, -1);
		}), F(l);
		var m = H(l), h = V(m), g = V(h, !0);
		F(h);
		var _ = H(h, 2), v = V(_, !0);
		F(_), F(m);
		var y = H(m), b = V(y, !0);
		F(y);
		var x = H(y, 2), S = V(x, !0);
		F(x);
		var C = H(x), w = V(C), ee = V(w);
		F(w);
		var te = H(w, 2), T = V(te);
		F(te), F(C);
		var E = H(C), D = V(E);
		Ya(V(D)), F(D);
		var ne = H(D, 2);
		Xa(V(ne)), F(ne);
		var re = H(ne, 2);
		Za(V(re)), F(re), F(E), F(c), ii((e, n, s, c, l, u, d, f) => {
			$(h, "title", X(t).name), Q(g, X(t).name), Q(v, e), Q(b, n), Q(S, X(o)), Aa(ee, `width: ${X(a)}%`), Q(T, `${X(a) ?? ""}%`), $(D, "title", s), $(D, "aria-label", c), D.disabled = X(i) === 0, $(ne, "title", l), $(ne, "aria-label", u), ne.disabled = X(i) === X(r).localFiles.length - 1, $(re, "title", d), $(re, "aria-label", f);
		}, [
			() => X(t).type || n().t("unknownType"),
			() => it(X(t).size),
			() => n().t("moveUp"),
			() => n().t("moveUp"),
			() => n().t("moveDown"),
			() => n().t("moveDown"),
			() => n().t("remove"),
			() => n().t("remove")
		]), Gi("click", D, () => n().moveLocal(X(t).id, "up")), Gi("click", ne, () => n().moveLocal(X(t).id, "down")), Gi("click", re, () => p(X(t).id)), Z(e, c);
	}), F(xe), F(ae), F(ie), F(h), ii((e, t, i, o, s, c, l, u, d, f, p, m, h) => {
		Q(v, e), Q(b, t), Q(S, i), C.multiple = n().options.multiple, ee = Oa(w, 1, "drop-zone", null, ee, { "is-over": X(a) }), $(w, "aria-label", o), Q(te, s), $(T, "aria-label", c), $(E, "aria-valuenow", X(r).progress), Aa(D, `width: ${X(r).progress}%`), Q(re, `${X(r).progress ?? ""}%`), Q(le, l), Q(de, u), Q(pe, d), Q(he, f), Q(ge, p), Q(ve, m), Q(be, h);
	}, [
		() => n().t("addFiles"),
		() => n().t("startUpload"),
		() => n().t("cancel"),
		() => n().t("ariaDropzone"),
		() => n().t("dropzone"),
		() => n().t("ariaGlobalProgress"),
		() => n().t("headerPreview"),
		() => n().t("headerFile"),
		() => n().t("headerSize"),
		() => n().t("headerCaption"),
		() => n().t("headerStatus"),
		() => n().t("headerProgress"),
		() => n().t("headerActions")
	]), Gi("click", _, () => i.click()), Gi("click", y, c), Gi("click", x, l), Gi("change", C, s), Wi("dragover", w, (e) => {
		e.preventDefault(), B(a, !0);
	}), Wi("dragleave", w, () => {
		B(a, !1);
	}), Wi("drop", w, u), Z(e, h), xn(m);
}
Ki([
	"click",
	"change",
	"keydown"
]), customElements.define("upload-manager", Ja(so, { core: {} }, [], []));
//#endregion
//#region src/adapters/widget.js
var co = "upload-manager";
customElements.get(co) || customElements.define(co, so.element);
var lo = class {
	constructor(e, t = {}) {
		if (this.root = typeof e == "string" ? document.querySelector(e) : e, !this.root) throw Error("UploaderWidget: cible introuvable");
		this.options = { ...t }, this.callbacks = {
			...t.callbacks || {},
			onReady: t.onReady ?? t.callbacks?.onReady,
			onChange: t.onChange ?? t.callbacks?.onChange,
			onUploadSuccess: t.onUploadSuccess ?? t.callbacks?.onUploadSuccess,
			onUploadError: t.onUploadError ?? t.callbacks?.onUploadError,
			onFileUpdate: t.onFileUpdate ?? t.callbacks?.onFileUpdate,
			onFileUpdateError: t.onFileUpdateError ?? t.callbacks?.onFileUpdateError,
			onReorder: t.onReorder ?? t.callbacks?.onReorder,
			onDeleteSuccess: t.onDeleteSuccess ?? t.callbacks?.onDeleteSuccess,
			onDeleteError: t.onDeleteError ?? t.callbacks?.onDeleteError
		}, this.core = new at(t), this.bindCoreEvents(), this.mountUi(), this.core.init().catch((e) => {
			console.error("Initialisation du widget impossible", e);
		});
	}
	mountUi() {
		this.root.innerHTML = "", this.element = document.createElement(co), this.element.core = this.core, this.root.appendChild(this.element);
	}
	bindCoreEvents() {
		this.unsubscribers = [
			this.core.on("ready", (e) => this.callCallback("onReady", e)),
			this.core.on("change", (e) => this.callCallback("onChange", e)),
			this.core.on("uploadSuccess", (e) => this.callCallback("onUploadSuccess", e)),
			this.core.on("uploadError", (e) => this.callCallback("onUploadError", e)),
			this.core.on("fileUpdate", (e) => this.callCallback("onFileUpdate", e)),
			this.core.on("fileUpdateError", (e) => this.callCallback("onFileUpdateError", e)),
			this.core.on("reorder", (e) => this.callCallback("onReorder", e)),
			this.core.on("deleteSuccess", (e) => this.callCallback("onDeleteSuccess", e)),
			this.core.on("deleteError", (e) => this.callCallback("onDeleteError", e))
		];
	}
	callCallback(e, t) {
		let n = this.callbacks[e];
		if (typeof n == "function") try {
			n({
				widget: this,
				...t
			});
		} catch (t) {
			console.error(`Callback ${e} failed`, t);
		}
	}
	getState() {
		return this.core.getState();
	}
	addFiles(e) {
		this.core.addFiles(e);
	}
	async reload() {
		await this.core.reload();
	}
	async startUpload() {
		await this.core.startUpload();
	}
	cancelAll() {
		this.core.cancelAll();
	}
	async removeLocalById(e) {
		await this.core.removeLocalById(e);
	}
	async removeRemoteById(e) {
		await this.core.removeRemoteById(e);
	}
	destroy() {
		this.unsubscribers?.forEach((e) => e?.()), this.unsubscribers = [], this.core.destroy(), this.root.innerHTML = "", this.element = null;
	}
};
window.UploaderWidget = lo;
//#endregion
export { tt as DEFAULT_LABELS, et as DEFAULT_LOCALE, nt as DEFAULT_OPTIONS, at as UploaderCore, lo as UploaderWidget, Qe as en, Ze as fr, $e as locales, rt as resolveLocale };

//# sourceMappingURL=upload-manager.es.js.map
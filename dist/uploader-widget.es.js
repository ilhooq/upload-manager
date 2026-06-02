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
function T(e) {
	return e < 10 ? `0${e}` : e.toString();
}
function E() {
	let e = /* @__PURE__ */ new Date();
	return `${T(e.getHours())}:${T(e.getMinutes())}:${T(e.getSeconds())}`;
}
//#endregion
//#region node_modules/@uppy/utils/lib/isNetworkError.js
function te(e) {
	return e ? e.readyState === 4 && e.status === 0 : !1;
}
//#endregion
//#region node_modules/@uppy/utils/lib/TaskQueue.js
var ne = class {
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
function re(e, t, n) {
	let r = [];
	return e.forEach((e) => typeof e == "string" ? t[Symbol.split](e).forEach((e, t, i) => {
		e !== "" && r.push(e), t < i.length - 1 && r.push(n);
	}) : r.push(e)), r;
}
function ie(e, t) {
	let n = /\$/g, r = [e];
	if (t == null) return r;
	for (let e of Object.keys(t)) if (e !== "_") {
		let i = t[e];
		typeof i == "string" && (i = n[Symbol.replace](i, "$$$$")), r = re(r, RegExp(`%\\{${e}\\}`, "g"), i);
	}
	return r;
}
var ae = (e) => {
	throw Error(`missing string: ${e}`);
}, oe = class {
	locale;
	constructor(e, { onMissingKey: t = ae } = {}) {
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
				return ie(n[e], t);
			}
			throw Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
		}
		if (typeof n != "string") throw Error("string was not a string");
		return ie(n, t);
	}
}, se = class {
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
		let e = new oe([
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
}, ce = class {
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
}, le = {
	debug: () => {},
	warn: () => {},
	error: (...e) => console.error(`[Uppy] [${E()}]`, ...e)
}, ue = {
	debug: (...e) => console.debug(`[Uppy] [${E()}]`, ...e),
	warn: (...e) => console.warn(`[Uppy] [${E()}]`, ...e),
	error: (...e) => console.error(`[Uppy] [${E()}]`, ...e)
}, de = /* @__PURE__ */ o(((e, t) => {
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
})), fe = /* @__PURE__ */ o(((e, t) => {
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
})), pe = /* @__PURE__ */ o(((e, t) => {
	var n = fe(), r = /[\/\+\.]/;
	t.exports = function(e, t) {
		function i(t) {
			var i = n(t, e, r);
			return i && i.length >= 2;
		}
		return t ? i(t.split(";")[0]) : i;
	};
})), me = /* @__PURE__ */ c(de(), 1), he = /* @__PURE__ */ c(pe(), 1), ge = {
	maxFileSize: null,
	minFileSize: null,
	maxTotalFileSize: null,
	maxNumberOfFiles: null,
	minNumberOfFiles: null,
	allowedFileTypes: null,
	requiredMetaFields: []
}, D = class extends Error {
	isUserFacing;
	file;
	constructor(e, t) {
		super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
	}
	isRestriction = !0;
}, _e = class {
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
		if (r && e.filter((e) => !e.isGhost).length + t.length > r) throw new D(`${this.getI18n()("youCanOnlyUploadX", { smart_count: r })}`);
		if (n) {
			let r = [...e, ...t].reduce((e, t) => e + (t.size ?? 0), 0);
			if (r > n) throw new D(this.getI18n()("aggregateExceedsSize", {
				sizeAllowed: (0, me.default)(n),
				size: (0, me.default)(r)
			}));
		}
	}
	validateSingleFile(e) {
		let { maxFileSize: t, minFileSize: n, allowedFileTypes: r } = this.getOpts().restrictions;
		if (r && !r.some((t) => t.includes("/") ? e.type ? (0, he.default)(e.type.replace(/;.*?$/, ""), t) : !1 : t[0] === "." && e.extension ? e.extension.toLowerCase() === t.slice(1).toLowerCase() : !1)) {
			let t = r.join(", ");
			throw new D(this.getI18n()("youCanOnlyUploadFileTypes", { types: t }), { file: e });
		}
		if (t && e.size != null && e.size > t) throw new D(this.getI18n()("exceedsSize", {
			size: (0, me.default)(t),
			file: e.name ?? this.getI18n()("unnamed")
		}), { file: e });
		if (n && e.size != null && e.size < n) throw new D(this.getI18n()("inferiorSize", { size: (0, me.default)(n) }), { file: e });
	}
	validate(e, t) {
		t.forEach((e) => {
			this.validateSingleFile(e);
		}), this.validateAggregateRestrictions(e, t);
	}
	validateMinNumberOfFiles(e) {
		let { minNumberOfFiles: t } = this.getOpts().restrictions;
		if (t && Object.keys(e).length < t) throw new D(this.getI18n()("youHaveToAtLeastSelectX", { smart_count: t }));
	}
	getMissingRequiredMetaFields(e) {
		let t = new D(this.getI18n()("missingRequiredMetaFieldOnFile", { fileName: e.name ?? this.getI18n()("unnamed") })), { requiredMetaFields: n } = this.getOpts().restrictions, r = [];
		for (let t of n) (!Object.hasOwn(e.meta, t) || e.meta[t] === "") && r.push(t);
		return {
			missingFields: r,
			error: t
		};
	}
}, ve = {
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
}, ye = class {
	static VERSION = ve.version;
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
}, be = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), xe = /* @__PURE__ */ o(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), Se = /* @__PURE__ */ o(((e, t) => {
	var n = xe(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), Ce = /* @__PURE__ */ o(((e, t) => {
	var n = Se();
	t.exports = function() {
		return n.Date.now();
	};
})), we = /* @__PURE__ */ o(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), Te = /* @__PURE__ */ o(((e, t) => {
	var n = we(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), Ee = /* @__PURE__ */ o(((e, t) => {
	t.exports = Se().Symbol;
})), De = /* @__PURE__ */ o(((e, t) => {
	var n = Ee(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
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
})), Oe = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), ke = /* @__PURE__ */ o(((e, t) => {
	var n = Ee(), r = De(), i = Oe(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), Ae = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), je = /* @__PURE__ */ o(((e, t) => {
	var n = ke(), r = Ae(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), Me = /* @__PURE__ */ o(((e, t) => {
	var n = Te(), r = be(), i = je(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
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
})), Ne = /* @__PURE__ */ o(((e, t) => {
	var n = be(), r = Ce(), i = Me(), a = "Expected a function", o = Math.max, s = Math.min;
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
		function T() {
			return p === void 0 ? f : w(r());
		}
		function E() {
			var e = r(), n = S(e);
			if (l = arguments, u = this, m = e, n) {
				if (p === void 0) return b(m);
				if (_) return clearTimeout(p), p = setTimeout(C, t), y(m);
			}
			return p === void 0 && (p = setTimeout(C, t)), f;
		}
		return E.cancel = ee, E.flush = T, E;
	}
	t.exports = c;
})), Pe = /* @__PURE__ */ o(((e, t) => {
	var n = Ne(), r = be(), i = "Expected a function";
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
})), Fe = /* @__PURE__ */ o(((e, t) => {
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
})), Ie = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Le = (e = 21) => {
	let t = "", n = e | 0;
	for (; n--;) t += Ie[Math.random() * 64 | 0];
	return t;
}, Re = {
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
function ze(e, t) {
	return t.name ? t.name : e.split("/")[0] === "image" ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname";
}
//#endregion
//#region node_modules/@uppy/core/lib/locale.js
var Be = { strings: {
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
function Ve(e) {
	if (e == null && typeof navigator < "u" && (e = navigator.userAgent), !e) return !0;
	let t = /Edge\/(\d+\.\d+)/.exec(e);
	if (!t) return !0;
	let n = t[1].split(".", 2), r = parseInt(n[0], 10), i = parseInt(n[1], 10);
	return r < 15 || r === 15 && i < 15063 || r > 18 || r === 18 && i >= 18218;
}
//#endregion
//#region node_modules/@uppy/core/lib/Uppy.js
var He = /* @__PURE__ */ c(Pe(), 1), Ue = /* @__PURE__ */ c(Fe(), 1), We = {
	totalProgress: 0,
	allowNewUpload: !0,
	error: null,
	recoveredState: null
}, Ge = class e {
	static VERSION = Re.version;
	#e = Object.create(null);
	#t;
	#n;
	#r = (0, Ue.default)();
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
		this.defaultLocale = Be;
		let n = {
			id: "uppy",
			autoProceed: !1,
			allowMultipleUploadBatches: !0,
			debug: !1,
			restrictions: ge,
			meta: {},
			onBeforeFileAdded: (e, t) => !Object.hasOwn(t, e.id),
			onBeforeUpload: (e) => e,
			store: new ye(),
			logger: le,
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
		}, t?.logger && t.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : t?.debug && (this.opts.logger = ue), this.log(`Using Core v${e.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
			...We,
			plugins: {},
			files: {},
			currentUploads: {},
			capabilities: {
				uploadProgress: Ve(),
				individualCancellation: !0,
				resumableUploads: !1
			},
			meta: { ...this.opts.meta },
			info: []
		}), this.#t = new _e(() => this.opts, () => this.i18n), this.#n = this.store.subscribe((e, t, n) => {
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
		let e = new oe([this.defaultLocale, this.opts.locale], { onMissingKey: (e) => this.log(`Missing i18n string: ${e}`, "error") });
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
			...We
		});
	}
	clear() {
		let { capabilities: e, currentUploads: t } = this.getState();
		if (Object.keys(t).length > 0 && !e.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
		this.setState({
			...We,
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
			let t = new D(this.i18n("noMoreFilesAllowed"), { file: e });
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
		} : e, n = y(t), r = ze(n, t), i = _(r).extension, a = w(t, this.getID()), o = {
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
			}, !s && this.checkIfFileAlreadyExists(e.id)) throw new D(this.i18n("noDuplicates", { fileName: e.name ?? this.i18n("unnamed") }), { file: e });
			if (s === !1 && !o) throw new D("Cannot add the file because onBeforeFileAdded returned false.", {
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
		t.length && this.removeFiles(t), this.setState(We);
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
	#v = (0, He.default)(() => this.#_(), 500, {
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
		let a = Le();
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
			if (this.#t.validateMinNumberOfFiles(e), !this.#l(e)) throw new D(this.i18n("missingRequiredMetaField"));
			let { currentUploads: t } = this.getState(), n = Object.values(t).flatMap((e) => e.fileIDs), r = Object.keys(e).filter((e) => {
				let t = this.getFile(e);
				return t && !t.progress.uploadStarted && !n.includes(e);
			}), i = this.#C(r), a = await this.#E(i);
			return this.emit("complete", a), a;
		} catch (e) {
			throw this.#s([e]), e;
		}
	}
}, Ke = {
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
}, qe = { strings: { uploadStalled: "Upload has not made any progress for %{seconds} seconds. You may want to retry it." } };
//#endregion
//#region node_modules/@uppy/xhr-upload/lib/index.js
function Je(e, t) {
	let n = t;
	return n ||= /* @__PURE__ */ Error("Upload error"), typeof n == "string" && (n = Error(n)), n instanceof Error || (n = Object.assign(/* @__PURE__ */ Error("Upload error"), { data: n })), te(e) ? (n = new l(n, e), n) : (n.request = e, n);
}
function Ye(e) {
	return e.data.slice(0, e.data.size, e.meta.type);
}
var Xe = {
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
}, Ze = class extends se {
	static VERSION = Ke.version;
	#e;
	#t;
	uploaderEvents;
	constructor(e, t) {
		if (super(e, {
			...Xe,
			fieldName: t.bundle ? "files[]" : "file",
			...t
		}), this.type = "uploader", this.id = this.opts.id || "XHRUpload", this.defaultLocale = qe, this.i18nInit(), this.#t = new ne({ concurrency: this.opts.limit }), this.opts.bundle && !this.opts.formData) throw Error("`opts.formData` must be true when `opts.bundle` is enabled.");
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
				for (let r of e) this.uppy.emit("upload-error", this.uppy.getFile(r.id), Je(n, t), n);
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
		let r = Ye(e);
		return e.name ? n.append(t.fieldName, r, e.meta.name) : n.append(t.fieldName, r), n;
	}
	createBundledUpload(e, t) {
		let n = new FormData(), { meta: r } = this.uppy.getState();
		return this.addMetadata(n, r, t), e.forEach((e) => {
			let t = this.getOptions(e), r = Ye(e);
			e.name ? n.append(t.fieldName, r, e.name) : n.append(t.fieldName, r);
		}), n;
	}
	async #n(e) {
		let t = new ce(this.uppy), n = new AbortController();
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
}, Qe = {
	addFiles: "Ajouter des fichiers",
	startUpload: "Demarrer l'upload",
	cancel: "Annuler",
	clearCompleted: "Supprimer les termines",
	dropzone: "Glissez-deposez vos fichiers ici ou utilisez \"Ajouter des fichiers\".",
	empty: "Aucun fichier ajoute",
	serverState: "Deja sur serveur",
	caption: "Legende",
	captionPlaceholder: "Ajouter une legende",
	statusDone: "Termine",
	statusError: "Erreur",
	statusUploading: "Upload en cours",
	statusWaiting: "En attente",
	moveUp: "Monter",
	moveDown: "Descendre",
	remove: "Supprimer"
}, $e = {
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
	labels: {}
}, et = (e) => {
	if (!Number.isFinite(e) || e <= 0) return "-";
	let t = [
		"o",
		"Ko",
		"Mo",
		"Go",
		"To"
	], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1), r = e / 1024 ** n;
	return `${r.toFixed(r >= 10 || n === 0 ? 0 : 1)} ${t[n]}`;
}, tt = class {
	constructor(e = {}) {
		this.options = {
			...$e,
			...e
		}, this.options.updateEndpoint = e.updateEndpoint ?? e.orderEndpoint ?? "./app.php", this.labels = {
			...Qe,
			...this.options.labels
		}, this.remoteFiles = [], this.localOrder = [], this.remoteOrder = [], this.previewUrls = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Set(), this.eventListeners = /* @__PURE__ */ new Map(), this.uppy = new Ge({
			autoProceed: this.options.autoProceed,
			allowMultipleUploadBatches: !0,
			restrictions: {
				maxNumberOfFiles: this.options.multiple ? null : 1,
				maxFileSize: this.options.maxFileSize
			}
		}), this.uppy.use(Ze, {
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
	computeFileStatus(e) {
		return e.progress?.uploadComplete ? this.labels.statusDone : e.error ? this.labels.statusError : e.progress?.uploadStarted ? this.labels.statusUploading : this.labels.statusWaiting;
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
	async clearCompleted() {
		for (let e of this.uppy.getFiles()) {
			if (e.progress?.uploadComplete) {
				try {
					await this.deleteRemoteFile(e), this.emit("deleteSuccess", {
						id: e.meta?.serverId || e.response?.body?.id || e.response?.body?.file?.id || e.id,
						scope: "remote",
						state: this.getState()
					});
				} catch (t) {
					this.emit("deleteError", {
						id: e.id,
						scope: "remote",
						error: t,
						state: this.getState()
					});
				}
				this.revokePreview(e.id), this.uppy.removeFile(e.id), this.emit("deleteSuccess", {
					id: e.id,
					scope: "local",
					state: this.getState()
				});
				continue;
			}
			e.error && (this.revokePreview(e.id), this.uppy.removeFile(e.id), this.emit("deleteSuccess", {
				id: e.id,
				scope: "local",
				state: this.getState()
			}));
		}
		this.notify();
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
var nt = {}, O = Symbol("uninitialized"), rt = "http://www.w3.org/1999/xhtml", it = Array.isArray, at = Array.prototype.indexOf, ot = Array.prototype.includes, st = Array.from, ct = Object.keys, lt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, dt = Object.getOwnPropertyDescriptors, ft = Object.prototype, pt = Array.prototype, mt = Object.getPrototypeOf, ht = Object.isExtensible, gt = () => {};
function _t(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function vt() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var k = 1024, A = 2048, yt = 4096, bt = 8192, xt = 16384, St = 32768, Ct = 1 << 25, wt = 65536, Tt = 1 << 19, Et = 1 << 20, Dt = 1 << 25, Ot = 65536, kt = 1 << 21, At = 1 << 22, jt = 1 << 23, Mt = Symbol("$state"), Nt = Symbol("legacy props"), Pt = Symbol(""), Ft = Symbol("attributes"), It = Symbol("class"), Lt = Symbol("style"), Rt = Symbol("text"), zt = Symbol("form reset"), Bt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Vt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function Ht(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Ut() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Wt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Gt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Kt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function qt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Jt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Yt() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function Xt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Zt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Qt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function $t() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function en() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function tn() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function nn(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function rn() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function an(e) {
	j = e;
}
var M;
function N(e) {
	if (e === null) throw nn(), nt;
	return M = e;
}
function on() {
	return N(/* @__PURE__ */ Nr(M));
}
function P(e) {
	if (j) {
		if (/* @__PURE__ */ Nr(M) !== null) throw nn(), nt;
		M = e;
	}
}
function sn(e = 1) {
	if (j) {
		for (var t = e, n = M; t--;) n = /* @__PURE__ */ Nr(n);
		M = n;
	}
}
function cn(e = !0) {
	for (var t = 0, n = M;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Nr(n);
		e && n.remove(), n = i;
	}
}
function ln(e) {
	if (!e || e.nodeType !== 8) throw nn(), nt;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function un(e) {
	return e === this.v;
}
function dn(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function fn(e) {
	return !dn(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var pn = !1, mn = !1, F = null;
function hn(e) {
	F = e;
}
function gn(e, t = !1, n) {
	F = {
		p: F,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: q,
		l: mn && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function _n(e) {
	var t = F, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) qr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, F = t.p, e ?? {};
}
function vn() {
	return !mn || F !== null && F.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var yn = [];
function bn() {
	var e = yn;
	yn = [], _t(e);
}
function xn(e) {
	if (yn.length === 0 && !In) {
		var t = yn;
		queueMicrotask(() => {
			t === yn && bn();
		});
	}
	yn.push(e);
}
function Sn() {
	for (; yn.length > 0;) bn();
}
function Cn(e) {
	var t = q;
	if (t === null) return G.f |= jt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	wn(e, t);
}
function wn(e, t) {
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
var Tn = ~(A | yt | k);
function I(e, t) {
	e.f = e.f & Tn | t;
}
function En(e) {
	e.f & 512 || e.deps === null ? I(e, k) : I(e, yt);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Dn(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= Ot, Dn(t.deps));
}
function On(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Dn(e.deps), I(e, k);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var kn = !1, An = !1;
function jn(e) {
	var t = An;
	try {
		return An = !1, [e(), An];
	} finally {
		An = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Mn = null, Nn = null, L = null, Pn = null, R = null, Fn = null, In = !1, Ln = !1, Rn = null, zn = null, Bn = 0, Vn = 1, Hn = class e {
	id = Vn++;
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
		Nn === null ? Mn = Nn = this : (Nn.#n = this, this.#t = Nn), Nn = this;
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
			for (var r of n.d) I(r, A), t(r);
			for (r of n.m) I(r, yt), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Bn++ > 1e3 && (this.#S(), Wn());
		for (let e of this.#u) this.#d.delete(e), I(e, A), this.schedule(e);
		for (let e of this.#d) I(e, yt), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Rn = [], r = [], i = zn = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Zn(e), this.#h() || this.discard(), t;
		}
		if (L = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Rn = null, zn = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Xn(e, t);
			i.length > 0 && L.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Pn = this, Kn(r), Kn(n), Pn = null, this.#s?.resolve();
		var s = L;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), pn && (this.#x(), L = s)), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= k;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= k : i & 4 ? t.push(r) : pn && i & 16777224 ? n.push(r) : Ti(r) && (i & 16 && this.#d.add(r), Ai(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), I(i, A), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), L = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) On(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), R?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		L = this;
	}
	deactivate() {
		L = null, R = null;
	}
	flush() {
		try {
			Ln = !0, L = this, this.#g();
		} finally {
			Bn = 0, Fn = null, Rn = null, zn = null, Ln = !1, L = null, R = null, _r.clear();
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
		for (let l = Mn; l !== null; l = l.#n) {
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
					for (var o of t) qn(o, r, i, a);
					a = /* @__PURE__ */ new Map();
					var s = [...l.current].filter(([e, t]) => {
						let n = this.current.get(e);
						return n ? n[0] !== t[0] || n[1] !== t[1] : !0;
					}).map(([e]) => e);
					if (s.length > 0) for (let e of this.#l) !(e.f & 155648) && Jn(e, s, a) && (e.f & 4194320 ? (I(e, A), l.schedule(e)) : l.#u.add(e));
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
		this.#m || (this.#m = !0, xn(() => {
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
		return (this.#s ??= vt()).promise;
	}
	static ensure() {
		if (L === null) {
			let t = L = new e();
			!Ln && !In && xn(() => {
				t.#e || t.flush();
			});
		}
		return L;
	}
	apply() {
		if (!pn || !this.is_fork && this.#t === null && this.#n === null) {
			R = null;
			return;
		}
		R = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) R.set(e, t);
		for (let t = Mn; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
			var e = !1;
			if (t.id < this.id) {
				for (let [n, [, r]] of t.current) if (!r && this.current.has(n)) {
					e = !0;
					break;
				}
			}
			if (!e) for (let [e, n] of t.previous) R.has(e) || R.set(e, n);
		}
	}
	schedule(e) {
		if (Fn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Rn !== null && t === q && (pn || (G === null || !(G.f & 2)) && !kn)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= k;
			}
		}
		this.#c.push(t);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null ? Mn = t : e.#n = t, t === null ? Nn = e : t.#t = e, this.linked = !1;
		}
	}
};
function Un(e) {
	var t = In;
	In = !0;
	try {
		var n;
		for (e && (L !== null && !L.is_fork && L.flush(), n = e());;) {
			if (Sn(), L === null) return n;
			L.flush();
		}
	} finally {
		In = t;
	}
}
function Wn() {
	try {
		Jt();
	} catch (e) {
		wn(e, Fn);
	}
}
var Gn = null;
function Kn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Ti(r) && (Gn = /* @__PURE__ */ new Set(), Ai(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ai(r), Gn?.size > 0)) {
				_r.clear();
				for (let e of Gn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Gn.has(n) && (Gn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Ai(n);
					}
				}
				Gn.clear();
			}
		}
		Gn = null;
	}
}
function qn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? qn(i, t, n, r) : e & 4194320 && !(e & 2048) && Jn(i, t, r) && (I(i, A), Yn(i));
	}
}
function Jn(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (ot.call(t, r)) return !0;
		if (r.f & 2 && Jn(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function Yn(e) {
	L.schedule(e);
}
function Xn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), I(e, k);
		for (var n = e.first; n !== null;) Xn(n, t), n = n.next;
	}
}
function Zn(e) {
	I(e, k);
	for (var t = e.first; t !== null;) Zn(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Qn(e) {
	let t = 0, n = yr(0), r;
	return () => {
		Wr() && (Z(n), Qr(() => (t === 0 && (r = Ni(() => e(() => Cr(n)))), t += 1, () => {
			xn(() => {
				--t, t === 0 && (r?.(), r = void 0, Cr(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var $n = wt | Tt;
function er(e, t, n, r) {
	new tr(e, t, n, r);
}
var tr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = j ? M : null;
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
	#h = Qn(() => (this.#m = yr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = q.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = ei(() => {
			if (j) {
				let e = this.#t;
				on();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, $n), j && (this.#e = M);
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
		e && (this.is_pending = !0, this.#o = U(() => e(this.#e)), xn(() => {
			var e = this.#c = document.createDocumentFragment(), t = jr();
			e.append(t), this.#a = this.#x(() => U(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, oi(this.#o, () => {
				this.#o = null;
			}), this.#b(L));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = U(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				ui(this.#a, e);
				let t = this.#n.pending;
				this.#o = U(() => t(this.#e));
			} else this.#b(L);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		On(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = q, n = G, r = F;
		gi(this.#i), K(this.#i), hn(this.#i.ctx);
		try {
			return Hn.ensure(), e();
		} catch (e) {
			return Cn(e), null;
		} finally {
			gi(t), K(n), hn(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && oi(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, xn(() => {
			this.#d = !1, this.#m && xr(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), Z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		L?.is_fork ? (this.#a && L.skip_effect(this.#a), this.#o && L.skip_effect(this.#o), this.#s && L.skip_effect(this.#s), L.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (W(this.#a), null), this.#o &&= (W(this.#o), null), this.#s &&= (W(this.#s), null), j && (N(this.#t), sn(), N(cn()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				rn();
				return;
			}
			r = !0, i && en(), this.#s !== null && oi(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				wn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return U(() => {
						var t = q;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return wn(e, this.#i.parent), null;
				}
			}));
		};
		xn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				wn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => wn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function nr(e, t, n, r) {
	let i = vn() ? or : ur;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q, c = rr(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				wn(e, s);
			}
			ir();
		}
	}
	var d = ar();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ cr(e))).then(u).catch((e) => wn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), ir();
	}) : f();
}
function rr() {
	var e = q, t = G, n = F, r = L;
	return function(i = !0) {
		gi(e), K(t), hn(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ir(e = !0) {
	gi(null), K(null), hn(null), e && L?.deactivate();
}
function ar() {
	var e = q, t = e.b, n = L, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function or(e) {
	var t = 2 | A;
	return q !== null && (q.f |= Tt), {
		ctx: F,
		deps: null,
		effects: null,
		equals: un,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: q,
		ac: null
	};
}
var sr = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function cr(e, t, n) {
	let r = q;
	r === null && Ut();
	var i = void 0, a = yr(O), o = !G, s = /* @__PURE__ */ new Set();
	return Zr(() => {
		var t = q, n = vt();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Bt && n.reject(e);
			}).finally(ir);
		} catch (e) {
			n.reject(e), ir();
		}
		var c = L;
		if (o) {
			if (t.f & 32768) var l = ar();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(sr);
			else for (let e of s.values()) e.reject(sr);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== sr && (c.activate(), t ? (a.f |= jt, xr(a, t)) : (a.f & 8388608 && (a.f ^= jt), xr(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Gr(() => {
		for (let e of s) e.reject(sr);
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
function lr(e) {
	let t = /* @__PURE__ */ or(e);
	return pn || vi(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ur(e) {
	let t = /* @__PURE__ */ or(e);
	return t.equals = fn, t;
}
function dr(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) W(t[n]);
	}
}
function fr(e) {
	var t, n = q, r = e.parent;
	if (!pi && r !== null && e.v !== O && r.f & 24576) return tn(), e.v;
	gi(r);
	try {
		e.f &= ~Ot, dr(e), t = Di(e);
	} finally {
		gi(n);
	}
	return t;
}
function pr(e) {
	var t = fr(e);
	if (!e.equals(t) && (e.wv = wi(), (!L?.is_fork || e.deps === null) && (L === null ? e.v = t : (L.capture(e, t, !0), Pn?.capture(e, t, !0)), e.deps === null))) {
		I(e, k);
		return;
	}
	pi || (R === null ? En(e) : (Wr() || L?.is_fork) && R.set(e, t));
}
function mr(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Bt), t.fn !== null && (t.teardown = gt), t.ac = null, ki(t, 0), ni(t));
}
function hr(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Ai(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var gr = /* @__PURE__ */ new Set(), _r = /* @__PURE__ */ new Map(), vr = !1;
function yr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: un,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function z(e, t) {
	let n = yr(e, t);
	return vi(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function br(e, t = !1, n = !0) {
	let r = yr(e);
	return t || (r.equals = fn), mn && n && F !== null && F.l !== null && (F.l.s ??= []).push(r), r;
}
function B(e, t, n = !1) {
	return G !== null && (!hi || G.f & 131072) && vn() && G.f & 4325394 && (_i === null || !_i.has(e)) && $t(), xr(e, n ? Tr(t) : t, zn);
}
function xr(e, t, n = null) {
	if (!e.equals(t)) {
		_r.set(e, pi ? t : e.v);
		var r = Hn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && fr(t), R === null && En(t);
		}
		e.wv = wi(), wr(e, A, n), vn() && q !== null && q.f & 1024 && !(q.f & 96) && (X === null ? yi([e]) : X.push(e)), !r.is_fork && gr.size > 0 && !vr && Sr();
	}
	return t;
}
function Sr() {
	vr = !1;
	for (let e of gr) {
		e.f & 1024 && I(e, yt);
		let t;
		try {
			t = Ti(e);
		} catch {
			t = !0;
		}
		t && Ai(e);
	}
	gr.clear();
}
function Cr(e) {
	B(e, e.v + 1);
}
function wr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = vn(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === q)) {
			var l = (c & A) === 0;
			if (l && I(s, t), c & 131072) gr.add(s);
			else if (c & 2) {
				var u = s;
				R?.delete(u), c & 65536 || (c & 512 && (q === null || !(q.f & 2097152)) && (s.f |= Ot), wr(u, yt, n));
			} else if (l) {
				var d = s;
				c & 16 && Gn !== null && Gn.add(d), n === null ? Yn(d) : n.push(d);
			}
		}
	}
}
function Tr(e) {
	if (typeof e != "object" || !e || Mt in e) return e;
	let t = mt(e);
	if (t !== ft && t !== pt) return e;
	var n = /* @__PURE__ */ new Map(), r = it(e), i = /* @__PURE__ */ z(0), a = null, o = Si, s = (e) => {
		if (Si === o) return e();
		var t = G, n = Si;
		K(null), Ci(o);
		var r = e();
		return K(t), Ci(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ z(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Zt();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ z(r.value, a);
				return n.set(t, e), e;
			}) : B(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ z(O, a));
					n.set(t, e), Cr(i);
				}
			} else B(r, O), Cr(i);
			return !0;
		},
		get(t, r, i) {
			if (r === Mt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || ut(t, r)?.writable) && (o = s(() => /* @__PURE__ */ z(Tr(c ? t[r] : O), a)), n.set(r, o)), o !== void 0) {
				var l = Z(o);
				return l === O ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = Z(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== O) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === Mt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== O || Reflect.has(e, t);
			return (r !== void 0 || q !== null && (!i || ut(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ z(i ? Tr(e[t]) : O, a)), n.set(t, r)), Z(r) === O) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ z(O, a)), n.set(d + "", f)) : B(f, O);
			}
			if (l === void 0) (!u || ut(e, t)?.writable) && (l = s(() => /* @__PURE__ */ z(void 0, a)), B(l, Tr(o)), n.set(t, l));
			else {
				u = l.v !== O;
				var p = s(() => Tr(o));
				B(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && B(h, g + 1);
				}
				Cr(i);
			}
			return !0;
		},
		ownKeys(e) {
			Z(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [r, a] of n) a.v !== O && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Qt();
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
var Er, Dr, Or, kr;
function Ar() {
	if (Er === void 0) {
		Er = window, Dr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Or = ut(t, "firstChild").get, kr = ut(t, "nextSibling").get, ht(e) && (e[It] = void 0, e[Ft] = null, e[Lt] = void 0, e.__e = void 0), ht(n) && (n[Rt] = void 0);
	}
}
function jr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Mr(e) {
	return Or.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Nr(e) {
	return kr.call(e);
}
function V(e, t) {
	if (!j) return /* @__PURE__ */ Mr(e);
	var n = /* @__PURE__ */ Mr(M);
	if (n === null) n = M.appendChild(jr());
	else if (t && n.nodeType !== 3) {
		var r = jr();
		return n?.before(r), N(r), r;
	}
	return t && Lr(n), N(n), n;
}
function H(e, t = 1, n = !1) {
	let r = j ? M : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Nr(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = jr();
			return r === null ? i?.after(a) : r.before(a), N(a), a;
		}
		Lr(r);
	}
	return N(r), r;
}
function Pr(e) {
	e.textContent = "";
}
function Fr() {
	return !pn || Gn !== null ? !1 : (q.f & St) !== 0;
}
function Ir(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Lr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
var Rr = !1;
function zr() {
	Rr || (Rr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[zt]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Br(e) {
	var t = G, n = q;
	K(null), gi(null);
	try {
		return e();
	} finally {
		K(t), gi(n);
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function Vr(e) {
	q === null && (G === null && qt(e), Kt()), pi && Gt(e);
}
function Hr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ur(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= bt);
	var r = {
		ctx: F,
		deps: null,
		nodes: null,
		f: e | A | 512,
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
	L?.register_created_effect(r);
	var i = r;
	if (e & 4) Rn === null ? Hn.ensure().schedule(r) : Rn.push(r);
	else if (t !== null) {
		try {
			Ai(r);
		} catch (e) {
			throw W(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= wt));
	}
	if (i !== null && (i.parent = n, n !== null && Hr(i, n), G !== null && G.f & 2 && !(e & 64))) {
		var a = G;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Wr() {
	return G !== null && !hi;
}
function Gr(e) {
	let t = Ur(8, null);
	return I(t, k), t.teardown = e, t;
}
function Kr(e) {
	Vr("$effect");
	var t = q.f;
	if (!G && t & 32 && F !== null && !F.i) {
		var n = F;
		(n.e ??= []).push(e);
	} else return qr(e);
}
function qr(e) {
	return Ur(4 | Et, e);
}
function Jr(e) {
	Hn.ensure();
	let t = Ur(64 | Tt, e);
	return () => {
		W(t);
	};
}
function Yr(e) {
	Hn.ensure();
	let t = Ur(64 | Tt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? oi(t, () => {
			W(t), n(void 0);
		}) : (W(t), n(void 0));
	});
}
function Xr(e) {
	return Ur(4, e);
}
function Zr(e) {
	return Ur(At | Tt, e);
}
function Qr(e, t = 0) {
	return Ur(8 | t, e);
}
function $r(e, t = [], n = [], r = []) {
	nr(r, t, n, (t) => {
		Ur(8, () => {
			e(...t.map(Z));
		});
	});
}
function ei(e, t = 0) {
	return Ur(16 | t, e);
}
function U(e) {
	return Ur(32 | Tt, e);
}
function ti(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = pi, n = G;
		mi(!0), K(null);
		try {
			t.call(null);
		} finally {
			mi(e), K(n);
		}
	}
}
function ni(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Br(() => {
			e.abort(Bt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : W(n, t), n = r;
	}
}
function ri(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || W(t), t = n;
	}
}
function W(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (ii(e.nodes.start, e.nodes.end), n = !0), e.f |= Ct, ni(e, t && !n), ki(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	ti(e), e.f ^= Ct, e.f |= xt;
	var i = e.parent;
	i !== null && i.first !== null && ai(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function ii(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Nr(e);
		e.remove(), e = n;
	}
}
function ai(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function oi(e, t, n = !0) {
	var r = [];
	si(e, r, !0);
	var i = () => {
		n && W(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function si(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= bt;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				si(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function ci(e) {
	li(e, !0);
}
function li(e, t) {
	if (e.f & 8192) {
		e.f ^= bt, e.f & 1024 || (I(e, A), Hn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			li(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function ui(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Nr(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var di = null, fi = !1, pi = !1;
function mi(e) {
	pi = e;
}
var G = null, hi = !1;
function K(e) {
	G = e;
}
var q = null;
function gi(e) {
	q = e;
}
var _i = null;
function vi(e) {
	G !== null && (!pn || G.f & 2) && (_i ??= /* @__PURE__ */ new Set()).add(e);
}
var J = null, Y = 0, X = null;
function yi(e) {
	X = e;
}
var bi = 1, xi = 0, Si = xi;
function Ci(e) {
	Si = e;
}
function wi() {
	return ++bi;
}
function Ti(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~Ot), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Ti(a) && pr(a), a.wv > e.wv) return !0;
		}
		t & 512 && R === null && I(e, k);
	}
	return !1;
}
function Ei(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!pn && _i !== null && _i.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Ei(a, t, !1) : t === a && (n ? I(a, A) : a.f & 1024 && I(a, yt), Yn(a));
	}
}
function Di(e) {
	var t = J, n = Y, r = X, i = G, a = _i, o = F, s = hi, c = Si, l = e.f;
	J = null, Y = 0, X = null, G = l & 96 ? null : e, _i = null, hn(e.ctx), hi = !1, Si = ++xi, e.ac !== null && (Br(() => {
		e.ac.abort(Bt);
	}), e.ac = null);
	try {
		e.f |= kt;
		var u = e.fn, d = u();
		e.f |= St;
		var f = e.deps, p = L?.is_fork;
		if (J !== null) {
			var m;
			if (p || ki(e, Y), f !== null && Y > 0) for (f.length = Y + J.length, m = 0; m < J.length; m++) f[Y + m] = J[m];
			else e.deps = f = J;
			if (Wr() && e.f & 512) for (m = Y; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Y < f.length && (ki(e, Y), f.length = Y);
		if (vn() && X !== null && !hi && f !== null && !(e.f & 6146)) for (m = 0; m < X.length; m++) Ei(X[m], e);
		if (i !== null && i !== e) {
			if (xi++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = xi;
			if (t !== null) for (let e of t) e.rv = xi;
			X !== null && (r === null ? r = X : r.push(...X));
		}
		return e.f & 8388608 && (e.f ^= jt), d;
	} catch (e) {
		return Cn(e);
	} finally {
		e.f ^= kt, J = t, Y = n, X = r, G = i, _i = a, hn(o), hi = s, Si = c;
	}
}
function Oi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = at.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (J === null || !ot.call(J, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~Ot), a.v !== O && En(a), mr(a), ki(a, 0);
	}
}
function ki(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Oi(e, n[r]);
}
function Ai(e) {
	var t = e.f;
	if (!(t & 16384)) {
		I(e, k);
		var n = q, r = fi;
		q = e, fi = !0;
		try {
			t & 16777232 ? ri(e) : ni(e), ti(e);
			var i = Di(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = bi;
		} finally {
			fi = r, q = n;
		}
	}
}
function Z(e) {
	var t = (e.f & 2) != 0;
	if (di?.add(e), G !== null && !hi && !(q !== null && q.f & 16384) && (_i === null || !_i.has(e))) {
		var n = G.deps;
		if (G.f & 2097152) e.rv < xi && (e.rv = xi, J === null && n !== null && n[Y] === e ? Y++ : J === null ? J = [e] : J.push(e));
		else {
			G.deps ??= [], ot.call(G.deps, e) || G.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [G] : ot.call(r, G) || r.push(G);
		}
	}
	if (pi && _r.has(e)) return _r.get(e);
	if (t) {
		var i = e;
		if (pi) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Mi(i)) && (a = fr(i)), _r.set(i, a), a;
		}
		var o = (i.f & 512) == 0 && !hi && G !== null && (fi || (G.f & 512) != 0), s = (i.f & St) === 0;
		Ti(i) && (o && (i.f |= 512), pr(i)), o && !s && (hr(i), ji(i));
	}
	if (R?.has(e)) return R.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ji(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (hr(t), ji(t));
}
function Mi(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (_r.has(t) || t.f & 2 && Mi(t)) return !0;
	return !1;
}
function Ni(e) {
	var t = hi;
	try {
		return hi = !0, e();
	} finally {
		hi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Pi = Symbol("events"), Fi = /* @__PURE__ */ new Set(), Ii = /* @__PURE__ */ new Set();
function Li(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Vi.call(t, e), !e.cancelBubble) return Br(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? xn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Ri(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Li(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Gr(() => {
		t.removeEventListener(e, o, a);
	});
}
function Q(e, t, n) {
	(t[Pi] ??= {})[e] = n;
}
function zi(e) {
	for (var t = 0; t < e.length; t++) Fi.add(e[t]);
	for (var n of Ii) n(e);
}
var Bi = null;
function Vi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Bi = e;
	var o = 0, s = Bi === e && e[Pi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Pi] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		lt(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = G, d = q;
		K(null), gi(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[Pi]?.[r];
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
			e[Pi] = t, delete e.currentTarget, K(u), gi(d);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Hi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Ui(e) {
	return Hi?.createHTML(e) ?? e;
}
function Wi(e) {
	var t = Ir("template");
	return t.innerHTML = Ui(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Gi(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Ki(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (j) return Gi(M, null), M;
		i === void 0 && (i = Wi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Mr(i)));
		var t = r || Dr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Mr(t), s = t.lastChild;
			Gi(o, s);
		} else Gi(t, t);
		return t;
	};
}
function qi(e, t) {
	if (j) {
		var n = q;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = M), on();
		return;
	}
	e !== null && e.before(t);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Ji = ["touchstart", "touchmove"];
function Yi(e) {
	return Ji.includes(e);
}
function $(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Rt] ??= e.nodeValue) && (e[Rt] = n, e.nodeValue = `${n}`);
}
function Xi(e, t) {
	return $i(e, t);
}
function Zi(e, t) {
	Ar(), t.intro = t.intro ?? !1;
	let n = t.target, r = j, i = M;
	try {
		for (var a = /* @__PURE__ */ Mr(n); a && (a.nodeType !== 8 || a.data !== "[");) a = /* @__PURE__ */ Nr(a);
		if (!a) throw nt;
		an(!0), N(a);
		let r = $i(e, {
			...t,
			anchor: a
		});
		return an(!1), r;
	} catch (r) {
		if (r instanceof Error && r.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw r;
		return r !== nt && console.warn("Failed to hydrate: ", r), t.recover === !1 && Yt(), Ar(), Pr(n), an(!1), Xi(e, t);
	} finally {
		an(r), N(i);
	}
}
var Qi = /* @__PURE__ */ new Map();
function $i(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Ar();
	var c = void 0, l = Yr(() => {
		var o = n ?? t.appendChild(jr());
		er(o, { pending: () => {} }, (t) => {
			gn({});
			var n = F;
			if (a && (n.c = a), i && (r.$$events = i), j && Gi(t, null), c = e(t, r) || {}, j && (q.nodes.end = M, M === null || M.nodeType !== 8 || M.data !== "]")) throw nn(), nt;
			_n();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Yi(r);
					for (let e of [t, document]) {
						var a = Qi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Qi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Vi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(st(Fi)), Ii.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Qi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Vi), r.delete(e), r.size === 0 && Qi.delete(n)) : r.set(e, i);
			}
			Ii.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return ea.set(c, l), c;
}
var ea = /* @__PURE__ */ new WeakMap();
function ta(e, t) {
	let n = ea.get(e);
	return n ? (ea.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
var na = class {
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
			if (n) ci(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (ci(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
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
						ui(r, t), t.append(jr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else W(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), oi(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (W(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = L, r = Fr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = jr();
			i.append(a), this.#n.set(e, {
				effect: U(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, U(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = M), this.#a(n);
	}
};
function ra(e) {
	F === null && Ht("onMount"), mn && F.l !== null ? ia(F).m.push(e) : Kr(() => {
		let t = Ni(e);
		if (typeof t == "function") return t;
	});
}
function ia(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function aa(e, t, n = !1) {
	var r;
	j && (r = M, on());
	var i = new na(e), a = n ? wt : 0;
	function o(e, t) {
		if (j) {
			var n = ln(r);
			if (e !== parseInt(n.substring(1))) {
				var a = cn();
				N(a), i.anchor = a, an(!1), i.ensure(e, t), an(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	ei(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function oa(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		oi(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					sa(e, st(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			Pr(u), u.append(l), e.items.clear();
		}
		sa(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function sa(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Dt, ui(a, document.createDocumentFragment())) : W(t[i], n);
	}
}
var ca;
function la(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = j ? N(/* @__PURE__ */ Mr(c)) : c.appendChild(jr());
	}
	j && on();
	var l = null, u = /* @__PURE__ */ ur(() => {
		var e = n();
		return it(e) ? e : e == null ? [] : st(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, da(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Dt, pa(l, null, o)) : ci(l) : oi(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: ei(() => {
			d = Z(u);
			var e = d.length;
			let c = !1;
			j && ln(o) === "[!" != (e === 0) && (o = cn(), N(o), an(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = L, v = Fr(), y = 0; y < e; y += 1) {
				j && M.nodeType === 8 && M.data === "]" && (o = M, c = !0, an(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && xr(S.v, b), S.i && xr(S.i, y), v && _.unskip_effect(S.e)) : (S = fa(s, p ? o : ca ??= jr(), b, x, y, i, t, n), p || (S.e.f |= Dt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = U(() => a(o)) : (l = U(() => a(ca ??= jr())), l.f |= Dt)), e > g.size && Wt("", "", ""), j && e > 0 && N(cn()), !p) if (f.set(_, g), v) {
				for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
				_.oncommit(m), _.ondiscard(h);
			} else m(_);
			c && an(!0), Z(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, j && (o = M);
}
function ua(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function da(e, t, n, r, i) {
	var a = (r & 8) != 0, o = t.length, s = e.items, c = ua(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (ci(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) if (g.f ^= Dt, g === c) pa(g, null, n);
		else {
			var v = u ? u.next : c;
			g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), ma(e, u, g), ma(e, g, v), pa(g, v, n), u = g, f = [], p = [], c = ua(u.next);
			continue;
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) pa(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					ma(e, x.prev, S.next), ma(e, u, x), ma(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), pa(g, c, n), ma(e, g.prev, g.next), ma(e, g, u === null ? e.effect.first : u.next), ma(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = ua(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = ua(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (sa(e, st(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = ua(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			oa(e, C, ee);
		}
	}
	a && xn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function fa(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? yr(n) : /* @__PURE__ */ br(n, !1, !1) : null, l = o & 2 ? yr(i) : null;
	return {
		v: c,
		i: l,
		e: U(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function pa(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Nr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ma(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var ha = [..." 	\n\r\f\xA0\v﻿"];
function ga(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ha.includes(r[o - 1])) && (s === r.length || ha.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function _a(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function va(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ya(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(va)), i && c.push(...Object.keys(i).map(va));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = va(e.substring(l, u).trim());
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
		return r && (n += _a(r)), i && (n += _a(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function ba(e, t, n, r, i, a) {
	var o = e[It];
	if (j || o !== n || o === void 0) {
		var s = ga(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[It] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function xa(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Sa(e, t, n, r) {
	var i = e[Lt];
	if (j || i !== t) {
		var a = ya(t, r);
		(!j || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Lt] = t;
	} else r && (Array.isArray(r) ? (xa(e, n?.[0], r[0]), xa(e, n?.[1], r[1], "important")) : xa(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Ca = Symbol("is custom element"), wa = Symbol("is html"), Ta = Vt ? "link" : "LINK", Ea = Vt ? "progress" : "PROGRESS";
function Da(e) {
	if (j) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ka(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ka(e, "checked", null), e.checked = r;
				}
			}
		};
		e[zt] = n, xn(n), zr();
	}
}
function Oa(e, t) {
	var n = Aa(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Ea) || (e.value = t ?? "");
}
function ka(e, t, n, r) {
	var i = Aa(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ta) || i[t] !== (i[t] = n) && (t === "loading" && (e[Pt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ma(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Aa(e) {
	return e[Ft] ??= {
		[Ca]: e.nodeName.includes("-"),
		[wa]: e.namespaceURI === rt
	};
}
var ja = /* @__PURE__ */ new Map();
function Ma(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ja.get(t);
	if (n) return n;
	ja.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = dt(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = mt(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Na(e, t) {
	return e === t || e?.[Mt] === t;
}
function Pa(e = {}, t, n, r) {
	var i = F.r, a = q;
	return Xr(() => {
		var o, s;
		return Qr(() => {
			o = s, s = r?.() || [], Ni(() => {
				Na(n(...s), e) || (t(e, ...s), o && Na(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Na(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Fa(e, t, n, r) {
	var i = !mn || (n & 2) != 0, a = (n & 8) != 0, o = (n & 16) != 0, s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ or(r), Z(l)) : (c && (c = !1, s = o ? Ni(r) : r), s);
	let d;
	if (a) {
		var f = Mt in e || Nt in e;
		d = ut(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = jn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Xt(t), d(p)));
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
	var _ = !1, v = (n & 1 ? or : ur)(() => (_ = !1, h()));
	a && Z(v);
	var y = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Z(v) : i && a ? Tr(e) : e;
			return B(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return pi && _ || y.f & 16384 ? v.v : Z(v);
	});
}
//#endregion
//#region node_modules/svelte/src/legacy/legacy-client.js
function Ia(e) {
	return new La(e);
}
var La = class {
	#e;
	#t;
	constructor(e) {
		var t = /* @__PURE__ */ new Map(), n = (e, n) => {
			var r = /* @__PURE__ */ br(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return Z(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === Nt ? !0 : (Z(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return B(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		this.#t = (e.hydrate ? Zi : Xi)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		}), !pn && (!e?.props?.$$host || e.sync === !1) && Un(), this.#e = r.$$events;
		for (let e of Object.keys(this.#t)) e === "$set" || e === "$destroy" || e === "$on" || lt(this, e, {
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
			ta(this.#t);
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
}, Ra;
typeof HTMLElement == "function" && (Ra = class extends HTMLElement {
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
					let n = Ir("slot");
					e !== "default" && (n.name = e), qi(t, n);
				};
			}
			let t = {}, n = Ba(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = za(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Ia({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = Jr(() => {
				Qr(() => {
					this.$$r = !0;
					for (let e of ct(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = za(e, this.$$d[e], this.$$p_d, "toAttribute");
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
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = za(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return ct(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function za(e, t, n, r) {
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
function Ba(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Va(e, t, n, r, i, a) {
	let o = class extends Ra {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return ct(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return ct(t).forEach((e) => {
		lt(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = za(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (ut(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		lt(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
//#endregion
//#region src/ui/UploaderElement.svelte
var Ha = /* @__PURE__ */ Ki("<tr><td colspan=\"7\" class=\"empty\"> </td></tr>"), Ua = /* @__PURE__ */ Ki("<img class=\"thumb\"/>"), Wa = /* @__PURE__ */ Ki("<div class=\"thumb thumb-placeholder\">FILE</div>"), Ga = /* @__PURE__ */ Ki("<tr><td><!></td><td><div class=\"name\"> </div> <div class=\"meta\"> </div></td><td> </td><td><input type=\"text\"/></td><td> </td><td><span class=\"row-progress-label\">100%</span></td><td><button type=\"button\" class=\"btn btn-mini btn-primary\">↑</button> <button type=\"button\" class=\"btn btn-mini btn-primary\">↓</button> <button type=\"button\" class=\"btn btn-mini btn-danger\"> </button></td></tr>"), Ka = /* @__PURE__ */ Ki("<tr><td><!></td><td><div class=\"name\"> </div> <div class=\"meta\"> </div></td><td> </td><td><span class=\"row-progress-label\">-</span></td><td> </td><td><div class=\"row-progress\"><div class=\"row-progress-bar\"></div></div> <span class=\"row-progress-label\"> </span></td><td><button type=\"button\" class=\"btn btn-mini btn-primary\">↑</button> <button type=\"button\" class=\"btn btn-mini btn-primary\">↓</button> <button type=\"button\" class=\"btn btn-mini btn-danger\"> </button></td></tr>"), qa = /* @__PURE__ */ Ki("<main class=\"uploader\"><header class=\"toolbar\"><button type=\"button\" class=\"btn btn-primary\"> </button> <button type=\"button\" class=\"btn btn-success\"> </button> <button type=\"button\" class=\"btn btn-warning\"> </button> <button type=\"button\" class=\"btn btn-danger\"> </button> <input type=\"file\" hidden=\"\"/></header> <section aria-label=\"Zone de depot\"> </section> <section class=\"global-progress-wrap\" aria-label=\"Progression globale\"><div class=\"global-progress\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\"><div class=\"global-progress-bar\"></div></div> <span> </span></section> <section class=\"table-wrap\"><table class=\"file-table\"><thead><tr><th>Apercu</th><th>Fichier</th><th>Taille</th><th>Legende</th><th>Statut</th><th>Progression</th><th>Actions</th></tr></thead><tbody><!><!><!></tbody></table></section></main>");
function Ja(e, t) {
	gn(t, !0);
	let n = Fa(t, "core", 7), r = /* @__PURE__ */ z(Tr({
		localFiles: [],
		remoteFiles: [],
		counts: {
			local: 0,
			remote: 0
		},
		progress: 0
	})), i, a = /* @__PURE__ */ z(!1), o = /* @__PURE__ */ z(Tr({}));
	ra(() => {
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
	async function u() {
		await n().clearCompleted();
	}
	function d(e) {
		e.preventDefault(), B(a, !1);
		let t = [...e.dataTransfer?.files || []];
		t.length > 0 && n().addFiles(t);
	}
	async function f(e, t) {
		let r = Z(o);
		B(o, {
			...Z(o),
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
	async function p(e) {
		try {
			await n().removeRemoteById(e);
		} catch {}
	}
	async function m(e) {
		try {
			await n().removeLocalById(e);
		} catch {}
	}
	var h = {
		get core() {
			return n();
		},
		set core(e) {
			n(e), Un();
		}
	}, g = qa(), _ = V(g), v = V(_), y = V(v, !0);
	P(v);
	var b = H(v, 2), x = V(b, !0);
	P(b);
	var S = H(b, 2), C = V(S, !0);
	P(S);
	var w = H(S, 2), ee = V(w, !0);
	P(w);
	var T = H(w, 2);
	Pa(T, (e) => i = e, () => i), P(_);
	var E = H(_, 2);
	let te;
	var ne = V(E, !0);
	P(E);
	var re = H(E, 2), ie = V(re), ae = V(ie);
	P(ie);
	var oe = H(ie, 2), se = V(oe);
	P(oe), P(re);
	var ce = H(re, 2), le = V(ce), ue = H(V(le)), de = V(ue), fe = (e) => {
		var t = Ha(), r = V(t), i = V(r, !0);
		P(r), P(t), $r(() => $(i, n().labels.empty)), qi(e, t);
	};
	aa(de, (e) => {
		Z(r).localFiles.length === 0 && Z(r).remoteFiles.length === 0 && e(fe);
	});
	var pe = H(de);
	return la(pe, 19, () => Z(r).remoteFiles, (e) => String(e.id), (e, t, i) => {
		let a = /* @__PURE__ */ lr(() => typeof Z(t).type == "string" && Z(t).type.startsWith("image/"));
		var s = Ga(), c = V(s), l = V(c), u = (e) => {
			var n = Ua();
			$r(() => {
				ka(n, "src", Z(t).url), ka(n, "alt", `Apercu de ${Z(t).name || "fichier"}`);
			}), qi(e, n);
		}, d = (e) => {
			qi(e, Wa());
		};
		aa(l, (e) => {
			Z(a) && Z(t).url ? e(u) : e(d, -1);
		}), P(c);
		var m = H(c), h = V(m), g = V(h, !0);
		P(h);
		var _ = H(h, 2), v = V(_, !0);
		P(_), P(m);
		var y = H(m), b = V(y, !0);
		P(y);
		var x = H(y), S = V(x);
		Da(S);
		let C;
		P(x);
		var w = H(x), ee = V(w, !0);
		P(w);
		var T = H(w, 2), E = V(T), te = H(E, 2), ne = H(te, 2), re = V(ne, !0);
		P(ne), P(T), P(s), $r((e, a, o, s) => {
			$(g, Z(t).name || "fichier"), $(v, Z(t).type || "type inconnu"), $(b, e), C = ba(S, 1, "caption-input", null, C, a), Oa(S, o), ka(S, "placeholder", n().labels.captionPlaceholder), S.disabled = s, $(ee, n().labels.serverState), E.disabled = Z(i) === 0, te.disabled = Z(i) === Z(r).remoteFiles.length - 1, $(re, n().labels.remove);
		}, [
			() => et(Number(Z(t).size || 0)),
			() => ({ "is-saving": Z(o)[String(Z(t).id)] }),
			() => String(Z(t).caption || ""),
			() => !!Z(o)[String(Z(t).id)]
		]), Q("change", S, (e) => f(String(Z(t).id), e.currentTarget.value)), Q("keydown", S, (e) => {
			e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur()), e.key === "Escape" && (e.preventDefault(), e.currentTarget.value = String(Z(t).caption || ""), e.currentTarget.blur());
		}), Q("click", E, () => n().moveRemote(String(Z(t).id), "up")), Q("click", te, () => n().moveRemote(String(Z(t).id), "down")), Q("click", ne, () => p(String(Z(t).id))), qi(e, s);
	}), la(H(pe), 19, () => Z(r).localFiles, (e) => e.id, (e, t, i) => {
		let a = /* @__PURE__ */ lr(() => Math.round(Z(t).progress?.percentage || 0)), o = /* @__PURE__ */ lr(() => n().computeFileStatus(Z(t))), s = /* @__PURE__ */ lr(() => n().getPreviewUrl(Z(t)));
		var c = Ka(), l = V(c), u = V(l), d = (e) => {
			var n = Ua();
			$r(() => {
				ka(n, "src", Z(s)), ka(n, "alt", `Apercu de ${Z(t).name}`);
			}), qi(e, n);
		}, f = (e) => {
			qi(e, Wa());
		};
		aa(u, (e) => {
			Z(s) ? e(d) : e(f, -1);
		}), P(l);
		var p = H(l), h = V(p), g = V(h, !0);
		P(h);
		var _ = H(h, 2), v = V(_, !0);
		P(_), P(p);
		var y = H(p), b = V(y, !0);
		P(y);
		var x = H(y, 2), S = V(x, !0);
		P(x);
		var C = H(x), w = V(C), ee = V(w);
		P(w);
		var T = H(w, 2), E = V(T);
		P(T), P(C);
		var te = H(C), ne = V(te), re = H(ne, 2), ie = H(re, 2), ae = V(ie, !0);
		P(ie), P(te), P(c), $r((e) => {
			$(g, Z(t).name), $(v, Z(t).type || "type inconnu"), $(b, e), $(S, Z(o)), Sa(ee, `width: ${Z(a)}%`), $(E, `${Z(a) ?? ""}%`), ne.disabled = Z(i) === 0, re.disabled = Z(i) === Z(r).localFiles.length - 1, $(ae, n().labels.remove);
		}, [() => et(Z(t).size)]), Q("click", ne, () => n().moveLocal(Z(t).id, "up")), Q("click", re, () => n().moveLocal(Z(t).id, "down")), Q("click", ie, () => m(Z(t).id)), qi(e, c);
	}), P(ue), P(le), P(ce), P(g), $r(() => {
		$(y, n().labels.addFiles), $(x, n().labels.startUpload), $(C, n().labels.cancel), $(ee, n().labels.clearCompleted), T.multiple = n().options.multiple, te = ba(E, 1, "drop-zone", null, te, { "is-over": Z(a) }), $(ne, n().labels.dropzone), ka(ie, "aria-valuenow", Z(r).progress), Sa(ae, `width: ${Z(r).progress}%`), $(se, `${Z(r).progress ?? ""}%`);
	}), Q("click", v, () => i.click()), Q("click", b, c), Q("click", S, l), Q("click", w, u), Q("change", T, s), Ri("dragover", E, (e) => {
		e.preventDefault(), B(a, !0);
	}), Ri("dragleave", E, () => {
		B(a, !1);
	}), Ri("drop", E, d), qi(e, g), _n(h);
}
zi([
	"click",
	"change",
	"keydown"
]), customElements.define("upload-manager-inner", Va(Ja, { core: {} }, [], []));
//#endregion
//#region src/adapters/widget.js
var Ya = "upload-manager-inner";
customElements.get(Ya) || customElements.define(Ya, Ja.element);
var Xa = class {
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
		}, this.core = new tt(t), this.bindCoreEvents(), this.mountUi(), this.core.init().catch((e) => {
			console.error("Initialisation du widget impossible", e);
		});
	}
	mountUi() {
		this.root.innerHTML = "", this.element = document.createElement(Ya), this.element.core = this.core, this.root.appendChild(this.element);
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
	async clearCompleted() {
		await this.core.clearCompleted();
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
window.UploaderWidget = Xa;
//#endregion
export { Qe as DEFAULT_LABELS, $e as DEFAULT_OPTIONS, tt as UploaderCore, Xa as UploaderWidget };

//# sourceMappingURL=upload-manager.es.js.map
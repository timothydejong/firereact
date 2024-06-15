import { FirebaseError as ne } from "firebase/app";
import {
  onSnapshot as lt,
  getDocs as Mt,
  getDoc as Ut,
  addDoc as Ft,
  setDoc as Ge,
  deleteDoc as Bt,
} from "firebase/firestore";
import { useState as l, useEffect as m, createContext as re } from "react";
import { jsx as g, Fragment as M } from "react/jsx-runtime";
import {
  onAuthStateChanged as xt,
  createUserWithEmailAndPassword as Vt,
  deleteUser as Ht,
  signOut as $t,
  sendEmailVerification as Wt,
} from "firebase/auth";
import { httpsCallable as jt } from "firebase/functions";
import {
  uploadBytes as Kt,
  uploadBytesResumable as Gt,
  getDownloadURL as zt,
  getBlob as qt,
  getBytes as Jt,
  deleteObject as Yt,
  getMetadata as Xt,
} from "firebase/storage";
const Zs = (
    n,
    { listen: e, listenToMetadataChanges: t } = {
      listen: !1,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [r, s] = l(!0),
      [i, a] = l(),
      [c, o] = l();
    return (
      m(() => {
        if ((s(!0), e))
          return lt(
            n,
            { includeMetadataChanges: t },
            (h) => {
              a(h), s(!1);
            },
            (h) => o(h),
            () => s(!1),
          );
        Mt(n)
          .then((d) => {
            a(d), s(!1);
          })
          .catch((d) => {
            if (d instanceof ne) o(d), s(!1);
            else throw (s(!1), d);
          })
          .finally(() => s(!1));
      }, [n, e, t]),
      { loading: r, snapshot: i, error: c }
    );
  },
  Qt = (
    n,
    { listen: e, listenToMetadataChanges: t } = {
      listen: !0,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [r, s] = l(!0),
      [i, a] = l(),
      [c, o] = l();
    return (
      m(() => {
        if ((s(!0), e))
          return lt(
            n,
            { includeMetadataChanges: t },
            (h) => {
              a(h), s(!1);
            },
            (h) => o(h),
            () => s(!1),
          );
        Ut(n)
          .then((d) => {
            a(d), s(!1);
          })
          .catch((d) => {
            if (d instanceof ne) o(d), s(!1);
            else throw (s(!1), d);
          })
          .finally(() => s(!1));
      }, [n, e, t]),
      { loading: r, snapshot: i, error: c }
    );
  },
  ei = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l(),
      [i, a] = l();
    return {
      state: e,
      dispatch: async (o) => {
        t("loading");
        try {
          const d = await Ft(n, o);
          return s(d), t("done"), d;
        } catch (d) {
          if (d instanceof ne) {
            a(d), t("ready");
            return;
          } else throw (t("ready"), d);
        }
      },
      reference: r,
      error: i,
    };
  },
  ti = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l();
    return {
      state: e,
      dispatch: async (a, c) => {
        t("loading");
        try {
          await (c ? Ge(n, a, c) : Ge(n, a)), t("done");
        } catch (o) {
          if (o instanceof ne) t("ready"), s(o);
          else throw (t("loading"), o);
          return;
        }
        t("done");
      },
      error: r,
    };
  },
  ni = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l();
    return {
      state: e,
      dispatch: async () => {
        t("loading");
        try {
          await Bt(n), t("done");
        } catch (a) {
          if (a instanceof ne) t("ready"), s(a);
          else throw (t("ready"), a);
        }
      },
      error: r,
    };
  },
  ri = ({
    reference: n,
    onLoading: e = () => /* @__PURE__ */ g(M, {}),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: t = (i) => /* @__PURE__ */ g(M, {}),
    onDone: r,
    listen: s = !1,
  }) => {
    const { loading: i, snapshot: a, error: c } = Qt(n, { listen: s });
    return i ? e() : c ? t(c) : r(a);
  },
  Zt = re(void 0),
  si = ({ app: n, children: e }) =>
    /* @__PURE__ */ g(Zt.Provider, { value: n, children: e }),
  en = re(void 0),
  ii = ({ firestore: n, children: e }) =>
    /* @__PURE__ */ g(en.Provider, { value: n, children: e }),
  tn = re(void 0),
  ai = ({ auth: n, children: e }) =>
    /* @__PURE__ */ g(tn.Provider, { value: n, children: e }),
  nn = re(void 0),
  oi = ({ functions: n, children: e }) =>
    /* @__PURE__ */ g(nn.Provider, { value: n, children: e }),
  rn = re(void 0),
  ci = ({ storage: n, children: e }) =>
    /* @__PURE__ */ g(rn.Provider, { value: n, children: e }),
  W = (
    n,
    { onError: e, onChange: t } = {
      onError: () => {},
      onChange: () => {},
    },
  ) => {
    const [r, s] = l(n.currentUser);
    return m(() => xt(n, (a) => s(a), e, t), [n, e, t]), r;
  },
  sn = (
    n,
    { onError: e, onlyRealAnon: t } = {
      onError: () => {},
      onlyRealAnon: !1,
    },
  ) => {
    const [r, s] = l("ready"),
      i = W(n, { onError: e });
    return (
      m(() => {
        t ? i || s("anonymous") : (!i || i.isAnonymous) && s("anonymous");
      }, [i, t]),
      {
        state: r,
        dispatch:
          r === "ready"
            ? async () => {
                s("loading"), await n.signOut(), s("anonymous");
              }
            : async () => {},
      }
    );
  },
  di = ({
    auth: n,
    onlyRealAnon: e = !1,
    onReady: t,
    onLoading: r,
    onAnonymous: s,
  }) => {
    const { state: i, dispatch: a } = sn(n, { onlyRealAnon: e });
    switch (i) {
      case "ready":
        return t
          ? t(a)
          : /* @__PURE__ */ g("button", { onClick: a, children: "Sign Out" });
      case "loading":
        return r ? r() : /* @__PURE__ */ g(M, {});
      case "anonymous":
        return s ? s() : /* @__PURE__ */ g(M, {});
    }
  },
  ui = (n) => {
    const e = W(n),
      [t, r] = l("ready");
    return (
      m(() => {
        r(e ? (e.isAnonymous ? "ready" : "authenticated") : "ready");
      }, [e]),
      {
        state: t,
        dispatch:
          t === "ready"
            ? async (i, a) => {
                r("loading");
                const c = await Vt(n, i, a);
                return r("authenticated"), c;
              }
            : async () => {},
      }
    );
  },
  li = (
    n,
    { includeFirebaseAnon: e } = {
      includeFirebaseAnon: !1,
    },
  ) => {
    const t = W(n),
      [r, s] = l("ready");
    return (
      m(() => {
        s(
          t
            ? t.isAnonymous
              ? e
                ? "ready"
                : "anonymous"
              : "ready"
            : "anonymous",
        );
      }, [t, e]),
      {
        state: r,
        dispatch:
          r === "ready"
            ? async () => {
                t && (s("loading"), await Ht(t), await $t(n), s("anonymous"));
              }
            : async () => {},
      }
    );
  },
  hi = ({
    auth: n,
    validator: e = an.isAuthenticated(),
    onSuccess: t,
    onFailure: r = () => /* @__PURE__ */ g(M, {}),
  }) => {
    const s = W(n),
      [i, a] = l(!1);
    return (
      m(() => {
        const c = e(s);
        c instanceof Promise ? c.then(a) : a(c);
      }, [s, e]),
      i ? t(s) : r(s)
    );
  },
  an = {
    isAuthenticated:
      (n = !1) =>
      (e) =>
        e ? (n ? !0 : !e.isAnonymous) : !1,
    isAnonymous:
      (n = !1) =>
      (e) =>
        e ? (n ? !1 : e.isAnonymous) : !0,
    isVerified: () => (n) => (n == null ? void 0 : n.emailVerified) ?? !1,
    every: (n) => async (e) => {
      const t = n.map((a) => a(e)),
        r = t.filter((a) => typeof a == "boolean"),
        s = t.filter((a) => a instanceof Promise),
        i = await Promise.all(s);
      return [...r, ...i].every((a) => a);
    },
    some: (n) => async (e) => {
      const t = n.map((a) => a(e)),
        r = t.filter((a) => typeof a == "boolean"),
        s = t.filter((a) => a instanceof Promise),
        i = await Promise.all(s);
      return [...r, ...i].some((a) => a);
    },
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ht = function (n) {
    const e = [];
    let t = 0;
    for (let r = 0; r < n.length; r++) {
      let s = n.charCodeAt(r);
      s < 128
        ? (e[t++] = s)
        : s < 2048
          ? ((e[t++] = (s >> 6) | 192), (e[t++] = (s & 63) | 128))
          : (s & 64512) === 55296 &&
              r + 1 < n.length &&
              (n.charCodeAt(r + 1) & 64512) === 56320
            ? ((s = 65536 + ((s & 1023) << 10) + (n.charCodeAt(++r) & 1023)),
              (e[t++] = (s >> 18) | 240),
              (e[t++] = ((s >> 12) & 63) | 128),
              (e[t++] = ((s >> 6) & 63) | 128),
              (e[t++] = (s & 63) | 128))
            : ((e[t++] = (s >> 12) | 224),
              (e[t++] = ((s >> 6) & 63) | 128),
              (e[t++] = (s & 63) | 128));
    }
    return e;
  },
  on = function (n) {
    const e = [];
    let t = 0,
      r = 0;
    for (; t < n.length; ) {
      const s = n[t++];
      if (s < 128) e[r++] = String.fromCharCode(s);
      else if (s > 191 && s < 224) {
        const i = n[t++];
        e[r++] = String.fromCharCode(((s & 31) << 6) | (i & 63));
      } else if (s > 239 && s < 365) {
        const i = n[t++],
          a = n[t++],
          c = n[t++],
          o =
            (((s & 7) << 18) | ((i & 63) << 12) | ((a & 63) << 6) | (c & 63)) -
            65536;
        (e[r++] = String.fromCharCode(55296 + (o >> 10))),
          (e[r++] = String.fromCharCode(56320 + (o & 1023)));
      } else {
        const i = n[t++],
          a = n[t++];
        e[r++] = String.fromCharCode(
          ((s & 15) << 12) | ((i & 63) << 6) | (a & 63),
        );
      }
    }
    return e.join("");
  },
  ft = {
    /**
     * Maps bytes to characters.
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     */
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     */
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    /**
     * Our websafe alphabet.
     */
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     */
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    /**
     * Base64-encode an array of bytes.
     *
     * @param input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeByteArray(n, e) {
      if (!Array.isArray(n))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let s = 0; s < n.length; s += 3) {
        const i = n[s],
          a = s + 1 < n.length,
          c = a ? n[s + 1] : 0,
          o = s + 2 < n.length,
          d = o ? n[s + 2] : 0,
          h = i >> 2,
          p = ((i & 3) << 4) | (c >> 4);
        let O = ((c & 15) << 2) | (d >> 6),
          P = d & 63;
        o || ((P = 64), a || (O = 64)), r.push(t[h], t[p], t[O], t[P]);
      }
      return r.join("");
    },
    /**
     * Base64-encode a string.
     *
     * @param input A string to encode.
     * @param webSafe If true, we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? btoa(n)
        : this.encodeByteArray(ht(n), e);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? atob(n)
        : on(this.decodeStringToByteArray(n, e));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param input Input to decode.
     * @param webSafe True if we should use the web-safe alphabet.
     * @return bytes representing the decoded value.
     */
    decodeStringToByteArray(n, e) {
      this.init_();
      const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let s = 0; s < n.length; ) {
        const i = t[n.charAt(s++)],
          c = s < n.length ? t[n.charAt(s)] : 0;
        ++s;
        const d = s < n.length ? t[n.charAt(s)] : 64;
        ++s;
        const p = s < n.length ? t[n.charAt(s)] : 64;
        if ((++s, i == null || c == null || d == null || p == null))
          throw new cn();
        const O = (i << 2) | (c >> 4);
        if ((r.push(O), d !== 64)) {
          const P = ((c << 4) & 240) | (d >> 2);
          if ((r.push(P), p !== 64)) {
            const oe = ((d << 6) & 192) | p;
            r.push(oe);
          }
        }
      }
      return r;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let n = 0; n < this.ENCODED_VALS.length; n++)
          (this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n)),
            (this.charToByteMap_[this.byteToCharMap_[n]] = n),
            (this.byteToCharMapWebSafe_[n] =
              this.ENCODED_VALS_WEBSAFE.charAt(n)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n),
            n >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n));
      }
    },
  };
class cn extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const dn = function (n) {
    const e = ht(n);
    return ft.encodeByteArray(e, !0);
  },
  pt = function (n) {
    return dn(n).replace(/\./g, "");
  },
  gt = function (n) {
    try {
      return ft.decodeString(n, !0);
    } catch (e) {
      console.error("base64Decode failed: ", e);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function un() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ln = () => un().__FIREBASE_DEFAULTS__,
  hn = () => {
    if (typeof process > "u" || typeof process.env > "u") return;
    const n = process.env.__FIREBASE_DEFAULTS__;
    if (n) return JSON.parse(n);
  },
  fn = () => {
    if (typeof document > "u") return;
    let n;
    try {
      n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const e = n && gt(n[1]);
    return e && JSON.parse(e);
  },
  pn = () => {
    try {
      return ln() || hn() || fn();
    } catch (n) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
      return;
    }
  },
  gn = (n) => {
    var e;
    return (e = pn()) === null || e === void 0 ? void 0 : e[`_${n}`];
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string"
    ? navigator.userAgent
    : "";
}
function mn() {
  return (
    typeof window < "u" && // @ts-ignore Setting up an broadly applicable index signature for Window
    // just to deal with this case would probably be a bad idea.
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())
  );
}
function _n() {
  const n =
    typeof chrome == "object"
      ? chrome.runtime
      : typeof browser == "object"
        ? browser.runtime
        : void 0;
  return typeof n == "object" && n.id !== void 0;
}
function yn() {
  return typeof navigator == "object" && navigator.product === "ReactNative";
}
function In() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function vn() {
  return new Promise((n, e) => {
    try {
      let t = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        s = self.indexedDB.open(r);
      (s.onsuccess = () => {
        s.result.close(), t || self.indexedDB.deleteDatabase(r), n(!0);
      }),
        (s.onupgradeneeded = () => {
          t = !1;
        }),
        (s.onerror = () => {
          var i;
          e(
            ((i = s.error) === null || i === void 0 ? void 0 : i.message) || "",
          );
        });
    } catch (t) {
      e(t);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const En = "FirebaseError";
class k extends Error {
  constructor(e, t, r) {
    super(t),
      (this.code = e),
      (this.customData = r),
      (this.name = En),
      Object.setPrototypeOf(this, k.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, se.prototype.create);
  }
}
class se {
  constructor(e, t, r) {
    (this.service = e), (this.serviceName = t), (this.errors = r);
  }
  create(e, ...t) {
    const r = t[0] || {},
      s = `${this.service}/${e}`,
      i = this.errors[e],
      a = i ? bn(i, r) : "Error",
      c = `${this.serviceName}: ${a} (${s}).`;
    return new k(s, c, r);
  }
}
function bn(n, e) {
  return n.replace(wn, (t, r) => {
    const s = e[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const wn = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Oe(n) {
  const e = [];
  for (const [t, r] of Object.entries(n))
    Array.isArray(r)
      ? r.forEach((s) => {
          e.push(encodeURIComponent(t) + "=" + encodeURIComponent(s));
        })
      : e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r));
  return e.length ? "&" + e.join("&") : "";
}
function G(n) {
  const e = {};
  return (
    n
      .replace(/^\?/, "")
      .split("&")
      .forEach((r) => {
        if (r) {
          const [s, i] = r.split("=");
          e[decodeURIComponent(s)] = decodeURIComponent(i);
        }
      }),
    e
  );
}
function z(n) {
  const e = n.indexOf("?");
  if (!e) return "";
  const t = n.indexOf("#", e);
  return n.substring(e, t > 0 ? t : void 0);
}
function Tn(n, e) {
  const t = new Sn(n, e);
  return t.subscribe.bind(t);
}
class Sn {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(e, t) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(() => {
          e(this);
        })
        .catch((r) => {
          this.error(r);
        });
  }
  next(e) {
    this.forEachObserver((t) => {
      t.next(e);
    });
  }
  error(e) {
    this.forEachObserver((t) => {
      t.error(e);
    }),
      this.close(e);
  }
  complete() {
    this.forEachObserver((e) => {
      e.complete();
    }),
      this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */
  subscribe(e, t, r) {
    let s;
    if (e === void 0 && t === void 0 && r === void 0)
      throw new Error("Missing Observer.");
    An(e, ["next", "error", "complete"])
      ? (s = e)
      : (s = {
          next: e,
          error: t,
          complete: r,
        }),
      s.next === void 0 && (s.next = Ie),
      s.error === void 0 && (s.error = Ie),
      s.complete === void 0 && (s.complete = Ie);
    const i = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? s.error(this.finalError) : s.complete();
          } catch {}
        }),
      this.observers.push(s),
      i
    );
  }
  // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.
  unsubscribeOne(e) {
    this.observers === void 0 ||
      this.observers[e] === void 0 ||
      (delete this.observers[e],
      (this.observerCount -= 1),
      this.observerCount === 0 &&
        this.onNoObservers !== void 0 &&
        this.onNoObservers(this));
  }
  forEachObserver(e) {
    if (!this.finalized)
      for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
  }
  // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.
  sendOne(e, t) {
    this.task.then(() => {
      if (this.observers !== void 0 && this.observers[e] !== void 0)
        try {
          t(this.observers[e]);
        } catch (r) {
          typeof console < "u" && console.error && console.error(r);
        }
    });
  }
  close(e) {
    this.finalized ||
      ((this.finalized = !0),
      e !== void 0 && (this.finalError = e),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function An(n, e) {
  if (typeof n != "object" || n === null) return !1;
  for (const t of e) if (t in n && typeof n[t] == "function") return !0;
  return !1;
}
function Ie() {}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ie(n) {
  return n && n._delegate ? n._delegate : n;
}
class Y {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, t, r) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var f;
(function (n) {
  (n[(n.DEBUG = 0)] = "DEBUG"),
    (n[(n.VERBOSE = 1)] = "VERBOSE"),
    (n[(n.INFO = 2)] = "INFO"),
    (n[(n.WARN = 3)] = "WARN"),
    (n[(n.ERROR = 4)] = "ERROR"),
    (n[(n.SILENT = 5)] = "SILENT");
})(f || (f = {}));
const kn = {
    debug: f.DEBUG,
    verbose: f.VERBOSE,
    info: f.INFO,
    warn: f.WARN,
    error: f.ERROR,
    silent: f.SILENT,
  },
  Rn = f.INFO,
  Cn = {
    [f.DEBUG]: "log",
    [f.VERBOSE]: "log",
    [f.INFO]: "info",
    [f.WARN]: "warn",
    [f.ERROR]: "error",
  },
  On = (n, e, ...t) => {
    if (e < n.logLevel) return;
    const r = /* @__PURE__ */ new Date().toISOString(),
      s = Cn[e];
    if (s) console[s](`[${r}]  ${n.name}:`, ...t);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${e})`,
      );
  };
class mt {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    (this.name = e),
      (this._logLevel = Rn),
      (this._logHandler = On),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in f))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? kn[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, f.DEBUG, ...e),
      this._logHandler(this, f.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, f.VERBOSE, ...e),
      this._logHandler(this, f.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, f.INFO, ...e),
      this._logHandler(this, f.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, f.WARN, ...e),
      this._logHandler(this, f.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, f.ERROR, ...e),
      this._logHandler(this, f.ERROR, ...e);
  }
}
const Pn = (n, e) => e.some((t) => n instanceof t);
let ze, qe;
function Nn() {
  return (
    ze ||
    (ze = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Dn() {
  return (
    qe ||
    (qe = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const _t = /* @__PURE__ */ new WeakMap(),
  Ae = /* @__PURE__ */ new WeakMap(),
  yt = /* @__PURE__ */ new WeakMap(),
  ve = /* @__PURE__ */ new WeakMap(),
  Pe = /* @__PURE__ */ new WeakMap();
function Ln(n) {
  const e = new Promise((t, r) => {
    const s = () => {
        n.removeEventListener("success", i), n.removeEventListener("error", a);
      },
      i = () => {
        t(A(n.result)), s();
      },
      a = () => {
        r(n.error), s();
      };
    n.addEventListener("success", i), n.addEventListener("error", a);
  });
  return (
    e
      .then((t) => {
        t instanceof IDBCursor && _t.set(t, n);
      })
      .catch(() => {}),
    Pe.set(e, n),
    e
  );
}
function Mn(n) {
  if (Ae.has(n)) return;
  const e = new Promise((t, r) => {
    const s = () => {
        n.removeEventListener("complete", i),
          n.removeEventListener("error", a),
          n.removeEventListener("abort", a);
      },
      i = () => {
        t(), s();
      },
      a = () => {
        r(n.error || new DOMException("AbortError", "AbortError")), s();
      };
    n.addEventListener("complete", i),
      n.addEventListener("error", a),
      n.addEventListener("abort", a);
  });
  Ae.set(n, e);
}
let ke = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done") return Ae.get(n);
      if (e === "objectStoreNames") return n.objectStoreNames || yt.get(n);
      if (e === "store")
        return t.objectStoreNames[1]
          ? void 0
          : t.objectStore(t.objectStoreNames[0]);
    }
    return A(n[e]);
  },
  set(n, e, t) {
    return (n[e] = t), !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store")
      ? !0
      : e in n;
  },
};
function Un(n) {
  ke = n(ke);
}
function Fn(n) {
  return n === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (e, ...t) {
        const r = n.call(Ee(this), e, ...t);
        return yt.set(r, e.sort ? e.sort() : [e]), A(r);
      }
    : Dn().includes(n)
      ? function (...e) {
          return n.apply(Ee(this), e), A(_t.get(this));
        }
      : function (...e) {
          return A(n.apply(Ee(this), e));
        };
}
function Bn(n) {
  return typeof n == "function"
    ? Fn(n)
    : (n instanceof IDBTransaction && Mn(n),
      Pn(n, Nn()) ? new Proxy(n, ke) : n);
}
function A(n) {
  if (n instanceof IDBRequest) return Ln(n);
  if (ve.has(n)) return ve.get(n);
  const e = Bn(n);
  return e !== n && (ve.set(n, e), Pe.set(e, n)), e;
}
const Ee = (n) => Pe.get(n);
function xn(n, e, { blocked: t, upgrade: r, blocking: s, terminated: i } = {}) {
  const a = indexedDB.open(n, e),
    c = A(a);
  return (
    r &&
      a.addEventListener("upgradeneeded", (o) => {
        r(A(a.result), o.oldVersion, o.newVersion, A(a.transaction), o);
      }),
    t &&
      a.addEventListener("blocked", (o) =>
        t(
          // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
          o.oldVersion,
          o.newVersion,
          o,
        ),
      ),
    c
      .then((o) => {
        i && o.addEventListener("close", () => i()),
          s &&
            o.addEventListener("versionchange", (d) =>
              s(d.oldVersion, d.newVersion, d),
            );
      })
      .catch(() => {}),
    c
  );
}
const Vn = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Hn = ["put", "add", "delete", "clear"],
  be = /* @__PURE__ */ new Map();
function Je(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string")) return;
  if (be.get(e)) return be.get(e);
  const t = e.replace(/FromIndex$/, ""),
    r = e !== t,
    s = Hn.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || Vn.includes(t))
  )
    return;
  const i = async function (a, ...c) {
    const o = this.transaction(a, s ? "readwrite" : "readonly");
    let d = o.store;
    return (
      r && (d = d.index(c.shift())),
      (await Promise.all([d[t](...c), s && o.done]))[0]
    );
  };
  return be.set(e, i), i;
}
Un((n) => ({
  ...n,
  get: (e, t, r) => Je(e, t) || n.get(e, t, r),
  has: (e, t) => !!Je(e, t) || n.has(e, t),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $n {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((t) => {
        if (Wn(t)) {
          const r = t.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((t) => t)
      .join(" ");
  }
}
function Wn(n) {
  const e = n.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Re = "@firebase/app",
  Ye = "0.9.26";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const U = new mt("@firebase/app"),
  jn = "@firebase/app-compat",
  Kn = "@firebase/analytics-compat",
  Gn = "@firebase/analytics",
  zn = "@firebase/app-check-compat",
  qn = "@firebase/app-check",
  Jn = "@firebase/auth",
  Yn = "@firebase/auth-compat",
  Xn = "@firebase/database",
  Qn = "@firebase/database-compat",
  Zn = "@firebase/functions",
  er = "@firebase/functions-compat",
  tr = "@firebase/installations",
  nr = "@firebase/installations-compat",
  rr = "@firebase/messaging",
  sr = "@firebase/messaging-compat",
  ir = "@firebase/performance",
  ar = "@firebase/performance-compat",
  or = "@firebase/remote-config",
  cr = "@firebase/remote-config-compat",
  dr = "@firebase/storage",
  ur = "@firebase/storage-compat",
  lr = "@firebase/firestore",
  hr = "@firebase/firestore-compat",
  fr = "firebase",
  pr = "10.7.2",
  gr = {
    [Re]: "fire-core",
    [jn]: "fire-core-compat",
    [Gn]: "fire-analytics",
    [Kn]: "fire-analytics-compat",
    [qn]: "fire-app-check",
    [zn]: "fire-app-check-compat",
    [Jn]: "fire-auth",
    [Yn]: "fire-auth-compat",
    [Xn]: "fire-rtdb",
    [Qn]: "fire-rtdb-compat",
    [Zn]: "fire-fn",
    [er]: "fire-fn-compat",
    [tr]: "fire-iid",
    [nr]: "fire-iid-compat",
    [rr]: "fire-fcm",
    [sr]: "fire-fcm-compat",
    [ir]: "fire-perf",
    [ar]: "fire-perf-compat",
    [or]: "fire-rc",
    [cr]: "fire-rc-compat",
    [dr]: "fire-gcs",
    [ur]: "fire-gcs-compat",
    [lr]: "fire-fst",
    [hr]: "fire-fst-compat",
    "fire-js": "fire-js",
    [fr]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mr = /* @__PURE__ */ new Map(),
  Xe = /* @__PURE__ */ new Map();
function _r(n, e) {
  try {
    n.container.addComponent(e);
  } catch (t) {
    U.debug(
      `Component ${e.name} failed to register with FirebaseApp ${n.name}`,
      t,
    );
  }
}
function X(n) {
  const e = n.name;
  if (Xe.has(e))
    return (
      U.debug(`There were multiple attempts to register component ${e}.`), !1
    );
  Xe.set(e, n);
  for (const t of mr.values()) _r(t, n);
  return !0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const yr = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  },
  Ne = new se("app", "Firebase", yr);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const De = pr;
function q(n, e, t) {
  var r;
  let s = (r = gr[n]) !== null && r !== void 0 ? r : n;
  t && (s += `-${t}`);
  const i = s.match(/\s|\//),
    a = e.match(/\s|\//);
  if (i || a) {
    const c = [`Unable to register library "${s}" with version "${e}":`];
    i &&
      c.push(
        `library name "${s}" contains illegal characters (whitespace or "/")`,
      ),
      i && a && c.push("and"),
      a &&
        c.push(
          `version name "${e}" contains illegal characters (whitespace or "/")`,
        ),
      U.warn(c.join(" "));
    return;
  }
  X(
    new Y(
      `${s}-version`,
      () => ({ library: s, version: e }),
      "VERSION",
      /* ComponentType.VERSION */
    ),
  );
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ir = "firebase-heartbeat-database",
  vr = 1,
  Q = "firebase-heartbeat-store";
let we = null;
function It() {
  return (
    we ||
      (we = xn(Ir, vr, {
        upgrade: (n, e) => {
          switch (e) {
            case 0:
              try {
                n.createObjectStore(Q);
              } catch (t) {
                console.warn(t);
              }
          }
        },
      }).catch((n) => {
        throw Ne.create("idb-open", {
          originalErrorMessage: n.message,
        });
      })),
    we
  );
}
async function Er(n) {
  try {
    return await (await It()).transaction(Q).objectStore(Q).get(vt(n));
  } catch (e) {
    if (e instanceof k) U.warn(e.message);
    else {
      const t = Ne.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message,
      });
      U.warn(t.message);
    }
  }
}
async function Qe(n, e) {
  try {
    const r = (await It()).transaction(Q, "readwrite");
    await r.objectStore(Q).put(e, vt(n)), await r.done;
  } catch (t) {
    if (t instanceof k) U.warn(t.message);
    else {
      const r = Ne.create("idb-set", {
        originalErrorMessage: t == null ? void 0 : t.message,
      });
      U.warn(r.message);
    }
  }
}
function vt(n) {
  return `${n.name}!${n.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const br = 1024,
  wr = 30 * 24 * 60 * 60 * 1e3;
class Tr {
  constructor(e) {
    (this.container = e), (this._heartbeatsCache = null);
    const t = this.container.getProvider("app").getImmediate();
    (this._storage = new Ar(t)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var e, t;
    const s = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      i = Ze();
    if (
      !(
        ((e = this._heartbeatsCache) === null || e === void 0
          ? void 0
          : e.heartbeats) == null &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        ((t = this._heartbeatsCache) === null || t === void 0
          ? void 0
          : t.heartbeats) == null)
      ) &&
      !(
        this._heartbeatsCache.lastSentHeartbeatDate === i ||
        this._heartbeatsCache.heartbeats.some((a) => a.date === i)
      )
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: i, agent: s }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((a) => {
            const c = new Date(a.date).valueOf();
            return Date.now() - c <= wr;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var e;
    if (
      (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
      ((e = this._heartbeatsCache) === null || e === void 0
        ? void 0
        : e.heartbeats) == null ||
        this._heartbeatsCache.heartbeats.length === 0)
    )
      return "";
    const t = Ze(),
      { heartbeatsToSend: r, unsentEntries: s } = Sr(
        this._heartbeatsCache.heartbeats,
      ),
      i = pt(JSON.stringify({ version: 2, heartbeats: r }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = t),
      s.length > 0
        ? ((this._heartbeatsCache.heartbeats = s),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      i
    );
  }
}
function Ze() {
  return /* @__PURE__ */ new Date().toISOString().substring(0, 10);
}
function Sr(n, e = br) {
  const t = [];
  let r = n.slice();
  for (const s of n) {
    const i = t.find((a) => a.agent === s.agent);
    if (i) {
      if ((i.dates.push(s.date), et(t) > e)) {
        i.dates.pop();
        break;
      }
    } else if (
      (t.push({
        agent: s.agent,
        dates: [s.date],
      }),
      et(t) > e)
    ) {
      t.pop();
      break;
    }
    r = r.slice(1);
  }
  return {
    heartbeatsToSend: t,
    unsentEntries: r,
  };
}
class Ar {
  constructor(e) {
    (this.app = e),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return In()
      ? vn()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await Er(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Qe(this.app, {
        lastSentHeartbeatDate:
          (t = e.lastSentHeartbeatDate) !== null && t !== void 0
            ? t
            : s.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    } else return;
  }
  // add heartbeats
  async add(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Qe(this.app, {
        lastSentHeartbeatDate:
          (t = e.lastSentHeartbeatDate) !== null && t !== void 0
            ? t
            : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...e.heartbeats],
      });
    } else return;
  }
}
function et(n) {
  return pt(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: n }),
  ).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function kr(n) {
  X(
    new Y(
      "platform-logger",
      (e) => new $n(e),
      "PRIVATE",
      /* ComponentType.PRIVATE */
    ),
  ),
    X(
      new Y(
        "heartbeat",
        (e) => new Tr(e),
        "PRIVATE",
        /* ComponentType.PRIVATE */
      ),
    ),
    q(Re, Ye, n),
    q(Re, Ye, "esm2017"),
    q("fire-js", "");
}
kr("");
function Le(n, e) {
  var t = {};
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) &&
      e.indexOf(r) < 0 &&
      (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(n); s < r.length; s++)
      e.indexOf(r[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(n, r[s]) &&
        (t[r[s]] = n[r[s]]);
  return t;
}
function Et() {
  return {
    "dependent-sdk-initialized-before-auth":
      "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
  };
}
const Rr = Et,
  bt = new se("auth", "Firebase", Et());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ue = new mt("@firebase/auth");
function Cr(n, ...e) {
  ue.logLevel <= f.WARN && ue.warn(`Auth (${De}): ${n}`, ...e);
}
function de(n, ...e) {
  ue.logLevel <= f.ERROR && ue.error(`Auth (${De}): ${n}`, ...e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function I(n, ...e) {
  throw Me(n, ...e);
}
function x(n, ...e) {
  return Me(n, ...e);
}
function wt(n, e, t) {
  const r = Object.assign(Object.assign({}, Rr()), { [e]: t });
  return new se("auth", "Firebase", r).create(e, {
    appName: n.name,
  });
}
function Or(n, e, t) {
  const r = t;
  if (!(e instanceof r))
    throw (
      (r.name !== e.constructor.name &&
        I(
          n,
          "argument-error",
          /* AuthErrorCode.ARGUMENT_ERROR */
        ),
      wt(
        n,
        "argument-error",
        `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`,
      ))
    );
}
function Me(n, ...e) {
  if (typeof n != "string") {
    const t = e[0],
      r = [...e.slice(1)];
    return r[0] && (r[0].appName = n.name), n._errorFactory.create(t, ...r);
  }
  return bt.create(n, ...e);
}
function u(n, e, ...t) {
  if (!n) throw Me(e, ...t);
}
function y(n) {
  const e = "INTERNAL ASSERTION FAILED: " + n;
  throw (de(e), new Error(e));
}
function F(n, e) {
  n || y(e);
}
function Pr() {
  return tt() === "http:" || tt() === "https:";
}
function tt() {
  var n;
  return (
    (typeof self < "u" &&
      ((n = self.location) === null || n === void 0 ? void 0 : n.protocol)) ||
    null
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Nr() {
  return typeof navigator < "u" &&
    navigator &&
    "onLine" in navigator &&
    typeof navigator.onLine == "boolean" && // Apply only for traditional web apps and Chrome extensions.
    // This is especially true for Cordova apps which have unreliable
    // navigator.onLine behavior unless cordova-plugin-network-information is
    // installed which overwrites the native navigator.onLine value and
    // defines navigator.connection.
    (Pr() || _n() || "connection" in navigator)
    ? navigator.onLine
    : !0;
}
function Dr() {
  if (typeof navigator > "u") return null;
  const n = navigator;
  return (
    // Most reliable, but only supported in Chrome/Firefox.
    (n.languages && n.languages[0]) || // Supported in most browsers, but returns the language of the browser
    // UI, not the language set in browser settings.
    n.language || // Couldn't determine language.
    null
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ae {
  constructor(e, t) {
    (this.shortDelay = e),
      (this.longDelay = t),
      F(t > e, "Short delay should be less than long delay!"),
      (this.isMobile = mn() || yn());
  }
  get() {
    return Nr()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Lr(n, e) {
  F(n.emulator, "Emulator should always be set here");
  const { url: t } = n.emulator;
  return e ? `${t}${e.startsWith("/") ? e.slice(1) : e}` : t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tt {
  static initialize(e, t, r) {
    (this.fetchImpl = e),
      t && (this.headersImpl = t),
      r && (this.responseImpl = r);
  }
  static fetch() {
    if (this.fetchImpl) return this.fetchImpl;
    if (typeof self < "u" && "fetch" in self) return self.fetch;
    if (typeof globalThis < "u" && globalThis.fetch) return globalThis.fetch;
    if (typeof fetch < "u") return fetch;
    y(
      "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
    );
  }
  static headers() {
    if (this.headersImpl) return this.headersImpl;
    if (typeof self < "u" && "Headers" in self) return self.Headers;
    if (typeof globalThis < "u" && globalThis.Headers)
      return globalThis.Headers;
    if (typeof Headers < "u") return Headers;
    y(
      "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
    );
  }
  static response() {
    if (this.responseImpl) return this.responseImpl;
    if (typeof self < "u" && "Response" in self) return self.Response;
    if (typeof globalThis < "u" && globalThis.Response)
      return globalThis.Response;
    if (typeof Response < "u") return Response;
    y(
      "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Mr = {
  // Custom token errors.
  CREDENTIAL_MISMATCH: "custom-token-mismatch",
  // This can only happen if the SDK sends a bad request.
  MISSING_CUSTOM_TOKEN: "internal-error",
  // Create Auth URI errors.
  INVALID_IDENTIFIER: "invalid-email",
  // This can only happen if the SDK sends a bad request.
  MISSING_CONTINUE_URI: "internal-error",
  // Sign in with email and password errors (some apply to sign up too).
  INVALID_PASSWORD: "wrong-password",
  // This can only happen if the SDK sends a bad request.
  MISSING_PASSWORD: "missing-password",
  // Thrown if Email Enumeration Protection is enabled in the project and the email or password is
  // invalid.
  INVALID_LOGIN_CREDENTIALS: "invalid-credential",
  // Sign up with email and password errors.
  EMAIL_EXISTS: "email-already-in-use",
  PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
  // Verify assertion for sign in with credential errors:
  INVALID_IDP_RESPONSE: "invalid-credential",
  INVALID_PENDING_TOKEN: "invalid-credential",
  FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
  // This can only happen if the SDK sends a bad request.
  MISSING_REQ_TYPE: "internal-error",
  // Send Password reset email errors:
  EMAIL_NOT_FOUND: "user-not-found",
  RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
  EXPIRED_OOB_CODE: "expired-action-code",
  INVALID_OOB_CODE: "invalid-action-code",
  // This can only happen if the SDK sends a bad request.
  MISSING_OOB_CODE: "internal-error",
  // Operations that require ID token in request:
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
  INVALID_ID_TOKEN: "invalid-user-token",
  TOKEN_EXPIRED: "user-token-expired",
  USER_NOT_FOUND: "user-token-expired",
  // Other errors.
  TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
  // Phone Auth related errors.
  INVALID_CODE: "invalid-verification-code",
  INVALID_SESSION_INFO: "invalid-verification-id",
  INVALID_TEMPORARY_PROOF: "invalid-credential",
  MISSING_SESSION_INFO: "missing-verification-id",
  SESSION_EXPIRED: "code-expired",
  // Other action code errors when additional settings passed.
  // MISSING_CONTINUE_URI is getting mapped to INTERNAL_ERROR above.
  // This is OK as this error will be caught by client side validation.
  MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
  UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
  // getProjectConfig errors when clientId is passed.
  INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
  // User actions (sign-up or deletion) disabled errors.
  ADMIN_ONLY_OPERATION: "admin-restricted-operation",
  // Multi factor related errors.
  INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
  MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
  MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
  MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
  SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
  SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
  // Blocking functions related errors.
  BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
  // Recaptcha related errors.
  RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
  MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
  INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
  INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
  MISSING_CLIENT_TYPE: "missing-client-type",
  MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
  INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
  INVALID_REQ_TYPE: "invalid-req-type",
  /* AuthErrorCode.INVALID_REQ_TYPE */
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ur = new ae(3e4, 6e4);
function R(n, e) {
  return n.tenantId && !e.tenantId
    ? Object.assign(Object.assign({}, e), { tenantId: n.tenantId })
    : e;
}
async function C(n, e, t, r, s = {}) {
  return St(n, s, async () => {
    let i = {},
      a = {};
    r &&
      (e === "GET"
        ? (a = r)
        : (i = {
            body: JSON.stringify(r),
          }));
    const c = Oe(Object.assign({ key: n.config.apiKey }, a)).slice(1),
      o = await n._getAdditionalHeaders();
    return (
      (o[
        "Content-Type"
        /* HttpHeader.CONTENT_TYPE */
      ] = "application/json"),
      n.languageCode &&
        (o[
          "X-Firebase-Locale"
          /* HttpHeader.X_FIREBASE_LOCALE */
        ] = n.languageCode),
      Tt.fetch()(
        At(n, n.config.apiHost, t, c),
        Object.assign(
          {
            method: e,
            headers: o,
            referrerPolicy: "no-referrer",
          },
          i,
        ),
      )
    );
  });
}
async function St(n, e, t) {
  n._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, Mr), e);
  try {
    const s = new Br(n),
      i = await Promise.race([t(), s.promise]);
    s.clearNetworkTimeout();
    const a = await i.json();
    if ("needConfirmation" in a)
      throw ce(n, "account-exists-with-different-credential", a);
    if (i.ok && !("errorMessage" in a)) return a;
    {
      const c = i.ok ? a.errorMessage : a.error.message,
        [o, d] = c.split(" : ");
      if (o === "FEDERATED_USER_ID_ALREADY_LINKED")
        throw ce(n, "credential-already-in-use", a);
      if (o === "EMAIL_EXISTS") throw ce(n, "email-already-in-use", a);
      if (o === "USER_DISABLED") throw ce(n, "user-disabled", a);
      const h = r[o] || o.toLowerCase().replace(/[_\s]+/g, "-");
      if (d) throw wt(n, h, d);
      I(n, h);
    }
  } catch (s) {
    if (s instanceof k) throw s;
    I(n, "network-request-failed", { message: String(s) });
  }
}
async function fe(n, e, t, r, s = {}) {
  const i = await C(n, e, t, r, s);
  return (
    "mfaPendingCredential" in i &&
      I(n, "multi-factor-auth-required", {
        _serverResponse: i,
      }),
    i
  );
}
function At(n, e, t, r) {
  const s = `${e}${t}?${r}`;
  return n.config.emulator ? Lr(n.config, s) : `${n.config.apiScheme}://${s}`;
}
function Fr(n) {
  switch (n) {
    case "ENFORCE":
      return "ENFORCE";
    case "AUDIT":
      return "AUDIT";
    case "OFF":
      return "OFF";
    default:
      return "ENFORCEMENT_STATE_UNSPECIFIED";
  }
}
class Br {
  constructor(e) {
    (this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((t, r) => {
        this.timer = setTimeout(
          () =>
            r(
              x(
                this.auth,
                "network-request-failed",
                /* AuthErrorCode.NETWORK_REQUEST_FAILED */
              ),
            ),
          Ur.get(),
        );
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function ce(n, e, t) {
  const r = {
    appName: n.name,
  };
  t.email && (r.email = t.email),
    t.phoneNumber && (r.phoneNumber = t.phoneNumber);
  const s = x(n, e, r);
  return (s.customData._tokenResponse = t), s;
}
function nt(n) {
  return n !== void 0 && n.enterprise !== void 0;
}
class xr {
  constructor(e) {
    if (
      ((this.siteKey = ""),
      (this.recaptchaEnforcementState = []),
      e.recaptchaKey === void 0)
    )
      throw new Error("recaptchaKey undefined");
    (this.siteKey = e.recaptchaKey.split("/")[3]),
      (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
  }
  /**
   * Returns the reCAPTCHA Enterprise enforcement state for the given provider.
   *
   * @param providerStr - The provider whose enforcement state is to be returned.
   * @returns The reCAPTCHA Enterprise enforcement state for the given provider.
   */
  getProviderEnforcementState(e) {
    if (
      !this.recaptchaEnforcementState ||
      this.recaptchaEnforcementState.length === 0
    )
      return null;
    for (const t of this.recaptchaEnforcementState)
      if (t.provider && t.provider === e) return Fr(t.enforcementState);
    return null;
  }
  /**
   * Returns true if the reCAPTCHA Enterprise enforcement state for the provider is set to ENFORCE or AUDIT.
   *
   * @param providerStr - The provider whose enablement state is to be returned.
   * @returns Whether or not reCAPTCHA Enterprise protection is enabled for the given provider.
   */
  isProviderEnabled(e) {
    return (
      this.getProviderEnforcementState(e) === "ENFORCE" ||
      this.getProviderEnforcementState(e) === "AUDIT"
    );
  }
}
async function Vr(n, e) {
  return C(n, "GET", "/v2/recaptchaConfig", R(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Hr(n, e) {
  return C(n, "POST", "/v1/accounts:delete", e);
}
async function $r(n, e) {
  return C(n, "POST", "/v1/accounts:lookup", e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function J(n) {
  if (n)
    try {
      const e = new Date(Number(n));
      if (!isNaN(e.getTime())) return e.toUTCString();
    } catch {}
}
async function Wr(n, e = !1) {
  const t = ie(n),
    r = await t.getIdToken(e),
    s = Ue(r);
  u(
    s && s.exp && s.auth_time && s.iat,
    t.auth,
    "internal-error",
    /* AuthErrorCode.INTERNAL_ERROR */
  );
  const i = typeof s.firebase == "object" ? s.firebase : void 0,
    a = i == null ? void 0 : i.sign_in_provider;
  return {
    claims: s,
    token: r,
    authTime: J(Te(s.auth_time)),
    issuedAtTime: J(Te(s.iat)),
    expirationTime: J(Te(s.exp)),
    signInProvider: a || null,
    signInSecondFactor: (i == null ? void 0 : i.sign_in_second_factor) || null,
  };
}
function Te(n) {
  return Number(n) * 1e3;
}
function Ue(n) {
  const [e, t, r] = n.split(".");
  if (e === void 0 || t === void 0 || r === void 0)
    return de("JWT malformed, contained fewer than 3 sections"), null;
  try {
    const s = gt(t);
    return s
      ? JSON.parse(s)
      : (de("Failed to decode base64 JWT payload"), null);
  } catch (s) {
    return (
      de(
        "Caught error parsing JWT payload as JSON",
        s == null ? void 0 : s.toString(),
      ),
      null
    );
  }
}
function jr(n) {
  const e = Ue(n);
  return (
    u(
      e,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
    u(
      typeof e.exp < "u",
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
    u(
      typeof e.iat < "u",
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
    Number(e.exp) - Number(e.iat)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Z(n, e, t = !1) {
  if (t) return e;
  try {
    return await e;
  } catch (r) {
    throw (
      (r instanceof k &&
        Kr(r) &&
        n.auth.currentUser === n &&
        (await n.auth.signOut()),
      r)
    );
  }
}
function Kr({ code: n }) {
  return n === "auth/user-disabled" || n === "auth/user-token-expired";
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gr {
  constructor(e) {
    (this.user = e),
      (this.isRunning = !1),
      (this.timerId = null),
      (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    this.isRunning &&
      ((this.isRunning = !1),
      this.timerId !== null && clearTimeout(this.timerId));
  }
  getInterval(e) {
    var t;
    if (e) {
      const r = this.errorBackoff;
      return (
        (this.errorBackoff = Math.min(
          this.errorBackoff * 2,
          96e4,
          /* Duration.RETRY_BACKOFF_MAX */
        )),
        r
      );
    } else {
      this.errorBackoff = 3e4;
      const s =
        ((t = this.user.stsTokenManager.expirationTime) !== null && t !== void 0
          ? t
          : 0) -
        Date.now() -
        3e5;
      return Math.max(0, s);
    }
  }
  schedule(e = !1) {
    if (!this.isRunning) return;
    const t = this.getInterval(e);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, t);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (e) {
      (e == null ? void 0 : e.code) === "auth/network-request-failed" &&
        this.schedule(
          /* wasError */
          !0,
        );
      return;
    }
    this.schedule();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kt {
  constructor(e, t) {
    (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = J(this.lastLoginAt)),
      (this.creationTime = J(this.createdAt));
  }
  _copy(e) {
    (this.createdAt = e.createdAt),
      (this.lastLoginAt = e.lastLoginAt),
      this._initializeTime();
  }
  toJSON() {
    return {
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt,
    };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function le(n) {
  var e;
  const t = n.auth,
    r = await n.getIdToken(),
    s = await Z(n, $r(t, { idToken: r }));
  u(
    s == null ? void 0 : s.users.length,
    t,
    "internal-error",
    /* AuthErrorCode.INTERNAL_ERROR */
  );
  const i = s.users[0];
  n._notifyReloadListener(i);
  const a =
      !((e = i.providerUserInfo) === null || e === void 0) && e.length
        ? Jr(i.providerUserInfo)
        : [],
    c = qr(n.providerData, a),
    o = n.isAnonymous,
    d = !(n.email && i.passwordHash) && !(c != null && c.length),
    h = o ? d : !1,
    p = {
      uid: i.localId,
      displayName: i.displayName || null,
      photoURL: i.photoUrl || null,
      email: i.email || null,
      emailVerified: i.emailVerified || !1,
      phoneNumber: i.phoneNumber || null,
      tenantId: i.tenantId || null,
      providerData: c,
      metadata: new kt(i.createdAt, i.lastLoginAt),
      isAnonymous: h,
    };
  Object.assign(n, p);
}
async function zr(n) {
  const e = ie(n);
  await le(e),
    await e.auth._persistUserIfCurrent(e),
    e.auth._notifyListenersIfCurrent(e);
}
function qr(n, e) {
  return [
    ...n.filter((r) => !e.some((s) => s.providerId === r.providerId)),
    ...e,
  ];
}
function Jr(n) {
  return n.map((e) => {
    var { providerId: t } = e,
      r = Le(e, ["providerId"]);
    return {
      providerId: t,
      uid: r.rawId || "",
      displayName: r.displayName || null,
      email: r.email || null,
      phoneNumber: r.phoneNumber || null,
      photoURL: r.photoUrl || null,
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Yr(n, e) {
  const t = await St(n, {}, async () => {
    const r = Oe({
        grant_type: "refresh_token",
        refresh_token: e,
      }).slice(1),
      { tokenApiHost: s, apiKey: i } = n.config,
      a = At(n, s, "/v1/token", `key=${i}`),
      c = await n._getAdditionalHeaders();
    return (
      (c[
        "Content-Type"
        /* HttpHeader.CONTENT_TYPE */
      ] = "application/x-www-form-urlencoded"),
      Tt.fetch()(a, {
        method: "POST",
        headers: c,
        body: r,
      })
    );
  });
  return {
    accessToken: t.access_token,
    expiresIn: t.expires_in,
    refreshToken: t.refresh_token,
  };
}
async function Xr(n, e) {
  return C(n, "POST", "/v2/accounts:revokeToken", R(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ee {
  constructor() {
    (this.refreshToken = null),
      (this.accessToken = null),
      (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    u(
      e.idToken,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
      u(
        typeof e.idToken < "u",
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      u(
        typeof e.refreshToken < "u",
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      );
    const t =
      "expiresIn" in e && typeof e.expiresIn < "u"
        ? Number(e.expiresIn)
        : jr(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  async getToken(e, t = !1) {
    return (
      u(
        !this.accessToken || this.refreshToken,
        e,
        "user-token-expired",
        /* AuthErrorCode.TOKEN_EXPIRED */
      ),
      !t && this.accessToken && !this.isExpired
        ? this.accessToken
        : this.refreshToken
          ? (await this.refresh(e, this.refreshToken), this.accessToken)
          : null
    );
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(e, t) {
    const { accessToken: r, refreshToken: s, expiresIn: i } = await Yr(e, t);
    this.updateTokensAndExpiration(r, s, Number(i));
  }
  updateTokensAndExpiration(e, t, r) {
    (this.refreshToken = t || null),
      (this.accessToken = e || null),
      (this.expirationTime = Date.now() + r * 1e3);
  }
  static fromJSON(e, t) {
    const { refreshToken: r, accessToken: s, expirationTime: i } = t,
      a = new ee();
    return (
      r &&
        (u(typeof r == "string", "internal-error", {
          appName: e,
        }),
        (a.refreshToken = r)),
      s &&
        (u(typeof s == "string", "internal-error", {
          appName: e,
        }),
        (a.accessToken = s)),
      i &&
        (u(typeof i == "number", "internal-error", {
          appName: e,
        }),
        (a.expirationTime = i)),
      a
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime,
    };
  }
  _assign(e) {
    (this.accessToken = e.accessToken),
      (this.refreshToken = e.refreshToken),
      (this.expirationTime = e.expirationTime);
  }
  _clone() {
    return Object.assign(new ee(), this.toJSON());
  }
  _performRefresh() {
    return y("not implemented");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function v(n, e) {
  u(typeof n == "string" || typeof n > "u", "internal-error", { appName: e });
}
class L {
  constructor(e) {
    var { uid: t, auth: r, stsTokenManager: s } = e,
      i = Le(e, ["uid", "auth", "stsTokenManager"]);
    (this.providerId = "firebase"),
      (this.proactiveRefresh = new Gr(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = t),
      (this.auth = r),
      (this.stsTokenManager = s),
      (this.accessToken = s.accessToken),
      (this.displayName = i.displayName || null),
      (this.email = i.email || null),
      (this.emailVerified = i.emailVerified || !1),
      (this.phoneNumber = i.phoneNumber || null),
      (this.photoURL = i.photoURL || null),
      (this.isAnonymous = i.isAnonymous || !1),
      (this.tenantId = i.tenantId || null),
      (this.providerData = i.providerData ? [...i.providerData] : []),
      (this.metadata = new kt(i.createdAt || void 0, i.lastLoginAt || void 0));
  }
  async getIdToken(e) {
    const t = await Z(this, this.stsTokenManager.getToken(this.auth, e));
    return (
      u(
        t,
        this.auth,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      this.accessToken !== t &&
        ((this.accessToken = t),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      t
    );
  }
  getIdTokenResult(e) {
    return Wr(this, e);
  }
  reload() {
    return zr(this);
  }
  _assign(e) {
    this !== e &&
      (u(
        this.uid === e.uid,
        this.auth,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      (this.displayName = e.displayName),
      (this.photoURL = e.photoURL),
      (this.email = e.email),
      (this.emailVerified = e.emailVerified),
      (this.phoneNumber = e.phoneNumber),
      (this.isAnonymous = e.isAnonymous),
      (this.tenantId = e.tenantId),
      (this.providerData = e.providerData.map((t) => Object.assign({}, t))),
      this.metadata._copy(e.metadata),
      this.stsTokenManager._assign(e.stsTokenManager));
  }
  _clone(e) {
    const t = new L(
      Object.assign(Object.assign({}, this), {
        auth: e,
        stsTokenManager: this.stsTokenManager._clone(),
      }),
    );
    return t.metadata._copy(this.metadata), t;
  }
  _onReload(e) {
    u(
      !this.reloadListener,
      this.auth,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
      (this.reloadListener = e),
      this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo),
        (this.reloadUserInfo = null));
  }
  _notifyReloadListener(e) {
    this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(e, t = !1) {
    let r = !1;
    e.idToken &&
      e.idToken !== this.stsTokenManager.accessToken &&
      (this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
      t && (await le(this)),
      await this.auth._persistUserIfCurrent(this),
      r && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    const e = await this.getIdToken();
    return (
      await Z(this, Hr(this.auth, { idToken: e })),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((e) => Object.assign({}, e)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          // Redirect event ID must be maintained in case there is a pending
          // redirect event.
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON(),
      ),
      {
        // Required for compatibility with the legacy SDK (go/firebase-auth-sdk-persistence-parsing):
        apiKey: this.auth.config.apiKey,
        appName: this.auth.name,
      },
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || "";
  }
  static _fromJSON(e, t) {
    var r, s, i, a, c, o, d, h;
    const p = (r = t.displayName) !== null && r !== void 0 ? r : void 0,
      O = (s = t.email) !== null && s !== void 0 ? s : void 0,
      P = (i = t.phoneNumber) !== null && i !== void 0 ? i : void 0,
      oe = (a = t.photoURL) !== null && a !== void 0 ? a : void 0,
      Ve = (c = t.tenantId) !== null && c !== void 0 ? c : void 0,
      ge = (o = t._redirectEventId) !== null && o !== void 0 ? o : void 0,
      He = (d = t.createdAt) !== null && d !== void 0 ? d : void 0,
      $e = (h = t.lastLoginAt) !== null && h !== void 0 ? h : void 0,
      {
        uid: me,
        emailVerified: We,
        isAnonymous: je,
        providerData: _e,
        stsTokenManager: Ke,
      } = t;
    u(
      me && Ke,
      e,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    );
    const Dt = ee.fromJSON(this.name, Ke);
    u(
      typeof me == "string",
      e,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
      v(p, e.name),
      v(O, e.name),
      u(
        typeof We == "boolean",
        e,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      u(
        typeof je == "boolean",
        e,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      v(P, e.name),
      v(oe, e.name),
      v(Ve, e.name),
      v(ge, e.name),
      v(He, e.name),
      v($e, e.name);
    const ye = new L({
      uid: me,
      auth: e,
      email: O,
      emailVerified: We,
      displayName: p,
      isAnonymous: je,
      photoURL: oe,
      phoneNumber: P,
      tenantId: Ve,
      stsTokenManager: Dt,
      createdAt: He,
      lastLoginAt: $e,
    });
    return (
      _e &&
        Array.isArray(_e) &&
        (ye.providerData = _e.map((Lt) => Object.assign({}, Lt))),
      ge && (ye._redirectEventId = ge),
      ye
    );
  }
  /**
   * Initialize a User from an idToken server response
   * @param auth
   * @param idTokenResponse
   */
  static async _fromIdTokenResponse(e, t, r = !1) {
    const s = new ee();
    s.updateFromServerResponse(t);
    const i = new L({
      uid: t.localId,
      auth: e,
      stsTokenManager: s,
      isAnonymous: r,
    });
    return await le(i), i;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const rt = /* @__PURE__ */ new Map();
function S(n) {
  F(n instanceof Function, "Expected a class definition");
  let e = rt.get(n);
  return e
    ? (F(e instanceof n, "Instance stored in cache mismatched with class"), e)
    : ((e = new n()), rt.set(n, e), e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rt {
  constructor() {
    (this.type = "NONE"), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(e, t) {
    this.storage[e] = t;
  }
  async _get(e) {
    const t = this.storage[e];
    return t === void 0 ? null : t;
  }
  async _remove(e) {
    delete this.storage[e];
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
Rt.type = "NONE";
const st = Rt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Se(n, e, t) {
  return `firebase:${n}:${e}:${t}`;
}
class V {
  constructor(e, t, r) {
    (this.persistence = e), (this.auth = t), (this.userKey = r);
    const { config: s, name: i } = this.auth;
    (this.fullUserKey = Se(this.userKey, s.apiKey, i)),
      (this.fullPersistenceKey = Se("persistence", s.apiKey, i)),
      (this.boundEventHandler = t._onStorageEvent.bind(t)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(e) {
    return this.persistence._set(this.fullUserKey, e.toJSON());
  }
  async getCurrentUser() {
    const e = await this.persistence._get(this.fullUserKey);
    return e ? L._fromJSON(this.auth, e) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(
      this.fullPersistenceKey,
      this.persistence.type,
    );
  }
  async setPersistence(e) {
    if (this.persistence === e) return;
    const t = await this.getCurrentUser();
    if ((await this.removeCurrentUser(), (this.persistence = e), t))
      return this.setCurrentUser(t);
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(e, t, r = "authUser") {
    if (!t.length) return new V(S(st), e, r);
    const s = (
      await Promise.all(
        t.map(async (d) => {
          if (await d._isAvailable()) return d;
        }),
      )
    ).filter((d) => d);
    let i = s[0] || S(st);
    const a = Se(r, e.config.apiKey, e.name);
    let c = null;
    for (const d of t)
      try {
        const h = await d._get(a);
        if (h) {
          const p = L._fromJSON(e, h);
          d !== i && (c = p), (i = d);
          break;
        }
      } catch {}
    const o = s.filter((d) => d._shouldAllowMigration);
    return !i._shouldAllowMigration || !o.length
      ? new V(i, e, r)
      : ((i = o[0]),
        c && (await i._set(a, c.toJSON())),
        await Promise.all(
          t.map(async (d) => {
            if (d !== i)
              try {
                await d._remove(a);
              } catch {}
          }),
        ),
        new V(i, e, r));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function it(n) {
  const e = n.toLowerCase();
  if (e.includes("opera/") || e.includes("opr/") || e.includes("opios/"))
    return "Opera";
  if (ts(e)) return "IEMobile";
  if (e.includes("msie") || e.includes("trident/")) return "IE";
  if (e.includes("edge/")) return "Edge";
  if (Qr(e)) return "Firefox";
  if (e.includes("silk/")) return "Silk";
  if (rs(e)) return "Blackberry";
  if (ss(e)) return "Webos";
  if (Zr(e)) return "Safari";
  if ((e.includes("chrome/") || es(e)) && !e.includes("edge/")) return "Chrome";
  if (ns(e)) return "Android";
  {
    const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      r = n.match(t);
    if ((r == null ? void 0 : r.length) === 2) return r[1];
  }
  return "Other";
}
function Qr(n = _()) {
  return /firefox\//i.test(n);
}
function Zr(n = _()) {
  const e = n.toLowerCase();
  return (
    e.includes("safari/") &&
    !e.includes("chrome/") &&
    !e.includes("crios/") &&
    !e.includes("android")
  );
}
function es(n = _()) {
  return /crios\//i.test(n);
}
function ts(n = _()) {
  return /iemobile/i.test(n);
}
function ns(n = _()) {
  return /android/i.test(n);
}
function rs(n = _()) {
  return /blackberry/i.test(n);
}
function ss(n = _()) {
  return /webos/i.test(n);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ct(n, e = []) {
  let t;
  switch (n) {
    case "Browser":
      t = it(_());
      break;
    case "Worker":
      t = `${it(_())}-${n}`;
      break;
    default:
      t = n;
  }
  const r = e.length ? e.join(",") : "FirebaseCore-web";
  return `${t}/JsCore/${De}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class is {
  constructor(e) {
    (this.auth = e), (this.queue = []);
  }
  pushCallback(e, t) {
    const r = (i) =>
      new Promise((a, c) => {
        try {
          const o = e(i);
          a(o);
        } catch (o) {
          c(o);
        }
      });
    (r.onAbort = t), this.queue.push(r);
    const s = this.queue.length - 1;
    return () => {
      this.queue[s] = () => Promise.resolve();
    };
  }
  async runMiddleware(e) {
    if (this.auth.currentUser === e) return;
    const t = [];
    try {
      for (const r of this.queue) await r(e), r.onAbort && t.push(r.onAbort);
    } catch (r) {
      t.reverse();
      for (const s of t)
        try {
          s();
        } catch {}
      throw this.auth._errorFactory.create("login-blocked", {
        originalMessage: r == null ? void 0 : r.message,
      });
    }
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function as(n, e = {}) {
  return C(n, "GET", "/v2/passwordPolicy", R(n, e));
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const os = 6;
class cs {
  constructor(e) {
    var t, r, s, i;
    const a = e.customStrengthOptions;
    (this.customStrengthOptions = {}),
      (this.customStrengthOptions.minPasswordLength =
        (t = a.minPasswordLength) !== null && t !== void 0 ? t : os),
      a.maxPasswordLength &&
        (this.customStrengthOptions.maxPasswordLength = a.maxPasswordLength),
      a.containsLowercaseCharacter !== void 0 &&
        (this.customStrengthOptions.containsLowercaseLetter =
          a.containsLowercaseCharacter),
      a.containsUppercaseCharacter !== void 0 &&
        (this.customStrengthOptions.containsUppercaseLetter =
          a.containsUppercaseCharacter),
      a.containsNumericCharacter !== void 0 &&
        (this.customStrengthOptions.containsNumericCharacter =
          a.containsNumericCharacter),
      a.containsNonAlphanumericCharacter !== void 0 &&
        (this.customStrengthOptions.containsNonAlphanumericCharacter =
          a.containsNonAlphanumericCharacter),
      (this.enforcementState = e.enforcementState),
      this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED" &&
        (this.enforcementState = "OFF"),
      (this.allowedNonAlphanumericCharacters =
        (s =
          (r = e.allowedNonAlphanumericCharacters) === null || r === void 0
            ? void 0
            : r.join("")) !== null && s !== void 0
          ? s
          : ""),
      (this.forceUpgradeOnSignin =
        (i = e.forceUpgradeOnSignin) !== null && i !== void 0 ? i : !1),
      (this.schemaVersion = e.schemaVersion);
  }
  validatePassword(e) {
    var t, r, s, i, a, c;
    const o = {
      isValid: !0,
      passwordPolicy: this,
    };
    return (
      this.validatePasswordLengthOptions(e, o),
      this.validatePasswordCharacterOptions(e, o),
      o.isValid &&
        (o.isValid =
          (t = o.meetsMinPasswordLength) !== null && t !== void 0 ? t : !0),
      o.isValid &&
        (o.isValid =
          (r = o.meetsMaxPasswordLength) !== null && r !== void 0 ? r : !0),
      o.isValid &&
        (o.isValid =
          (s = o.containsLowercaseLetter) !== null && s !== void 0 ? s : !0),
      o.isValid &&
        (o.isValid =
          (i = o.containsUppercaseLetter) !== null && i !== void 0 ? i : !0),
      o.isValid &&
        (o.isValid =
          (a = o.containsNumericCharacter) !== null && a !== void 0 ? a : !0),
      o.isValid &&
        (o.isValid =
          (c = o.containsNonAlphanumericCharacter) !== null && c !== void 0
            ? c
            : !0),
      o
    );
  }
  /**
   * Validates that the password meets the length options for the policy.
   *
   * @param password Password to validate.
   * @param status Validation status.
   */
  validatePasswordLengthOptions(e, t) {
    const r = this.customStrengthOptions.minPasswordLength,
      s = this.customStrengthOptions.maxPasswordLength;
    r && (t.meetsMinPasswordLength = e.length >= r),
      s && (t.meetsMaxPasswordLength = e.length <= s);
  }
  /**
   * Validates that the password meets the character options for the policy.
   *
   * @param password Password to validate.
   * @param status Validation status.
   */
  validatePasswordCharacterOptions(e, t) {
    this.updatePasswordCharacterOptionsStatuses(
      t,
      /* containsLowercaseCharacter= */
      !1,
      /* containsUppercaseCharacter= */
      !1,
      /* containsNumericCharacter= */
      !1,
      /* containsNonAlphanumericCharacter= */
      !1,
    );
    let r;
    for (let s = 0; s < e.length; s++)
      (r = e.charAt(s)),
        this.updatePasswordCharacterOptionsStatuses(
          t,
          /* containsLowercaseCharacter= */
          r >= "a" && r <= "z",
          /* containsUppercaseCharacter= */
          r >= "A" && r <= "Z",
          /* containsNumericCharacter= */
          r >= "0" && r <= "9",
          /* containsNonAlphanumericCharacter= */
          this.allowedNonAlphanumericCharacters.includes(r),
        );
  }
  /**
   * Updates the running validation status with the statuses for the character options.
   * Expected to be called each time a character is processed to update each option status
   * based on the current character.
   *
   * @param status Validation status.
   * @param containsLowercaseCharacter Whether the character is a lowercase letter.
   * @param containsUppercaseCharacter Whether the character is an uppercase letter.
   * @param containsNumericCharacter Whether the character is a numeric character.
   * @param containsNonAlphanumericCharacter Whether the character is a non-alphanumeric character.
   */
  updatePasswordCharacterOptionsStatuses(e, t, r, s, i) {
    this.customStrengthOptions.containsLowercaseLetter &&
      (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
      this.customStrengthOptions.containsUppercaseLetter &&
        (e.containsUppercaseLetter || (e.containsUppercaseLetter = r)),
      this.customStrengthOptions.containsNumericCharacter &&
        (e.containsNumericCharacter || (e.containsNumericCharacter = s)),
      this.customStrengthOptions.containsNonAlphanumericCharacter &&
        (e.containsNonAlphanumericCharacter ||
          (e.containsNonAlphanumericCharacter = i));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ds {
  constructor(e, t, r, s) {
    (this.app = e),
      (this.heartbeatServiceProvider = t),
      (this.appCheckServiceProvider = r),
      (this.config = s),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new at(this)),
      (this.idTokenSubscription = new at(this)),
      (this.beforeStateQueue = new is(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = bt),
      (this._agentRecaptchaConfig = null),
      (this._tenantRecaptchaConfigs = {}),
      (this._projectPasswordPolicy = null),
      (this._tenantPasswordPolicies = {}),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = e.name),
      (this.clientVersion = s.sdkClientVersion);
  }
  _initializeWithPersistence(e, t) {
    return (
      t && (this._popupRedirectResolver = S(t)),
      (this._initializationPromise = this.queue(async () => {
        var r, s;
        if (
          !this._deleted &&
          ((this.persistenceManager = await V.create(this, e)), !this._deleted)
        ) {
          if (
            !((r = this._popupRedirectResolver) === null || r === void 0) &&
            r._shouldInitProactively
          )
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch {}
          await this.initializeCurrentUser(t),
            (this.lastNotifiedUid =
              ((s = this.currentUser) === null || s === void 0
                ? void 0
                : s.uid) || null),
            !this._deleted && (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  /**
   * If the persistence is changed in another window, the user manager will let us know
   */
  async _onStorageEvent() {
    if (this._deleted) return;
    const e = await this.assertedPersistence.getCurrentUser();
    if (!(!this.currentUser && !e)) {
      if (this.currentUser && e && this.currentUser.uid === e.uid) {
        this._currentUser._assign(e), await this.currentUser.getIdToken();
        return;
      }
      await this._updateCurrentUser(
        e,
        /* skipBeforeStateCallbacks */
        !0,
      );
    }
  }
  async initializeCurrentUser(e) {
    var t;
    const r = await this.assertedPersistence.getCurrentUser();
    let s = r,
      i = !1;
    if (e && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const a =
          (t = this.redirectUser) === null || t === void 0
            ? void 0
            : t._redirectEventId,
        c = s == null ? void 0 : s._redirectEventId,
        o = await this.tryRedirectSignIn(e);
      (!a || a === c) && o != null && o.user && ((s = o.user), (i = !0));
    }
    if (!s) return this.directlySetCurrentUser(null);
    if (!s._redirectEventId) {
      if (i)
        try {
          await this.beforeStateQueue.runMiddleware(s);
        } catch (a) {
          (s = r),
            this._popupRedirectResolver._overrideRedirectResult(this, () =>
              Promise.reject(a),
            );
        }
      return s
        ? this.reloadAndSetCurrentUserOrClear(s)
        : this.directlySetCurrentUser(null);
    }
    return (
      u(
        this._popupRedirectResolver,
        this,
        "argument-error",
        /* AuthErrorCode.ARGUMENT_ERROR */
      ),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser &&
      this.redirectUser._redirectEventId === s._redirectEventId
        ? this.directlySetCurrentUser(s)
        : this.reloadAndSetCurrentUserOrClear(s)
    );
  }
  async tryRedirectSignIn(e) {
    let t = null;
    try {
      t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
    } catch {
      await this._setRedirectUser(null);
    }
    return t;
  }
  async reloadAndSetCurrentUserOrClear(e) {
    try {
      await le(e);
    } catch (t) {
      if ((t == null ? void 0 : t.code) !== "auth/network-request-failed")
        return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(e);
  }
  useDeviceLanguage() {
    this.languageCode = Dr();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(e) {
    const t = e ? ie(e) : null;
    return (
      t &&
        u(
          t.auth.config.apiKey === this.config.apiKey,
          this,
          "invalid-user-token",
          /* AuthErrorCode.INVALID_AUTH */
        ),
      this._updateCurrentUser(t && t._clone(this))
    );
  }
  async _updateCurrentUser(e, t = !1) {
    if (!this._deleted)
      return (
        e &&
          u(
            this.tenantId === e.tenantId,
            this,
            "tenant-id-mismatch",
            /* AuthErrorCode.TENANT_ID_MISMATCH */
          ),
        t || (await this.beforeStateQueue.runMiddleware(e)),
        this.queue(async () => {
          await this.directlySetCurrentUser(e), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return (
      await this.beforeStateQueue.runMiddleware(null),
      (this.redirectPersistenceManager || this._popupRedirectResolver) &&
        (await this._setRedirectUser(null)),
      this._updateCurrentUser(
        null,
        /* skipBeforeStateCallbacks */
        !0,
      )
    );
  }
  setPersistence(e) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(S(e));
    });
  }
  _getRecaptchaConfig() {
    return this.tenantId == null
      ? this._agentRecaptchaConfig
      : this._tenantRecaptchaConfigs[this.tenantId];
  }
  async validatePassword(e) {
    this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
    const t = this._getPasswordPolicyInternal();
    return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
      ? Promise.reject(
          this._errorFactory.create(
            "unsupported-password-policy-schema-version",
            {},
          ),
        )
      : t.validatePassword(e);
  }
  _getPasswordPolicyInternal() {
    return this.tenantId === null
      ? this._projectPasswordPolicy
      : this._tenantPasswordPolicies[this.tenantId];
  }
  async _updatePasswordPolicy() {
    const e = await as(this),
      t = new cs(e);
    this.tenantId === null
      ? (this._projectPasswordPolicy = t)
      : (this._tenantPasswordPolicies[this.tenantId] = t);
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(e) {
    this._errorFactory = new se("auth", "Firebase", e());
  }
  onAuthStateChanged(e, t, r) {
    return this.registerStateListener(this.authStateSubscription, e, t, r);
  }
  beforeAuthStateChanged(e, t) {
    return this.beforeStateQueue.pushCallback(e, t);
  }
  onIdTokenChanged(e, t, r) {
    return this.registerStateListener(this.idTokenSubscription, e, t, r);
  }
  authStateReady() {
    return new Promise((e, t) => {
      if (this.currentUser) e();
      else {
        const r = this.onAuthStateChanged(() => {
          r(), e();
        }, t);
      }
    });
  }
  /**
   * Revokes the given access token. Currently only supports Apple OAuth access tokens.
   */
  async revokeAccessToken(e) {
    if (this.currentUser) {
      const t = await this.currentUser.getIdToken(),
        r = {
          providerId: "apple.com",
          tokenType: "ACCESS_TOKEN",
          token: e,
          idToken: t,
        };
      this.tenantId != null && (r.tenantId = this.tenantId), await Xr(this, r);
    }
  }
  toJSON() {
    var e;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser:
        (e = this._currentUser) === null || e === void 0 ? void 0 : e.toJSON(),
    };
  }
  async _setRedirectUser(e, t) {
    const r = await this.getOrInitRedirectPersistenceManager(t);
    return e === null ? r.removeCurrentUser() : r.setCurrentUser(e);
  }
  async getOrInitRedirectPersistenceManager(e) {
    if (!this.redirectPersistenceManager) {
      const t = (e && S(e)) || this._popupRedirectResolver;
      u(
        t,
        this,
        "argument-error",
        /* AuthErrorCode.ARGUMENT_ERROR */
      ),
        (this.redirectPersistenceManager = await V.create(
          this,
          [S(t._redirectPersistence)],
          "redirectUser",
          /* KeyName.REDIRECT_USER */
        )),
        (this.redirectUser =
          await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(e) {
    var t, r;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      ((t = this._currentUser) === null || t === void 0
        ? void 0
        : t._redirectEventId) === e
        ? this._currentUser
        : ((r = this.redirectUser) === null || r === void 0
              ? void 0
              : r._redirectEventId) === e
          ? this.redirectUser
          : null
    );
  }
  async _persistUserIfCurrent(e) {
    if (e === this.currentUser)
      return this.queue(async () => this.directlySetCurrentUser(e));
  }
  /** Notifies listeners only if the user is current */
  _notifyListenersIfCurrent(e) {
    e === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0),
      this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1),
      this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  /** Returns the current user cast as the internal type */
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var e, t;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const r =
      (t = (e = this.currentUser) === null || e === void 0 ? void 0 : e.uid) !==
        null && t !== void 0
        ? t
        : null;
    this.lastNotifiedUid !== r &&
      ((this.lastNotifiedUid = r),
      this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(e, t, r, s) {
    if (this._deleted) return () => {};
    const i = typeof t == "function" ? t : t.next.bind(t);
    let a = !1;
    const c = this._isInitialized
      ? Promise.resolve()
      : this._initializationPromise;
    if (
      (u(
        c,
        this,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      c.then(() => {
        a || i(this.currentUser);
      }),
      typeof t == "function")
    ) {
      const o = e.addObserver(t, r, s);
      return () => {
        (a = !0), o();
      };
    } else {
      const o = e.addObserver(t);
      return () => {
        (a = !0), o();
      };
    }
  }
  /**
   * Unprotected (from race conditions) method to set the current user. This
   * should only be called from within a queued callback. This is necessary
   * because the queue shouldn't rely on another queued callback.
   */
  async directlySetCurrentUser(e) {
    this.currentUser &&
      this.currentUser !== e &&
      this._currentUser._stopProactiveRefresh(),
      e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
      (this.currentUser = e),
      e
        ? await this.assertedPersistence.setCurrentUser(e)
        : await this.assertedPersistence.removeCurrentUser();
  }
  queue(e) {
    return (this.operations = this.operations.then(e, e)), this.operations;
  }
  get assertedPersistence() {
    return (
      u(
        this.persistenceManager,
        this,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      this.persistenceManager
    );
  }
  _logFramework(e) {
    !e ||
      this.frameworks.includes(e) ||
      (this.frameworks.push(e),
      this.frameworks.sort(),
      (this.clientVersion = Ct(
        this.config.clientPlatform,
        this._getFrameworks(),
      )));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var e;
    const t = {
      "X-Client-Version": this.clientVersion,
    };
    this.app.options.appId &&
      (t[
        "X-Firebase-gmpid"
        /* HttpHeader.X_FIREBASE_GMPID */
      ] = this.app.options.appId);
    const r = await ((e = this.heartbeatServiceProvider.getImmediate({
      optional: !0,
    })) === null || e === void 0
      ? void 0
      : e.getHeartbeatsHeader());
    r &&
      (t[
        "X-Firebase-Client"
        /* HttpHeader.X_FIREBASE_CLIENT */
      ] = r);
    const s = await this._getAppCheckToken();
    return (
      s &&
        (t[
          "X-Firebase-AppCheck"
          /* HttpHeader.X_FIREBASE_APP_CHECK */
        ] = s),
      t
    );
  }
  async _getAppCheckToken() {
    var e;
    const t = await ((e = this.appCheckServiceProvider.getImmediate({
      optional: !0,
    })) === null || e === void 0
      ? void 0
      : e.getToken());
    return (
      t != null &&
        t.error &&
        Cr(`Error while retrieving App Check token: ${t.error}`),
      t == null ? void 0 : t.token
    );
  }
}
function j(n) {
  return ie(n);
}
class at {
  constructor(e) {
    (this.auth = e),
      (this.observer = null),
      (this.addObserver = Tn((t) => (this.observer = t)));
  }
  get next() {
    return (
      u(
        this.observer,
        this.auth,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      this.observer.next.bind(this.observer)
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function us() {
  var n, e;
  return (e =
    (n = document.getElementsByTagName("head")) === null || n === void 0
      ? void 0
      : n[0]) !== null && e !== void 0
    ? e
    : document;
}
function ls(n) {
  return new Promise((e, t) => {
    const r = document.createElement("script");
    r.setAttribute("src", n),
      (r.onload = e),
      (r.onerror = (s) => {
        const i = x(
          "internal-error",
          /* AuthErrorCode.INTERNAL_ERROR */
        );
        (i.customData = s), t(i);
      }),
      (r.type = "text/javascript"),
      (r.charset = "UTF-8"),
      us().appendChild(r);
  });
}
const hs = "https://www.google.com/recaptcha/enterprise.js?render=",
  fs = "recaptcha-enterprise",
  ps = "NO_RECAPTCHA";
class gs {
  /**
   *
   * @param authExtern - The corresponding Firebase {@link Auth} instance.
   *
   */
  constructor(e) {
    (this.type = fs), (this.auth = j(e));
  }
  /**
   * Executes the verification process.
   *
   * @returns A Promise for a token that can be used to assert the validity of a request.
   */
  async verify(e = "verify", t = !1) {
    async function r(i) {
      if (!t) {
        if (i.tenantId == null && i._agentRecaptchaConfig != null)
          return i._agentRecaptchaConfig.siteKey;
        if (
          i.tenantId != null &&
          i._tenantRecaptchaConfigs[i.tenantId] !== void 0
        )
          return i._tenantRecaptchaConfigs[i.tenantId].siteKey;
      }
      return new Promise(async (a, c) => {
        Vr(i, {
          clientType: "CLIENT_TYPE_WEB",
          version: "RECAPTCHA_ENTERPRISE",
          /* RecaptchaVersion.ENTERPRISE */
        })
          .then((o) => {
            if (o.recaptchaKey === void 0)
              c(new Error("recaptcha Enterprise site key undefined"));
            else {
              const d = new xr(o);
              return (
                i.tenantId == null
                  ? (i._agentRecaptchaConfig = d)
                  : (i._tenantRecaptchaConfigs[i.tenantId] = d),
                a(d.siteKey)
              );
            }
          })
          .catch((o) => {
            c(o);
          });
      });
    }
    function s(i, a, c) {
      const o = window.grecaptcha;
      nt(o)
        ? o.enterprise.ready(() => {
            o.enterprise
              .execute(i, { action: e })
              .then((d) => {
                a(d);
              })
              .catch(() => {
                a(ps);
              });
          })
        : c(Error("No reCAPTCHA enterprise script loaded."));
    }
    return new Promise((i, a) => {
      r(this.auth)
        .then((c) => {
          if (!t && nt(window.grecaptcha)) s(c, i, a);
          else {
            if (typeof window > "u") {
              a(new Error("RecaptchaVerifier is only supported in browser"));
              return;
            }
            ls(hs + c)
              .then(() => {
                s(c, i, a);
              })
              .catch((o) => {
                a(o);
              });
          }
        })
        .catch((c) => {
          a(c);
        });
    });
  }
}
async function ot(n, e, t, r = !1) {
  const s = new gs(n);
  let i;
  try {
    i = await s.verify(t);
  } catch {
    i = await s.verify(t, !0);
  }
  const a = Object.assign({}, e);
  return (
    r
      ? Object.assign(a, { captchaResp: i })
      : Object.assign(a, { captchaResponse: i }),
    Object.assign(a, {
      clientType: "CLIENT_TYPE_WEB",
      /* RecaptchaClientType.WEB */
    }),
    Object.assign(a, {
      recaptchaVersion: "RECAPTCHA_ENTERPRISE",
      /* RecaptchaVersion.ENTERPRISE */
    }),
    a
  );
}
async function Ce(n, e, t, r) {
  var s;
  if (
    !((s = n._getRecaptchaConfig()) === null || s === void 0) &&
    s.isProviderEnabled(
      "EMAIL_PASSWORD_PROVIDER",
      /* RecaptchaProvider.EMAIL_PASSWORD_PROVIDER */
    )
  ) {
    const i = await ot(
      n,
      e,
      t,
      t === "getOobCode",
      /* RecaptchaActionName.GET_OOB_CODE */
    );
    return r(n, i);
  } else
    return r(n, e).catch(async (i) => {
      if (i.code === "auth/missing-recaptcha-token") {
        console.log(
          `${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`,
        );
        const a = await ot(
          n,
          e,
          t,
          t === "getOobCode",
          /* RecaptchaActionName.GET_OOB_CODE */
        );
        return r(n, a);
      } else return Promise.reject(i);
    });
}
function ms(n, e) {
  const t = (e == null ? void 0 : e.persistence) || [],
    r = (Array.isArray(t) ? t : [t]).map(S);
  e != null && e.errorMap && n._updateErrorMap(e.errorMap),
    n._initializeWithPersistence(
      r,
      e == null ? void 0 : e.popupRedirectResolver,
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fe {
  /** @internal */
  constructor(e, t) {
    (this.providerId = e), (this.signInMethod = t);
  }
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns a JSON-serializable representation of this object.
   */
  toJSON() {
    return y("not implemented");
  }
  /** @internal */
  _getIdTokenResponse(e) {
    return y("not implemented");
  }
  /** @internal */
  _linkToIdToken(e, t) {
    return y("not implemented");
  }
  /** @internal */
  _getReauthenticationResolver(e) {
    return y("not implemented");
  }
}
async function _s(n, e) {
  return C(n, "POST", "/v1/accounts:signUp", e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ys(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithPassword", R(n, e));
}
async function Is(n, e) {
  return C(n, "POST", "/v1/accounts:sendOobCode", R(n, e));
}
async function vs(n, e) {
  return Is(n, e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Es(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithEmailLink", R(n, e));
}
async function bs(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithEmailLink", R(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class te extends Fe {
  /** @internal */
  constructor(e, t, r, s = null) {
    super("password", r),
      (this._email = e),
      (this._password = t),
      (this._tenantId = s);
  }
  /** @internal */
  static _fromEmailAndPassword(e, t) {
    return new te(
      e,
      t,
      "password",
      /* SignInMethod.EMAIL_PASSWORD */
    );
  }
  /** @internal */
  static _fromEmailAndCode(e, t, r = null) {
    return new te(e, t, "emailLink", r);
  }
  /** {@inheritdoc AuthCredential.toJSON} */
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
  /**
   * Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
   *
   * @param json - Either `object` or the stringified representation of the object. When string is
   * provided, `JSON.parse` would be called first.
   *
   * @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
   */
  static fromJSON(e) {
    const t = typeof e == "string" ? JSON.parse(e) : e;
    if (t != null && t.email && t != null && t.password) {
      if (t.signInMethod === "password")
        return this._fromEmailAndPassword(t.email, t.password);
      if (t.signInMethod === "emailLink")
        return this._fromEmailAndCode(t.email, t.password, t.tenantId);
    }
    return null;
  }
  /** @internal */
  async _getIdTokenResponse(e) {
    switch (this.signInMethod) {
      case "password":
        const t = {
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
          /* RecaptchaClientType.WEB */
        };
        return Ce(e, t, "signInWithPassword", ys);
      case "emailLink":
        return Es(e, {
          email: this._email,
          oobCode: this._password,
        });
      default:
        I(
          e,
          "internal-error",
          /* AuthErrorCode.INTERNAL_ERROR */
        );
    }
  }
  /** @internal */
  async _linkToIdToken(e, t) {
    switch (this.signInMethod) {
      case "password":
        const r = {
          idToken: t,
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
          /* RecaptchaClientType.WEB */
        };
        return Ce(e, r, "signUpPassword", _s);
      case "emailLink":
        return bs(e, {
          idToken: t,
          email: this._email,
          oobCode: this._password,
        });
      default:
        I(
          e,
          "internal-error",
          /* AuthErrorCode.INTERNAL_ERROR */
        );
    }
  }
  /** @internal */
  _getReauthenticationResolver(e) {
    return this._getIdTokenResponse(e);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function H(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithIdp", R(n, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ws = "http://localhost";
class B extends Fe {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  /** @internal */
  static _fromParams(e) {
    const t = new B(e.providerId, e.signInMethod);
    return (
      e.idToken || e.accessToken
        ? (e.idToken && (t.idToken = e.idToken),
          e.accessToken && (t.accessToken = e.accessToken),
          e.nonce && !e.pendingToken && (t.nonce = e.nonce),
          e.pendingToken && (t.pendingToken = e.pendingToken))
        : e.oauthToken && e.oauthTokenSecret
          ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
          : I(
              "argument-error",
              /* AuthErrorCode.ARGUMENT_ERROR */
            ),
      t
    );
  }
  /** {@inheritdoc AuthCredential.toJSON}  */
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod,
    };
  }
  /**
   * Static method to deserialize a JSON representation of an object into an
   * {@link  AuthCredential}.
   *
   * @param json - Input can be either Object or the stringified representation of the object.
   * When string is provided, JSON.parse would be called first.
   *
   * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
   */
  static fromJSON(e) {
    const t = typeof e == "string" ? JSON.parse(e) : e,
      { providerId: r, signInMethod: s } = t,
      i = Le(t, ["providerId", "signInMethod"]);
    if (!r || !s) return null;
    const a = new B(r, s);
    return (
      (a.idToken = i.idToken || void 0),
      (a.accessToken = i.accessToken || void 0),
      (a.secret = i.secret),
      (a.nonce = i.nonce),
      (a.pendingToken = i.pendingToken || null),
      a
    );
  }
  /** @internal */
  _getIdTokenResponse(e) {
    const t = this.buildRequest();
    return H(e, t);
  }
  /** @internal */
  _linkToIdToken(e, t) {
    const r = this.buildRequest();
    return (r.idToken = t), H(e, r);
  }
  /** @internal */
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), H(e, t);
  }
  buildRequest() {
    const e = {
      requestUri: ws,
      returnSecureToken: !0,
    };
    if (this.pendingToken) e.pendingToken = this.pendingToken;
    else {
      const t = {};
      this.idToken && (t.id_token = this.idToken),
        this.accessToken && (t.access_token = this.accessToken),
        this.secret && (t.oauth_token_secret = this.secret),
        (t.providerId = this.providerId),
        this.nonce && !this.pendingToken && (t.nonce = this.nonce),
        (e.postBody = Oe(t));
    }
    return e;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ts(n) {
  switch (n) {
    case "recoverEmail":
      return "RECOVER_EMAIL";
    case "resetPassword":
      return "PASSWORD_RESET";
    case "signIn":
      return "EMAIL_SIGNIN";
    case "verifyEmail":
      return "VERIFY_EMAIL";
    case "verifyAndChangeEmail":
      return "VERIFY_AND_CHANGE_EMAIL";
    case "revertSecondFactorAddition":
      return "REVERT_SECOND_FACTOR_ADDITION";
    default:
      return null;
  }
}
function Ss(n) {
  const e = G(z(n)).link,
    t = e ? G(z(e)).deep_link_id : null,
    r = G(z(n)).deep_link_id;
  return (r ? G(z(r)).link : null) || r || t || e || n;
}
class Be {
  /**
   * @param actionLink - The link from which to extract the URL.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @internal
   */
  constructor(e) {
    var t, r, s, i, a, c;
    const o = G(z(e)),
      d = (t = o.apiKey) !== null && t !== void 0 ? t : null,
      h = (r = o.oobCode) !== null && r !== void 0 ? r : null,
      p = Ts((s = o.mode) !== null && s !== void 0 ? s : null);
    u(
      d && h && p,
      "argument-error",
      /* AuthErrorCode.ARGUMENT_ERROR */
    ),
      (this.apiKey = d),
      (this.operation = p),
      (this.code = h),
      (this.continueUrl =
        (i = o.continueUrl) !== null && i !== void 0 ? i : null),
      (this.languageCode =
        (a = o.languageCode) !== null && a !== void 0 ? a : null),
      (this.tenantId = (c = o.tenantId) !== null && c !== void 0 ? c : null);
  }
  /**
   * Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
   * otherwise returns null.
   *
   * @param link  - The email action link string.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @public
   */
  static parseLink(e) {
    const t = Ss(e);
    try {
      return new Be(t);
    } catch {
      return null;
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class K {
  constructor() {
    this.providerId = K.PROVIDER_ID;
  }
  /**
   * Initialize an {@link AuthCredential} using an email and password.
   *
   * @example
   * ```javascript
   * const authCredential = EmailAuthProvider.credential(email, password);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * ```javascript
   * const userCredential = await signInWithEmailAndPassword(auth, email, password);
   * ```
   *
   * @param email - Email address.
   * @param password - User account password.
   * @returns The auth provider credential.
   */
  static credential(e, t) {
    return te._fromEmailAndPassword(e, t);
  }
  /**
   * Initialize an {@link AuthCredential} using an email and an email link after a sign in with
   * email link operation.
   *
   * @example
   * ```javascript
   * const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * ```javascript
   * await sendSignInLinkToEmail(auth, email);
   * // Obtain emailLink from user.
   * const userCredential = await signInWithEmailLink(auth, email, emailLink);
   * ```
   *
   * @param auth - The {@link Auth} instance used to verify the link.
   * @param email - Email address.
   * @param emailLink - Sign-in email link.
   * @returns - The auth provider credential.
   */
  static credentialWithLink(e, t) {
    const r = Be.parseLink(t);
    return (
      u(
        r,
        "argument-error",
        /* AuthErrorCode.ARGUMENT_ERROR */
      ),
      te._fromEmailAndCode(e, r.code, r.tenantId)
    );
  }
}
K.PROVIDER_ID = "password";
K.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
K.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ot {
  /**
   * Constructor for generic OAuth providers.
   *
   * @param providerId - Provider for which credentials should be generated.
   */
  constructor(e) {
    (this.providerId = e),
      (this.defaultLanguageCode = null),
      (this.customParameters = {});
  }
  /**
   * Set the language gode.
   *
   * @param languageCode - language code
   */
  setDefaultLanguage(e) {
    this.defaultLanguageCode = e;
  }
  /**
   * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
   * operations.
   *
   * @remarks
   * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
   * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
   *
   * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
   */
  setCustomParameters(e) {
    return (this.customParameters = e), this;
  }
  /**
   * Retrieve the current list of {@link CustomParameters}.
   */
  getCustomParameters() {
    return this.customParameters;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pe extends Ot {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  /**
   * Add an OAuth scope to the credential.
   *
   * @param scope - Provider OAuth scope to add.
   */
  addScope(e) {
    return this.scopes.includes(e) || this.scopes.push(e), this;
  }
  /**
   * Retrieve the current list of OAuth scopes.
   */
  getScopes() {
    return [...this.scopes];
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class E extends pe {
  constructor() {
    super(
      "facebook.com",
      /* ProviderId.FACEBOOK */
    );
  }
  /**
   * Creates a credential for Facebook.
   *
   * @example
   * ```javascript
   * // `event` from the Facebook auth.authResponseChange callback.
   * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param accessToken - Facebook access token.
   */
  static credential(e) {
    return B._fromParams({
      providerId: E.PROVIDER_ID,
      signInMethod: E.FACEBOOK_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(e) {
    return E.credentialFromTaggedObject(e);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(e) {
    return E.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return E.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
E.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
E.PROVIDER_ID = "facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class b extends pe {
  constructor() {
    super(
      "google.com",
      /* ProviderId.GOOGLE */
    ),
      this.addScope("profile");
  }
  /**
   * Creates a credential for Google. At least one of ID token and access token is required.
   *
   * @example
   * ```javascript
   * // \`googleUser\` from the onsuccess Google Sign In callback.
   * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param idToken - Google ID token.
   * @param accessToken - Google access token.
   */
  static credential(e, t) {
    return B._fromParams({
      providerId: b.PROVIDER_ID,
      signInMethod: b.GOOGLE_SIGN_IN_METHOD,
      idToken: e,
      accessToken: t,
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(e) {
    return b.credentialFromTaggedObject(e);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(e) {
    return b.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthIdToken: t, oauthAccessToken: r } = e;
    if (!t && !r) return null;
    try {
      return b.credential(t, r);
    } catch {
      return null;
    }
  }
}
b.GOOGLE_SIGN_IN_METHOD = "google.com";
b.PROVIDER_ID = "google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class w extends pe {
  constructor() {
    super(
      "github.com",
      /* ProviderId.GITHUB */
    );
  }
  /**
   * Creates a credential for Github.
   *
   * @param accessToken - Github access token.
   */
  static credential(e) {
    return B._fromParams({
      providerId: w.PROVIDER_ID,
      signInMethod: w.GITHUB_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(e) {
    return w.credentialFromTaggedObject(e);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(e) {
    return w.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return w.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
w.GITHUB_SIGN_IN_METHOD = "github.com";
w.PROVIDER_ID = "github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class T extends pe {
  constructor() {
    super(
      "twitter.com",
      /* ProviderId.TWITTER */
    );
  }
  /**
   * Creates a credential for Twitter.
   *
   * @param token - Twitter access token.
   * @param secret - Twitter secret.
   */
  static credential(e, t) {
    return B._fromParams({
      providerId: T.PROVIDER_ID,
      signInMethod: T.TWITTER_SIGN_IN_METHOD,
      oauthToken: e,
      oauthTokenSecret: t,
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromResult(e) {
    return T.credentialFromTaggedObject(e);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */
  static credentialFromError(e) {
    return T.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthAccessToken: t, oauthTokenSecret: r } = e;
    if (!t || !r) return null;
    try {
      return T.credential(t, r);
    } catch {
      return null;
    }
  }
}
T.TWITTER_SIGN_IN_METHOD = "twitter.com";
T.PROVIDER_ID = "twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $ {
  constructor(e) {
    (this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType);
  }
  static async _fromIdTokenResponse(e, t, r, s = !1) {
    const i = await L._fromIdTokenResponse(e, r, s),
      a = ct(r);
    return new $({
      user: i,
      providerId: a,
      _tokenResponse: r,
      operationType: t,
    });
  }
  static async _forOperation(e, t, r) {
    await e._updateTokensIfNecessary(
      r,
      /* reload */
      !0,
    );
    const s = ct(r);
    return new $({
      user: e,
      providerId: s,
      _tokenResponse: r,
      operationType: t,
    });
  }
}
function ct(n) {
  return n.providerId ? n.providerId : "phoneNumber" in n ? "phone" : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class he extends k {
  constructor(e, t, r, s) {
    var i;
    super(t.code, t.message),
      (this.operationType = r),
      (this.user = s),
      Object.setPrototypeOf(this, he.prototype),
      (this.customData = {
        appName: e.name,
        tenantId: (i = e.tenantId) !== null && i !== void 0 ? i : void 0,
        _serverResponse: t.customData._serverResponse,
        operationType: r,
      });
  }
  static _fromErrorAndOperation(e, t, r, s) {
    return new he(e, t, r, s);
  }
}
function Pt(n, e, t, r) {
  return (
    e === "reauthenticate"
      ? t._getReauthenticationResolver(n)
      : t._getIdTokenResponse(n)
  ).catch((i) => {
    throw i.code === "auth/multi-factor-auth-required"
      ? he._fromErrorAndOperation(n, i, e, r)
      : i;
  });
}
async function As(n, e, t = !1) {
  const r = await Z(n, e._linkToIdToken(n.auth, await n.getIdToken()), t);
  return $._forOperation(n, "link", r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ks(n, e, t = !1) {
  const { auth: r } = n,
    s = "reauthenticate";
  try {
    const i = await Z(n, Pt(r, s, e, n), t);
    u(
      i.idToken,
      r,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    );
    const a = Ue(i.idToken);
    u(
      a,
      r,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    );
    const { sub: c } = a;
    return (
      u(
        n.uid === c,
        r,
        "user-mismatch",
        /* AuthErrorCode.USER_MISMATCH */
      ),
      $._forOperation(n, s, i)
    );
  } catch (i) {
    throw (
      ((i == null ? void 0 : i.code) === "auth/user-not-found" &&
        I(
          r,
          "user-mismatch",
          /* AuthErrorCode.USER_MISMATCH */
        ),
      i)
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Nt(n, e, t = !1) {
  const r = "signIn",
    s = await Pt(n, r, e),
    i = await $._fromIdTokenResponse(n, r, s);
  return t || (await n._updateCurrentUser(i.user)), i;
}
async function Rs(n, e) {
  return Nt(j(n), e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Cs(n, e, t) {
  var r;
  u(
    ((r = t.url) === null || r === void 0 ? void 0 : r.length) > 0,
    n,
    "invalid-continue-uri",
    /* AuthErrorCode.INVALID_CONTINUE_URI */
  ),
    u(
      typeof t.dynamicLinkDomain > "u" || t.dynamicLinkDomain.length > 0,
      n,
      "invalid-dynamic-link-domain",
      /* AuthErrorCode.INVALID_DYNAMIC_LINK_DOMAIN */
    ),
    (e.continueUrl = t.url),
    (e.dynamicLinkDomain = t.dynamicLinkDomain),
    (e.canHandleCodeInApp = t.handleCodeInApp),
    t.iOS &&
      (u(
        t.iOS.bundleId.length > 0,
        n,
        "missing-ios-bundle-id",
        /* AuthErrorCode.MISSING_IOS_BUNDLE_ID */
      ),
      (e.iOSBundleId = t.iOS.bundleId)),
    t.android &&
      (u(
        t.android.packageName.length > 0,
        n,
        "missing-android-pkg-name",
        /* AuthErrorCode.MISSING_ANDROID_PACKAGE_NAME */
      ),
      (e.androidInstallApp = t.android.installApp),
      (e.androidMinimumVersionCode = t.android.minimumVersion),
      (e.androidPackageName = t.android.packageName));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Os(n) {
  const e = j(n);
  e._getPasswordPolicyInternal() && (await e._updatePasswordPolicy());
}
function Ps(n, e, t) {
  return Rs(ie(n), K.credential(e, t)).catch(async (r) => {
    throw (r.code === "auth/password-does-not-meet-requirements" && Os(n), r);
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Ns(n, e, t) {
  const r = j(n),
    s = {
      requestType: "EMAIL_SIGNIN",
      email: e,
      clientType: "CLIENT_TYPE_WEB",
      /* RecaptchaClientType.WEB */
    };
  function i(a, c) {
    u(
      c.handleCodeInApp,
      r,
      "argument-error",
      /* AuthErrorCode.ARGUMENT_ERROR */
    ),
      c && Cs(r, a, c);
  }
  i(s, t), await Ce(r, s, "getOobCode", vs);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ds(n = "", e = 10) {
  let t = "";
  for (let r = 0; r < e; r++) t += Math.floor(Math.random() * 10);
  return n + t;
}
new ae(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ls(n, e) {
  return e
    ? S(e)
    : (u(
        n._popupRedirectResolver,
        n,
        "argument-error",
        /* AuthErrorCode.ARGUMENT_ERROR */
      ),
      n._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xe extends Fe {
  constructor(e) {
    super(
      "custom",
      "custom",
      /* ProviderId.CUSTOM */
    ),
      (this.params = e);
  }
  _getIdTokenResponse(e) {
    return H(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return H(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return H(e, this._buildIdpRequest());
  }
  _buildIdpRequest(e) {
    const t = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return e && (t.idToken = e), t;
  }
}
function Ms(n) {
  return Nt(n.auth, new xe(n), n.bypassAuthState);
}
function Us(n) {
  const { auth: e, user: t } = n;
  return (
    u(
      t,
      e,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
    ks(t, new xe(n), n.bypassAuthState)
  );
}
async function Fs(n) {
  const { auth: e, user: t } = n;
  return (
    u(
      t,
      e,
      "internal-error",
      /* AuthErrorCode.INTERNAL_ERROR */
    ),
    As(t, new xe(n), n.bypassAuthState)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bs {
  constructor(e, t, r, s, i = !1) {
    (this.auth = e),
      (this.resolver = r),
      (this.user = s),
      (this.bypassAuthState = i),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(t) ? t : [t]);
  }
  execute() {
    return new Promise(async (e, t) => {
      this.pendingPromise = { resolve: e, reject: t };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (r) {
        this.reject(r);
      }
    });
  }
  async onAuthEvent(e) {
    const {
      urlResponse: t,
      sessionId: r,
      postBody: s,
      tenantId: i,
      error: a,
      type: c,
    } = e;
    if (a) {
      this.reject(a);
      return;
    }
    const o = {
      auth: this.auth,
      requestUri: t,
      sessionId: r,
      tenantId: i || void 0,
      postBody: s || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState,
    };
    try {
      this.resolve(await this.getIdpTask(c)(o));
    } catch (d) {
      this.reject(d);
    }
  }
  onError(e) {
    this.reject(e);
  }
  getIdpTask(e) {
    switch (e) {
      case "signInViaPopup":
      case "signInViaRedirect":
        return Ms;
      case "linkViaPopup":
      case "linkViaRedirect":
        return Fs;
      case "reauthViaPopup":
      case "reauthViaRedirect":
        return Us;
      default:
        I(
          this.auth,
          "internal-error",
          /* AuthErrorCode.INTERNAL_ERROR */
        );
    }
  }
  resolve(e) {
    F(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.resolve(e),
      this.unregisterAndCleanUp();
  }
  reject(e) {
    F(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.reject(e),
      this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this),
      (this.pendingPromise = null),
      this.cleanUp();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xs = new ae(2e3, 1e4);
async function N(n, e, t) {
  const r = j(n);
  Or(n, e, Ot);
  const s = Ls(r, t);
  return new D(r, "signInViaPopup", e, s).executeNotNull();
}
class D extends Bs {
  constructor(e, t, r, s, i) {
    super(e, t, s, i),
      (this.provider = r),
      (this.authWindow = null),
      (this.pollId = null),
      D.currentPopupAction && D.currentPopupAction.cancel(),
      (D.currentPopupAction = this);
  }
  async executeNotNull() {
    const e = await this.execute();
    return (
      u(
        e,
        this.auth,
        "internal-error",
        /* AuthErrorCode.INTERNAL_ERROR */
      ),
      e
    );
  }
  async onExecution() {
    F(this.filter.length === 1, "Popup operations only handle one event");
    const e = Ds();
    (this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      // There's always one, see constructor
      e,
    )),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch((t) => {
        this.reject(t);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (t) => {
        t ||
          this.reject(
            x(
              this.auth,
              "web-storage-unsupported",
              /* AuthErrorCode.WEB_STORAGE_UNSUPPORTED */
            ),
          );
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var e;
    return (
      ((e = this.authWindow) === null || e === void 0
        ? void 0
        : e.associatedEvent) || null
    );
  }
  cancel() {
    this.reject(
      x(
        this.auth,
        "cancelled-popup-request",
        /* AuthErrorCode.EXPIRED_POPUP_REQUEST */
      ),
    );
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (D.currentPopupAction = null);
  }
  pollUserCancellation() {
    const e = () => {
      var t, r;
      if (
        !(
          (r =
            (t = this.authWindow) === null || t === void 0
              ? void 0
              : t.window) === null || r === void 0
        ) &&
        r.closed
      ) {
        this.pollId = window.setTimeout(
          () => {
            (this.pollId = null),
              this.reject(
                x(
                  this.auth,
                  "popup-closed-by-user",
                  /* AuthErrorCode.POPUP_CLOSED_BY_USER */
                ),
              );
          },
          8e3,
          /* _Timeout.AUTH_EVENT */
        );
        return;
      }
      this.pollId = window.setTimeout(e, xs.get());
    };
    e();
  }
}
D.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new ae(3e4, 6e4);
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new ae(5e3, 15e3);
var dt = "@firebase/auth",
  ut = "1.5.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vs {
  constructor(e) {
    (this.auth = e), (this.internalListeners = /* @__PURE__ */ new Map());
  }
  getUid() {
    var e;
    return (
      this.assertAuthConfigured(),
      ((e = this.auth.currentUser) === null || e === void 0 ? void 0 : e.uid) ||
        null
    );
  }
  async getToken(e) {
    return (
      this.assertAuthConfigured(),
      await this.auth._initializationPromise,
      this.auth.currentUser
        ? { accessToken: await this.auth.currentUser.getIdToken(e) }
        : null
    );
  }
  addAuthTokenListener(e) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
    const t = this.auth.onIdTokenChanged((r) => {
      e((r == null ? void 0 : r.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(e, t), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(e) {
    this.assertAuthConfigured();
    const t = this.internalListeners.get(e);
    t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    u(
      this.auth._initializationPromise,
      "dependent-sdk-initialized-before-auth",
      /* AuthErrorCode.DEPENDENT_SDK_INIT_BEFORE_AUTH */
    );
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0
      ? this.auth._startProactiveRefresh()
      : this.auth._stopProactiveRefresh();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Hs(n) {
  switch (n) {
    case "Node":
      return "node";
    case "ReactNative":
      return "rn";
    case "Worker":
      return "webworker";
    case "Cordova":
      return "cordova";
    default:
      return;
  }
}
function $s(n) {
  X(
    new Y(
      "auth",
      (e, { options: t }) => {
        const r = e.getProvider("app").getImmediate(),
          s = e.getProvider("heartbeat"),
          i = e.getProvider("app-check-internal"),
          { apiKey: a, authDomain: c } = r.options;
        u(a && !a.includes(":"), "invalid-api-key", { appName: r.name });
        const o = {
            apiKey: a,
            authDomain: c,
            clientPlatform: n,
            apiHost: "identitytoolkit.googleapis.com",
            tokenApiHost: "securetoken.googleapis.com",
            apiScheme: "https",
            sdkClientVersion: Ct(n),
          },
          d = new ds(r, s, i, o);
        return ms(d, t), d;
      },
      "PUBLIC",
      /* ComponentType.PUBLIC */
    )
      .setInstantiationMode(
        "EXPLICIT",
        /* InstantiationMode.EXPLICIT */
      )
      .setInstanceCreatedCallback((e, t, r) => {
        e.getProvider(
          "auth-internal",
          /* _ComponentName.AUTH_INTERNAL */
        ).initialize();
      }),
  ),
    X(
      new Y(
        "auth-internal",
        (e) => {
          const t = j(
            e
              .getProvider(
                "auth",
                /* _ComponentName.AUTH */
              )
              .getImmediate(),
          );
          return ((r) => new Vs(r))(t);
        },
        "PRIVATE",
        /* ComponentType.PRIVATE */
      ).setInstantiationMode(
        "EXPLICIT",
        /* InstantiationMode.EXPLICIT */
      ),
    ),
    q(dt, ut, Hs(n)),
    q(dt, ut, "esm2017");
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ws = 5 * 60;
gn("authIdTokenMaxAge");
$s(
  "Browser",
  /* ClientPlatform.BROWSER */
);
const fi = (n) => {
    const e = W(n),
      [t, r] = l("ready");
    return (
      m(
        () => (
          r(e ? (e.isAnonymous ? "ready" : "authenticated") : "ready"),
          () => r("ready")
        ),
        [e],
      ),
      {
        state: t,
        dispatch: async (i) => {
          r("loading");
          const { type: a } = i;
          switch (a) {
            case "classic": {
              const { email: c, password: o } = i,
                d = await Ps(n, c, o);
              return r("authenticated"), d;
            }
            case "link": {
              const { email: c, actionCodeSetting: o } = i;
              await Ns(n, c, o), r("awaiting");
              return;
            }
            case "google": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), r("authenticated"), o;
            }
            case "facebook": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), r("authenticated"), o;
            }
            case "apple": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), o;
            }
            case "twitter": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), o;
            }
            case "github": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), o;
            }
            case "microsoft": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), o;
            }
            case "yahoo": {
              const { provider: c } = i,
                o = await N(n, c);
              return r("authenticated"), o;
            }
          }
        },
      }
    );
  },
  pi = (n) => {
    const e = W(n),
      [t, r] = l("ready");
    return (
      m(() => {
        if (!e) {
          r("anonymous");
          return;
        }
      }, [e]),
      {
        state: t,
        dispatch:
          t === "ready"
            ? async (i) => {
                r("loading"),
                  await Wt(
                    e,
                    // guaranteed user not null on ready
                    i,
                  ),
                  r("done");
              }
            : async () => {},
      }
    );
  },
  gi = (n, { name: e, httpsCallableOptions: t }) => {
    const [r, s] = l("ready");
    return {
      state: r,
      invoke: async (a = {}) => {
        s("loading");
        const c = jt(n, e, t).call(a);
        return s("done"), c;
      },
    };
  },
  mi = (n) => {
    const [e, t] = l("ready");
    return {
      state: e,
      dispatch: async (s, i) => {
        t("loading");
        const a = await Kt(n, s, i);
        return t("done"), a;
      },
    };
  },
  _i = (n) => {
    const [e, t] = l("ready");
    return {
      state: e,
      dispatch: async (s, i) => {
        const a = Gt(n, s, i);
        a.on("state_changed", (o) => {
          t([o.bytesTransferred, o.totalBytes]);
        });
        const c = await a;
        return t("done"), c;
      },
    };
  },
  js = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l(void 0);
    return {
      state: e,
      dispatch: async () => {
        t("loading");
        const a = await zt(n);
        return t("done"), s(r), a;
      },
      link: r,
    };
  },
  yi = ({
    reference: n,
    onLoading: e = () => /* @__PURE__ */ g(M, {}),
    onDone: t,
  }) => {
    const { link: r, state: s, dispatch: i } = js(n);
    return (
      m(() => {
        i();
      }, [i]),
      s === "done" ? t(r) : e()
    );
  },
  Ii = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l(void 0);
    return {
      blob: r,
      state: e,
      dispatch: async (a) => {
        t("loading");
        const c = await qt(n, a);
        return t("done"), s(c), c;
      },
    };
  },
  vi = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l(void 0);
    return {
      bytes: r,
      state: e,
      dispatch: async (a) => {
        t("loading");
        const c = await Jt(n, a);
        return t("done"), s(c), c;
      },
    };
  },
  Ei = (n) => {
    const [e, t] = l("ready");
    return {
      state: e,
      dispatch: async () => {
        t("loading"), await Yt(n), t("done");
      },
    };
  },
  Ks = (n) => {
    const [e, t] = l("ready"),
      [r, s] = l(void 0);
    return {
      metadata: r,
      state: e,
      dispatch: async () => {
        t("loading");
        const a = await Xt(n);
        return t("done"), s(a), a;
      },
    };
  },
  bi = ({
    reference: n,
    onLoading: e = () => /* @__PURE__ */ g(M, {}),
    onDone: t,
  }) => {
    const { metadata: r, state: s, dispatch: i } = Ks(n);
    return (
      m(() => {
        i();
      }, [i]),
      s === "done" ? t(r) : e()
    );
  };
export {
  hi as AuthorizationZone,
  Zt as FirebaseAppContext,
  tn as FirebaseAuthContext,
  ai as FirebaseAuthProvider,
  nn as FirebaseFunctionsContext,
  oi as FirebaseFunctionsProvider,
  si as FirebaseProvider,
  rn as FirebaseStorageContext,
  ci as FirebaseStorageProvider,
  en as FirestoreContext,
  ri as FirestoreDocument,
  ii as FirestoreProvider,
  di as SignOut,
  yi as StorageDownloadLink,
  bi as StorageMetadata,
  an as Validators,
  ei as useAddDocument,
  gi as useCallFunction,
  Zs as useCollection,
  ni as useDeleteDocument,
  Ei as useDeleteFile,
  li as useDeleteUser,
  Qt as useDocument,
  Ii as useDownloadBlob,
  vi as useDownloadBytes,
  js as useDownloadLink,
  Ks as useFileMetadata,
  pi as useSendEmailVerification,
  ti as useSetDocument,
  fi as useSignIn,
  sn as useSignOut,
  ui as useSignUp,
  mi as useUploadFile,
  _i as useUploadFileResumable,
  W as useUser,
};
//# sourceMappingURL=index.es.js.map

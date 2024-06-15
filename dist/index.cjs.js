"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const re = require("firebase/app"),
  A = require("firebase/firestore"),
  d = require("react"),
  p = require("react/jsx-runtime"),
  Y = require("firebase/auth"),
  jt = require("firebase/functions"),
  x = require("firebase/storage"),
  Wt = (
    n,
    { listen: e, listenToMetadataChanges: t } = {
      listen: !1,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [r, s] = d.useState(!0),
      [i, a] = d.useState(),
      [c, o] = d.useState();
    return (
      d.useEffect(() => {
        if ((s(!0), e))
          return A.onSnapshot(
            n,
            { includeMetadataChanges: t },
            (h) => {
              a(h), s(!1);
            },
            (h) => o(h),
            () => s(!1),
          );
        A.getDocs(n)
          .then((u) => {
            a(u), s(!1);
          })
          .catch((u) => {
            if (u instanceof re.FirebaseError) o(u), s(!1);
            else throw (s(!1), u);
          })
          .finally(() => s(!1));
      }, [n, e, t]),
      { loading: r, snapshot: i, error: c }
    );
  },
  dt = (
    n,
    { listen: e, listenToMetadataChanges: t } = {
      listen: !0,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [r, s] = d.useState(!0),
      [i, a] = d.useState(),
      [c, o] = d.useState();
    return (
      d.useEffect(() => {
        if ((s(!0), e))
          return A.onSnapshot(
            n,
            { includeMetadataChanges: t },
            (h) => {
              a(h), s(!1);
            },
            (h) => o(h),
            () => s(!1),
          );
        A.getDoc(n)
          .then((u) => {
            a(u), s(!1);
          })
          .catch((u) => {
            if (u instanceof re.FirebaseError) o(u), s(!1);
            else throw (s(!1), u);
          })
          .finally(() => s(!1));
      }, [n, e, t]),
      { loading: r, snapshot: i, error: c }
    );
  },
  Kt = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState(),
      [i, a] = d.useState();
    return {
      state: e,
      dispatch: async (o) => {
        t("loading");
        try {
          const u = await A.addDoc(n, o);
          return s(u), t("done"), u;
        } catch (u) {
          if (u instanceof re.FirebaseError) {
            a(u), t("ready");
            return;
          } else throw (t("ready"), u);
        }
      },
      reference: r,
      error: i,
    };
  },
  Gt = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState();
    return {
      state: e,
      dispatch: async (a, c) => {
        t("loading");
        try {
          await (c ? A.setDoc(n, a, c) : A.setDoc(n, a)), t("done");
        } catch (o) {
          if (o instanceof re.FirebaseError) t("ready"), s(o);
          else throw (t("loading"), o);
          return;
        }
        t("done");
      },
      error: r,
    };
  },
  qt = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState();
    return {
      state: e,
      dispatch: async () => {
        t("loading");
        try {
          await A.deleteDoc(n), t("done");
        } catch (a) {
          if (a instanceof re.FirebaseError) t("ready"), s(a);
          else throw (t("ready"), a);
        }
      },
      error: r,
    };
  },
  zt = ({
    reference: n,
    onLoading: e = () => p.jsx(p.Fragment, {}),
    onError: t = (i) => p.jsx(p.Fragment, {}),
    onDone: r,
    listen: s = !1,
  }) => {
    const { loading: i, snapshot: a, error: c } = dt(n, { listen: s });
    return i ? e() : c ? t(c) : r(a);
  },
  lt = d.createContext(void 0),
  Jt = ({ app: n, children: e }) =>
    p.jsx(lt.Provider, { value: n, children: e }),
  ht = d.createContext(void 0),
  Yt = ({ firestore: n, children: e }) =>
    p.jsx(ht.Provider, { value: n, children: e }),
  ft = d.createContext(void 0),
  Xt = ({ auth: n, children: e }) =>
    p.jsx(ft.Provider, { value: n, children: e }),
  pt = d.createContext(void 0),
  Qt = ({ functions: n, children: e }) =>
    p.jsx(pt.Provider, { value: n, children: e }),
  gt = d.createContext(void 0),
  Zt = ({ storage: n, children: e }) =>
    p.jsx(gt.Provider, { value: n, children: e }),
  B = (
    n,
    { onError: e, onChange: t } = { onError: () => {}, onChange: () => {} },
  ) => {
    const [r, s] = d.useState(n.currentUser);
    return (
      d.useEffect(() => Y.onAuthStateChanged(n, (a) => s(a), e, t), [n, e, t]),
      r
    );
  },
  mt = (
    n,
    { onError: e, onlyRealAnon: t } = { onError: () => {}, onlyRealAnon: !1 },
  ) => {
    const [r, s] = d.useState("ready"),
      i = B(n, { onError: e });
    return (
      d.useEffect(() => {
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
  en = ({
    auth: n,
    onlyRealAnon: e = !1,
    onReady: t,
    onLoading: r,
    onAnonymous: s,
  }) => {
    const { state: i, dispatch: a } = mt(n, { onlyRealAnon: e });
    switch (i) {
      case "ready":
        return t ? t(a) : p.jsx("button", { onClick: a, children: "Sign Out" });
      case "loading":
        return r ? r() : p.jsx(p.Fragment, {});
      case "anonymous":
        return s ? s() : p.jsx(p.Fragment, {});
    }
  },
  tn = (n) => {
    const e = B(n),
      [t, r] = d.useState("ready");
    return (
      d.useEffect(() => {
        r(e ? (e.isAnonymous ? "ready" : "authenticated") : "ready");
      }, [e]),
      {
        state: t,
        dispatch:
          t === "ready"
            ? async (i, a) => {
                r("loading");
                const c = await Y.createUserWithEmailAndPassword(n, i, a);
                return r("authenticated"), c;
              }
            : async () => {},
      }
    );
  },
  nn = (n, { includeFirebaseAnon: e } = { includeFirebaseAnon: !1 }) => {
    const t = B(n),
      [r, s] = d.useState("ready");
    return (
      d.useEffect(() => {
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
                t &&
                  (s("loading"),
                  await Y.deleteUser(t),
                  await Y.signOut(n),
                  s("anonymous"));
              }
            : async () => {},
      }
    );
  },
  rn = ({
    auth: n,
    validator: e = _t.isAuthenticated(),
    onSuccess: t,
    onFailure: r = () => p.jsx(p.Fragment, {}),
  }) => {
    const s = B(n),
      [i, a] = d.useState(!1);
    return (
      d.useEffect(() => {
        const c = e(s);
        c instanceof Promise ? c.then(a) : a(c);
      }, [s, e]),
      i ? t(s) : r(s)
    );
  },
  _t = {
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
 *//**
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
 */ const yt = function (n) {
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
  sn = function (n) {
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
  It = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
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
          u = o ? n[s + 2] : 0,
          h = i >> 2,
          g = ((i & 3) << 4) | (c >> 4);
        let O = ((c & 15) << 2) | (u >> 6),
          P = u & 63;
        o || ((P = 64), a || (O = 64)), r.push(t[h], t[g], t[O], t[P]);
      }
      return r.join("");
    },
    encodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? btoa(n)
        : this.encodeByteArray(yt(n), e);
    },
    decodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? atob(n)
        : sn(this.decodeStringToByteArray(n, e));
    },
    decodeStringToByteArray(n, e) {
      this.init_();
      const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let s = 0; s < n.length; ) {
        const i = t[n.charAt(s++)],
          c = s < n.length ? t[n.charAt(s)] : 0;
        ++s;
        const u = s < n.length ? t[n.charAt(s)] : 64;
        ++s;
        const g = s < n.length ? t[n.charAt(s)] : 64;
        if ((++s, i == null || c == null || u == null || g == null))
          throw new an();
        const O = (i << 2) | (c >> 4);
        if ((r.push(O), u !== 64)) {
          const P = ((c << 4) & 240) | (u >> 2);
          if ((r.push(P), g !== 64)) {
            const oe = ((u << 6) & 192) | g;
            r.push(oe);
          }
        }
      }
      return r;
    },
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
class an extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const on = function (n) {
    const e = yt(n);
    return It.encodeByteArray(e, !0);
  },
  vt = function (n) {
    return on(n).replace(/\./g, "");
  },
  Et = function (n) {
    try {
      return It.decodeString(n, !0);
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
 */ function cn() {
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
 */ const un = () => cn().__FIREBASE_DEFAULTS__,
  dn = () => {
    if (typeof process > "u" || typeof process.env > "u") return;
    const n = process.env.__FIREBASE_DEFAULTS__;
    if (n) return JSON.parse(n);
  },
  ln = () => {
    if (typeof document > "u") return;
    let n;
    try {
      n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const e = n && Et(n[1]);
    return e && JSON.parse(e);
  },
  hn = () => {
    try {
      return un() || dn() || ln();
    } catch (n) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
      return;
    }
  },
  fn = (n) => {
    var e;
    return (e = hn()) === null || e === void 0 ? void 0 : e[`_${n}`];
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
 */ function m() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string"
    ? navigator.userAgent
    : "";
}
function pn() {
  return (
    typeof window < "u" &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(m())
  );
}
function gn() {
  const n =
    typeof chrome == "object"
      ? chrome.runtime
      : typeof browser == "object"
        ? browser.runtime
        : void 0;
  return typeof n == "object" && n.id !== void 0;
}
function mn() {
  return typeof navigator == "object" && navigator.product === "ReactNative";
}
function _n() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function yn() {
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
 */ const In = "FirebaseError";
class k extends Error {
  constructor(e, t, r) {
    super(t),
      (this.code = e),
      (this.customData = r),
      (this.name = In),
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
      a = i ? vn(i, r) : "Error",
      c = `${this.serviceName}: ${a} (${s}).`;
    return new k(s, c, r);
  }
}
function vn(n, e) {
  return n.replace(En, (t, r) => {
    const s = e[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const En = /\{\$([^}]+)}/g;
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
 */ function Oe(n) {
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
function q(n) {
  const e = n.indexOf("?");
  if (!e) return "";
  const t = n.indexOf("#", e);
  return n.substring(e, t > 0 ? t : void 0);
}
function bn(n, e) {
  const t = new wn(n, e);
  return t.subscribe.bind(t);
}
class wn {
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
  subscribe(e, t, r) {
    let s;
    if (e === void 0 && t === void 0 && r === void 0)
      throw new Error("Missing Observer.");
    Tn(e, ["next", "error", "complete"])
      ? (s = e)
      : (s = { next: e, error: t, complete: r }),
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
function Tn(n, e) {
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
 */ function ie(n) {
  return n && n._delegate ? n._delegate : n;
}
class X {
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
 */ var f;
(function (n) {
  (n[(n.DEBUG = 0)] = "DEBUG"),
    (n[(n.VERBOSE = 1)] = "VERBOSE"),
    (n[(n.INFO = 2)] = "INFO"),
    (n[(n.WARN = 3)] = "WARN"),
    (n[(n.ERROR = 4)] = "ERROR"),
    (n[(n.SILENT = 5)] = "SILENT");
})(f || (f = {}));
const Sn = {
    debug: f.DEBUG,
    verbose: f.VERBOSE,
    info: f.INFO,
    warn: f.WARN,
    error: f.ERROR,
    silent: f.SILENT,
  },
  An = f.INFO,
  kn = {
    [f.DEBUG]: "log",
    [f.VERBOSE]: "log",
    [f.INFO]: "info",
    [f.WARN]: "warn",
    [f.ERROR]: "error",
  },
  Cn = (n, e, ...t) => {
    if (e < n.logLevel) return;
    const r = new Date().toISOString(),
      s = kn[e];
    if (s) console[s](`[${r}]  ${n.name}:`, ...t);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${e})`,
      );
  };
class bt {
  constructor(e) {
    (this.name = e),
      (this._logLevel = An),
      (this._logHandler = Cn),
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
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? Sn[e] : e;
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
const Rn = (n, e) => e.some((t) => n instanceof t);
let Ge, qe;
function On() {
  return (
    Ge ||
    (Ge = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Pn() {
  return (
    qe ||
    (qe = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const wt = new WeakMap(),
  Ae = new WeakMap(),
  Tt = new WeakMap(),
  ve = new WeakMap(),
  Pe = new WeakMap();
function Nn(n) {
  const e = new Promise((t, r) => {
    const s = () => {
        n.removeEventListener("success", i), n.removeEventListener("error", a);
      },
      i = () => {
        t(S(n.result)), s();
      },
      a = () => {
        r(n.error), s();
      };
    n.addEventListener("success", i), n.addEventListener("error", a);
  });
  return (
    e
      .then((t) => {
        t instanceof IDBCursor && wt.set(t, n);
      })
      .catch(() => {}),
    Pe.set(e, n),
    e
  );
}
function Dn(n) {
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
      if (e === "objectStoreNames") return n.objectStoreNames || Tt.get(n);
      if (e === "store")
        return t.objectStoreNames[1]
          ? void 0
          : t.objectStore(t.objectStoreNames[0]);
    }
    return S(n[e]);
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
function Ln(n) {
  ke = n(ke);
}
function Mn(n) {
  return n === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (e, ...t) {
        const r = n.call(Ee(this), e, ...t);
        return Tt.set(r, e.sort ? e.sort() : [e]), S(r);
      }
    : Pn().includes(n)
      ? function (...e) {
          return n.apply(Ee(this), e), S(wt.get(this));
        }
      : function (...e) {
          return S(n.apply(Ee(this), e));
        };
}
function Un(n) {
  return typeof n == "function"
    ? Mn(n)
    : (n instanceof IDBTransaction && Dn(n),
      Rn(n, On()) ? new Proxy(n, ke) : n);
}
function S(n) {
  if (n instanceof IDBRequest) return Nn(n);
  if (ve.has(n)) return ve.get(n);
  const e = Un(n);
  return e !== n && (ve.set(n, e), Pe.set(e, n)), e;
}
const Ee = (n) => Pe.get(n);
function Fn(n, e, { blocked: t, upgrade: r, blocking: s, terminated: i } = {}) {
  const a = indexedDB.open(n, e),
    c = S(a);
  return (
    r &&
      a.addEventListener("upgradeneeded", (o) => {
        r(S(a.result), o.oldVersion, o.newVersion, S(a.transaction), o);
      }),
    t && a.addEventListener("blocked", (o) => t(o.oldVersion, o.newVersion, o)),
    c
      .then((o) => {
        i && o.addEventListener("close", () => i()),
          s &&
            o.addEventListener("versionchange", (u) =>
              s(u.oldVersion, u.newVersion, u),
            );
      })
      .catch(() => {}),
    c
  );
}
const xn = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Bn = ["put", "add", "delete", "clear"],
  be = new Map();
function ze(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string")) return;
  if (be.get(e)) return be.get(e);
  const t = e.replace(/FromIndex$/, ""),
    r = e !== t,
    s = Bn.includes(t);
  if (
    !(t in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || xn.includes(t))
  )
    return;
  const i = async function (a, ...c) {
    const o = this.transaction(a, s ? "readwrite" : "readonly");
    let u = o.store;
    return (
      r && (u = u.index(c.shift())),
      (await Promise.all([u[t](...c), s && o.done]))[0]
    );
  };
  return be.set(e, i), i;
}
Ln((n) => ({
  ...n,
  get: (e, t, r) => ze(e, t) || n.get(e, t, r),
  has: (e, t) => !!ze(e, t) || n.has(e, t),
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
 */ class Vn {
  constructor(e) {
    this.container = e;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((t) => {
        if (Hn(t)) {
          const r = t.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((t) => t)
      .join(" ");
  }
}
function Hn(n) {
  const e = n.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Ce = "@firebase/app",
  Je = "0.9.26";
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
 */ const M = new bt("@firebase/app"),
  $n = "@firebase/app-compat",
  jn = "@firebase/analytics-compat",
  Wn = "@firebase/analytics",
  Kn = "@firebase/app-check-compat",
  Gn = "@firebase/app-check",
  qn = "@firebase/auth",
  zn = "@firebase/auth-compat",
  Jn = "@firebase/database",
  Yn = "@firebase/database-compat",
  Xn = "@firebase/functions",
  Qn = "@firebase/functions-compat",
  Zn = "@firebase/installations",
  er = "@firebase/installations-compat",
  tr = "@firebase/messaging",
  nr = "@firebase/messaging-compat",
  rr = "@firebase/performance",
  sr = "@firebase/performance-compat",
  ir = "@firebase/remote-config",
  ar = "@firebase/remote-config-compat",
  or = "@firebase/storage",
  cr = "@firebase/storage-compat",
  ur = "@firebase/firestore",
  dr = "@firebase/firestore-compat",
  lr = "firebase",
  hr = "10.7.2",
  fr = {
    [Ce]: "fire-core",
    [$n]: "fire-core-compat",
    [Wn]: "fire-analytics",
    [jn]: "fire-analytics-compat",
    [Gn]: "fire-app-check",
    [Kn]: "fire-app-check-compat",
    [qn]: "fire-auth",
    [zn]: "fire-auth-compat",
    [Jn]: "fire-rtdb",
    [Yn]: "fire-rtdb-compat",
    [Xn]: "fire-fn",
    [Qn]: "fire-fn-compat",
    [Zn]: "fire-iid",
    [er]: "fire-iid-compat",
    [tr]: "fire-fcm",
    [nr]: "fire-fcm-compat",
    [rr]: "fire-perf",
    [sr]: "fire-perf-compat",
    [ir]: "fire-rc",
    [ar]: "fire-rc-compat",
    [or]: "fire-gcs",
    [cr]: "fire-gcs-compat",
    [ur]: "fire-fst",
    [dr]: "fire-fst-compat",
    "fire-js": "fire-js",
    [lr]: "fire-js-all",
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
 */ const pr = new Map(),
  Ye = new Map();
function gr(n, e) {
  try {
    n.container.addComponent(e);
  } catch (t) {
    M.debug(
      `Component ${e.name} failed to register with FirebaseApp ${n.name}`,
      t,
    );
  }
}
function Q(n) {
  const e = n.name;
  if (Ye.has(e))
    return (
      M.debug(`There were multiple attempts to register component ${e}.`), !1
    );
  Ye.set(e, n);
  for (const t of pr.values()) gr(t, n);
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
 */ const mr = {
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
  Ne = new se("app", "Firebase", mr);
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
 */ const De = hr;
function z(n, e, t) {
  var r;
  let s = (r = fr[n]) !== null && r !== void 0 ? r : n;
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
      M.warn(c.join(" "));
    return;
  }
  Q(new X(`${s}-version`, () => ({ library: s, version: e }), "VERSION"));
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
 */ const _r = "firebase-heartbeat-database",
  yr = 1,
  Z = "firebase-heartbeat-store";
let we = null;
function St() {
  return (
    we ||
      (we = Fn(_r, yr, {
        upgrade: (n, e) => {
          switch (e) {
            case 0:
              try {
                n.createObjectStore(Z);
              } catch (t) {
                console.warn(t);
              }
          }
        },
      }).catch((n) => {
        throw Ne.create("idb-open", { originalErrorMessage: n.message });
      })),
    we
  );
}
async function Ir(n) {
  try {
    return await (await St()).transaction(Z).objectStore(Z).get(At(n));
  } catch (e) {
    if (e instanceof k) M.warn(e.message);
    else {
      const t = Ne.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message,
      });
      M.warn(t.message);
    }
  }
}
async function Xe(n, e) {
  try {
    const r = (await St()).transaction(Z, "readwrite");
    await r.objectStore(Z).put(e, At(n)), await r.done;
  } catch (t) {
    if (t instanceof k) M.warn(t.message);
    else {
      const r = Ne.create("idb-set", {
        originalErrorMessage: t == null ? void 0 : t.message,
      });
      M.warn(r.message);
    }
  }
}
function At(n) {
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
 */ const vr = 1024,
  Er = 30 * 24 * 60 * 60 * 1e3;
class br {
  constructor(e) {
    (this.container = e), (this._heartbeatsCache = null);
    const t = this.container.getProvider("app").getImmediate();
    (this._storage = new Tr(t)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    var e, t;
    const s = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      i = Qe();
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
            return Date.now() - c <= Er;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
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
    const t = Qe(),
      { heartbeatsToSend: r, unsentEntries: s } = wr(
        this._heartbeatsCache.heartbeats,
      ),
      i = vt(JSON.stringify({ version: 2, heartbeats: r }));
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
function Qe() {
  return new Date().toISOString().substring(0, 10);
}
function wr(n, e = vr) {
  const t = [];
  let r = n.slice();
  for (const s of n) {
    const i = t.find((a) => a.agent === s.agent);
    if (i) {
      if ((i.dates.push(s.date), Ze(t) > e)) {
        i.dates.pop();
        break;
      }
    } else if ((t.push({ agent: s.agent, dates: [s.date] }), Ze(t) > e)) {
      t.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: t, unsentEntries: r };
}
class Tr {
  constructor(e) {
    (this.app = e),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return _n()
      ? yn()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await Ir(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Xe(this.app, {
        lastSentHeartbeatDate:
          (t = e.lastSentHeartbeatDate) !== null && t !== void 0
            ? t
            : s.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    } else return;
  }
  async add(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Xe(this.app, {
        lastSentHeartbeatDate:
          (t = e.lastSentHeartbeatDate) !== null && t !== void 0
            ? t
            : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...e.heartbeats],
      });
    } else return;
  }
}
function Ze(n) {
  return vt(JSON.stringify({ version: 2, heartbeats: n })).length;
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
 */ function Sr(n) {
  Q(new X("platform-logger", (e) => new Vn(e), "PRIVATE")),
    Q(new X("heartbeat", (e) => new br(e), "PRIVATE")),
    z(Ce, Je, n),
    z(Ce, Je, "esm2017"),
    z("fire-js", "");
}
Sr("");
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
function kt() {
  return {
    "dependent-sdk-initialized-before-auth":
      "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
  };
}
const Ar = kt,
  Ct = new se("auth", "Firebase", kt());
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
 */ const de = new bt("@firebase/auth");
function kr(n, ...e) {
  de.logLevel <= f.WARN && de.warn(`Auth (${De}): ${n}`, ...e);
}
function ue(n, ...e) {
  de.logLevel <= f.ERROR && de.error(`Auth (${De}): ${n}`, ...e);
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
 */ function y(n, ...e) {
  throw Me(n, ...e);
}
function V(n, ...e) {
  return Me(n, ...e);
}
function Rt(n, e, t) {
  const r = Object.assign(Object.assign({}, Ar()), { [e]: t });
  return new se("auth", "Firebase", r).create(e, { appName: n.name });
}
function Cr(n, e, t) {
  const r = t;
  if (!(e instanceof r))
    throw (
      (r.name !== e.constructor.name && y(n, "argument-error"),
      Rt(
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
  return Ct.create(n, ...e);
}
function l(n, e, ...t) {
  if (!n) throw Me(e, ...t);
}
function _(n) {
  const e = "INTERNAL ASSERTION FAILED: " + n;
  throw (ue(e), new Error(e));
}
function U(n, e) {
  n || _(e);
}
function Rr() {
  return et() === "http:" || et() === "https:";
}
function et() {
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
 */ function Or() {
  return typeof navigator < "u" &&
    navigator &&
    "onLine" in navigator &&
    typeof navigator.onLine == "boolean" &&
    (Rr() || gn() || "connection" in navigator)
    ? navigator.onLine
    : !0;
}
function Pr() {
  if (typeof navigator > "u") return null;
  const n = navigator;
  return (n.languages && n.languages[0]) || n.language || null;
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
 */ class ae {
  constructor(e, t) {
    (this.shortDelay = e),
      (this.longDelay = t),
      U(t > e, "Short delay should be less than long delay!"),
      (this.isMobile = pn() || mn());
  }
  get() {
    return Or()
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
 */ function Nr(n, e) {
  U(n.emulator, "Emulator should always be set here");
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
 */ class Ot {
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
    _(
      "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
    );
  }
  static headers() {
    if (this.headersImpl) return this.headersImpl;
    if (typeof self < "u" && "Headers" in self) return self.Headers;
    if (typeof globalThis < "u" && globalThis.Headers)
      return globalThis.Headers;
    if (typeof Headers < "u") return Headers;
    _(
      "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
    );
  }
  static response() {
    if (this.responseImpl) return this.responseImpl;
    if (typeof self < "u" && "Response" in self) return self.Response;
    if (typeof globalThis < "u" && globalThis.Response)
      return globalThis.Response;
    if (typeof Response < "u") return Response;
    _(
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
 */ const Dr = {
  CREDENTIAL_MISMATCH: "custom-token-mismatch",
  MISSING_CUSTOM_TOKEN: "internal-error",
  INVALID_IDENTIFIER: "invalid-email",
  MISSING_CONTINUE_URI: "internal-error",
  INVALID_PASSWORD: "wrong-password",
  MISSING_PASSWORD: "missing-password",
  INVALID_LOGIN_CREDENTIALS: "invalid-credential",
  EMAIL_EXISTS: "email-already-in-use",
  PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
  INVALID_IDP_RESPONSE: "invalid-credential",
  INVALID_PENDING_TOKEN: "invalid-credential",
  FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
  MISSING_REQ_TYPE: "internal-error",
  EMAIL_NOT_FOUND: "user-not-found",
  RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
  EXPIRED_OOB_CODE: "expired-action-code",
  INVALID_OOB_CODE: "invalid-action-code",
  MISSING_OOB_CODE: "internal-error",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
  INVALID_ID_TOKEN: "invalid-user-token",
  TOKEN_EXPIRED: "user-token-expired",
  USER_NOT_FOUND: "user-token-expired",
  TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
  INVALID_CODE: "invalid-verification-code",
  INVALID_SESSION_INFO: "invalid-verification-id",
  INVALID_TEMPORARY_PROOF: "invalid-credential",
  MISSING_SESSION_INFO: "missing-verification-id",
  SESSION_EXPIRED: "code-expired",
  MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
  UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
  INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
  ADMIN_ONLY_OPERATION: "admin-restricted-operation",
  INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
  MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
  MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
  MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
  SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
  SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
  BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
  RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
  MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
  INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
  INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
  MISSING_CLIENT_TYPE: "missing-client-type",
  MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
  INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
  INVALID_REQ_TYPE: "invalid-req-type",
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
 */ const Lr = new ae(3e4, 6e4);
function C(n, e) {
  return n.tenantId && !e.tenantId
    ? Object.assign(Object.assign({}, e), { tenantId: n.tenantId })
    : e;
}
async function R(n, e, t, r, s = {}) {
  return Pt(n, s, async () => {
    let i = {},
      a = {};
    r && (e === "GET" ? (a = r) : (i = { body: JSON.stringify(r) }));
    const c = Oe(Object.assign({ key: n.config.apiKey }, a)).slice(1),
      o = await n._getAdditionalHeaders();
    return (
      (o["Content-Type"] = "application/json"),
      n.languageCode && (o["X-Firebase-Locale"] = n.languageCode),
      Ot.fetch()(
        Nt(n, n.config.apiHost, t, c),
        Object.assign(
          { method: e, headers: o, referrerPolicy: "no-referrer" },
          i,
        ),
      )
    );
  });
}
async function Pt(n, e, t) {
  n._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, Dr), e);
  try {
    const s = new Ur(n),
      i = await Promise.race([t(), s.promise]);
    s.clearNetworkTimeout();
    const a = await i.json();
    if ("needConfirmation" in a)
      throw ce(n, "account-exists-with-different-credential", a);
    if (i.ok && !("errorMessage" in a)) return a;
    {
      const c = i.ok ? a.errorMessage : a.error.message,
        [o, u] = c.split(" : ");
      if (o === "FEDERATED_USER_ID_ALREADY_LINKED")
        throw ce(n, "credential-already-in-use", a);
      if (o === "EMAIL_EXISTS") throw ce(n, "email-already-in-use", a);
      if (o === "USER_DISABLED") throw ce(n, "user-disabled", a);
      const h = r[o] || o.toLowerCase().replace(/[_\s]+/g, "-");
      if (u) throw Rt(n, h, u);
      y(n, h);
    }
  } catch (s) {
    if (s instanceof k) throw s;
    y(n, "network-request-failed", { message: String(s) });
  }
}
async function fe(n, e, t, r, s = {}) {
  const i = await R(n, e, t, r, s);
  return (
    "mfaPendingCredential" in i &&
      y(n, "multi-factor-auth-required", { _serverResponse: i }),
    i
  );
}
function Nt(n, e, t, r) {
  const s = `${e}${t}?${r}`;
  return n.config.emulator ? Nr(n.config, s) : `${n.config.apiScheme}://${s}`;
}
function Mr(n) {
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
class Ur {
  constructor(e) {
    (this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((t, r) => {
        this.timer = setTimeout(
          () => r(V(this.auth, "network-request-failed")),
          Lr.get(),
        );
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function ce(n, e, t) {
  const r = { appName: n.name };
  t.email && (r.email = t.email),
    t.phoneNumber && (r.phoneNumber = t.phoneNumber);
  const s = V(n, e, r);
  return (s.customData._tokenResponse = t), s;
}
function tt(n) {
  return n !== void 0 && n.enterprise !== void 0;
}
class Fr {
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
  getProviderEnforcementState(e) {
    if (
      !this.recaptchaEnforcementState ||
      this.recaptchaEnforcementState.length === 0
    )
      return null;
    for (const t of this.recaptchaEnforcementState)
      if (t.provider && t.provider === e) return Mr(t.enforcementState);
    return null;
  }
  isProviderEnabled(e) {
    return (
      this.getProviderEnforcementState(e) === "ENFORCE" ||
      this.getProviderEnforcementState(e) === "AUDIT"
    );
  }
}
async function xr(n, e) {
  return R(n, "GET", "/v2/recaptchaConfig", C(n, e));
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
 */ async function Br(n, e) {
  return R(n, "POST", "/v1/accounts:delete", e);
}
async function Vr(n, e) {
  return R(n, "POST", "/v1/accounts:lookup", e);
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
 */ function J(n) {
  if (n)
    try {
      const e = new Date(Number(n));
      if (!isNaN(e.getTime())) return e.toUTCString();
    } catch {}
}
async function Hr(n, e = !1) {
  const t = ie(n),
    r = await t.getIdToken(e),
    s = Ue(r);
  l(s && s.exp && s.auth_time && s.iat, t.auth, "internal-error");
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
    return ue("JWT malformed, contained fewer than 3 sections"), null;
  try {
    const s = Et(t);
    return s
      ? JSON.parse(s)
      : (ue("Failed to decode base64 JWT payload"), null);
  } catch (s) {
    return (
      ue(
        "Caught error parsing JWT payload as JSON",
        s == null ? void 0 : s.toString(),
      ),
      null
    );
  }
}
function $r(n) {
  const e = Ue(n);
  return (
    l(e, "internal-error"),
    l(typeof e.exp < "u", "internal-error"),
    l(typeof e.iat < "u", "internal-error"),
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
 */ async function ee(n, e, t = !1) {
  if (t) return e;
  try {
    return await e;
  } catch (r) {
    throw (
      (r instanceof k &&
        jr(r) &&
        n.auth.currentUser === n &&
        (await n.auth.signOut()),
      r)
    );
  }
}
function jr({ code: n }) {
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
 */ class Wr {
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
      return (this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), r;
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
        this.schedule(!0);
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
 */ class Dt {
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
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
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
 */ async function le(n) {
  var e;
  const t = n.auth,
    r = await n.getIdToken(),
    s = await ee(n, Vr(t, { idToken: r }));
  l(s == null ? void 0 : s.users.length, t, "internal-error");
  const i = s.users[0];
  n._notifyReloadListener(i);
  const a =
      !((e = i.providerUserInfo) === null || e === void 0) && e.length
        ? qr(i.providerUserInfo)
        : [],
    c = Gr(n.providerData, a),
    o = n.isAnonymous,
    u = !(n.email && i.passwordHash) && !(c != null && c.length),
    h = o ? u : !1,
    g = {
      uid: i.localId,
      displayName: i.displayName || null,
      photoURL: i.photoUrl || null,
      email: i.email || null,
      emailVerified: i.emailVerified || !1,
      phoneNumber: i.phoneNumber || null,
      tenantId: i.tenantId || null,
      providerData: c,
      metadata: new Dt(i.createdAt, i.lastLoginAt),
      isAnonymous: h,
    };
  Object.assign(n, g);
}
async function Kr(n) {
  const e = ie(n);
  await le(e),
    await e.auth._persistUserIfCurrent(e),
    e.auth._notifyListenersIfCurrent(e);
}
function Gr(n, e) {
  return [
    ...n.filter((r) => !e.some((s) => s.providerId === r.providerId)),
    ...e,
  ];
}
function qr(n) {
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
 */ async function zr(n, e) {
  const t = await Pt(n, {}, async () => {
    const r = Oe({ grant_type: "refresh_token", refresh_token: e }).slice(1),
      { tokenApiHost: s, apiKey: i } = n.config,
      a = Nt(n, s, "/v1/token", `key=${i}`),
      c = await n._getAdditionalHeaders();
    return (
      (c["Content-Type"] = "application/x-www-form-urlencoded"),
      Ot.fetch()(a, { method: "POST", headers: c, body: r })
    );
  });
  return {
    accessToken: t.access_token,
    expiresIn: t.expires_in,
    refreshToken: t.refresh_token,
  };
}
async function Jr(n, e) {
  return R(n, "POST", "/v2/accounts:revokeToken", C(n, e));
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
 */ class te {
  constructor() {
    (this.refreshToken = null),
      (this.accessToken = null),
      (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    l(e.idToken, "internal-error"),
      l(typeof e.idToken < "u", "internal-error"),
      l(typeof e.refreshToken < "u", "internal-error");
    const t =
      "expiresIn" in e && typeof e.expiresIn < "u"
        ? Number(e.expiresIn)
        : $r(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  async getToken(e, t = !1) {
    return (
      l(!this.accessToken || this.refreshToken, e, "user-token-expired"),
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
    const { accessToken: r, refreshToken: s, expiresIn: i } = await zr(e, t);
    this.updateTokensAndExpiration(r, s, Number(i));
  }
  updateTokensAndExpiration(e, t, r) {
    (this.refreshToken = t || null),
      (this.accessToken = e || null),
      (this.expirationTime = Date.now() + r * 1e3);
  }
  static fromJSON(e, t) {
    const { refreshToken: r, accessToken: s, expirationTime: i } = t,
      a = new te();
    return (
      r &&
        (l(typeof r == "string", "internal-error", { appName: e }),
        (a.refreshToken = r)),
      s &&
        (l(typeof s == "string", "internal-error", { appName: e }),
        (a.accessToken = s)),
      i &&
        (l(typeof i == "number", "internal-error", { appName: e }),
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
    return Object.assign(new te(), this.toJSON());
  }
  _performRefresh() {
    return _("not implemented");
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
 */ function I(n, e) {
  l(typeof n == "string" || typeof n > "u", "internal-error", { appName: e });
}
class L {
  constructor(e) {
    var { uid: t, auth: r, stsTokenManager: s } = e,
      i = Le(e, ["uid", "auth", "stsTokenManager"]);
    (this.providerId = "firebase"),
      (this.proactiveRefresh = new Wr(this)),
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
      (this.metadata = new Dt(i.createdAt || void 0, i.lastLoginAt || void 0));
  }
  async getIdToken(e) {
    const t = await ee(this, this.stsTokenManager.getToken(this.auth, e));
    return (
      l(t, this.auth, "internal-error"),
      this.accessToken !== t &&
        ((this.accessToken = t),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      t
    );
  }
  getIdTokenResult(e) {
    return Hr(this, e);
  }
  reload() {
    return Kr(this);
  }
  _assign(e) {
    this !== e &&
      (l(this.uid === e.uid, this.auth, "internal-error"),
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
    l(!this.reloadListener, this.auth, "internal-error"),
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
      await ee(this, Br(this.auth, { idToken: e })),
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
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON(),
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name },
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || "";
  }
  static _fromJSON(e, t) {
    var r, s, i, a, c, o, u, h;
    const g = (r = t.displayName) !== null && r !== void 0 ? r : void 0,
      O = (s = t.email) !== null && s !== void 0 ? s : void 0,
      P = (i = t.phoneNumber) !== null && i !== void 0 ? i : void 0,
      oe = (a = t.photoURL) !== null && a !== void 0 ? a : void 0,
      Ve = (c = t.tenantId) !== null && c !== void 0 ? c : void 0,
      ge = (o = t._redirectEventId) !== null && o !== void 0 ? o : void 0,
      He = (u = t.createdAt) !== null && u !== void 0 ? u : void 0,
      $e = (h = t.lastLoginAt) !== null && h !== void 0 ? h : void 0,
      {
        uid: me,
        emailVerified: je,
        isAnonymous: We,
        providerData: _e,
        stsTokenManager: Ke,
      } = t;
    l(me && Ke, e, "internal-error");
    const Ht = te.fromJSON(this.name, Ke);
    l(typeof me == "string", e, "internal-error"),
      I(g, e.name),
      I(O, e.name),
      l(typeof je == "boolean", e, "internal-error"),
      l(typeof We == "boolean", e, "internal-error"),
      I(P, e.name),
      I(oe, e.name),
      I(Ve, e.name),
      I(ge, e.name),
      I(He, e.name),
      I($e, e.name);
    const ye = new L({
      uid: me,
      auth: e,
      email: O,
      emailVerified: je,
      displayName: g,
      isAnonymous: We,
      photoURL: oe,
      phoneNumber: P,
      tenantId: Ve,
      stsTokenManager: Ht,
      createdAt: He,
      lastLoginAt: $e,
    });
    return (
      _e &&
        Array.isArray(_e) &&
        (ye.providerData = _e.map(($t) => Object.assign({}, $t))),
      ge && (ye._redirectEventId = ge),
      ye
    );
  }
  static async _fromIdTokenResponse(e, t, r = !1) {
    const s = new te();
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
 */ const nt = new Map();
function T(n) {
  U(n instanceof Function, "Expected a class definition");
  let e = nt.get(n);
  return e
    ? (U(e instanceof n, "Instance stored in cache mismatched with class"), e)
    : ((e = new n()), nt.set(n, e), e);
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
 */ class Lt {
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
Lt.type = "NONE";
const rt = Lt;
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
 */ function Se(n, e, t) {
  return `firebase:${n}:${e}:${t}`;
}
class H {
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
    if (!t.length) return new H(T(rt), e, r);
    const s = (
      await Promise.all(
        t.map(async (u) => {
          if (await u._isAvailable()) return u;
        }),
      )
    ).filter((u) => u);
    let i = s[0] || T(rt);
    const a = Se(r, e.config.apiKey, e.name);
    let c = null;
    for (const u of t)
      try {
        const h = await u._get(a);
        if (h) {
          const g = L._fromJSON(e, h);
          u !== i && (c = g), (i = u);
          break;
        }
      } catch {}
    const o = s.filter((u) => u._shouldAllowMigration);
    return !i._shouldAllowMigration || !o.length
      ? new H(i, e, r)
      : ((i = o[0]),
        c && (await i._set(a, c.toJSON())),
        await Promise.all(
          t.map(async (u) => {
            if (u !== i)
              try {
                await u._remove(a);
              } catch {}
          }),
        ),
        new H(i, e, r));
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
 */ function st(n) {
  const e = n.toLowerCase();
  if (e.includes("opera/") || e.includes("opr/") || e.includes("opios/"))
    return "Opera";
  if (Zr(e)) return "IEMobile";
  if (e.includes("msie") || e.includes("trident/")) return "IE";
  if (e.includes("edge/")) return "Edge";
  if (Yr(e)) return "Firefox";
  if (e.includes("silk/")) return "Silk";
  if (ts(e)) return "Blackberry";
  if (ns(e)) return "Webos";
  if (Xr(e)) return "Safari";
  if ((e.includes("chrome/") || Qr(e)) && !e.includes("edge/")) return "Chrome";
  if (es(e)) return "Android";
  {
    const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      r = n.match(t);
    if ((r == null ? void 0 : r.length) === 2) return r[1];
  }
  return "Other";
}
function Yr(n = m()) {
  return /firefox\//i.test(n);
}
function Xr(n = m()) {
  const e = n.toLowerCase();
  return (
    e.includes("safari/") &&
    !e.includes("chrome/") &&
    !e.includes("crios/") &&
    !e.includes("android")
  );
}
function Qr(n = m()) {
  return /crios\//i.test(n);
}
function Zr(n = m()) {
  return /iemobile/i.test(n);
}
function es(n = m()) {
  return /android/i.test(n);
}
function ts(n = m()) {
  return /blackberry/i.test(n);
}
function ns(n = m()) {
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
 */ function Mt(n, e = []) {
  let t;
  switch (n) {
    case "Browser":
      t = st(m());
      break;
    case "Worker":
      t = `${st(m())}-${n}`;
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
 */ class rs {
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
 */ async function ss(n, e = {}) {
  return R(n, "GET", "/v2/passwordPolicy", C(n, e));
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
 */ const is = 6;
class as {
  constructor(e) {
    var t, r, s, i;
    const a = e.customStrengthOptions;
    (this.customStrengthOptions = {}),
      (this.customStrengthOptions.minPasswordLength =
        (t = a.minPasswordLength) !== null && t !== void 0 ? t : is),
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
    const o = { isValid: !0, passwordPolicy: this };
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
  validatePasswordLengthOptions(e, t) {
    const r = this.customStrengthOptions.minPasswordLength,
      s = this.customStrengthOptions.maxPasswordLength;
    r && (t.meetsMinPasswordLength = e.length >= r),
      s && (t.meetsMaxPasswordLength = e.length <= s);
  }
  validatePasswordCharacterOptions(e, t) {
    this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
    let r;
    for (let s = 0; s < e.length; s++)
      (r = e.charAt(s)),
        this.updatePasswordCharacterOptionsStatuses(
          t,
          r >= "a" && r <= "z",
          r >= "A" && r <= "Z",
          r >= "0" && r <= "9",
          this.allowedNonAlphanumericCharacters.includes(r),
        );
  }
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
 */ class os {
  constructor(e, t, r, s) {
    (this.app = e),
      (this.heartbeatServiceProvider = t),
      (this.appCheckServiceProvider = r),
      (this.config = s),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new it(this)),
      (this.idTokenSubscription = new it(this)),
      (this.beforeStateQueue = new rs(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = Ct),
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
      t && (this._popupRedirectResolver = T(t)),
      (this._initializationPromise = this.queue(async () => {
        var r, s;
        if (
          !this._deleted &&
          ((this.persistenceManager = await H.create(this, e)), !this._deleted)
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
  async _onStorageEvent() {
    if (this._deleted) return;
    const e = await this.assertedPersistence.getCurrentUser();
    if (!(!this.currentUser && !e)) {
      if (this.currentUser && e && this.currentUser.uid === e.uid) {
        this._currentUser._assign(e), await this.currentUser.getIdToken();
        return;
      }
      await this._updateCurrentUser(e, !0);
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
      l(this._popupRedirectResolver, this, "argument-error"),
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
    this.languageCode = Pr();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(e) {
    const t = e ? ie(e) : null;
    return (
      t &&
        l(
          t.auth.config.apiKey === this.config.apiKey,
          this,
          "invalid-user-token",
        ),
      this._updateCurrentUser(t && t._clone(this))
    );
  }
  async _updateCurrentUser(e, t = !1) {
    if (!this._deleted)
      return (
        e && l(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
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
      this._updateCurrentUser(null, !0)
    );
  }
  setPersistence(e) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(T(e));
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
    const e = await ss(this),
      t = new as(e);
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
  async revokeAccessToken(e) {
    if (this.currentUser) {
      const t = await this.currentUser.getIdToken(),
        r = {
          providerId: "apple.com",
          tokenType: "ACCESS_TOKEN",
          token: e,
          idToken: t,
        };
      this.tenantId != null && (r.tenantId = this.tenantId), await Jr(this, r);
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
      const t = (e && T(e)) || this._popupRedirectResolver;
      l(t, this, "argument-error"),
        (this.redirectPersistenceManager = await H.create(
          this,
          [T(t._redirectPersistence)],
          "redirectUser",
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
      (l(c, this, "internal-error"),
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
      l(this.persistenceManager, this, "internal-error"),
      this.persistenceManager
    );
  }
  _logFramework(e) {
    !e ||
      this.frameworks.includes(e) ||
      (this.frameworks.push(e),
      this.frameworks.sort(),
      (this.clientVersion = Mt(
        this.config.clientPlatform,
        this._getFrameworks(),
      )));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var e;
    const t = { "X-Client-Version": this.clientVersion };
    this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
    const r = await ((e = this.heartbeatServiceProvider.getImmediate({
      optional: !0,
    })) === null || e === void 0
      ? void 0
      : e.getHeartbeatsHeader());
    r && (t["X-Firebase-Client"] = r);
    const s = await this._getAppCheckToken();
    return s && (t["X-Firebase-AppCheck"] = s), t;
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
        kr(`Error while retrieving App Check token: ${t.error}`),
      t == null ? void 0 : t.token
    );
  }
}
function W(n) {
  return ie(n);
}
class it {
  constructor(e) {
    (this.auth = e),
      (this.observer = null),
      (this.addObserver = bn((t) => (this.observer = t)));
  }
  get next() {
    return (
      l(this.observer, this.auth, "internal-error"),
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
 */ function cs() {
  var n, e;
  return (e =
    (n = document.getElementsByTagName("head")) === null || n === void 0
      ? void 0
      : n[0]) !== null && e !== void 0
    ? e
    : document;
}
function us(n) {
  return new Promise((e, t) => {
    const r = document.createElement("script");
    r.setAttribute("src", n),
      (r.onload = e),
      (r.onerror = (s) => {
        const i = V("internal-error");
        (i.customData = s), t(i);
      }),
      (r.type = "text/javascript"),
      (r.charset = "UTF-8"),
      cs().appendChild(r);
  });
}
const ds = "https://www.google.com/recaptcha/enterprise.js?render=",
  ls = "recaptcha-enterprise",
  hs = "NO_RECAPTCHA";
class fs {
  constructor(e) {
    (this.type = ls), (this.auth = W(e));
  }
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
        xr(i, {
          clientType: "CLIENT_TYPE_WEB",
          version: "RECAPTCHA_ENTERPRISE",
        })
          .then((o) => {
            if (o.recaptchaKey === void 0)
              c(new Error("recaptcha Enterprise site key undefined"));
            else {
              const u = new Fr(o);
              return (
                i.tenantId == null
                  ? (i._agentRecaptchaConfig = u)
                  : (i._tenantRecaptchaConfigs[i.tenantId] = u),
                a(u.siteKey)
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
      tt(o)
        ? o.enterprise.ready(() => {
            o.enterprise
              .execute(i, { action: e })
              .then((u) => {
                a(u);
              })
              .catch(() => {
                a(hs);
              });
          })
        : c(Error("No reCAPTCHA enterprise script loaded."));
    }
    return new Promise((i, a) => {
      r(this.auth)
        .then((c) => {
          if (!t && tt(window.grecaptcha)) s(c, i, a);
          else {
            if (typeof window > "u") {
              a(new Error("RecaptchaVerifier is only supported in browser"));
              return;
            }
            us(ds + c)
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
async function at(n, e, t, r = !1) {
  const s = new fs(n);
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
    Object.assign(a, { clientType: "CLIENT_TYPE_WEB" }),
    Object.assign(a, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
    a
  );
}
async function Re(n, e, t, r) {
  var s;
  if (
    !((s = n._getRecaptchaConfig()) === null || s === void 0) &&
    s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
  ) {
    const i = await at(n, e, t, t === "getOobCode");
    return r(n, i);
  } else
    return r(n, e).catch(async (i) => {
      if (i.code === "auth/missing-recaptcha-token") {
        console.log(
          `${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`,
        );
        const a = await at(n, e, t, t === "getOobCode");
        return r(n, a);
      } else return Promise.reject(i);
    });
}
function ps(n, e) {
  const t = (e == null ? void 0 : e.persistence) || [],
    r = (Array.isArray(t) ? t : [t]).map(T);
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
 */ class Fe {
  constructor(e, t) {
    (this.providerId = e), (this.signInMethod = t);
  }
  toJSON() {
    return _("not implemented");
  }
  _getIdTokenResponse(e) {
    return _("not implemented");
  }
  _linkToIdToken(e, t) {
    return _("not implemented");
  }
  _getReauthenticationResolver(e) {
    return _("not implemented");
  }
}
async function gs(n, e) {
  return R(n, "POST", "/v1/accounts:signUp", e);
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
 */ async function ms(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithPassword", C(n, e));
}
async function _s(n, e) {
  return R(n, "POST", "/v1/accounts:sendOobCode", C(n, e));
}
async function ys(n, e) {
  return _s(n, e);
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
 */ async function Is(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithEmailLink", C(n, e));
}
async function vs(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithEmailLink", C(n, e));
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
 */ class ne extends Fe {
  constructor(e, t, r, s = null) {
    super("password", r),
      (this._email = e),
      (this._password = t),
      (this._tenantId = s);
  }
  static _fromEmailAndPassword(e, t) {
    return new ne(e, t, "password");
  }
  static _fromEmailAndCode(e, t, r = null) {
    return new ne(e, t, "emailLink", r);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
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
  async _getIdTokenResponse(e) {
    switch (this.signInMethod) {
      case "password":
        const t = {
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
        };
        return Re(e, t, "signInWithPassword", ms);
      case "emailLink":
        return Is(e, { email: this._email, oobCode: this._password });
      default:
        y(e, "internal-error");
    }
  }
  async _linkToIdToken(e, t) {
    switch (this.signInMethod) {
      case "password":
        const r = {
          idToken: t,
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
        };
        return Re(e, r, "signUpPassword", gs);
      case "emailLink":
        return vs(e, {
          idToken: t,
          email: this._email,
          oobCode: this._password,
        });
      default:
        y(e, "internal-error");
    }
  }
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
 */ async function $(n, e) {
  return fe(n, "POST", "/v1/accounts:signInWithIdp", C(n, e));
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
 */ const Es = "http://localhost";
class F extends Fe {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(e) {
    const t = new F(e.providerId, e.signInMethod);
    return (
      e.idToken || e.accessToken
        ? (e.idToken && (t.idToken = e.idToken),
          e.accessToken && (t.accessToken = e.accessToken),
          e.nonce && !e.pendingToken && (t.nonce = e.nonce),
          e.pendingToken && (t.pendingToken = e.pendingToken))
        : e.oauthToken && e.oauthTokenSecret
          ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
          : y("argument-error"),
      t
    );
  }
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
  static fromJSON(e) {
    const t = typeof e == "string" ? JSON.parse(e) : e,
      { providerId: r, signInMethod: s } = t,
      i = Le(t, ["providerId", "signInMethod"]);
    if (!r || !s) return null;
    const a = new F(r, s);
    return (
      (a.idToken = i.idToken || void 0),
      (a.accessToken = i.accessToken || void 0),
      (a.secret = i.secret),
      (a.nonce = i.nonce),
      (a.pendingToken = i.pendingToken || null),
      a
    );
  }
  _getIdTokenResponse(e) {
    const t = this.buildRequest();
    return $(e, t);
  }
  _linkToIdToken(e, t) {
    const r = this.buildRequest();
    return (r.idToken = t), $(e, r);
  }
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), $(e, t);
  }
  buildRequest() {
    const e = { requestUri: Es, returnSecureToken: !0 };
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
 */ function bs(n) {
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
function ws(n) {
  const e = G(q(n)).link,
    t = e ? G(q(e)).deep_link_id : null,
    r = G(q(n)).deep_link_id;
  return (r ? G(q(r)).link : null) || r || t || e || n;
}
class xe {
  constructor(e) {
    var t, r, s, i, a, c;
    const o = G(q(e)),
      u = (t = o.apiKey) !== null && t !== void 0 ? t : null,
      h = (r = o.oobCode) !== null && r !== void 0 ? r : null,
      g = bs((s = o.mode) !== null && s !== void 0 ? s : null);
    l(u && h && g, "argument-error"),
      (this.apiKey = u),
      (this.operation = g),
      (this.code = h),
      (this.continueUrl =
        (i = o.continueUrl) !== null && i !== void 0 ? i : null),
      (this.languageCode =
        (a = o.languageCode) !== null && a !== void 0 ? a : null),
      (this.tenantId = (c = o.tenantId) !== null && c !== void 0 ? c : null);
  }
  static parseLink(e) {
    const t = ws(e);
    try {
      return new xe(t);
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
 */ class K {
  constructor() {
    this.providerId = K.PROVIDER_ID;
  }
  static credential(e, t) {
    return ne._fromEmailAndPassword(e, t);
  }
  static credentialWithLink(e, t) {
    const r = xe.parseLink(t);
    return l(r, "argument-error"), ne._fromEmailAndCode(e, r.code, r.tenantId);
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
 */ class Ut {
  constructor(e) {
    (this.providerId = e),
      (this.defaultLanguageCode = null),
      (this.customParameters = {});
  }
  setDefaultLanguage(e) {
    this.defaultLanguageCode = e;
  }
  setCustomParameters(e) {
    return (this.customParameters = e), this;
  }
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
 */ class pe extends Ut {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(e) {
    return this.scopes.includes(e) || this.scopes.push(e), this;
  }
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
 */ class v extends pe {
  constructor() {
    super("facebook.com");
  }
  static credential(e) {
    return F._fromParams({
      providerId: v.PROVIDER_ID,
      signInMethod: v.FACEBOOK_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  static credentialFromResult(e) {
    return v.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return v.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return v.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
v.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
v.PROVIDER_ID = "facebook.com";
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
 */ class E extends pe {
  constructor() {
    super("google.com"), this.addScope("profile");
  }
  static credential(e, t) {
    return F._fromParams({
      providerId: E.PROVIDER_ID,
      signInMethod: E.GOOGLE_SIGN_IN_METHOD,
      idToken: e,
      accessToken: t,
    });
  }
  static credentialFromResult(e) {
    return E.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return E.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthIdToken: t, oauthAccessToken: r } = e;
    if (!t && !r) return null;
    try {
      return E.credential(t, r);
    } catch {
      return null;
    }
  }
}
E.GOOGLE_SIGN_IN_METHOD = "google.com";
E.PROVIDER_ID = "google.com";
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
 */ class b extends pe {
  constructor() {
    super("github.com");
  }
  static credential(e) {
    return F._fromParams({
      providerId: b.PROVIDER_ID,
      signInMethod: b.GITHUB_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  static credentialFromResult(e) {
    return b.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return b.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return b.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
b.GITHUB_SIGN_IN_METHOD = "github.com";
b.PROVIDER_ID = "github.com";
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
 */ class w extends pe {
  constructor() {
    super("twitter.com");
  }
  static credential(e, t) {
    return F._fromParams({
      providerId: w.PROVIDER_ID,
      signInMethod: w.TWITTER_SIGN_IN_METHOD,
      oauthToken: e,
      oauthTokenSecret: t,
    });
  }
  static credentialFromResult(e) {
    return w.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return w.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthAccessToken: t, oauthTokenSecret: r } = e;
    if (!t || !r) return null;
    try {
      return w.credential(t, r);
    } catch {
      return null;
    }
  }
}
w.TWITTER_SIGN_IN_METHOD = "twitter.com";
w.PROVIDER_ID = "twitter.com";
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
 */ class j {
  constructor(e) {
    (this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType);
  }
  static async _fromIdTokenResponse(e, t, r, s = !1) {
    const i = await L._fromIdTokenResponse(e, r, s),
      a = ot(r);
    return new j({
      user: i,
      providerId: a,
      _tokenResponse: r,
      operationType: t,
    });
  }
  static async _forOperation(e, t, r) {
    await e._updateTokensIfNecessary(r, !0);
    const s = ot(r);
    return new j({
      user: e,
      providerId: s,
      _tokenResponse: r,
      operationType: t,
    });
  }
}
function ot(n) {
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
 */ class he extends k {
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
function Ft(n, e, t, r) {
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
async function Ts(n, e, t = !1) {
  const r = await ee(n, e._linkToIdToken(n.auth, await n.getIdToken()), t);
  return j._forOperation(n, "link", r);
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
 */ async function Ss(n, e, t = !1) {
  const { auth: r } = n,
    s = "reauthenticate";
  try {
    const i = await ee(n, Ft(r, s, e, n), t);
    l(i.idToken, r, "internal-error");
    const a = Ue(i.idToken);
    l(a, r, "internal-error");
    const { sub: c } = a;
    return l(n.uid === c, r, "user-mismatch"), j._forOperation(n, s, i);
  } catch (i) {
    throw (
      ((i == null ? void 0 : i.code) === "auth/user-not-found" &&
        y(r, "user-mismatch"),
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
 */ async function xt(n, e, t = !1) {
  const r = "signIn",
    s = await Ft(n, r, e),
    i = await j._fromIdTokenResponse(n, r, s);
  return t || (await n._updateCurrentUser(i.user)), i;
}
async function As(n, e) {
  return xt(W(n), e);
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
 */ function ks(n, e, t) {
  var r;
  l(
    ((r = t.url) === null || r === void 0 ? void 0 : r.length) > 0,
    n,
    "invalid-continue-uri",
  ),
    l(
      typeof t.dynamicLinkDomain > "u" || t.dynamicLinkDomain.length > 0,
      n,
      "invalid-dynamic-link-domain",
    ),
    (e.continueUrl = t.url),
    (e.dynamicLinkDomain = t.dynamicLinkDomain),
    (e.canHandleCodeInApp = t.handleCodeInApp),
    t.iOS &&
      (l(t.iOS.bundleId.length > 0, n, "missing-ios-bundle-id"),
      (e.iOSBundleId = t.iOS.bundleId)),
    t.android &&
      (l(t.android.packageName.length > 0, n, "missing-android-pkg-name"),
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
 */ async function Cs(n) {
  const e = W(n);
  e._getPasswordPolicyInternal() && (await e._updatePasswordPolicy());
}
function Rs(n, e, t) {
  return As(ie(n), K.credential(e, t)).catch(async (r) => {
    throw (r.code === "auth/password-does-not-meet-requirements" && Cs(n), r);
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
 */ async function Os(n, e, t) {
  const r = W(n),
    s = {
      requestType: "EMAIL_SIGNIN",
      email: e,
      clientType: "CLIENT_TYPE_WEB",
    };
  function i(a, c) {
    l(c.handleCodeInApp, r, "argument-error"), c && ks(r, a, c);
  }
  i(s, t), await Re(r, s, "getOobCode", ys);
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
 */ function Ps(n = "", e = 10) {
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
 */ function Ns(n, e) {
  return e
    ? T(e)
    : (l(n._popupRedirectResolver, n, "argument-error"),
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
 */ class Be extends Fe {
  constructor(e) {
    super("custom", "custom"), (this.params = e);
  }
  _getIdTokenResponse(e) {
    return $(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return $(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return $(e, this._buildIdpRequest());
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
function Ds(n) {
  return xt(n.auth, new Be(n), n.bypassAuthState);
}
function Ls(n) {
  const { auth: e, user: t } = n;
  return l(t, e, "internal-error"), Ss(t, new Be(n), n.bypassAuthState);
}
async function Ms(n) {
  const { auth: e, user: t } = n;
  return l(t, e, "internal-error"), Ts(t, new Be(n), n.bypassAuthState);
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
 */ class Us {
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
    } catch (u) {
      this.reject(u);
    }
  }
  onError(e) {
    this.reject(e);
  }
  getIdpTask(e) {
    switch (e) {
      case "signInViaPopup":
      case "signInViaRedirect":
        return Ds;
      case "linkViaPopup":
      case "linkViaRedirect":
        return Ms;
      case "reauthViaPopup":
      case "reauthViaRedirect":
        return Ls;
      default:
        y(this.auth, "internal-error");
    }
  }
  resolve(e) {
    U(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.resolve(e),
      this.unregisterAndCleanUp();
  }
  reject(e) {
    U(this.pendingPromise, "Pending promise was never set"),
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
 */ const Fs = new ae(2e3, 1e4);
async function N(n, e, t) {
  const r = W(n);
  Cr(n, e, Ut);
  const s = Ns(r, t);
  return new D(r, "signInViaPopup", e, s).executeNotNull();
}
class D extends Us {
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
    return l(e, this.auth, "internal-error"), e;
  }
  async onExecution() {
    U(this.filter.length === 1, "Popup operations only handle one event");
    const e = Ps();
    (this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      e,
    )),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch((t) => {
        this.reject(t);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (t) => {
        t || this.reject(V(this.auth, "web-storage-unsupported"));
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
    this.reject(V(this.auth, "cancelled-popup-request"));
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
        this.pollId = window.setTimeout(() => {
          (this.pollId = null),
            this.reject(V(this.auth, "popup-closed-by-user"));
        }, 8e3);
        return;
      }
      this.pollId = window.setTimeout(e, Fs.get());
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
 */ new ae(3e4, 6e4);
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
 */ new ae(5e3, 15e3);
var ct = "@firebase/auth",
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
 */ class xs {
  constructor(e) {
    (this.auth = e), (this.internalListeners = new Map());
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
    l(
      this.auth._initializationPromise,
      "dependent-sdk-initialized-before-auth",
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
 */ function Bs(n) {
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
function Vs(n) {
  Q(
    new X(
      "auth",
      (e, { options: t }) => {
        const r = e.getProvider("app").getImmediate(),
          s = e.getProvider("heartbeat"),
          i = e.getProvider("app-check-internal"),
          { apiKey: a, authDomain: c } = r.options;
        l(a && !a.includes(":"), "invalid-api-key", { appName: r.name });
        const o = {
            apiKey: a,
            authDomain: c,
            clientPlatform: n,
            apiHost: "identitytoolkit.googleapis.com",
            tokenApiHost: "securetoken.googleapis.com",
            apiScheme: "https",
            sdkClientVersion: Mt(n),
          },
          u = new os(r, s, i, o);
        return ps(u, t), u;
      },
      "PUBLIC",
    )
      .setInstantiationMode("EXPLICIT")
      .setInstanceCreatedCallback((e, t, r) => {
        e.getProvider("auth-internal").initialize();
      }),
  ),
    Q(
      new X(
        "auth-internal",
        (e) => {
          const t = W(e.getProvider("auth").getImmediate());
          return ((r) => new xs(r))(t);
        },
        "PRIVATE",
      ).setInstantiationMode("EXPLICIT"),
    ),
    z(ct, ut, Bs(n)),
    z(ct, ut, "esm2017");
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
 */ const Hs = 5 * 60;
fn("authIdTokenMaxAge");
Vs("Browser");
const $s = (n) => {
    const e = B(n),
      [t, r] = d.useState("ready");
    return (
      d.useEffect(
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
                u = await Rs(n, c, o);
              return r("authenticated"), u;
            }
            case "link": {
              const { email: c, actionCodeSetting: o } = i;
              await Os(n, c, o), r("awaiting");
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
  js = (n) => {
    const e = B(n),
      [t, r] = d.useState("ready");
    return (
      d.useEffect(() => {
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
                r("loading"), await Y.sendEmailVerification(e, i), r("done");
              }
            : async () => {},
      }
    );
  },
  Ws = (n, { name: e, httpsCallableOptions: t }) => {
    const [r, s] = d.useState("ready");
    return {
      state: r,
      invoke: async (a = {}) => {
        s("loading");
        const c = jt.httpsCallable(n, e, t).call(a);
        return s("done"), c;
      },
    };
  },
  Ks = (n) => {
    const [e, t] = d.useState("ready");
    return {
      state: e,
      dispatch: async (s, i) => {
        t("loading");
        const a = await x.uploadBytes(n, s, i);
        return t("done"), a;
      },
    };
  },
  Gs = (n) => {
    const [e, t] = d.useState("ready");
    return {
      state: e,
      dispatch: async (s, i) => {
        const a = x.uploadBytesResumable(n, s, i);
        a.on("state_changed", (o) => {
          t([o.bytesTransferred, o.totalBytes]);
        });
        const c = await a;
        return t("done"), c;
      },
    };
  },
  Bt = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState(void 0);
    return {
      state: e,
      dispatch: async () => {
        t("loading");
        const a = await x.getDownloadURL(n);
        return t("done"), s(r), a;
      },
      link: r,
    };
  },
  qs = ({
    reference: n,
    onLoading: e = () => p.jsx(p.Fragment, {}),
    onDone: t,
  }) => {
    const { link: r, state: s, dispatch: i } = Bt(n);
    return (
      d.useEffect(() => {
        i();
      }, [i]),
      s === "done" ? t(r) : e()
    );
  },
  zs = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState(void 0);
    return {
      blob: r,
      state: e,
      dispatch: async (a) => {
        t("loading");
        const c = await x.getBlob(n, a);
        return t("done"), s(c), c;
      },
    };
  },
  Js = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState(void 0);
    return {
      bytes: r,
      state: e,
      dispatch: async (a) => {
        t("loading");
        const c = await x.getBytes(n, a);
        return t("done"), s(c), c;
      },
    };
  },
  Ys = (n) => {
    const [e, t] = d.useState("ready");
    return {
      state: e,
      dispatch: async () => {
        t("loading"), await x.deleteObject(n), t("done");
      },
    };
  },
  Vt = (n) => {
    const [e, t] = d.useState("ready"),
      [r, s] = d.useState(void 0);
    return {
      metadata: r,
      state: e,
      dispatch: async () => {
        t("loading");
        const a = await x.getMetadata(n);
        return t("done"), s(a), a;
      },
    };
  },
  Xs = ({
    reference: n,
    onLoading: e = () => p.jsx(p.Fragment, {}),
    onDone: t,
  }) => {
    const { metadata: r, state: s, dispatch: i } = Vt(n);
    return (
      d.useEffect(() => {
        i();
      }, [i]),
      s === "done" ? t(r) : e()
    );
  };
exports.AuthorizationZone = rn;
exports.FirebaseAppContext = lt;
exports.FirebaseAuthContext = ft;
exports.FirebaseAuthProvider = Xt;
exports.FirebaseFunctionsContext = pt;
exports.FirebaseFunctionsProvider = Qt;
exports.FirebaseProvider = Jt;
exports.FirebaseStorageContext = gt;
exports.FirebaseStorageProvider = Zt;
exports.FirestoreContext = ht;
exports.FirestoreDocument = zt;
exports.FirestoreProvider = Yt;
exports.SignOut = en;
exports.StorageDownloadLink = qs;
exports.StorageMetadata = Xs;
exports.Validators = _t;
exports.useAddDocument = Kt;
exports.useCallFunction = Ws;
exports.useCollection = Wt;
exports.useDeleteDocument = qt;
exports.useDeleteFile = Ys;
exports.useDeleteUser = nn;
exports.useDocument = dt;
exports.useDownloadBlob = zs;
exports.useDownloadBytes = Js;
exports.useDownloadLink = Bt;
exports.useFileMetadata = Vt;
exports.useSendEmailVerification = js;
exports.useSetDocument = Gt;
exports.useSignIn = $s;
exports.useSignOut = mt;
exports.useSignUp = tn;
exports.useUploadFile = Ks;
exports.useUploadFileResumable = Gs;
exports.useUser = B;
//# sourceMappingURL=index.cjs.js.map

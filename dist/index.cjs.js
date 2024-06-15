"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const b = require("firebase/app"),
  f = require("firebase/firestore"),
  c = require("react"),
  l = require("react/jsx-runtime"),
  g = require("firebase/auth"),
  y = require("@firebase/auth"),
  k = require("firebase/functions"),
  p = require("firebase/storage"),
  j = (
    e,
    { listen: s, listenToMetadataChanges: t } = {
      listen: !1,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [n, a] = c.useState(!0),
      [r, o] = c.useState(),
      [i, u] = c.useState();
    return (
      c.useEffect(() => {
        if ((a(!0), s))
          return f.onSnapshot(
            e,
            { includeMetadataChanges: t },
            (h) => {
              o(h), a(!1);
            },
            (h) => u(h),
            () => a(!1),
          );
        f.getDocs(e)
          .then((d) => {
            o(d), a(!1);
          })
          .catch((d) => {
            if (d instanceof b.FirebaseError) u(d), a(!1);
            else throw (a(!1), d);
          })
          .finally(() => a(!1));
      }, [e, s, t]),
      { loading: n, snapshot: r, error: i }
    );
  },
  m = (
    e,
    { listen: s, listenToMetadataChanges: t } = {
      listen: !0,
      listenToMetadataChanges: !1,
    },
  ) => {
    const [n, a] = c.useState(!0),
      [r, o] = c.useState(),
      [i, u] = c.useState();
    return (
      c.useEffect(() => {
        if ((a(!0), s))
          return f.onSnapshot(
            e,
            { includeMetadataChanges: t },
            (h) => {
              o(h), a(!1);
            },
            (h) => u(h),
            () => a(!1),
          );
        f.getDoc(e)
          .then((d) => {
            o(d), a(!1);
          })
          .catch((d) => {
            if (d instanceof b.FirebaseError) u(d), a(!1);
            else throw (a(!1), d);
          })
          .finally(() => a(!1));
      }, [e, s, t]),
      { loading: n, snapshot: r, error: i }
    );
  },
  U = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState(),
      [r, o] = c.useState();
    return {
      state: s,
      dispatch: async (u) => {
        t("loading");
        try {
          const d = await f.addDoc(e, u);
          return a(d), t("done"), d;
        } catch (d) {
          if (d instanceof b.FirebaseError) {
            o(d), t("ready");
            return;
          } else throw (t("ready"), d);
        }
      },
      reference: n,
      error: r,
    };
  },
  B = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState();
    return {
      state: s,
      dispatch: async (o, i) => {
        t("loading");
        try {
          await (i ? f.setDoc(e, o, i) : f.setDoc(e, o)), t("done");
        } catch (u) {
          if (u instanceof b.FirebaseError) t("ready"), a(u);
          else throw (t("loading"), u);
          return;
        }
        t("done");
      },
      error: n,
    };
  },
  I = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState();
    return {
      state: s,
      dispatch: async () => {
        t("loading");
        try {
          await f.deleteDoc(e), t("done");
        } catch (o) {
          if (o instanceof b.FirebaseError) t("ready"), a(o);
          else throw (t("ready"), o);
        }
      },
      error: n,
    };
  },
  O = ({
    reference: e,
    onLoading: s = () => l.jsx(l.Fragment, {}),
    onError: t = (r) => l.jsx(l.Fragment, {}),
    onDone: n,
    listen: a = !1,
  }) => {
    const { loading: r, snapshot: o, error: i } = m(e, { listen: a });
    return r ? s() : i ? t(i) : n(o);
  },
  F = c.createContext(void 0),
  M = ({ app: e, children: s }) => l.jsx(F.Provider, { value: e, children: s }),
  w = c.createContext(void 0),
  W = ({ firestore: e, children: s }) =>
    l.jsx(w.Provider, { value: e, children: s }),
  v = c.createContext(void 0),
  L = ({ auth: e, children: s }) =>
    l.jsx(v.Provider, { value: e, children: s }),
  D = c.createContext(void 0),
  V = ({ functions: e, children: s }) =>
    l.jsx(D.Provider, { value: e, children: s }),
  P = c.createContext(void 0),
  q = ({ storage: e, children: s }) =>
    l.jsx(P.Provider, { value: e, children: s }),
  S = (
    e,
    { onError: s, onChange: t } = { onError: () => {}, onChange: () => {} },
  ) => {
    const [n, a] = c.useState(e.currentUser);
    return (
      c.useEffect(() => g.onAuthStateChanged(e, (o) => a(o), s, t), [e, s, t]),
      n
    );
  },
  x = (
    e,
    { onError: s, onlyRealAnon: t } = { onError: () => {}, onlyRealAnon: !1 },
  ) => {
    const [n, a] = c.useState("ready"),
      r = S(e, { onError: s });
    return (
      c.useEffect(() => {
        t ? r || a("anonymous") : (!r || r.isAnonymous) && a("anonymous");
      }, [r, t]),
      {
        state: n,
        dispatch:
          n === "ready"
            ? async () => {
                a("loading"), await e.signOut(), a("anonymous");
              }
            : async () => {},
      }
    );
  },
  R = ({
    auth: e,
    onlyRealAnon: s = !1,
    onReady: t,
    onLoading: n,
    onAnonymous: a,
  }) => {
    const { state: r, dispatch: o } = x(e, { onlyRealAnon: s });
    switch (r) {
      case "ready":
        return t ? t(o) : l.jsx("button", { onClick: o, children: "Sign Out" });
      case "loading":
        return n ? n() : l.jsx(l.Fragment, {});
      case "anonymous":
        return a ? a() : l.jsx(l.Fragment, {});
    }
  },
  T = (e) => {
    const s = S(e),
      [t, n] = c.useState("ready");
    return (
      c.useEffect(() => {
        n(s ? (s.isAnonymous ? "ready" : "authenticated") : "ready");
      }, [s]),
      {
        state: t,
        dispatch:
          t === "ready"
            ? async (r, o) => {
                n("loading");
                const i = await g.createUserWithEmailAndPassword(e, r, o);
                return n("authenticated"), i;
              }
            : async () => {},
      }
    );
  },
  z = (e, { includeFirebaseAnon: s } = { includeFirebaseAnon: !1 }) => {
    const t = S(e),
      [n, a] = c.useState("ready");
    return (
      c.useEffect(() => {
        a(
          t
            ? t.isAnonymous
              ? s
                ? "ready"
                : "anonymous"
              : "ready"
            : "anonymous",
        );
      }, [t, s]),
      {
        state: n,
        dispatch:
          n === "ready"
            ? async () => {
                t &&
                  (a("loading"),
                  await g.deleteUser(t),
                  await g.signOut(e),
                  a("anonymous"));
              }
            : async () => {},
      }
    );
  },
  Z = ({
    auth: e,
    validator: s = E.isAuthenticated(),
    onSuccess: t,
    onFailure: n = () => l.jsx(l.Fragment, {}),
  }) => {
    const a = S(e),
      [r, o] = c.useState(!1);
    return (
      c.useEffect(() => {
        const i = s(a);
        i instanceof Promise ? i.then(o) : o(i);
      }, [a, s]),
      r ? t(a) : n(a)
    );
  },
  E = {
    isAuthenticated:
      (e = !1) =>
      (s) =>
        s ? (e ? !0 : !s.isAnonymous) : !1,
    isAnonymous:
      (e = !1) =>
      (s) =>
        s ? (e ? !1 : s.isAnonymous) : !0,
    isVerified: () => (e) => (e == null ? void 0 : e.emailVerified) ?? !1,
    every: (e) => async (s) => {
      const t = e.map((o) => o(s)),
        n = t.filter((o) => typeof o == "boolean"),
        a = t.filter((o) => o instanceof Promise),
        r = await Promise.all(a);
      return [...n, ...r].every((o) => o);
    },
    some: (e) => async (s) => {
      const t = e.map((o) => o(s)),
        n = t.filter((o) => typeof o == "boolean"),
        a = t.filter((o) => o instanceof Promise),
        r = await Promise.all(a);
      return [...n, ...r].some((o) => o);
    },
  },
  _ = (e) => {
    const s = S(e),
      [t, n] = c.useState("ready");
    return (
      c.useEffect(
        () => (
          n(s ? (s.isAnonymous ? "ready" : "authenticated") : "ready"),
          () => n("ready")
        ),
        [s],
      ),
      {
        state: t,
        dispatch: async (r) => {
          n("loading");
          const { type: o } = r;
          switch (o) {
            case "classic": {
              const { email: i, password: u } = r,
                d = await y.signInWithEmailAndPassword(e, i, u);
              return n("authenticated"), d;
            }
            case "link": {
              const { email: i, actionCodeSetting: u } = r;
              await y.sendSignInLinkToEmail(e, i, u), n("awaiting");
              return;
            }
            case "google": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), n("authenticated"), u;
            }
            case "facebook": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), n("authenticated"), u;
            }
            case "apple": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), u;
            }
            case "twitter": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), u;
            }
            case "github": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), u;
            }
            case "microsoft": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), u;
            }
            case "yahoo": {
              const { provider: i } = r,
                u = await y.signInWithPopup(e, i);
              return n("authenticated"), u;
            }
          }
        },
      }
    );
  },
  G = (e) => {
    const s = S(e),
      [t, n] = c.useState("ready");
    return (
      c.useEffect(() => {
        if (!s) {
          n("anonymous");
          return;
        }
      }, [s]),
      {
        state: t,
        dispatch:
          t === "ready"
            ? async (r) => {
                n("loading"), await g.sendEmailVerification(s, r), n("done");
              }
            : async () => {},
      }
    );
  },
  H = (e, { name: s, httpsCallableOptions: t }) => {
    const [n, a] = c.useState("ready");
    return {
      state: n,
      invoke: async (o = {}) => {
        a("loading");
        const i = k.httpsCallable(e, s, t).call(o);
        return a("done"), i;
      },
    };
  },
  J = (e) => {
    const [s, t] = c.useState("ready");
    return {
      state: s,
      dispatch: async (a, r) => {
        t("loading");
        const o = await p.uploadBytes(e, a, r);
        return t("done"), o;
      },
    };
  },
  K = (e) => {
    const [s, t] = c.useState("ready");
    return {
      state: s,
      dispatch: async (a, r) => {
        const o = p.uploadBytesResumable(e, a, r);
        o.on("state_changed", (u) => {
          t([u.bytesTransferred, u.totalBytes]);
        });
        const i = await o;
        return t("done"), i;
      },
    };
  },
  C = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState(void 0);
    return {
      state: s,
      dispatch: async () => {
        t("loading");
        const o = await p.getDownloadURL(e);
        return t("done"), a(n), o;
      },
      link: n,
    };
  },
  N = ({
    reference: e,
    onLoading: s = () => l.jsx(l.Fragment, {}),
    onDone: t,
  }) => {
    const { link: n, state: a, dispatch: r } = C(e);
    return (
      c.useEffect(() => {
        r();
      }, [r]),
      a === "done" ? t(n) : s()
    );
  },
  Q = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState(void 0);
    return {
      blob: n,
      state: s,
      dispatch: async (o) => {
        t("loading");
        const i = await p.getBlob(e, o);
        return t("done"), a(i), i;
      },
    };
  },
  X = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState(void 0);
    return {
      bytes: n,
      state: s,
      dispatch: async (o) => {
        t("loading");
        const i = await p.getBytes(e, o);
        return t("done"), a(i), i;
      },
    };
  },
  Y = (e) => {
    const [s, t] = c.useState("ready");
    return {
      state: s,
      dispatch: async () => {
        t("loading"), await p.deleteObject(e), t("done");
      },
    };
  },
  A = (e) => {
    const [s, t] = c.useState("ready"),
      [n, a] = c.useState(void 0);
    return {
      metadata: n,
      state: s,
      dispatch: async () => {
        t("loading");
        const o = await p.getMetadata(e);
        return t("done"), a(o), o;
      },
    };
  },
  $ = ({
    reference: e,
    onLoading: s = () => l.jsx(l.Fragment, {}),
    onDone: t,
  }) => {
    const { metadata: n, state: a, dispatch: r } = A(e);
    return (
      c.useEffect(() => {
        r();
      }, [r]),
      a === "done" ? t(n) : s()
    );
  };
exports.AuthorizationZone = Z;
exports.FirebaseAppContext = F;
exports.FirebaseAuthContext = v;
exports.FirebaseAuthProvider = L;
exports.FirebaseFunctionsContext = D;
exports.FirebaseFunctionsProvider = V;
exports.FirebaseProvider = M;
exports.FirebaseStorageContext = P;
exports.FirebaseStorageProvider = q;
exports.FirestoreContext = w;
exports.FirestoreDocument = O;
exports.FirestoreProvider = W;
exports.SignOut = R;
exports.StorageDownloadLink = N;
exports.StorageMetadata = $;
exports.Validators = E;
exports.useAddDocument = U;
exports.useCallFunction = H;
exports.useCollection = j;
exports.useDeleteDocument = I;
exports.useDeleteFile = Y;
exports.useDeleteUser = z;
exports.useDocument = m;
exports.useDownloadBlob = Q;
exports.useDownloadBytes = X;
exports.useDownloadLink = C;
exports.useFileMetadata = A;
exports.useSendEmailVerification = G;
exports.useSetDocument = B;
exports.useSignIn = _;
exports.useSignOut = x;
exports.useSignUp = T;
exports.useUploadFile = J;
exports.useUploadFileResumable = K;
exports.useUser = S;
//# sourceMappingURL=index.cjs.js.map

import { FirebaseError as m } from "firebase/app";
import { onSnapshot as S, getDocs as b, getDoc as F, addDoc as D, setDoc as v, deleteDoc as P } from "firebase/firestore";
import { useState as d, useEffect as y, createContext as w } from "react";
import { jsx as l, Fragment as p } from "react/jsx-runtime";
import { onAuthStateChanged as A, createUserWithEmailAndPassword as k, deleteUser as C, signOut as E, sendEmailVerification as U } from "firebase/auth";
import { signInWithPopup as f, sendSignInLinkToEmail as B, signInWithEmailAndPassword as x } from "@firebase/auth";
import { httpsCallable as O } from "firebase/functions";
import { uploadBytes as L, uploadBytesResumable as M, getDownloadURL as V, getBlob as I, getBytes as R, deleteObject as W, getMetadata as j } from "firebase/storage";
const at = (t, { listen: s, listenToMetadataChanges: e } = {
  listen: !1,
  listenToMetadataChanges: !1
}) => {
  const [n, a] = d(!0), [r, o] = d(), [c, i] = d();
  return y(() => {
    if (a(!0), s)
      return S(
        t,
        { includeMetadataChanges: e },
        (h) => {
          o(h), a(!1);
        },
        (h) => i(h),
        () => a(!1)
      );
    b(t).then((u) => {
      o(u), a(!1);
    }).catch((u) => {
      if (u instanceof m)
        i(u), a(!1);
      else
        throw a(!1), u;
    }).finally(() => a(!1));
  }, [t, s, e]), { loading: n, snapshot: r, error: c };
}, T = (t, { listen: s, listenToMetadataChanges: e } = {
  listen: !0,
  listenToMetadataChanges: !1
}) => {
  const [n, a] = d(!0), [r, o] = d(), [c, i] = d();
  return y(() => {
    if (a(!0), s)
      return S(
        t,
        { includeMetadataChanges: e },
        (h) => {
          o(h), a(!1);
        },
        (h) => i(h),
        () => a(!1)
      );
    F(t).then((u) => {
      o(u), a(!1);
    }).catch((u) => {
      if (u instanceof m)
        i(u), a(!1);
      else
        throw a(!1), u;
    }).finally(() => a(!1));
  }, [t, s, e]), { loading: n, snapshot: r, error: c };
}, ot = (t) => {
  const [s, e] = d("ready"), [n, a] = d(), [r, o] = d();
  return { state: s, dispatch: async (i) => {
    e("loading");
    try {
      const u = await D(t, i);
      return a(u), e("done"), u;
    } catch (u) {
      if (u instanceof m) {
        o(u), e("ready");
        return;
      } else
        throw e("ready"), u;
    }
  }, reference: n, error: r };
}, rt = (t) => {
  const [s, e] = d("ready"), [n, a] = d();
  return { state: s, dispatch: async (o, c) => {
    e("loading");
    try {
      await (c ? v(t, o, c) : v(t, o)), e("done");
    } catch (i) {
      if (i instanceof m)
        e("ready"), a(i);
      else
        throw e("loading"), i;
      return;
    }
    e("done");
  }, error: n };
}, ct = (t) => {
  const [s, e] = d("ready"), [n, a] = d();
  return { state: s, dispatch: async () => {
    e("loading");
    try {
      await P(t), e("done");
    } catch (o) {
      if (o instanceof m)
        e("ready"), a(o);
      else
        throw e("ready"), o;
    }
  }, error: n };
}, it = ({
  reference: t,
  onLoading: s = () => /* @__PURE__ */ l(p, {}),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: e = (r) => /* @__PURE__ */ l(p, {}),
  onDone: n,
  listen: a = !1
}) => {
  const {
    loading: r,
    snapshot: o,
    error: c
  } = T(t, { listen: a });
  return r ? s() : c ? e(c) : n(o);
}, _ = w(
  void 0
), dt = ({ app: t, children: s }) => /* @__PURE__ */ l(_.Provider, { value: t, children: s }), z = w(void 0), ut = ({
  firestore: t,
  children: s
}) => /* @__PURE__ */ l(z.Provider, { value: t, children: s }), Z = w(void 0), lt = ({
  auth: t,
  children: s
}) => /* @__PURE__ */ l(Z.Provider, { value: t, children: s }), G = w(
  void 0
), yt = ({
  functions: t,
  children: s
}) => /* @__PURE__ */ l(G.Provider, { value: t, children: s }), H = w(void 0), ht = ({
  storage: t,
  children: s
}) => /* @__PURE__ */ l(H.Provider, { value: t, children: s }), g = (t, { onError: s, onChange: e } = {
  onError: () => {
  },
  onChange: () => {
  }
}) => {
  const [n, a] = d(t.currentUser);
  return y(() => A(
    t,
    (o) => a(o),
    s,
    e
  ), [t, s, e]), n;
}, J = (t, { onError: s, onlyRealAnon: e } = {
  onError: () => {
  },
  onlyRealAnon: !1
}) => {
  const [n, a] = d("ready"), r = g(t, { onError: s });
  return y(() => {
    e ? r || a("anonymous") : (!r || r.isAnonymous) && a("anonymous");
  }, [r, e]), { state: n, dispatch: n === "ready" ? async () => {
    a("loading"), await t.signOut(), a("anonymous");
  } : async () => {
  } };
}, ft = ({
  auth: t,
  onlyRealAnon: s = !1,
  onReady: e,
  onLoading: n,
  onAnonymous: a
}) => {
  const { state: r, dispatch: o } = J(t, { onlyRealAnon: s });
  switch (r) {
    case "ready":
      return e ? e(o) : /* @__PURE__ */ l("button", { onClick: o, children: "Sign Out" });
    case "loading":
      return n ? n() : /* @__PURE__ */ l(p, {});
    case "anonymous":
      return a ? a() : /* @__PURE__ */ l(p, {});
  }
}, pt = (t) => {
  const s = g(t), [e, n] = d("ready");
  return y(() => {
    n(s ? s.isAnonymous ? "ready" : "authenticated" : "ready");
  }, [s]), {
    state: e,
    dispatch: e === "ready" ? async (r, o) => {
      n("loading");
      const c = await k(
        t,
        r,
        o
      );
      return n("authenticated"), c;
    } : async () => {
    }
  };
}, gt = (t, { includeFirebaseAnon: s } = {
  includeFirebaseAnon: !1
}) => {
  const e = g(t), [n, a] = d("ready");
  return y(() => {
    a(
      e ? e.isAnonymous ? s ? "ready" : "anonymous" : "ready" : "anonymous"
    );
  }, [e, s]), {
    state: n,
    dispatch: n === "ready" ? async () => {
      e && (a("loading"), await C(e), await E(t), a("anonymous"));
    } : async () => {
    }
  };
}, mt = ({
  auth: t,
  validator: s = K.isAuthenticated(),
  onSuccess: e,
  onFailure: n = () => /* @__PURE__ */ l(p, {})
}) => {
  const a = g(t), [r, o] = d(!1);
  return y(() => {
    const c = s(a);
    c instanceof Promise ? c.then(o) : o(c);
  }, [a, s]), r ? e(a) : n(a);
}, K = {
  isAuthenticated: (t = !1) => (s) => s ? t ? !0 : !s.isAnonymous : !1,
  isAnonymous: (t = !1) => (s) => s ? t ? !1 : s.isAnonymous : !0,
  isVerified: () => (t) => (t == null ? void 0 : t.emailVerified) ?? !1,
  every: (t) => async (s) => {
    const e = t.map((o) => o(s)), n = e.filter((o) => typeof o == "boolean"), a = e.filter((o) => o instanceof Promise), r = await Promise.all(a);
    return [...n, ...r].every((o) => o);
  },
  some: (t) => async (s) => {
    const e = t.map((o) => o(s)), n = e.filter((o) => typeof o == "boolean"), a = e.filter((o) => o instanceof Promise), r = await Promise.all(a);
    return [...n, ...r].some((o) => o);
  }
}, wt = (t) => {
  const s = g(t), [e, n] = d("ready");
  return y(() => (n(s ? s.isAnonymous ? "ready" : "authenticated" : "ready"), () => n("ready")), [s]), { state: e, dispatch: async (r) => {
    n("loading");
    const { type: o } = r;
    switch (o) {
      case "classic": {
        const { email: c, password: i } = r, u = await x(
          t,
          c,
          i
        );
        return n("authenticated"), u;
      }
      case "link": {
        const { email: c, actionCodeSetting: i } = r;
        await B(t, c, i), n("awaiting");
        return;
      }
      case "google": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), n("authenticated"), i;
      }
      case "facebook": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), n("authenticated"), i;
      }
      case "apple": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), i;
      }
      case "twitter": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), i;
      }
      case "github": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), i;
      }
      case "microsoft": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), i;
      }
      case "yahoo": {
        const { provider: c } = r, i = await f(t, c);
        return n("authenticated"), i;
      }
    }
  } };
}, vt = (t) => {
  const s = g(t), [e, n] = d("ready");
  return y(() => {
    if (!s) {
      n("anonymous");
      return;
    }
  }, [s]), { state: e, dispatch: e === "ready" ? async (r) => {
    n("loading"), await U(
      s,
      // guaranteed user not null on ready
      r
    ), n("done");
  } : async () => {
  } };
}, St = (t, { name: s, httpsCallableOptions: e }) => {
  const [n, a] = d("ready");
  return { state: n, invoke: async (o = {}) => {
    a("loading");
    const c = O(t, s, e).call(o);
    return a("done"), c;
  } };
}, bt = (t) => {
  const [s, e] = d("ready");
  return { state: s, dispatch: async (a, r) => {
    e("loading");
    const o = await L(t, a, r);
    return e("done"), o;
  } };
}, Ft = (t) => {
  const [s, e] = d("ready");
  return { state: s, dispatch: async (a, r) => {
    const o = M(t, a, r);
    o.on("state_changed", (i) => {
      e([i.bytesTransferred, i.totalBytes]);
    });
    const c = await o;
    return e("done"), c;
  } };
}, N = (t) => {
  const [s, e] = d("ready"), [n, a] = d(void 0);
  return { state: s, dispatch: async () => {
    e("loading");
    const o = await V(t);
    return e("done"), a(n), o;
  }, link: n };
}, Dt = ({
  reference: t,
  onLoading: s = () => /* @__PURE__ */ l(p, {}),
  onDone: e
}) => {
  const { link: n, state: a, dispatch: r } = N(t);
  return y(() => {
    r();
  }, [r]), a === "done" ? e(n) : s();
}, Pt = (t) => {
  const [s, e] = d("ready"), [n, a] = d(void 0);
  return { blob: n, state: s, dispatch: async (o) => {
    e("loading");
    const c = await I(t, o);
    return e("done"), a(c), c;
  } };
}, At = (t) => {
  const [s, e] = d("ready"), [n, a] = d(void 0);
  return { bytes: n, state: s, dispatch: async (o) => {
    e("loading");
    const c = await R(t, o);
    return e("done"), a(c), c;
  } };
}, kt = (t) => {
  const [s, e] = d("ready");
  return { state: s, dispatch: async () => {
    e("loading"), await W(t), e("done");
  } };
}, Q = (t) => {
  const [s, e] = d("ready"), [n, a] = d(void 0);
  return { metadata: n, state: s, dispatch: async () => {
    e("loading");
    const o = await j(t);
    return e("done"), a(o), o;
  } };
}, Ct = ({
  reference: t,
  onLoading: s = () => /* @__PURE__ */ l(p, {}),
  onDone: e
}) => {
  const { metadata: n, state: a, dispatch: r } = Q(t);
  return y(() => {
    r();
  }, [r]), a === "done" ? e(n) : s();
};
export {
  mt as AuthorizationZone,
  _ as FirebaseAppContext,
  Z as FirebaseAuthContext,
  lt as FirebaseAuthProvider,
  G as FirebaseFunctionsContext,
  yt as FirebaseFunctionsProvider,
  dt as FirebaseProvider,
  H as FirebaseStorageContext,
  ht as FirebaseStorageProvider,
  z as FirestoreContext,
  it as FirestoreDocument,
  ut as FirestoreProvider,
  ft as SignOut,
  Dt as StorageDownloadLink,
  Ct as StorageMetadata,
  K as Validators,
  ot as useAddDocument,
  St as useCallFunction,
  at as useCollection,
  ct as useDeleteDocument,
  kt as useDeleteFile,
  gt as useDeleteUser,
  T as useDocument,
  Pt as useDownloadBlob,
  At as useDownloadBytes,
  N as useDownloadLink,
  Q as useFileMetadata,
  vt as useSendEmailVerification,
  rt as useSetDocument,
  wt as useSignIn,
  J as useSignOut,
  pt as useSignUp,
  bt as useUploadFile,
  Ft as useUploadFileResumable,
  g as useUser
};
//# sourceMappingURL=index.es.js.map

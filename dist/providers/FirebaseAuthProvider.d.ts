import { Auth } from "firebase/auth";
import { NodeComponent } from "../types";
export declare const FirebaseAuthContext: import("react").Context<Auth | undefined>;
type FirebaseAuthProviderProps = {
    auth: Auth;
} & NodeComponent;
export declare const FirebaseAuthProvider: ({ auth, children, }: FirebaseAuthProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

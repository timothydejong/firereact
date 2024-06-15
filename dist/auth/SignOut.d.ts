import { Auth } from "firebase/auth";
import { ReactNode } from "react";
import { UseSignOutDispatcher } from ".";
type SignOutProps = {
    auth: Auth;
    onlyRealAnon?: boolean;
    onReady?: (dispatch: UseSignOutDispatcher) => ReactNode;
    onLoading?: () => ReactNode;
    onAnonymous?: () => ReactNode;
};
export declare const SignOut: ({ auth, onlyRealAnon, onReady, onLoading, onAnonymous, }: SignOutProps) => string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export {};

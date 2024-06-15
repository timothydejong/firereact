import { ActionCodeSettings, Auth } from "firebase/auth";
type UseSendEmailVerificationState = "ready" | "loading" | "done" | "anonymous";
type UseSendEmailVerificationDispatcher = (actionCodeSettings?: ActionCodeSettings) => Promise<void>;
type UseSendEmailVerification = {
    state: UseSendEmailVerificationState;
    dispatch: UseSendEmailVerificationDispatcher;
};
export declare const useSendEmailVerification: (auth: Auth) => UseSendEmailVerification;
export {};

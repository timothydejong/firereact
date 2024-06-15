import { Auth, CompleteFn, ErrorFn, User } from "firebase/auth";
type UseAuthStateOptions = {
    onError?: ErrorFn;
    onChange?: CompleteFn;
};
export declare const useUser: (auth: Auth, { onError, onChange }?: UseAuthStateOptions) => User | null;
export {};

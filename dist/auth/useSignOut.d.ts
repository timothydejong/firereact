import { Auth } from "firebase/auth";
type UseSignOutParams = {
  onError?: (error: Error) => void;
  onlyRealAnon?: boolean;
};
type UseSignOutState = "ready" | "loading" | "anonymous";
export type UseSignOutDispatcher = () => Promise<void>;
type UseSignOut = {
  state: UseSignOutState;
  dispatch: UseSignOutDispatcher;
};
export declare const useSignOut: (
  auth: Auth,
  { onError, onlyRealAnon }?: UseSignOutParams,
) => UseSignOut;
export {};

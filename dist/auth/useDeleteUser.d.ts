import { Auth } from "firebase/auth";
type UseDeleteUserOptions = {
  includeFirebaseAnon?: boolean;
};
type UseDeleteUserState = "ready" | "loading" | "anonymous";
type UseDeleteUserDispatcher = () => Promise<void>;
type UseDeleteUser = {
  state: UseDeleteUserState;
  dispatch: UseDeleteUserDispatcher;
};
export declare const useDeleteUser: (
  auth: Auth,
  { includeFirebaseAnon }?: UseDeleteUserOptions,
) => UseDeleteUser;
export {};

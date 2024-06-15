import { Auth, UserCredential } from "firebase/auth";
type UseSignUpState = "ready" | "loading" | "authenticated";
type UseSignUpDispatcher = (
  email: string,
  password: string,
) => Promise<UserCredential | undefined>;
type UseSignUp = {
  state: UseSignUpState;
  dispatch: UseSignUpDispatcher;
};
export declare const useSignUp: (auth: Auth) => UseSignUp;
export {};

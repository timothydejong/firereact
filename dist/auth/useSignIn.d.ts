import {
  Auth,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  UserCredential,
} from "@firebase/auth";
import { ActionCodeSettings } from "firebase/auth";
type UseSignInState = "ready" | "loading" | "authenticated" | "awaiting";
type UseSignInDispatcher = (
  params:
    | {
        type: "classic";
        email: string;
        password: string;
      }
    | {
        type: "link";
        email: string;
        actionCodeSetting: ActionCodeSettings;
      }
    | {
        type: "google";
        provider: GoogleAuthProvider;
      }
    | {
        type: "facebook";
        provider: FacebookAuthProvider;
      }
    | {
        type: "apple" | "microsoft" | "yahoo";
        provider: OAuthProvider;
      }
    | {
        type: "twitter";
        provider: TwitterAuthProvider;
      }
    | {
        type: "github";
        provider: GithubAuthProvider;
      },
) => Promise<UserCredential | undefined>;
type UseSignIn = {
  state: UseSignInState;
  dispatch: UseSignInDispatcher;
};
export declare const useSignIn: (auth: Auth) => UseSignIn;
export {};

import { FirebaseApp } from "firebase/app";
import { NodeComponent } from "../types";
export declare const FirebaseAppContext: import("react").Context<
  FirebaseApp | undefined
>;
type FirebaseProviderProps = {
  app: FirebaseApp;
} & NodeComponent;
export declare const FirebaseProvider: ({
  app,
  children,
}: FirebaseProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

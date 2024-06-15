import { Firestore } from "firebase/firestore";
import { NodeComponent } from "../types";
export declare const FirestoreContext: import("react").Context<
  Firestore | undefined
>;
type FirestoreProviderProps = {
  firestore: Firestore;
} & NodeComponent;
export declare const FirestoreProvider: ({
  firestore,
  children,
}: FirestoreProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

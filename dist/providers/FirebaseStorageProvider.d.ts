import { FirebaseStorage } from "firebase/storage";
import { NodeComponent } from "../types";
export declare const FirebaseStorageContext: import("react").Context<
  FirebaseStorage | undefined
>;
type FirebaseStorageProviderProps = {
  storage: FirebaseStorage;
} & NodeComponent;
export declare const FirebaseStorageProvider: ({
  storage,
  children,
}: FirebaseStorageProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

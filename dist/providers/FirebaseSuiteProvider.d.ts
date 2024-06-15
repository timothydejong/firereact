import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { FirebaseStorage } from "firebase/storage";
import { NodeComponent } from "../types";
type FirebaseSuiteProviderProps = {
    app?: FirebaseApp;
    firestore?: Firestore;
    auth?: Auth;
    functions?: Functions;
    storage?: FirebaseStorage;
} & NodeComponent;
export declare const FirebaseSuiteProvider: ({ app, firestore, auth, functions, storage, children, }: FirebaseSuiteProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

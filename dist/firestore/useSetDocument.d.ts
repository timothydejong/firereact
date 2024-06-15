import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentReference, SetOptions } from "firebase/firestore";
type UseSetDocumentState = "ready" | "loading" | "done";
type UseSetDocumentDispatcher = (data: DocumentData, options?: SetOptions) => Promise<void>;
type UseSetDocument = {
    state: UseSetDocumentState;
    dispatch: UseSetDocumentDispatcher;
    error?: FirebaseError;
};
export declare const useSetDocument: (reference: DocumentReference) => UseSetDocument;
export {};

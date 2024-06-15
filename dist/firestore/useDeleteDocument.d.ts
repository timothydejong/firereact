import { FirebaseError } from "firebase/app";
import { DocumentReference } from "firebase/firestore";
type UseSetDocumentState = "ready" | "loading" | "done";
type UseSetDocumentDispatcher = () => Promise<void>;
type UseSetDocument = {
    state: UseSetDocumentState;
    dispatch: UseSetDocumentDispatcher;
    error?: FirebaseError;
};
export declare const useDeleteDocument: (reference: DocumentReference) => UseSetDocument;
export {};

import { FirebaseError } from "firebase/app";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
type UseAddDocumentState = "ready" | "loading" | "done";
type UseAddDocumentDispatcher = (
  data: DocumentData,
) => Promise<DocumentReference | undefined>;
type UseAddDocument = {
  state: UseAddDocumentState;
  dispatch: UseAddDocumentDispatcher;
  reference?: DocumentReference;
  error?: FirebaseError;
};
export declare const useAddDocument: (
  reference: CollectionReference,
) => UseAddDocument;
export {};

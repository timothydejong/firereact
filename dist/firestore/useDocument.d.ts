import { FirebaseError } from "firebase/app";
import { DocumentReference, DocumentSnapshot } from "firebase/firestore";
type UseDocumentOptions = {
  listen?: boolean;
  listenToMetadataChanges?: boolean;
};
type UseDocument = {
  loading: boolean;
  snapshot?: DocumentSnapshot;
  error?: FirebaseError;
};
export declare const useDocument: (
  reference: DocumentReference,
  { listen, listenToMetadataChanges }?: UseDocumentOptions,
) => UseDocument;
export {};

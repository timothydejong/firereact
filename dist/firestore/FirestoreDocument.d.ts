import { FirebaseError } from "firebase/app";
import { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import { ReactNode } from "react";
type FirestoreDocumentProps = {
  reference: DocumentReference;
  onLoading?: () => ReactNode;
  onError?: (error: FirebaseError) => ReactNode;
  onDone: (snapshot: DocumentSnapshot) => ReactNode;
  listen?: boolean;
};
export declare const FirestoreDocument: ({
  reference,
  onLoading,
  onError,
  onDone,
  listen,
}: FirestoreDocumentProps) => ReactNode;
export {};

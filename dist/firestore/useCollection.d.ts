import { FirebaseError } from "firebase/app";
import { Query, QuerySnapshot } from "firebase/firestore";
type UseCollectionOptions = {
    listen?: boolean;
    listenToMetadataChanges?: boolean;
};
type UseCollection = {
    loading: boolean;
    snapshot?: QuerySnapshot;
    error?: FirebaseError;
};
export declare const useCollection: (query: Query, { listen, listenToMetadataChanges }?: UseCollectionOptions) => UseCollection;
export {};

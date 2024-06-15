import { StorageReference } from "firebase/storage";
type UseDownloadBlobState = "ready" | "loading" | "done";
type UseDownloadBlobDispatcher = (maxDownloadSizeBytes?: number) => Promise<Blob>;
type UseDownloadBlob = {
    blob: Blob | undefined;
    state: UseDownloadBlobState;
    dispatch: UseDownloadBlobDispatcher;
};
export declare const useDownloadBlob: (reference: StorageReference) => UseDownloadBlob;
export {};

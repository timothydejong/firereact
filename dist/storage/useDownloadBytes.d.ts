import { StorageReference } from "firebase/storage";
type UseDownloadBytesState = "ready" | "loading" | "done";
type UseDownloadBytesDispatcher = (maxDownloadSizeBytes?: number) => Promise<ArrayBuffer>;
type UseDownloadBytes = {
    bytes: ArrayBuffer | undefined;
    state: UseDownloadBytesState;
    dispatch: UseDownloadBytesDispatcher;
};
export declare const useDownloadBytes: (reference: StorageReference) => UseDownloadBytes;
export {};

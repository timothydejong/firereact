/// <reference types="node" />
import { StorageReference, UploadMetadata, UploadResult } from "firebase/storage";
type UseUploadFileState = "ready" | "loading" | "done";
type UseUploadFileDispatcher = (file: Buffer | File | Blob, metadata?: UploadMetadata) => Promise<UploadResult>;
type UseUploadFile = {
    state: UseUploadFileState;
    dispatch: UseUploadFileDispatcher;
};
export declare const useUploadFile: (reference: StorageReference) => UseUploadFile;
export {};

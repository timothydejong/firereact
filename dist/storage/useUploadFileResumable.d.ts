/// <reference types="node" />
import { StorageReference, UploadMetadata, UploadResult } from "firebase/storage";
type UseUploadFileResumableState = "ready" | [number, number] | "done";
type UseUploadFileResumableDispatcher = (file: Buffer | File | Blob, metadata?: UploadMetadata) => Promise<UploadResult>;
type UseUploadFileResumable = {
    state: UseUploadFileResumableState;
    dispatch: UseUploadFileResumableDispatcher;
};
export declare const useUploadFileResumable: (reference: StorageReference) => UseUploadFileResumable;
export {};

import { StorageReference } from "firebase/storage";
type UseDeleteFileState = "ready" | "loading" | "done";
type UseDeleteFileDispatcher = () => Promise<void>;
type UseDeleteFile = {
  state: UseDeleteFileState;
  dispatch: UseDeleteFileDispatcher;
};
export declare const useDeleteFile: (
  reference: StorageReference,
) => UseDeleteFile;
export {};

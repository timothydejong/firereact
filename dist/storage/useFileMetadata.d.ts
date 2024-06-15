import { FullMetadata, StorageReference } from "firebase/storage";
type UseFileMetadataState = "ready" | "loading" | "done";
type UseFileMetadataDispatcher = () => Promise<FullMetadata>;
type UseFileMetadata = {
  metadata: FullMetadata | undefined;
  state: UseFileMetadataState;
  dispatch: UseFileMetadataDispatcher;
};
export declare const useFileMetadata: (
  reference: StorageReference,
) => UseFileMetadata;
export {};

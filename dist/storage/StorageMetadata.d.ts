import { FullMetadata, StorageReference } from "firebase/storage";
import { ReactNode } from "react";
type StorageMetadataProps = {
  reference: StorageReference;
  onLoading?: () => ReactNode;
  onDone: (metadata: FullMetadata) => ReactNode;
};
export declare const StorageMetadata: ({
  reference,
  onLoading,
  onDone,
}: StorageMetadataProps) => ReactNode;
export {};

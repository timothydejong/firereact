import { StorageReference } from "firebase/storage";
import { ReactNode } from "react";
type StorageDownloadLinkProps = {
    reference: StorageReference;
    onLoading?: () => ReactNode;
    onDone: (link: string) => ReactNode;
};
export declare const StorageDownloadLink: ({ reference, onLoading, onDone, }: StorageDownloadLinkProps) => ReactNode;
export {};

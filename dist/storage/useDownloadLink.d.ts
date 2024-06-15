import { StorageReference } from "firebase/storage";
type UseDownloadLinkState = "ready" | "loading" | "done";
type UseDownloadLinkDispatcher = () => Promise<string>;
type UseDownloadLink = {
    link: string | undefined;
    state: UseDownloadLinkState;
    dispatch: UseDownloadLinkDispatcher;
};
export declare const useDownloadLink: (reference: StorageReference) => UseDownloadLink;
export {};

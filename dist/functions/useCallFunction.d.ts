import { Functions, HttpsCallableOptions, HttpsCallableResult } from "firebase/functions";
type UseCallFunctionOptions = {
    name: string;
    httpsCallableOptions?: HttpsCallableOptions;
};
type UseCallFunctionState = "ready" | "loading" | "done";
type UseCallFunctionInvoker = (data?: unknown) => Promise<HttpsCallableResult<unknown>>;
type UseCallFunction = {
    state: UseCallFunctionState;
    invoke: UseCallFunctionInvoker;
};
export declare const useCallFunction: (functions: Functions, { name, httpsCallableOptions }: UseCallFunctionOptions) => UseCallFunction;
export {};

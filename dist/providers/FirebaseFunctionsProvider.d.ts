import { Functions } from "firebase/functions";
import { NodeComponent } from "../types";
export declare const FirebaseFunctionsContext: import("react").Context<
  Functions | undefined
>;
type FirebaseFunctionsProviderProps = {
  functions: Functions;
} & NodeComponent;
export declare const FirebaseFunctionsProvider: ({
  functions,
  children,
}: FirebaseFunctionsProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};

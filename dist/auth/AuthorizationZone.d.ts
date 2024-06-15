import { Auth, User } from "firebase/auth";
import { ReactNode } from "react";
export type AuthorizationZoneValidator = (user: User | null) => Promise<boolean> | boolean;
type AuthorizationZoneProps = {
    auth: Auth;
    validator?: AuthorizationZoneValidator;
    onSuccess: (user: User | null) => ReactNode;
    onFailure?: (user: User | null) => ReactNode;
};
export declare const AuthorizationZone: ({ auth, validator, onSuccess, onFailure, }: AuthorizationZoneProps) => ReactNode;
export declare const Validators: {
    isAuthenticated: (includeFirebaseAnon?: boolean) => (user: User | null) => boolean;
    isAnonymous: (excludeFirebaseAnon?: boolean) => (user: User | null) => boolean;
    isVerified: () => (user: User | null) => boolean;
    every: (validators: AuthorizationZoneValidator[]) => (user: User | null) => Promise<boolean>;
    some: (validators: AuthorizationZoneValidator[]) => (user: User | null) => Promise<boolean>;
};
export {};

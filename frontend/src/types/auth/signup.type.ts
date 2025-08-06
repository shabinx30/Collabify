export type RoleType = "brand" | "creator";

export interface IRoleSelector {
    role: RoleType;
    setRole: React.Dispatch<React.SetStateAction<RoleType>>;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    profile: string;
    role: RoleType;
}

export interface IAuthState {
    token: null | string;
    user: null | IUser;
    error: string | null;
    isLoading: boolean;
}

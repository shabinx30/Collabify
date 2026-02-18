export type RoleType = "brand" | "creator";

export interface IRoleSelector {
    role: RoleType;
    setRole: React.Dispatch<React.SetStateAction<RoleType>>;
}

export interface IUser {
    userId: string;
    username: string;
    email: string;
    profile: string;
    isVerified: boolean;
    role: RoleType;
}

export interface IAuthState {
    token: null | string;
    user: null | IUser;
    error: IError | null;
    isLoading: boolean;
}

export interface IDecode {
    given_name: string;
    email: string;
    picture: string;
}

export interface IError {
    message: string;
    error: string;
    statusCode: number;
}

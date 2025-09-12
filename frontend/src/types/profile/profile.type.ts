import { IUser } from "../auth/signup.type";

export interface IProfile {
    params: Promise<{userid: string}>
}

export interface IProfileUser extends Omit<IUser, "userId"> {
    amount: number;
    categories: string[];
}
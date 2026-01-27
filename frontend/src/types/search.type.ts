import { Dispatch, SetStateAction } from "react";
import { IProfileUser } from "./profile/profile.type";

export interface TSearchBox {
    setCreators?: Dispatch<SetStateAction<IProfileUser[]>>;
}

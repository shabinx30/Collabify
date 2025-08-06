export type RoleType = "brand" | "creator";

export interface IRoleSelector {
    role: RoleType;
    setRole: React.Dispatch<React.SetStateAction<RoleType>>;
}

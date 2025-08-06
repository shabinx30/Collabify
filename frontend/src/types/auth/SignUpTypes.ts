export type RoleType = "brand" | "creator";

export interface IRoleSelector {
    role: RoleType | undefined;
    setRole: React.Dispatch<React.SetStateAction<RoleType | undefined>>;
}

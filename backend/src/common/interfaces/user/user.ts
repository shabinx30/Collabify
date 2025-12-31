import { Document } from 'mongoose';
import { TRoles } from './role';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: TRoles;
    categories: string[];
    profile: string;
    socialLinks: string[];
    companyName: string;
    isVerified: boolean;
}

export interface IGuser {
    given_name: string;
    email: string;
    picture: string;
}

export default IUser;

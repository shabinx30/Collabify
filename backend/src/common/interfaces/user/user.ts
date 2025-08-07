import { Document, ObjectId } from 'mongoose';
import { TRoles } from './role';

interface IUser extends Document {
    id: ObjectId;
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

export default IUser;

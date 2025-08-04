import { Document, ObjectId } from 'mongoose';
import { UserTypes } from './userTypes';

interface IUser extends Document {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: UserTypes;
    categories: string[];
    profile: string;
    socialLinks: string[];
    companyName: string;
    isVerified: boolean;
}

export default IUser;

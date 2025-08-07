import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
    ) {}

    async create(data: Partial<UserDocument>): Promise<UserDocument> {
        try {
            const newUser = new this.userSchema(data);
            return newUser.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred.',
            );
        }
    }

    async findByEmail(email: string): Promise<UserDocument | void | null> {
        try {
            return await this.userSchema.findOne({ email });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred.',
            );
        }
    }
}

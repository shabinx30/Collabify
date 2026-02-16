import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SocialMedia, SocialMediaDocument } from './schemas/socialMedia.schema';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
        @InjectModel(SocialMedia.name)
        private socialMediaSchema: Model<SocialMediaDocument>,
    ) {}

    async createUser(data: Partial<UserDocument>): Promise<UserDocument> {
        try {
            const newUser = new this.userSchema(data);
            return newUser.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while saving user into db',
            );
        }
    }

    async findByEmail(email: string): Promise<UserDocument | void | null> {
        try {
            return await this.userSchema.findOne({ email });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while find user with mail',
            );
        }
    }

    async findByName(username: string) {
        return await this.userSchema.findOne({ username }, { password: 0 });
    }

    async findCreators() {
        return await this.userSchema.find({ role: 'creator' }, { password: 0 });
    }

    async findBrands() {
        return await this.userSchema.find({ role: 'brand' }, { password: 0 });
    }

    async upsertUser(userData) {
        return await this.userSchema.findOneAndUpdate(
            { _id: userData._id },
            userData,
            { new: true },
        );
    }

    async searchCreators() {
        return await this.userSchema.find(
            { role: 'creator' },
            { password: 0, role: 0, createdAt: 0, updatedAt: 0 },
        );
    }

    async getSocialAccount(userId: ObjectId) {
        return await this.socialMediaSchema.findOne({ userId });
    }
}

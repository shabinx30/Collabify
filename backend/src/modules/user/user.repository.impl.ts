import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { Social } from 'src/common/interfaces/social/social';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
        @InjectModel(Otp.name) private otpSchema: Model<OtpDocument>,
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

    async createOtp(data) {
        try {
            const newOtp = new this.otpSchema(data);
            return newOtp.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error while creating otp');
        }
    }

    async createOrUpdateOtp(email: string, otp: number) {
        return this.otpSchema.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date(), lastOtpSentAt: new Date() },
            { upsert: true, new: true },
        );
    }

    async findOtpByEmail(email: string) {
        return await this.otpSchema.findOne({ email });
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

    async getSocialAccount(userId: string): Promise<Social | null> {
        return await this.userSchema.findOne({ userId });
    }
}

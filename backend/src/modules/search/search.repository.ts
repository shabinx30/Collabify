import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class SearchRepository {
    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
    ) {}

    async searchCreators(pipeline: any) {
        try {
            const creators = await this.userSchema.aggregate(pipeline);
            return creators;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to search while searching creators',
            );
        }
    }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";

@Injectable()
export class SearchRepository {
    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
    ) {}

    async searchCreators() {
        return await this.userSchema.find({ role: 'creator' }, { password: 0 });
    }
}

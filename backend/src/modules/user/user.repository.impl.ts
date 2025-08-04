import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>) {}

    async create(data: Partial<UserDocument>): Promise<UserDocument> {
        const newUser = new this.userSchema(data)
        return newUser.save()
    }
}
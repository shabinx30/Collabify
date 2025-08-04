import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['brand', 'creator'] })
    role: 'brand' | 'creator';

    @Prop()
    categories: string[];

    @Prop()
    profile: string;

    @Prop()
    socialLinks?: string[];

    @Prop()
    companyName?: string;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ required: true, enum: ['brand', 'creator'] })
    role: 'brand' | 'creator';

    @Prop()
    categories: string[];

    @Prop()
    profile: string;

    @Prop()
    amount: number;

    @Prop()
    socialLinks?: string[];

    @Prop()
    companyName?: string;

    @Prop({ default: false })
    isVerified: boolean;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

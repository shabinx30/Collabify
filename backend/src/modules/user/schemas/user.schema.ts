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
    rating: number;

    @Prop()
    socialLinks?: string[];

    @Prop()
    location: string;

    @Prop()
    companyName?: string;

    @Prop({ default: false })
    isVerified: boolean;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

userSchema.index({ role: 1, isVerified: 1 });
userSchema.index({ categories: 1 });
userSchema.index({ location: 1 });
userSchema.index({ rating: -1 });

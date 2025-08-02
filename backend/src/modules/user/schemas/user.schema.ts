import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['brand', 'creator'] })
    role: 'brand' | 'creator';

    @Prop()
    profile: string;

    @Prop()
    socialLinks?: string[];

    @Prop()
    companyName?: string;
}

export const userSchema = SchemaFactory.createForClass(User);

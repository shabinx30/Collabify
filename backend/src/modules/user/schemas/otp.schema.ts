import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    otp: string;

    @Prop({ default: Date.now, expires: '60s' })
    createdAt: Date;
}

export const otpSchema = SchemaFactory.createForClass(Otp);

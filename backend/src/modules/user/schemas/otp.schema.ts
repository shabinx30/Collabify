import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    otp: number;

    @Prop({ default: Date.now, expires: 300 })
    createdAt: Date;

    @Prop({ default: Date.now })
    lastOtpSentAt: Date;
}

export type OtpDocument = Otp & Document;
export const otpSchema = SchemaFactory.createForClass(Otp);

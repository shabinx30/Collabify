import { Prop, Schema as DSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

@DSchema({ timestamps: true })
export class SocialMedia {
    @Prop({ required: true })
    userId: Schema.Types.ObjectId;

    @Prop({ required: true })
    platform: string;

    @Prop({ required: true })
    platformUserId: string;

    @Prop({ required: true })
    userName: string;

    @Prop()
    profilePicture: string;

    @Prop({ required: true })
    accountType: string;

    @Prop()
    token: {
        accessToken: string;
        expiresAt: Date;
        lastRefreshedAt: Date;
    };
}

export type SocialMediaDocument = SocialMedia & Document;
export const socialMediaSchema = SchemaFactory.createForClass(SocialMedia);

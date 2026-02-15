import { Prop, Schema as DSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

@DSchema({ timestamps: true })
export class SocialMedia {
    @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
    userId: Schema.Types.ObjectId;

    @Prop({ required: true })
    platform: string;

    @Prop({ required: true })
    platformUserId: string;

    @Prop({ required: true })
    userName: string;

    @Prop()
    profilePicture: string;

    @Prop()
    followers: number;

    @Prop()
    engagementRate: number;

    @Prop({ required: true })
    accountType: string;

    @Prop({
        type: {
            accessToken: { type: String, requied: true },
            expiresAt: { type: Date, requied: true },
            lastRefreshedAt: { type: Date, requied: true },
        },
    })
    token: {
        accessToken: string;
        expiresAt: Date;
        lastRefreshedAt: Date;
    };
}

export type SocialMediaDocument = SocialMedia & Document;
export const socialMediaSchema = SchemaFactory.createForClass(SocialMedia);

socialMediaSchema.index({ userId: 1, platform: 1 });
socialMediaSchema.index({ platform: 1 });
socialMediaSchema.index({ followers: -1 });
socialMediaSchema.index({ engagementRate: -1 });

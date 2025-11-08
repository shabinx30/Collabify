import mongoose from "@/lib/mongodb";
const { Schema, models } = mongoose;

const SocialMediaSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        platform: { type: String, required: true },
        platformUserId: { type: Schema.Types.ObjectId, required: true },
        userName: { type: String, required: true },
        profilePicture: { type: String },
        accountType: { type: String, requied: true },
        token: {
            accessToken: String,
            expiresAt: Date,
            lastRefreshedAt: Date,
        },
    },
    { timestamps: true }
);

const SocialMedia =
    models.SocialMedia || mongoose.model("SocialMedia", SocialMediaSchema);
export default SocialMedia;

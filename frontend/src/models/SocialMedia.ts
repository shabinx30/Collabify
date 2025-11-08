import mongoose from "@/lib/mongodb";
const { Schema, models } = mongoose;

const SocialMediaSchema = new Schema(
    {
        platform: { type: String, required: true },
        platformUserId: { type: Schema.Types.ObjectId, required: true },
        profilePicture: { type: String },
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

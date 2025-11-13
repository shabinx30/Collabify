import mongoose from 'mongoose';

const socialAccountSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    platform: { type: String, required: true },
    platformUserId: String,
    userName: String,
    profilePicture: String,
    accountType: String,
    token: {
        accessToken: String,
        expiresAt: Date,
        lastRefreshedAt: Date,
    },
});

export default mongoose.models.SocialAccount ||
    mongoose.model('SocialAccount', socialAccountSchema);

import 'dotenv/config';
import mongoose from 'mongoose';
import axios from 'axios';
import SocialAccount from './model/socialMedia';
import connectToDB from './util/connectDB';

async function refreshExpiringTokens() {
    const now = new Date();
    const tenDaysFromNow = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

    await connectToDB();

    const accounts = await SocialAccount.find({
        platform: 'instagram',
        'token.expiresAt': { $lte: tenDaysFromNow },
    });

    for (const acc of accounts) {
        try {
            const res = await axios.get(
                'https://graph.instagram.com/refresh_access_token',
                {
                    params: {
                        grant_type: 'ig_refresh_token',
                        access_token: acc.token.accessToken,
                    },
                },
            );

            const { access_token, expires_in } = res.data;

            acc.token.accessToken = access_token;
            acc.token.expiresAt = new Date(Date.now() + expires_in * 1000);
            acc.token.lastRefreshedAt = new Date();
            await acc.save();

        } catch (err) {
            console.error(
                `❌ Failed to refresh ${acc.userId}:`,
                err.response?.data || err.message,
            );
        }
    }

    await mongoose.disconnect();
}

refreshExpiringTokens().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import SocialAccount from "@/models/SocialMedia";
import axios from "axios";

export async function GET() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const now = new Date();
        const tenDaysFromNow = new Date(
            now.getTime() + 10 * 24 * 60 * 60 * 1000
        );

        const accounts = await SocialAccount.find({
            platform: "instagram",
            "token.expiresAt": { $lte: tenDaysFromNow },
        });

        for (const acc of accounts) {
            try {
                const res = await axios.get(
                    "https://graph.instagram.com/refresh_access_token",
                    {
                        params: {
                            grant_type: "ig_refresh_token",
                            access_token: acc.token.accessToken,
                        },
                    }
                );

                const { access_token, expires_in } = res.data;

                acc.token.accessToken = access_token;
                acc.token.expiresAt = new Date(Date.now() + expires_in * 1000);
                acc.token.lastRefreshedAt = new Date();

                await acc.save();
            } catch (err: any) {
                console.error("Failed to refresh:", acc.userId, err.message);
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

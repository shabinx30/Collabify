import SocialMedia from "@/models/SocialMedia";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = await cookies();
    const { userId, csrfToken } = JSON.parse(
        Buffer.from(state!, "base64").toString()
    );
    const storedCsrfToken = cookieStore.get("csrf_token")?.value;

    if (!csrfToken || csrfToken !== storedCsrfToken) {
        return NextResponse.redirect(
            "https://collabify-shabin.vercel.app/auth/auth-error"
        );
    }

    try {
        const params = new URLSearchParams({
            client_id: process.env.IG_CLIENT_ID!,
            client_secret: process.env.IG_CLIENT_SECRET!,
            grant_type: "authorization_code",
            redirect_uri:
                "https://collabify-shabin.vercel.app/api/auth/instagram/callback",
            code: code || "",
        });

        // Exchange code for short-lived token
        const { data } = await axios.post(
            "https://api.instagram.com/oauth/access_token",
            params
        );

        // Optionally exchange for long-lived token
        const longLived = await axios.get(
            "https://graph.instagram.com/access_token",
            {
                params: {
                    grant_type: "ig_exchange_token",
                    client_secret: process.env.IG_CLIENT_SECRET!,
                    access_token: data.access_token,
                },
            }
        );

        // Fetch user info
        const account = await axios.get(
            `https://graph.instagram.com/${data.user_id}?fields=username,account_type,profile_picture_url&access_token=${longLived.data.access_token}`
        );

        // Upsert in MongoDB
        await SocialMedia.findOneAndUpdate(
            { userId, platform: "instagram" },
            {
                platformUserId: data.user_id,
                userName: account.data.username,
                profilePicture: account.data.profile_picture_url,
                accountType: account.data.account_type,
                token: {
                    accessToken: longLived.data.access_token,
                    expiresAt: new Date(
                        Date.now() + longLived.data.expires_in * 1000
                    ),
                    lastRefreshedAt: new Date(),
                },
            },
            { upsert: true, new: true }
        );

        // Redirect + set cookie
        const response = NextResponse.redirect(
            "https://collabify-shabin.vercel.app/dashboard"
        );
        response.cookies.set("ig_access_token", longLived.data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error(
            "Instagram Token exchange failed",
            error.response?.data || error.message
        );
        return NextResponse.redirect(
            "https://collabify-shabin.vercel.app/auth/auth-error"
        );
    }
}

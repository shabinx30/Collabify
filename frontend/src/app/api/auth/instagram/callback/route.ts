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
        const params = new URLSearchParams();
        params.append("client_id", process.env.IG_CLIENT_ID!);
        params.append("client_secret", process.env.IG_CLIENT_SECRET!);
        params.append("grant_type", "authorization_code");
        params.append(
            "redirect_uri",
            "https://collabify-shabin.vercel.app/api/auth/instagram/callback"
        );
        params.append("code", code || "");

        // exchange code for access token
        const { data } = await axios.post(
            "https://api.instagram.com/oauth/access_token",
            params
        );

        const account = await axios.get(
            `https://graph.instagram.com/${data.user_id}?fields=username,account_type,profile_picture_url&access_token=${data.access_token}`
        );

        const media = new SocialMedia({
            userId,
            platform: "instagram",
            platformUserId: data.user_id,
            userName: account.data.username,
            profilePicture: account.data.profile_picture_url,
            accountType: account.data.account_type,
            token: {
                accessToken: data.access_token,
                expiresAt: Date.now(),
                lastRefreshedAt: Date.now(),
            },
        });

        const res = NextResponse.redirect(
            "https://collabify-shabin.vercel.app/dashboard"
        );

        // store the access token securely
        res.cookies.set("ig_access_token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });

        return res;
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

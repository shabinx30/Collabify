import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    // getting the state cookie
    const cookies = Object.fromEntries(
        request.headers
            .get("cookie")
            ?.split(";")
            .map((c) => c.trim().split("=")) || []
    );
    const storedState = cookies["ig_oauth_state"];

    if (!state || state !== storedState) {
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

        // store the access token securely
        const res = NextResponse.redirect(
            "https://collabify-shabin.vercel.app/dashboard"
        );
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

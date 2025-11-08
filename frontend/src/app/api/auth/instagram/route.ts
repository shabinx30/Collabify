import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const userid = url.searchParams.get('userid')

    const clientId = process.env.IG_CLIENT_ID;
    const redirectUri =
        "https://collabify-shabin.vercel.app/api/auth/instagram/callback";
    const scope =
        "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights";

    // creating a state to prevent csrf
    const csrfToken = crypto.randomBytes(8).toString("hex");
    const statePayload = Buffer.from(JSON.stringify({userid, csrfToken})).toString('base64')

    // insta autherization url
    const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${encodeURIComponent(scope)}&response_type=code&state=${statePayload}`;

    // storing state in a cookie
    const res = NextResponse.redirect(instagramAuthUrl);
    res.cookies.set("csrf_token", statePayload, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });

    return res;
}

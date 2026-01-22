import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token: string, secret: string) {
    try {
        const secretKey = new TextEncoder().encode(secret);
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (_) {
        return null;
    }
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("accessToken")?.value;
    console.log({ token });

    let isAuthenticated = false;
    if (token) {
        const payload = await verifyJWT(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
        );
        isAuthenticated = !!payload;
    }

    const protectedPaths = ["/dashboard", "/profile"];
    const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path),
    );

    const authPaths = ["/signin", "/signup"];
    const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

    if (isProtectedPath && !isAuthenticated) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (isAuthPath && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/signin", "/signup"],
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
            {
                protocol: "https",
                hostname: "scontent.cdninstagram.com",
            },
        ],
        localPatterns: [
            {
                pathname: "/api/image-proxy",
            },
            {
                pathname: "/images/**",
            },
        ],
    },
};

export default nextConfig;

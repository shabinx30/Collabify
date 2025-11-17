import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("https://lh3.googleusercontent.com/**"), new URL("https://cdn-icons-png.flaticon.com/**")],
    },
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;

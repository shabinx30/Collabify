import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const imageUrl = req.nextUrl.searchParams.get("url");
    if (!imageUrl) {
        return new Response("Missing URL", { status: 400 });
    }

    try {
        // Fetch the external image (use force-cache)
        const res = await fetch(imageUrl, { cache: "force-cache" });

        if (!res.ok) {
            return new Response("Failed to fetch image", {
                status: res.status,
            });
        }

        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get("content-type") || "image/jpeg";

        return new Response(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control":
                    "public, max-age=86400, stale-while-revalidate=604800", // 1 day cache
            },
        });
    } catch (error) {
        console.error("Image proxy error:", error);
        return new Response("Error fetching image", { status: 500 });
    }
}

import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(
    _request: Request,
    context: { params: Promise<{ username: string }> | { username: string } }
) {
    try {
        // Ensure MongoDB connection is established
        await connectDB();

        // Handle params - in Next.js 15+, params is a Promise
        const params = context.params instanceof Promise 
            ? await context.params 
            : context.params;
        const { username } = params;

        if (!username) {
            return NextResponse.json(
                { message: "Username is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ username }, { password: 0 });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

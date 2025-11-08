import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    context: { params: any }
) {
    try {
        const { username } = context.params;

        const user = await User.findOne({ username }, { password: 0 });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

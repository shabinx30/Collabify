import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { username: string } }
) {
    try {
        const username = (await params).username;

        const user = await User.findOne({ username }, { password: 0 });
        console.log({ user });

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

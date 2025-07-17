import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Clear the cookie
        const response = NextResponse.json({message: "Logout successful", success: true}, {status: 200});
        response.cookies.set("token", "", {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 0 // Clear the cookie
        });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
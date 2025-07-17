import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import {NextResponse, NextRequest} from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();

        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({message: "Login successful",success:true}, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 // 1 day
        });

        return response
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
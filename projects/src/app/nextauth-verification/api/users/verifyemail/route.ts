import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model';
import { NextResponse, NextRequest } from 'next/server';
connect();

export async function POST(request: NextRequest) {
    try {
        const {token} = await request.json();

        console.log("Received verification token:", token);

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry: { $gt: new Date() } // Check if token is still valid
         });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Update user to mark email as verified
        user.isVerified = true;
        user.verifyToken = undefined; // Clear the token
        user.verifyTokenExpiry = undefined; // Clear the expiry
        await user.save();
        console.log("User email verified successfully:", user.email);
        return NextResponse.json({ message: "Email verified successfully",success: true }, { status: 200 });
    
    } catch (error) {
        console.log("Error during signup:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
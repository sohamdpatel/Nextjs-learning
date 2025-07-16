import {connect} from "@/dbConfig/dbConfig"

import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
    try {
        const { username,email, password } = await request.json();
        console.log("Received signup data:", { username, email, password });
        

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);
        
        // Send verification email (assuming sendEmail function is defined elsewhere)

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id.toString()});

        console.log("Verification email sent to:", email);
        
        return NextResponse.json({ message: "User registered successfully",success: true, savedUser }, { status: 201 });
    } catch (error) {
        console.error("Error during signup:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest){

    try {
        const userId = getDataFromToken(request);
        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message: "User data retrieved successfully",
            data: user
        })
    } catch (error: any) {
        console.log("Internal server error", error.message);
        
    }
}
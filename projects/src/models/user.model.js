import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
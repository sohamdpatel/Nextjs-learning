import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';


export const sendEmail = async ({email, emailType, userId}:
    {email: string, emailType: "VERIFY" | "RESET", userId: string}
) => {
    try {
        console.log("Sending email to:", email, "for user ID:", userId);
        const hasedToken = await bcrypt.hash(userId.toString(), 10); // Hash the userId for security

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {$set: {verifyToken: hasedToken, verifyTokenExpiry: Date.now() + 3600000}}); 
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {$set: {resetToken: hasedToken, resetTokenExpiry: Date.now() + 3600000}});
        }
// 0ee25a4bc88edea2d39196533db81aa1
        // Looking to send emails in production? Check out our Email API/SMTP product!
        console.log("Creating transporter for email sending...");
        
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9e716ae196c070",
    pass: "9cc51e6f24c456"
  }
});

        const mailOptions = {
            from: 'sdp.18072003@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            text: `Hello, your user ID is ${userId}. Welcome to our platform!`, // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/nextauth-verification/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/nextauth-verification/verifyemail?token=${hasedToken}
            </p>`, // html body
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully:", mailResponse);
        

        return mailResponse;



    } catch (error) {
        console.error("Error creating transporter:", error);
        throw new Error("Failed to create email transporter");
        
    }
}
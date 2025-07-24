import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const db = await dbConnect();
        try { 
            const { email, password } = credentials;
            console.log(email, password);
            
            const user = await UserModel.findOne({ $or: [
                {email},
                {username: email}
            ]
         })
         console.log("user from options",);
         
            if (!user) {
              throw new Error("No User found with this credentials");
            }
            if (!user.isVerified) {
                throw new Error('Please verify your account before login')
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
              throw new Error('Incorrect Password')
            }
            return user;
        } catch (error: any) {
            throw new Error(error)
        }
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        // 'user' here is the object returned from the 'authorize' callback
        // Now it has 'id', 'email', 'username', etc.
        token.id = user.id; // Use 'id' from the returned user object
        token._id = user.id; // Also store as _id for consistency with Mongoose
        token.isVerified = (user as any).isVerified;
        // Use the correct property name: 'isAcceptingMessage'
        token.isAcceptingMessages = (user as any).isAcceptingMessages; 
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Assign properties from the token to the session.user object
        // session.user.id = token.id as string; // Ensure 'id' is also set
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        // Use the correct property name: 'isAcceptingMessage'
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};

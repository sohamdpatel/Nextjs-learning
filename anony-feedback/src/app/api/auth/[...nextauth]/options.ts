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
            const user = await UserModel.findOne({ $or: [
                {email},
                {username: email}
            ]
         });
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
    async session({session, token}) {
        if (token) {
            session.user._id = token.toString()
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessages = token.isAcceptingMessages
            session.user.username = token.username
        }
        return session
    },
    async jwt({token, user}) {
        if (user) {
            token._id = user?._id?.toString()
            token.isVerified = user?.isVerified
            token.isAcceptingMessages = user?.isAcceptingMessages
            token.username = user?.username
        }
        return token
    }
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.SECRET_KEY,
  
};

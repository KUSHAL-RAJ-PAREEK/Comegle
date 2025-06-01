import GoogleProvider from "next-auth/providers/google";
import {saveUser} from "./actions/saveUser";
import {sendVerificationRequest} from "./resend/sendVerificationRequest";
// @ts-ignore
import db from "@repo/db/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {JWT} from "next-auth/jwt";
import {User} from "next-auth";
import {Session} from "node:inspector";

// @ts-ignore
// @ts-ignore
export const authOptions = {

    providers: [
        // {
        //     id: 'resend',
        //     type: 'email',
        //     sendVerificationRequest
        // },
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({user, account}: {
            user: {
                email: string;
                name: string;
                image:string;
                status:string
            },
            account: {
                provider: "google" | "resend"
            }
        }) {
            await  saveUser(user.email,user.name||"kushal",null,user.image,user.status)
            console.log("✅ signIn callback triggered:", user.email);
            return true;
        },
        async jwt({ token, user, trigger, session }:{
            token: JWT;
            user?: User;
            trigger?: 'signIn';
            session?: Session;
        }) {

            console.log(user)

            return token
        },
        async session({ session, token }:{
            session : Session,
            token : JWT
        }) {
            console.log(session)
            return session
        }

    },
    pages:{
        signIn: "/auth/signin",
    },
    // adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET || "secret",
};
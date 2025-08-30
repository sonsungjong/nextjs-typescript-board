// npm install next-auth
// npm install bcrypt
// npm i --save-dev @types/bcrypt
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { CredentialProviders } from "next-auth/providers/credentials";
import bcrypt from "bcrypt";            // 비밀번호 암호화용
import { connectDB } from "@/Utils/db";

// 구글로그인 OAuth
// 깃허브로그인 OAuth
// 자체DB로그인
const googleId = process.env.GOOGLE_ID || "";
const googleSecret = process.env.GOOGLE_SECRET || "";
const githubId = process.env.GITHUB_ID || "";
const githubSecret = process.env.GITHUB_SECRET || "";
const nextauthSecret = process.env.NEXTAUTH_SECRET || "";

export const authOptions : NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: githubId || "",
            clientSecret: githubSecret || ""
        }),
        GoogleProvider({
            clientId: googleId || "",
            clientSecret: googleSecret || ""
        })
    ],
    session:{
        strategy:'jwt',
        maxAge: 2 * 60 * 60
    },
    callbacks:{
        jwt: async({token, user} : {token:any, user:any}) =>{
            if(user){
                token.user={};
                token.user.name = user.name;
                token.user.email = user.email;
            }
            return token;
        },
        session: async({session, token} : {session:any, token:any})=>{
            session.user = token.user;
            return session;
        }
    },
    secret:nextauthSecret
}

export default NextAuth(authOptions);
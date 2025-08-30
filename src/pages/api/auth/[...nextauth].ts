// npm install next-auth
// npm install bcrypt
// npm i --save-dev @types/bcrypt
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";            // 비밀번호 암호화용
import { connectDB } from "@/Utils/db";

// 구글로그인 OAuth
// 깃허브로그인 OAuth
// 자체DB로그인
const googleId = process.env.GOOGLE_ID || "";
const googleSecret = process.env.GOOGLE_SECRET || "";
const githubId = process.env.GITHUB_ID || "";
const githubSecret = process.env.GITHUB_SECRET || "";
const nextauthSecret = process.env.NEXTAUTH_SECRET || "nextjs-typescript-board";
const DBName = process.env.DB_NAME || "board";

export const authOptions : NextAuthOptions = {
    providers: [
        GithubProvider({
            // 깃허브 로그인
            clientId: githubId || "",
            clientSecret: githubSecret || ""
        }),
        GoogleProvider({
            // 구글 로그인
            clientId: googleId || "",
            clientSecret: googleSecret || ""
        }),
        CredentialsProvider({
            // 자체DB 로그인
            name : "credentials",
            credentials:{
                email:{label:"email", type:"text"},
                password:{label:"password", type:"password"}
            },
            
            // 로그인 시도
            async authorize(credentials){
                let db = (await connectDB).db(DBName)
                let user = await db.collection('user').findOne({email:credentials?.email});
                if(!user) return null;

                const ok = await bcrypt.compare(credentials?.password ?? "", user.password);
                if(!ok) return null;

                return{
                    id:String((user as any)._id),
                    name:(user as any).name,
                    email:(user as any).email
                 } as any;
            }
        }),
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
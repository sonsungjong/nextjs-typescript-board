"use client"            // react 함수를 사용

// npm install next-auth
import Link from "next/link"
import {signIn, signOut} from 'next-auth/react';
import { Session } from "next-auth";

export default function LoginBtn({login} : {login : Session | null})
{
    return(
        <>
            {
                !login ? (
                    <button onClick={()=>{signIn()}} className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer'>로그인</button>
                ) : (
                    <button onClick={()=>{signOut()}} className='px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition cursor-pointer'>로그아웃</button>
                )
            }
            
            {
                !login ? (
                    <Link href='/register' className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition'>회원가입</Link>
                ) : (
                    <span className='ml-2 text-sm font-semibold text-gray-700'>{login?.user?.name}</span>
                )
            }
        </>
    )
}
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
                    <button onClick={()=>{signIn()}} 
                    className='px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition cursor-pointer'>로그인</button>
                ) : (
                    <button onClick={()=>{signOut()}} 
                    className='px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition cursor-pointer'>로그아웃</button>
                )
            }
            
            {
                !login ? (
                    <Link href='/register' 
                    className='px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition cursor-pointer'>회원가입</Link>
                ) : (
                    <span 
                    className='text-gray-700 font-semibold'>{login?.user?.name}</span>
                )
            }
        </>
    )
}
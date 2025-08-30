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
                    <button onClick={()=>{signIn()}} className=''>로그인</button>
                ) : (
                    <button onClick={()=>{signOut()}} className=''>로그아웃</button>
                )
            }
            
            {
                !login ? (
                    <Link href='/register' className=''>회원가입</Link>
                ) : (
                    <span className=''>{login?.user?.name}</span>
                )
            }
        </>
    )
}
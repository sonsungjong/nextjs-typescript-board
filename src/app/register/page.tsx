import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Register(){

    // 회원가입 페이지 (이미 로그인했으면 못오게 해야함)
    // 로그인 중인지 먼저 체크를 하고 로그인 중이면 redirect 로 다른 페이지로 보내버린다
    // 로그인 중인지 체크하려면 getServerSession
    let session = await getServerSession(authOptions);

    if(session){
        // 세션이 들어있다? 로그인 중이다
        redirect('/');          // 홈페이지로 보내버린다
    }

    return(
        <div className="flex justify-center">
            <form method="POST" action="/api/auth/signup" 
                className="">
                <input name="email" type="email" placeholder="이메일을 입력하세요" 
                    className="" />
                <input name="password" type="password" placeholder="비밀번호를 입력하세요" 
                    className="" />
                <input name="name" type="text" placeholder="이름을 입력하세요" 
                    className="" />
                <button type="submit" 
                    className="">회원가입</button>
            </form>
        </div>
    )
}

// 회원가입 버튼(submit)을 누르면 /api/auth/signup 에 POST요청을 보낼 것
// {email:"", password:"", name:""}

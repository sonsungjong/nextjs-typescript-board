export default function Register(){
    return(
        <div className="flex justify-center">
            <form method="POST" action="/api/auth/signup" className="">
                <input name="email" type="email" placeholder="이메일을 입력하세요" className="" />
                <input name="password" type="password" placeholder="비밀번호를 입력하세요" className="" />
                <input name="name" type="text" placeholder="이름을 입력하세요" className="" />
                <button type="submit" className="">회원가입</button>
            </form>
        </div>
    )
}

// 회원가입 버튼(submit)을 누르면 /api/auth/signup 에 POST요청을 보낼 것
// {email:"", password:"", name:""}

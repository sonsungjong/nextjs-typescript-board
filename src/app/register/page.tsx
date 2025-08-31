import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import logo from '@/assets/nav logo.png'
import Image from "next/image";

export default async function Register()
{
    const session = await getServerSession(authOptions);

    if(session){
        redirect("/");
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
                <div className="flex justify-center mb-6">
                    <Image src={logo} alt="" height={90} />
                </div>

                <form method="POST" action="/api/auth/signup" className="space-y-4">
                <div>
                    <label htmlFor="email" 
                        className="text-sm font-medium text-gray-700 sr-only">이메일</label>
                    <input id="email" name="email" type="email" placeholder="이메일을 입력하세요" required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">비밀번호</label>
                    <input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요" required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"/>
                </div>
                <div>
                    <label htmlFor="name" 
                        className="text-sm font-medium text-gray-700 sr-only">이름</label>
                    <input id="name" name="name" type="text" placeholder="이름을 입력하세요" required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"/>
                </div>
                <button type="submit" 
                    className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">회원가입</button>
                </form>
            </div>
        </div>
    )
}
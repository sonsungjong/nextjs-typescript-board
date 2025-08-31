import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"

export default async function Write(){

    let session = await getServerSession(authOptions);
    
    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
                <h2 className="text-2xl">
                    로그인이 필요해요
                </h2>
            </div>
        )
    }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">게시글 작성</h2>
      <form action="/api/post/new" method="POST" className="space-y-4">
        <input name="title" placeholder="글제목"
          className="w-full border rounded px-3 py-2"
        />
        <textarea name="content" placeholder="글내용"
          className="w-full border rounded px-3 py-2 min-h-[200px]"
        />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
          작성하기
        </button>
      </form>
    </div>
  );
}
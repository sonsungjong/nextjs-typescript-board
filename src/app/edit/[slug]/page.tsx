import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/Utils/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

interface SlugPageProps
{
    params : Promise<{
        slug: string;
    }>
}

const dbName = process.env.DB_NAME || "board";

// 기존에 있는 내용 적어놓고 수정할 수 있게
export default async function Edit({params} : SlugPageProps){
    const { slug } = await params;
    // 로그인 정보 체크
    const session = await getServerSession(authOptions);
    if(!session){
        return (
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
              <h2 className="text-2xl">
                  로그인이 필요해요
              </h2>
          </div>
        )
    }

    const db = (await connectDB).db(dbName)
        const result = await db.collection('post').findOne({
            _id: ObjectId.createFromHexString(slug)
        })

    // 로그인 중인 이메일과 글작성자의 이메일이 같을 때만 `수정`
    if(session.user?.email && result?.email &&
        session.user?.email === result?.email)
    {
        return (
            <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">게시글 수정</h2>
            <form action="/api/post/edit" method="POST" className="space-y-4">
                <input name="id" value={slug} type="hidden" />
                <input name="title" placeholder="글제목" defaultValue={result?.title}
                className="w-full border rounded px-3 py-2"
                />
                <textarea name="content" placeholder="글내용" defaultValue={result?.content}
                className="w-full border rounded px-3 py-2 min-h-[200px]"
                />
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
                수정하기
                </button>
            </form>
            </div>
        );
    }

    // 글 작성자가 아닐때 보여줄 return 화면
    return (
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
              <h2 className="text-2xl">
                  글 수정은 작성자만 가능해요
              </h2>
          </div>
        )
}
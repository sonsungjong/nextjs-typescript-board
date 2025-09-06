// localhost:3000/detail

import { connectDB } from "@/Utils/db";
import { ObjectId } from "mongodb";

interface SlugPageProps
{
    params : Promise<{
        slug: string;
    }>
}

// DB사용 (.env 파일의 값을 가져온다 || "" : 만약 못가져오면 빈문자)
const dbName = process.env.DB_NAME || "board";

export default async function Detail({params} : SlugPageProps){
    const { slug } = await params;

    // 데이터베이스에서 검색해서 가져온다 (게시글)
    const db = (await connectDB).db(dbName)
    const result = await db.collection('post').findOne({
        _id: ObjectId.createFromHexString(slug)
    })

    return(
        <div className="max-w-3xl mx-auto p-6">
            <h4 className="text-xl font-semibold text-blue-600 mb-4">
                {result?.title}
            </h4>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md shadow-sm">
                {result?.content}
            </p>
        </div>
    )
}
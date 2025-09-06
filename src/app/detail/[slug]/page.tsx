// localhost:3000/detail

import { connectDB } from "@/Utils/db";
import { ObjectId } from "mongodb";

interface SlugPageProps
{
    params : {
        slug: string;
    }
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
        <div className="">
            <h4 className="">
                {result?.title}
            </h4>
            <p className="whitespace-pre-wrap">
                {result?.content}
            </p>
        </div>
    )
}
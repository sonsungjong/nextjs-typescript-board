import { connectDB } from '@/Utils/db'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

const dbName = process.env.DB_NAME || "board";

export default async function handler(req : NextApiRequest, res: NextApiResponse)
{
    console.log('/api/post/edit', req.body);            // title, content

    if(req.method === "POST")
    {
        try{
            const session = await getServerSession(req, res, authOptions);
            if(!session){
                res.status(401).json({})
                return;             // 변경
            }

            if(req.body.title && req.body.content)
            {
                const db = (await connectDB).db(dbName);        // DB연결
                const result = await db.collection('post').updateOne(
                    {_id: ObjectId.createFromHexString(req.body.id)},       // 찾기
                    {$set: {title: req.body.title, content: req.body.content}}      // 수정
                )
                res.redirect(302, '/')           // 홈페이지로 보낸다
                return;                 // 변경
            }else{
                res.status(400).json({error:"빈칸은 허용되지 않습니다."})
                return;                 // 변경
            }
        }
        catch(error){
            console.error(error)
            res.status(500).json({error:'서버 ERROR'})
            return;                 // 변경
        }
    }

    return res.status(405).json({})         // 지원하지않는 method
}
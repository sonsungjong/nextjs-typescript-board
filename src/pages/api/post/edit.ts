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
                return res.status(401).json({})
            }

            if(req.body.title && req.body.content)
            {
                const db = (await connectDB).db(dbName);        // DB연결
                const result = await db.collection('post').updateOne(
                    {_id: ObjectId.createFromHexString(req.body.id)},       // 찾기
                    {$set: {title: req.body.title, content: req.body.content}}      // 수정
                )
                return res.redirect(302, '/')           // 홈페이지로 보낸다
            }else{
                return res.status(400).json({error:"빈칸은 허용되지 않습니다."})
            }
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error:'서버 ERROR'})
        }
    }

    return res.status(405).json({})         // 지원하지않는 method
}
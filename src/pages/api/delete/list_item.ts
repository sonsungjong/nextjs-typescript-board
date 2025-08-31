import { connectDB } from '@/Utils/db'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

const dbName = process.env.DB_NAME || "board";

export default async function handler(req : NextApiRequest, res: NextApiResponse)
{
    console.log('/api/delete/list_item', req.body);

    if(req.method === "DELETE")
    {
        try{
            const session = await getServerSession(req, res, authOptions);
            if(session){
                const {id, email} = req.body;
                const sessionEmail = session?.user?.email;
                if(sessionEmail == req.body.email)
                {
                    // 글 작성자 email 일때만 삭제 (string으로 바꿨던 _id 를 다시 ObjectId 로 복원해서 몽고DB에 보내준다)
                    const db = (await connectDB).db(dbName);
                    const result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
                    console.log(result);
                    return res.status(200).json('삭제완료')
                }else{
                    // 로그인한 이메일과 글의 이메일이 다를 때 안됨
                    return res.status(400).json({error:'계정 정보가 일치하지 않습니다'})
                }
            }
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error:error})
        }
    }

    // 없는 메서드
    return res.status(406).json({})
}
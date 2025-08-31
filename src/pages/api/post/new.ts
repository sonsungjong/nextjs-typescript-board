import { connectDB } from '@/Utils/db'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const dbName = process.env.DB_NAME || "board";

export default async function handler(req : NextApiRequest, res: NextApiResponse)
{
    const session = await getServerSession(req, res, authOptions);

    if(req.method == "POST")
    {
        try{
            console.log(req.body);
            const {title, content} = req.body;
            if(session){
                req.body.email = session?.user?.email;
            }

            if(title && content && req.body.email)
            {
                const email = req.body.email
                const db = (await connectDB).db(dbName)    // DB 접속
                const result = await db.collection('post').insertOne({title, content, email})
                console.log(result);
                return res.redirect(302, '/')           // redirect 로 페이지를 이동시킨다(홈페이지로)
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({error:error})
        }
    }

    return res.status(403).json({error:'지원하지않는 method'})
}
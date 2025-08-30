import bcrypt from 'bcrypt'
import { connectDB } from '@/Utils/db'
import { NextApiRequest, NextApiResponse } from 'next';

const dbName = process.env.DB_NAME || "board";

export default async function handler(req : NextApiRequest, res: NextApiResponse)
{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method === "OPTIONS"){
        res.status(200).end();
        return;
    }

    try{
        console.log('/api/auth/signup')
        if(req.method === "POST"){
            let hash = await bcrypt.hash(req.body?.password, 10);
            req.body.password = hash;

            let db = (await connectDB).db(dbName)
            await db.collection('user').insertOne(req.body);
            return res.redirect(302, '/api/auth/signin');
        }
    }catch(error){
        res.status(500).json({error:'signup failed: '+error})
    }
}
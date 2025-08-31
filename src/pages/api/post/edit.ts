import { connectDB } from '@/Utils/db'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const dbName = process.env.DB_NAME || "board";

export default async function handler(req : NextApiRequest, res: NextApiResponse)
{
    const session = await getServerSession(req, res, authOptions);

    
}
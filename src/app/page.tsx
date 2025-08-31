import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/Utils/db";
import { getServerSession } from "next-auth";
import ListItem from "./components/ListItem";

interface PostItem
{
  _id : string;
  title? : string;
  content? : string;
  email? : string;
}

const dbName = process.env.DB_NAME || "board";

export default async function Home() {

  // 로그인이 되어있는지 페이지에서 먼저 체크 getServerSession
  const session = await getServerSession(authOptions);

  // 로그인 안되있으면
  if (!session) {
      return (
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
              <h2 className="text-2xl">
                  로그인이 필요해요
              </h2>
          </div>
      )
  }

  const db = (await connectDB).db(dbName);
  let docs = await db.collection('post').find().toArray();    // post 컬렉션에 있는 내용 배열로

  // docs에 있는 _id를 string으로 교체 (자바스크립트에서는 ObjectId 사용 불가)
  const result : PostItem[] = docs.map((item : any)=> ({
      ...item,
      _id: item._id.toString()      // _id 는 string이 아니고 ObjectId 이기 때문에 변경
  }));

  return (
    <div className="">
      {/* useState로 result를 화면에 반영해줘야하기 때문에 컴포넌트 분리 (use client) */}
      <ListItem result={result} />
    </div>
  );
}

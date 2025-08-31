"use client";

import Link from "next/link";
import { useState } from "react";

// use client는 react전용 함수 사용을 위해서 가장 위에 적어준다
// page.tsx 에는 가능하면 적지 않고 컴포넌트로 분리해서 적어준다

interface PostItem
{
  _id : string;
  title? : string;
  content? : string;
  email? : string;
}

export default function ListItem({result} : {result : PostItem[]})
{
    // 화면과 묶어서 사용하기 위해 useState로 변경
    const [listData, setListData] = useState(result);

    async function handleDelete(id:string, email?:string)
    {

    }

    return(
        <div className="m-2">
            {
                listData && listData.length > 0 ? listData.map((item, index)=>{
                    return(
                        <div className="bg-white rounded-xl p-6 shadow-md mb-4 flex flex-col" key={index}>
                            <Link href={`/detail/` + item._id} className="md-4">
                                <h4 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h4>
                                <p className="text-gray-600 line-clamp-1">{item.content}</p>
                            </Link>
                            <div className="flex gap-2 mt-2">
                                <Link href={'/edit/' + item._id} 
                                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors shadow-md text-sm">
                                    수정
                                </Link>
                                <span onClick={()=>{ handleDelete(item._id, item.email)} } 
                                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition-colors shadow-md ml-2 cursor-pointer text-sm">
                                    삭제
                                </span>
                            </div>
                        </div>         
                    )
                }) : null
            }
        </div>
    )
}


// localhost:3000/detail

interface SlugPageProps
{
    params : {
        slug: string;
    }
}

export default function Detail({params} : SlugPageProps){
    return(
        <div className="flex justify-center">
            Detail 페이지 {params.slug}
        </div>
    )
}
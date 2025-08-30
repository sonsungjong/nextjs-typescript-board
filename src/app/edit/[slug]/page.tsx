interface SlugPageProps
{
    params : {
        slug: string;
    }
}

export default function Edit({params} : SlugPageProps){
    return(
        <div className="flex justify-center">
            Edit 페이지 {params.slug}
        </div>
    )
}
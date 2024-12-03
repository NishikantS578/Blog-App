import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function Blog() {
    const { blogId } = useParams()
    const [blog, setBlog] = useState<{ id: string, title: string, blogContent: string[] }>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/posts/" + blogId)
            .then(res => res.json())
            .then(body => {
                body.data.blogContent = body.data.blogContent.split("\n")
                setBlog({ id: body.data.id, title: body.data.title, blogContent: body.data.blogContent })
            })
            .catch(err => console.log("Error while retreiving blog", err))
            .finally(() => setLoading(false));
    }, []);


    return <div className="flex flex-col gap-4 max-w-[700px] mx-auto mt-16 items-center">
        {loading && <div className="text-4xl text-gray-500">Loading...</div>}

        {!loading && blogId && !blog && <div>There is No such Blog!!!</div>}

        <div className="font-bold text-start text-4xl py-4 px-2 rounded-lg w-full" >{blogId && blog && blog.title}</div>

        <div className="text-xl p-2 rounded-lg w-full break-words text-justify" >
            {blogId && blog && blog.blogContent.map((e: string) => <p className="pt-4">{e}</p>)}
        </div>
    </div >
}
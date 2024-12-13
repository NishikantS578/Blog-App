import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AppContext } from "../context/AppContext";

export default function Blog() {
    const { blogId } = useParams()
    const [blog, setBlog] = useState<{ id: string, title: string, author: string, blogContent: string[] }>();
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, login } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            login().then((res) => { if (!res) setTimeout(() => navigate("/login"), 500); })
        }

        fetch(import.meta.env.VITE_SERVER_URL + "/posts/" + blogId)
            .then(res => res.json())
            .then(body => {
                body.data.blogContent = body.data.blogContent.split("\n")
                setBlog({ id: body.data.id, title: body.data.title, author: body.data.author, blogContent: body.data.blogContent })
            })
            .catch(err => console.log("Error while retreiving blog", err))
            .finally(() => setLoading(false));
    }, []);


    return <div className="mt-16 items-center flex flex-col">
        <button className="self-end bg-transparent border-none outline-none focus:outline-none" onClick={() => navigate(-1)}>
            &lt; <span className="underline">Back</span>
        </button>

        {loading && <div className="text-4xl text-gray-500">Loading...</div>}

        {!loading && blogId && !blog && <div>There is No such Blog!!!</div>}

        <div className="font-bold text-start text-4xl py-4 px-2 rounded-lg w-full" >{blogId && blog && blog.title}</div>
        <div className="font-bold text-end text-base italic py-4 px-2 rounded-lg w-full" > - {blogId && blog && (blog.author || "Unknown")}</div>

        <div className="text-xl p-2 rounded-lg w-full break-words text-justify" >
            {blogId && blog && blog.blogContent.map((e: string, index: number) => <p className="pt-4" key={index}>{e}</p>)}
        </div>
    </div >
}
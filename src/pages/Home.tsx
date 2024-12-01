import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function Home() {
    const [blogs, setBlogs] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/posts")
            .then((res) => res.json())
            .then((data) => setBlogs(data.data))
            .catch((err) => console.log("Error while retreiving blogs.", err))
            .finally(() => setLoading(false));
    }, []);

    return <div className="flex flex-col max-w-[720px] mx-auto">
        <h1 className="py-16">Blogs</h1>
        {loading && <div className="text-4xl text-gray-500">Loading...</div>}

        {!loading && !blogs.length && <div className="text-4xl text-gray-500">Currently there are no Blogs</div>}
        
        {blogs && blogs.map((blog: { id: string, title: string, blogContent: string }) => {
            return <Link className="border border-[#ccc5] rounded-[20px] w-full p-4 mb-8 text-white hover:text-gray-300" key={blog.id} to={"/blog/" + blog.id}>
                <div className="text-start font-bold pb-4 text-3xl">
                    {blog.title}
                </div>
                <div className="text-start text-ellipsis overflow-hidden break-words max-h-12">
                    {blog.blogContent}
                </div>
            </Link>
        })}
    </div>
}
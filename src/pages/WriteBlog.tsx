import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router";

async function handleBlogPublish(title: string, blog: string, navigate: NavigateFunction) {
    await fetch(import.meta.env.VITE_SERVER_URL+"/api/posts", {
        method: "POST",
        body: JSON.stringify({ title: title, blogContent: blog }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    navigate("/");
}

export default function WriteBlog() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState("")

    return <div className="flex flex-col gap-4 max-w-[700px] mx-auto mt-16 items-center">
        <div
            className="title-input font-bold text-start text-4xl p-4 bg-gray-700 rounded-lg w-full" contentEditable={true}
            onInput={
                (e: React.FormEvent<HTMLDivElement>) => {
                    const target = e.target as HTMLDivElement;
                    if (target.textContent) {
                        setTitle(target.textContent);
                    }
                }}></div>

        <div
            className="paragraph-input text-start text-xl p-2 bg-gray-700 rounded-lg min-h-[400px] w-full" contentEditable={true}
            onInput={
                (e: React.FormEvent<HTMLDivElement>) => {
                    const target = e.target as HTMLDivElement;
                    if (target.textContent) {
                        setBlog(target.textContent);
                    }
                }}></div>

        <button className="bg-blue-900 w-[200px] self-start" onClick={() => handleBlogPublish(title, blog, navigate)}>Publish</button>
    </div >
}
import { useState } from "react"

function handleBlogPublish(title: string, blog: string, setBlogs: any) {
    setBlogs((prev: any) => { return [...prev, { title, blog }] })
}

export default function WriteBlog(props: any) {
    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState("")

    return <div className="flex flex-col gap-4 max-w-[700px] mx-auto mt-16 items-center">
        <div
            className="title-input font-bold text-start text-4xl p-4 bg-gray-700 rounded-lg w-full" contentEditable={true}
            onInput={
                (e: any) => {
                    setTitle(e.target.textContent);
                }}></div>

        <div
            className="paragraph-input text-start text-xl p-2 bg-gray-700 rounded-lg min-h-[400px] w-full" contentEditable={true}
            onInput={
                (e: any) => {
                    setBlog(e.target.textContent);
                }}></div>

        <button className="bg-blue-900 w-[200px] self-start" onClick={() => handleBlogPublish(title, blog, props.setBlogs)}>Publish</button>
    </div >
}
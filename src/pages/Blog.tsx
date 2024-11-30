import { useParams } from "react-router"

export default function Blog(props: any) {
    const { blogId } = useParams()

    return <div className="flex flex-col gap-4 max-w-[700px] mx-auto mt-16 items-center">
        {blogId && !props.blogs[blogId] && <div>There is No such Blog!!!</div>}

        <div className="font-bold text-start text-4xl p-4 rounded-lg w-full" >{blogId && props.blogs[blogId] && props.blogs[blogId].title}</div>

        <div className="text-start text-xl p-2 rounded-lg w-full break-words" >{blogId && props.blogs[blogId] && props.blogs[blogId].blog}</div>
    </div >
}
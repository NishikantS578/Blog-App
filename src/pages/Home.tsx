import { Link } from "react-router"

export default function Home(props: any) {
    return <div className="flex flex-col max-w-[720px] mx-auto">
        <h1 className="py-16">Blogs</h1>
        {!props.blogs.length && <div className="text-4xl text-gray-500">Currently there are no Blogs</div>}
        {props.blogs && props.blogs.map((blog: any, id: number) => {
            return <Link className="border border-[#ccc5] rounded-[20px] w-full p-4 mb-8 text-white hover:text-gray-300" key={id} to={"/blog/"+id}>
                <div className="text-start font-bold pb-4 text-3xl">
                    {blog.title}
                </div>
                <div className="text-start text-ellipsis overflow-hidden break-words max-h-12">
                    {blog.blog}
                </div>
            </Link>
        })}
    </div>
}
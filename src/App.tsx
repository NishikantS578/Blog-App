import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { useState } from 'react'
import Home from './pages/Home'
import WriteBlog from './pages/WriteBlog'
import Blog from './pages/Blog'

function App() {
  const [blogs, setBlogs] = useState([])
  console.log(blogs);

  return (
    <BrowserRouter>
      <section className='flex my-4 items-center'>
        <div className='font-bold italic text-5xl font-mono'>DevDiary</div>
        <nav className='ml-auto flex items-center'>
          <Link className='py-2 px-4 font-bold text-xl' to={"/"}>Home</Link>
          <Link className='py-2 px-4 font-bold text-xl' to={"/write-blog"}>Write</Link>
        </nav>
      </section>
      <Routes>
        <Route path='/' element={<Home blogs={blogs} />} />
        <Route path='/write-blog' element={<WriteBlog setBlogs={setBlogs} />} />
        <Route path='/blog/:blogId' element={<Blog blogs={blogs} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

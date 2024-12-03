import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import WriteBlog from './pages/WriteBlog'
import Blog from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <section className='flex flex-wrap my-4 px-4 items-center justify-center'>
        <div className='font-bold italic text-5xl silkscreen-bold'>
          <Link className='text-white hover:text-white flex' to="/">DevDiary</Link>
        </div>
        <nav className='min-[550px]:ml-auto flex items-center'>
          <Link className='py-2 px-4 font-bold text-xl text-white hover:text-gray-200' to={"/"}>Home</Link>
          <Link className='py-2 px-4 font-bold text-xl text-white hover:text-gray-200' to={"/write-blog"}>Write Blog</Link>
        </nav>
      </section>
      <div className='px-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/write-blog' element={<WriteBlog />} />
          <Route path='/blog/:blogId' element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

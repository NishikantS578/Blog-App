import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router'
import Home from './pages/Home'
import WriteBlog from './pages/WriteBlog'
import Blog from './pages/Blog'
import Login from './pages/Login'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from './context/AppContext'
import EmailVerify from './pages/EmailVerify'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'

function App() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { backendUrl, isLoggedIn, setIsLoggedIn, setUserData, userData, login } = useContext(AppContext);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  async function handleLogOut() {
    const res = await fetch(backendUrl + "/auth/logout", { credentials: 'include' });
    const data = await res.json();
    if (data.success) {
      setIsLoggedIn(false);
      setUserData(undefined);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      login().then((res) => { if (!res) setTimeout(() => navigate("/login"), 500); })
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      else {
        setIsProfileDropdownOpen((prev) => !prev);
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => { document.removeEventListener("click", handleClickOutside) }
  }, []);

  return (
    <>
      <section className='flex flex-wrap my-4 px-4 items-center justify-center gap-4'>
        <div className='font-bold italic text-4xl silkscreen-bold'>
          <Link className='text-white hover:text-white flex' to="/">Devdiary</Link>
        </div>

        <div className='ml-auto'>
          <div className='sm:hidden ml-auto h-10 w-10 flex items-center justify-center' onClick={() => { ["hidden", "flex"].map((cls) => mobileMenuRef.current?.classList.toggle(cls)) }}><img className='invert' src="/burger-bar.png"></img></div>

          <div className='absolute left-0 top-0 bg-slate-800 h-screen w-screen flex-col hidden z-10' ref={mobileMenuRef}>

            <div className='flex items-center  silkscreen-bold p-4'>
              <div className='italic text-4xl font-medium text-white hover:text-white'>
                Devdiary
              </div>
              <div className='ml-auto h-10 w-10 flex items-center justify-center p-2' onClick={() => mobileMenuRef.current?.classList.toggle("hidden")}><img className='invert' src="/close.png"></img></div>
            </div>

            {isLoggedIn && <div className='text-white p-4 pt-8 m-0 text-2xl text-start border-b border-[#ccc5] border-solid'>{userData && userData.email}</div>}

            <nav className='flex flex-col h-full'>
              <Link className='bg-transparent font-semibold text-white p-4 m-0 text-2xl text-start border-t-0 border-l-0 border-r-0 border-b border-[#ccc5] rounded-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:outline-none border-solid' to={"/"} onClick={() => mobileMenuRef.current?.classList.toggle("hidden")}>Home</Link>
              <Link className='bg-transparent font-semibold text-white p-4 m-0 text-2xl text-start border-t-0 border-l-0 border-r-0 border-b border-[#ccc5] rounded-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:outline-none border-solid' to={"/write-blog"} onClick={() => mobileMenuRef.current?.classList.toggle("hidden")}>Write Blog</Link>

              <div className='h-2 bg-[#ccc5]'></div>

              {isLoggedIn && userData && !userData.isAccountVerified && <button className='bg-transparent font-semibold text-white p-4 m-0 text-2xl text-start border-t-0 border-l-0 border-r-0 border-b border-[#ccc5] rounded-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:outline-none border-solid' onClick={() => { navigate("/verify"); mobileMenuRef.current?.classList.toggle("hidden") }}>Verify</button>}

              {isLoggedIn && <button className='bg-transparent font-semibold text-white p-4 m-0 text-2xl text-start border-t-0 border-l-0 border-r-0 border-b border-[#ccc5] rounded-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:outline-none border-solid' onClick={() => { handleLogOut(); mobileMenuRef.current?.classList.toggle("hidden") }}>Log Out</button>}

              {!isLoggedIn && <button className='bg-transparent font-semibold text-white p-4 m-0 text-2xl text-start border-t-0 border-l-0 border-r-0 border-b border-[#ccc5] rounded-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:outline-none border-solid' onClick={() => { navigate("/login"); mobileMenuRef.current?.classList.toggle("hidden") }}>Log In</button>}
            </nav>
          </div>
        </div>

        <div className='hidden sm:flex items-center'>
          <nav className='ml-auto items-center sm:flex'>
            <Link className='py-2 px-4 font-bold text-xl text-white hover:text-gray-200 underline' to={"/"}>Home</Link>
            <Link className='py-2 px-4 font-bold text-xl text-white hover:text-gray-200 underline' to={"/write-blog"}>Write Blog</Link>
          </nav>

          <div ref={menuRef} className='relative'>
            <div className='w-[120px]'>
              {isLoggedIn && <button className='bg-white rounded-full h-10 w-10 text-black p-0'>{userData && userData.email[0]}</button>}
            </div>
            {
              isProfileDropdownOpen &&
              <div className='absolute top-[105%] right-0 w-[120px] flex flex-col text-base bg-slate-800'>
                {isLoggedIn && userData && !userData.isAccountVerified && <button className='bg-transparent text-gray-300 border border-solid border-gray-600 rounded-none hover:border-gray-500' onClick={() => { }}>Verify</button>}

                {isLoggedIn && <button className='bg-transparent text-gray-300 border border-solid border-gray-600 rounded-none hover:border-gray-500' onClick={handleLogOut}>Log Out</button>}
              </div>
            }
          </div>
          {!isLoggedIn && <button className='py-2 px-4 font-bold text-xl text-white border-none hover:text-gray-200 underline bg-transparent active:bg-slate-500 cursor-pointer' onClick={() => navigate("/login")}>Log In</button>}
        </div>
      </section>
      <div className='px-4 flex flex-col max-w-[720px] mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/write-blog' element={<WriteBlog />} />
          <Route path='/blog/:blogId' element={<Blog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  )
}

export default App

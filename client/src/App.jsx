import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './page/Auth'
import Home from './page/Home'
import Profile from './page/Profile'

function App() {

  return (

    <div className='overflow-hidden text-black bg-[#f3f3f3] py-[1rem] px-[1rem] relative'>

      

        {/* blur effects */}
        <div className='absolute right-0 top-[-18%] w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-[72px]'></div>
        <div className='absolute top-[36%] left-[-8rem] w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-[72px]'></div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile mode={"id"}/>} />
        <Route path='/profile/username/:username' element={<Profile mode={"username"}/>} />
        <Route path='auth' element={<Auth />} />
      </Routes>

   </div>

  )
}

export default App

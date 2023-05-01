import React, { useRef, useState } from 'react'
import logo from "../assets/images/logo.png"
import {AiOutlineSearch} from "react-icons/ai"
import { Link, useSearchParams } from 'react-router-dom'

const LogoSearch = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");

  const changeHandler = (e) =>{
    setUsername(e.target.value);
  }
  

  return (
    <div className='flex gap-[0.75rem] overflow-hidden sm:justify-between sm:hidden'>
        <img src={logo} alt="" className='overflow-hidden'/>
        <div className='flex bg-inputColor rounded-lg p-[5px]'>
            <input type="text" onChange={changeHandler} placeholder='#Explore' className='bg-transparent border-[0px] outline-none' />
            <div className='flex justify-center items-center rounded-md p-1 text-white' style={{background:"linear-gradient(106.23deg, #f99827, #f95f35 100%"}}>
              <Link to={`/profile/username/${username}`}>
                <AiOutlineSearch />
              </Link>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch
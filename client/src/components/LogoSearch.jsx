import React from 'react'
import logo from "../assets/images/logo.png"
import {AiOutlineSearch} from "react-icons/ai"

const LogoSearch = () => {
  return (
    <div className='flex gap-[0.75rem] overflow-hidden'>
        <img src={logo} alt="" className='overflow-hidden'/>
        <div className='flex bg-inputColor rounded-lg p-[5px]'>
            <input type="text" placeholder='#Explore' className='bg-transparent border-[0px] outline-none' />
            <div className='flex justify-center items-center rounded-md p-1 text-white' style={{background:"linear-gradient(106.23deg, #f99827, #f95f35 100%"}}>
                <AiOutlineSearch />
            </div>
        </div>
    </div>
  )
}

export default LogoSearch
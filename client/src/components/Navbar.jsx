import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineMenu} from "react-icons/ai"

const Navbar = () => {

    const linkRef = useRef();

    const linksHandler = () =>{
        if(linkRef.current.style.display === "flex"){
            linkRef.current.style.display = "none"
        }
        else{
            linkRef.current.style.display = "flex"
        }
    }

  return (
    <nav className='hidden sm:flex flex-col'>
        <div className='flex justify-between w-full px-3 py-2'>
            <Link>FreePost.com</Link>
            <AiOutlineMenu onClick={linksHandler} className='cursor-pointer'/>
        </div>
        <div ref={linkRef} className='w-full flex-col items-center my-4 gap-2 hidden'>
            <Link to={`/profile/${localStorage.getItem("currentUserId")}`}>Profile</Link>
            <Link to={`/profile/${localStorage.getItem("currentUserId")}`}>Followers</Link>
            <Link to={"/"}>Share Post</Link>
            <Link to={"/chat"}>Chats</Link>
            <Link to={"/"}>Home</Link>
            <Link to={"/auth"}>Logout</Link>
        </div>
    </nav>
  )
}

export default Navbar
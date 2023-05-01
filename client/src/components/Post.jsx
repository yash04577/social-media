import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { FaPaperPlane } from "react-icons/fa"
import { Link } from 'react-router-dom'
import Context from "../context/Context"
const Post = (props) => {


  const context = useContext(Context);

  const [isLiked, setIsLiked] = useState(
    props.data.likes.includes(localStorage.getItem("currentUserId"))
  )

  const handleLike = async() =>{
    const {data} = await axios.put(`http://localhost:8000/post/${props.data._id}/like`, {"userId":localStorage.getItem("currentUserId")});
    const data2 = await axios.get(`http://localhost:8000/post/${context.user._id}/timeline`);
    // const {data} = await axios.get(`https://social-media-yash.vercel.app/post/${context.user._id}/timeline`);
    context.setPosts(data2.data);
  }

  const getData = async() =>{
    
    setIsLiked( props.data.likes.includes(localStorage.getItem("currentUserId")))
  }

  useEffect(()=>{
    getData();
  }, [context.posts])

  return (
    <div className='bg-cardColor rounded-2xl px-3 py-3'>

      <div className='flex gap-2 pl-2 mb-2 items-center'>
        {
          props.data.profilePicture && 
          <Link to={`/profile/${props.data.userId}`}>
            <img src={`http://localhost:8000/images/${props.data.profilePicture}`} className='w-[50px] h-[50px] rounded-[50%] object-cover' />
          </Link>
        }
        <span className='font-bold'>{props.data.name}</span>
        <span className='text-gray'>{props.data.desc}</span>
      </div>

      {
        props.data.image &&
        <img src={`http://localhost:8000/images/${props.data.image}`} className='w-full object-cover rounded-2xl' />
        // <img src={`https://social-media-yash.vercel.app/images/${props.data.image}`} className='w-full object-cover rounded-2xl'/>
      }
      <div className='flex gap-5 text-2xl pt-3'>
        {
          isLiked && 
          <AiFillHeart onClick={handleLike} className='text-[#ff0000]' />
        }
        {
          !isLiked && 
          <AiFillHeart onClick={handleLike}/>
        }
        <BiCommentDetail />
        <FaPaperPlane />
      </div>
      <div className=''>
        {props.data.likes.length} likes
      </div>
      {/* <div className='flex gap-2'>
            <span className='font-bold'>{props.data.name}</span>
            <span className='text-gray'>{props.data.desc}</span>
        </div> */}
    </div>
  )
}

export default Post
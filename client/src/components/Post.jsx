import React, { useState } from 'react'
import {AiFillHeart} from "react-icons/ai"
import {BiCommentDetail} from "react-icons/bi"
import {FaPaperPlane} from "react-icons/fa"

const Post = (props) => {

  return (
    <div className='bg-cardColor rounded-2xl px-3 py-3'>
        {
          props.data.image &&
          <img src={`http://localhost:8000/images/${props.data.image}`} className='w-full max-h-[32rem] object-cover rounded-2xl'/>
        }
        <div className='flex gap-5 text-2xl pt-3'>
            <AiFillHeart />
            <BiCommentDetail />
            <FaPaperPlane />
        </div>
        <div className=''>
            {props.data.likes} likes
        </div>
        <div className='flex gap-2'>
            <span className='font-bold'>{props.data.name}</span>
            <span className='text-gray'>{props.data.desc}</span>
        </div>
    </div>
  )
}

export default Post
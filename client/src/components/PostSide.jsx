import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { PostsData } from '../PostsData'
import Post from './Post'
import PostShare from './PostShare'
import ProfileModal from './ProfileModal'

const PostSide = () => {

  const context = useContext(Context);

  const getData = async() =>{
    const {data} = await axios.get(`http://localhost:8000/post/${context.user._id}/timeline`);
    context.setPosts(data);
  }

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline, context.user])

  return (
    <div className='flex flex-col gap-[1rem] h-screen overflow-auto sm:overflow-x-hidden sm:w-[90vw] sm:text-xs'>
      <PostShare />

      {
          context?.posts?.map(post => {return <Post data={post} />}) 
      }
    </div>
  )
}

export default PostSide
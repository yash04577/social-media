import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import BaseUrl from '../BaseUrl'
import Context from '../context/Context'
import Post from './Post'
import PostShare from './PostShare'

const PostSide = () => {

  const context = useContext(Context);

  const getData = async() =>{
    const {data} = await axios.get(`${BaseUrl}/post/${context.user._id}/timeline`);
    // const {data} = await axios.get(`https://social-media-yash.vercel.app/post/${context.user._id}/timeline`);
    context.setPosts(data);
  }

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline, context.user])

  return (
    <div className='flex flex-col gap-[1rem] min-h-screen overflow-auto sm:overflow-x-hidden sm:w-[90vw] sm:text-xs'>
      <PostShare />

      {
          context?.posts?.map(post => {return <Post data={post} />}) 
      }
      {
        context?.posts?.length == 0 &&
        <div>
          <h1 className='py-2 font-bold text-xl'>Follow people to see their posts</h1>
          <img src="https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/1kutzil5lj0nvfsf_1596544016.jpeg" alt="" />
        </div>
      }
    </div>
  )
}

export default PostSide
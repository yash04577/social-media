import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { PostsData } from '../PostsData'
import Post from './Post'
import PostShare from './PostShare'
import ProfileModal from './ProfileModal'

const PostSide = () => {

  const context = useContext(Context);
  const [allPost, setAllPost] = useState([]);

  const getData = async() =>{
    const {data} = await axios.get("http://localhost:8000/post/643fb026eb0bbb0caf9997c8/timeline");
    setAllPost(data);
    console.log(data);
  }

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline == true])

  return (
    <div className='flex flex-col gap-[1rem] h-screen overflow-auto'>
        <PostShare />
        {/* <ProfileModal /> */}

        {
            allPost.map(post=>{
            return <Post data={post} />
          })
        }
    </div>
  )
}

export default PostSide
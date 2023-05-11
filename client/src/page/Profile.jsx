import axios from 'axios'
import React, { useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import BaseUrl from '../BaseUrl'
import ProfileLeft from '../components/ProfileLeft'
import ProfileModal from '../components/ProfileModal'
import ProfileRight from '../components/ProfileRight'
import RightSide from '../components/RightSide'
import Context from '../context/Context'
import "./home.css"

const Profile = ({mode}) => {

  const context = useContext(Context);
  const {id, username} = useParams();

  const {showProfileModel} = context
  // window.alert(id);

  const getData = async() =>{

    if(mode === "id"){

      const {data} = await axios.get(`${BaseUrl}/user/${id}`);
      // const {data} = await axios.get(`https://social-media-yash.vercel.app/user/${id}`);
      console.log("profile user ", data)
      context.setUser(data);
  
      const postData = await axios.get(`${BaseUrl}/post/${id}/timeline`);
      // const postData = await axios.get(`https://social-media-yash.vercel.app/post/${id}/timeline`);
      context.setPosts(postData.data);
      console.log("profile post ", postData.data)
    }

    else{
      console.log("user con");
      console.log(username)
      const {data} = await axios.get(`${BaseUrl}/user/username/${username}`);
      // const {data} = await axios.get(`https://social-media-yash.vercel.app/user/username/${username}`);
      console.log("profile user ", data)
      context.setUser(data);
  
      const postData = await axios.get(`${BaseUrl}/post/${data._id}/timeline`);
      // const postData = await axios.get(`https://social-media-yash.vercel.app/post/${data._id}/timeline`);
      context.setPosts(postData.data);
      console.log("profile post ", postData.data)
    }

  }


  

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline == true, id])


  useEffect(()=>{
    getData();
  },[])
  return (
      <div className='profile relative sm:flex sm:flex-col py-[1rem] px-[1rem]'>
          {/* <Navbar /> */}
          <ProfileLeft/>
          <ProfileRight />
          <RightSide />
  
          {
            showProfileModel && <ProfileModal/>
          }
      </div>
    )

}

export default Profile
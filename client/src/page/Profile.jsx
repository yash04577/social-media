import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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

      const {data} = await axios.get(`http://localhost:8000/user/${id}`);
      console.log("profile user ", data)
      context.setUser(data);
  
      const postData = await axios.get(`http://localhost:8000/post/${id}/timeline`);
      context.setPosts(postData.data);
      console.log("profile post ", postData.data)
    }

    else{
      console.log("user con");
      console.log(username)
      const {data} = await axios.get(`http://localhost:8000/user/username/${username}`);
      console.log("profile user ", data)
      context.setUser(data);
  
      const postData = await axios.get(`http://localhost:8000/post/${data._id}/timeline`);
      context.setPosts(postData.data);
      console.log("profile post ", postData.data)
    }

  }


  

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline == true])


  useEffect(()=>{
    getData();
  },[])
  return (
      <div className='home relative sm:flex sm:flex-col'>
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
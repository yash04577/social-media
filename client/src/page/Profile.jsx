import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProfileLeft from '../components/ProfileLeft'
import ProfileModal from '../components/ProfileModal'
import ProfileRight from '../components/ProfileRight'
import RightSide from '../components/RightSide'
import Context from '../context/Context'
import "./home.css"
// import { useParams } from 'react-router-dom'
const Profile = () => {

  const context = useContext(Context);
  const {id} = useParams();
  const {showProfileModel} = context
  // window.alert(id);

  const getData = async() =>{
      const {data} = await axios.get(`http://localhost:8000/user/${id}`);
      console.log("profile user ", data)
      context.setUser(data);

      const postData = await axios.get(`http://localhost:8000/post/${id}/timeline`);
      context.setPosts(postData.data);
      console.log("profile post ", postData.data)
  }


  

  useEffect(()=>{
    getData();
    context.setReloadTimeline(false);
  },[context.reloadTimeline == true])


  useEffect(()=>{
    getData();
  },[])
  return (
      <div className='home relative'>
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
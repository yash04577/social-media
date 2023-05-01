import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PostSide from '../components/PostSide'
import ProfileSide from '../components/ProfileSide'
import RightSide from '../components/RightSide'
import Context from '../context/Context'
import "./home.css"

const Home = () => {

  const navigate = useNavigate();
  const context = useContext(Context);

  const authUser = async () => {


    if (localStorage.getItem("jwt")) {
      const { data } = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
      // const { data } = await axios.get(`https://social-media-yash.vercel.app/auth/${localStorage.getItem("jwt")}`);
      context.setUser(data);
      localStorage.setItem("currentUserId", data._id);
    }
    else {
      navigate("/auth")
    }

  }


  useEffect(() => {
    authUser();
  }, [])

  return (
    <div className='home'>
      {
        (context.user.username &&

          <>
            {/* <Navbar /> */}
            <ProfileSide />
            <PostSide />
            <RightSide />
          </>
        )
      }

      {/* <TestUpload /> */}
    </div>
  )
}

export default Home
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostSide from '../components/PostSide'
import ProfileSide from '../components/ProfileSide'
import RightSide from '../components/RightSide'
import TestUpload from '../components/testUpload'
import Context from '../context/Context'
import "./home.css"

const Home = () => {

  const navigate = useNavigate();
  const context = useContext(Context);

  const authUser = async () => {
    if (context.user.username) {
      console.log("if")
    }
    else {
      console.log("else")
      if (localStorage.getItem("jwt")) {
        const { data } = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
        console.log(data);
        context.setUser(data);
      }
      else {
        navigate("/auth")
      }
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
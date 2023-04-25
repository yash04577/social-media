import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileLeft from '../components/ProfileLeft'
import ProfileModal from '../components/ProfileModal'
import ProfileRight from '../components/ProfileRight'
import RightSide from '../components/RightSide'
import Context from '../context/Context'
import "./home.css"

const Profile = () => {

  const context = useContext(Context);
  const {showProfileModel, setShowProfileModel} = context; 
  const navigate = useNavigate();

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
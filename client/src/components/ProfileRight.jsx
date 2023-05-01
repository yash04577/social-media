import React from 'react'
import PostSide from './PostSide'
import ProfileCard from './ProfileCard'

const ProfileRight = () => {
  return (
    <div className='flex flex-col gap-3'>
        <ProfileCard showPost={true}/>
        <PostSide />
    </div>
  )
}

export default ProfileRight
import React from 'react'
import PostShare from './PostShare'
import PostSide from './PostSide'
import ProfileCard from './ProfileCard'

const ProfileRight = () => {
  return (
    <div className='flex flex-col gap-3'>
        <ProfileCard />
        <PostSide />
    </div>
  )
}

export default ProfileRight
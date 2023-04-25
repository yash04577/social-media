import React from 'react'
import FollowersCard from './FollowersCard'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard'
import ProfileModal from './ProfileModal'

const ProfileSide = () => {
  return (
    <div className='flex flex-col gap-[1rem] items-center'>

        {/* <ProfileModal /> */}
        <LogoSearch />
        <ProfileCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileSide
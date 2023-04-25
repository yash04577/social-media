import React from 'react'
import FollowersCard from './FollowersCard'
import InfoCard from './InfoCard'
import LogoSearch from './LogoSearch'

const ProfileLeft = () => {
  return (
    <div className='flex flex-col gap-3'>
        <LogoSearch />
        <InfoCard/>
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft
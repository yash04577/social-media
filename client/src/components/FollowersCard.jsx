import React from 'react'
import { Followers } from '../FollowersData'

const FollowersCard = () => {
  return (
    <div>
        <h3 className='mb-3'>Who is Following</h3>
        <div className='flex flex-col gap-4'>
            {
                Followers.map(user=>{
                    return(
                        <div className='flex gap-[10px] text-xs w-[17rem] justify-between'>
                            <div className='flex gap-2'>
                                <img src={user.img} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                                <div className='flex flex-col justify-center'>
                                    <p>{user.name}</p>
                                    <p>@{user.username}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button className='bg-yellow rounded-lg px-4 py-2'>Follow</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default FollowersCard
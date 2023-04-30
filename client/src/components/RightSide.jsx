import React from 'react'
import home from "../assets/images/home.png"
import comment from "../assets/images/comment.png"
import notification from "../assets/images/noti.png"
import {AiFillSetting} from "react-icons/ai"
import TrendCard from './TrendCard'

const RightSide = () => {
  return (
    <div className='flex flex-col gap-5 sm:hidden'>
        <div className='flex text-3xl items-center justify-around'>
            <img src={home}/>
            <AiFillSetting />
            <img src={notification}/>
            <img src={comment}/>
        </div>
        <TrendCard />
        <div className='w-full'>
            <button className='bg-orange w-full py-4 rounded-2xl text-xl hover:bg-[#fff] hover:border-2 hover:border-orange'>Share</button>
        </div>
    </div>
  )
}

export default RightSide
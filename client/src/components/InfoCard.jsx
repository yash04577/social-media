import React, { useContext } from 'react'
import {BiPencil} from "react-icons/bi"
import Context from '../context/Context';

const InfoCard = () => {

    const context = useContext(Context);
    const {showProfileModel, setShowProfileModel} = context;

  return (
    <div className='bg-cardColor h-[16rem] rounded-2xl flex flex-col gap-3 px-4 py-4'>
        <div className='flex justify-between font-bold'>
            <span>Your Info</span>
            <BiPencil onClick={()=>setShowProfileModel(true)}/>
        </div>
        <div>
            <span className='font-bold mr-2'>Status</span>
            <span>in Relationship</span>
        </div>
        <div>
            <span className='font-bold mr-2'>Lives in</span>
            <span>Multan</span>
        </div>
        <div>
            <span className='font-bold mr-2'>Works at</span>
            <span>Freelancer.com</span>
        </div>
        <div className='w-full mt-4'>
            <button className='bg-orange w-full py-3 rounded-xl'>Logout</button>
        </div>
    </div>
  )
}

export default InfoCard
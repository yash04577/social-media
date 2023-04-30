import React, { useContext } from 'react'
import {BiPencil} from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { Link } from 'react-router-dom';

const InfoCard = () => {

    const context = useContext(Context);
    const {showProfileModel, setShowProfileModel, user} = context;
    const navigate = useNavigate();


    const logoutHandler = async() =>{
        localStorage.clear();
        navigate("/auth");
    }

  return (

    <div className='bg-cardColor h-[16rem] rounded-2xl flex flex-col gap-3 px-4 py-4'>
        <div className='flex justify-between font-bold'>
            <span>Your Info</span>
            {
                user?._id == localStorage.getItem("currentUserId") &&
                <BiPencil onClick={()=>setShowProfileModel(true)} className='cursor-pointer'/>
            }
        </div>
        <div>
            <span className='font-bold mr-2'>Status</span>
            <span>{user?.relationship}</span>
        </div>
        <div>
            <span className='font-bold mr-2'>Lives in</span>
            <span>{user?.livesin}</span>
        </div>
        <div>
            <span className='font-bold mr-2'>Works at</span>
            <span>{user?.worksAt}</span>
        </div>
        <div className='w-full mt-4'>
            {
                user?._id == localStorage.getItem("currentUserId") ?
                <button onClick={logoutHandler} className='bg-orange w-full py-3 rounded-xl hover:bg-[#fff] hover:border-2 hover:border-orange'>Logout</button> :
                <Link to="/" className='bg-orange w-full py-3 rounded-xl px-6 hover:bg-[#fff] hover:border-2 hover:border-orange'>Home</Link>
            }
        </div>
    </div>


  )
}

export default InfoCard
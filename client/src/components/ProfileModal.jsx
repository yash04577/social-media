import React, { useContext, useEffect, useState } from 'react'
import {RxCross2} from "react-icons/rx"
import Context from '../context/Context'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const ProfileModal = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    const {showProfileModel, setShowProfileModel} = context;
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstname:"",
        lastname:"",
        about:"",
        relationship:"",
        worksAt:"",
        livesin:"",
        coverPicture:"",
        profilePicture:"",
    });

    const picture = {};

    const handleImg = async(e) =>{
        if(e.target.files && e.target.files[0]){
            let formData = new FormData();
            formData.append("myFile", e.target.files[0]);
            const {data} = await axios.post(`http://localhost:8000/upload`, formData)
            console.log("upload res", data)

            if(e.target.name == "coverPicture"){
                picture.coverPicture = data;
            }

            if(e.target.name == "profilePicture"){
                picture.profilePicture = data;
            }

            console.log(picture)
        }
    }


    const handleChange = async(e) =>{
        setUserData(prev=>(
            {
                ...prev,
                [e.target.name]: e.target.value

            }
        ))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        userData._id = context.user._id;
        userData.currentUserId = context.user._id; 

        if(picture.coverPicture && picture.profilePicture){
            userData.coverPicture = picture.coverPicture;
            userData.profilePicture = picture.profilePicture;
        }
        else if(picture.profilePicture){
            userData.profilePicture = picture.profilePicture;
        }
        else if(picture.coverPicture){
            userData.coverPicture = picture.coverPicture;
        }
        

        const {data} = await axios.put(`http://localhost:8000/user/${userData._id}`, userData)
        console.log(userData);
        console.log("update res ", data)
    }

    const fetchData = async() =>{

        if (localStorage.getItem("jwt")) {
            const { data } = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
            delete data.password
            setUserData(data)
            // setUserData({firstname:"yash"})
            setLoading(false);
            console.log(data)
        }
    }

    useEffect(()=>{
        fetchData();
        
    },[])

    return (

        loading ? <p>Loading</p> :

        <div className='absolute w-screen h-screen '>
            <div className='bg-[#fff] py-8 px-3 rounded-2xl absolute left-[28%] z-10'>

                <h1 className='font-bold text-center mb-7 text-xl'>Your info</h1>
                <RxCross2 onClick={()=>setShowProfileModel(false)} className='absolute right-5 top-9 text-2xl cursor-pointer' />
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className='flex gap-2 w-full'>
                        <input onChange={handleChange} value={userData.firstname} type="text" placeholder='First Name' name='firstname' className='p-2 rounded-md' />
                        <input onChange={handleChange} value={userData.lastname} type="text" placeholder='LastName' name='lastname' className='p-2 rounded-md w-full' />
                    </div>
                    <input onChange={handleChange} value={userData.about} type="text" placeholder='About' name='about' className='p-2 rounded-md' />
                    <div className='flex gap-2'>
                        <input onChange={handleChange} value={userData.relationship} type="text" placeholder='Relationship' name='relationship' className='p-2 rounded-md' />
                        <input onChange={handleChange} value={userData.worksAt} type="text" placeholder='Works at' name='worksAt' className='p-2 rounded-md w-full' />
                    </div>
                    <input onChange={handleChange} value={userData.livesin} type="text" placeholder='Address' name='livesin' className='p-2 rounded-md' />
                    <div className='flex gap-4 mt-3'>
                        <div>
                            <p>Profile image</p>
                            <input onChange={handleImg} value={picture.profilePicture} type="file" name="profilePicture" id="" />
                        </div>
                        <div>
                            <p>Cover image</p>
                            <input onChange={handleImg} value={picture.coverPicture} type="file" name="coverPicture" id="" />
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-4 mt-3'>
                        <button className='bg-orange py-2 px-6 rounded-xl' type='submit'>Update Profile</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal
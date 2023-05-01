import React, { useContext, useEffect, useState } from 'react'
import {RxCross2} from "react-icons/rx"
import Context from '../context/Context'
import axios from "axios"
import { toast } from 'react-toastify'

const ProfileModal = () => {

    const context = useContext(Context);
    const {setShowProfileModel} = context;
    const [loading, setLoading] = useState(false);
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
            // const {data} = await axios.post(`https://social-media-yash.vercel.app/upload`, formData)

            if(e.target.name == "coverPicture"){
                picture.coverPicture = data;
            }

            if(e.target.name == "profilePicture"){
                picture.profilePicture = data;
            }

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
        
        try {
            setLoading(true)
            const {data} = await toast.promise( axios.put(`http://localhost:8000/user/${userData._id}`, userData), {
            // const {data} = await toast.promise( axios.put(`https://social-media-yash.vercel.app/user/${userData._id}`, userData), {
            pending:"Updating Details...",
            error:"Server Error",
            success:"Details Updated"})
            setLoading(false);
            window.location.reload();
        }
        catch (error) {
            console.log("error on profile modal", error);
        }
        
    }

    const fetchData = async() =>{

        if (localStorage.getItem("jwt")) {
            const { data } = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
            // const { data } = await axios.get(`https://social-media-yash.vercel.app/auth/${localStorage.getItem("jwt")}`);
            delete data.password
            setUserData(data)
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (

        loading ? <p>Loading</p> :

        <div className='absolute w-screen h-screen'>
            <div className='bg-[#fff] w-[50vw] max-w[50vw] py-8 px-3 rounded-2xl absolute left-[22%] z-10 sm:w-[90vw] sm:left-[0px]'>

                <h1 className='font-bold text-center mb-7 text-xl'>Your info</h1>
                <RxCross2 onClick={()=>setShowProfileModel(false)} className='absolute right-5 top-9 text-2xl cursor-pointer' />
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className='flex gap-2 w-full sm:flex-col'>
                        <input onChange={handleChange} value={userData.firstname} type="text" placeholder='First Name' name='firstname' className='p-2 rounded-md' />
                        <input onChange={handleChange} value={userData.lastname} type="text" placeholder='LastName' name='lastname' className='p-2 rounded-md w-full' />
                    </div>
                    <input onChange={handleChange} value={userData.about} type="text" placeholder='About' name='about' className='p-2 rounded-md' />
                    <div className='flex gap-2 sm:flex-col'>
                        <input onChange={handleChange} value={userData.relationship} type="text" placeholder='Relationship' name='relationship' className='p-2 rounded-md' />
                        <input onChange={handleChange} value={userData.worksAt} type="text" placeholder='Works at' name='worksAt' className='p-2 rounded-md w-full' />
                    </div>
                    <input onChange={handleChange} value={userData.livesin} type="text" placeholder='Address' name='livesin' className='p-2 rounded-md' />
                    <div className='flex gap-4 mt-3 sm:flex-col'>
                        <div>
                            <p>Profile image</p>
                            <input onChange={handleImg} value={picture.profilePicture} type="file" name="profilePicture" id="" className='sm:w-full' />
                        </div>
                        <div>
                            <p>Cover image</p>
                            <input onChange={handleImg} value={picture.coverPicture} type="file" name="coverPicture" id="" className='sm:w-full'/>
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
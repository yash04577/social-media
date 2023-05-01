import axios from 'axios';
import React, { useContext, useState } from 'react'
import Context from '../context/Context'
import {FaUserAlt} from "react-icons/fa"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FollowersCard = () => {

    const context = useContext(Context);
    const {user} = context;
    const [followers, setFollowers] = useState([]);
    const [allUser, setAllUser] = useState([]);

    
    // const [isFollowing, setIsFollowing] = useState(Boolean);

    const getFollwer = async(id) =>{

        const {data} = await axios.get(`http://localhost:8000/user/${id}`)
        // const {data} = await axios.get(`https://social-media-yash.vercel.app//user/${id}`)
        setFollowers(prev=>
            [
                ...prev,
                data
            ]
        )

        // user.following.includes(data._id) ? setIsFollowing(true) : setIsFollowing(false);
    }

    const getData = async() =>{

        setFollowers([]);

        user?.followers?.map(id=>{
            console.log("followers ", user.followers)
            getFollwer(id);
        })

        const {data} = await axios.get(`http://localhost:8000/user`)
        // const {data} = await axios.get(`https://social-media-yash.vercel.app/user`)
        setAllUser(data);

    }


    const handleFollow = async(id) =>{
        
        const {data} = await toast.promise( axios.put(`http://localhost:8000/user/${id}/follow`, {currentUserId:localStorage.getItem("currentUserId")}), {
            pending:"Following User please wait...",
            success:"User Followed",
            error:"Server Error"
        })
        // const {data} = await axios.put(`https://social-media-yash.vercel.app/user/${id}/follow`, {currentUserId:localStorage.getItem("currentUserId")})


        const data2 = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
        context.setUser(data2.data);

        toast.success("User Followed")
        
        
    }

    const handleUnfollow = async(id) =>{
        const {data} = await toast.promise( axios.put(`http://localhost:8000/user/${id}/unfollow`, {currentUserId:localStorage.getItem("currentUserId")}), {
            pending:"Unfollowing User please wait...",
            success:"User Unfollowed",
            error:"Server Error"
        })
        // const {data} = await axios.put(`https://social-media-yash.vercel.app/user/${id}/unfollow`, {currentUserId:localStorage.getItem("currentUserId")})


        const data2 = await axios.get(`http://localhost:8000/auth/${localStorage.getItem("jwt")}`);
        context.setUser(data2.data);
        toast.success("User Unfollowed")
    
    }

    

    useState(()=>{
        getData();
    }, context.user)

  return (
    <div>
        <h3 className='mb-3'>People Yoy may Know</h3>
        <div className='flex flex-col gap-4 sm:w-[90vw]'>
            {
                // followers.map(follower=>{
                allUser?.map(follower=>{

                    return(
                        <div className='flex gap-[10px] text-xs w-[17rem] justify-between sm:w-full'>
                            
                            <div className='flex gap-2'>
                                {
                                    follower.profilePicture ? 
                                    <img src={`http://localhost:8000/images/${follower.profilePicture}` } className='w-[3.5rem] rounded-[50%] h-[3.5rem]' /> 
                                    // <img src={`https://social-media-yash.vercel.app/images/${follower.profilePicture}` } className='w-[3.5rem] rounded-[50%] h-[3.5rem]' /> 
                                    : <FaUserAlt className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                                }
                                {/* <img src={`http://localhost:8000/images/${follower.profilePicture}` ?? <FaUserAlt />} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' /> */}
                                <div className='flex flex-col justify-center'>
                                    <p>{follower.firstname}</p>
                                    <Link to={`/profile/${follower._id}`}>
                                        <p>@{follower.username.length > 10 ? follower.username.substring(0, 15)+"..." : follower.username}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='flex items-center'>

                                {
                                    // isFollowing ?
                                    user?.following?.includes(follower._id)?
                                    // follower.following.includes(user._id) ?
                                    <button onClick={()=>handleUnfollow(follower._id)} className='bg-yellow rounded-lg px-4 py-2 hover:bg-[#fff] hover:border-2 hover:border-orange'>Unfollow</button>
                                    : 
                                    <button onClick={()=>handleFollow(follower._id)} className='bg-yellow rounded-lg px-6 py-2 hover:bg-[#fff] hover:border-2 hover:border-orange'>Follow</button>
                                }

                                
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
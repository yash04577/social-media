import axios from 'axios';
import React, { useContext, useState } from 'react'
import Context from '../context/Context'
import {FaUserAlt} from "react-icons/fa"

const FollowersCard = () => {

    const context = useContext(Context);
    const {user} = context;
    const [followers, setFollowers] = useState([]);

    const getFollwer = async(id) =>{

        const {data} = await axios.get(`http://localhost:8000/user/${id}`)
        setFollowers(prev=>
            [
                ...prev,
                data
            ]
        )
    }

    const getData = async() =>{

        user?.followers?.map(id=>{
            console.log("followers ", user.followers)
            getFollwer(id);
        })
    }


    const handleFollow = async(id) =>{
        const {data} = await axios.put(`http://localhost:8000/user/${id}/follow`, {currentUserId:localStorage.getItem("currentUserId")})
        window.alert(data);
    }

    const handleUnfollow = async(id) =>{
        const {data} = await axios.put(`http://localhost:8000/user/${id}/unfollow`, {currentUserId:localStorage.getItem("currentUserId")})
        window.alert(data);
    }

    useState(()=>{
        getData();
    })

  return (
    <div>
        <h3 className='mb-3'>Who is Following</h3>
        <div className='flex flex-col gap-4'>
            {
                followers.map(follower=>{

                    return(
                        <div className='flex gap-[10px] text-xs w-[17rem] justify-between'>
                            {
                                console.log("test follower", follower)
                            }
                            <div className='flex gap-2'>
                                {
                                    follower.profilePicture ? 
                                    <img src={`http://localhost:8000/images/${follower.profilePicture}` } className='w-[3.5rem] rounded-[50%] h-[3.5rem]' /> 
                                    : <FaUserAlt className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                                }
                                {/* <img src={`http://localhost:8000/images/${follower.profilePicture}` ?? <FaUserAlt />} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' /> */}
                                <div className='flex flex-col justify-center'>
                                    <p>{follower.firstname}</p>
                                    <p>@{follower.username}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>

                                {
                                    follower.following.includes(user._id) ?
                                    <button onClick={()=>handleUnfollow(follower._id)} className='bg-yellow rounded-lg px-4 py-2'>Unfollow</button>
                                    : 
                                    <button onClick={()=>handleFollow(follower._id)} className='bg-yellow rounded-lg px-4 py-2'>Follow</button>
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
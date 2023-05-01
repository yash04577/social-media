import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../context/Context'

const ProfileCard = ({ showPost }) => {


    const context = useContext(Context);
    const navigate = useNavigate();
    const { user } = context;
    const [userPostCount, setUserPostCount] = useState(context.posts.filter(post => post.userId === context.user._id).length);

    useEffect(() => {
        setUserPostCount(context.posts.filter(post => post.userId === context.user._id).length)
    }, [context.posts])

    return (
        <div className='rounded-[1.5rem] flex flex-col relative gap-[1rem] overflow-hidden bg-cardColor pb-2 min-w-[280px]'>
            <div className='flex relative flex-col justify-center items-center'>
                <img src={`http://localhost:8000/images/${user?.coverPicture}`} alt="" className='w-full' />
                {/* <img src={`https://social-media-yash.vercel.app/images/${user?.coverPicture}` } alt="" className='w-full'/> */}
                <img src={`http://localhost:8000/images/${user?.profilePicture}`} alt="" className='w-[6rem] rounded-[50%] absolute bottom-[-3rem]' />
                {/* <img src={`https://social-media-yash.vercel.app/images/${user?.profilePicture}`} alt="" className='w-[6rem] rounded-[50%] absolute bottom-[-3rem]'/> */}
            </div>

            <div className='flex flex-col items-center mt-[3rem] gap-[10px]'>
                <span className='font-bold'>{user?.firstname}   {user?.lastname}</span>
                <span>{user?.about ? user?.about : "not available"}</span>
            </div>

            <div className='flex flex-col justify-center items-center gap-[0.75rem]'>
                <hr className='w-11/12' />
                <div className='flex w-full justify-around relative'>
                    <div className='flex flex-col justify-center items-center flex-1'>
                        <span className='font-bold'>{user?.followers?.length}</span>
                        <span>Followers</span>
                    </div>

                    {/* <div className='bg-gray w-[1px] h-full absolute'></div> */}

                    <div className='flex flex-col justify-center items-center flex-1 border-l'>
                        <span className='font-bold'>{user?.following?.length}</span>
                        <span>Following</span>
                    </div>

                    {
                        showPost &&
                        <div className='flex-1 border-l'>
                            {
                                showPost &&
                                <div className='flex flex-col justify-center items-center'>
                                    <span>{userPostCount}</span>
                                    <span>Post</span>
                                </div>
                            }
                        </div>
                    }

                </div>
                <hr className='w-11/12' />
                <div>
                    {
                        !showPost &&
                        <Link to={`/profile/${user._id}`} className='text-orange font-bold py-[30px]'>My Profile</Link>
                    }
                    {
                        showPost && 
                        <Link to={`/`} className='text-orange font-bold py-[30px]'>Explore More</Link>
                    }
                </div>
            </div>

        </div>

    )
}

export default ProfileCard
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import BaseUrl from '../BaseUrl';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

const Conversation = ({ conversationData, id }) => {

    const [user, setUser] = useState({});
    const context = useContext(Context);
    const [userId, setUserId] = useState("");
    const conversationColSm = document.getElementById("conversationColSm");
    const messageColSm = document.getElementById("messageColSm");

    const getData = async () => {
        if (conversationData) {

            const idd = conversationData.members?.filter(id => id != localStorage.getItem("currentUserId"));
            setUserId(idd[0]);
            if (idd) {
                const { data } = await axios.get(`${BaseUrl}/user/${idd[0]}`)
                setUser(data)
            }
        }
        else {
            console.log("else")
            setUserId(id);
            console.log("else2")
            const { data } = await axios.get(`${BaseUrl}/user/${id}`)
            console.log("else3")
            setUser(data)
            console.log(data)
        }
    }

    const clickHandler = () => {
        console.log("cid ", userId)
        context.setConversationId(userId);
        conversationColSm.style.display = "none";
    }

    useEffect(() => {
        getData();
    },[id])

    // conversationId, setConversationId

    return (
        <div className='flex gap-[10px] text-xs w-[17rem] justify-between sm:w-full my-2'>

            <div className='flex gap-4'>
                {
                    user?.profilePicture ?
                        <img src={`${BaseUrl}/images/${user.profilePicture}`} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                        : <FaUserAlt className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                }
                <div className='flex flex-col justify-center font-bold capitalize'>
                    <button onClick={clickHandler}>
                        <p className='text-[white] capitalize text-[14px]'>{user.firstname}</p>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Conversation
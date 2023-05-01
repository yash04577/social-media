import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/Context'


const LoginForm = () => {

    const navigate = useNavigate();

    const context = useContext(Context);
    const [user, setUser] = useState({
        username: "",
        password: "" ,
        mode: "jwt",
        authToken : localStorage.getItem("jwt")
    });

    const changeHandler = (e) =>{
        setUser(prev=>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSwitch = () =>{
        context.setShowLogin((prev)=>!prev);
    }


    const handleLogin = async(e) =>{
       e.preventDefault();
        const {data} = await toast.promise(axios.post("http://localhost:8000/auth/login", user), {
        // const {data} = await toast.promise(axios.post("https://social-media-yash.vercel.app/auth/login", user), {
            pending: "Getting Details...",
            success: "Login Successfull",
            error: "Invalid Credentials"
        });
        context.setUser(data.user)
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("currentUserId", data.user._id)
        navigate("/");
        
    }


    return (
        <div className='bg-cardColor py-4 px-3 rounded-2xl'>
            <h1 className='font-bold text-center mb-7 text-xl'>Log in</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-2'>

                <input type="text" placeholder='Username' className='p-2 rounded-md' name='username' onChange={changeHandler}/>
                <input type="text" placeholder='Password' className='p-2 rounded-md' name='password' onChange={changeHandler}/>

                <div className='flex justify-center items-center gap-4 mt-3'>
                    <button onClick={handleSwitch} className='text-[#551A8B]'>Don't have an account</button>
                    <button type='submit' className='bg-orange py-2 px-6 rounded-xl'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
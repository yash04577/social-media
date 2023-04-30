import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/Context'

const SignupForm = () => {

    const navigate = useNavigate();
    const context = useContext(Context);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const changeHandler = (e) => {
        setUser(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSwitch = () => {
        context.setShowLogin((prev) => !prev);
    }


    const handleSignup = async (e) => {
        e.preventDefault();

        if(user.password === user.confirmPassword){

            try {
                const { data } = await toast.promise(axios.post("http://localhost:8000/auth/register", user), {
                    pending: "Getting Details...",
                    success: "User Registered Successfull",
                    error: "Invalid Credentials"
                });
                navigate("/auth");
            } catch (error) {
                console.log(error)
            }
        }

        else{
            toast.error("password and confirm password must be same")
        }



    }



    return (
        <div className='bg-cardColor py-4 px-3 rounded-2xl sm:w-[90vw]'>
            <h1 className='font-bold text-center mb-7 text-xl'>Sign up</h1>
            <form onSubmit={handleSignup} className='flex flex-col gap-2'>
                <div className='flex gap-2 sm:flex-col'>
                    <input name='firstname' onChange={changeHandler} type="text" placeholder='First Name' className='p-2 rounded-md' />
                    <input name='lastname' onChange={changeHandler} type="text" placeholder='LastName' className='p-2 rounded-md' />
                </div>
                <input name='username' onChange={changeHandler} type="text" placeholder='Username' className='p-2 rounded-md' />
                <div className='flex gap-2 sm:flex-col'>
                    <input name='password' onChange={changeHandler} type="text" placeholder='Password' className='p-2 rounded-md' />
                    <input name='confirmPassword' onChange={changeHandler} type="text" placeholder='Confirm Password' className='p-2 rounded-md' />
                </div>
                <div className='flex justify-center items-center gap-4 mt-3'>
                    <button onClick={handleSwitch} className='text-[#551A8B]'>Already have an account</button>
                    <button type='submit' className='bg-orange py-2 px-6 rounded-xl'>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm
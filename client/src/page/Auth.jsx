import React, { useContext, useState } from 'react'
import logo from "../assets/images/logo.png"
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import TestUpload from '../components/testUpload';
import Context from '../context/Context'

const Auth = () => {

    const context = useContext(Context);
    

    return (
        <div className='flex items-center justify-center h-screen gap-[4rem] relative'>
            <div className='flex gap-7'>
                <img src={logo} alt="" />
                <div>
                    <h1 className='font-bold text-2xl'>ZKC Media</h1>
                    <h6>Explre ideas throuout the world</h6>
                </div>
            </div>

            <div>
               {
                context.showLogin ? <LoginForm /> : <SignupForm />
               }
            </div>


               {/* <TestUpload /> */}

        </div>
    )
}


export default Auth
import React, { useContext } from 'react'
import Context from '../context/Context'

const SignupForm = () => {

    const context = useContext(Context);

    const handleSwitch = () =>{
        context.setShowLogin((prev)=>!prev);
    }

    return (
        <div className='bg-cardColor py-4 px-3 rounded-2xl'>
            <h1 className='font-bold text-center mb-7 text-xl'>Sign up</h1>
            <form action="" className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <input type="text" placeholder='First Name' className='p-2 rounded-md' />
                    <input type="text" placeholder='LastName' className='p-2 rounded-md' />
                </div>
                <input type="text" placeholder='Username' className='p-2 rounded-md' />
                <div className='flex gap-2'>
                    <input type="text" placeholder='Password' className='p-2 rounded-md' />
                    <input type="text" placeholder='Confirm Password' className='p-2 rounded-md' />
                </div>
                <div className='flex justify-center items-center gap-4 mt-3'>
                    <button onClick={handleSwitch} className='text-[#551A8B]'>Already have an account</button>
                    <button className='bg-orange py-2 px-6 rounded-xl'>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm
import React, { useContext, useRef, useState } from 'react'
import profileImg from "../assets/images/profileImg.jpg"
import { IoMdPhotos } from "react-icons/io"
import { BsPlayCircle } from "react-icons/bs"
import { GoLocation } from "react-icons/go"
import { MdCalendarMonth } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"
import axios from 'axios'
import Context from "../context/Context"
import { toast } from 'react-toastify'



const PostShare = () => {

    const imgRef = useRef();
    const [image, setImage] = useState();
    const [postDesc, setPostDesc] = useState("");
    const context = useContext(Context);


    const imgChangeHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmissin = async(e) =>{
        e.preventDefault();
        
        if (image) {

            let formData = new FormData();
            formData.append("myFile", image)
            formData.append("userId", context.user._id)
            formData.append("desc", postDesc)
            try {
                const res = await axios.post("http://localhost:8000/post", formData);
                if(res.status == 200){
                    toast.success("post created")
                    setImage();
                    setPostDesc("");
                    context.setReloadTimeline(true);
                    
                }
            } catch (err) {
                console.log(err);
            }
        }
        else{
            const newPost = {
                userId:context.user._id, 
                desc:postDesc
            }
            const res = await axios.post("http://localhost:8000/post", newPost);
            if(res.status == 200){
                toast.success("post created")
                setImage();
                setPostDesc("");
                context.setReloadTimeline(true);
            }
        }
    }



    return (

        <form onSubmit={handleSubmissin} encType="multipart/form-data">


            <div className='flex flex-col gap-[1rem] bg-cardColor p-[1rem] rounded-[1rem]'>
                <div className='flex gap-2'>
                    <img src={profileImg} alt="" className='rounded-[50%] w-[3rem] h-[3rem]' />
                    <div className='w-full flex flex-col gap-3'>
                        <input type="text" placeholder='Whats Happening!' onChange={(e)=>setPostDesc(e.target.value)} name='desc' className='w-full bg-inputColor py-1 px-2 rounded-md' />
                        <div className='flex w-full justify-between'>

                            <div className='flex items-center gap-1'>
                                <IoMdPhotos />
                                <p onClick={() => imgRef.current.click()}>Photo</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <BsPlayCircle />
                                <p>Video</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <GoLocation />
                                <p>Loaction</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <MdCalendarMonth />
                                <p>Shedule</p>
                            </div>
                            <div>
                                <button type='submit' className='bg-orange px-5 py-1 rounded-lg'>Share</button>
                            </div>
                            <input type="file" ref={imgRef} name="myFile" className='hidden' onChange={imgChangeHandler} />
                        </div>
                    </div>
                </div>

                {
                    image &&
                    <div className='relative'>
                        <img src={URL.createObjectURL(image)} alt="test img" />
                        <RxCross2 className='absolute right-10 top-5 text-3xl cursor-pointer font-bold bg-location' onClick={() => setImage(null)} />
                    </div>
                }


            </div>
        </form>
    )
}

export default PostShare
import axios from 'axios'
import React, { useRef, useState } from 'react'
import BaseUrl from '../BaseUrl';

const TestUpload = () => {

    const imgref = useRef();
    const [image, setImage] = useState();

    const imgChangeHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const testUpload = async(e) =>{
        e.preventDefault();

        
        let formData = new FormData();
        formData.append("myFile", image)
        // const res = await axios.post("http://localhost:8000/upload", formData);
        // const res = await axios.post("http://localhost:8000/post/", formData);
        const res = await axios.post(`${BaseUrl}/post/`, formData);
        console.log(res);

    }


    return (
        <div>

            <form onSubmit={testUpload} encType="multipart/form-data">
                <input type="file" onChange={imgChangeHandler} name="myFile" />
                <button type="submit">upload</button>
            </form>
        </div>
    )
}

export default TestUpload
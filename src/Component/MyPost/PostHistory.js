import React from 'react'
import MyPost from './MyPost'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from'axios';

const PostHistory = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [arr, setArr] = useState([]);
    useEffect(() => {
        Axios.get("https://mindwell-connect-backend.onrender.com/post/user-post/"+user.email)
            .then((res) => {
                if (res.status === 200){
                    setArr(res.data)
                }else
                    Promise.reject();
            })
            .catch((err) => alert(err))
    }, [])

    const ListPost = () => {
        return arr.map((val, ind) => { 
            return <MyPost key={ind} obj={val} />
        })
    }
    return (
        <>
        <div className='container'>
            <h1 className='text-center mt-4'>User Post History</h1>
            <div className="row" style={{paddingTop: '80px'}}>
                <ListPost/>
            </div>
        </div>
        </>
    )
}

export default PostHistory

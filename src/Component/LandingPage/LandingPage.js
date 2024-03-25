import React from 'react'
import { useEffect,useState,useReducer } from 'react'
import Post from './../Posts/Post'
import './LandingPage.css'
import Axios from 'axios'
import SendPost from '../SendPost/SendPost'
const LandingPage = () => {
    const [arr, setArr] = useState([]);
    const [reducerValue, forceUpdate]= useReducer(x => x + 1, 0);
    useEffect(() => {
        Axios.get("https://mindwell-connect-backend.onrender.com/post/")
            .then((res) => {
                if (res.status === 200){
                    setArr(res.data)
                    console.log(res.data)
                }else
                    Promise.reject();
            })
            .catch((err) => console.log(err))
    }, [reducerValue])

    const ListPost = () => {
        return arr.map((val, ind) => { 
            return <Post key={ind} obj={val} refresh={forceUpdate} />
        })
    }

    return (
        <div>
            <div className="conatiner">
                <div className="row">
                    <div className='col-11'>
                        <div className='row'>
                    <ListPost/>
                    </div>
                    </div>
                    <div className="col-1">
                        <SendPost refresh={forceUpdate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage

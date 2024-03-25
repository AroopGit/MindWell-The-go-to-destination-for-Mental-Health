import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import profile_img from '../../img/icons8-person-30.png'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [username, setUsername] = useState('')
    const [profile, setProfile] = useState(profile_img)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        navigate('/login');
        window.location.reload();
    };
    useEffect(() => {
        
        if (user?.id) {
            const token = user?.token;
            const decodedToken = decode(token);
            setUsername(decodedToken.given_name)
            setProfile(user.profilePicture)
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
            setUser(JSON.parse(localStorage.getItem('profile')));
        } else {
            setUsername(user?.usr);
            const token = user?.token;
            if (token) {
                const decodedToken = decode(token);
                if(!user.profilePicture===null){
                    setProfile(user.profilePicture)
                }
                if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
            }
            setUser(JSON.parse(localStorage.getItem('profile')));
        }
    }, [location]
    );


    const RenderMenu = () => {

        if (user) {
            return (

                <>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/resources">Resources</Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/chat">Chat</Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/username">Welcome ,{username} <img height="25px" style={{ borderRadius: 50 }} src={profile}></img></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item mx-2">
                            <Link className="nav-link active text-success" aria-current="page" to="/login">Login</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active text-success" aria-current="page" to="/signup">Signup</Link>
                        </li> */}
                        <button className="btn button mx-2" type="submit" onClick={handleLogout}>Logout</button>
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/resources">Resources</Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/chat">Chat</Link>
                        </li> */}
                    {/* <li className="nav-item mx-5">
                            <Link className="nav-link active" aria-current="page" to="/username">Username</Link>
                        </li>
                    </ul> */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active text-success" aria-current="page" to="/login">Login</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active text-success" aria-current="page" to="/signup">Signup</Link>
                        </li>
                        {/* <button className="btn btn-outline-success mx-2" type="submit">Logout</button> */}
                    </ul>
                </>

            )
        }
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="nav-brand text-light" style={{textDecoration: 'none'}} href="/">MindWell Connect</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <RenderMenu />
                </div>
            </div>
        </nav>
    )
}

export default Navbar

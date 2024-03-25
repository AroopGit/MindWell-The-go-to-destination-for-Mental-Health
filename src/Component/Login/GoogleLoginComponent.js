import React from 'react';
import { GoogleLogin as LoginButton } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode'
import axios from 'axios';
const GoogleLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async (response) => {
    const result = response.clientId;
    const token = response.credential;
    const data=decode(token);
    const email=data.email;
    const usr=data.given_name;
    try {
      try {
        const response = await axios.post('https://mindwell-connect-backend.onrender.com/app/signup', {
            name:usr,
            email:email,
            password:token,
            googleauth:true,
            profilePicture:data.picture
        });
      } catch (error) {
        if(error.response.status===400){
            // setAlertMessage('User Already Exists!!!');
            // setAlertType('failure');
            // setShowAlert(true);
        }else{
            // setAlertMessage('Something Went Worng! Try Again Later!!!');
            // setAlertType('failure');
            // setShowAlert(true);
        }
    }

      dispatch({ type:"AUTH", data: { result, token,id:true,email,usr} });
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginButton
      onSuccess={handleSignIn}
      theme="filled_black"
      text="signin_with"
      shape="circle"
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleLoginComponent;
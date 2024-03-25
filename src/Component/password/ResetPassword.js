import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './ForgotPassword.css'
import CustomAlert from '../../custom/CustomAlert'

const ResetPassword = () => {
    const { token,email} = useParams();
    const [key,value]=token.split('=')
    const ftoken=value;
    const [key1,value1]=email.split('=')
    const femail=value1;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
     const handleCloseAlert = () => {
      setShowAlert(false);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }else{
      try {
      await axios.post('https://mindwell-connect-backend.onrender.com/app/api/reset-password', {femail,ftoken, newPassword: password });
      setAlertMessage('Password Has Reseted  successfully!!');
      setAlertType('success');
      setShowAlert(true);
      navigate('/');
    } catch (error) {
      if(error.response.status===400){
        setAlertMessage('Error: User Not Found!!');
        setAlertType('failure');
        setShowAlert(true);
      }else if(error.response.status===401){
        setAlertMessage('Error:Invalid Token or Token expired!!');
        setAlertType('failure');
        setShowAlert(true);
      }else{
        setAlertMessage('Something Went Worng! Try Again Later!!!');
        setAlertType('failure');
        setShowAlert(true);
      }
    }}
  };

  return (
    <div>
      <CustomAlert
        message={alertMessage}
        visible={showAlert}
        onClose={handleCloseAlert}
        type={alertType}
      />
    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ border: 'none' }}>
              <div className="card card-body p-md-5" style={{ border: 'none' }}>
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Reset Password</p>

                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="pass" className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example3c">New Password</label>
                          <input type="password" id="pass" className="form-control" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                          <label className="form-label" htmlFor="form3Example3c">confirm Password</label>
                        </div>
                      </div>

                      <div className="action d-flex align-items-center justify-content-center mx-1 mb-3 mb-lg-4">
                        <button type="submit" className="btn button btn-lg d-flex justify-content-end">Reset Password</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  </div >
  );
};

export default ResetPassword;

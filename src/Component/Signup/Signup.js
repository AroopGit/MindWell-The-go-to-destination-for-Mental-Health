import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../custom/CustomAlert'
import './Signup.css'

const Signup = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();
    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mindwell-connect-backend.onrender.com/app/signup', {
                name,
                email,
                password,
            });

            // Handle successful registration here (e.g., store JWT token, update user state)
            //   console.log('Registration successful:', response.data);
            setAlertMessage('Registration Success!!!');
            setAlertType('failure');
            setShowAlert(true);
            navigate('/');
        } catch (error) {
            if(error.response.status===400){
                setAlertMessage('User Already Exists!!!');
                setAlertType('failure');
                setShowAlert(true);
            }else{
                setAlertMessage('Something Went Worng! Try Again Later!!!');
                setAlertType('failure');
                setShowAlert(true);
            }
        }
    }
    const handlenameChange = (e) => {
        const newname = e.target.value;
        setName(newname);
    };
    const handleemailChange = (e) => {
        const newemail = e.target.value;
        setEmail(newemail);
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleRepeatPasswordChange = (e) => {
        const newRepeatPassword = e.target.value;
        setRepeatPassword(newRepeatPassword);
    };

    const passwordsMatch = password === repeatPassword;


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
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ border: 'none' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form onSubmit={handleRegister} className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        {/* <input value={name} type="text" id="form3Example1c" className="form-control"
                                                         onChange={handlenameChange}/> 
                                                        <label className="form-label" for="form3Example1c">Your Name</label> */}
                                                        <input value={name} type="text" id="form3Example1c" className="form-control" onChange={handlenameChange} />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        {/* <input value={email} type="email" id="form3Example3c" className="form-control"
                                                         onChange={handleemailChange}/> 
                                                        <label className="form-label" for="form3Example3c">Your Email</label> */}
                                                        <input value={email} type="email" id="form3Example3c" className="form-control" onChange={handleemailChange} />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className={`d-flex flex-row align-items-center mb-4 ${passwordsMatch ? '' : 'has-warning'}`}>
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        {/* <input value={password} type="password" id="form3Example4c"  className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                                                         onChange={handlePasswordChange}/>
                                                        <label className="form-label" for="form3Example4c">Password</label> */}
                                                        <input value={password} type="password" id="form3Example4c" className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                                                            onChange={handlePasswordChange} />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div className={`d-flex flex-row align-items-center mb-4 ${passwordsMatch ? '' : 'has-warning'}`}>
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        {/* <input value={repeatPassword} type="password" id="form3Example4cd" 
                                                       className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                                                       onChange={handleRepeatPasswordChange} />
                                                        <label className="form-label" for="form3Example4cd">Repeat your password</label> */}
                                                        <input value={repeatPassword} type="password" id="form3Example4cd" className={`form-control ${passwordsMatch ? '' : 'is-invalid'}`}
                                                            onChange={handleRepeatPasswordChange} />
                                                        <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>
                                                {!passwordsMatch && (
                                                    <div className="alert alert-danger" role="alert">
                                                        Passwords do not match.
                                                    </div>
                                                )}

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn button btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup

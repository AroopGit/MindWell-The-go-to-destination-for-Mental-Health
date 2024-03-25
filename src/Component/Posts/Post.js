import React, { useEffect, useState } from 'react'
import './Post.css'
import axios from 'axios'
import moment from 'moment';
import CustomAlert from '../../custom/CustomAlert'
import { Modal, Button } from 'react-bootstrap';

const Post = (props) => {
    const { _id, title, message, name, creator, selectedFile, likes, comments, createdAt } = props.obj;
    const user = JSON.parse(localStorage.getItem('profile'));
    const [count, setCount] = useState(likes.length);
    const [ccount, setccount] = useState(comments.length)
    const userId = user?.email;
    const hasLikedPost = likes.find((email) => email === userId);
    const [showComments, setShowComments] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [usrname, setname] = useState('')
    const [usremail, setemail] = useState('')
    const [bio, setbio] = useState('')
    const [images, setImages] = useState('');
    const [expert, setexpert] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('https://mindwell-connect-backend.onrender.com/app/users/' + creator);
            const data = response.data;
    
            console.log('Response data:', data);
    
            if (Array.isArray(data) && data.length > 0) {
              const userData = data[0];
              setname(userData.name);
              setemail(userData.email);
              setexpert(userData.expert);
              setbio(userData.bioData);
              setImages(userData.profilePicture)
            } else {
              alert('User not found');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        // Call the fetchUserData function
        fetchUserData();
      }, [creator]);


    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const showprofile=()=>{
        setIsEditModalOpen(true);
    }

    const toggleCommentSection = () => {
        setCommentVisible(!commentVisible);
    };
    const submitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('https://mindwell-connect-backend.onrender.com/post/comment-post/' + _id, {
                text: commentText,
                username: user.usr,
                email: user.email
            });
            toggleCommentSection();
            setAlertMessage('comment added!!');
            setAlertType('success');
            setShowAlert(true);
            props.refresh();
        } catch (error) {
            setAlertMessage('comment not added!!');
            setAlertType('failure');
            setShowAlert(true);
        }
    };
    const toggleComments = () => {
        setShowComments(!showComments);
    };
    const RenderImg = () => {
        if (selectedFile != "") {
            return (
                <img className="card-img-top" src={selectedFile} alt="" height="300px" width="1px" />
            )
        }
    }
    const handleLike = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mindwell-connect-backend.onrender.com/post/like-post', {
                _id, email: userId
            });
            setCount(likes.length)
            props.refresh();
        } catch (error) {
        }
    };
    const RenderLike = () => {
        if (hasLikedPost) {
            return (
                <i id='heart' className="fa-solid fa-heart heart-icon m-2 p-2" style={{ color: "red" }} onClick={handleLike}>{count}</i>
            )
        } else {
            return (
                <i id='heart' className="fa-solid fa-heart heart-icon m-2 p-2" onClick={handleLike}>{count}</i>
            )
        }
    }
    const RenderAction = () => {
        if (user) {
            return (

                <div id='ico' className="icons">
                    <RenderLike />
                    <i className="fa-regular fa-comment m-2" onClick={toggleCommentSection}>{ccount}</i>
                    <i className="fa-solid fa-share m-2"></i>
                </div>
            )
        }
    }
    function deletecomment(commentId) {
        axios.delete(`https://mindwell-connect-backend.onrender.com/post/delete-comment/${_id}/${commentId}`)
            .then(response => {
                setAlertMessage('Comment deleted successfully:');
                setAlertType('success');
                setShowAlert(true);
                props.refresh();
            })
            .catch(error => {
                alert(error)
                setAlertMessage('Error deleting comment');
                setAlertType('failure');
                setShowAlert(true);
            });
    }
    const RenderComments = () => {
        if (user) {
            return (
                <>
                    <div className="mt-3">
                        <button onClick={toggleComments} className="btn btn-primary">
                            {showComments ? 'Hide Comments' : 'Show Comments'}
                        </button>
                    </div>
                    {showComments && (
                        <div className="mt-3 bg-secondary">
                            {comments.map((comment, index) => (
                                <div className='mt-3-comment' key={index}>
                                    <h6 className='bg-primary'><i className="fa-regular fa-user m-2"></i>{comment.userName} . {moment(comment.createdAt).fromNow()} {comment.email === user.email && <i class="fa-solid fa-trash-can m-2" onClick={() => deletecomment(comment._id)}></i>}</h6>
                                    <p className='bg-secondary'>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )
        }
    }

    return (
        <div className='col-md-6 mt-5'>
            <CustomAlert
                message={alertMessage}
                visible={showAlert}
                onClose={handleCloseAlert}
                type={alertType}
            />
            <div className="card" style={{ width: '100%', border: '1px solid var(--dark)' }} >
                {/* <button onClick={togglePopup} className="user-details-button">
          {name} ({moment(createdAt).fromNow()})
        </button> */}
                <h5 className="card-title"><button onClick={showprofile} className="btn btn-primary"><i className="fa-regular fa-user m-2"></i></button>{name} ({moment(createdAt).fromNow()})</h5>
                <RenderImg />
                <p className="card-text card-title ms-3 py-2">{title}</p>
                <div className="card-body">
                    <p className="card-text">{message}</p>
                    <RenderAction />
                    {commentVisible && (
                        <div>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows="4"
                                cols="50"
                                placeholder="Type your comment here"
                            ></textarea>
                            <button className='btn btn-primary' onClick={submitComment}>Submit Comment</button>
                        </div>
                    )}
                    <RenderComments />
                    <Modal size="xl"  show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container-xl px-4 mt-4 ">
                    <h1 className='text-center'>User Profile</h1>
                    <hr className="mt-0 mb-4" />
                    <div className="row">
                        <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2" alt="http://bootdey.com/img/Content/avatar/avatar1.png" src={images||"http://bootdey.com/img/Content/avatar/avatar1.png"} />
                            <h3>{usrname}{expert&&"(Expert)"}</h3>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                           
                                <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername">Username </label>
                                <input className="form-control"
                                    id="inputUsername"
                                    type="text"
                                    defaultValue={usrname}
                                    name="username"
                                    value={usrname}
                                    readOnly/>
                                </div>
                                <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                <input className="form-control" id="inputEmailAddress" type="email" defaultValue={usremail} value={usremail} readOnly />
                                <div className="mb-3">
                                </div>
                                </div>
                                </div>
                                <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputBioData">
                                    Bio Data
                                </label>
                                <textarea
                                    className="form-control"
                                    id="inputBioData"
                                    defaultValue={bio}
                                    name="bioData"
                                    value={bio}
                                 readOnly
                                />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                </div>
            </div>
        </div>
    )
}

export default Post

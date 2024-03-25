import React, { useState } from 'react';
import './SendPost.css';
import ImagePreview from '../ImagePreview/ImagePreview';
import axios from 'axios';
import FileBase from 'react-file-base64';
import CustomAlert from '../../custom/CustomAlert'
const SendPost = (props) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [images, setImages] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleFileChange = (file) => {
        // `file.base64` contains the base64 representation of the selected file
        setSelectedFile(file);
        setImages(file.base64)
    };
    const handleUnmount = () => {
        if (previewURL) {
            URL.revokeObjectURL(previewURL);
        }
    };
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };
    const handleDiscard = () => {
        setSelectedFile(null);
        setImages('');
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const CreatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mindwell-connect-backend.onrender.com/post/new-post', {
                title,
                message: content,
                name: user.usr,
                creator: user.email,
                selectedFile: images
            });
            props.refresh();
            setAlertMessage('Post created successfully!!');
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            setAlertMessage('Post not created successfully!!');
            setAlertType('failure');
            setShowAlert(true);
        }
    }

    if (!user) {
        return (
            <div className='post-section shadow p-3 mb-5 bg-white rounded'>
                <h3 className="text-center">LogIn to share About your Mental Health</h3>
            </div>
        );
    }

    return (
        <div className='post-section shadow p-3 mb-5 bg-white rounded'>
            <CustomAlert
                message={alertMessage}
                visible={showAlert}
                onClose={handleCloseAlert}
                type={alertType}
            />
            <form onSubmit={CreatePost} className="was-validated">
                <h6 className="title"><i className="fa-regular fa-user m-2"></i>{user?.usr}</h6>
                <label htmlFor="form" className='post-heading' >Post Here</label>

                <div className="post-image justify-content-center my-3">
                    <div className='justify-content-center' style={{ width: '80%', height: '80%' }}>
                        <FileBase type="file" multiple={false} onDone={handleFileChange} />
                        {images && (
                            <div>
                                <img className='justify-content-center p-3' style={{ width: '70%', height: '100%' }} src={selectedFile.base64} alt="Preview Image" />
                                <button type="button" className='btn btn-danger my-2' onClick={() => handleDiscard()}>
                                    Discard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <input className="form-control caption" type="text" placeholder="Title of the post" value={title} onChange={handleTitle} required />
                    <div className="invalid-feedback">
                        Please provide a title for the post.
                    </div>
                    <input className="form-control caption" type="text" placeholder="Write something here" value={content} onChange={handleContent} required />
                    <div className="invalid-feedback">
                        Please write something in the post.
                    </div>
                    <div className="send-button p-2 d-flex justify-content-end mx-4">
                        <button className="btn send btn-sm" type="submit"><i className="fa-regular fa-paper-plane"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SendPost

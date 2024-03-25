import React, { useState } from 'react';
import './MyPost.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import FileBase from 'react-file-base64';
const MyPost = (props) => {
    const { _id,title,message,name,creator,selectedFile,likes,comments,createdAt,} = props.obj;
    const [images, setImages] = useState(selectedFile);
    const [uptitle,setTitle]=useState(title);
    const [content,setContent]=useState(message);
    const [newselectedFile, setSelectedFile] = useState(selectedFile);
    const [previewURL, setPreviewURL] = useState(selectedFile);

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

    const editPost = () => {
        setIsEditModalOpen(true);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));

    const updatePost = async () => {
        try {
            const response = await axios.post(
                `https://mindwell-connect-backend.onrender.com/post/update-post/${_id}`,{
                    title:uptitle,
                    message:content,
                    selectedFile:images
                }
            );
            if (response.status === 200) {
                setIsEditModalOpen(false);
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    };

    const deletePost = async () => {
        try {
            const response = await axios.delete(
                'https://mindwell-connect-backend.onrender.com/post/delete-post/' + _id
            );
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    };
    const handleDiscard = () => {
        setSelectedFile(null);
        setImages('');
    };

    return (
        <>
            <div className="col-4 mt-5">
                <div
                    className="card"
                    style={{ width: '100%', border: '1px solid var(--dark)' }}
                >
                    <h5 className="card-title">
                        <i className="fa-regular fa-user m-2"></i>
                        {name}
                    </h5>
                    <img
                        className="card-img-top"
                        src={selectedFile}
                        alt="Card image cap"
                        height="300px"
                        width="1px"
                    />
                    <div className="card-body">
                        <p>Title:-{title}</p>
                        <p className="card-text">{message}</p>
                        <div id="ico" className="my-icons">
                            <i className="fa-solid fa-pen m-2" onClick={editPost}></i>
                            <i
                                className="fa-solid fa-trash-can m-2"
                                onClick={deletePost}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title:</label>
                    <input
                        type="text"
                        defaultValue={title}
                        name="title"
                        value={uptitle}
                        onChange={handleTitle}
                    />
                    <label>Message:</label>
                    <textarea
                        defaultValue={message}
                        name="message"
                        value={content}
                        onChange={handleContent}
                    ></textarea>
                    <label>Image:</label>
                    <FileBase type="file" multiple={false} onDone={handleFileChange} />
                         {images && (<div><img className='justify-content-center p-3'style={{ width: '70%', height: '100%' }}src={newselectedFile} alt="Preview Image"/>  </div>)}
                         <button type="button" className='btn btn-danger' onClick={() => handleDiscard()}>
                             Discard
                         </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updatePost}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyPost;

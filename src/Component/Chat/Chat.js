import React, { useState } from 'react'
import './Chat.css'

const Chat = () => {

  const [images, setImages] = useState([])

  const onImageChange = (e) => {
    setImages([...e.target.files])
  }

  return (
    <div>
      {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Chat</button>

      <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-center" id="offcanvasRightLabel">Profile</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          ...
        </div>
      </div> */}

      <div className="chat">
        <div className="chat-container container-fluid p-2">
          <div className="chat-row">
            <h6 className="title"><i className="fa-regular fa-user m-2"></i>Users Name</h6>
            <div className="chat-history">History...</div>
            <div className="chat-body">
              <div className="form-group">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
              </div>
              <div className="btn-group dropup my-3">
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ border: 'none' }} >
                  {/* <i className="fa-solid fa-paperclip"></i> */}
                  <i className="fa-regular fa-image"></i>
                </button>
                <div className="dropdown-menu">
                  {/* <a className="dropdown-item" href="#"><i className="fa-regular fa-image"></i></a>
                <a className="dropdown-item" href="#"><i className="fa-solid fa-video"></i></a> */}
                  <input type="file" multiple accept="image/*" onChange={onImageChange} />
                </div>
                <button className="btn btn-sm" type="submit"><i className="fa-regular fa-paper-plane"></i></button>
              </div>
              <h2>To be Implemented in future</h2>
            </div>
          </div>
        </div>
        <img src="https://cdn.dribbble.com/users/1544818/screenshots/12575677/media/c261ef2d5f6b3670baec70cba8002c02.png?resize=1600x1200&vertical=center" className="image"></img>
      </div>
    </div>
  )
}

export default Chat

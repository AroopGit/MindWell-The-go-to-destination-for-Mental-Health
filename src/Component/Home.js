import React from 'react'
import './Home.css'
import LandingPage from './LandingPage/LandingPage'
import SendPost from './SendPost/SendPost'


const Home = () => {

  return (
    <div className="container-fluid">
      <div class="row">
        <div className="col-9 col-home">
          <div className='row'>
          <LandingPage />
          </div>
        </div>
        {/* <div className="col col-chat">
          <SendPost />
        </div> */}
      </div>
    </div>
  )
}

export default Home

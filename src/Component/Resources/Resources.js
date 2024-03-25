import React from 'react';
import Data from './Data.js'
import './res.css'
const Resources = (props) => {
  return (
    <div className="resources-page">
      <h1>Mental Health Resources</h1>
      <section className='blogs'>
        <h2>Blogs</h2>
        <div className="resource-list">
          {Data
            .filter((Resources) => Resources.type === "blog")
            .map((blog, index) => (
              <div className="resource-item" key={index}>
                <div className="card res-card">
                  <h3>{blog.title}</h3>
                  <img src={blog.image} alt="Resource Image" className="card-image" />
                  <p>{blog.description}</p>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section>
        <h2 id='heading'>Videos</h2>
        <div className="resource-list">
          {Data
            .filter((Resources) => Resources.type === "video")
            .map((video, index) => (
              <div className="resource-item" key={index}>
                <div className="card res-card">
                  <h3>{video.title}</h3>
                  <img src={video.image} alt="Resource Image" className="card-image" />
                  <p>{video.description}</p>
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    Watch Now!
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
export default Resources;

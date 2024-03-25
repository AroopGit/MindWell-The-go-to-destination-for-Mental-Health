import React, { useState } from 'react';

const ImagePreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewURL(previewUrl);
    }
  };

  const handleUnmount = () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
  };

  return (
    <div className='justify-content-center' style={{ width: '80%', height: '80%' }}>
      {/* <i className="fa-regular fa-image">
      </i> */}
        <input type="file" onChange={handleFileChange} />

      {selectedFile && <img className='justify-content-center p-3' style={{ width: '70%', height: '100%' }} src={previewURL} alt="Preview Image" />}
    </div>
  );
};

export default ImagePreview;
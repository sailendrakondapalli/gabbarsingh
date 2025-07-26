// UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image); // 👈 Must match backend field name

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setUrl(res.data.imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>Uploaded Image:</p>
          <img src={url} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
}

export default UploadForm;

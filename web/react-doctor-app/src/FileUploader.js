import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        'http://localhost:3000/parse/upload',
        formData,
      );

      onUploadComplete(response.data);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload file</button>
    </div>
  );
};

export default FileUploader;

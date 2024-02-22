import React, { useState } from 'react';
import FileUploader from './FileUploader';
import DataTable, { AbnormalValues } from './DataTable';

const App: React.FC = () => {
  const [abnormalValues, setAbnormalValues] = useState<AbnormalValues | null>(
    null,
  );

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3100/parse/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setAbnormalValues(result.abnormalValues);
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Doctor App</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {abnormalValues && <DataTable data={abnormalValues} />}
    </div>
  );
};

export default App;

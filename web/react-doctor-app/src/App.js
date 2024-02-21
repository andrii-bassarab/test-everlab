import React, { useState } from 'react';
import FileUploader from './FileUploader';
import DataTable from './DataTable';

const App = () => {
  const [abnormalValues, setAbnormalValues] = useState(null);

  const handleUploadComplete = (data) => {
    setAbnormalValues(data.abnormalValues);
  };

  return (
    <div>
      <FileUploader onUploadComplete={handleUploadComplete} />
      {abnormalValues && <DataTable data={abnormalValues} />}
    </div>
  );
};

export default App;

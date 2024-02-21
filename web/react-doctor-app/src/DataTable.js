import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([testName, testValue]) => (
          <tr key={testName}>
            <td>{testName}</td>
            <td>{testValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

import React from 'react';

export interface AbnormalValues {
  [key: string]: number;
}

interface DataTableProps {
  data: AbnormalValues;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Test Value</th>
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

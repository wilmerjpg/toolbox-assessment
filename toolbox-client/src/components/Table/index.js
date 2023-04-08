import React from 'react';

import BootstrapTable from 'react-bootstrap/Table';

export default function Table({ headers = {}, data = [] }) {
  return (
    <BootstrapTable striped bordered hover responsive>
      <thead>
        <tr>
          {Object.values(headers).map((header, index) => (
            <th key={`header-${index}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, itemIx) => (
          <tr key={`row-${itemIx}`}>
            {Object.keys(headers).map((header) => (
              <td key={`row-${itemIx}-${header}`}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
}

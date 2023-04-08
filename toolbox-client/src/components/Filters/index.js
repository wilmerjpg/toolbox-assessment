import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Filters({ filters, handleChangeFilters, isLoading }) {
  const handleChangeFileName = (e) => {
    handleChangeFilters('fileName', e.target.value);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>File Name</Form.Label>
        <Form.Control
          placeholder="Enter file name"
          onChange={handleChangeFileName}
          value={filters.fileName}
          disabled={isLoading}
        />
      </Form.Group>
    </Form>
  );
}

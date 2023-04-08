import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

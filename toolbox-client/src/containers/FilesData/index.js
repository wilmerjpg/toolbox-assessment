import React, { useState } from 'react';
import Table from '../../components/Table';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import useFiles from '../../hooks/useFiles';

const HEADERS = {
  file: 'File Name',
  text: 'Text',
  number: 'Number',
  hex: 'Hex',
};

function FilesData() {
  const [filters, setFilters] = useState({
    fileName: '',
  });
  const { data, isLoading } = useFiles({ filters });

  const handleChangeFilters = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div>
      <Header title="React Test App" />
      <div className="mx-4 my-3">
        <Filters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          isLoading={isLoading}
        />
        {isLoading ? <Loader /> : <Table headers={HEADERS} data={data} />}
      </div>
    </div>
  );
}

export default FilesData;

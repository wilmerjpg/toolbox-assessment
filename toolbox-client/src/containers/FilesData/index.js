import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { BackendAPI } from '../../api';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

const HEADERS = {
  file: 'File Name',
  text: 'Text',
  number: 'Number',
  hex: 'Hex',
};

const backendAPI = new BackendAPI();

function FilesData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await backendAPI.getFilesData({
          signal: controller.signal,
        });

        setData(response);
      } catch (e) {
        let messageError = e;
        if (typeof e === 'object' && e !== null && 'message' in e) {
          messageError = e.message;
        }

        if (messageError !== 'canceled') {
          console.error(messageError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <div>
      <Header title="React Test App" />
      <div className="mx-4 my-3">
        {isLoading ? <Loader /> : <Table headers={HEADERS} data={data} />}
      </div>
    </div>
  );
}

export default FilesData;

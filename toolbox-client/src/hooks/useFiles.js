import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { BackendAPI } from '../api';

const backendAPI = new BackendAPI();

function useFiles({ filters }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 1000);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const { fileName } = debouncedFilters;
      try {
        setIsLoading(true);
        const response = await backendAPI.getFilesData({
          signal: controller.signal,
          params: {
            fileName,
          },
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
  }, [debouncedFilters]);

  return {
    data,
    isLoading,
  };
}

export default useFiles;

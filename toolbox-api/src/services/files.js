import { getFileData, getFiles } from '../lib/files-external-api.js';
import { getValidRecordsFromCSV } from '../utils.js';

const getFilesData = async () => {
  const { files = [] } = await getFiles();
  const filesData = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const file = await getFileData(files[i]);
      const records = getValidRecordsFromCSV(file);
      filesData.push(...records);
    } catch (error) {
      console.error(`Error processing ${files[i]} ${error?.message}`);
    }
  }

  return filesData;
};

const getFilesList = async () => {
  const response = await getFiles();
  return response;
};

export default {
  getFilesData,
  getFilesList,
};

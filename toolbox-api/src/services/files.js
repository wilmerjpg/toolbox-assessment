import { parse } from 'csv-parse/sync';
import { getFileData, getFiles } from '../lib/files-external-api.js';
import { isValidRecord } from '../utils.js';

const getFilesData = async () => {
  const { files = [] } = await getFiles();
  const filesData = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const file = await getFileData(files[i]);
      const records = parse(file, {
        columns: true,
        skip_empty_lines: true,
        relaxColumnCount: true,
      });

      records.forEach((record) => {
        if (isValidRecord(record)) {
          filesData.push(record);
        }
      });
    } catch (error) {
      console.error(`Error processing ${files[i]} ${error?.message}`);
    }
  }

  return filesData;
};

export default {
  getFilesData,
};

import filesService from '../services/files.js';
import { handleResponseError } from '../utils.js';

export const getFilesData = async (_req, res) => {
  try {
    const data = await filesService.getFilesData();
    res.json(data);
  } catch (error) {
    handleResponseError(res, error);
  }
};

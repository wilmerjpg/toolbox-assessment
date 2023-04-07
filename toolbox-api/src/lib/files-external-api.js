import axios from 'axios';

axios.defaults.baseURL = process.env.EXTERNAL_API_URL;

axios.defaults.headers.common.Authorization = process.env.AUTHORIZATION_HEADER;

export async function getFiles() {
  return (await axios.get('/secret/files')).data;
}

export async function getFileData(fileName) {
  return (await axios.get(`/secret/file/${fileName}`)).data;
}

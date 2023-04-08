import axios from 'axios';

export class BackendAPI {
  constructor(baseUrl = process.env.REACT_APP_API_URL) {
    this.baseUrl = baseUrl;
  }

  async getFilesData(config) {
    return (await axios.get(`${this.baseUrl}/files/data`, config)).data;
  }
}

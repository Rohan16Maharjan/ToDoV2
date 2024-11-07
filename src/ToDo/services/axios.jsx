import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:9090',
});

export { httpClient };

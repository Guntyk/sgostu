import axios from 'axios';

export const headers = {
  'Content-Type': 'application/json',
};

export const backendApi = axios.create({
  baseURL: 'https://sgostu-backend.download/api',
});
export const adaloApi = axios.create({
  baseURL: 'https://adalo.database.dance/',
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null],
);
adaloApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null],
);

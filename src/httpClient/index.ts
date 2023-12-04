import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 5000, // Set a timeout of 5 seconds,
});

httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default httpClient;

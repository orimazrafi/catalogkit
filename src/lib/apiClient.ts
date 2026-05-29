import axios from 'axios';

/** Shared Axios instance for all HTTP requests (base URL, headers, interceptors). */
export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
});

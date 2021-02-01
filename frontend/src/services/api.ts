import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.totalcleanbh.com/',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@TotalClean:access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.config.url) {
      return error.config;
    }

    if (
      !error.config.url.endsWith('login') ||
      !error.config.url.endsWith('refresh')
    ) {
      const originalRequest = error.config;

      if (
        error.response.status === 403 &&
        originalRequest.url === '/auth/refresh'
      ) {
        localStorage.removeItem('@TotalClean:access-token');
        localStorage.removeItem('@TotalClean:refresh-token');
        localStorage.removeItem('@TotalClean:user');

        return Promise.reject(error);
      }

      if (
        error.response.status === 404 &&
        originalRequest.url === '/auth/refresh'
      ) {
        localStorage.removeItem('@TotalClean:access-token');
        localStorage.removeItem('@TotalClean:refresh-token');
        localStorage.removeItem('@TotalClean:user');

        return Promise.reject(error);
      }

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        return api
          .post('/auth/refresh', {
            token: localStorage.getItem('@TotalClean:refresh-token'),
          })
          .then(res => {
            localStorage.setItem(
              '@TotalClean:access-token',
              res.data.accessToken,
            );
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${localStorage.getItem('@TotalClean:access-token')}`;
            return api(originalRequest);
          });
      }

      if (error.response.status === 404 && !originalRequest._retry) {
        originalRequest._retry = true;
        return api
          .post('/auth/refresh', {
            token: localStorage.getItem('@TotalClean:refresh-token'),
          })
          .then(res => {
            localStorage.setItem(
              '@TotalClean:access-token',
              res.data.accessToken,
            );
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${localStorage.getItem('@TotalClean:access-token')}`;
            return api(originalRequest);
          });
      }
    }
    return Promise.reject(error);
  },
);

export default api;

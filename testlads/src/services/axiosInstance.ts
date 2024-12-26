import axios from 'axios';
import { store } from '@/redux/store'; // Import your Redux store to access the token
 // Import your logout action
import { AUTH_ACTIONS } from '@/constants/authConstants';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Update with your API base URL
  withCredentials: true, // Include cookies (for refresh token)
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
   

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    //  console.log('Modified Request:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().auth.refreshToken
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop
      try {
        // Request a new access token using the refresh token
        const refreshResponse = await axiosInstance.post(AUTH_ACTIONS.REFRESH_TOKEN, {
          refreshToken: store.getState().auth.refreshToken,
        });

        const { accessToken } = refreshResponse.data;

        // Update the Redux state with the new access token
        store.dispatch({
          type: AUTH_ACTIONS.REFRESH_TOKEN,
          payload: accessToken,
        });

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        
        // Logout if refresh fails
        // store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    // Reject all other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;

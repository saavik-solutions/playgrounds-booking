// // src/features/auth/authApi.ts
// import { RootState } from '@/redux/store';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// // Define the API response types
// export interface LoginResponse {
//   role: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:3000/api', // Replace with your API URL
//     credentials: 'include', // Include cookies for refresh token
//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as RootState;
//       const token = state.auth.bearerToken;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: '/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation } = authApi;

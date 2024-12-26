import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice'; // Adjust the path as needed

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});



// Export the RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

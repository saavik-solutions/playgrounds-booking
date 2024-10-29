import { configureStore } from '@reduxjs/toolkit';
import groundsReducer from './groundsSlice';

const store = configureStore({
  reducer: {
    grounds: groundsReducer,
  },
});

export default store;

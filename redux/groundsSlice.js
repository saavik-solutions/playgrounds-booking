import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGrounds = createAsyncThunk('grounds/fetchGrounds', async () => {
  const response = await fetch('/api/grounds');
  const data = await response.json();
  return data;
});

const groundsSlice = createSlice({
  name: 'grounds',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGrounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGrounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default groundsSlice.reducer;

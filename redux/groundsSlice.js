import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGrounds = createAsyncThunk('grounds/fetchGrounds', async () => {
  const response = await fetch('/api/grounds');
  if (!response.ok) throw new Error('Failed to fetch grounds');
  return await response.json();
});

const groundsSlice = createSlice({
  name: 'grounds',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrounds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGrounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default groundsSlice.reducer;

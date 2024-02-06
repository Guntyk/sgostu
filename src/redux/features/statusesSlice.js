import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  statuses: [],
  errors: [],
  isLoading: false,
};

export const getStatusesData = createAsyncThunk('dancers/getStatuses', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getStatuses();

  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting statuses data. Please try again later']);
});

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    resetStatuses: (state) => {
      state.statuses = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatusesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatusesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.statuses = payload;
        state.errors = [];
      })
      .addCase(getStatusesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.statuses = [];
        state.errors = payload;
      });
  },
});

export default statusesSlice.reducer;
export const { actions } = statusesSlice;

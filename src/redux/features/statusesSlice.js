import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  statusesList: [],
  errors: [],
  isLoading: false,
};

export const getStatusesData = createAsyncThunk('statuses', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getStatuses();

  if (result) {
    return result.records;
  }

  return rejectWithValue(errors || ['An error occurred while getting statuses data. Please try again later']);
});

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    resetStatuses: (state) => {
      state.statuses = null;
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
      .addCase(getStatusesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statusesList = action.payload;
        state.errors = [];
      })
      .addCase(getStatusesData.rejected, (state, action) => {
        state.isLoading = false;
        state.statusesList = null;
        state.errors = action.payload;
      });
  },
});

export default statusesSlice.reducer;
export const { actions } = statusesSlice;

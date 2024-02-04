import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  dancerClassesList: [],
  dancersList: [],
  errors: [],
  isLoading: false,
};

export const getDancersData = createAsyncThunk('dancers', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getDancers();

  if (result) {
    return result.records;
  }

  return rejectWithValue(errors || ['An error occurred while getting dancers data. Please try again later']);
});

export const getDancerClassesData = createAsyncThunk('dancersClasses', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getDancerClasses();
  if (result) {
    return result.records;
  }

  return rejectWithValue(errors || ['An error occurred while getting dancer classes data. Please try again later']);
});

const dancersSlice = createSlice({
  name: 'dancers',
  initialState,
  reducers: {
    resetDancers: (state) => {
      state.dancers = null;
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDancersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDancersData.fulfilled, (state, { payload }) => {
        console.log(payload);
        console.log('==============================');
        state.isLoading = false;
        state.dancersList = payload.filter((dancer) => dancer['Dancer Verify']).reverse();
        state.errors = [];
      })
      .addCase(getDancersData.rejected, (state, action) => {
        state.isLoading = false;
        state.dancersList = null;
        state.errors = action.payload;
      })
      .addCase(getDancerClassesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDancerClassesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dancerClassesList = action.payload;
        state.errors = [];
      })
      .addCase(getDancerClassesData.rejected, (state, action) => {
        state.isLoading = false;
        state.dancerClassesList = null;
        state.errors = action.payload;
      });
  },
});

export default dancersSlice.reducer;
export const { actions } = dancersSlice;

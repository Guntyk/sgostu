import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  dancerClasses: [],
  dancers: [],
  errors: [],
  isLoading: false,
};

export const getDancersData = createAsyncThunk('dancers/getDancers', async (statuses, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getDancers();

  if (result) {
    return result
      .filter((dancer) => dancer['Dancer Verify'])
      .filter((dancer) => dancer['D Name'])
      .filter((dancer) =>
        statuses
          .filter((status) => status.Name !== 'Не активний')
          .map((status) => status.Dancers)
          .flat()
          .includes(dancer.id)
      )
      .reverse();
  }

  return rejectWithValue(errors || ['An error occurred while getting dancers data. Please try again later']);
});

export const getDancerClassesData = createAsyncThunk('dancers/getDancerClasses', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getDancerClasses();

  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting dancer classes data. Please try again later']);
});

const dancersSlice = createSlice({
  name: 'dancers',
  initialState,
  reducers: {
    resetDancers: (state) => {
      state.dancers = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDancerClassesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDancerClassesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dancerClasses = payload;
        state.errors = [];
      })
      .addCase(getDancerClassesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.dancerClasses = [];
        state.errors = payload;
      })
      .addCase(getDancersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDancersData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dancers = payload;
        state.errors = [];
      })
      .addCase(getDancersData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.dancers = [];
        state.errors = payload;
      });
  },
});

export default dancersSlice.reducer;
export const { actions } = dancersSlice;

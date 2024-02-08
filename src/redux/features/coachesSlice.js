import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  coaches: [],
  errors: [],
  isLoading: false,
};

export const getCoachesData = createAsyncThunk('coaches/getCoaches', async (statuses, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getCoaches();

  if (result) {
    return result
      .slice(1)
      .filter((coach) => coach['Coach Verify'])
      .filter((coach) => statuses[0]['Coaches'].includes(coach.id))
      .reverse();
  }

  return rejectWithValue(errors || ['An error occurred while getting coaches data. Please try again later']);
});

export const getCoachData = createAsyncThunk('coaches/getCoach', async (coachId, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getCoach(coachId);

  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting coaches data. Please try again later']);
});

const coachesSlice = createSlice({
  name: 'coaches',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoachesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoachesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.coaches = payload;
        state.errors = [];
      })
      .addCase(getCoachesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.coaches = [];
        state.errors = payload;
      })
      .addCase(getCoachData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoachData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.coaches = [payload];
        state.errors = [];
      })
      .addCase(getCoachData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.coaches = [];
        state.errors = payload;
      });
  },
});

export default coachesSlice.reducer;
export const { actions } = coachesSlice;

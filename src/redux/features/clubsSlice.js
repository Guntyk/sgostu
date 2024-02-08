import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  regions: [],
  clubs: [],
  errors: [],
  isLoading: false,
};

export const getClubsData = createAsyncThunk('clubs/getClubs', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getClubs();

  if (result) {
    return result
      .slice(1)
      .filter((club) => club['Approve Club'])
      .sort((a, b) => {
        return -(a.id - b.id);
      });
  }

  return rejectWithValue(errors || ['An error occurred while getting clubs data. Please try again later']);
});
export const getClubData = createAsyncThunk('clubs/getClub', async (clubId, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getClub(clubId);
  console.log(result);
  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting club data. Please try again later']);
});

export const getRegionsData = createAsyncThunk('clubs/getRegions', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getRegions();

  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting regions data. Please try again later']);
});

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    resetClubs: (state) => {
      state.clubs = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegionsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegionsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.regions = payload;
        state.errors = [];
      })
      .addCase(getRegionsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.regions = [];
        state.errors = payload;
      })
      .addCase(getClubsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.clubs = payload;
        state.errors = [];
      })
      .addCase(getClubsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.clubs = [];
        state.errors = payload;
      })
      .addCase(getClubData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.clubs = [payload];
        state.errors = [];
      })
      .addCase(getClubData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.clubs = [];
        state.errors = payload;
      });
  },
});

export default clubsSlice.reducer;
export const { actions } = clubsSlice;

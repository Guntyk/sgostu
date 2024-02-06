import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdaloDataService from 'services/AdaloDataService';

const initialState = {
  judgeClasses: [],
  judges: [],
  errors: [],
  isLoading: false,
};

export const getJudgesData = createAsyncThunk('judges/getJudges', async (statuses, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getJudges();

  if (result) {
    return result
      .filter((judge) => judge['Judges Verify'])
      .filter(({ id }) =>
        statuses
          .filter(({ Name }) => Name !== 'Не активний')
          .map(({ Judges }) => Judges)
          .flat()
          .includes(id)
      )
      .reverse();
  }

  return rejectWithValue(errors || ['An error occurred while getting judges data. Please try again later']);
});

export const getJudgeClassesData = createAsyncThunk('judges/getJudgeClasses', async (_, { rejectWithValue }) => {
  const { result, errors } = await AdaloDataService.getJudgeClasses();

  if (result) {
    return result;
  }

  return rejectWithValue(errors || ['An error occurred while getting judges classes data. Please try again later']);
});

const judgesSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {
    resetJudges: (state) => {
      state.judges = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJudgeClassesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJudgeClassesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.judgeClasses = payload;
        state.errors = [];
      })
      .addCase(getJudgeClassesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.judgeClasses = [];
        state.errors = payload;
      })
      .addCase(getJudgesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJudgesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.judges = payload;
        state.errors = [];
      })
      .addCase(getJudgesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.judges = [];
        state.errors = payload;
      });
  },
});

export default judgesSlice.reducer;
export const { actions } = judgesSlice;

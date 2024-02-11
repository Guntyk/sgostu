import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BackendDataService from 'services/BackendDataService';

const initialState = {
  events: [],
  errors: [],
  isLoading: false,
};

export const getEventsData = createAsyncThunk('events/getEvents', async (_, { rejectWithValue }) => {
  const { result, errors } = await BackendDataService.getEvents();
  console.log(errors);

  if (result) {
    console.log(result);
    const eventsArr = result.filter(({ attributes: { start, end } }) =>
      end
        ? Date.parse(end) >= Date.parse(new Date().toISOString().slice(0, 10))
        : Date.parse(start) >= Date.parse(new Date().toISOString().slice(0, 10))
    );
    console.log(eventsArr);

    return eventsArr;
  }

  return rejectWithValue(errors || ['An error occurred while getting events data. Please try again later']);
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetEvents: (state) => {
      state.events = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.events = payload;
        state.errors = [];
      })
      .addCase(getEventsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.events = [];
        state.errors = payload;
      });
  },
});

export default eventsSlice.reducer;
export const { actions } = eventsSlice;

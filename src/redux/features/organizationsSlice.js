import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BackendDataService from 'services/BackendDataService';

const initialState = {
  organizations: [],
  errors: [],
  isLoading: false,
};

export const getOrganizationsData = createAsyncThunk(
  'organization/getOrganizations',
  async (_, { rejectWithValue }) => {
    const { result, errors } = await BackendDataService.getOrganizations();

    if (result) {
      console.log(result);

      return result;
    }

    return rejectWithValue(errors || ['An error occurred while getting organizations data. Please try again later']);
  }
);

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    resetOrganizations: (state) => {
      state.organizations = [];
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrganizationsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.organizations = payload;
        state.errors = [];
      })
      .addCase(getOrganizationsData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.organizations = [];
        state.errors = payload;
      });
  },
});

export default organizationsSlice.reducer;
export const { actions } = organizationsSlice;

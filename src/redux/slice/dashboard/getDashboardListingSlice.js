import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getDashboardDataListing = createAsyncThunk(
  "getDashboardData",
  async (pageNo) => {
    return await makeApiRequest(
      `${api.getDashboardDataListing}?page=${pageNo || 0}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  tickets: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getDashboardListingSlice = createSlice({
  name: "getDashboardData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardDataListing.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getDashboardDataListing.fulfilled, (state, { payload }) => {
        state.tickets = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getDashboardDataListing.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getDashboardListingSlice.reducer;

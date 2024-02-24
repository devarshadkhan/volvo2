import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getAnalysisByTypeResolutionAPI = createAsyncThunk(
  "getAnalysisByTypeResolution",
  async (id) => {
    return await makeApiRequest(
      `${api.getAnalysisByTypeResolution}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  getAnalysisByTypeResolutionData: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAnalysisbyTypeResolutionSlice = createSlice({
  name: "getAnalysisByTypeResolution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisByTypeResolutionAPI.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAnalysisByTypeResolutionAPI.fulfilled, (state, { payload }) => {
        console.log("Analy ID", payload);
        state.getAnalysisByTypeResolutionData = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAnalysisByTypeResolutionAPI.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getAnalysisbyTypeResolutionSlice.reducer;

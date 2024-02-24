import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getAnalysisByTypePurposeAPI = createAsyncThunk(
  "getAnalysisByTypePurpose",
  async (id) => {
    return await makeApiRequest(
      `${api.getAnalysisByTypePurpose}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  getAnalysisByTypePurposeData: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAnalysisbyTypePurposeSlice = createSlice({
  name: "getAnalysisByTypePurpose",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisByTypePurposeAPI.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAnalysisByTypePurposeAPI.fulfilled, (state, { payload }) => {
        console.log("Analy ID", payload);
        state.getAnalysisByTypePurposeData = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAnalysisByTypePurposeAPI.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getAnalysisbyTypePurposeSlice.reducer;

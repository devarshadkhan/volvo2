import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getAnalysisType = createAsyncThunk(
  "analysisType",
  async (params) => {
    return await makeApiRequest(`${api.getAnalysisAllType}`, {
      token: getToken(),
    });
  }
);

const initialState = {
  analysisData: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const analysisType = createSlice({
  name: "analysisType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisType.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAnalysisType.fulfilled, (state, { payload }) => {
        state.analysisData = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAnalysisType.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default analysisType.reducer;

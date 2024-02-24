import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const updateAnalysisStatus = createAsyncThunk(
  "updateStatusAnalysis",
  async ({ id, data }) => {
    return await makeApiRequest(`${api.statusUpdateAnalysis}?analysisId=${id}`, {
      token: getToken(),
      data,
      method: "PATCH",
    });
  }
);

const initialState = {
analysisData: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const updateAnalysisSlice = createSlice({
  name: "updateStatusAnalysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAnalysisStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateAnalysisStatus.fulfilled, (state, { payload }) => {
        console.log("UUUPPDATE  UUSSEERR",payload);
        state.user = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
      })
      .addCase(updateAnalysisStatus.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default updateAnalysisSlice.reducer;

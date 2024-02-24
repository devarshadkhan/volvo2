import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const createAnalysisData = createAsyncThunk(
  "createAnalysis",
  async (data) => {
    return await makeApiRequest(
      `${api.createAnalysis}`,
      {
        method: "POST",
        token: getToken(),
        data
      }
    );
  }
);

const initialState = {
  analysisData: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const createAnalysisSlice = createSlice({
  name: "createAnalysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnalysisData.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(createAnalysisData.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.data = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(createAnalysisData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default createAnalysisSlice.reducer;

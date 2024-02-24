import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const searchAnalysisAction = createAsyncThunk(
  "searchAnalysis",
  async ({ searchKey,analysisType,name }) => {
    return await makeApiRequest(
      `${api.searchAnalysis}?&searchKey=${searchKey}&name=${name}&analysisType=${analysisType}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
    analysisData: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const searchAnalysisSlice = createSlice({
  name: "searchAnalysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAnalysisAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchAnalysisAction.fulfilled, (state, { payload }) => {
        state.analysisData = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(searchAnalysisAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        // notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default searchAnalysisSlice.reducer;

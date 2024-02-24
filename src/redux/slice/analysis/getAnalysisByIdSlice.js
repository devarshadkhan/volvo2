import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getAnalysisByIdAction = createAsyncThunk("getAnalysisById", async (id) => {
  return await makeApiRequest(`${api.getAnalysisById}?analysisId=${id}`, {
    apiKey:" eyJhbGciOiJIUzI1NiJ9.YXBpLXN1Y2Nlc3M.kclBgA_U9lm5u310ol90mAiN0cVYhqPyaRcqStCWWtA",
    // token: getToken(),
    
  });
});

const initialState = {
  analysisData: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAnalysisByIdSlice = createSlice({
  name: "getAnalysisById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisByIdAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAnalysisByIdAction.fulfilled, (state, { payload }) => {
        // console.log("Analy ID",payload);
        state.analysisData = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAnalysisByIdAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getAnalysisByIdSlice.reducer;

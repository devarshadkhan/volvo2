import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const editUpdateAnalysis = createAsyncThunk(
  "updateAnalysis",
  async ({id, data}) => {
    return await makeApiRequest(`${api.updateAnalysis}?analysisId=${id}`, {
      token: getToken(),
      data,
      method: "POST",
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

const updateAnalysis = createSlice({
  name: "updateAnalysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUpdateAnalysis.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(editUpdateAnalysis.fulfilled, (state, { payload, success }) => {
        console.log("UPPDATEAPI", payload);  
        state.data = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        // notify(success.message, "success");
        state.message = payload.message;
      })
      .addCase(editUpdateAnalysis.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default updateAnalysis.reducer;

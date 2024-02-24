import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getAllQAAction = createAsyncThunk("getAllQA", async () => {
  return await makeApiRequest(`/api/user/get-all-teams`, {
    token: getToken(),
  });
});

const initialState = {
  QAs: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllQASlice = createSlice({
  name: "getAllQA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQAAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllQAAction.fulfilled, (state, { payload }) => {
        state.QAs = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllQAAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.QAs = [];
        state.success = false;
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getAllQASlice.reducer;

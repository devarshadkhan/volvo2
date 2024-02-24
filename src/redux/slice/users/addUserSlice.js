import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const addUserAction = createAsyncThunk("addUser", async (data) => {
  return await makeApiRequest(`/api/user/create`, {
    token: getToken(),
    method: "POST",
    apiKey: process.env.REACT_APP_API_KEY,
    data,
  });
});

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(addUserAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(addUserAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default addUserSlice.reducer;

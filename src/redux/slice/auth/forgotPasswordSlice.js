import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const forgotPasswordAction = createAsyncThunk(
  "forgotPassword",
  async (data) => {
    return await makeApiRequest(`${api.forgetPassword}`, {
      method: "POST",
      data,
      token: getToken(),
    });
  }
);

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
        console.log(payload);
      })
      .addCase(forgotPasswordAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default forgotPasswordSlice.reducer;

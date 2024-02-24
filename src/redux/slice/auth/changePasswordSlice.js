import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserLT,
  getToken,
  makeApiRequest,
  notify,
} from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const changePasswordAction = createAsyncThunk(
  "changePassword",
  async (data) => {
    return await makeApiRequest(
      `${api.passwordChange}?userId=${getCurrentUserLT()?.id}`,
      {
        token: getToken(),
        method: "POST",
        data,
      }
    );
  }
);

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(changePasswordAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
      })
      .addCase(changePasswordAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default changePasswordSlice.reducer;

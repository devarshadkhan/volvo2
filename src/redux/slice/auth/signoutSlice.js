import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  makeApiRequest,
  notify,
  removeUserSession,
} from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const signoutAction = createAsyncThunk("signout", async () => {
  const options = {
    method: "POST",
    token: getToken(),
  };
  return await makeApiRequest(`${api.signOut}`, options);
});

const initialState = {
  loading: false,
  error: "",
  message: "",
  success: false,
};

const signoutSlice = createSlice({
  name: "signout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signoutAction.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        removeUserSession();
      })
      .addCase(signoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        console.log("Error : ", payload);
        // notify(payload.message, "error");
      });
  },
});
export default signoutSlice.reducer;

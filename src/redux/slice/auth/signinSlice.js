import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiRequest, notify, setUserSession } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const signInAction = createAsyncThunk("signIn", async (data) => {
  const options = {
    apiKey: process.env.REACT_APP_API_KEY,
    method: "POST",
    data,
  };
  return await makeApiRequest(`${api.signIn}`, options);
});

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(signInAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        setUserSession(payload.data.accessToken, payload.data);
      })
      .addCase(signInAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
      });
  },
});

export default signInSlice.reducer;

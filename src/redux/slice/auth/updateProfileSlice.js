import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const updateProfileAction = createAsyncThunk(
  "updateProfile",
  async (data) => {
    return await makeApiRequest(`${api.updateProfile}`, {
      token: getToken(),
      data,
      method: "POST",
    });
  }
);

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateProfileAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        console.log(payload);
      })
      .addCase(updateProfileAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        console.log("Error: ", error.message);
        notify(error.message, "error");
      });
  },
});

export default updateProfileSlice.reducer;

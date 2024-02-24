import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const userStatusAction = createAsyncThunk(
  "userStatus",
  async ({ id, data }) => {
    return await makeApiRequest(`/api/user/update-user-status?userId=${id}`, {
      token: getToken(),
      method: "PATCH",
      data,
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

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userStatusAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(userStatusAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
      })
      .addCase(userStatusAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default userStatusSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const updateUserAction = createAsyncThunk(
  "updateUser",
  async ({ id, data }) => {
    return await makeApiRequest(`/api/user/update?userId=${id}`, {
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

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateUserAction.fulfilled, (state, { payload }) => {
        console.log("UUUPPDATE  UUSSEERR",payload);
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(updateUserAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default updateUserSlice.reducer;

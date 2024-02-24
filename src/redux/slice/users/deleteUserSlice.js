import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const deleteUserAction = createAsyncThunk("deleteUser", async (id) => {
  return await makeApiRequest(`/api/user/delete-user?userId=${id}`, {
    token: getToken(),
    method: "DELETE",
  });
});

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(deleteUserAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
        console.log(payload);
      })
      .addCase(deleteUserAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default deleteUserSlice.reducer;

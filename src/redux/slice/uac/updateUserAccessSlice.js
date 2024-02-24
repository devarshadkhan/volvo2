import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const updateUserAccessAction = createAsyncThunk(
  "updateUserAccess",
  async ({ roleId, data }) => {
    return await makeApiRequest(`/api/uac/update?roleId=${roleId}`, {
      token: getToken(),
      data,
      method: "POST",
    });
  }
);

const initialState = {
  users: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const updateUserAccessSlice = createSlice({
  name: "updateUserAccess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAccessAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateUserAccessAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
      })
      .addCase(updateUserAccessAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default updateUserAccessSlice.reducer;

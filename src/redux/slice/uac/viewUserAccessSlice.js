import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const viewUserAccessAction = createAsyncThunk(
  "getAllUsers",
  async ({ roleId }) => {
    return await makeApiRequest(`/api/uac?roleId=${roleId}`, {
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

const viewUserAccessSlice = createSlice({
  name: "viewUserAccess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewUserAccessAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(viewUserAccessAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(viewUserAccessAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        // notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default viewUserAccessSlice.reducer;

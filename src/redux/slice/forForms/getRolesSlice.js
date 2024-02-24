import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getRolesAction = createAsyncThunk("getRoles", async () => {
  return await makeApiRequest(`/api/role/view`, {
    token: getToken(),
    apiKey: process.env.REACT_APP_API_KEY,
  });
});

const initialState = {
  roles: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getRolesSlice = createSlice({
  name: "getRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRolesAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getRolesAction.fulfilled, (state, { payload }) => {
        state.roles = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getRolesAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getRolesSlice.reducer;

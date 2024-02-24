import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getAllManagersAction = createAsyncThunk(
  "getAllManagers",
  async (teamId) => {
    return await makeApiRequest(
      `/api/user/get-all-managers-by-team-id?teamId=${teamId}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  managers: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllManagersSlice = createSlice({
  name: "getAllManagers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllManagersAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllManagersAction.fulfilled, (state, { payload }) => {
        state.managers = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllManagersAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.managers = [];
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getAllManagersSlice.reducer;

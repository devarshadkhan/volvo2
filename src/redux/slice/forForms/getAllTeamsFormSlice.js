import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getAllTeamsAction = createAsyncThunk("getAllTeams", async () => {
  return await makeApiRequest(`/api/user/get-all-teams`, {
    token: getToken(),
  });
});

const initialState = {
  teams: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllTeamsSlice = createSlice({
  name: "getAllTeams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeamsAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllTeamsAction.fulfilled, (state, { payload }) => {
        state.teams = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllTeamsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.teams = [];
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getAllTeamsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getAllTLAction = createAsyncThunk(
  "getAllTL",
  async ({ teamId, managerId }) => {
    return await makeApiRequest(
      `/api/user/get-all-tl-by-team-id-or-manager-id?teamId=${teamId}&managerId=${managerId}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  TLs: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllTLSlice = createSlice({
  name: "getAllTL",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTLAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllTLAction.fulfilled, (state, { payload }) => {
        state.TLs = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllTLAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        state.TLs = [];
        console.log("Error: ", error.message);
      });
  },
});

export default getAllTLSlice.reducer;

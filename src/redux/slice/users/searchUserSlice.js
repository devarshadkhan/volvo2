import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const searchUserAction = createAsyncThunk(
  "searchUser",
  async ({ pageNumber, searchValue, status, userType }) => {
    return await makeApiRequest(`/api/user/search-user?page=${pageNumber || 0}&searchValue=${searchValue}&status=${status}&userType=${userType}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUserAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchUserAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        // notify(payload.message, "success");
        state.message = payload.message;
      })
      .addCase(searchUserAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default searchUserSlice.reducer;

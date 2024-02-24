import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const searchCSVUsersAction = createAsyncThunk(
  "searchCSVUsers",
  async ({ searchValue, status, userType, pageNumber }) => {
    return await makeApiRequest(
      `/api/user/search-user-csv?searchValue=${searchValue}&status=${status}&userType=${userType}&page=${pageNumber}`,
      {
        token: getToken(),
      }
    );
  }
);

export const resetSearchCSVUsersSuccess = () => {
  return {
    type: "searchCSVUsers/resetSuccess",
  };
};

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const searchCSVUsersSlice = createSlice({
  name: "searchCSVUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCSVUsersAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchCSVUsersAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(searchCSVUsersAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      })
      .addCase(resetSearchCSVUsersSuccess, (state) => {
        state.success = false;
      });
  },
});

export default searchCSVUsersSlice.reducer;

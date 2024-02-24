import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const getUserByIdAction = createAsyncThunk("getUserById", async (id) => {
  return await makeApiRequest(`/api/user/get-user-by-id?userId=${id}`, {
    token: getToken(),
  });
});

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getUserByIdSlice = createSlice({
  name: "getUserById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getUserByIdAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getUserByIdAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getUserByIdSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const createUserAccessAction = createAsyncThunk(
  "createUserAccess",
  async (data) => {
    return await makeApiRequest(`/api/uac/create`, {
      token: getToken(),
      method: "POST",
      data,
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

const createUserAccessSlice = createSlice({
  name: "createUserAccess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAccessAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(createUserAccessAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
        console.log(payload);
      })
      .addCase(createUserAccessAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default createUserAccessSlice.reducer;

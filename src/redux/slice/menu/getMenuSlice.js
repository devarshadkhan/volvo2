import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getMenuAction = createAsyncThunk("getMenu", async () => {
  return await makeApiRequest(`${api.getMenuList}`, {
    token: getToken(),
  });
});

const initialState = {
  modules: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getMenuSlice = createSlice({
  name: "getMenu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getMenuAction.fulfilled, (state, { payload }) => {
        state.modules = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getMenuAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getMenuSlice.reducer;

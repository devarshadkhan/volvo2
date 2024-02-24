import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const ticketStatusAction = createAsyncThunk(
  "ticketStatus",
  async ({ id, data }) => {
    return await makeApiRequest(
      `/api/ticket/update-status?ticketId=${id?.replace("#", "%23")}`,
      {
        token: getToken(),
        method: "PATCH",
        data,
      }
    );
  }
);

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const ticketStatusSlice = createSlice({
  name: "ticketStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ticketStatusAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(ticketStatusAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
      })
      .addCase(ticketStatusAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default ticketStatusSlice.reducer;

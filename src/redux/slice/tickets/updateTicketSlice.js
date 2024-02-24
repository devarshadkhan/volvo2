import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const updateTicketAction = createAsyncThunk(
  "updateTicket",
  async ({ id, data }) => {
    return await makeApiRequest(
      `/api/ticket/update?ticketId=${id?.replace("#", "%23")}`,
      {
        token: getToken(),
        data,
        method: "POST",
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

const updateTicketSlice = createSlice({
  name: "updateTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTicketAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateTicketAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(updateTicketAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default updateTicketSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const deleteTicketAction = createAsyncThunk(
  "deleteTicket",
  async (id) => {
    return await makeApiRequest(`${api.deleteTicket}?userId=${id}`, {
      token: getToken(),
      method: "DELETE",
    });
  }
);

const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const deleteTicketSlice = createSlice({
  name: "deleteTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTicketAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(deleteTicketAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
        console.log(payload);
      })
      .addCase(deleteTicketAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default deleteTicketSlice.reducer;

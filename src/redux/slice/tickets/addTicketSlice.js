import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const addTicketAction = createAsyncThunk("addTicket", async (data) => {
  return await makeApiRequest(`${api.createTicket}`, {
    token: getToken(),
    method: "POST",
    data,
  });
});

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const addTicketSlice = createSlice({
  name: "addTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTicketAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(addTicketAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(addTicketAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default addTicketSlice.reducer;

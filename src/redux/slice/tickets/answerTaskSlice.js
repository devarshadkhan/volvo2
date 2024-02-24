import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const answerTicketAction = createAsyncThunk(
  "answerTicket",
  async (data) => {
    return await makeApiRequest(`${api.answerTicket}`, {
      token: getToken(),
      method: "POST",
      data,
    });
  }
);

const initialState = {
  users: {
    answer: [],
  },
  loading: false,
  error: "",
  message: "",
  success: false,
};

const answerTicketSlice = createSlice({
  name: "answerTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(answerTicketAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(answerTicketAction.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        notify(payload.message);
        console.log(payload);
      })
      .addCase(answerTicketAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default answerTicketSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getTicketByIdAction = createAsyncThunk(
  "getTicketById",
  async (id) => {
    return await makeApiRequest(
      `${api.getTicketById}?ticketId=${id?.replace("#", "%23")}`,
      {
        token: getToken(),
        method: "GET",
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

const getTicketByIdSlice = createSlice({
  name: "getTicketById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketByIdAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getTicketByIdAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getTicketByIdAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getTicketByIdSlice.reducer;

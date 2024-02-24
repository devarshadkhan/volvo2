import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getAllTicketsAction = createAsyncThunk(
  "getAllTickets",
  async (pageNumber) => {
    return await makeApiRequest(
      `${api.getAllTickets}?page=${pageNumber || 0}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  tickets: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllTicketsSlice = createSlice({
  name: "getAllTickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTicketsAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllTicketsAction.fulfilled, (state, { payload }) => {
        state.tickets = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllTicketsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getAllTicketsSlice.reducer;

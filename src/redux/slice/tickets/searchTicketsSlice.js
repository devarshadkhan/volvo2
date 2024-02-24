import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const searchTicketsAction = createAsyncThunk(
  "searchTickets",
  async ({ pageNumber,ticketNo,searchValue,teamId,searchStatus,startDate,endDate,analysisType }) => {
    return await makeApiRequest(
      `${api.searchTickets}?page=${
        pageNumber || 0
      }&ticketNo=${ticketNo}&searchValue=${searchValue}&teamId=${teamId}&searchStatus=${searchStatus}&startDate=${startDate}&endDate=${endDate}&analysisType=${analysisType}`,
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

const searchTicketsSlice = createSlice({
  name: "searchTickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTicketsAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchTicketsAction.fulfilled, (state, { payload }) => {
        state.tickets = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(searchTicketsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default searchTicketsSlice.reducer;

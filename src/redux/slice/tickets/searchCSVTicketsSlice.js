import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";

export const searchCSVTicketsAction = createAsyncThunk(
  "searchCSVTickets",
  async ({ ticketNo, searchValue,teamId, searchStatus,startDate,endDate, pageNumber }) => {
    return await makeApiRequest(
      `/api/ticket/search-ticket-csv?ticketNo=${ticketNo}&searchValue=${searchValue}&teamId=${teamId}&searchStatus=${searchStatus}&startDate=${startDate}&endDate=${endDate}&page=${pageNumber}`,
      {
        token: getToken(),
      }
    );
  }

);

export const resetsearchCSVTicketsSuccess = () => {
  return {
    type: "searchCSVTickets/resetSuccess",
  };
};

const initialState = {
  users: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const searchCSVTicketsSlice = createSlice({
  name: "searchCSVTickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCSVTicketsAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(searchCSVTicketsAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(searchCSVTicketsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      })
      .addCase(resetsearchCSVTicketsSuccess, (state) => {
        state.success = false;
      });
  },
});

export default searchCSVTicketsSlice.reducer;

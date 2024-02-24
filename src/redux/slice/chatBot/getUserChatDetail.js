import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getUserDetail = createAsyncThunk("getUserDetail", async (id) => {
    // console.log("redux cpoa",senderID, receiverID);
  return await makeApiRequest(`${api.getUserDetail}?userId=${id}`, {
    token: getToken(),
  });
});

const initialState = {
  dataMesaage: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getUserChatDetail = createSlice({
  name: "getUserDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getUserDetail.fulfilled, (state, { payload }) => {
        // Update the correct state property
        state.dataMesaage = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getUserDetail.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getUserChatDetail.reducer;

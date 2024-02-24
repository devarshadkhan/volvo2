import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest, notify } from "../../../utils/utils";
import { api } from "../../../network-request/api";

export const getChatBotMessageData = createAsyncThunk("getMessage", async ({senderID, receiverID}) => {
    // console.log("redux cpoa",senderID, receiverID);
  return await makeApiRequest(`${api.getChatBotMessage}/${senderID}/${receiverID}`, {
    token: getToken(),
  });
});

const initialState = {
  dataMesaage: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getChatBot = createSlice({
  name: "getMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatBotMessageData.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getChatBotMessageData.fulfilled, (state, { payload }) => {
        // Update the correct state property
        state.dataMesaage = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getChatBotMessageData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
        console.log("Error: ", error.message);
      });
  },
});

export default getChatBot.reducer;

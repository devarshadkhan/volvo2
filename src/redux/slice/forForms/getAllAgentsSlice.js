import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, makeApiRequest } from "../../../utils/utils";

export const getAllAgentsAction = createAsyncThunk(
  "getAllAgents",
  async ({ teamId, managerId, tlId }) => {
    return await makeApiRequest(
      `/api/user/get-all-agent-by-team-id-or-manager-id-or-tl-id?teamId=${teamId}&managerId=${managerId}&teamLeadId=${tlId}`,
      {
        token: getToken(),
      }
    );
  }
);

const initialState = {
  agents: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

const getAllAgentsSlice = createSlice({
  name: "getAllAgents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgentsAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getAllAgentsAction.fulfilled, (state, { payload }) => {
        state.agents = payload.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
      })
      .addCase(getAllAgentsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.agents = [];
        state.success = false;
        state.message = error.message;
        console.log("Error: ", error.message);
      });
  },
});

export default getAllAgentsSlice.reducer;

import { default as signinSlice } from "./auth/signinSlice";
import { default as signoutSlice } from "./auth/signoutSlice";
import { default as getAllUsersSlice } from "./users/getAllUsersSlice";
import { default as addUserSlice } from "./users/addUserSlice";
import { default as forgotPasswordSlice } from "./auth/forgotPasswordSlice";
import { default as getUserByIdSlice } from "./users/getUserByIdSlice";
import { default as userStatusSlice } from "./users/userStatusSlice";
import { default as deleteUserSlice } from "./users/deleteUserSlice";
import { default as updateUserSlice } from "./users/updateUserSlice";
import { default as updateProfileSlice } from "./auth/updateProfileSlice";
import { default as changePasswordSlice } from "./auth/changePasswordSlice";
import { default as getMenuSlice } from "./menu/getMenuSlice";
import { default as getRolesSlice } from "./forForms/getRolesSlice";
import { default as getDepartmentSlice } from "./forForms/getDepartmentSlice";
import { default as searchUserSlice } from "./users/searchUserSlice";
import { default as searchCSVUsersSlice } from "./users/searchCSVUsersSlice";
import { default as updateUserAccessSlice } from "./uac/updateUserAccessSlice";
import { default as viewUserAccessSlice } from "./uac/viewUserAccessSlice";
import { default as createUserAccessSlice } from "./uac/createUserAccessSlice";
import { default as getUserByTokenSlice } from "./users/getUserByTokenSlice";
import { default as getChatBot } from "./chatBot/chatBotSlice";
import { default as getDashboardDataListing } from "./dashboard/getDashboardListingSlice";
import { default as getAllAnalysisSlice } from "./analysis/getAllAnalysisSlice";
import { default as createAnalysisSlice } from "./analysis/createAnalysis";
import { default as deleteAnalysis } from "./analysis/deleteAnalysis";
import { default as analysisType } from "./analysis/analysisType";
import { default as updateAnalysis } from "./analysis/updateAnalysis";
import { default as getAnalysisByIdSlice } from "./analysis/getAnalysisByIdSlice";
import { default as searchAnalysisSlice } from "./analysis/searchAnalysisSlice";
import { default as updateAnalysisSlice } from "./analysis/updateAnalysisSlice";
import { default as getAnalysisbyTypePurposeSlice } from "./analysis/getAnalysisbyTypePurposeSlice";
import { default as getAnalysisbyTypeResolutionSlice } from "./analysis/getAnalysisbyTypeResolutionSlice";
import { default as getUserChatDetail } from "./chatBot/getUserChatDetail";


export {
  signinSlice,
  signoutSlice,
  getAllUsersSlice,
  addUserSlice,
  forgotPasswordSlice,
  getUserByIdSlice,
  userStatusSlice,
  deleteUserSlice,
  updateUserSlice,
  updateProfileSlice,
  changePasswordSlice,
  getMenuSlice,
  getRolesSlice,
  getDepartmentSlice,
  searchUserSlice,
  searchCSVUsersSlice,
  updateUserAccessSlice,
  viewUserAccessSlice,
  createUserAccessSlice,
  getUserByTokenSlice,
  getChatBot,
  getDashboardDataListing,
  getAllAnalysisSlice,
  createAnalysisSlice,
  deleteAnalysis,
  analysisType,
  updateAnalysis,
  getAnalysisByIdSlice,
  searchAnalysisSlice,
  updateAnalysisSlice,
  getAnalysisbyTypePurposeSlice,
  getAnalysisbyTypeResolutionSlice,
  getUserChatDetail,
};

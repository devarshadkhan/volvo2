import { configureStore } from "@reduxjs/toolkit";

import {
  signinSlice,
  signoutSlice,
  forgotPasswordSlice,
  changePasswordSlice,

  // users
  getAllUsersSlice,
  addUserSlice,
  getUserByIdSlice,
  userStatusSlice,
  deleteUserSlice,
  updateUserSlice,
  updateProfileSlice,
  searchUserSlice,
  getUserByTokenSlice,
  searchCSVUsersSlice,

  // forms
  getRolesSlice,

  // Departments
  getDepartmentSlice,

  // UAC
  updateUserAccessSlice,
  viewUserAccessSlice,
  createUserAccessSlice,
  getMenuSlice,
  getChatBot,
  getDashboardDataListing,
  getAllAnalysisSlice,
  deleteAnalysis,
  analysisType,
  updateAnalysis,
  getAnalysisByIdSlice,
  searchAnalysisSlice,
  createAnalysisSlice,
  updateAnalysisSlice,
  getAnalysisbyTypePurposeSlice,
  getAnalysisbyTypeResolutionSlice,
  getUserChatDetail,
} from "./slice";
import getAllTeamsFormSlice from "./slice/forForms/getAllTeamsFormSlice";
import getAllManagersSlice from "./slice/forForms/getAllManagersSlice";
import getAllQASlice from "./slice/forForms/getAllQASlice";
import getAllTLSlice from "./slice/forForms/getAllTLSlice";
import getAllAgentsSlice from "./slice/forForms/getAllAgentsSlice";
import getAllTicketsSlice from "./slice/tickets/getAllTicketsSlice";
import getTicketByIdSlice from "./slice/tickets/getTicketByIdSlice";
import addTicketSlice from "./slice/tickets/addTicketSlice";
import deleteTicketSlice from "./slice/tickets/deleteTicketSlice";
import updateTicketSlice from "./slice/tickets/updateTicketSlice";
import ticketStatusSlice from "./slice/tickets/ticketStatusSlice";
import searchCSVTicketsSlice from "./slice/tickets/searchCSVTicketsSlice";
import searchTicketsSlice from "./slice/tickets/searchTicketsSlice";
import answerTicketSlice from "./slice/tickets/answerTaskSlice";

export const store = configureStore({
  reducer: {
    // Authentication
    loggedinUser: signinSlice,
    signout: signoutSlice,
    forgotPassword: forgotPasswordSlice,
    updateProfile: updateProfileSlice,
    changePassword: changePasswordSlice,

    // Users
    users: getAllUsersSlice,
    addUser: addUserSlice,
    updateUser: updateUserSlice,
    userById: getUserByIdSlice,
    userStatus: userStatusSlice,
    deleteUser: deleteUserSlice,
    searchUser: searchUserSlice,
    searchCSVUsers: searchCSVUsersSlice,
    userByToken: getUserByTokenSlice,

    // Tickets
    tickets: getAllTicketsSlice,
    ticketsById: getTicketByIdSlice,
    addTicket: addTicketSlice,
    deleteTicket: deleteTicketSlice,
    updateTicket: updateTicketSlice,
    ticketStatus: ticketStatusSlice,
    searchTicket: searchTicketsSlice,
    searchCSVTicket: searchCSVTicketsSlice,
    answerTicket: answerTicketSlice,

    menu: getMenuSlice,

    // For Forms
    roles: getRolesSlice,
    departments: getDepartmentSlice,
    allTeams: getAllTeamsFormSlice,
    allManagers: getAllManagersSlice,
    QAs: getAllQASlice,
    TLs: getAllTLSlice,
    allAgents: getAllAgentsSlice,

    // uac
    getRole: getRolesSlice,
    updateUserAccess: updateUserAccessSlice,
    viewUserAccess: viewUserAccessSlice,
    createUserAccess: createUserAccessSlice,

    // chatBot
    getChatBot:getChatBot,
    getUserChatDetail:getUserChatDetail,

    // Dashboard
    getDashboardDataListing:getDashboardDataListing,

    // Analysis
    getAnalysis:getAllAnalysisSlice,
    createAnalysis:createAnalysisSlice,
    deleteAnalysis:deleteAnalysis,
    analysisType:analysisType,
    updateAnalysis:updateAnalysis,
    getAnalysisById:getAnalysisByIdSlice,
    getsearchAnalysis:searchAnalysisSlice,
    updateStatusAnalysis:updateAnalysisSlice,
    getAnalysisByTypePurpose:getAnalysisbyTypePurposeSlice,
    getAnalysisByTypeResolution:getAnalysisbyTypeResolutionSlice
  },
});

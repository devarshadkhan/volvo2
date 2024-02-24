export const api = {
    //Dashboard
    getDashboardDataListing:"/api/user/ticket-counts",

    // Analysis
    getAnalysisAllType:"/api/analysis/type-of-analysis",
    createAnalysis:"/api/analysis/create",
    deleteAnalysis:"/api/analysis/delete-by-id",
    getAllAnalysisData:"/api/analysis/get-all-data",
    getAnalysisById:"/api/analysis/get-all-data-by-id",
    getAnalysisByTypePurpose:"/api/analysis/get-data-by-analysistype-purpose",
    getAnalysisByTypeResolution:"/api/analysis/get-data-by-analysistype-resolution",
    searchAnalysis:"/api/analysis/search",
    updateAnalysis:"/api/analysis/update",
    statusUpdateAnalysis:"/api/analysis/update-status-by-id",

    // auth
    signIn:"/api/signin",
    passwordChange:"/api/change-password",
    forgetPassword:"/api/forgot-password",
    signOut:"/api/signout",

    // update profile
    updateProfile:"/api/user/update-by-token",

    // chatBot
    getChatBotMessage:"/message",
    getUserDetail:"/api/user/get-chat-user-detail",

    // navbarMenuList
    getMenuList:"/api/menu/view",

    // Tickets 
    createTicket:"/api/ticket/create",
    answerTicket:"/api/ticket/answer-task-question",
    deleteTicket:"/api/user/delete-user",
    getAllTickets:"/api/ticket/get-all-ticket",
    getTicketById:"/api/ticket/get-ticket-details",
    searchTickets:"/api/ticket/search-ticket"
}
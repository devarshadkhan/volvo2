import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import "./styles/Dashboard.css";
import "./styles/bootstrap.css";
import "./styles/Modal.css";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes, { PublicRoutes } from "./utils/Routes";
import { ToastContainer } from "react-toastify";
import useWindowSize from "./utils/Hooks/useWindowSize";

import AuthLayout from "./components/Layouts/AuthLayout";
import HeaderLayout from "./components/Layouts/HeaderLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout";
// import 'bootstrap/dist/js/bootstrap.min.js'


import {
  ChangePassword,
  ForgotPassword,
  SignIn,
  Dashboard,
  Users,
  UAC,
} from "./pages";
import Settings from "./pages/settings/Settings";
import AI from "./pages/ai/AI";
import Chatbot from "./pages/chatbot/Chatbot";
import Chatuser from "./pages/chatbot/Chatuser";
import Editchat from "./pages/chatbot/Editchat";
import Tickets from "./pages/ticketing/Tickets";
import Addfriend from "./pages/chatbot/Addfriend";
import Create from "./pages/chatbot/Create";
import Chat from "./pages/chatbot/Chat";
import Group from "./pages/chatbot/Group";
import Creategroup from "./pages/chatbot/Creategroup";
import Mettings from "./pages/chatbot/Mettings";
import Createmetting from "./pages/chatbot/Createmetting";
import Messaging from "./pages/chatbot/Components/Messaging";
import NoChatSelected from "./pages/chatbot/Components/NoChatSelected";
import Analytics from "./pages/analysis/Analysis";

function App() {
  const windowSize = useWindowSize();
  const [toggleMenu, setToggleMenu] = useState(true);
  // const [menuHover, setMenuHover] = useState(true);

  useEffect(() => {
    setToggleMenu(windowSize < 1360 && windowSize > 768);
  }, [windowSize]);

  const dashHeaderProps = {
    setToggleMenu,
    toggleMenu,
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}> {/*private route file authentication for logging users*/}
          <Route element={<HeaderLayout {...dashHeaderProps} />}>
            <Route element={<DashboardLayout {...dashHeaderProps} />}>
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<Users />} />
              <Route path="/uac" element={<UAC />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ticketing" element={<Tickets />} />

              <Route path="/ai" element={<AI />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/chatuser" element={<Chatuser />} />
            <Route path="/editchat" element={<Editchat />} />
            <Route path="/addfriend" element={<Addfriend />} />
            <Route path="/create" element={<Create />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/group" element={<Group />} />
            <Route path="/create-group" element={<Creategroup />} />
            <Route path="/meetings" element={<Mettings />} />
            <Route path="/create-metting" element={<Createmetting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

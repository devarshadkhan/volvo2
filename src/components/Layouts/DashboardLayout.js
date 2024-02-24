import React from "react";
import LeftBar from "../commonUI/LeftBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = (props) => {
  return (
    <>
      <div className="wrapper">
        <LeftBar {...props} />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;

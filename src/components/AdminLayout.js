import React, { Fragment } from "react";
import DashHeader from "./common/DashHeader";
import LeftBar from "./common/LeftBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Fragment>
      <DashHeader />
      <div className="wrapper">
        <LeftBar />
        <Outlet />
      </div>
    </Fragment>
  );
};

export default AdminLayout;

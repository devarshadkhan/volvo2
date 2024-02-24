import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/Login.css";
import "../../styles/style.css";
import "../../styles/bootstrap.css";

const AuthLayout = () => {
  return (
    <div>
      <div className="main-bg">
        <div className="col-lg-8 ">
          <div className="row">
            <div className="col-lg-7 p-lr ">
              <div className="left-box">
                <img src="images/left-img.png" />
              </div>
            </div>
            <div className="col-lg-5 p-lr order-first order-lg-1 ">
              <div className="right-box">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

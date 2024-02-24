import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Mettings = () => {
  return (
    <>
      <div className="frame addfriend">
        <div className="sidepanel white-bg">
          <div className="topBox">
            <div>
              <Link to="/chatuser">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </div>
            <div>
              <h3>Meetings</h3>
            </div>
            <div></div>
          </div>

          <div className="mettings">
            <div className="Box">
              <img src="/icons-images/meeting-img.png" />
              <h3>Connect more easily with a single link </h3>
              <p>
                Start a video meeting with whomever you want by simply sharing a
                meeting link.
              </p>
            </div>
          </div>

          <div className="create-group">
            <div className="bottombox">
              <div className="col-12 center">
                <Link to="/create-metting">
                  <button class="btn-sm" type="button">
                    Create meeting
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="mainlogo">
            <img src="/icons-images/big-volanslogo.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mettings;

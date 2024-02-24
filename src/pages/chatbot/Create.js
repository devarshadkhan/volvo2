import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Create = () => {
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
              <h3>Create</h3>
            </div>
            <div></div>
          </div>

          <div className="tabs">
            <div>
              <Link to="/chat">
                <h2>
                  <img src="/icons-images/chat-icon.png" />
                  <br />
                  Chat
                </h2>
              </Link>
            </div>
            <div>
              <h2>
                <Link to="/group">
                  <img src="/icons-images/group-icon.png" />
                  <br />
                  Group
                </Link>
              </h2>
            </div>
            <div>
              <h2>
                <Link to="/meetings">
                  <img src="/icons-images/meeting-icon.png" />
                  <br />
                  Meetings
                </Link>
              </h2>
            </div>
          </div>
          <hr className="mt-0" />
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

export default Create;

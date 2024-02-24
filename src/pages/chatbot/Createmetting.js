import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Createmetting = () => {
  return (
    <>
      <div className="frame addfriend">
        <div className="sidepanel white-bg">
          <div className="topBox">
            <div>
              <Link to="/meetings">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </div>
            <div>
              <h3>Meetings </h3>
            </div>
            <div></div>
          </div>

          <div className="CreateMetting">
            <div className="Box">
              <h4>Today</h4>
              <h3>Volan’s meeting</h3>
              <h5>
                <Link>http//volans/meeting/abcefghijklmniopqrst...</Link>
              </h5>
              <p>Just now</p>

              <button class="btn-sm active" type="button">
                Start
              </button>
              <Link to="/group">
                <button class="btn-sm" type="button">
                  Invite
                </button>
              </Link>
              <button class="btn-sm" type="button">
                Copy link
              </button>
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

export default Createmetting;

import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Creategroup = () => {
  return (
    <>
      <div className="frame addfriend">
        <div className="sidepanel white-bg">
          <div className="topBox">
            <div>
              <Link to="/group">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </div>
            <div>
              <h3>New Group </h3>
            </div>
            <div></div>
          </div>
          <div className="search">
            <label for="" className="l-mar">
              <img src="icons-images/group-create-icon.png" />
            </label>
            <input
              className="gray-bg g-search"
              type="text"
              placeholder="Group Name"
            />
          </div>

          <div className="search">
            <button className="btn-permissions" type="button">
              Group Permissions <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div className="scrollbar mar-top170 ">
            <div className="chatGroup">
              <h2>Friends </h2>
              <div className="scroll-box">
                <div className="chatGroupbox">
                  <div class="profile">
                    <div class="users">
                      <img src="/icons-images/profile1.png" />
                      <h3>
                        Naiyana
                        <br />
                        <font>Hi, I m Available</font>
                      </h3>
                    </div>
                    <div class="checkbox-friend checkbox-primary-small">
                      <input id="1" type="checkbox" checked />
                      <label for="1"></label>
                    </div>
                  </div>
                </div>
                <div className="chatGroupbox">
                  <div class="profile">
                    <div class="users">
                      <img src="/icons-images/profile3.png" />
                      <h3>
                        Rahul Narang <br />
                        <font>Hi, I m Available</font>
                      </h3>
                    </div>
                    <div class="checkbox-friend checkbox-primary-small">
                      <input id="2" type="checkbox" checked />
                      <label for="2"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="create-group">
            <div className="bottombox">
              <div className="col-12 center">
                <Link to="/chatuser">
                  <button class="btn-sm" type="button">
                    Create Group
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

export default Creategroup;

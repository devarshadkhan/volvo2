import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Chat = () => {
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
              <h3>Choose friend</h3>
            </div>
            <div>
              <Link>
                <p>Next</p>
              </Link>
            </div>
          </div>
          <div className="search">
            <label for="">
              <i className="fa fa-search" aria-hidden="true"></i>
            </label>
            <input
              type="text"
              className="gray-bg"
              placeholder="Search by name"
            />
          </div>

          <div className="scrollbar mar-top">
            <div className="chatGroup">
              <h2>Friends </h2>
              <div className="scroll-box">
                <Link to="/chatuser">
                  <div className="chatGroupbox">
                    <div class="profile">
                      <div class="users">
                        <img src="/icons-images/profile1.png" />
                        <h3>
                          Naiyana <br />
                          <font>Hi, I m Available</font>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/chatuser">
                  <div className="chatGroupbox">
                    <div class="profile">
                      <div class="users">
                        <img src="/icons-images/profile3.png" />
                        <h3>
                          Rahul Narang <br />
                          <font>Hi, I m Available</font>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/chatuser">
                  <div className="chatGroupbox">
                    <div class="profile">
                      <div class="users">
                        <img src="/icons-images/profile4.png" />
                        <h3>
                          Anjali Sharma
                          <br />
                          <font>Hi, I m Available</font>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="chatGroupbox">
                  <div class="profile">
                    <div class="users">
                      <img src="/icons-images/profile5.png" />
                      <h3>
                        Asif Imam
                        <br />
                        <font>Hi, I m Available</font>
                      </h3>
                    </div>
                  </div>
                </div>
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

export default Chat;

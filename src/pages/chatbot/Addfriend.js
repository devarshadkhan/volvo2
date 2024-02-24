import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Addfriend = () => {
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
              <h3>Add Friends</h3>
            </div>
            <div></div>
          </div>

          <div className="tabs">
            <div>
              <Link>
                <h2>
                  <img src="/icons-images/invite.png" />
                  <br />
                  Invite
                </h2>
              </Link>
            </div>
            <div>
              <h2>
                <Link>
                  <img src="/icons-images/qr-code.png" />
                  <br />
                  QR Code
                </Link>
              </h2>
            </div>
            <div>
              <h2>
                <Link>
                  <img src="/icons-images/search.png" />
                  <br />
                  Search
                </Link>
              </h2>
            </div>
          </div>
          <hr className="mt-0" />
          <div className="scrollbar">
            <div class="profile">
              <div className="users">
                <div className="circleLeft">
                  <img src="/icons-images/add-friend.png" />
                </div>
                <div>
                  <h3>
                    Auto-add friends <br />
                    <font>Auto-add contacts as friends.</font>
                  </h3>
                  <button class="btn-sm" type="button">
                    Allow
                  </button>
                </div>
              </div>
            </div>

            <div class="profile">
              <div className="users">
                <div className="circleLeft">
                  <img src="/icons-images/create-group.png" />
                </div>
                <div>
                  <h3>
                    Create a group
                    <br />
                    <font>Gather your friends in a group.</font>
                  </h3>
                  {/* <button class="btn-sm" type="button">
                    Allow
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="editchat">
            <div className="bottombox">
              <div className="col-12 center">
                <button class="btn-sm" type="button">
                  Hide
                </button>
                <button class="btn-delete" type="button">
                  Delete
                </button>
              </div>
            </div>
          </div> */}
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

export default Addfriend;

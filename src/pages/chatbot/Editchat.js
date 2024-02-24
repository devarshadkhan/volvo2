import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink } from "react-router-dom";

const Editchat = () => {
  const [friendbox, setTab] = useState(true);
  const friendShow = () => setTab(!friendbox);

  const [Groupbox, setShow] = useState(true);
  const GroupShow = () => setShow(!Groupbox);
  return (
    <>
      <div className="frame editchat">
        <div className="sidepanel white-bg">
          <div className="topBox">
            <div>
              <Link to="/chatuser">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </div>
            <div>
              <h3>Edit Chats</h3>
            </div>
            <div>
              <Link>
                <p>Read all</p>
              </Link>
            </div>
          </div>

          <div className="search">
            <label for="">
              <i className="fa fa-search" aria-hidden="true"></i>
            </label>
            <input
              type="text"
              placeholder="Search by name"
              className="gray-bg"
            />
          </div>

          <div className="scrollbar">
            <div class="profile">
              <div class="users">
                <div class="checkbox-small checkbox-primary-small">
                  <input id="1" type="checkbox" />
                  <label for="1"></label>
                </div>
                <img src="/icons-images/profile1.png" />
                <h3>
                  Naiyana <br />
                  <font>Hi, I m Available</font>
                </h3>
                <p>12:09 PM</p>
              </div>
            </div>

            <div class="profile">
              <div class="users">
                <div class="checkbox-small checkbox-primary-small">
                  <input id="2" type="checkbox" />
                  <label for="2"></label>
                </div>
                <img src="/icons-images/profile2.png" />
                <h3>
                  Rahul Narang <br />
                  <font>Hi, I m Available</font>
                </h3>
                <p>12:09 PM</p>
              </div>
            </div>

            <div class="profile">
              <div class="users">
                <div class="checkbox-small checkbox-primary-small">
                  <input id="3" type="checkbox" />
                  <label for="3"></label>
                </div>
                <img src="/icons-images/profile3.png" />
                <h3>
                  Amit Shah <br />
                  <font>Hi, I m Available</font>
                </h3>
                <p>12:09 PM</p>
              </div>
            </div>

            <div class="profile">
              <div class="users">
                <div class="checkbox-small checkbox-primary-small">
                  <input id="4" type="checkbox" />
                  <label for="4"></label>
                </div>
                <img src="/icons-images/profile4.png" />
                <h3>
                  Anjali Sharma <br />
                  <font>Hi, I m Available</font>
                </h3>
                <p>12:09 PM</p>
              </div>
            </div>
          </div>

          <div className="editchat">
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

export default Editchat;

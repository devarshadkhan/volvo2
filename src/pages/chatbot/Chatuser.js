import React, { useState } from "react";
import "../../styles/chat.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import Messaging from "./Components/Messaging";
import NoChatSelected from "./Components/NoChatSelected";

const Chatuser = () => {
  const [selectUser, setSelectUser] = useState(null);
  return (
    <>
      <div className="frame">
        <div className="sidepanel leftbar">
          <div className="chatTop">
            <div className="row">
              <div className="col-6">
                <h2>
                  Chats{" "}
                  <span>
                    {/* <i class="fa-solid fa-chevron-down"></i> */}
                  </span>
                </h2>
              </div>

              {/* <div className="col-6 right-text">
                <Link to="/editchat">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/c-menu.png`}
                  />
                </Link>
                <Link to="/addfriend">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/c-user.png`}
                  />
                </Link>
                <Link to="/create">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons-images/c-chat.png`}
                  />
                </Link>
              </div> */}
            </div>
          </div>

          <div className="search">
            <label for="">
              <i className="fa fa-search" aria-hidden="true"></i>
            </label>
            <input type="text" placeholder="Search Here..." />
          </div>

          <div className="scrollbar">
            <div className="contacts">
              <ul>
                <li className="contact" onClick={() => setSelectUser(2)}>
                  <div className="wrap">
                    <span className="contact-status online"></span>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/profile1.png`}
                    />
                    <div className="meta">
                      <h4 className="name">
                        Naiyana <p className="preview">Hi, I m Available</p>
                      </h4>
                    </div>
                  </div>
                </li>

                <NavLink to={`/chatuser/34`}>
                  <li className="contact ">
                    <div className="wrap">
                      <span className="contact-status busy"></span>
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/profile2.png`}
                        alt=""
                      />
                      <div className="meta">
                        <h4 className="name">
                          Rahul Narang <p className="preview">I m busy</p>
                        </h4>
                      </div>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={`/chatuser/34`}>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status busy"></span>
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
                        alt=""
                      />
                      <div className="meta">
                        <h4 className="name">
                          Amit Shah{" "}
                          <p className="preview">That Great. I am Looking</p>
                        </h4>
                      </div>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={`/chatuser/34`}>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status online"></span>
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/profile4.png`}
                        alt=""
                      />
                      <div className="meta">
                        <h4 className="name">
                          Anjali Sharma
                          <p className="preview">Hi, I m Available</p>
                        </h4>
                      </div>
                    </div>
                  </li>
                </NavLink>
                <NavLink to={`/chatuser/34`}>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status online"></span>
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/profile5.png`}
                        alt=""
                      />
                      <div className="meta">
                        <h4 className="name">
                          Asif Imam <p className="preview">Hi, I m Available</p>
                        </h4>
                      </div>
                    </div>
                  </li>
                </NavLink>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/profile6.png`}
                      alt=""
                    />
                    <div className="meta">
                      <h4 className="name">
                        Neha <p className="preview">I m busy</p>
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/profile7.png`}
                      alt=""
                    />
                    <div className="meta">
                      <h4 className="name">
                        Airtel{" "}
                        <p className="preview">Rahul: Good Morning Team...</p>
                      </h4>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/profile7.png`}
                      alt=""
                    />
                    <div className="meta">
                      <h4 className="name">
                        Airtel{" "}
                        <p className="preview">Rahul: Good Morning Team...</p>
                      </h4>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons-images/profile7.png`}
                      alt=""
                    />
                    <div className="meta">
                      <h4 className="name">
                        Airtel{" "}
                        <p className="preview">Rahul: Good Morning Team...</p>
                      </h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bottom-bar">
            <div className="row">
              <div className="col-6">
                <NavLink to="/chatbot">
                  <button className="addcontact">
                    <i class="fa fa-arrow-left"></i> <br />
                    <span>Back</span>
                  </button>
                  {/* <button className="addcontact">
                    <i class="fa-solid fa-house"></i> <br />
                    <span>Dashboard</span>
                  </button> */}
                </NavLink>
              </div>
              <div className="col-6">
                <NavLink to="/chatuser">
                  <button className="settings">
                    <i class="fa-regular fa-comment-dots"></i>
                    <br />
                    <span>Chats</span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {selectUser ? <Messaging /> : <NoChatSelected />}
      </div>
    </>
  );
};

export default Chatuser;

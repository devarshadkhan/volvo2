import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { formatRelativeDate } from "../../../utils/utils";

const Messaging = ({
  chat,
  setMessage,
  messages,
  message,
  handleSendMessage,
  u,
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages div
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="content">
      <div className="contact-profile">
        <div className="row">
          <div className="col-7">
            <div className="users">
              <span
                class={
                  chat?.online ? "contact-status online" : "contact-status busy"
                }
              ></span>
              <img src={chat?.profileImage || "/icons-images/profile1.png"} />
              <h3>
                {chat?.fname + " " + chat?.lname} <br />
                <font>{chat.online ? "Hi, I'm Available" : "I'm busy"}</font>
              </h3>
            </div>
          </div>
          <div className="col-5">
            <div className="social-media">
              <i class="fa-solid fa-magnifying-glass"></i>
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-bell"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="messages" ref={messagesContainerRef}>
        <ul>
          {messages.map((m) => {
            return (
              <li className={u?.id === m?.senderId ? "sent" : "replies"}>
                <img
                  src={`${process.env.PUBLIC_URL}/icons-images/profile4.png`}
                  alt=""
                />
                <p>
                  {m.message}
                  <br />
                  <font>
                    {" "}
                    {formatRelativeDate(m?.timestamp)}{" "}
                    <i class="fa-solid fa-check-double"></i>
                  </font>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <form className="chat-box" onSubmit={handleSendMessage}>
        <div className="">
          <div className="icon">
            <NavLink>
              <i class="fa-solid fa-plus"></i>
            </NavLink>
            <NavLink>
              {" "}
              <i class="fa-regular fa-image"></i>
            </NavLink>
            <NavLink>
              <i class="fa-solid fa-paperclip"></i>
            </NavLink>
          </div>
        </div>
        <div className="chatinputwidth">
          <div class="search">
            <label for="">
              <i class="fa-regular fa-face-smile"></i>
            </label>

            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              value={message}
            />
          </div>
        </div>
        <div className="">
          {/* <div className="icon">
            <NavLink>
            <i class="fa-solid fa-microphone"></i>
            </NavLink>
          </div> */}

          <button type="submit" className="icon">
            <NavLink>
              <i class="fa-solid fa-microphone"></i>
              send
            </NavLink>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messaging;

// <li className="replies">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
//     alt=""
//   />
//   <p>
//     When you're backed against the wall, break the god damn thing
//     down.
//   </p>
// </li>
// <li className="replies">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
//     alt=""
//   />
//   <p>Excuses don't win championships.</p>
// </li>
// <li className="sent">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile4.png`}
//     alt=""
//   />
//   <p>Oh yeah, did Michael Jordan tell you that?</p>
// </li>
// <li className="replies">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
//     alt=""
//   />
//   <p>No, I told him that.</p>
// </li>
// <li className="replies">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
//     alt=""
//   />
//   <p>What are your choices when someone puts a gun to your head?</p>
// </li>
// <li className="sent">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile4.png`}
//     alt=""
//   />
//   <p>
//     variations of passages of Lorem Ipsum available, but the majority
//     have suffered alteration in some form, by injected humour, or
//     randomised
//   </p>
// </li>
// <li className="replies">
//   <img
//     src={`${process.env.PUBLIC_URL}/icons-images/profile3.png`}
//     alt=""
//   />
//   <p>
//     Lorem Ipsum available, but the majority have suffered alteration
//     in some form, by injected humour, or randomised.
//   </p>
// </li>

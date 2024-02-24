// =================== PROPER WORK CODE ==========================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatRelativeDate, formateChatTime } from "../../../utils/utils";
import Delete from "../../../components/commonUI/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getChatBotMessageData } from "../../../redux/slice/chatBot/chatBotSlice";
// import EmojiPicker from "emoji-picker-react";
import { getFirstLetterName } from "../../../utils/utils";
import EmojiPicker from "emoji-picker-react";
import ViewDetail from "./ViewDetail";
import ScrollToTop from "react-scroll-to-top";
import { Dropdown } from "primereact/dropdown";
import FileViewModal from "./FileViewModal";

const Messaging = ({
  chat,
  setMessage,
  messages,
  message,
  handleSendMessage,
  senderId,
  u,
  handleEmoji,
  setDocumentRef,
  documentRef,
  viewImage,
  userList,
  handleFileChange,
  file,
  setViewImage,
  formik,
  setIsOpen,
  isOpenM,
  onClose,
}) => {
  console.log("ccc", messages);

  const messagesContainerRef = useRef(null);
  /**
   * Emoji state and logic here
   */
  const [apiMessages, setApiMessages] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);
  const [emojiShowing, setEmojiShowing] = useState(false); // this state for hide and show
  const [showMoreMessages, setShowMoreMessages] = useState(false);
  const dispatch = useDispatch();
  const emojiPickerRef = useRef(null);
  // Function to close emoji picker when clicking outside

  const handleOutsideClick = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setEmojiShowing(false);
    }
  };

  // handle emoji add on chat messgae same as whatsapp
  const handleClickedEmoji = (e) => {
    handleEmoji(e);
    setMessage((prev) => prev + e.emoji);
  };

  // Attach event listener on component mount
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  // chat message
  /**
   * Selected Message Particular by ID
   */
  const selectedUserId = chat.userId; // Assuming chat object has an 'id' property

  const werty = useSelector((item) => item.getChatBot.dataMesaage);

  const [isComponentMounted, setIsComponentMounted] = useState(false);
  useEffect(() => {
    setIsComponentMounted(true);

    // Cleanup function to set isComponentMounted to false when the component unmounts
    return () => setIsComponentMounted(false);
  }, []);

  useEffect(() => {
    // Fetch chat messages when the component mounts
    dispatch(
      getChatBotMessageData({ senderID: senderId, receiverID: selectedUserId })
    );
  }, [dispatch, senderId, selectedUserId]);
  // }, [dispatch, senderId, selectedUserId]);

  // chat end me

  /**
   * Selected Message Particular by ID
   */
  // const selectedUserMessages = messages.filter(
  //   (m) => m.senderId === selectedUserId || m.receiverId === selectedUserId
  // );
  const selectedUserMessages = useMemo(() => {
    return messages.filter(
      (m) => m.senderId === selectedUserId || m.receiverId === selectedUserId
    );
  }, [selectedUserId, messages]);
  /**
   * Chat Message listing Dat
   */
  const senderIdToFilter = String(u.id);
  const receiverIdToFilter = String(selectedUserId);
  // console.log("senderIdToFilter",senderIdToFilter);
  // console.log("receiverIdToFilter",receiverIdToFilter);

  useEffect(() => {
    // Scroll to the bottom of the messages div
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [werty, message, emojiShowing]);

  // handle Image and document set

  // const sethandleImage = (e) => {
  //   const file = e.target.files[0];
  //   setDocumentRef(file);
  //   // if (file) {
  //   //   const imageURL = URL.createObjectURL(file);
  //   //   setDocumentRef(file); // Store the image file instead of the URL
  //   // }
  // };

  const [isOpen, setIsopen] = useState(false);
  const [editMessageModal, setEditMessageModal] = useState(false);
  // const ToggleSidebar = () => {
  //   isOpen === true ? setIsopen(false) : setIsopen(true);
  // };
  // .......Delete--------------
  const [showConfirm, setShowConfirm] = useState(false);
  // .......show-hide--------------
  const [divVisibility, setDivVisibility] = useState({
    div1: true,
    div2: false,
    div3: false,
    div4: false,
    div5: false,
    div6: false,
    div7: false,
    // Add more divs as needed
  });

  const showDiv = (divId) => {
    setDivVisibility((prevState) => {
      const updatedVisibility = {};
      // Hide all divs
      Object.keys(prevState).forEach((key) => {
        updatedVisibility[key] = false;
      });
      // Show the selected div
      updatedVisibility[divId] = true;
      return updatedVisibility;
    });
  };

  // .......show-hide--------------
  const getMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      // You can customize the format for older messages
      return `${messageDate.getFullYear()}-${(messageDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${messageDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      // return `${messageDate.getDate()}/${messageDate.getMonth() + 1}`;
    }
  };

  const [divShow, setDivShow] = useState(false);
  const toggleDivShow = (messageId) => {
    // setDivShow((prevId) => (prevId === messageId ? null : messageId));
    setViewImage(null); // Reset the viewImage state to null
    setMessage("");
  };

  const fileInputRef = useRef();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      {/* <button onClick={()=> setIsOpen(true)}>sadasasdad</button> */}
      <FileViewModal
        isOpenM={isOpenM}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        viewImage={viewImage}
        formik={formik}
      />
      {/* <FileViewModal   isOpen={modelOpen}
            onClose={() => setModelOpen(false)}
            setIsOpen={setModelOpen}/> */}
      {false && viewImage && (
        <>
          <form className="chat-box w-100" onSubmit={formik.handleSubmit}>
            <div className="chatinputwidth">
              {true && (
                <div class="search">
                  {viewImage ? (
                    <>
                      <i
                        class="fa-solid fa-xmark"
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          color: "#000",
                          top: "-7px",
                          background: "#fff",
                          padding: "4px",
                          fontSize: "11px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleDivShow("1")}
                      ></i>{" "}
                      <img src={viewImage} width={"60px"} height={"50px"} />
                    </>
                  ) : null}
                </div>
              )}
            </div>
            <div className="">
              <button type="submit" className="icon sendBtn">
                {/* <button type="submit" className="icon sendBtn" onClick={handleSendMessage}> */}
                {/* <NavLink> */}
                {/* <i class="fa-solid fa-paper-plane"></i> */}
                {/* <img src="/icons-images/whatsappIcon.svg" width={"20px"} /> */}
                {/* send */}
                {/* </NavLink> */}
                Send
              </button>
            </div>
          </form>
        </>
      )}
      <div className="content">
        {/* <ScrollToTop smooth width="70px"  /> */}
        {/* {file && <img src={file} alt="Uploaded File" width={"200px"} />} */}
        <div className="contact-profile">
          <div className="row">
            <div className="col-12">
              {/* <div className="col-7"> */}
              {/* <div className="users" onClick={ToggleSidebar}> */}
              <div className="users">
                <span
                  class={
                    chat?.online === true
                      ? "contact-status online"
                      : "contact-status busy"
                  }
                ></span>
                {chat?.profileImage ? (
                  <>
                    <img src={chat?.profileImage} />
                  </>
                ) : (
                  <>
                    {/* <img src={"/icons-images/profile1.png"} /> */}
                    <div className="firstLettermm">
                      <p>{getFirstLetterName(chat.fname + " " + chat.lname)}</p>
                    </div>
                  </>
                )}
                <h3 onClick={() => setIsopen(true)}>
                  {/* {chat?.fname + "    " + chat?.lname}{" "} */}
                  {chat?.fname &&
                  chat?.lname &&
                  (chat?.fname.length > 20 || chat?.lname.length > 20)
                    ? `${chat?.fname.substring(
                        0,
                        20
                      )}...${chat?.lname.substring(0, 20)}...`
                    : `${chat?.fname} ${chat?.lname}`}
                  {/* <i class="fa-solid fa-gear"></i> */}
                  <br />
                  <p className={chat?.online === true ? "online" : "offline"}>
                    {" "}
                    {chat?.online === true ? "Online" : "Offline"}
                  </p>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="messages" ref={messagesContainerRef}>
          <ul>
            <ul>
              {/* ... (existing code) */}

              {false && (
                <>
                  {" "}
                  {werty.map((m, index) => {
                    const containsUrl =
                      m.text && m.text.includes("http" || "https");
                    return (
                      <>
                        {/* Render the heading for today and yesterday messages */}
                        {index === 0 ||
                        getMessageDate(m.timestamp) !==
                          getMessageDate(werty[index - 1].timestamp) ? (
                          <div
                            key={`heading-${index}`}
                            className="message-heading"
                          >
                            {/* <p> {getMessageDate(m.timestamp)}</p> */}
                            <h3 class="title-around-span">
                              <span>{getMessageDate(m.timestamp)}</span>
                            </h3>
                          </div>
                        ) : null}

                        {/* Render the actual message */}

                        <li
                          className={u?.id == m?.senderId ? "sent" : "replies"}
                        >
                          {/* <img
                        src={
                          u?.id === m?.senderId
                            ? `${m.receiverImage}`
                            : `${m.senderImage}` ||
                              "/icons-images/userblckicon.png"
                        }
                        alt=""
                      /> */}

                          <p>
                            {/* <i onClick={()=> toggleDivShow(m.id)} class="fa-solid fa-ellipsis-vertical" id={u.id == m.senderId ? "dddd":"cccc"} data-bs-toggle="dropdown" aria-expanded="false" ></i> */}
                            {/* <i  class="fa-solid fa-ellipsis-vertical" id={u.id == m.senderId ? "dddd":"cccc"} data-bs-toggle="dropdown" aria-expanded="false" ></i> */}

                            {/* <i
                          class="fa-solid fa-ellipsis-vertical"
                          id={u.id == m.senderId ? "dddd" : "cccc"}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></i> */}

                            <ul class="dropdown-menu">
                              <span>
                                <b
                                  class="dropdown-item"
                                  onClick={() => setIsopen(true)}
                                >
                                  Edit Message
                                </b>
                              </span>
                              <span>
                                <a class="dropdown-item">Delete message</a>
                              </span>
                            </ul>

                            {/* {divShow === m.id && (   <div className="dBlokcse">
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>)} */}

                            {containsUrl ? (
                              // If the message contains a URL, render a link
                              <a
                                href={m.text}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: u.id == m.senderId ? "#fff" : "#000",
                                  textDecoration:
                                    u.id == m.senderId
                                      ? "underline"
                                      : "underline",
                                }}
                              >
                                {m.text}
                              </a>
                            ) : (
                              // Otherwise, render the text normally
                              m.text
                            )}
                            {/* {file && <img src={file} alt="Uploaded File" />} */}
                            <br />
                            <font className="we">
                              {formateChatTime(m?.timestamp)}{" "}
                              <i className={"fa-solid fa-check"}></i>
                              <i
                                className={"fa-solid fa-check-double"}
                                style={{ color: "#33EC23" }}
                              ></i>
                            </font>
                          </p>
                        </li>
                      </>
                    );
                  })}
                </>
              )}

              {werty.map((m, index) => {
                const containsUrl =
                  m.text && m.text.includes("http" || "https");
                const isImageMessage = m.isImage; // Assume you have a property like 'isImage' in your message object

                return (
                  <>
                    {/* <div key={`heading-${index}`} className="message-heading">
                        <h3 class="title-around-span">
                          <span>{getMessageDate(m.timestamp)}</span>
                        </h3>
                      </div> */}
                    {/* Render the heading for today and yesterday messages */}
                    {index === 0 ||
                    getMessageDate(m.timestamp) !==
                      getMessageDate(werty[index - 1].timestamp) ? (
                      <>
                        <img src="/icons-images/lineHRBG.svg" />
                        <h3 class="title-around-span">
                          <span>{getMessageDate(m.timestamp)}</span>
                        </h3>
                      </>
                    ) : null}

                    {/* Render the actual message */}
                    <li className={u?.id == m?.senderId ? "sent" : "replies"}>
                      <p style={{ whiteSpace: "pre-line" }}>
                        {isImageMessage ? (
                          // If the message is an image, render an image
                          <img src={m.imageUrl} alt="Image" />
                        ) : containsUrl ? (
                          // If the message contains a URL, render a link
                          <a
                            href={m.text}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: u.id == m.senderId ? "#fff" : "#000",
                              textDecoration:
                                u.id == m.senderId ? "underline" : "underline",
                            }}
                          >
                            {m.text}
                          </a>
                        ) : (
                          // Otherwise, render the text normally
                          m.text
                        )}
                        <br />
                        <font className="we">
                          {formateChatTime(m?.timestamp)}{" "}
                          {/* <i
                            className={
                              m?.isRead === true
                                ? "fa-solid fa-check-double"
                                : "fa-solid fa-check"
                            }
                          ></i> */}
                          {m.senderId == u.id && (
                            <>
                              {" "}
                              {m.isRead === true ? (
                                <i
                                  className={"fa-solid fa-check-double"}
                                  style={{ color: "#33EC23" }}
                                ></i>
                              ) : (
                                <i className={"fa-solid fa-check"}></i>
                              )}
                            </>
                          )}
                        </font>
                      </p>
                    </li>
                  </>
                );
              })}
            </ul>
            {/* <img src={file} /> */}
            {selectedUserMessages.map((m) => {
              const containsUrl = m.text && m.text.includes("http" || "https");

              return (
                <>
                  <li className={u?.id == m?.senderId ? "sent" : "replies"}>
                    {m.fileUrl ? (
                      <>
                        {/* <p>{m.fileUrl}</p> */}
                        <img
                          src={m.fileUrl}
                          onClick={handleButtonClick}
                          // src={viewImage && URL.createObjectURL(viewImage)}
                          style={{
                            width: "300px",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            height: "229px",
                            objectFit: "cover",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <p style={{ whiteSpace: "pre-line" }}>
                          {true && (
                            <>
                              {containsUrl ? (
                                // If the message contains a URL, render a link
                                <>
                                  <a
                                    href={m.message}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color:
                                        u.id == m.senderId ? "#fff" : "#000",
                                      textDecoration: "underline",
                                    }}
                                  ></a>
                                </>
                              ) : (
                                m.message.split("\n").map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    {index <
                                      m.message.split("\n").length - 1 && (
                                      <br />
                                    )}
                                  </React.Fragment>
                                ))
                              )}
                              {/* m.message */}
                            </>
                          )}
                          <br />
                          <font class="we">
                            {formateChatTime(m?.timestamp)}{" "}
                            {/* <i
                              className={
                                chat.online === true
                                  ? "fa-solid fa-check-double"
                                  : "fa-solid fa-check"
                              }
                            ></i> */}
                            {m.senderId == u.id && (
                              <>
                                {" "}
                                {m.isRead === true ? (
                                  <i
                                    className={"fa-solid fa-check-double"}
                                    style={{ color: "#33EC23" }}
                                  ></i>
                                ) : (
                                  <i className={"fa-solid fa-check"}></i>
                                )}
                              </>
                            )}
                          </font>
                        </p>
                      </>
                    )}
                  </li>
                </>
              );
            })}
          </ul>
          {emojiShowing ? (
            <>
              {/* <div className="emojiPicker" ref={emojiPickerRef}> */}
              <div className="emojiPicker" ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={handleClickedEmoji} />
              </div>
            </>
          ) : null}
        </div>

        {/* <form className="chat-box" onSubmit={formik.handleSubmit}> */}
        <form className="chat-box" onSubmit={handleSendMessage}>
          <div className="">
            <div className="icon">
              {/* <NavLink>
                {" "}
                <i class="fa-regular fa-image"></i>
              </NavLink> */}
              <NavLink>
                {" "}
                <i
                  class="fa-regular fa-face-smile"
                  onClick={() => setEmojiShowing(!emojiShowing)}
                ></i>
              </NavLink>

              <a>
                <label htmlFor="file-input4">
                  <i class="fa-solid fa-paperclip"></i>
                </label>
                <input
                  id="file-input4"
                  type="file"
                  accept="image/*"
                  // accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="d-none"
                  // ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </a>
            </div>
          </div>

          <div className="chatinputwidth">
            {false && (
              <div class="search">
                {viewImage ? (
                  <>
                    <i
                      class="fa-solid fa-xmark"
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        color: "#000",
                        top: "-7px",
                        background: "#fff",
                        padding: "4px",
                        fontSize: "11px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleDivShow("1")}
                    ></i>{" "}
                    <img src={viewImage} width={"60px"} height={"50px"} />
                  </>
                ) : (
                  <>
                    {" "}
                    <textarea
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message"
                      value={message}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                  </>
                )}
              </div>
            )}

            <div class="search">
              {" "}
              <textarea
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="">
            {/* <button type="submit" className="icon sendBtn"  > */}
            <button
              type="submit"
              className="icon sendBtn"
              // onClick={handleSendMessage}
            >
              {/* <NavLink> */}
              {/* <i class="fa-solid fa-paper-plane"></i> */}
              <img src="/icons-images/whatsappIcon.svg" width={"20px"} />
              {/* send */}
              {/* </NavLink> */}
            </button>
          </div>
        </form>
      </div>

      {/* right panal */}
      {false && (
        <>
          <div className={`rightsidebar ${isOpen == true ? "active" : ""}`}>
            {/* <div className={`rightsidebar ${isOpen == true ? "active" : ""}`}> */}
            {divVisibility.div1 && (
              <div className="white-bg">
                <div className="topBox">
                  <div>
                    <Link onClick={""}>
                      {/* <Link onClick={ToggleSidebar}> */}
                      <i class="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  <div>
                    <h3>Airtel</h3>
                  </div>
                  <div></div>
                </div>

                <div className="tabs">
                  <div>
                    <Link>
                      <h2>
                        <img src="/icons-images/speaker-icon.png" />
                        <br />
                        Mute
                      </h2>
                    </Link>
                  </div>
                  <div>
                    <h2>
                      <Link onClick={() => showDiv("div2")}>
                        <img src="/icons-images/member-icon.png" />
                        <br />
                        Members
                      </Link>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      <Link onClick={() => showDiv("div3")}>
                        <img src="/icons-images/invite-icon.png" />
                        <br />
                        Invite
                      </Link>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      <Link onClick={() => setShowConfirm(true)}>
                        <img src="/icons-images/leave-icon.png" />
                        <br />
                        Leave
                      </Link>
                    </h2>
                  </div>
                </div>
                <hr className="mt-0" />
                <div className="scrollbar">
                  <div className="navigation">
                    <li>
                      {" "}
                      <img src="/icons-images/photo-icon.png" /> Photo & videos{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                  </div>

                  <div className="photo">
                    <h3>No Photos or videos found.</h3>
                  </div>

                  <div className="navigation mt-3">
                    <li>
                      {" "}
                      <img src="/icons-images/album-icon.png" /> Album{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                  </div>

                  <div className="photo">
                    <h3>
                      Keep your best photos in albums and share them with the
                      chat.
                    </h3>
                    <h2>Create album</h2>
                  </div>
                  <div className="navigation mt-3">
                    <li>
                      {" "}
                      <img src="/icons-images/note-icon.png" /> Notes{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li>
                      {" "}
                      <img src="/icons-images/events-icon.png" /> Events{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li>
                      {" "}
                      <img src="/icons-images/links-icon.png" /> Links{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li>
                      {" "}
                      <img src="/icons-images/files-icon.png" /> Files{" "}
                      <i class="fa-solid fa-chevron-right"></i>
                    </li>
                  </div>
                </div>
              </div>
            )}

            {/* .............2............ */}
            {divVisibility.div2 && (
              <div className="white-bg">
                <div className="topBox">
                  <div>
                    <Link onClick={() => showDiv("div1")}>
                      <i class="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  <div>
                    <h3>Airtel 6</h3>
                  </div>
                  <div></div>
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
            )}

            {/* .............2............ */}

            {divVisibility.div3 && (
              <div className="white-bg">
                <div className="topBox">
                  <div>
                    <Link onClick={() => showDiv("div1")}>
                      <i class="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  <div>
                    <h3>Choose friend </h3>
                  </div>
                  <div>
                    <Link onClick={() => showDiv("div4")}>
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
                          <input id="1" type="checkbox" />
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
                          <input id="2" type="checkbox" />
                          <label for="2"></label>
                        </div>
                      </div>
                    </div>

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
                        <div class="checkbox-friend checkbox-primary-small">
                          <input id="3" type="checkbox" />
                          <label for="3"></label>
                        </div>
                      </div>
                    </div>

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
                        <div class="checkbox-friend checkbox-primary-small">
                          <input id="4" type="checkbox" />
                          <label for="4"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* .............3............ */}

            {divVisibility.div4 && (
              <div className="white-bg">
                <div className="topBox">
                  <div>
                    <Link onClick={() => showDiv("div1")}>
                      <i class="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  <div>
                    <h3>New Group</h3>
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
              </div>
            )}
          </div>
        </>
      )}

      {/* <Delete isOpen={showConfirm} onClose={() => setShowConfirm(false)} /> */}

      {/* right panal */}

      <ViewDetail
        isOpen={isOpen}
        onClose={() => setIsopen(false)}
        setIsOpen={setIsopen}
        title="View Profile"
        type="view"
        selectedUserId={selectedUserId}
      />
    </>
  );
};

export default Messaging;

// {selectedUserMessages.map((m) => {
//   const containsUrl = m.text && m.text.includes("http" || "https");
//   return (
//     <>
//       <li className={u?.id == m?.senderId ? "sent" : "replies"}>
//         <p>

//         {/* {viewImage ? (
// <img src={m.file} alt="uploaded" />
// ) : (
// <p>{m.message}</p>
// )} */}
//         {true && <>
//           {containsUrl ? (
//             // If the message contains a URL, render a link
//             <>
//               <a
//                 href={m.message}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   color: u.id == m.senderId ? "#fff" : "#000",
//                   textDecoration: "underline",
//                 }}
//               >

//                 {/* {m.message} */}
//                 {/* {viewImage ? (
// <img src={m.file} alt="uploaded" />
// ) : (
// <p>{m.message}</p>
// )} */}
//               </a>
//               {/* <img src={`${process.env.REACT_APP_BASE_URL}${m.fileUrl}`} /> */}
//             </>
//           ) : (
//             // Otherwise, render the text normally
//             m.message
//           )}
//         </>}
//           <br />
//           <font class="we">
//             {formateChatTime(m?.timestamp)}{" "}
//             <i
//               className={
//                 chat.online === true
//                   ? "fa-solid fa-check-double"
//                   : "fa-solid fa-check"
//               }
//             ></i>
//           </font>
//         </p>
//       </li>
//     </>
//   );
// })}
// ************************************************************************************

// // =================== PROPER WORK CODE ==========================================

// import React, { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { formatRelativeDate, formateChatTime } from "../../../utils/utils";
// import Delete from "../../../components/commonUI/Delete";
// import { useDispatch, useSelector } from "react-redux";
// import { getChatBotMessageData } from "../../../redux/slice/chatBot/chatBotSlice";
// // import EmojiPicker from "emoji-picker-react";
// import { getFirstLetterName } from "../../../utils/utils";
// import EmojiPicker from "emoji-picker-react";
// import ViewDetail from "./ViewDetail";

// const Messaging = ({
//   chat,
//   setMessage,
//   messages,
//   message,
//   handleSendMessage,
//   senderId,
//   u,
//   handleEmoji,
//   setDocumentRef,
//   documentRef,
//   viewImage,
//   userList,
// }) => {
//   // console.log("ccc", messages);

//   const messagesContainerRef = useRef(null);
//   /**
//    * Emoji state and logic here
//    */
//   const [apiMessages, setApiMessages] = useState([]);
//   const [socketMessages, setSocketMessages] = useState([]);
//   const [emojiShowing, setEmojiShowing] = useState(false); // this state for hide and show

//   const emojiPickerRef = useRef(null);

//   // Function to close emoji picker when clicking outside
//   const handleOutsideClick = (event) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(event.target)
//     ) {
//       setEmojiShowing(false);
//     }
//   };

//   // handle emoji add on chat messgae same as whatsapp
//   const handleClickedEmoji = (e) => {
//     handleEmoji(e);
//     setMessage((prev) => prev + e.emoji);
//   };

//   // Attach event listener on component mount
//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);
//   // chat message
//   /**
//    * Selected Message Particular by ID
//    */
//   const selectedUserId = chat.userId; // Assuming chat object has an 'id' property

//   const getData = useSelector((item) => item.getChatBot);
//   const werty = getData.dataMesaage;
//   // console.log(werty);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // Fetch chat messages when the component mounts
//     dispatch(
//       getChatBotMessageData({ senderID: senderId, receiverID: selectedUserId })
//     );
//   }, [dispatch, senderId, selectedUserId])
//   // }, [dispatch, senderId, selectedUserId]);

//   // chat end me

//   /**
//    * Selected Message Particular by ID
//    */
//   const selectedUserMessages = messages.filter(
//     (m) => m.senderId === selectedUserId || m.receiverId === selectedUserId
//   );

//   /**
//    * Chat Message listing Dat
//    */
//   const senderIdToFilter = String(u.id);
//   const receiverIdToFilter = String(selectedUserId);
//   // console.log("senderIdToFilter",senderIdToFilter);
//   // console.log("receiverIdToFilter",receiverIdToFilter);

//   useEffect(() => {
//     // Scroll to the bottom of the messages div
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop =
//         messagesContainerRef.current.scrollHeight;
//     }
//   }, [werty, message, emojiShowing]);

//   // handle Image and document set

//   const sethandleImage = (e) => {
//     const file = e.target.files[0];
//     setDocumentRef(file);
//     // if (file) {
//     //   const imageURL = URL.createObjectURL(file);
//     //   setDocumentRef(file); // Store the image file instead of the URL
//     // }
//   };

//   const [isOpen, setIsopen] = useState(false);
//   // const ToggleSidebar = () => {
//   //   isOpen === true ? setIsopen(false) : setIsopen(true);
//   // };
//   // .......Delete--------------
//   const [showConfirm, setShowConfirm] = useState(false);
//   // .......show-hide--------------
//   const [divVisibility, setDivVisibility] = useState({
//     div1: true,
//     div2: false,
//     div3: false,
//     div4: false,
//     div5: false,
//     div6: false,
//     div7: false,
//     // Add more divs as needed
//   });

//   const showDiv = (divId) => {
//     setDivVisibility((prevState) => {
//       const updatedVisibility = {};
//       // Hide all divs
//       Object.keys(prevState).forEach((key) => {
//         updatedVisibility[key] = false;
//       });
//       // Show the selected div
//       updatedVisibility[divId] = true;
//       return updatedVisibility;
//     });
//   };

//   // .......show-hide--------------
//   const getMessageDate = (timestamp) => {
//     const messageDate = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (
//       messageDate.getDate() === today.getDate() &&
//       messageDate.getMonth() === today.getMonth() &&
//       messageDate.getFullYear() === today.getFullYear()
//     ) {
//       return "Today";
//     } else if (
//       messageDate.getDate() === yesterday.getDate() &&
//       messageDate.getMonth() === yesterday.getMonth() &&
//       messageDate.getFullYear() === yesterday.getFullYear()
//     ) {
//       return "Yesterday";
//     } else {
//       // You can customize the format for older messages
//       return `${messageDate.getFullYear()}-${(messageDate.getMonth() + 1)
//         .toString()
//         .padStart(2, "0")}-${messageDate
//         .getDate()
//         .toString()
//         .padStart(2, "0")}`;
//       // return `${messageDate.getDate()}/${messageDate.getMonth() + 1}`;
//     }
//   };
//   return (
//     <>
//       <div className="content">
//         <div className="contact-profile">
//           <div className="row">
//             <div className="col-12">
//               {/* <div className="col-7"> */}
//               {/* <div className="users" onClick={ToggleSidebar}> */}
//               <div className="users">
//                 <span
//                   class={
//                     chat?.online === true
//                       ? "contact-status online"
//                       : "contact-status busy"
//                   }
//                 ></span>
//                 {chat?.profileImage ? (
//                   <>
//                     <img src={chat?.profileImage} />
//                   </>
//                 ) : (
//                   <>
//                     {/* <img src={"/icons-images/profile1.png"} /> */}
//                     <div className="firstLettermm">
//                       <p>{getFirstLetterName(chat.fname + " " + chat.lname)}</p>
//                     </div>
//                   </>
//                 )}
//                 <h3 onClick={() => setIsopen(true)}>
//                   {/* {chat?.fname + "    " + chat?.lname}{" "} */}
//                   {chat?.fname &&
//                   chat?.lname &&
//                   (chat?.fname.length > 20 || chat?.lname.length > 20)
//                     ? `${chat?.fname.substring(
//                         0,
//                         20
//                       )}...${chat?.lname.substring(0, 20)}...`
//                     : `${chat?.fname} ${chat?.lname}`}
//                   <i class="fa-solid fa-gear"></i>
//                   <br />
//                   <p className={chat?.online === true ? "online" : "offline"}>
//                     {" "}
//                     {chat?.online === true ? "Online" : "Offline"}
//                   </p>
//                 </h3>
//               </div>
//             </div>
//             {/* <div className="col-5">
//               <div className="social-media">
//                 <i class="fa-solid fa-magnifying-glass"></i>
//                 <i class="fa-regular fa-heart"></i>
//                 <i class="fa-regular fa-bell"></i>
//               </div>
//             </div> */}
//           </div>
//         </div>

//         <div className="messages" ref={messagesContainerRef}>
//           <ul>
//             {/* {werty.map((m) => {
//               return (
//                 <>
//                   <li className={u?.id == m?.senderId ? "sent" : "replies"}>
//                     <img
//                       src={
//                         u?.id === m?.senderId
//                           ? `${m.receiverImage}`
//                           : `${m.senderImage}` ||
//                             "/icons-images/userblckicon.png"
//                       }
//                       alt=""
//                     />
//                     <p>
//                       {m.text}
//                       <br />
//                       <font class="we">
//                         {formatRelativeDate(m?.timestamp)}{" "}
//                         {formateChatTime(m?.timestamp)}{" "}

//                         <i className={chat.online === true ? "fa-solid fa-check-double":"fa-solid fa-check"}></i>
//                       </font>
//                     </p>
//                   </li>
//                 </>
//               );
//             })} */}

//             <ul>
//               {/* {werty.map((m, index) => (
//             // Render the heading for today and yesterday messages
//             index === 0 || getMessageDate(m.timestamp) !== getMessageDate(werty[index - 1].timestamp) ? (
//               <li key={`heading-${index}`} className="message-heading">
//                 {getMessageDate(m.timestamp)}
//               </li>
//             ) : null
//           ))} */}
//               {/* ... (existing code) */}
//               {werty.map((m, index) => {
//                 const containsUrl = m.text && m.text.includes("http" && "https");
//                 return (
//                   <>
//                     {/* Render the heading for today and yesterday messages */}
//                     {index === 0 ||
//                     getMessageDate(m.timestamp) !==
//                       getMessageDate(werty[index - 1].timestamp) ? (
//                       <div key={`heading-${index}`} className="message-heading">
//                         <p> {getMessageDate(m.timestamp)}</p>
//                       </div>
//                     ) : null}

//                     {/* Render the actual message */}
//                     <li className={u?.id == m?.senderId ? "sent" : "replies"}>
//                       {/* <img
//                         src={
//                           u?.id === m?.senderId
//                             ? `${m.receiverImage}`
//                             : `${m.senderImage}` ||
//                               "/icons-images/userblckicon.png"
//                         }
//                         alt=""
//                       /> */}
//                       <p>
//                         {containsUrl ? (
//                           // If the message contains a URL, render a link
//                           <a
//                             href={m.text}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{
//                               color: u.id == m.senderId ? "#fff" : "#000",
//                               textDecoration: "underline",
//                             }}
//                           >
//                             {m.text}
//                           </a>
//                         ) : (
//                           // Otherwise, render the text normally
//                           m.text
//                         )}
//                         <br />
//                         <font className="we">
//                           {formateChatTime(m?.timestamp)}{" "}
//                           <i
//                             className={
//                               chat.online === true
//                                 ? "fa-solid fa-check-double"
//                                 : "fa-solid fa-check"
//                             }
//                           ></i>
//                         </font>
//                       </p>
//                       {/* <p>
//                       {m.text}
//                       <br />
//                       <font class="we">
//                         {formateChatTime(m?.timestamp)}{" "}

//                         <i className={chat.online === true ? "fa-solid fa-check-double":"fa-solid fa-check"}></i>
//                       </font>
//                     </p> */}
//                     </li>
//                   </>
//                 );
//               })}
//             </ul>

//             {/* <p>losssssssssssssssssssssssssssssssssssss</p> */}
//             {selectedUserMessages.map((m) => {
//               {
//                 /* console.log("LIVE SOCKET MESSAGE", m.senderId);
//               console.log("LIVE SOCKET MESSAGE ?.id", u?.id); */
//               }
//               return (
//                 <>
//                   <li className={u?.id === m?.senderId ? "sent" : "replies"}>
//                     {/* <img
//                       src={`${m.image}` || "/icons-images/userblckicon.png"}
//                       // src={
//                       //   u?.id === m?.senderId
//                       //     ? `${m.image}`
//                       //     : `${m.image}`
//                       // }
//                       alt=""
//                     /> */}
//                     {/* <p>losssssssssssssssssssssssssssssssssssss</p>  */}
//                     <p>
//                       {m.message}
//                       {/* {viewImage &&<><img src={m.docRef} /></>} */}
//                       <br />
//                       <font class="we">
//                         {/* {formatRelativeDate(m?.timestamp)}{" "} */}
//                         {formateChatTime(m?.timestamp)}{" "}
//                         {/* <i className="fa-solid fa-check-double"></i> */}
//                         <i
//                           className={
//                             chat.online === true
//                               ? "fa-solid fa-check-double"
//                               : "fa-solid fa-check"
//                           }
//                         ></i>
//                       </font>
//                     </p>
//                   </li>
//                 </>
//               );
//             })}
//           </ul>
//           {emojiShowing ? (
//             <>
//               {/* <div className="emojiPicker" ref={emojiPickerRef}> */}
//               <div className="emojiPicker" ref={emojiPickerRef}>
//                 <EmojiPicker onEmojiClick={handleClickedEmoji} />
//               </div>
//             </>
//           ) : null}
//         </div>
//         <form className="chat-box" onSubmit={handleSendMessage}>
//           <div className="">
//             <div className="icon">
//               {/* <NavLink>
//                 <i class="fa-solid fa-plus"></i>
//               </NavLink> */}
//               <NavLink>
//                 {" "}
//                 <i class="fa-regular fa-image"></i>
//               </NavLink>
//               <NavLink>
//                 {" "}
//                 <i
//                   class="fa-regular fa-face-smile"
//                   onClick={() => setEmojiShowing(!emojiShowing)}
//                 ></i>
//               </NavLink>

//               <a>
//                 <label htmlFor="file-input4">
//                   <i class="fa-solid fa-paperclip"></i>
//                 </label>
//                 <input
//                   id="file-input4"
//                   type="file"
//                   accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                   className="d-none"
//                   onChange={sethandleImage}
//                 />
//               </a>
//             </div>
//           </div>

//           <div className="chatinputwidth">
//             <div class="search">
//               {/* <label for="">
//                 <i class="fa-regular fa-face-smile"></i>
//               </label> */}

//               <textarea
//                 type="text"
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Message..."
//                 value={message}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSendMessage(e);
//                   }
//                 }}
//               />
//             </div>
//           </div>
//           <div className="">
//             <button type="submit" className="icon sendBtn">
//               {/* <NavLink> */}
//               <i class="fa-solid fa-paper-plane"></i>
//               {/* send */}
//               {/* </NavLink> */}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* right panal */}
//       {false && (
//         <>
//           <div className={`rightsidebar ${isOpen == true ? "active" : ""}`}>
//             {/* <div className={`rightsidebar ${isOpen == true ? "active" : ""}`}> */}
//             {divVisibility.div1 && (
//               <div className="white-bg">
//                 <div className="topBox">
//                   <div>
//                     <Link onClick={""}>
//                       {/* <Link onClick={ToggleSidebar}> */}
//                       <i class="fa-solid fa-xmark"></i>
//                     </Link>
//                   </div>
//                   <div>
//                     <h3>Airtel</h3>
//                   </div>
//                   <div></div>
//                 </div>

//                 <div className="tabs">
//                   <div>
//                     <Link>
//                       <h2>
//                         <img src="/icons-images/speaker-icon.png" />
//                         <br />
//                         Mute
//                       </h2>
//                     </Link>
//                   </div>
//                   <div>
//                     <h2>
//                       <Link onClick={() => showDiv("div2")}>
//                         <img src="/icons-images/member-icon.png" />
//                         <br />
//                         Members
//                       </Link>
//                     </h2>
//                   </div>
//                   <div>
//                     <h2>
//                       <Link onClick={() => showDiv("div3")}>
//                         <img src="/icons-images/invite-icon.png" />
//                         <br />
//                         Invite
//                       </Link>
//                     </h2>
//                   </div>
//                   <div>
//                     <h2>
//                       <Link onClick={() => setShowConfirm(true)}>
//                         <img src="/icons-images/leave-icon.png" />
//                         <br />
//                         Leave
//                       </Link>
//                     </h2>
//                   </div>
//                 </div>
//                 <hr className="mt-0" />
//                 <div className="scrollbar">
//                   <div className="navigation">
//                     <li>
//                       {" "}
//                       <img src="/icons-images/photo-icon.png" /> Photo & videos{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                   </div>

//                   <div className="photo">
//                     <h3>No Photos or videos found.</h3>
//                   </div>

//                   <div className="navigation mt-3">
//                     <li>
//                       {" "}
//                       <img src="/icons-images/album-icon.png" /> Album{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                   </div>

//                   <div className="photo">
//                     <h3>
//                       Keep your best photos in albums and share them with the
//                       chat.
//                     </h3>
//                     <h2>Create album</h2>
//                   </div>
//                   <div className="navigation mt-3">
//                     <li>
//                       {" "}
//                       <img src="/icons-images/note-icon.png" /> Notes{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                     <li>
//                       {" "}
//                       <img src="/icons-images/events-icon.png" /> Events{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                     <li>
//                       {" "}
//                       <img src="/icons-images/links-icon.png" /> Links{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                     <li>
//                       {" "}
//                       <img src="/icons-images/files-icon.png" /> Files{" "}
//                       <i class="fa-solid fa-chevron-right"></i>
//                     </li>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* .............2............ */}
//             {divVisibility.div2 && (
//               <div className="white-bg">
//                 <div className="topBox">
//                   <div>
//                     <Link onClick={() => showDiv("div1")}>
//                       <i class="fa-solid fa-xmark"></i>
//                     </Link>
//                   </div>
//                   <div>
//                     <h3>Airtel 6</h3>
//                   </div>
//                   <div></div>
//                 </div>

//                 <div className="search">
//                   <label for="">
//                     <i className="fa fa-search" aria-hidden="true"></i>
//                   </label>
//                   <input
//                     type="text"
//                     className="gray-bg"
//                     placeholder="Search by name"
//                   />
//                 </div>

//                 <div className="scrollbar mar-top">
//                   <div className="chatGroup">
//                     <h2>Friends </h2>
//                     <div className="scroll-box">
//                       <Link to="/chatuser">
//                         <div className="chatGroupbox">
//                           <div class="profile">
//                             <div class="users">
//                               <img src="/icons-images/profile1.png" />
//                               <h3>
//                                 Naiyana <br />
//                                 <font>Hi, I m Available</font>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                       <Link to="/chatuser">
//                         <div className="chatGroupbox">
//                           <div class="profile">
//                             <div class="users">
//                               <img src="/icons-images/profile3.png" />
//                               <h3>
//                                 Rahul Narang <br />
//                                 <font>Hi, I m Available</font>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                       <Link to="/chatuser">
//                         <div className="chatGroupbox">
//                           <div class="profile">
//                             <div class="users">
//                               <img src="/icons-images/profile4.png" />
//                               <h3>
//                                 Anjali Sharma
//                                 <br />
//                                 <font>Hi, I m Available</font>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                       <div className="chatGroupbox">
//                         <div class="profile">
//                           <div class="users">
//                             <img src="/icons-images/profile5.png" />
//                             <h3>
//                               Asif Imam
//                               <br />
//                               <font>Hi, I m Available</font>
//                             </h3>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* .............2............ */}

//             {divVisibility.div3 && (
//               <div className="white-bg">
//                 <div className="topBox">
//                   <div>
//                     <Link onClick={() => showDiv("div1")}>
//                       <i class="fa-solid fa-xmark"></i>
//                     </Link>
//                   </div>
//                   <div>
//                     <h3>Choose friend </h3>
//                   </div>
//                   <div>
//                     <Link onClick={() => showDiv("div4")}>
//                       <p>Next</p>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="search">
//                   <label for="">
//                     <i className="fa fa-search" aria-hidden="true"></i>
//                   </label>
//                   <input
//                     type="text"
//                     className="gray-bg"
//                     placeholder="Search by name"
//                   />
//                 </div>

//                 <div className="scrollbar mar-top">
//                   <div className="chatGroup">
//                     <h2>Friends </h2>

//                     <div className="chatGroupbox">
//                       <div class="profile">
//                         <div class="users">
//                           <img src="/icons-images/profile1.png" />
//                           <h3>
//                             Naiyana
//                             <br />
//                             <font>Hi, I m Available</font>
//                           </h3>
//                         </div>
//                         <div class="checkbox-friend checkbox-primary-small">
//                           <input id="1" type="checkbox" />
//                           <label for="1"></label>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="chatGroupbox">
//                       <div class="profile">
//                         <div class="users">
//                           <img src="/icons-images/profile3.png" />
//                           <h3>
//                             Rahul Narang <br />
//                             <font>Hi, I m Available</font>
//                           </h3>
//                         </div>
//                         <div class="checkbox-friend checkbox-primary-small">
//                           <input id="2" type="checkbox" />
//                           <label for="2"></label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="chatGroupbox">
//                       <div class="profile">
//                         <div class="users">
//                           <img src="/icons-images/profile4.png" />
//                           <h3>
//                             Anjali Sharma
//                             <br />
//                             <font>Hi, I m Available</font>
//                           </h3>
//                         </div>
//                         <div class="checkbox-friend checkbox-primary-small">
//                           <input id="3" type="checkbox" />
//                           <label for="3"></label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="chatGroupbox">
//                       <div class="profile">
//                         <div class="users">
//                           <img src="/icons-images/profile5.png" />
//                           <h3>
//                             Asif Imam
//                             <br />
//                             <font>Hi, I m Available</font>
//                           </h3>
//                         </div>
//                         <div class="checkbox-friend checkbox-primary-small">
//                           <input id="4" type="checkbox" />
//                           <label for="4"></label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* .............3............ */}

//             {divVisibility.div4 && (
//               <div className="white-bg">
//                 <div className="topBox">
//                   <div>
//                     <Link onClick={() => showDiv("div1")}>
//                       <i class="fa-solid fa-xmark"></i>
//                     </Link>
//                   </div>
//                   <div>
//                     <h3>New Group</h3>
//                   </div>
//                   <div></div>
//                 </div>

//                 <div className="search">
//                   <label for="" className="l-mar">
//                     <img src="icons-images/group-create-icon.png" />
//                   </label>
//                   <input
//                     className="gray-bg g-search"
//                     type="text"
//                     placeholder="Group Name"
//                   />
//                 </div>

//                 <div className="search">
//                   <button className="btn-permissions" type="button">
//                     Group Permissions <i class="fa-solid fa-chevron-right"></i>
//                   </button>
//                 </div>

//                 <div className="scrollbar mar-top170 ">
//                   <div className="chatGroup">
//                     <h2>Friends </h2>
//                     <div className="scroll-box">
//                       <div className="chatGroupbox">
//                         <div class="profile">
//                           <div class="users">
//                             <img src="/icons-images/profile1.png" />
//                             <h3>
//                               Naiyana
//                               <br />
//                               <font>Hi, I m Available</font>
//                             </h3>
//                           </div>
//                           <div class="checkbox-friend checkbox-primary-small">
//                             <input id="1" type="checkbox" checked />
//                             <label for="1"></label>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="chatGroupbox">
//                         <div class="profile">
//                           <div class="users">
//                             <img src="/icons-images/profile3.png" />
//                             <h3>
//                               Rahul Narang <br />
//                               <font>Hi, I m Available</font>
//                             </h3>
//                           </div>
//                           <div class="checkbox-friend checkbox-primary-small">
//                             <input id="2" type="checkbox" checked />
//                             <label for="2"></label>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* <Delete isOpen={showConfirm} onClose={() => setShowConfirm(false)} /> */}

//       {/* right panal */}

//       <ViewDetail
//         isOpen={isOpen}
//         onClose={() => setIsopen(false)}
//         setIsOpen={setIsopen}
//         title="View Profile"
//         type="add"
//       />
//     </>
//   );
// };

// export default Messaging;

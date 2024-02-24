// import React, { useEffect, useRef, useState } from "react";
// import "../../styles/chat.css";
// import { NavLink, Outlet } from "react-router-dom";
// import { io } from "socket.io-client";
// import {
//   formateTimeWithChatEnd,
//   getCurrentUserLT,
//   getFirstLetterName,
//   getToken,
//   handleFullName,
//   notify,
// } from "../../utils/utils";
// import Messaging from "./Components/Messaging";
// import NoChatSelected from "./Components/NoChatSelected";
// import { useDispatch, useSelector } from "react-redux";
// import { getChatBotMessageData } from "../../redux/slice/chatBot/chatBotSlice";

// const Chatbot = () => {
//   const dispatch = useDispatch();
//   let socket = useRef();
//   const [friendbox, setTab] = useState(true);
//   const friendShow = () => setTab(!friendbox);
//   const [Groupbox, setShow] = useState(true);
//   const senderId = getCurrentUserLT()?.id;
//   const [userList, setUserList] = useState([]);
//   // console.log(userList);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [emoji, setEmoji] = useState();
//   const [documentRef, setDocumentRef] = useState([]);
//   const [viewImage, setViewImage] = useState("");
//   // console.log(documentRef.name);
//   // console.log(emoji?.emoji);
//   const u = useSelector((state) => state.userByToken.user);
//   const GroupShow = () => setShow(!Groupbox);
//   const [file, setFile] = useState();
//   console.log("qqqqqqqq",file);
//   // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx",u.id);
//   // console.log(u.id);
//   // const handleClickedEmoji = (e)=>{
//   //   setEmoji(e)
//   //   // // if (getEmoji) {
//   //   //   console.log(getEmoji?.emoji);
//   //   //   setMessage((prev) => prev + getEmoji?.emoji);
//   //   setNewMessage((prev) => {
//   //       // console.log(getEmoji?.emoji);
//   //       return prev + (emoji?.emojiemoji || ''); // Use empty string if getEmoji?.emoji is undefined
//   //     });
//   // }
//   // const [u, setU] = useState({});
//   // useEffect(() => {
//   //   if (userByToken.success) setU(userByToken.user);
//   // }, [userByToken.success]);

//   // socket.io code
//   // useEffect(() => {
//   //   // Get token from storage
//   //   const token = getToken();

//   //   // Retrieve socket connection details from storage
//   //   const storedSocketId = localStorage.getItem("socketId");

//   //   const res = io(process.env.REACT_APP_BASE_URL, {
//   //     auth: { token, storedSocketId },
//   //   });

//   //   socket.current = res;

//   //   // Save the socket id in storage
//   //   localStorage.setItem("socketId",senderId);

//   //   socket.current.emit("addUser", senderId);

//   //   socket.current.on("getUsers", (userList) => {
//   //     setUserList(userList);
//   //   });

//   //   // Clean-up function for disconnected chat
//   //   return () => {
//   //     socket.current.disconnect();
//   //     localStorage.removeItem("socketId");
//   //   };
//   // }, [senderId]);

//   // // ... (existing code)

//   // useEffect(() => {
//   //   if (socket) {
//   //     socket.current.on("getMessage", (message) => {
//   //       setMessages((existingMessages) => [...existingMessages, message]);
//   //     });
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   const storedUserId = localStorage.getItem("userId");

//   //   const initializeSocket = () => {
//   //     const socketInstance = io(process.env.REACT_APP_BASE_URL, {
//   //       auth: { token: getToken(), userId: storedUserId },
//   //     });

//   //     socketInstance.on("connect", () => {
//   //       socketInstance.emit("addUser", senderId);
//   //     });

//   //     socketInstance.on("getUsers", (userList) => {
//   //       setUserList(userList);
//   //     });

//   //     socketInstance.on("getMessage", (message) => {
//   //       setMessages((existingMessages) => [...existingMessages, message]);
//   //     });

//   //     socketInstance.on("disconnect", () => {
//   //       // Handle disconnection logic, if needed
//   //     });

//   //     return socketInstance;
//   //   };

//   //   socket.current = initializeSocket();

//   //   return () => {
//   //     socket.current.disconnect();
//   //   };
//   // }, [senderId]);
//   // // this is code is proper working ==========================================================================================

//   /**
//    *
//    * file upload res
//    *
//    **/
//   // useEffect(() => {
//   //   socket?.current?.on("fileUploadResponse", (image) => {
//   //     setViewImage(`data:image/jpg;base64,${image}`);
//   //   });
//   // }, [socket]);

//   // useEffect(() => {
//   //   const token = getToken();
//   //   const userId = getCurrentUserLT()?.id;
//   //   console.log(userId);

//   //   if (token && userId) {
//   //     const socketInstance = io(process.env.REACT_APP_BASE_URL, {
//   //       auth: { token, userId },
//   //     });

//   //     socketInstance.emit("addUser", userId);

//   //     socketInstance.on("getUsers", (userList) => {
//   //       // Filter out the current user from the list
//   //       const filteredUserList = userList.filter(user => user.userId !== userId);
//   //       setUserList(filteredUserList);
//   //     });

//   //     socketInstance.on("getMessage", (message) => {
//   //       setMessages((existingMessages) => [...existingMessages, message]);
//   //     });

//   //     socket.current = socketInstance;

//   //     // Cleanup function for disconnected chat
//   //     return () => {
//   //       socketInstance.disconnect();
//   //     };
//   //   }
//   // }, [selectedUser]);

//   // ==== proper work  code
  
  


//   // const handleFileChange = (e) => {
//   //   setFile(e.target.files[0]);
//   // };

//   // const handleFileUpload = () => {
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e) => {
//   //       const fileData = e.target.result.split(',')[1];
//   //       socket.emit('fileUpload', fileData);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };
//   const handleFileChangea = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     console.log("sss",selectedFile);
//     // Automatically send the file when selected
//     if (selectedUser && selectedFile) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result.split(',')[1];
//         // console.log("rrr",fileData);
//         socket.current.emit('fileUpload', {
//           fileData,
//           senderId,
//           receiverId: selectedUser.userId,
//         });
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleFileChangeaa = (e)=>{
//     if(file){
//       const selectedFile = e.target.files[0];
//       const formdata = new FormData()
//       formdata.append("fileUrl",selectedFile)
//       // setFile(selectedFile);
//     }
//   }
//   // function handleFileChange(files) {
//   //   socket.current.emit("upload", files[0], (status) => {
//   //     console.log("wwwwwwwwwww",status);
//   //   });
//   // }
//   // useEffect(() => {
//   //   socket?.current?.on('fileUploadResponse', (response) => {
//   //     console.log("aa",response);
//   //     setViewImage(response.fileUrl); // Assuming it's an image, adjust accordingly
//   //   });
//   // }, []);
//   useEffect(() => {
//     const res = io(process.env.REACT_APP_BASE_URL, {
//       auth: { token: getToken() },
//     });
//     socket.current = res;
//     socket.current.emit("addUser", senderId);
//     socket.current.on("getUsers", (userList) => {
//       setUserList(userList);
//     });

//     // this is a clean-up function for disconnected chat
//     return () => {
//       socket.current.disconnect();
//     };
//   }, [senderId]);

//   useEffect(() => {
//     if (socket) {
//       socket.current.on("getMessage", (message) => {
//         // console.log(message);
//         setMessages((existingMessages) => [...existingMessages, message, file?.name]);
//       });
//     }

//     // return ()=>{
//     //   socket.current.off("getMessage")
//     //   socket.current.disconnect();
//     // }
//   }, []);

//   /**
//    *
//    * @param {this me new function send the chat messages}
//    * @returns
//    */
//   // const formData = new FormData();
//   // formData.append("document", documentRef);
//   // console.log(formData);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);

//     // Automatically send the file when selected
//     if (selectedUser && file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileData = e.target.result.split(',')[1];
//         socket.current.emit('fileUpload', {
//           fileData,
//           senderId,
//           receiverId: selectedUser.userId,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === "") {
//       notify("Please enter a message before sending.", "error");
//       return;
//     }
//     // if (file) {
      
//     //     const selectedFile = e.target.files[0];
//     //     const formdata = new FormData()
//     //     formdata.append("fileUrl",selectedFile)
//     //     // setFile(selectedFile);
//     // }
    
    
//     const messageData = {
//       senderId: senderId,
//       receiverId: selectedUser.userId,
//       message: newMessage,
//       image: selectedUser.profileImage, // Assuming this is the image URL for the selected user
//       // image: selectedUser.profileImage || "/icons-images/userblckicon.png", // Assuming this is the image URL for the selected user
//       // emojiSet: emoji,
//       // docRef:documentRef?.map((doc) => doc.name)
//       fileUrl:file
//     };

//     socket.current.emit("sendMessage", messageData);

//     if (senderId === u.id) {
//       setMessages((existingMessages) => [
//         ...existingMessages,
//         {
//           ...messageData,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     }
  

//     setNewMessage("");
//   };
//   const fullName =
//     u?.fname || u?.lname ? u?.fname + " " + u?.lname : "Loading...";
//   const profileImage = u.profileImage ? u.profileImage : "";
//   const roleType = u.role ? u.role : "";

//   // last index message show
//   const selectedUserId = localStorage.getItem("receiverId");
//   // console.log(selectedUserId);
//   const getData = useSelector((item) => item.getChatBot.dataMesaage);
//   // console.log("qqqqqqqqqqqqqqq", getData);
//   useEffect(() => {
//     // Fetch chat messages when the component mounts
//     dispatch(
//       getChatBotMessageData({ senderID: senderId, receiverID: selectedUserId })
//     );
//   }, [dispatch, senderId, selectedUserId]);

//   return (
//     <div className="frame">
//       <div className="sidepanel">
//         <div class="top-profile">
//           <div class="users">
//             <img src={u.profileImage || "/icons-images/Profileimage.png"} />
//             <h3>
//               {handleFullName({ fullName, fname: u?.fname, lname: u?.lname }) ||
//                 "Loading..."}{" "}
//               {/* <i class="fa-solid fa-pen edit-icon "></i> */}
//               <br />
//               {/* <font>{u.role}</font> */}
//             </h3>
//           </div>
//         </div>
//         <div className="search">
//           <label for="">
//             <i className="fa fa-search" aria-hidden="true"></i>
//           </label>
//           <input type="text" placeholder="Search Here..." />
//         </div>
//         <hr />

//         <div className="scrollbar">
//           {/* <div className="chatGroup">
//               <h2>
//                 Group 3
//                 <span onClick={GroupShow}>
//                   <i class="fa-solid fa-chevron-down"></i>
//                 </span>
//               </h2>
//               {Groupbox && (
//                 <div className="scroll-box">
//                   <NavLink to={`/chatbot/34`} className="chatGroupbox">
//                     <div class="profile">
//                       <div class="users">
//                         <img src="/icons-images/profile1.png" />
//                         <h3>
//                           Naiyana <br />
//                           <font>Hi, I m Available</font>
//                         </h3>
//                       </div>
//                     </div>
//                   </NavLink>

//                   <NavLink to={`/chatbot/22`} className="chatGroupbox">
//                     <div class="profile">
//                       <div class="users">
//                         <img src="/icons-images/profile3.png" />
//                         <h3>Recordified (4)</h3>
//                       </div>
//                     </div>
//                   </NavLink>

//                   <NavLink to={`/chatbot/55`} className="chatGroupbox">
//                     <div class="profile">
//                       <div class="users">
//                         <img src="/icons-images/profile7.png" />
//                         <h3>Airtel (10)</h3>
//                       </div>
//                     </div>
//                   </NavLink>
//                 </div>
//               )}
//             </div> */}

//           <div className="chatGroup">
//             <h2>
//               Friends {userList?.length}
//               <span onClick={friendShow}>
//                 <i class="fa-solid fa-chevron-down"></i>
//               </span>
//             </h2>
//             {friendbox && (
//               <div className="contacts">
//                 <ul>
//                   {/* {userList.filter(e => console.log("wwwwwwwwwwwwwwwwwwwwwwwww",e.userId !== u.id )) */}
//                   {userList.map((u) => {
//                     return (
//                       <li
//                         className={
//                           u.userId === selectedUser?.userId
//                             ? "contact active"
//                             : "contact"
//                         }
//                         onClick={() => setSelectedUser(u)}
//                       >
//                         <div className="wrap">
//                           <span
//                             className={
//                               u.online
//                                 ? "contact-status online"
//                                 : "contact-status busy"
//                             }
//                           ></span>
//                           {u.profileImage ? (
//                             <>
//                               {" "}
//                               <img
//                                 src={
//                                   u.profileImage ||
//                                   `${process.env.PUBLIC_URL}/icons-images/profile1.png`
//                                 }
//                               />
//                             </>
//                           ) : (
//                             <>
//                               {" "}
//                               <div className="firstLetter">
//                                 <p>
//                                   {getFirstLetterName(u.fname + " " + u.lname)}
//                                 </p>
//                               </div>
//                             </>
//                           )}
//                           <div className="meta w-100 ">
//                             <h4 className="name position-relative">
//                               {/* {u.fname && u.lname && `${u.fname.substring(0, 10)}...${u.lname.substring(0, 10)}...`} */}
//                               {u.fname &&
//                               u.lname &&
//                               (u.fname.length > 10 || u.lname.length > 10)
//                                 ? `${u.fname.substring(
//                                     0,
//                                     10
//                                   )}...${u.lname.substring(0, 10)}...`
//                                 : `${u.fname} ${u.lname}`}

//                               {/* {u.fname && u.lname && (u.fname + u.lname.length > 10 ? `${u.fname + " " + u.lname.substring(0, 10)}...` : u.fname + " " + u.lname)} */}
//                               {/* {u.fname + " " + u.lname && u.fname+u.lname.length > 10 ? `${u.fname + " " + u.lname.substring(0,10)}...`:u.fname + " " + u.lname } */}
//                               {/* {item.taskQuestion && item.taskQuestion.length > 15
//                             ? `${item.taskQuestion.substring(0, 15)}...`
//                             : item.taskQuestion} */}
//                               {/* <p className={u?.online === true ? "online":"offline"}> {u?.online === true ? "Online":"Offline"}</p> */}
//                               {/* <p className="preview">
//                                   {u.online ? "Hi, I m Available" : "I'm busy"}
//                                 </p> */}
//                               <p
//                                 class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success text-light  m-0"
//                                 style={{ right: "0" }}
//                               >
//                                 {u?.unreadMessagesCount || ""}
//                               </p>
//                             </h4>{" "}
//                             {/* <div className="d-flex gap-4 justify-content-between">
//                               <p className="m-0">
//                                 {" "}
//                                 {u?.lastMessage?.message
//                                   ? `${u?.lastMessage?.message?.substring(
//                                       0,
//                                       10
//                                     )}...`
//                                   : ""}
//                               </p>
//                               <p className="m-0">
//                                 {u.lastMessage
//                                   ? formateTimeWithChatEnd(
//                                       u?.lastMessage?.timestamp
//                                     )
//                                   : ""}
//                               </p>
//                             </div> */}
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             )}

//             <div className="bottom-bar">
//               <div className="row">
//                 <div className="col-6">
//                   <NavLink to="/dashboard">
//                     <button className="addcontact">
//                       <i class="fa-solid fa-house"></i> <br />
//                       <span>Dashboard</span>
//                     </button>
//                   </NavLink>
//                 </div>
//                 <div className="col-6">
//                   <NavLink to="/chatbot">
//                     {/* <NavLink to="/chatuser"> */}
//                     <button className="settings">
//                       <i class="fa-regular fa-comment-dots"></i>
//                       <br />
//                       <span>Chats</span>
//                     </button>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* messaging */}
//       {selectedUser ? (
//         <Messaging
//           setMessage={setNewMessage}
//           message={newMessage}
//           senderId={senderId}
//           chat={selectedUser}
//           handleEmoji={setEmoji}
//           getEmoji={emoji}
//           handleFileChange={handleFileChange}
//           viewImage={viewImage}
//           userList={userList}
//           // handleClickedEmoji={handleClickedEmoji}
//           {...{ u, handleSendMessage, messages }}
//         />
//       ) : (
//         <NoChatSelected />
//       )}
//     </div>
//   );
// };

// export default Chatbot;


// // socket.on("sendMessage", async ({ senderId, receiverId, message, groupId, file }) => {
// //   upload(socket.request, socket.request.res, async (err) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       const timestamp = new Date();
// //       const sendUserSocket = onlineUsers.get(Number(receiverId));
// //       const isRead = sendUserSocket ? true : false;
// //       let filePath = ''; // Initialize file path
// //       if (socket.request.file) {
// //         filePath = `http://localhost:3003/uploads/chat/${socket.request.file.filename}`; // Construct file URL
// //       }
// //       if (sendUserSocket) {
// //         socket.to(sendUserSocket).emit("getMessage", {
// //           senderId: senderId,
// //           receiverId: receiverId,
// //           message: message,
// //           fileUrl: filePath, // Send file URL
// //           isRead: isRead,
// //           timestamp: timestamp
// //         });
// //       }
// //       await UserChatMessage.create({
// //         senderId,
// //         receiverId,
// //         message,
// //         fileUrl: filePath, // Store file URL in database
// //         timestamp,
// //         isRead
// //       });
// //     }
// //   });
// // });


























































































































































































// import React, { useEffect, useRef, useState } from "react";
// import "../../styles/chat.css";
// import { NavLink, Outlet } from "react-router-dom";
// import { io } from "socket.io-client";
// import {
//   formateTimeWithChatEnd,
//   getCurrentUserLT,
//   getFirstLetterName,
//   getToken,
//   handleFullName,
//   notify,
// } from "../../utils/utils";
// import Messaging from "./Components/Messaging";
// import NoChatSelected from "./Components/NoChatSelected";
// import { useDispatch, useSelector } from "react-redux";
// import { getChatBotMessageData } from "../../redux/slice/chatBot/chatBotSlice";

// const Chatbot = () => {
//   const dispatch = useDispatch();
//   let socket = useRef();
//   const [friendbox, setTab] = useState(true);
//   const friendShow = () => setTab(!friendbox);
//   const [Groupbox, setShow] = useState(true);
//   const senderId = getCurrentUserLT()?.id;
//   const [userList, setUserList] = useState([]);
//   // console.log(userList);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [emoji, setEmoji] = useState();
//   const [documentRef, setDocumentRef] = useState([]);
//   const [viewImage, setViewImage] = useState("");
//   const u = useSelector((state) => state.userByToken.user);
//   const GroupShow = () => setShow(!Groupbox);
//   const [file, setFile] = useState();
//   console.log("qqqqqqqq",file);

//   // const handleFileChangea = (e) => {
//   //   const selectedFile = e.target.files[0];
//   //   setFile(selectedFile);
//   //   // Automatically send the file when selected
//   //   if (selectedUser && selectedFile) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e) => {
//   //       const fileData = e.target.result.split(',')[1];
//   //       // console.log("rrr",fileData);
//   //       socket.current.emit('fileUpload', {
//   //         fileData,
//   //         senderId,
//   //         receiverId: selectedUser.userId,
//   //       });
//   //     };
//   //     reader.readAsDataURL(selectedFile);
//   //   }
//   // };

//   useEffect(() => {
//     const res = io(process.env.REACT_APP_BASE_URL, {
//       auth: { token: getToken() },
//     });
//     socket.current = res;
//     socket.current.emit("addUser", senderId);
//     socket.current.on("getUsers", (userList) => {
//       setUserList(userList);
//     });

//     // this is a clean-up function for disconnected chat
//     return () => {
//       socket.current.disconnect();
//     };
//   }, [senderId]);

//   useEffect(() => {
//     if (socket) {
//       socket.current.on("getMessage", (message) => {
//         // console.log(message);
//         setMessages((existingMessages) => [
//           ...existingMessages,
//           message,
//           file?.name,
//         ]);
//       });
//     }

//     // return ()=>{
//     //   socket.current.off("getMessage")
//     //   socket.current.disconnect();
//     // }
//   }, []);

//   /**
//    *
//    * @param {this me new function send the chat messages}
//    * @returns
//    */
//   // const formData = new FormData();
//   // formData.append("document", documentRef);
//   // console.log(formData);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
  
//     if (!file) {
//       return;
//     }
  
//     const reader = new FileReader();
  
//     reader.onload = async () => {
//       const base64File = reader.result.split(",")[1];
  
//       try {
//         await socket.current.emit("filePath", {
//           file: base64File,
//           fileName: file.name,
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     reader.readAsDataURL(file);
//   };
//   useEffect(() => {
//     socket.current.on("receiveFile", (fileData) => {
//       setFile(fileData.fileURL);
//     });
//   }, []);

//   // const handleSendMessage = async (e) => {
//   //   e.preventDefault();
//   //   if (newMessage.trim() === "") {
//   //     notify("Please enter a message before sending.", "error");
//   //     return;
//   //   }

//   //   const messageData = {
//   //     senderId: senderId,
//   //     receiverId: selectedUser.userId,
//   //     message: newMessage,
//   //     image: selectedUser.profileImage,
//   //     // file: file,
//   //   };

//   //   socket.current.emit("sendMessage", messageData);

//   //   if (senderId === u.id) {
//   //     setMessages((existingMessages) => [
//   //       ...existingMessages,
//   //       {
//   //         ...messageData,
//   //         timestamp: new Date().toISOString(),
//   //       },
//   //     ]);
//   //   }

//   //   setNewMessage("");
//   // };
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() && !file) {
//       notify("Please enter a message or select an image before sending.", "error");
//       return;
//     }
  
//     const messageData = {
//       senderId: senderId,
//       receiverId: selectedUser.userId,
//       message: newMessage,
//       image: selectedUser.profileImage,
//     };
  
//     // If an image file is present, send it as well
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
  
//       // Append image data to the messageData
//       formData.forEach((value, key) => {
//         messageData[key] = value;
//       });
//     }
  
//     socket.current.emit("sendMessage", messageData);
  
//     if (senderId === u.id) {
//       setMessages((existingMessages) => [
//         ...existingMessages,
//         {
//           ...messageData,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     }
  
//     setNewMessage("");
//     setFile(null); // Clear the file state after sending
//   };
//   const fullName =
//     u?.fname || u?.lname ? u?.fname + " " + u?.lname : "Loading...";

//   const selectedUserId = localStorage.getItem("receiverId");

//   // const getData = useSelector((item) => item.getChatBot.dataMesaage);
//   // // console.log("qqqqqqqqqqqqqqq", getData);
//   useEffect(() => {
//     // Fetch chat messages when the component mounts
//     dispatch(
//       getChatBotMessageData({ senderID: senderId, receiverID: selectedUserId })
//     );
//   }, [dispatch, senderId, selectedUserId]);

//   return (
//     <div className="frame">
//       <div className="sidepanel">
//         <div class="top-profile">
//           <div class="users">
//             <img src={u.profileImage || "/icons-images/Profileimage.png"} />
//             <h3>
//               {handleFullName({ fullName, fname: u?.fname, lname: u?.lname }) ||
//                 "Loading..."}{" "}
//               {/* <i class="fa-solid fa-pen edit-icon "></i> */}
//               <br />
//               {/* <font>{u.role}</font> */}
//             </h3>
//           </div>
//         </div>
//         <div className="search">
//           <label for="">
//             <i className="fa fa-search" aria-hidden="true"></i>
//           </label>
//           <input type="text" placeholder="Search Here..." />
//         </div>
//         <hr />

//         <div className="scrollbar">
//           <div className="chatGroup">
//             <h2>
//               Friends {userList?.length}
//               <span onClick={friendShow}>
//                 <i class="fa-solid fa-chevron-down"></i>
//               </span>
//             </h2>
//             {friendbox && (
//               <div className="contacts">
//                 <ul>
//                   {/* {userList.filter(e => console.log("wwwwwwwwwwwwwwwwwwwwwwwww",e.userId !== u.id )) */}
//                   {userList.map((u) => {
//                     return (
//                       <li
//                         className={
//                           u.userId === selectedUser?.userId
//                             ? "contact active"
//                             : "contact"
//                         }
//                         onClick={() => setSelectedUser(u)}
//                       >
//                         <div className="wrap">
//                           <span
//                             className={
//                               u.online
//                                 ? "contact-status online"
//                                 : "contact-status busy"
//                             }
//                           ></span>
//                           {u.profileImage ? (
//                             <>
//                               {" "}
//                               <img
//                                 src={
//                                   u.profileImage ||
//                                   `${process.env.PUBLIC_URL}/icons-images/profile1.png`
//                                 }
//                               />
//                             </>
//                           ) : (
//                             <>
//                               {" "}
//                               <div className="firstLetter">
//                                 <p>
//                                   {getFirstLetterName(u.fname + " " + u.lname)}
//                                 </p>
//                               </div>
//                             </>
//                           )}
//                           <div className="meta w-100 ">
//                             <h4 className="name position-relative">
//                               {u.fname &&
//                               u.lname &&
//                               (u.fname.length > 10 || u.lname.length > 10)
//                                 ? `${u.fname.substring(
//                                     0,
//                                     10
//                                   )}...${u.lname.substring(0, 10)}...`
//                                 : `${u.fname} ${u.lname}`}

//                               <p
//                                 class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success text-light  m-0"
//                                 style={{ right: "0" }}
//                               >
//                                 {u?.unreadMessagesCount || ""}
//                               </p>
//                             </h4>{" "}
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             )}

//             <div className="bottom-bar">
//               <div className="row">
//                 <div className="col-6">
//                   <NavLink to="/dashboard">
//                     <button className="addcontact">
//                       <i class="fa-solid fa-house"></i> <br />
//                       <span>Dashboard</span>
//                     </button>
//                   </NavLink>
//                 </div>
//                 <div className="col-6">
//                   <NavLink to="/chatbot">
//                     {/* <NavLink to="/chatuser"> */}
//                     <button className="settings">
//                       <i class="fa-regular fa-comment-dots"></i>
//                       <br />
//                       <span>Chats</span>
//                     </button>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* messaging */}
//       {selectedUser ? (
//         <Messaging
//           setMessage={setNewMessage}
//           message={newMessage}
//           senderId={senderId}
//           chat={selectedUser}
//           handleEmoji={setEmoji}
//           getEmoji={emoji}
//           handleFileChange={handleFileChange}
//           viewImage={viewImage}
//           userList={userList}
//           file={file}
//           // handleClickedEmoji={handleClickedEmoji}
//           {...{ u, handleSendMessage, messages }}
//         />
//       ) : (
//         <NoChatSelected />
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// // socket.on("sendMessage", async ({ senderId, receiverId, message, groupId, file }) => {
// //   upload(socket.request, socket.request.res, async (err) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       const timestamp = new Date();
// //       const sendUserSocket = onlineUsers.get(Number(receiverId));
// //       const isRead = sendUserSocket ? true : false;
// //       let filePath = ''; // Initialize file path
// //       if (socket.request.file) {
// //         filePath = `http://localhost:3003/uploads/chat/${socket.request.file.filename}`; // Construct file URL
// //       }
// //       if (sendUserSocket) {
// //         socket.to(sendUserSocket).emit("getMessage", {
// //           senderId: senderId,
// //           receiverId: receiverId,
// //           message: message,
// //           fileUrl: filePath, // Send file URL
// //           isRead: isRead,
// //           timestamp: timestamp
// //         });
// //       }
// //       await UserChatMessage.create({
// //         senderId,
// //         receiverId,
// //         message,
// //         fileUrl: filePath, // Store file URL in database
// //         timestamp,
// //         isRead
// //       });
// //     }
// //   });
// // });




















































































































// // ************************************************=================================================***********************************************************************************
// import React, { useEffect, useRef, useState } from "react";
// import "../../styles/chat.css";
// import { NavLink, Outlet } from "react-router-dom";
// import { io } from "socket.io-client";
// import {
//   formateTimeWithChatEnd,
//   getCurrentUserLT,
//   getFirstLetterName,
//   getToken,
//   handleFullName,
//   makeApiRequest,
//   notify,
// } from "../../utils/utils";
// import Messaging from "./Components/Messaging";
// import NoChatSelected from "./Components/NoChatSelected";
// import { useDispatch, useSelector } from "react-redux";
// import { getChatBotMessageData } from "../../redux/slice/chatBot/chatBotSlice";

// const Chatbot = () => {
//   const dispatch = useDispatch();
//   let socket = useRef();
//   const [friendbox, setTab] = useState(true);
//   const friendShow = () => setTab(!friendbox);
//   const [Groupbox, setShow] = useState(true);
//   const senderId = getCurrentUserLT()?.id;
//   const [userList, setUserList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [emoji, setEmoji] = useState();
//   const [documentRef, setDocumentRef] = useState([]);
//   const [viewImage, setViewImage] = useState("");
//   console.log("IMAGE CHECK",viewImage);
//   // const [file, setFile] = useState();
//   const u = useSelector((state) => state.userByToken.user);
//   const GroupShow = () => setShow(!Groupbox);
//   // console.log("textFile", viewImage);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     // console.log("xxxxxxxxxxxxxx",selectedFile);
//     if (selectedFile) {
//       // const imageURL = URL.createObjectURL(selectedFile);
//       // setViewImage(selectedFile.name);
//       setViewImage(selectedFile);
//     }
//     // if (selectedFile) {
      
//     //   const imageUrl = URL.createObjectURL(selectedFile);
//     //   setViewImage(imageUrl);
//     // }
//   };
//   // const handleFileChange = (event) => {
//   //   const file = event.target.files[0];
//   //   setViewImage("profileImage", viewImage);
//   //   if (file && file.type.startsWith("image/")) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setViewImage(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   } else {
//   //     setViewImage("/icons-images/avtar.svg");
//   //   }
//   // };
//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setViewImage(file);
//   // };

//   const uploadFile = async (params) => {
//     const formData = new FormData();
//     formData.append('chatImage', viewImage);
//     const response = await makeApiRequest('/upload-chat-message', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "multipart/form-data", // Important for file uploads
//       },
//       body: formData,
//     });
//     const { fileUrl } = await response;
//     console.log("22222222222",fileUrl);
//     return fileUrl;
//   };
//   // const uploadFile = async () => {
//   //   const formData = new FormData();
//   //   formData.append('chatImage', viewImage);
    
//   //   const response = await makeApiRequest('/upload-chat-message', {
//   //     method: 'POST',
//   //     body: formData,
//   //   });
    
//   //   const { fileUrl, fileName } = await response.json();
//   //   console.log("File URL:", fileUrl);
//   //   console.log("File Name:", fileName);
    
//   //   return { fileUrl, fileName };
//   // };
  
//   // ==== proper work  code
//   useEffect(() => {
//     const res = io(process.env.REACT_APP_BASE_URL, {
//       auth: { token: getToken() },
//     });
//     socket.current = res;
//     socket.current.emit("addUser", senderId);
//     socket.current.on("getUsers", (userList) => {
//       setUserList(userList);
//     });

//     // this is a clean-up function for disconnected chat
//     return () => {
//       socket.current.disconnect();
//     };
//   }, [senderId]);

//   useEffect(() => {
//     if (socket) {
//       socket.current.on("getMessage", (message) => {
//         console.log(message);
//         setMessages((existingMessages) => [...existingMessages, message]);
//       });
//     }
//   }, []);

//   /**
//    *
//    * @param {this me new function send the chat messages}
//    * @returns
//    */

//   const handleSendMessage = async (e) => {
    
//     e.preventDefault();
//     if (newMessage.trim() === "" && !viewImage) {
//       notify("Please enter a message before sending.", "error");
//       return;
//     }
//     // const fileUrl = await uploadFile(viewImage);
//     const  fileUrl  = await uploadFile();
//     console.log("dddddddddddddd",fileUrl);
//     // console.log("fileNamefileName",fileName);
//     // const formData = new FormData();
//     // formData.append("file", viewImage);
//     // const formData = new FormData();
//     // formData.append("file", viewImage);
//     // console.log(fileUrl);
//     const messageData = {
//       senderId: senderId,
//       receiverId: selectedUser.userId,
//       message: newMessage,
//       fileUrl: fileUrl,
//     };

//     socket.current.emit("sendMessage", messageData);
//     // socket.current.emit("sendMessage", formData);

//     if (senderId === u.id) {
//       setMessages((existingMessages) => [
//         ...existingMessages,
//         {
//           ...messageData,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     }

//     setNewMessage("");
//   };
//   const fullName =
//     u?.fname || u?.lname ? u?.fname + " " + u?.lname : "Loading...";
//   const profileImage = u.profileImage ? u.profileImage : "";
//   const roleType = u.role ? u.role : "";

//   // last index message show
//   const selectedUserId = localStorage.getItem("receiverId");


//   return (
//     <div className="frame">
//       <div className="sidepanel">
//         <div class="top-profile">
//           <div class="users">
//             <img src={u.profileImage || "/icons-images/Profileimage.png"} />
//             <h3>
//               {handleFullName({ fullName, fname: u?.fname, lname: u?.lname }) ||
//                 "Loading..."}{" "}
//               <br />
//             </h3>
//           </div>
//         </div>
//         <div className="search">
//           <label for="">
//             <i className="fa fa-search" aria-hidden="true"></i>
//           </label>
//           <input type="text" placeholder="Search Here..." />
//         </div>
//         <hr />

//         <div className="scrollbar">
//           <div className="chatGroup">
//             <h2>
//             Total Friends:-  {userList?.length}
//               <span onClick={friendShow}>
//                 {/* <i class="fa-solid fa-chevron-down"></i> */}
//               </span>
//             </h2>
//             {friendbox && (
//               <div className="contacts">
//                 <ul>
//                   {userList.map((u) => {
//                     return (
//                       <li
//                         className={
//                           u.userId === selectedUser?.userId
//                             ? "contact active"
//                             : "contact"
//                         }
//                         onClick={() => setSelectedUser(u)}
//                       >
//                         <div className="wrap">
//                           <span
//                             className={
//                               u.online
//                                 ? "contact-status online"
//                                 : "contact-status busy"
//                             }
//                           ></span>
//                           {u.profileImage ? (
//                             <>
//                               {" "}
//                               <img
//                                 src={
//                                   u.profileImage ||
//                                   `${process.env.PUBLIC_URL}/icons-images/profile1.png`
//                                 }
//                               />
//                             </>
//                           ) : (
//                             <>
//                               {" "}
//                               <div className="firstLetter">
//                                 <p>
//                                   {getFirstLetterName(u.fname + " " + u.lname)}
//                                 </p>
//                               </div>
//                             </>
//                           )}
//                           <div className="meta w-100 ">
//                             <h4 className="name position-relative">
//                               {u.fname &&
//                               u.lname &&
//                               (u.fname.length > 10 || u.lname.length > 10)
//                                 ? `${u.fname.substring(
//                                     0,
//                                     10
//                                   )}...${u.lname.substring(0, 10)}...`
//                                 : `${u.fname} ${u.lname}`}

//                               {/* <p
//                                 class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success text-light  m-0"
//                                 style={{ right: "0" }}
//                               >
//                                 {u?.unreadMessagesCount || ""}
//                               </p> */}
//                             </h4>{" "}
//                           </div>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             )}

//             <div className="bottom-bar">
//               <div className="row">
//                 <div className="col-6">
//                   <NavLink to="/dashboard">
//                     <button className="addcontact">
//                       <i class="fa-solid fa-house"></i> <br />
//                       <span>Dashboard</span>
//                     </button>
//                   </NavLink>
//                 </div>
//                 <div className="col-6">
//                   <NavLink to="/chatbot">
//                     {/* <NavLink to="/chatuser"> */}
//                     <button className="settings">
//                       <i class="fa-regular fa-comment-dots"></i>
//                       <br />
//                       <span>Chats</span>
//                     </button>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* {file && <img src={file} alt="Uploaded File" width={"100px"} />} */}
//       {/* messaging */}
//       {selectedUser ? (
//         <Messaging
//           setMessage={setNewMessage}
//           message={newMessage}
//           senderId={senderId}
//           chat={selectedUser}
//           handleEmoji={setEmoji}
//           getEmoji={emoji}
//           documentRef={documentRef}
//           setDocumentRef={setDocumentRef}
//           viewImage={viewImage}
//           // file={file}
//           setViewImage={setViewImage}
//           handleFileChange={handleFileChange}
//           userList={userList}
//           {...{ u, handleSendMessage, messages }}
//         />
//       ) : (
//         <NoChatSelected />
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// // socket.on("sendMessage", async ({ senderId, receiverId, message, groupId, file }) => {
// //   upload(socket.request, socket.request.res, async (err) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       const timestamp = new Date();
// //       const sendUserSocket = onlineUsers.get(Number(receiverId));
// //       const isRead = sendUserSocket ? true : false;
// //       let filePath = ''; // Initialize file path
// //       if (socket.request.file) {
// //         filePath = `http://localhost:3003/uploads/chat/${socket.request.file.filename}`; // Construct file URL
// //       }
// //       if (sendUserSocket) {
// //         socket.to(sendUserSocket).emit("getMessage", {
// //           senderId: senderId,
// //           receiverId: receiverId,
// //           message: message,
// //           fileUrl: filePath, // Send file URL
// //           isRead: isRead,
// //           timestamp: timestamp
// //         });
// //       }
// //       await UserChatMessage.create({
// //         senderId,
// //         receiverId,
// //         message,
// //         fileUrl: filePath, // Store file URL in database
// //         timestamp,
// //         isRead
// //       });
// //     }
// //   });
// // });

// // const handleFileChange = (event) => {
// //   const file = event.target.files[0];
// //   if (file && file.type.startsWith("image/")) {
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       // console.log("xx",reader.result);
// //       setFile(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   } else {
// //     setFile("/icons-images/avtar.svg");
// //   }
// // };
// // const handleFileChange = (event) => {
// //     const file = event.target.files[0];

// //     const  formData = new FormData();
// //     formData.append("file", file);

// //     setFile(file?.name)

// // };

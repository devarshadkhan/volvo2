  import React, { useEffect, useRef, useState } from "react";
  import "../../styles/chat.css";
  import { NavLink, Outlet } from "react-router-dom";
  import { io } from "socket.io-client";
  import {
    formateTimeWithChatEnd,
    getCurrentUserLT,
    getFirstLetterName,
    getToken,
    handleFullName,
    makeApiRequest,
    notify,
  } from "../../utils/utils";
  import Messaging from "./Components/Messaging";
  import NoChatSelected from "./Components/NoChatSelected";
  import { useDispatch, useSelector } from "react-redux";
  import { getChatBotMessageData } from "../../redux/slice/chatBot/chatBotSlice";
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileViewModal from "./Components/FileViewModal";
  const Chatbot = () => {
    const dispatch = useDispatch();
    let socket = useRef();
    const [friendbox, setTab] = useState(true);
    const friendShow = () => setTab(!friendbox);
    const [Groupbox, setShow] = useState(true);
    const senderId = getCurrentUserLT()?.id;
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [emoji, setEmoji] = useState();
    const [documentRef, setDocumentRef] = useState([]);
    const [viewImage, setViewImage] = useState("");
    const [fileData, setFileData] = useState()
console.log(fileData);
const [ modelOpen, setModelOpen] = useState(false)
  


    // console.log("IMAGE CHECK",viewImage);
    // const [file, setFile] = useState();
    const u = useSelector((state) => state.userByToken.user);
    const GroupShow = () => setShow(!Groupbox);
    // console.log("textFile", viewImage);

    // const handleFileChange = (e) => {
    //   // const selectedFile = e.target.files[0];
    //   // // console.log("xxxxxxxxxxxxxx",selectedFile);
    //   // if (selectedFile) {
    //   //   // const imageURL = URL.createObjectURL(selectedFile);
    //   //   // setViewImage(selectedFile.name);
    //   //   setViewImage(selectedFile);
    //   // }
      
    // };
    // const handleFileChange = (event) => {
    //   const file = event.target.files[0];
  
    //   if (file && file.type.startsWith("image/")) {
    //     setViewImage(file);
    //   } else {
    //     setViewImage(null);
    //   }
    // };
   
    // const handleFileChange = (event) => {
    //   const file = event.target.files[0];
    //   setViewImage(file)
    //   if (file && file.type.startsWith("image/")) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setViewImage(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   } else {
    //     setViewImage("/icons-images/avtar.svg");
    //   }
    // };


    // const uploadFile = async (params) => {
    //   const formData = new FormData();
    //   formData.append('chatImage', viewImage);
    //   const response = await makeApiRequest('/upload-chat-message', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "multipart/form-data", // Important for file uploads
    //     },
    //     body: formData,
    //   });
    //   const { fileUrl } = await response;
    //   console.log("22222222222",fileUrl);
    //   return fileUrl;
    // };
    // const uploadFile = async () => {
    //   try {
    //     const formData = new FormData();
    //     formData.append('chatImage', viewImage);
    
    //     const response = await makeApiRequest('/upload-chat-message', {
    //       method: 'POST',
    //       headers: {
    //         // Do not set Content-Type here; it will be set automatically for FormData
    //       },
    //       body: formData,
    //     });
    
    //     if (!response.ok) {
    //       throw new Error(`Upload failed with status ${response.status}`);
    //     }
    
    //     const responseData = await response.json();
    //     const { fileUrl } = responseData;
    //     console.log("File Uploaded Successfully. File URL:", fileUrl);
    //     return fileUrl;
    //   } catch (error) {
    //     console.error("Error uploading file:", error.message);
    //     // Handle error as needed
    //     // You can also notify the user about the error
    //     notify("File upload failed. Please try again.", "error");
    //     return null;
    //   }
    // };
    
    // const uploadFile = async () => {
    //   const formData = new FormData();
    //   formData.append('chatImage', viewImage);
      
    //   const response = await makeApiRequest('/upload-chat-message', {
    //     method: 'POST',
    //     body: formData,
    //   });
      
    //   const { fileUrl, fileName } = await response.json();
    //   console.log("File URL:", fileUrl);
    //   console.log("File Name:", fileName);
      
    //   return { fileUrl, fileName };
    // };
    
    // ==== proper work  code
    useEffect(() => {
      const res = io(process.env.REACT_APP_BASE_URL, {
        auth: { token: getToken() },
      });
      socket.current = res;
      socket.current.emit("addUser", senderId);
      socket.current.on("getUsers", (userList) => {
        setUserList(userList);
      });

      // this is a clean-up function for disconnected chat
      return () => {
        socket.current.disconnect();
      };
    }, [senderId]);

    useEffect(() => {
      if (socket) {
        socket.current.on("getMessage", (message) => {
          console.log(message);
          setMessages((existingMessages) => [...existingMessages, message]);
        });
      }
    }, []);

    /**
     *
     * @param {this me new function send the chat messages}
     * @returns
     */

  

    
  // const uploadFile = async () => {
  //   if (!viewImage) {
  //     notify('Please select a valid image file before uploading.',"error");
  //     return;
  //   }

  //   try {
  //     // Create FormData to send the file
  //     const formData = new FormData();
  //     formData.append('chatImage', viewImage);

  //     // Make API request to upload the file using Axios
  //     const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData, );

  //     if (response) {
  //       console.log("response",response.data);
  //       // setFileData(response.data.fileUrl)
  //     } 
  //   } catch (error) {
  //     // Handle network error or other issues
  //     console.error('Error uploading file:', error.message);
  //   }
  // };



  const formik = useFormik({
    initialValues: {
      chatImage: null,
    },
    // validationSchema: Yup.object({
    //   chatImage: Yup.mixed().required('Please select an image file').test('fileFormat', 'Invalid file format', (value) => value && value.type.startsWith('image/')),
    //   message: Yup.string().required('Please enter a message'),
    // }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('chatImage', values.chatImage);

        // Make API request to upload the file and send the message
        const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData);

        if (response) {
          console.log('File uploaded successfully:', response);
          setFileData(response.data.fileUrl)
          // Handle successful response (if needed)
        if(response.data.fileUrl){
            handleSendMessage()
            setModelOpen(false)
          
          }

        } else {
          console.error('File upload failed:', response.statusText);
          // Handle failed response (if needed)
        }
      } catch (error) {
        console.error('Error uploading file:', error.message);
        // Handle error (if needed)
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Update the formik values
    // setViewImage("chatImage", file);
    formik.setFieldValue("chatImage", file);

    // // Set the "touched" status of the field
    formik.setFieldTouched("chatImage", true);

    if (file && file.type.startsWith("image/")) {
      // openModal(true); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setModelOpen(true)
    }
  };

    const handleSendMessage = async (sds) => {
      
      // sds.preventDefault();
      if (newMessage.trim() === "" && !viewImage) {
        notify("Please enter a message before sending.", "error");
        return;
      }
      // const fileUrl = await uploadFile(viewImage);
      // const  fileUrl  = await formik.handleSubmit();
      // console.log("dddddddddddddd",fileUrl);
      const messageData = {
        senderId: senderId,
        receiverId: selectedUser.userId,
        message: newMessage,
        fileUrl: fileData,
      };

      socket.current.emit("sendMessage", messageData);
      // socket.current.emit("sendMessage", formData);

      if (senderId === u.id) {
        setMessages((existingMessages) => [
          ...existingMessages,
          {
            ...messageData,
            timestamp: new Date().toISOString(),
          },
        ]);
      }

      setNewMessage("");
    };
    const fullName = u?.fname || u?.lname ? u?.fname + " " + u?.lname : "Loading...";

    return (
      
      <div className="frame">
       {/* <button onClick={()=> setModelOpen(true)}>sadasasdad</button> */}
        <div className="sidepanel">
          <div class="top-profile">
            <div class="users">
              <img src={u.profileImage || "/icons-images/Profileimage.png"} />
              <h3>
                {handleFullName({ fullName, fname: u?.fname, lname: u?.lname }) ||
                  "Loading..."}{" "}
                <br />
              </h3>
            </div>
          </div>
          <div className="search">
            <label for="">
              <i className="fa fa-search" aria-hidden="true"></i>
            </label>
            <input type="text" placeholder="Search Here..." />
          </div>
          <hr />

          <div className="scrollbar">
            <div className="chatGroup">
              <h2>
              Total Friends:-  {userList?.length}
                <span onClick={friendShow}>
                  {/* <i class="fa-solid fa-chevron-down"></i> */}
                </span>
              </h2>
              {friendbox && (
                <div className="contacts">
                  <ul>
                    {userList.map((u) => {
                      return (
                        <li
                          className={
                            u.userId === selectedUser?.userId
                              ? "contact active"
                              : "contact"
                          }
                          onClick={() => setSelectedUser(u)}
                        >
                          <div className="wrap">
                            <span
                              className={
                                u.online
                                  ? "contact-status online"
                                  : "contact-status busy"
                              }
                            ></span>
                            {u.profileImage ? (
                              <>
                                {" "}
                                <img
                                  src={
                                    u.profileImage ||
                                    `${process.env.PUBLIC_URL}/icons-images/profile1.png`
                                  }
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <div className="firstLetter">
                                  <p>
                                    {getFirstLetterName(u.fname + " " + u.lname)}
                                  </p>
                                </div>
                              </>
                            )}
                            <div className="meta w-100 ">
                              <h4 className="name position-relative">
                                {u.fname &&
                                u.lname &&
                                (u.fname.length > 10 || u.lname.length > 10)
                                  ? `${u.fname.substring(
                                      0,
                                      10
                                    )}...${u.lname.substring(0, 10)}...`
                                  : `${u.fname} ${u.lname}`}

                                {/* <p
                                  class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success text-light  m-0"
                                  style={{ right: "0" }}
                                >
                                  {u?.unreadMessagesCount || ""}
                                </p> */}
                              </h4>{" "}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="bottom-bar">
                <div className="row">
                  <div className="col-6">
                    <NavLink to="/dashboard">
                      <button className="addcontact">
                        <i class="fa-solid fa-house"></i> <br />
                        <span>Dashboard</span>
                      </button>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/chatbot">
                      {/* <NavLink to="/chatuser"> */}
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
          </div>
        </div>
        {/* {file && <img src={file} alt="Uploaded File" width={"100px"} />} */}
        {/* messaging */}

      {/* <FileViewModal   isOpenM={modelOpen}
            onClose={() => setModelOpen(false)}
            setIsOpen={setModelOpen}/> */}
        {selectedUser ? (
          <Messaging
            setMessage={setNewMessage}
            message={newMessage}
            senderId={senderId}
            chat={selectedUser}
            handleEmoji={setEmoji}
            getEmoji={emoji}
            documentRef={documentRef}
            setDocumentRef={setDocumentRef}
            viewImage={viewImage}
            // file={file}
            setViewImage={setViewImage}
            handleFileChange={handleFileChange}
            userList={userList}
            formik={formik}
            {...{ u, handleSendMessage, messages }}




            isOpenM={modelOpen}
            onClose={() => setModelOpen(false)}
            setIsOpen={setModelOpen}
            
            // openModal={openModal}
          />
        ) : (
          <NoChatSelected />
        )}
      </div>
    );
  };

  export default Chatbot;

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

// import React, { useState } from 'react';
// import { makeApiRequest } from '../../utils/utils';

// const Chatbot = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
// console.log(selectedFile);
//   // const handleFileChange = (e) => {
//   //   // Get the selected file from the input
//   //   const file = e.target.files[0];
//   //   setSelectedFile(file);
//   // };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile("chatImage", file);
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedFile(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setSelectedFile("/icons-images/avtar.svg");
//     }
//   };
//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file before uploading.');
//       return;
//     }
  
//     try {
//       // Create FormData to send the file
//       const formData = new FormData();
//       formData.append('chatImage', selectedFile);
  
//       // Make API request to upload the file
//       const response = await makeApiRequest('/upload-chat-message', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (response) {
//         // Extract the filename from the fileUrl
//         const  fileUrl  = await response;
//         console.log(fileUrl.fileUrl);
  
//         // File uploaded successfully
//         alert(`File ${fileUrl} uploaded successfully!`);
//       } else {
//         // Handle server error
//         console.error('File upload failed:', response.statusText);
//       }
//     } catch (error) {
//       // Handle network error or other issues
//       console.error('Error uploading file:', error.message);
//     }
//   };
  
//   return (
//     <div>
//       <input type="file"  onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload File</button>
//     </div>
//   );
// };

// export default Chatbot;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [selectedFile, setSelectedFile] = useState("");
 
//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];

//   //   if (file) {
//   //     const imageURL = URL.createObjectURL(file);
//   //     setSelectedFile(file); // Store the image file instead of the URL
//   //     // setSelectedFile((prevImages) => ({ ...prevImages, file ,  imageURL }));
//   //   }
//   // };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile("chatImage", file);
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedFile(reader.result);
//         console.log(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setSelectedFile("/icons-images/avtar.svg");
//     }
//   };
//   // const handleFileChange = (event) => {
//   //   const file = event.target.files[0];
//   //   // setSelectedFile("profileImage", file);
//   //   if (file && file.type.startsWith("image/")) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setSelectedFile(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   } else {
//   //     setSelectedFile("/icons-images/avtar.svg");
//   //   }
//   // };
//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];

//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setSelectedFile(reader.result); // Store the base64-encoded string
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       alert('Please select a valid image file before uploading.');
//       return;
//     }

//     try {
     
//       const formData = new FormData();
//       formData.append('chatImage', selectedFile);
//       const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData,);

//       if (response) {

//         console.log("resultresultRESPONSE",response);
//         // const { fileUrl } = response.data;

//         // File uploaded successfully
//         // alert(`File ${fileUrl} uploaded successfully!`);
//       } else {
//         // Handle server error
//         console.error('File upload failed:', response.statusText);
//       }
//     } catch (error) {
//       // Handle network error or other issues
//       console.error('Error uploading file:', error.message);
//     }
//   };

//   return (
//     <div>
//    <form onSubmit={handleFileUpload}>
//    <img src={selectedFile || "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"} width={"200px"} height={"200px"} alt="" />
//     <label htmlFor="file-input4">
                 
//       <input type="file" id="file-input4"  accept="image/*" multiple  onChange={handleFileChange} />
//                 </label>
//       <button type='submit'>Upload File</button>
//    </form>
//     </div>
//   );
// };

// export default Chatbot;


// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useState } from 'react';
// import * as Yup from 'yup';

// const Chatbot = () => {
//   const [previewUrl, setPreviewUrl] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       chatImage: '',
//     },
//     // validationSchema: Yup.object({
//     //   chatImage: Yup.mixed().required('Please select an image file')
//     // }),
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append('chatImage', formData);

//         const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData);

//         if (response) {
//           console.log('File uploaded successfully:', response);
//         } else {
//           console.error('File upload failed:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error.message);
//       }
//     },
//   });


//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     formik.setFieldTouched("chatImage", file);
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//         // console.log(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl("/icons-images/avtar.svg");
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <img src={previewUrl || "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"} width={"200px"} height={"200px"} alt="" />
//         <label htmlFor="file-input4">
//           <input
//             type="file"
//             id="file-input4"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//           />
//         </label>
//         {formik.errors.chatImage && formik.touched.chatImage && <div>{formik.errors.chatImage}</div>}
//         <button type="submit">Upload File</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;





// *************************************** THIS WORKING CODE PROPER ****************************************

// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useState } from 'react';
// import * as Yup from 'yup';

// const Chatbot = () => {
//   const [previewUrl, setPreviewUrl] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       chatImage: null, // Initialize with null
//     },
//     // validationSchema: Yup.object({
//     //   chatImage: Yup.mixed().required('Please select an image file').test('fileFormat', 'Invalid file format', (value) => value && value.type.startsWith('image/')),
//     // }),
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append('chatImage', values.chatImage);

//         const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData);

//         if (response) {
//           console.log('File uploaded successfully:', response);
//         } else {
//           console.error('File upload failed:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error.message);
//       }
//     },
//   });

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     // Update the formik values
//     formik.setFieldValue("chatImage", file);

//     // Set the "touched" status of the field
//     formik.setFieldTouched("chatImage", true);

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl("/icons-images/avtar.svg");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <img src={previewUrl || "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"} width={"200px"} height={"200px"} alt="" />
//         <label htmlFor="file-input4">
//           <input
//             type="file"
//             id="file-input4"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//           />
//         </label>
//         {formik.errors.chatImage && formik.touched.chatImage && <div>{formik.errors.chatImage}</div>}
//         <button type="submit">Upload File</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;































// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useState } from 'react';
// import * as Yup from 'yup';
// import FileViewer from 'react-file-viewer';

// const Chatbot = () => {
//   const [previewFile, setPreviewFile] = useState(null);
//   const [fileType, setFileType] = useState(null);
  
//   const formik = useFormik({
//     initialValues: {
//       chatImage: null,
//     },
//     validationSchema: Yup.object({
//       chatImage: Yup.mixed().required('Please select a file'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append('chatImage', values.chatImage);

//         const response = await axios.post('http://api.unilink360.com:3003/upload-chat-message', formData);

//         if (response) {
//           console.log('File uploaded successfully:', response);

//           // Assuming your server sends back the file type
//           setFileType(response.data.fileType);

//           // Set the file to preview
//           setPreviewFile(URL.createObjectURL(values.chatImage));
//         } else {
//           console.error('File upload failed:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error.message);
//       }
//     },
//   });

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     formik.setFieldValue("chatImage", file);
//     formik.setFieldTouched("chatImage", true);

//     // Clear previous preview
//     setPreviewFile(null);
//     setFileType(null);

//     if (file) {
//       // Determine file type and display accordingly
//       const fileType = getFileType(file.type);
//       setFileType(fileType);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewFile(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getFileType = (mimeType) => {
//     if (mimeType.startsWith('image/')) {
//       return 'image';
//     } else if (mimeType.startsWith('application/pdf')) {
//       return 'pdf';
//     } else if (mimeType.startsWith('video/')) {
//       return 'video';
//     } else if (mimeType.startsWith('application/msword') || mimeType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
//       return 'document';
//     }

//     // Default to 'unknown' or handle other types as needed
//     return 'unknown';
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         {previewFile && fileType === 'image' && (
//           <img src={previewFile} width="200px" height="200px" alt="Preview" />
//         )}

//         {previewFile && fileType === 'pdf' && (
//           <FileViewer
//             fileType={fileType}
//             filePath={previewFile}
//             onError={(e) => console.error('Error opening PDF:', e)}
//           />
//         )}

//         {previewFile && fileType === 'video' && (
//           <video width="200" height="200" controls>
//             <source src={previewFile} type={formik.values.chatImage.type} />
//             Your browser does not support the video tag.
//           </video>
//         )}

//         {previewFile && fileType === 'document' && (
//           <FileViewer
//             fileType={fileType}
//             filePath={previewFile}
//             onError={(e) => console.error('Error opening document:', e)}
//           />
//         )}

//         <label htmlFor="file-input4">
//           <input
//             type="file"
//             id="file-input4"
//             accept="image/*,application/pdf,video/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             multiple
//             onChange={handleFileChange}
//           />
//         </label>

//         {formik.errors.chatImage && formik.touched.chatImage && <div>{formik.errors.chatImage}</div>}
//         <button type="submit">Upload File</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;

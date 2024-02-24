
import React, { useRef } from "react";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
import Modal from "../../../components/commonUI/Modal";
import FileModal from "./FileModal";


const FileViewModal = ({
    isOpenM,
  setIsOpen,
  title,

  viewImage,
  formik
}) => {
  const windowSize = useWindowSize();

  let left = windowSize > 768 ? "calc(50% - 400px)" : "2.5%";
  let width = windowSize > 768 ? "800px" : "95%";
  const handleClose = () => {
    setIsOpen(false);
  };

  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
      setIsOpen(false);
    }
  };

  return (
    <FileModal
      isOpenM={isOpenM}
      onRequestClose={handleClose}
      style={{
        width,
        top: "10vh",
        background: "white",
        left,
        padding: "1rem",
      }}
      ref={modalRef}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="top" onClick={handleOutsideClick}>
        <div className="heading">
          <h3>{title || "Preview Image"}</h3>
        </div>
      </div>
   <>
   <form className="chat-boxs w-100" onSubmit={formik.handleSubmit}>
            <div className="chatinputwidth">
              {true && (
                <div class="search">
                  {viewImage ? (
                    <>
                      {/* <i
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
                        // onClick={() => toggleDivShow("1")}
                      ></i> */}
                      <img src={viewImage} width={"300px"} height={"100px"} />
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


    </FileModal>
  );
};

export default FileViewModal;

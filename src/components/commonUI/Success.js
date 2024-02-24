import React, { useRef } from "react";
import "../../styles/UI.css";

const Success = ({
  isOpen,
  onClose,
  message,
  descMessage,
  closePreviousModal,
}) => {
  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
      closePreviousModal();
    }
  };

  return isOpen ? (
    <div className="Modalwrapper" onClick={handleOutsideClick}>
      <div className="modalBox" ref={modalRef}>
        <img
          src={`${process.env.PUBLIC_URL}/icons-images/successicon.svg`}
          alt="confirm icon"
          width="50px"
        />
        <h2>{message}</h2>
        <p>{descMessage}</p>
        <div className="btns">
          <button
            className="ok"
            onClick={() => {
              onClose();
              closePreviousModal();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Success;

import React, { useRef } from "react";
import "../../styles/UI.css";

const Confirm = ({
  isOpen,
  onClose,
  message,
  messageDesc,
  handleConfirm,
  buttonTitle,
}) => {
  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="Modalwrapper" onClick={handleOutsideClick}>
      <div className="modalBox" ref={modalRef}>
        <img
          src={`${process.env.PUBLIC_URL}/icons-images/confirmicon.svg`}
          alt="confirm icon"
          width="50px"
        />
        <h2>{message || "Are you sure?"}</h2>
        <p>{messageDesc || "Do you really want to delete this record?"}</p>
        <div className="btns">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleConfirm();
              onClose();
            }}
            className="delete"
          >
            {buttonTitle || "Okay"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Confirm;

import React, { useRef } from "react";
import "../../styles/UI.css";

const Delete = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="Modalwrapper" onClick={handleOutsideClick}>
      <div className="modalBoxSmall">
        <p>
          If you leave this group,you ll no longer be able to see its member
          list or chat history.Continue?
        </p>
        <div className="btns">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button onClick={onClose} className="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Delete;

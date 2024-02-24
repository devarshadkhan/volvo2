import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/UI.css";

const Modal = ({ children, isOpen, setIsOpen, style, onClose }) => {
  const overlayRef = useRef(null);

  const handleCloseOverlay = () => {
    setIsOpen(false);
  };

  // Attach mousedown event listener to the document to check for clicks outside the overlay
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (overlayRef.current && !overlayRef.current.contains(event.target)) {
  //       handleCloseOverlay();
  //       onClose()
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="overlayBG">
          <div className="overlay" ref={overlayRef} style={style}>
            <button className="close" onClick={handleCloseOverlay}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            {children}
          </div>
        </div>,
        document.getElementById("overlay")
      )
    : null;
};

export default Modal;

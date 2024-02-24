

import React, { useRef } from "react";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
import Modal from "../../../components/commonUI/Modal";
import ViewDetailForm from "./ViewDetailForm";

const ViewDetail = ({
  isOpen,
  setIsOpen,
  title,
  disabled,
  type,
  setAnalData,
  analysisId,
  onAdd,
  initialData,
  selectedUserId
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
    <Modal
      isOpen={isOpen}
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
          <h3>{title || "View Profile"}</h3>
        </div>
      </div>

      <ViewDetailForm selectedUserId={selectedUserId}/>
    </Modal>
  );
};

export default ViewDetail;

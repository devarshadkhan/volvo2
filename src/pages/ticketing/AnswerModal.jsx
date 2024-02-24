import React from "react";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import Modal from "../../components/commonUI/Modal";
import ShowAnswer from "./ShowAnswer";

const AnswerModal = ({ isOpen, setIsOpen, title, disabled, type }) => {
  const windowSize = useWindowSize();

  let left = windowSize > 768 ? "calc(50% - 400px)" : "2.5%";
  let width = windowSize > 768 ? "800px" : "95%";
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={{
        width,
        top: "10vh",
        maxHeight: "auto",
        height: "650px",
        background: "white",
        left,
        padding: "1rem",
        overflow: "auto",
      }}
    >
      <div className="top">
        <div className="heading">
          <h3><span>{title || "User Form"}</span></h3>
        </div>
      </div>

      <ShowAnswer
        type={type}
        disable={disabled}
        onClose={() => setIsOpen(false)}
      />
    </Modal>
  );
};

export default AnswerModal;

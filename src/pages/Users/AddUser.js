import React from "react";
import AddUserForm from "./AddUserForm";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import Modal from "../../components/commonUI/Modal";

const AddUser = ({ isOpen, setIsOpen, title, disabled, type }) => {
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
        // maxHeight: "550px",
        background: "white",
        left,
        padding: "1rem",
        // overflow: "auto",
      }}
    >
      <div className="top">
        <div className="heading">
          <h3>{title || "User Form"}</h3>
        </div>
      </div>

      <AddUserForm
        type={type}
        disable={disabled}
        onClose={() => setIsOpen(false)}
      />
    </Modal>
  );
};

export default AddUser;

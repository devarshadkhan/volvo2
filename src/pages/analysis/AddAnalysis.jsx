// import React, { useRef } from "react";
// import useWindowSize from "../../utils/Hooks/useWindowSize";
// import Modal from "../../components/commonUI/Modal";
// import AddAnalysisForm from "./AddAnalysisForm";

// const AddAnalysis = ({
//   isOpen,
//   setIsOpen,
//   title,
//   disabled,
//   type,
//   setAnalData,
//   analysisId,
//   onAdd,
//   initialData,
// }) => {
//   const windowSize = useWindowSize();

//   let left = windowSize > 768 ? "calc(50% - 400px)" : "2.5%";
//   let width = windowSize > 768 ? "800px" : "95%";
//   const handleClose = () => {
//     setIsOpen(false);
//   };
//   const modalRef = useRef();

//   const handleOutsideClick = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) {
//       handleClose();
//     }
//   };
//   return (
//     <>
//       <div onClick={handleOutsideClick}>
//         <Modal
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           // onRequestClose={handleClose}
//           onHide={handleClose}
//           style={{
//             width,
//             top: "10vh",
//             // maxHeight: "550px",
//             background: "white",
//             left,
//             padding: "1rem",
//             // overflow: "auto",
//           }}
//           ref={modalRef}
//         >
//           <div className="top">
//             <div className="heading">
//               <h3>{title || "Add Analytics"}</h3>
//             </div>
//           </div>

//           <AddAnalysisForm
//             type={type}
//             disable={disabled}
//             onClose={() => setIsOpen(false)}
//             setAnalData={setAnalData}
//             analysisId={analysisId}
//             onAdd={onAdd}
//             initialData={initialData}
//           />
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default AddAnalysis;

import React, { useRef } from "react";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import Modal from "../../components/commonUI/Modal";
import AddAnalysisForm from "./AddAnalysisForm";

const AddAnalysis = ({
  isOpen,
  setIsOpen,
  title,
  disabled,
  type,
  setAnalData,
  analysisId,
  onAdd,
  initialData,
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
          <h3>{title || "Add Analytics"}</h3>
        </div>
      </div>

      <AddAnalysisForm
        type={type}
        disable={disabled}
        onClose={() => setIsOpen(false)}
        setAnalData={setAnalData}
        analysisId={analysisId}
        onAdd={onAdd}
        initialData={initialData}
      />
    </Modal>
  );
};

export default AddAnalysis;

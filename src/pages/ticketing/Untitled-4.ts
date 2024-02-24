import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Success from "../../components/commonUI/Success";
import { getRole, showError } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { replySchema } from "../../utils/schema";
import { answerTicketAction } from "../../redux/slice/tickets/answerTaskSlice";
import TextEditor from "./TextEditor";
import Select from "react-select";

const ShowAnswer = ({ onClose, disable, type }) => {
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);

  const isDisabled = type === "view" || type === "update" || type === "reply";

  const initialValues = {
    ticketId: "",
    taskAnswer: "",
  };
  const [userValues, setUserValues] = useState(initialValues);

  const dispatch = useDispatch();
  const userById = useSelector((state) => state.ticketsById);
  const answerTicket = useSelector((state) => state.answerTicket);

  useEffect(() => {
    if (answerTicket.success && routeFlag) {
      onClose();
    }
  }, [answerTicket.success, routeFlag]);

  useEffect(() => {
    if (userById.success) {
      if (type === "add") {
        setUserValues(initialValues);
      } else {
        setUserValues({
          ...userById.user,
          teamId: {
            value: userById.user?.teamId,
            label: userById.user?.teamName,
          },
          managerId: {
            value: userById.user?.managerId,
            label: userById.user?.managerName,
          },
          tlId: {
            value: userById.user?.tlId,
            label: userById.user?.tlName,
          },
        });
      }
    }
  }, [userById.success]);

  useEffect(() => {
    if (answerTicket.success && routeFlag) {
      setSuccess(true);
    }
  }, [answerTicket.success, routeFlag]);

  const { handleChange, handleBlur,setFieldValue,setFieldTouched, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: userValues,
      validationSchema: replySchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);
        let answerType = "";
        const role = getRole();
        if (role === "ROLE_MANAGER") {
          answerType = "manager";
        } else if (role === "ROLE_TEAM LEAD") {
          answerType = "team Lead";
        } else if (role === "ROLE_ASSOCIATE") {
          answerType = "associate";
        }
        dispatch(
          answerTicketAction({taskAnswer: values.taskAnswer,ticketId: values.ticketNo,answerType})
        );
        setRouteFlag(true);
      },
    });

  const canAnswer = ["ROLE_MANAGER", "ROLE_TEAM LEAD", "ROLE_ASSOCIATE"].includes(
    getRole()
  );

  const renderRole = (role, value) => {
    const roleStyle = {
      fontWeight: "bold",
    };

    return value ? (
      <span>
        {role && `${role} - `}
        <strong style={roleStyle}>{value}</strong>
      </span>
    ) : null;
  };
  const status = ["Pending", "Open", "Close"];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mar-20 scroll">
          {/* taskQuestion lname */}
          <div className="Add-form-group">
            <div className="row">
              <div className=" col-md-12 mb-1 ">
                <label>Question <span>*</span><font> Ticket Number: <strong>{values?.ticketNo}</strong></font></label>
                <textarea type="text" className="input-control textAreahight"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and type setting industry." name="taskQuestion"
                  value={values?.taskQuestion} disabled={true} >
                </textarea>
              </div>
              <div className=" col-md-6 mb-2 ">
                <label> Team<span>*</span></label>
                 <Select name="teamId" isDisabled={true} value={{value: values?.teamName || "",label:values?.teamName || "Select Team"}} placeholder={"Select a Team"}/>
              </div>

              <div className=" col-md-6 mb-2 ">
                <label> Manager<span>*</span></label>
                 <Select name="managerId" isDisabled={true} value={{value: values?.managerName || "",label:values?.managerName || "Select Manager"}} placeholder={"Select a Manager"}/>
              </div>

             
              <div className=" col-md-6 mb-2 ">
                <label> Team Lead<span>*</span></label>
                 <Select name="teamLeadId" isDisabled={true} value={{value: values?.tlName || "",label:values?.tlName || "Select Team Lead"}} placeholder={"Select a Team Lead"}/>
              </div>

              <div className=" col-md-6 mb-2 ">
                <label> Agent<span>*</span></label>
                 <Select name="agentId" isDisabled={true} value={{value: values?.agentName || "",label:values?.agentName || "Select Agent Name"}} placeholder={"Select Agent Name"}/>
              </div>


              <div className=" col-md-12 mt-3 ">
                <div className="popupText">
                  Status: <button class={`btn-md-popup ${values?.status === '0'?"yellowbg":values?.status === '1' ? "green-bg" : "red-bg"}`} type="button"> {status[Number(values?.status)]}</button>
                </div>
              </div>
           
            
              <div className=" col-md-12 mt-4 ">
                <div className="popupText">Comments:  </div>
              </div>
                {userById.user?.answer?.length === 0 ? (
                    <div className=" col-md-12 mt-2 ">
                  </div>
                ):( userById.user?.answer?.map((a, i) => {
                  return (
                    <div className=" col-md-12 mt-2 ">
                    </div>
                 );
                })
              )}
              <div className=" col-md-12 mt-2 ">
                <div className="">
                  <TextEditor
                  name="taskAnswer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taskAnswer}
                  setFieldValue={setFieldValue}
                  />
                </div>
              </div>
               

            </div>
          </div>
          {/* submit */}
          <div className="form-group aling-center-btn">
            {/* <button
              type="button"
              className="btn btn-outline-primary big-btn-padd"
              onClick={onClose}
            >
              Close
            </button> */}
            {/* <button type="submit" class="btn btn-primary-big big-btn-padd"> Send </button> */}
            {!disable && canAnswer && (<button type="submit" className="btn btn-primary-big big-btn-padd">
                Reply
              </button>
            )}
          </div>
        </div>
      </form>
      <Success
        isOpen={success}
        onClose={() => setSuccess(false)}
        message={
          type === "profile"
            ? "Profile updated successfully!"
            : "Added Successfully"
        }
        descMessage={"Your informations has been updated successfully!"}
        closePreviousModal={onClose}
      />
    </>
  );
};
export default ShowAnswer;

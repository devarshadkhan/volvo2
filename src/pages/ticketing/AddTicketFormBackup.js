import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Success from "../../components/commonUI/Success";
import {
  canAssign,
  getId,
  getRole,
  showError,
  showTicketFields,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addTicketAction } from "../../redux/slice/tickets/addTicketSlice";
import { addTicketSchema } from "../../utils/schema";
import Select from "react-select";
import { getAllTLAction } from "../../redux/slice/forForms/getAllTLSlice";
import { getAllTeamsAction } from "../../redux/slice/forForms/getAllTeamsFormSlice";
import { getAllManagersAction } from "../../redux/slice/forForms/getAllManagersSlice";
import { updateTicketAction } from "../../redux/slice/tickets/updateTicketSlice";
import { answerTicketAction } from "../../redux/slice/tickets/answerTaskSlice";
import { getAllAgentsAction } from "../../redux/slice/forForms/getAllAgentsSlice";

const AddUserForm = ({ onClose, disable, type }) => {
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);
  const isDisabled = type === "view" || type === "update";
  const { teamIdVal, managerIdVal, associateIdVal } = showTicketFields();
  const { agentCan, teamCan, managerCan, tlCan } = canAssign();
  
  const initialValues = {
    taskQuestion: "",
    teamId: "",
    managerId: "" || getId("ROLE_MANAGER"),
    tlId: "" || getId("ROLE_TEAM LEAD"),
    agentId: "" || getId("ROLE_AGENT"),
    status: type === "add" ? "0" : "",
    roleType: "",
  };
  const [userValues, setUserValues] = useState(initialValues);

  const dispatch = useDispatch();
  const addUser = useSelector((state) => state.addTicket);
  const userById = useSelector((state) => state.ticketsById);
  const updateProfile = useSelector((state) => state.updateProfile);
  const updateUser = useSelector((state) => state.updateTicket);
  const allTeams = useSelector((state) => state.allTeams);
  const allManagers = useSelector((state) => state.allManagers);
  const TLs = useSelector((state) => state.TLs);
  const allAgents = useSelector((state) => state.allAgents);

  useEffect(() => {
    if (userById.success) {
      if (type === "add") {
        setUserValues(initialValues);
      } else {
        setUserValues({
          ...userById.user,
          teamId: userById.user?.teamId,
          managerId: userById.user?.managerId,
          tlId: userById.user?.tlId,
          agentId: userById.user.agentId,
        });
      }
    }
  }, [userById.success, getId]);

  useEffect(() => {
    if (addUser.success && routeFlag) {
      setSuccess(true);
    }
  }, [addUser.success]);

  useEffect(() => {
    if (updateProfile.success && routeFlag) {
      setSuccess(true);
    }
  }, [updateProfile.success]);

  useEffect(() => {
    if (updateUser.success && routeFlag) {
      setSuccess(true);
    }
  }, [updateUser.success]);

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: userValues,
    validationSchema: addTicketSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Loop through the values object and append each key-value pair to the FormData
      const newValues = {
        ...values,
        teamId: values.teamId || "",
        managerId: values.managerId || "",
        agentId: values.agentId || "",
        tlId: values.tlId || "",
        status: values.status,
      };
      if (type === "add") {
        dispatch(addTicketAction(newValues));
      } else if (type === "update") {
        dispatch(updateTicketAction({ id: values.ticketNo, data: newValues }));
      } else if (type === "answer") {
        dispatch(answerTicketAction(newValues));
      }
      setRouteFlag(true);
    },
  });


  useEffect(() => {
    dispatch(getAllTeamsAction());

    if (values.teamId) {
      dispatch(getAllManagersAction(values.teamId));
    }

    if (values.managerId) {
      dispatch(
        getAllTLAction({
          teamId: values.teamId,
          managerId: values.managerId,
        })
      );
    }
    if (values.tlId) {
      dispatch(
        getAllAgentsAction({
          teamId: values.teamId,
          managerId: values.managerId,
          tlId: values.tlId,
        })
      );
    }
  }, [values.teamId, values.managerId, values.tlId]);

  const style = {
    control: (provided) => ({
      ...provided,
      height: "44px",
    }),
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mar-20 scroll">
          {/* taskQuestion lname */}
          <div className="Add-form-group">
            <div className="row">
              <div className=" col-md-12 mb-2 ">
                <label>
                  Question<span>*</span>{" "}
                  {type === "update" && (
                  <font>
                    Ticket Number: <strong>{values?.ticketNo}</strong>
                  </font>
                  )}
                </label>
                <textarea
                  type="text"
                  className="input-control textAreahight"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and type setting industry. "
                  name="taskQuestion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.taskQuestion}
                  disabled={isDisabled}
                ></textarea>
                {showError(errors.taskQuestion, touched.taskQuestion)}
              </div>
              {/* Team */}
                <div className=" col-md-6 mb-2">
                  <label>
                    Team<span>*</span>
                  </label>
                  <Select
                    name="teamId"
                    onChange={(selectedOptions) => {
                      setFieldValue("teamId", selectedOptions.value);
                      if(getRole() == 'ROLE_ASSOCIATE'){
                        setFieldValue("managerId","");
                        setFieldValue("tlId","");
                        setFieldValue("agentId","");
                      }else if(getRole() == 'ROLE_TEAM LEAD'){
                        setFieldValue("managerId","");
                        setFieldValue("agentId","");
                      }else if(getRole() == 'ROLE_MANAGER'){
                        setFieldValue("tlId","");
                      }else if(getRole() == 'ROLE_ADMIN' || getRole() == 'ROLE_SUPPORT' || getRole() == 'ROLE_USER' || getRole() == 'ROLE_QA'){
                        setFieldValue("managerId","");
                      }
                    }}
                    options={allTeams.teams?.map((s) => ({
                      label: s.teamName,
                      value: s.id,
                    }))}
                    value={{
                      value: values.teamId || "",
                      label:
                        allTeams.teams?.find((t) => t.id === values.teamId)
                          ?.teamName || "Select Team",
                    }}
                    styles={style}
                    placeholder={"Select a Team"}
                  />
                  {showError(errors.teamId, touched.teamId)}
                </div>

              {/* Manager */}
              {managerIdVal && (
                <div className=" col-md-6 mb-2">
                  <label>
                    Manager<span>*</span>
                  </label>
                  <Select
                    name="managerId"
                    onChange={(selectedOptions) => {
                      setFieldValue("managerId", selectedOptions.value);
                      if(getRole() == 'ROLE_ASSOCIATE'){
                        setFieldValue("tlId","");
                        setFieldValue("agentId","");
                      }else if(getRole() == 'ROLE_TEAM LEAD'){
                        setFieldValue("agentId","");
                      }
                    }}
                    options={allManagers.managers?.map((s) => ({
                      label: s.managerName,
                      value: s.id,
                    }))}
                    value={{
                      value: values.managerId || "",
                      label:
                        allManagers.managers?.find(
                          (m) => m.id == values.managerId
                        )?.managerName || "Select Manager",
                    }}
                    styles={style}
                    placeholder={"Select a manager"}
                  />
                  {showError(errors.managerId, touched.managerId)}
                </div>
              )}

              {/* TeamLead */}
              {teamIdVal && (
                <div className=" col-md-6 mb-2">
                  <label>
                    Team Lead<span>*</span>
                  </label>
                  <Select
                    name="tlId"
                    isDisabled={tlCan && type === "update"}
                    onChange={(selectedOptions) => {
                      setFieldValue("tlId", selectedOptions.value);
                      if(getRole() == 'ROLE_ASSOCIATE'){
                      setFieldValue("agentId","");
                      }
                    }}
                    options={TLs.TLs?.map((s) => ({
                      label: s.tlName,
                      value: s.id,
                    }))}
                    value={{
                      value: values.tlId || "",
                      label:
                        TLs.TLs?.find((tl) => tl.id === values.tlId)?.tlName ||
                        "Select team lead",
                    }}
                    styles={style}
                    placeholder={"Select a team lead"}
                  />
                  {showError(errors.tlId, touched.tlId)}
                </div>
              )}

              {/* Agent */}
              {associateIdVal && (
                <div className=" col-md-6 mb-2">
                  <label>
                    Agent {getRole() !== "ROLE_AGENT" && <span>*</span>}
                  </label>
                  <Select
                    name="agentId"
                    isDisabled={agentCan && type === "update"}
                    onChange={(selectedOptions) => {
                      setFieldValue("agentId", selectedOptions.value);
                    }}
                    options={allAgents.agents?.map((s) => ({
                      label: s.agentName,
                      value: s.id,
                    }))}
                    value={{
                      value: values.agentId || "",
                      label:
                        allAgents.agents?.find((a) => a.id === values.agentId)
                          ?.agentName || "Select Agent",
                    }}
                    styles={style}
                    placeholder={"Select a manager"}
                  />
                  {showError(errors.agentId, touched.agentId)}
                </div>
              )}
            </div>
          </div>
          <div className="form-group aling-right">
            <button
              type="button"
              className="btn btn-outline-primary big-btn-padd"
              onClick={onClose}
            >
              Cancel
            </button>
            {!disable && type === 'update' &&(
              <button type="submit" className="btn btn-primary-big big-btn-padd"> Update Ticket </button>
            )}
            {!disable && type === 'add' &&(
              <button type="submit" className="btn btn-primary-big big-btn-padd"> Create Ticket </button>
            )}
          </div>
        </div>
      </form>
      <Success
        isOpen={success}
        onClose={() => setSuccess(false)}
        message={
          type === "update" ? "Updated successfully!" : "Added Successfully"
        }
        descMessage={`Your informations has been ${
          type === "add" ? "added" : "updated"
        } successfully!`}
        closePreviousModal={onClose}
      />
    </>
  );
};
export default AddUserForm;



























// comment code but is proper working
// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import Success from "../../components/commonUI/Success";
// import {
//   canAssign,
//   getId,
//   getRole,
//   showError,
//   showTicketFields,
// } from "../../utils/utils";
// import { useDispatch, useSelector } from "react-redux";
// import { addTicketAction } from "../../redux/slice/tickets/addTicketSlice";
// import { addTicketSchema } from "../../utils/schema";
// import Select from "react-select";
// import { getAllTLAction } from "../../redux/slice/forForms/getAllTLSlice";
// import { getAllTeamsAction } from "../../redux/slice/forForms/getAllTeamsFormSlice";
// import { getAllManagersAction } from "../../redux/slice/forForms/getAllManagersSlice";
// import { updateTicketAction } from "../../redux/slice/tickets/updateTicketSlice";
// import { answerTicketAction } from "../../redux/slice/tickets/answerTaskSlice";
// import { getAllAgentsAction } from "../../redux/slice/forForms/getAllAgentsSlice";

// const AddUserForm = ({ onClose, disable, type }) => {
//   const [success, setSuccess] = useState(false);
//   const [routeFlag, setRouteFlag] = useState(false);
//   const isDisabled = type === "view" || type === "update";
//   //   const { teamIdVal, managerIdVal, associateIdVal } = showTicketFields();
//   const { agentCan, teamCan, managerCan, tlCan } = canAssign();

//   const initialValues = {
//     taskQuestion: "",
//     teamId: "",
//     managerId: "",
//     tlId: "",
//     agentId: "" || getId("ROLE_AGENT"),
//     status: type === "add" ? "0" : "",
//     roleType: "",
//   };
//   const [userValues, setUserValues] = useState(initialValues);

//   const dispatch = useDispatch();
//   const addUser = useSelector((state) => state.addTicket);
//   const userById = useSelector((state) => state.ticketsById);
//   const updateProfile = useSelector((state) => state.updateProfile);
//   const updateUser = useSelector((state) => state.updateTicket);
//   const allTeams = useSelector((state) => state.allTeams);
//   const allManagers = useSelector((state) => state.allManagers);
//   const TLs = useSelector((state) => state.TLs);
//   const allAgents = useSelector((state) => state.allAgents);
//   const userByToken = useSelector((state) => state.userByToken);

//   useEffect(() => {
//     if (userById.success) {
//       if (type === "add") {
//         setUserValues(initialValues);
//       } else {
//         setUserValues({
//           ...userById.user,
//           teamId: userById.user?.teamId,
//           managerId: userById.user?.managerId,
//           tlId: userById.user?.tlId,
//           agentId: userById.user.agentId,
//         });
//       }
//     }
//   }, [userById.success, getId]);

//   useEffect(() => {
//     if (addUser.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [addUser.success]);

//   useEffect(() => {
//     if (updateProfile.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [updateProfile.success]);

//   useEffect(() => {
//     if (updateUser.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [updateUser.success]);

//   const {handleChange,handleBlur,values,errors,touched,handleSubmit,setFieldValue,
//   } = useFormik({
//     initialValues: userValues,
//     validationSchema: addTicketSchema,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       const newValues = {
//         ...values,
//         teamId: values.teamId || "",
//         managerId: values.managerId || "",
//         agentId: values.agentId || "",
//         tlId: values.tlId || "",
//         status: values.status,
//       };
//       if (type === "add") {
//         dispatch(addTicketAction(newValues));
//       } else if (type === "update") {
//         dispatch(updateTicketAction({ id: values.ticketNo, data: newValues }));
//       } else if (type === "answer") {
//         dispatch(answerTicketAction(newValues));
//       }
//       setRouteFlag(true);
//     },
//   });

//   useEffect(() => {
//     dispatch(getAllTeamsAction());

//     if (getRole() === "ROLE_ASSOCIATE") {
//       if (userByToken.user.teamId.length === 1) {
//         const userTeamId = userByToken.user.teamId[0]; // Assuming an associate is assigned to only one team
//         const userTealId = userByToken.user.tlId;
//         const userManagerId = userByToken.user.managerId;
//         setFieldValue("teamId", userTeamId);
//         setFieldValue("tlId", userTealId);
//         setFieldValue("managerId", userManagerId);
//       }
//     }

//     if (getRole() === "ROLE_TEAM LEAD") {
//       if (userByToken.user.teamId.length === 1) {
//         const userTeamId = userByToken.user.teamId[0];
//         const userManagerId = userByToken.user.managerId;
//         setFieldValue("teamId", userTeamId);
//         setFieldValue("managerId", userManagerId);
//       }
//     }

//     if (getRole() === "ROLE_MANAGER") {
//       if (userByToken.user.teamId.length >= 1) {
//         const userTeamId = userByToken.user.teamId[0];
//         const userManagerId = getId("ROLE_MANAGER");
//         if (values.teamId) {
//           setFieldValue("teamId", values.teamId);
//         } else {
//           setFieldValue("teamId", userTeamId);
//         }
//         setFieldValue("managerId", userManagerId);
//       }
//     }

//     if (values.teamId) {
//       dispatch(getAllManagersAction(values.teamId));
//     }

//     if (values.managerId) {
//       dispatch(
//         getAllTLAction({
//           teamId: values.teamId,
//           managerId: values.managerId,
//         })
//       );
//     }
//     if (values.tlId) {
//       dispatch(
//         getAllAgentsAction({
//           teamId: values.teamId,
//           managerId: values.managerId,
//           tlId: values.tlId,
//         })
//       );
//     }
//   }, [values.teamId, values.managerId, values.tlId]);

//   const style = {
//     control: (provided) => ({
//       ...provided,
//       height: "44px",
//     }),
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="mar-20 scroll">
//           {/* taskQuestion lname */}
//           <div className="Add-form-group">
//             <div className="row">
//               <div className=" col-md-12 mb-2 ">
//                 <label>
//                   Question<span>*</span>{" "}
//                   {type === "update" && (
//                     <font>
//                       Ticket Number: <strong>{values?.ticketNo}</strong>
//                     </font>
//                   )}
//                 </label>
//                 <textarea
//                   type="text"
//                   className="input-control textAreahight"
//                   placeholder="Enter question here.."
//                   name="taskQuestion"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values?.taskQuestion}
//                   disabled={isDisabled}
//                 ></textarea>
//                 {showError(errors.taskQuestion, touched.taskQuestion)}
//               </div>
//               {/* Team */}
//               <div className=" col-md-6 mb-2">
//                 <label>
//                   Team<span>*</span>
//                 </label>
//                 <Select
//                   name="teamId"
//                   isDisabled={
//                     getRole() === "ROLE_ASSOCIATE" ||
//                     getRole() === "ROLE_TEAM LEAD"
//                   }
//                   onChange={(selectedOptions) => {
//                     setFieldValue("teamId", selectedOptions.value);
//                     if (getRole() == "ROLE_ASSOCIATE") {
//                       setFieldValue("managerId", "");
//                       setFieldValue("tlId", "");
//                       setFieldValue("agentId", "");
//                     } else if (getRole() == "ROLE_TEAM LEAD") {
//                       setFieldValue("managerId", "");
//                       setFieldValue("agentId", "");
//                       setFieldValue("tlId", "");
//                     } else if (getRole() == "ROLE_MANAGER") {
//                       setFieldValue("tlId", "");
//                       setFieldValue("agentId", "");
//                     } else if (
//                       getRole() == "ROLE_ADMIN" ||
//                       getRole() == "ROLE_SUPPORT" ||
//                       getRole() == "ROLE_USER" ||
//                       getRole() == "ROLE_QA"
//                     ) {
//                       setFieldValue("managerId", "");
//                       setFieldValue("agentId", "");
//                       setFieldValue("tlId", "");
//                     }
//                   }}
//                   options={
//                     userByToken.user.teamId.length > 0
//                       ? allTeams.teams
//                           ?.filter((team) =>
//                             userByToken.user.teamId.includes(team.id)
//                           ) // Filter teams based on userByToken.user.teamId
//                           .map((s) => ({
//                             label: s.teamName,
//                             value: s.id,
//                           }))
//                       : allTeams.teams?.map((s) => ({
//                           // Show all teams if userByToken.user.teamId has no values
//                           label: s.teamName,
//                           value: s.id,
//                         }))
//                   }
//                   value={{
//                     value: values.teamId || "",
//                     label:
//                       allTeams.teams?.find((t) => t.id === values.teamId)
//                         ?.teamName || "Select Team",
//                   }}
//                   styles={style}
//                   placeholder={"Select a Team"}
//                 />
//                 {showError(errors.teamId, touched.teamId)}
//               </div>

//               {/* Manager */}
//               <div className=" col-md-6 mb-2">
//                 <label>
//                   Manager<span>*</span>
//                 </label>
//                 <Select
//                   name="managerId"
//                   isDisabled={
//                     getRole() === "ROLE_ASSOCIATE" ||
//                     getRole() === "ROLE_TEAM LEAD" ||
//                     getRole() === "ROLE_MANAGER"
//                   }
//                   onChange={(selectedOptions) => {
//                     setFieldValue("managerId", selectedOptions.value);
//                     if (getRole() == "ROLE_ASSOCIATE") {
//                       setFieldValue("tlId", "");
//                       setFieldValue("agentId", "");
//                     } else if (getRole() == "ROLE_TEAM LEAD") {
//                       setFieldValue("agentId", "");
//                       setFieldValue("tlId", "");
//                     } else if (
//                       getRole() == "ROLE_ADMIN" ||
//                       getRole() == "ROLE_SUPPORT" ||
//                       getRole() == "ROLE_USER" ||
//                       getRole() == "ROLE_QA"
//                     ) {
//                       setFieldValue("tlId", "");
//                       setFieldValue("agentId", "");
//                     } else if (getRole() == "ROLE_MANAGER") {
//                       setFieldValue("tlId", "");
//                     }
//                   }}
//                   options={allManagers.managers?.map((s) => ({
//                     label: s.managerName,
//                     value: s.id,
//                   }))}
//                   value={{
//                     value: values.managerId || "",
//                     label:
//                       allManagers.managers?.find(
//                         (m) => m.id == values.managerId
//                       )?.managerName || "Select Manager",
//                   }}
//                   styles={style}
//                   placeholder={"Select a manager"}
//                 />
//                 {showError(errors.managerId, touched.managerId)}
//               </div>

//               {/* TeamLead */}
//               <div className=" col-md-6 mb-2">
//                 <label>
//                   Team lead
//                   {getRole() === "ROLE_ASSOCIATE" && <span>*</span>}
//                   {getRole() === "ROLE_MANAGER" && <span>*</span>}
//                   {getRole() === "ROLE_TEAM LEAD" && <span>*</span>}
//                 </label>
//                 <Select
//                   name="tlId"
//                   isDisabled={getRole() === "ROLE_ASSOCIATE"}
//                   onChange={(selectedOptions) => {
//                     setFieldValue("tlId", selectedOptions.value);
//                     if (getRole() === "ROLE_ASSOCIATE") {
//                       setFieldValue("agentId", "");
//                     } else if (
//                       getRole() == "ROLE_ADMIN" ||
//                       getRole() == "ROLE_SUPPORT" ||
//                       getRole() == "ROLE_USER" ||
//                       getRole() == "ROLE_QA"
//                     ) {
//                       setFieldValue("agentId", "");
//                     } else if (getRole() === "ROLE_TEAM LEAD") {
//                       setFieldValue("agentId", "");
//                     }
//                   }}
//                   options={TLs.TLs?.map((s) => ({
//                     label: s.tlName,
//                     value: s.id,
//                   }))}
//                   value={{
//                     value: values.tlId || "",
//                     label:
//                       TLs.TLs?.find((tl) => tl.id === values.tlId)?.tlName ||
//                       "Select Team Lead",
//                   }}
//                   styles={style}
//                   placeholder={"Select a team lead"}
//                 />
//                 {showError(errors.tlId, touched.tlId)}
//               </div>

//               {/* Agent */}
//               <div className=" col-md-6 mb-2">
//                 <label>
//                   {" "}
//                   Agent
//                   {getRole() === "ROLE_ASSOCIATE" && <span>*</span>}
//                   {getRole() === "ROLE_TEAM LEAD" && <span>*</span>}
//                 </label>
//                 <Select
//                   name="agentId"
//                   // isDisabled={agentCan && type === "update"}
//                   onChange={(selectedOptions) => {
//                     setFieldValue("agentId", selectedOptions.value);
//                   }}
//                   options={allAgents.agents?.map((s) => ({
//                     label: s.agentName,
//                     value: s.id,
//                   }))}
//                   value={{
//                     value: values.agentId || "",
//                     label:
//                       allAgents.agents?.find((a) => a.id === values.agentId)
//                         ?.agentName || "Select Agent",
//                   }}
//                   styles={style}
//                   placeholder={"Select a manager"}
//                 />
//                 {showError(errors.agentId, touched.agentId)}
//               </div>

//               {type === "update" && (
//               <div className=" col-md-12 mb-2 ">
//                 <label>
//                   {" "}
//                   Status<span>*</span>
//                 </label>
//                 <select 
//                   name="status"
//                   class="input-control"   
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values?.status}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="2">Close</option>
//                   <option value="1">Open</option>
//                   <option value="0">Pending</option>
//                 </select>
//               </div>
//               )}
//             </div>
//           </div>

//           <div className="form-group aling-right">
//             <button
//               type="button"
//               className="btn btn-outline-primary big-btn-padd"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             {!disable && type === "update" && (
//               <button
//                 type="submit"
//                 className="btn btn-primary-big big-btn-padd"
//               >
//                 {" "}
//                 Update Ticket{" "}
//               </button>
//             )}
//             {!disable && type === "add" && (
//               <button
//                 type="submit"
//                 className="btn btn-primary-big big-btn-padd"
//               >
//                 {" "}
//                 Create Ticket{" "}
//               </button>
//             )}
//           </div>
//         </div>
//       </form>
//       <Success
//         isOpen={success}
//         onClose={() => setSuccess(false)}
//         message={
//           type === "update" ? "Updated successfully!" : "Added Successfully"
//         }
//         descMessage={`Your informations has been ${
//           type === "add" ? "added" : "updated"
//         } successfully!`}
//         closePreviousModal={onClose}
//       />
//     </>
//   );
// };
// export default AddUserForm;


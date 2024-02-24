import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Success from "../../components/commonUI/Success";
import {
  canAssign,
  convertDateFormat,
  getId,
  getRole,
  reverseDateFormat,
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
import { getAnalysisByTypePurposeAPI } from "../../redux/slice/analysis/getAnalysisbyTypePurposeSlice";
import { getAnalysisByTypeResolutionAPI } from "../../redux/slice/analysis/getAnalysisbyTypeResolutionSlice";
import { hourData } from "../../utils/mockData";
import { getAnalysisType } from "../../redux/slice/analysis/analysisType";

const AddUserForm = ({ onClose, disable, type }) => {
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);
  const isDisabled = type === "view" || type === "update";
  //   const { teamIdVal, managerIdVal, associateIdVal } = showTicketFields();
  const { agentCan, teamCan, managerCan, tlCan } = canAssign();

  const initialValues = {
    taskQuestion: "",
    teamId: "",
    managerId: "",
    tlId: "",
    agentId: "" || getId("ROLE_AGENT"),
    status: type === "add" ? "0" : "",
    roleType: "",
    analysisType: "",
    analysisValue: "",
    noOfDay: "",
  };
  const [userValues, setUserValues] = useState(initialValues);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (dateInputRef.current) {
      const today = new Date().toISOString().split("T")[0];
      dateInputRef.current.min = today;
    }
  }, []);

  const dispatch = useDispatch();
  const addUser = useSelector((state) => state.addTicket);
  const userById = useSelector((state) => state.ticketsById);
  const updateProfile = useSelector((state) => state.updateProfile);
  const updateUser = useSelector((state) => state.updateTicket);
  const allTeams = useSelector((state) => state.allTeams);
  const allManagers = useSelector((state) => state.allManagers);
  const TLs = useSelector((state) => state.TLs);
  const allAgents = useSelector((state) => state.allAgents);
  const userByToken = useSelector((state) => state.userByToken);
  const getAnalyticsType = useSelector(
    (state) => state.analysisType.analysisData.data
  );
  console.log(getAnalyticsType);
  // Analysis state in write code Arshad Pathaan
  const getAnalysisByTypePurpose = useSelector(
    (state) =>
      state.getAnalysisByTypePurpose.getAnalysisByTypePurposeData
        .analysisPurpose
  );
  const getAnalysisByTypeResolution = useSelector(
    (state) =>
      state.getAnalysisByTypeResolution.getAnalysisByTypeResolutionData
        .analysisResolution
  );
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [resolutionOptions, setResolutionOptions] = useState([]);
  const [analyticsTypeOption, setAnalyticsTypeOption] = useState([]);
  useEffect(() => {
    dispatch(getAnalysisByTypePurposeAPI());
    dispatch(getAnalysisByTypeResolutionAPI());
    dispatch(getAnalysisType());
  }, []);

  useEffect(() => {
    setAnalyticsTypeOption(
      getAnalyticsType?.map((item) => {
        console.log(item);
        return {
          value: item?.name,
          label: item?.name,
        };
      })
    );
  }, [getAnalyticsType]);
  useEffect(() => {
    setPurposeOptions(
      getAnalysisByTypePurpose?.map((item) => {
        return {
          value: item?.name,
          label: item?.name,
        };
      })
    );
  }, [getAnalysisByTypePurpose]);

  useEffect(() => {
    setResolutionOptions(
      getAnalysisByTypeResolution?.map((item) => {
        return {
          value: item?.name,
          label: item?.name,
        };
      })
    );
  }, [getAnalysisByTypeResolution]);

  const [ghanta, setGhanta] = useState(hourData);

  useEffect(() => {
    setGhanta(
      ghanta.map((item) => {
        return {
          value: item?.name,
          label: item?.name,
        };
      })
    );
  }, []);

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
          analysisType: userById?.user?.analysisType,
          analysisValue: userById?.user?.analysisValue,
          noOfDay: userById.user.noOfDay,
        });
      }
    }
  }, [userById?.success]);

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
    resetForm,
  } = useFormik({
    initialValues: userValues,
    validationSchema: addTicketSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newValues = {
        ...values,
        teamId: values.teamId || "",
        managerId: values.managerId || "",
        agentId: values.agentId || "",
        tlId: values.tlId || "",
        status: values.status,
        analysisType: values.analysisType || "",
        analysisValue: values.analysisValue || "",
        noOfDay: values.noOfDay || "",
      };

      if (type === "add") {
        dispatch(addTicketAction(newValues));
        // resetForm();
        // onClose()
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

    if (getRole() === "ROLE_ASSOCIATE") {
      if (userByToken.user.teamId.length === 1) {
        const userTeamId = userByToken.user.teamId[0]; // Assuming an associate is assigned to only one team
        const userTealId = userByToken.user.tlId;
        const userManagerId = userByToken.user.managerId;
        setFieldValue("teamId", userTeamId);
        setFieldValue("tlId", userTealId);
        setFieldValue("managerId", userManagerId);
      }
    }

    if (getRole() === "ROLE_TEAM LEAD") {
      if (userByToken.user.teamId.length === 1) {
        const userTeamId = userByToken.user.teamId[0];
        const userManagerId = userByToken.user.managerId;
        setFieldValue("teamId", userTeamId);
        setFieldValue("managerId", userManagerId);
      }
    }

    if (getRole() === "ROLE_MANAGER") {
      if (userByToken.user.teamId.length >= 1) {
        const userTeamId = userByToken.user.teamId[0];
        const userManagerId = getId("ROLE_MANAGER");
        if (values.teamId) {
          setFieldValue("teamId", values.teamId);
        } else {
          setFieldValue("teamId", userTeamId);
        }
        setFieldValue("managerId", userManagerId);
      }
    }

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
      // height: "44px",
    }),
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      height: "44px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
    }),
  };

  const today = new Date().toISOString().split("T")[0];

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
                  placeholder="Enter question here.."
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
                  isDisabled={
                    getRole() === "ROLE_ASSOCIATE" ||
                    getRole() === "ROLE_TEAM LEAD"
                  }
                  onBlur={handleBlur}
                  onChange={(selectedOptions) => {
                    console.log("Selected Team:", selectedOptions);
                    setFieldValue("teamId", selectedOptions?.value);
                    // setFieldValue("teamId", selectedOptions.value);
                    if (getRole() == "ROLE_ASSOCIATE") {
                      setFieldValue("managerId", "");
                      setFieldValue("tlId", "");
                      setFieldValue("agentId", "");
                    } else if (getRole() == "ROLE_TEAM LEAD") {
                      setFieldValue("managerId", "");
                      setFieldValue("agentId", "");
                      setFieldValue("tlId", "");
                    } else if (getRole() == "ROLE_MANAGER") {
                      setFieldValue("tlId", "");
                      setFieldValue("agentId", "");
                    } else if (
                      getRole() == "ROLE_ADMIN" ||
                      getRole() == "ROLE_SUPPORT" ||
                      getRole() == "ROLE_USER" ||
                      getRole() == "ROLE_QA"
                    ) {
                      setFieldValue("managerId", "");
                      setFieldValue("agentId", "");
                      setFieldValue("tlId", "");
                    }
                  }}
                  options={
                    userByToken.user.teamId.length > 0
                      ? allTeams.teams
                          ?.filter((team) =>
                            userByToken.user.teamId.includes(team.id)
                          ) // Filter teams based on userByToken.user.teamId
                          .map((s) => ({
                            label: s.teamName,
                            value: s.id,
                          }))
                      : allTeams.teams?.map((s) => ({
                          // Show all teams if userByToken.user.teamId has no values
                          label: s.teamName,
                          value: s.id,
                        }))
                  }
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
              <div className=" col-md-6 mb-2">
                <label>
                  Manager<span>*</span>
                </label>
                <Select
                  name="managerId"
                  isDisabled={
                    getRole() === "ROLE_ASSOCIATE" ||
                    getRole() === "ROLE_TEAM LEAD" ||
                    getRole() === "ROLE_MANAGER"
                  }
                  onChange={(selectedOptions) => {
                    setFieldValue("managerId", selectedOptions?.value);
                    if (getRole() == "ROLE_ASSOCIATE") {
                      setFieldValue("tlId", "");
                      setFieldValue("agentId", "");
                    } else if (getRole() == "ROLE_TEAM LEAD") {
                      setFieldValue("agentId", "");
                      setFieldValue("tlId", "");
                    } else if (
                      getRole() == "ROLE_ADMIN" ||
                      getRole() == "ROLE_SUPPORT" ||
                      getRole() == "ROLE_USER" ||
                      getRole() == "ROLE_QA"
                    ) {
                      setFieldValue("tlId", "");
                      setFieldValue("agentId", "");
                    } else if (getRole() == "ROLE_MANAGER") {
                      setFieldValue("tlId", "");
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

              {/* TeamLead */}
              <div className=" col-md-6 mb-2">
                <label>
                  Team lead
                  {getRole() === "ROLE_ASSOCIATE" && <span>*</span>}
                  {getRole() === "ROLE_MANAGER" && <span>*</span>}
                  {getRole() === "ROLE_TEAM LEAD" && <span>*</span>}
                </label>
                <Select
                  name="tlId"
                  isDisabled={getRole() === "ROLE_ASSOCIATE"}
                  onChange={(selectedOptions) => {
                    setFieldValue("tlId", selectedOptions.value);
                    if (getRole() === "ROLE_ASSOCIATE") {
                      setFieldValue("agentId", "");
                    } else if (
                      getRole() == "ROLE_ADMIN" ||
                      getRole() == "ROLE_SUPPORT" ||
                      getRole() == "ROLE_USER" ||
                      getRole() == "ROLE_QA"
                    ) {
                      setFieldValue("agentId", "");
                    } else if (getRole() === "ROLE_TEAM LEAD") {
                      setFieldValue("agentId", "");
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
                      "Select Team Lead",
                  }}
                  styles={style}
                  placeholder={"Select a team lead"}
                />
                {showError(errors.tlId, touched.tlId)}
              </div>

              {/* Agent */}
              <div className=" col-md-6 mb-2">
                <label>
                  {" "}
                  Agent
                  {getRole() === "ROLE_ASSOCIATE" && <span>*</span>}
                  {getRole() === "ROLE_TEAM LEAD" && <span>*</span>}
                </label>
                <Select
                  name="agentId"
                  // isDisabled={agentCan && type === "update"}
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

              {type === "update" && (
                <div className=" col-md-6 mb-2 ">
                  <label>
                    {" "}
                    Status<span>*</span>
                  </label>
                  <select
                    name="status"
                    class="input-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.status}
                  >
                    <option value="">Select Status</option>
                    <option value="2">Close</option>
                    <option value="1">Open</option>
                    <option value="0">Pending</option>
                  </select>

                  {showError(errors.status, touched.status)}
                </div>
              )}

              <div className="col-md-6 mb-2">
                <label>
                  Analytics Type<span>*</span>
                </label>
                <Select
                  name="analysisType"
                  // options={analyticsTypeOption}
                  options={[
                    { value: "", label: "Choose analytics type" },
                    { value: "1", label: "Resolution" },
                    { value: "2", label: "Purpose" },
                  ]}
                  onChange={(selectedOption) =>
                    setFieldValue("analysisType", selectedOption?.value)
                  }
                  onBlur={handleBlur}
                  value={{
                    value: values.analysisType || "",
                    label:
                      values.analysisType === "1" || values.analysisType === "2"
                        ? values.analysisType === "1"
                          ? "Resolution"
                          : "Purpose"
                        : "Choose analytics type",
                  }}
                  // value={{
                  //   value: values.analysisType || "",
                  //   label:
                  //     values.analysisType === "1" ? "Resolution" : "Purpose",
                  // }}
                  // value={analyticsTypeOption?.find(
                  //   (option) => option.value === values.analysisType
                  // )}
                  placeholder="choose analytics type"
                  // styles={styles}
                  className="react-select-container "
                  classNamePrefix="react-select"
                  menuShouldScrollIntoView={true}
                  onWheel={(e) => e.preventDefault()}
                  isDisabled={type === "update" ? isDisabled : ""}
                />
                {/* <select
                  className="input-control"
                  name="analysisType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.analysisType}
                >
                  <option value="">Select Analytics Type</option>

                  <option value="1">Resolution</option>
                  <option value="2">Purpose</option>
                </select> */}
                {showError(errors.analysisType, touched.analysisType)}
              </div>

              {values.analysisType === "2" && (
                <>
                  <div className="col-md-6 mb-2">
                    <label>
                      {/* Analytics <span>*</span> */}
                      Purpose <span>*</span>
                    </label>

                    <Select
                      name="analysisValue"
                      options={purposeOptions}
                      onChange={(selectedOption) =>
                        setFieldValue("analysisValue", selectedOption?.value)
                      }
                      onBlur={handleBlur}
                      value={purposeOptions?.find(
                        (option) => option.value === values.analysisValue
                      )}
                      placeholder="Purpose type"
                      styles={styles}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      menuShouldScrollIntoView={true}
                      onWheel={(e) => e.preventDefault()}
                      isDisabled={type === "update" ? isDisabled : ""}
                    />

                    {showError(errors.analysisValue, touched.analysisValue)}
                  </div>
                  {/* choose a data */}
                  <div className=" col-md-6 ">
                    <div className="form-group ">
                      <label htmlFor="noOfDay">
                        Date<span>*</span>
                      </label>
                      <input
                        type="date"
                        className="input-control"
                        name="noOfDay"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.noOfDay}
                        // disabled={disable}
                        // ref={dateInputRef}
                        id="noOfDay"
                        min={today}
                        disabled={type === "update" ? isDisabled : ""}
                        style={{
                          background: type === "update" ? "#f2f2f2" : "",
                          color: type === "update" ? "#9d9d9d" : "",
                        }}
                      />
                    </div>
                    {showError(errors.noOfDay, touched.noOfDay)}
                  </div>
                  {/* choose a time */}
                  <div className="col-md-6">
                    <label>
                      No. of hours<span>*</span>
                    </label>
                    <Select
                      name="noOfDay"
                      options={ghanta}
                      onChange={(selectedOption) =>
                        setFieldValue("noOfDay", selectedOption?.value)
                      }
                      onBlur={handleBlur}
                      value={ghanta.find(
                        (option) => option.value === values.noOfDay
                      )}
                      placeholder="Select No. of Hours"
                      isDisabled={type === "update" ? isDisabled : ""}
                    />
                    {/* <select
                      className="input-control"
                      name="noOfDay"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.noOfDay}
                    >
                      <option value="" defaultValue>
                        Select No. of hours
                      </option>
                      <>
                        <option value="1 hours">1 hour</option>
                        <option value="2 hours">2 hour</option>
                        <option value="3 hours">3 hour</option>
                        <option value="4 hours">4 hour</option>
                        <option value="5 hours">5 hour</option>
                        <option value="6 hours">6 hour</option>
                        <option value="7 hours">7 hour</option>
                        <option value="8 hours">8 hour</option>
                        <option value="9 hours">9 hour</option>
                        <option value="10 hours">10 hour</option>
                        <option value="12 hours">12 hour</option>
                      </>
                      {showError(errors.noOfDay, touched.noOfDay)}
                    </select> */}
                    {/* <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="noOfDay"
                      options={hourData.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={(selectedOption) => setFieldValue('noOfDay', selectedOption?.value)}
                      onBlur={handleBlur}
                      value={hourData.find(option => option.name === values.noOfDay)}
                      // options={hourData.map((item) => ({
                      //   value: item.id,
                      //   label: item.name,
                      // }))}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values?.noOfDay}
                    /> */}
                    {/* {showError(errors.noOfDay, touched.noOfDay)} */}
                  </div>
                </>
              )}
              {values.analysisType === "1" && (
                <>
                  <div
                    className="col-md-6 mb-2"
                    onWheel={(e) => e.preventDefault()}
                  >
                    <label>
                      Resolution <span>*</span>
                    </label>
                    <Select
                      placeholder="Resolution type"
                      name="analysisValue"
                      options={resolutionOptions}
                      onChange={(selectedOptionq) =>
                        setFieldValue("analysisValue", selectedOptionq?.value)
                      }
                      onBlur={handleBlur}
                      value={resolutionOptions?.find(
                        (option) => option.value === values.analysisValue
                      )}
                      styles={style}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onWheel={(e) => e.preventDefault()}
                      isDisabled={type === "update" ? isDisabled : ""}
                    />

                    {showError(errors.analysisValue, touched.analysisValue)}
                  </div>
                  {/* choose a data */}
                  <div className=" col-md-6 ">
                    <div className="form-group ">
                      <label htmlFor="noOfDay">
                        Date<span>*</span>
                      </label>
                      <input
                        type="date"
                        className="input-control"
                        placeholder="Date of Birth"
                        name="noOfDay"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.noOfDay}
                        // disabled={disable}
                        // ref={dateInputRef}
                        id="noOfDay"
                        min={today}
                        disabled={type === "update" ? isDisabled : ""}
                        style={{
                          background: type === "update" ? "#f2f2f2" : "",
                          color: type === "update" ? "#9d9d9d" : "",
                        }}
                      />
                    </div>
                    {showError(errors.noOfDay, touched.noOfDay)}
                  </div>
                  {/* choose a time */}
                  <div className="col-md-6">
                    <label>
                      No. of hours<span>*</span>
                    </label>
                    {/* <Select
                      // className="basic-single"
                      // classNamePrefix="select"
                      name="noOfDay"
                      options={hourData.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))}
                      onChange={(selectedOption) => setFieldValue('noOfDay', selectedOption?.value)}
                      onBlur={handleBlur}
                      value={hourData?.find(option => option.name === values.noOfDay)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values?.noOfDay}
                    /> */}
                    <Select
                      name="noOfDay"
                      options={ghanta}
                      onChange={(selectedOption) =>
                        setFieldValue("noOfDay", selectedOption?.value)
                      }
                      onBlur={handleBlur}
                      value={ghanta.find(
                        (option) => option.value === values.noOfDay
                      )}
                      placeholder="Select No. of Hours"
                      isDisabled={type === "update" ? isDisabled : ""}
                    />
                    {/* <select
                      className="input-control"
                      name="noOfDay"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.noOfDay}
                    >
                      <option value="" defaultValue>
                        Select No. of hours
                      </option>
                      <>
                        <option value="1 hours">1 hour</option>
                        <option value="2 hours">2 hour</option>
                        <option value="3 hours">3 hour</option>
                        <option value="4 hours">4 hour</option>
                        <option value="5 hours">5 hour</option>
                        <option value="6 hours">6 hour</option>
                        <option value="7 hours">7 hour</option>
                        <option value="8 hours">8 hour</option>
                        <option value="9 hours">9 hour</option>
                        <option value="10 hours">10 hour</option>
                        <option value="12 hours">12 hour</option>
                      </>
                      {showError(errors.noOfDay, touched.noOfDay)}
                    </select> */}
                    {/* {showError(errors.noOfDay, touched.noOfDay)} */}
                  </div>
                </>
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
            {!disable && type === "update" && (
              <button
                type="submit"
                className="btn btn-primary-big big-btn-padd"
              >
                {" "}
                Update Ticket{" "}
              </button>
            )}
            {!disable && type === "add" && (
              <button
                type="submit"
                className="btn btn-primary-big big-btn-padd"
              >
                {" "}
                Create Ticket{" "}
              </button>
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

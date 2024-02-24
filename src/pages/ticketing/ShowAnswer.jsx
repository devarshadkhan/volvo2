import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Success from "../../components/commonUI/Success";
import { getRole, showError, truncateHTML } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { answerTicketAction } from "../../redux/slice/tickets/answerTaskSlice";
import TextEditor from "./TextEditor";
import Select from "react-select";
import { getAnalysisByTypePurposeAPI } from "../../redux/slice/analysis/getAnalysisbyTypePurposeSlice";
import { getAnalysisByTypeResolutionAPI } from "../../redux/slice/analysis/getAnalysisbyTypeResolutionSlice";
import { hourData } from "../../utils/mockData";

const ShowAnswer = ({ onClose, disable, type }) => {
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);
  const [StatusVal, setStatus] = useState(false);
  const [taskAnswerError, setTaskAnswerError] = useState("");

  const formatDate = (params) => {
    const parts = params.split("/");
    // month is 0-based, so we need to subtract 1 from the month
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = formattedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (params) => {
    const date = new Date(`2000-01-01 ${params}`);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const newFormattedTime = `${hours}:${minutes}`;
    return newFormattedTime;
  };

  const isDisabled = type === "view" || type === "update" || type === "reply";

  const initialValues = {
    ticketId: "",
    taskAnswer: "",
    status: "",
    analysisValue: "",
    analysisType: "",
    noOfDay: "",
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

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: userValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (typeof values.taskAnswer === "undefined") {
        const errorMessage = "Task answer is required.";
        setTaskAnswerError(errorMessage);
      }
      const strippedTaskAnswer = values.taskAnswer.replace(/<[^>]*>/g, "");
      if (!strippedTaskAnswer.trim()) {
        const errorMessage = "Task answer is required.";
        setTaskAnswerError(errorMessage);
        return;
      }
      setTaskAnswerError("");
      let answerType = "";
      const role = getRole();
      if (role === "ROLE_MANAGER") {
        answerType = "manager";
      } else if (role === "ROLE_TEAM LEAD") {
        answerType = "team Lead";
      } else if (role === "ROLE_ASSOCIATE") {
        answerType = "associate";
      }
      let status = "";

      if (StatusVal) {
        status = StatusVal;
      } else {
        status = values?.status;
      }

      dispatch(
        answerTicketAction({
          taskAnswer: values.taskAnswer,
          ticketId: values.ticketNo,
          answerType,
          status: status,
        })
      );
      setRouteFlag(true);
    },
  });

  const canAnswer = [
    "ROLE_MANAGER",
    "ROLE_TEAM LEAD",
    "ROLE_ASSOCIATE",
  ].includes(getRole());

  function getInitials(fullName) {
    if (!fullName) return "";
    const namesArray = fullName.split(" ");
    const initials = namesArray
      .map((name) => name.charAt(0).toUpperCase())
      .join("");
    return initials;
  }

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    setFieldValue("status", selectedStatus); // Use setFieldValue from useFormik
    setFieldTouched("status", true);
  };

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

  const [resolutionOptions, setResolutionOptions] = useState([]);
  const [purposeOptions, setPurposeOptions] = useState([]);
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

  useEffect(() => {
    dispatch(getAnalysisByTypePurposeAPI());
    dispatch(getAnalysisByTypeResolutionAPI());
  }, []);

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mar-20 scroll">
          {/* taskQuestion lname */}
          <div className="Add-form-group">
            <div className="row">
              <div className=" col-md-12 mb-1 ">
                <label>
                  Question <span>*</span>
                  <font>
                    {" "}
                    Ticket Number: <strong>{values?.ticketNo}</strong>
                  </font>
                </label>
                <textarea
                  type="text"
                  className="input-control textAreahight"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  name="taskQuestion"
                  value={values?.taskQuestion}
                  disabled={true}
                ></textarea>
              </div>
              <div className=" col-md-6 mb-2 ">
                <label>
                  {" "}
                  Team<span>*</span>
                </label>
                <Select
                  name="teamId"
                  isDisabled={true}
                  value={{
                    value: values?.teamName || "",
                    label: values?.teamName || "Select Team",
                  }}
                  placeholder={"Select a Team"}
                />
              </div>

              <div className=" col-md-6 mb-2 ">
                <label>
                  {" "}
                  Manager<span>*</span>
                </label>
                <Select
                  name="managerId"
                  isDisabled={true}
                  value={{
                    value: values?.managerName || "",
                    label: values?.managerName || "Select Manager",
                  }}
                  placeholder={"Select a Manager"}
                />
              </div>

              <div className=" col-md-6 mb-2 ">
                <label>
                  {" "}
                  Team Lead<span>*</span>
                </label>
                <Select
                  name="teamLeadId"
                  isDisabled={true}
                  value={{
                    value: values?.tlName || "",
                    label: values?.tlName || "Select Team Lead",
                  }}
                  placeholder={"Select a Team Lead"}
                />
              </div>

              <div className=" col-md-6 mb-2 ">
                <label>
                  {" "}
                  Agent<span>*</span>
                </label>
                <Select
                  name="agentId"
                  isDisabled={true}
                  value={{
                    value: values?.agentName || "",
                    label: values?.agentName || "Select Agent Name",
                  }}
                  placeholder={"Select Agent Name"}
                />
              </div>

              <div className="col-md-6 mb-2">
                <label>
                Analytics Type<span>*</span>
                </label>
                <Select
                  name="analysisType"
                  // options={analyticsTypeOption}
                  options={[
                    { value: "", label: "choose analytics type" },
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
                  isDisabled
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
                />
                {/* <select
                  className="input-control werh"
                  name="analysisType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.analysisType}
                  disabled
                  // style={{color:"red"}}
                >
                  <option value="">Select Analysis Type</option>

                  <option value="1" className="werh">Resolution</option>
                  <option value="2" className="werh">Purpose</option>
                </select> */}
                {showError(errors.analysisType, touched.analysisType)}
              </div>

              {values.analysisType === "2" && (
                <>
                  <div className="col-md-6 mb-2">
                    <label>
                      Purpose Type<span>*</span>
                    </label>

                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="analysisValue"
                      options={purposeOptions}
                      onChange={(selectedOption) =>
                        setFieldValue("analysisValue", selectedOption?.value)
                      }
                      onBlur={handleBlur}
                      value={purposeOptions?.find(
                        (option) => option.value === values.analysisValue
                      )}
                      isDisabled
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
                        // min={today}
                        disabled
                        style={{
                            background: type === "view" || "reply" ?"#f2f2f2":"",
                            color: type === "view" || "reply" ?"#9d9d9d":"",
                            border: type === "view" || "reply" ?"none":"",
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
                      isDisabled
                    />
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
                  </div>
                </>
              )}
              {values.analysisType === "1" && (
                <>
                  <div className="col-md-6 mb-2">
                    <label>
                      Resolution Type<span>*</span>
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="analysisValue"
                      options={resolutionOptions}
                      onChange={(selectedOptionq) =>
                        setFieldValue("analysisValue", selectedOptionq?.value)
                      }
                      onBlur={handleBlur}
                      value={resolutionOptions?.find(
                        (option) => option.value === values.analysisValue
                      )}
                      isDisabled
                      disabled
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
                        disabled
                        // ref={dateInputRef}
                        id="noOfDay"
                        style={{
                            background: type === "view" || "reply" ?"#f2f2f2":"",
                            color: type === "view" || "reply" ?"#9d9d9d":"",
                            border: type === "view" || "reply" ?"none":"",
                          }}
                        // min={today}
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
                      className="basic-single"
                      classNamePrefix="select"
                      name="noOfDay"
                      options={hourData.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))}
                      onChange={(selectedOption) => setFieldValue('noOfDay', selectedOption?.value)}
                      onBlur={handleBlur}
                      value={hourData.find(option => option.name === values.noOfDay)}
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
                      isDisabled
                    />
                  </div>
                </>
              )}

              <div className=" col-md-12 mt-3 ">
                <div className="popupText">
                  <div class="row">
                    <div class=" col-lg-1">Status:</div>
                    <div class=" col-lg-2">
                      <div class="radio">
                        <input
                          id="radio1"
                          name="status"
                          type="radio"
                          value="0"
                          checked={values?.status === "0"}
                          onChange={handleStatusChange}
                          disabled={
                            type === "view" ||
                            getRole() == "ROLE_ADMIN" ||
                            getRole() == "ROLE_SUPPORT" ||
                            getRole() == "ROLE_USER" ||
                            getRole() == "ROLE_QA"
                          }
                        />
                        <label for="radio1">Pending</label>
                      </div>
                    </div>
                    <div class=" col-lg-2">
                      <div class="radio">
                        <input
                          id="radio2"
                          name="status"
                          type="radio"
                          value="2"
                          checked={values?.status === "2"}
                          onChange={handleStatusChange}
                          disabled={
                            type === "view" ||
                            getRole() == "ROLE_ADMIN" ||
                            getRole() == "ROLE_SUPPORT" ||
                            getRole() == "ROLE_USER" ||
                            getRole() == "ROLE_QA"
                          }
                        />
                        <label for="radio2">Close</label>
                      </div>
                    </div>
                    <div class=" col-lg-2">
                      <div class="radio">
                        <input
                          id="radio3"
                          name="status"
                          type="radio"
                          value="1"
                          checked={values?.status === "1"}
                          onChange={handleStatusChange}
                          disabled={
                            type === "view" ||
                            getRole() == "ROLE_ADMIN" ||
                            getRole() == "ROLE_SUPPORT" ||
                            getRole() == "ROLE_USER" ||
                            getRole() == "ROLE_QA"
                          }
                        />
                        <label for="radio3">Open</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {userById.user?.answer?.length > 0 ? (
                <div className=" col-md-12 mt-4 ">
                  <div className="popupText">Comments: </div>
                </div>
              ) : (
                <div className=" col-md-12 mt-4 ">
                  <div className="popupText"></div>
                </div>
              )}

              {userById.user?.answer?.length === 0 ? (
                <div className=" col-md-12 mt-2 "></div>
              ) : (
                userById.user?.answer?.map((a, i) => {
                  return (
                    <>
                      <div className=" col-md-12 mt-2 ">
                        <div className="popupComment">
                          <h4 className="bluebg">
                            {a.answerType === "associate"
                              ? getInitials(values?.agentName)
                              : a?.answerType === "team Lead"
                              ? getInitials(values?.tlName)
                              : a?.answerType === "manager"
                              ? getInitials(values?.managerName)
                              : ""}
                            <font className="online"></font>
                          </h4>
                          <h3>
                            {" "}
                            {a.answerType === "associate"
                              ? values?.agentName
                              : a?.answerType === "team Lead"
                              ? values?.tlName
                              : a?.answerType === "manager"
                              ? values?.managerName
                              : ""}
                          </h3>
                        </div>
                      </div>

                      <div className=" col-md-12 mt-2 ">
                        <div className="popupCommentdec">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: truncateHTML(a?.taskAnswer),
                            }}
                          ></p>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
              {type === "reply" && canAnswer ? (
                <div className=" col-md-12 mt-2 ">
                  <div className="">
                    <TextEditor
                      name="taskAnswer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.taskAnswer}
                      setFieldValue={setFieldValue}
                    />
                    {taskAnswerError && (
                      <div className="error-msg">{taskAnswerError}</div>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* submit */}
          <div className="form-group aling-center-btn">
            {!disable && canAnswer && (
              <button
                type="submit"
                className="btn btn-primary-big big-btn-padd"
              >
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

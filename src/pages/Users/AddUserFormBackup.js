import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Success from "../../components/commonUI/Success";
import {
  convertDateFormat,
  reverseDateFormat,
  showError,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../redux/slice/users/addUserSlice";
import { updateUserAction } from "../../redux/slice/users/updateUserSlice";
import {
  addUserHandleSchema,
  addUserSchema,
  updateProfileSchema,
  updateUserSchema,
} from "../../utils/schema";
import { updateProfileAction } from "../../redux/slice/auth/updateProfileSlice";
import Select from "react-select";
import { getAllTLAction } from "../../redux/slice/forForms/getAllTLSlice";
import { getAllTeamsAction } from "../../redux/slice/forForms/getAllTeamsFormSlice";
import { getAllManagersAction } from "../../redux/slice/forForms/getAllManagersSlice";

const initialValues = {
  fname: "",
  lname: "",
  dateOfBirth: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  profileImage: "",
  gender: "",
  status: "1",

  roleType: "",
  teamId: "",
  managerId: "",
  tlId: "",
};

const AddUserForm = ({ onClose, disable, type }) => {
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);
  const isDisabled = type === "view" || type === "update" || type === "profile";
  const [userValues, setUserValues] = useState(initialValues);
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const addUser = useSelector((state) => state.addUser);
  const userById = useSelector((state) => state.userById);
  const updateProfile = useSelector((state) => state.updateProfile);
  const updateUser = useSelector((state) => state.updateUser);
  const userByToken = useSelector((state) => state.userByToken);
  const allTeams = useSelector((state) => state.allTeams);
  const allManagers = useSelector((state) => state.allManagers);
  const TLs = useSelector((state) => state.TLs);

  useEffect(() => {
    if (type === "add") {
      setUserValues(initialValues);
    }
    if (userById.success || userByToken.success) {
      if (type === "profile") {
        setPreviewUrl(userByToken.user?.profileImage);
        setUserValues({
          ...userByToken.user,
          roleType: userByToken.user?.role,
          teamId: userByToken.user?.teamId,
          managerId: userByToken.user?.managerId,
          tlId: userByToken.user?.tlId,
          dateOfBirth: reverseDateFormat(userByToken.user?.dateOfBirth),
        });
      } else if (type === "update" || type === "view") {
        setPreviewUrl(userById.user?.profileImage);
        setUserValues({
          ...userById.user,
          roleType: userById.user?.role,
          teamId: userById.user?.teamId,
          managerId: userById.user?.managerId,
          tlId: userById.user?.tlId,
          dateOfBirth: reverseDateFormat(userById.user?.dateOfBirth),
        });
      }
    }
  }, [userById.success, userByToken.success]);

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

  const validationSchema = () => {
    if (type === "add") {
      return addUserHandleSchema(selectedRole);
    } else if (type === "update") {
      return updateUserSchema;
    } else if (type === "profile") {
      return updateProfileSchema;
    } else {
      return null;
    }
  };

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
    validationSchema: validationSchema(),
    enableReinitialize: true,
    onSubmit: (values) => {
      const newValue = {
        fname: values.fname,
        lname: values.lname,
        dateOfBirth: values.dateOfBirth,
        email: values.email,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        profileImage: values.profileImage,
      };
      const formData = new FormData();
      // Loop through the values object and append each key-value pair to the FormData

      if (type !== "profile") {
        for (const [key, value] of Object.entries(values)) {
          if (key === "dateOfBirth" && values.dateOfBirth) {
            formData.append(key, convertDateFormat(value));
          } else if (key === "teamId") {
            formData.append(key, values.teamId || "");
          } else if (key === "managerId") {
            formData.append(key, values.managerId || "");
          } else if (key === "tlId") {
            formData.append(key, values.tlId || "");
          } else if (key === "roleType") {
            formData.append(key, `["${value}"]`);
          } else {
            formData.append(key, value);
          }
        }
      } else {
        for (const [key, value] of Object.entries(newValue)) {
          if (key === "dateOfBirth" && values.dateOfBirth) {
            formData.append(key, convertDateFormat(value));
          } else {
            formData.append(key, value);
          }
        }
      }

      if (type === "add") {
        dispatch(addUserAction(formData));
      } else if (type === "update") {
        dispatch(updateUserAction({ id: values.id, data: formData }));
      } else if (type === "profile") {
        dispatch(updateProfileAction(formData));
      }
      setRouteFlag(true);
    },
  });

  useEffect(() => {
    if (
      values.roleType === "manager" ||
      values.roleType === "qa" ||
      values.roleType === "tl" ||
      values.roleType === "agent"
    ) {
      dispatch(getAllTeamsAction());
    }
    if (
      (values.roleType === "qa" ||
        values.roleType === "tl" ||
        values.roleType === "agent") &&
      values.teamId
    ) {
      dispatch(getAllManagersAction(values.teamId));
    }

    if (values.roleType === "agent" && values.teamId && values.managerId) {
      dispatch(
        getAllTLAction({
          teamId: values.teamId,
          managerId: values.managerId,
        })
      );
    }
  }, [values.roleType, values.teamId, values.managerId, values.tlId]);

  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input element
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Pass the selected file to the parent component using the onChange callback
    const file = event.target.files[0];
    setFieldValue("profileImage", file);

    // Read and set the preview URL for image files
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("/icons-images/avtar.svg");
    }
  };

  const style = {
    control: (provided) => ({
      ...provided,
      height: "44px",
    }),
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="scroll">
          <div className="ModalAvtar">
            <img
              src={previewUrl || "/icons-images/avtar.svg"}
              onClick={handleButtonClick}
              alt="icon"
            />
          </div>
          <p className="w-100 text-center">
            {showError(errors.profileImage, touched.profileImage)}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={disable}
          />
          <div className="mar-30 ">
            {/* fname lname */}
            <div className="Add-form-group">
              <div className="row">
                <div className=" col-md-6 mb-2 ">
                  <label>
                    First name<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="First name"
                    name="fname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.fname}
                    disabled={disable}
                  />
                  {showError(errors.fname, touched.fname)}
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Last name"
                    name="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.lname}
                    disabled={disable}
                  />
                  {showError(errors.lname, touched.lname)}
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>
                    Email<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.email}
                    disabled={type === "update" || disable}
                  />
                  {showError(errors.email, touched.email)}
                </div>

                {/* role */}
                <div className=" col-md-6 mb-2 ">
                  <label>
                    Role<span>*</span>
                  </label>
                  <select
                    className="input-control"
                    name="roleType"
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedRole(e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values?.roleType}
                    disabled={type !== "add"}
                  >
                    <option value="" selected>
                      Select Role
                    </option>

                    <option value="user">User</option>
                    <option value="associate">Associate</option>
                    <option value="tl">Team Lead</option>
                    <option value="qa">QA</option>
                    <option value="manager">Manager</option>
                    {/* <option value="support">Support</option> */}
                    <option value="admin">Admin</option>
                  </select>{" "}
                  {showError(errors.roleType, touched.roleType)}
                </div>

                {/* Team */}
                {(values.roleType === "manager" ||
                  values.roleType === "qa" ||
                  values.roleType === "tl" ||
                  values.roleType === "agent") && (
                  <div className=" col-md-6 ">
                    <label>
                      Team<span>*</span>
                    </label>
                    <Select
                      name="teamId"
                      isDisabled={isDisabled}
                      onChange={(selectedOptions) => {
                        setFieldValue("teamId", selectedOptions.value);
                      }}
                      options={allTeams.teams?.map((s) => ({
                        label: s.teamName,
                        value: s.id,
                      }))}
                      value={{
                        value: values.teamId,
                        label:
                          allTeams.teams?.find((t) => t.id === values.teamId)
                            ?.teamName || "Select...",
                      }}
                      styles={style}
                      placeholder={"Select a Team"}
                    />
                    {showError(errors.teamId, touched.teamId)}
                  </div>
                )}

                {/* Manager */}
                {(values.roleType === "qa" ||
                  values.roleType === "tl" ||
                  values.roleType === "agent") &&
                  values.teamId && (
                    <div className=" col-md-6 ">
                      <label>
                        Manager<span>*</span>
                      </label>
                      <Select
                        name="managerId"
                        isDisabled={isDisabled}
                        onChange={(selectedOptions) => {
                          setFieldValue("managerId", selectedOptions.value);
                        }}
                        options={allManagers.managers?.map((s) => ({
                          label: s.managerName,
                          value: s.id,
                        }))}
                        value={{
                          value: values.managerId || null,
                          label:
                            allManagers.managers?.find(
                              (m) => m.id === values.managerId
                            )?.managerName || "Select...",
                        }}
                        styles={style}
                        placeholder={"Select a manager"}
                      />
                      {showError(errors.managerId, touched.managerId)}
                    </div>
                  )}

                {/* TeamLead */}
                {values.roleType === "agent" &&
                  values.teamId &&
                  values.managerId && (
                    <div className=" col-md-6 ">
                      <label>
                        Team Lead<span>*</span>
                      </label>
                      <Select
                        name="tlId"
                        isDisabled={isDisabled}
                        onChange={(selectedOptions) => {
                          setFieldValue("tlId", selectedOptions.value);
                        }}
                        options={TLs.TLs?.map((s) => ({
                          label: s.tlName,
                          value: s.id,
                        }))}
                        value={{
                          value: values.tlId || null,
                          label:
                            TLs.TLs?.find((t) => t.id === values.tlId)
                              ?.tlName || "Select...",
                        }}
                        styles={style}
                        placeholder={"Select a team lead"}
                      />
                      {showError(errors.tlId, touched.tlId)}
                    </div>
                  )}

                <div className=" col-md-6 mb-2 ">
                  <label>
                    Gender<span>*</span>
                  </label>
                  <select
                    className="input-control"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.gender}
                    disabled={disable}
                  >
                    <option value="" selected>
                      Select Gender
                    </option>

                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                  </select>
                  {showError(errors.gender, touched.gender)}
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>
                    Phone number<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Phone number"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.phoneNumber}
                    disabled={disable}
                  />{" "}
                  {showError(errors.phoneNumber, touched.phoneNumber)}
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    className="input-control"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.dateOfBirth}
                    disabled={disable}
                  />
                  {showError(errors.dateOfBirth, touched.dateOfBirth)}
                </div>

                {/* password Pincode */}
                {type === "add" && (
                  <>
                    <div className="col-md-6 mb-2 ">
                      <label>
                        Password<span>*</span>
                      </label>
                      <input
                        type="password"
                        className="input-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.password}
                        disabled={disable}
                      />{" "}
                      {showError(errors.password, touched.password)}
                    </div>
                    <div className=" col-md-6 mb-2 ">
                      <label>
                        Confirm password<span>*</span>
                      </label>
                      <input
                        type="password"
                        className="input-control"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.confirmPassword}
                        disabled={disable}
                      />{" "}
                      {showError(
                        errors.confirmPassword,
                        touched.confirmPassword
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* submit */}
            <div className="form-group aling-right">
              <button
                type="button"
                className="btn btn-outline-primary big-btn-padd"
                onClick={onClose}
              >
                Cancel
              </button>
              {!disable && (
                <button
                  type="submit"
                  className="btn btn-primary-big big-btn-padd"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <Success
        isOpen={success}
        onClose={() => setSuccess(false)}
        message={
          type === "profile"
            ? "Profile updated successfully!"
            : type === "add"
            ? "Added Successfully"
            : "Updated Successfully"
        }
        descMessage={`Your information has been ${
          type === "add" ? " added " : " updated "
        } successfully!`}
        closePreviousModal={onClose}
      />
    </>
  );
};
export default AddUserForm;

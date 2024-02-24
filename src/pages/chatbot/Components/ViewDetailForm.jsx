import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import Success from "../../../components/commonUI/Success";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../../redux/slice/chatBot/getUserChatDetail";
import { convertDateFormat, convertFormateDOB } from "../../../utils/utils";

const AddUserForm = ({ onClose, disable, type, selectedUserId }) => {
  const dispatch = useDispatch();
  const getViewDetail = useSelector(
    (item) => item.getUserChatDetail.dataMesaage.data
  );
  console.log(getViewDetail);

  useEffect(() => {
    dispatch(getUserDetail(selectedUserId));
  }, []);

  return (
    <>
    {/* {type == "view"} */}
      <form>
        <div className="scroll">
          <div className="ModalAvtar">
            <img
              src={getViewDetail?.profileImage || "/icons-images/avtar.svg"}
              alt="icon"
            />
          </div>
          <p className="w-100 text-center"></p>
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
                    value={getViewDetail?.fname}
                    disabled
                  />
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Last name"
                    name="lname"
                    value={getViewDetail?.lname}
                    disabled
                  />
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
                    value={getViewDetail?.email}
                    disabled
                  />
                </div>
                <div className=" col-md-6 mb-2 ">
                  <label>
                    Phone<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="phoneNumber"
                    name="phoneNumber"
                    value={getViewDetail?.phoneNumber}
                    disabled
                  />
                </div>

                {/* Team */}

                <div className=" col-md-6 ">
                  <label>
                    Team<span>*</span>{" "}
                  </label>
                  <select
                    className="input-control"
                    name="gender"
                    value={getViewDetail?.teamName?.map((e) => e)}
                    disabled
                  >
                    <option value="" selected>
                      {/* Select Gender */}
                      {getViewDetail?.teamName?.map((e) => e)}
                    </option>
                  </select>
                </div>
                <div className=" col-md-6 ">
                  <label>
                    Manager Name<span>*</span>{" "}
                  </label>
                  <select
                    className="input-control"
                    name="gender"
                    // value={getViewDetail?.managerName}
                    disabled
                  >
                    <option value="" selected>
                      {/* Select Gender */}
                      {getViewDetail?.managerName || "NA"}
                    </option>
                  </select>
                </div>
                <div className=" col-md-6 ">
                  <label>
                    TL Name<span>*</span>{" "}
                  </label>
                  <select
                    className="input-control"
                    name="gender"
                    // value={getViewDetail?.managerName}
                    disabled
                  >
                    <option value="" selected>
                      {/* Select Gender */}
                      {getViewDetail?.tlName || "NA"}
                    </option>
                  </select>
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>
                    Gender<span>*</span>
                  </label>
                  <select
                    className="input-control"
                    name="gender"
                    value={getViewDetail?.gender}
                    disabled
                  >
                    <option value="" selected>
                      {getViewDetail?.gender === "0"
                        ? "male"
                        : getViewDetail?.gender === "1"
                        ? "female"
                        : "other"}
                    </option>
                    {/* 
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option> */}
                  </select>
                </div>

                <div className=" col-md-6 mb-2 ">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    className="input-control"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    value={convertFormateDOB(getViewDetail?.dateOfBirth)}
                    // value={"12/01/2012"}
                    disabled
                  />
                </div>

                {/* password Pincode */}
                {/* {type === "add" && (
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
                      />{" "}
                
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
                      />{" "}
                    
                    </div>
                  </>
                )} */}
              </div>
            </div>
            {/* submit */}
            {/* <div className="form-group aling-right">
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
            </div> */}
          </div>
        </div>
      </form>
      <Success
        // isOpen={success}
        // onClose={() => setSuccess(false)}
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

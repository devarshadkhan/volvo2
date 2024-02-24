import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { removeUserSession, showError } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../redux/slice/auth/changePasswordSlice";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../utils/schema";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const changePassword = useSelector((state) => state.changePassword);
  const [routeFlag, setRouteFlag] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (changePassword.success && routeFlag) {
      removeUserSession();
      navigate("/");
    }
  }, [changePassword.success]);

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: (values) => {
        dispatch(changePasswordAction(values));
        setRouteFlag(true);
      },
    });
  return (
    <div className="doctor-wrapper" style={{ background: "white" }}>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="col-lg-8">
            <div className="mar-30 cardhead mt-5">
              <div className="heading">
                <h2>Change Password</h2>
              </div>
              <div className="Add-form-group ">
                <div className="row mt-3">
                  <div className="col-md-12 mt-2">
                    <label>
                      Current Password<span>*</span>
                    </label>
                    <input
                      type={showPassword.oldPassword ? "text" : "password"}
                      className="input-control"
                      placeholder="Current Password"
                      name="oldPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.oldPassword}
                    />

                    <img
                      src={
                        showPassword.oldPassword
                          ? "images/Closedeyeicon.svg"
                          : "images/mdi_eye-outline.png"
                      }
                      class="eyeChamgrpassword"
                      onClick={() =>
                        setShowPassword((state) => ({
                          ...state,
                          oldPassword: !state.oldPassword,
                        }))
                      }
                    />
                    {/* <img src="images/Closedeyeicon.svg" class="eyeChamgrpassword" /> */}

                    {showError(errors.oldPassword, touched.oldPassword)}
                  </div>

                  <div className="col-md-6 mt-2">
                    <label>
                      New Password<span>*</span>
                    </label>
                    <input
                      type={showPassword.newPassword ? "text" : "password"}
                      className="input-control"
                      placeholder="New Password"
                      name="newPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                    />
                    <img
                      src={
                        showPassword.newPassword
                          ? "images/Closedeyeicon.svg"
                          : "images/mdi_eye-outline.png"
                      }
                      class="eyeChamgrpassword"
                      onClick={() =>
                        setShowPassword((state) => ({
                          ...state,
                          newPassword: !state.newPassword,
                        }))
                      }
                    />
                    {/* <img src="images/Closedeyeicon.svg" class="eyeChamgrpassword" /> */}
                    {showError(errors.newPassword, touched.newPassword)}
                  </div>

                  <div className=" col-md-6 mt-2">
                    <label>
                      Confirm New Password<span>*</span>
                    </label>
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      className="input-control"
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <img
                      src={
                        showPassword.confirmPassword
                          ? "images/Closedeyeicon.svg"
                          : "images/mdi_eye-outline.png"
                      }
                      class="eyeChamgrpassword"
                      onClick={() =>
                        setShowPassword((state) => ({
                          ...state,
                          confirmPassword: !state.confirmPassword,
                        }))
                      }
                    />
                    {/* <img src="images/Closedeyeicon.svg" class="eyeChamgrpassword" /> */}
                    {showError(errors.confirmPassword, touched.confirmPassword)}
                  </div>
                </div>
              </div>

              {/* repeet */}
              <div className="form-group aling-right">
                <button
                  type="button"
                  className="btn btn-outline-primary big-btn-padd"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-big big-btn-padd"
                  // onClick={() => {
                  //   setSuccess(true);
                  // }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotFormSchema } from "../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../redux/slice/auth/forgotPasswordSlice";
import "../../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [routeFlag, setRouteFlag] = useState(false);

  const { forgotPassword } = useSelector((state) => state);

  useEffect(() => {
    forgotPassword.success && routeFlag && navigate("/");
  }, [forgotPassword.success]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotFormSchema,
      onSubmit: (values) => {
        dispatch(forgotPasswordAction(values));
        setRouteFlag(true);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="back-btn">
        <Link to="/" className="back-btn">
          <img src="images/back-arrow.png" /> Back
        </Link>
      </div>
      <img src="images/logo.png" />
      {/* <h2>Recover Password</h2>
      <p>To Log into your Account</p> */}
      <h3>Forgot Password?</h3>

      <div className="inputField">
        <p className="text-left">Please Enter the details below to continue</p>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Enter your Registered Email"
        />
        {errors.email && touched.email ? (
          <div className="error-msg">{errors.email}</div>
        ) : null}
      </div>

      <div className="inputField mar-20">
        <button className=" width-100 btn-md-bg" type="submit">
          Reset Password
        </button>
      </div>

      <div className="inputField mar-20">
        <Link to="/" className=" width-100 btn-md-bg-back">
          Back to Log in
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;

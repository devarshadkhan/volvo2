import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../redux/slice/auth/signinSlice";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [routeFlag, setRouteFlag] = useState(false);

  const dispatch = useDispatch();
  const { loggedinUser } = useSelector((state) => state);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        rememberPassword: "",
      },
      validationSchema: signInSchema,
      onSubmit: (values) => {
        dispatch(signInAction(values));
        setRouteFlag(true);
      },
    });

  useEffect(() => {
    routeFlag && loggedinUser.success && navigate("/dashboard");
  }, [loggedinUser.success]);

  return (
    <form onSubmit={handleSubmit}>
      <img src="images/logo.png" />
      <h2>Welcome to Unilink360</h2>
      <p>Log in to your Account</p>

      <div className="inputField">
        <label className="input-taxt">
          User Name<span>*</span>
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          tabIndex="1"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        {errors.username && touched.username ? (
          <div className="error-msg">{errors.username}</div>
        ) : null}
      </div>

      <div className="inputField">
        <label className="input-taxt">
          Password<span>*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          tabIndex="2"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <img
          src={
            !showPassword
              ? "images/mdi_eye-outline.png"
              : "images/Closedeyeicon.svg"
          }
          className="eye-img"
          onClick={() => setShowPassword(!showPassword)}
        />
        {errors.password && touched.password ? (
          <div className="error-msg">{errors.password}</div>
        ) : null}
      </div>

      <div className="inputField">
        <input
          id="rememberMe"
          type="checkbox"
          name="rememberPassword"
          className="checkbox"
          tabIndex="3"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.rememberPassword}
        />
        <label for="rememberMe" className="checkbox-taxt">
          Remember Password
        </label>
      </div>

      <div className="inputField">
        <button className=" width-100 btn-md-bg" type="submit" tabIndex="4">
          Log in
        </button>
      </div>

      <div className="form-group">
        <h4>
          Forgot Password?{" "}
          <span>
            <Link to="/forgot-password" tabIndex="5">
              Click here
            </Link>
          </span>
        </h4>
      </div>
    </form>
  );
};

export default SignIn;

import { useFormik } from "formik";
import React from "react";
import { showError } from "../../utils/utils";
// import { userCSVSchema } from "../../utils/schema";

const Settings = () => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: { userCSV: "" },
    // validationSchema: userCSVSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="doctor-wrapper">
      <div className="container container-padd">
        <div className="mid-head mar-20">
          <h2>Recordified Users</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row mar-20">
            <div className=" col-md-2 center input-width">
              <div className="form-group ">
                <input
                  type="file"
                  className="input-control"
                  name="userCSV"
                  onChange={handleChange}
                  value={values.userCSV}
                />
                {showError(errors.userCSV, touched.userCSV)}
              </div>
            </div>

            {/* <div className=" col-md-2 input-width">
              <div className="form-group ">
                <select
                  className="input-control"
                  onChange={handleChange}
                  value={values.status}
                  name="status"
                >
                  <option>select Status</option>
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
              </div>
            </div> */}

            <div className=" col-md-2">
              <div className="form-group ">
                <button className=" btn-md btn-md-blue" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

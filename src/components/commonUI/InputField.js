import React from "react";

const InputField = ({
  title = "title",
  name = "name",
  value = "",
  disable = false,
  handleBlur = (n) => n,
  handleChange = (n) => n,
  errors = {},
  touched = {},
  type = "text",
  options = [{ name: "Option", value: "option" }],
}) => {
  if (type === "select") {
    return (
      <div className=" col-md-6 ">
        <label>
          {title}
          <span>*</span>
        </label>
        <select
          className="input-control"
          name="roleType"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          disabled={disable}
        >
          <option>Select</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>{" "}
        {showError(errors.roleType, touched.roleType)}
      </div>
    );
  }
  return (
    <div className=" col-md-6 ">
      <label>{title}</label>
      <input
        type={type}
        className="input-control"
        placeholder={title}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        disabled={disable}
      />
      {showError(errors, touched)}
    </div>
  );
};

export default InputField;

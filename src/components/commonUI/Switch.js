import React, { useEffect, useState } from "react";
import "../../styles/UI.css";

export default function Switch({
  setFieldValue,
  name,
  switchValue,
  disabled,
  tabIndex,
  handleChange,
  switchId,
}) {
  const [value, setValue] = useState("0");

  useEffect(() => {
    setValue(switchValue === "1");
  }, [switchValue]);

  return (
    <div className="body" tabIndex={tabIndex}>
      <div
        className={`checkbox-switch ${!value && "checkbox--on"}`}
        onClick={() => {
          !disabled && setValue(!value);

          // changing Status using formik
          !disabled &&
            setFieldValue &&
            setFieldValue(name || "status", !value ? "1" : "0");

          // changing Status using custom fn
          !disabled &&
            handleChange &&
            handleChange(!value ? "1" : "0", switchId);
        }}
      >
        <div className="checkbox__ball"></div>
      </div>
    </div>
  );
}


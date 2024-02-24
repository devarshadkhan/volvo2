import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NestedMenu = ({ moduleName, childArray, iconTag }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <div className="menu">
      <NavLink to="#" onClick={() => setShowSubmenu(!showSubmenu)}>
        <i class={iconTag || "fa-solid fa-person-walking"}></i>
        <span>{moduleName} </span>
        <i
          class={
            showSubmenu
              ? "fa-solid fa-sort-down dropDownArrow"
              : "fa-solid fa-caret-right dropDownArrow"
          }
        ></i>
      </NavLink>
      <div className="submenu">
        {showSubmenu
          ? childArray.map((submenu, index) => {
              return (
                <NavLink to={submenu.slug} key={index}>
                  <i
                    class={submenu.iconTag || "fa-solid fa-person-walking"}
                  ></i>
                  <span>{submenu.moduleName}</span>
                </NavLink>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default NestedMenu;

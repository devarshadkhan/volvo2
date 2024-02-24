import React, { useEffect, useState } from "react";
import "../../styles/uac.css";
import { useDispatch, useSelector } from "react-redux";
import { viewUserAccessAction } from "../../redux/slice/uac/viewUserAccessSlice";
import { getRolesAction } from "../../redux/slice/forForms/getRolesSlice";
import UACForm from "./UACForm";
import { useLocation } from "react-router-dom";

const Uac = () => {
  const [selectedRole, setSelectedRole] = useState("2");
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles);
  const updateUserAccess = useSelector((state) => state.updateUserAccess);

  const menu = useSelector((state) => state.menu);

  const url = useLocation().pathname.replace("/", "");

  const permitted = menu.modules.find((m) => m.slug === url);

  useEffect(() => {
    dispatch(getRolesAction());
  }, [updateUserAccess.success]);

  useEffect(() => {
    if (selectedRole !== null) {
      dispatch(
        viewUserAccessAction({
          roleId: selectedRole,
        })
      );
    }
  }, [selectedRole]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="container container-padd">
      {permitted?.isRead === "1" ? (
        <>
          <div className="product-wrap">
            <div className="mid-head mar-20">
              <h2>User Access Control</h2>
            </div>
          </div>
          <div className="product-wrap rolewrap">
            <div className="mid-head mar-20" type="button">
              <label htmlFor="role">Select Role</label>
              <select
                className="filter-product selectcolor "
                name="role"
                id="role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e)}
              >
                {roles.roles?.map((role) => (
                  <option value={role.id}>
                    {/* {role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1)} */}
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mid-table table-responsive-lg">
            <UACForm role={selectedRole} />
          </div>
        </>
      ) : (
        <div className="product-wrap">
          <div className="mid-head mar-20 center ">
            <div className="notfond">
            <h2>No Data Found</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uac;

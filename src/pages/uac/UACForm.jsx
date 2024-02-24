import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { viewUserAccessAction } from "../../redux/slice/uac/viewUserAccessSlice";
import { updateUserAccessAction } from "../../redux/slice/uac/updateUserAccessSlice";
import { notify } from "../../utils/utils";

const UACForm = ({ role }) => {
  const dispatch = useDispatch();
  const viewUserAccess = useSelector((state) => state.viewUserAccess);
  // const roles = useSelector((state) => state.roles);
  const [fireFlag, setFireFlag] = useState(false);
  const updateUserAccess = useSelector((state) => state.updateUserAccess);
  const [initialValues, setInitialValues] = useState({
    users: [
      {
        isAdd: "",
        isUpdate: "",
        isRead: "",
        isDelete: "",
        isStatus: "",
      },
    ],
  });

  useEffect(() => {
    if (updateUserAccess.success) {
      dispatch(
        viewUserAccessAction({
          roleId: role,
        })
      );
    }
  }, [updateUserAccess.success]);

  useEffect(() => {
    if (viewUserAccess.success || updateUserAccess.success) {
      if (Array.isArray(viewUserAccess?.users)) {
        setInitialValues({
          users: viewUserAccess?.users?.map((user) => ({
            ...user,
            isAdd: user.isAdd || "",
            isRead: user.isRead || "",
            isUpdate: user.isUpdate || "",
            isDelete: user.isDelete || "",
            isStatus: user.isStatus || "",
            isSearch: user.isSearch || "",
            isCsv: user.isCsv || "",
          })),
        });
        // setting flag to hit API
        setFireFlag(
          viewUserAccess.users?.every(
            (user) =>
              user.isAdd === "0" &&
              user.isUpdate === "0" &&
              user.isRead === "0" &&
              user.isDelete === "0" &&
              user.isStatus === "0" &&
              user.isSearch === "0" &&
              user.isCsv === "0"
          )
        );
      } else {
        setInitialValues([]);
      }
    }
  }, [viewUserAccess.success, updateUserAccess.success]);

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // when nothing changed
      const nothingChanged = values.users.every(
        (user) =>
          user.isAdd === "0" &&
          user.isUpdate === "0" &&
          user.isRead === "0" &&
          user.isDelete === "0" &&
          user.isStatus === "0" &&
          user.isCsv === "0" &&
          user.isSearch === "0"
      );

      if (fireFlag && nothingChanged) {
        notify("Please check atleast one box", "error");
        return;
      }
      // when chagned
      const transformedData = values.users
        ?.filter(
          (u) =>
            u.isAdd === "1" ||
            u.isRead === "1" ||
            u.isUpdate === "1" ||
            u.isDelete === "1" ||
            u.isStatus === "1" ||
            u.isSearch === "1" ||
            u.isCsv === "1"
        )
        .map((user) => ({
          ...user,
          moduleId: user.moduleId,
          isAdd: user.isAdd,
          isUpdate: user.isUpdate,
          isRead: user.isRead,
          isDelete: user.isDelete,
          isStatus: user.isStatus,
          isCsv: user.isCsv,
          isSearch: user.isSearch,
        }));

      const requestData = {
        userPermission: transformedData,
      };

      dispatch(
        updateUserAccessAction({
          roleId: role,
          data: requestData,
        })
      );
    },
  });

  function roleName(roleId) {
    switch (roleId) {
      case "2":
        return "Support";
      case "3":
        return "Manager";
      case "4":
        return "QA";
      case "5":
        return "Operation";
      case "6":
        return "Agent";
      case "7":
        return "User";
      default:
        return "Unknown";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{roleName(role)}</h3>
      <table
        className="table MobileTable uactable"
        cellSpacing="2"
        cellPadding="0"
        border="0"
      >
        <thead>
          <tr>
            <th scope="col">Access</th>
            <th scope="col"> Add</th>
            <th scope="col">View</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            <th scope="col">Search</th>
            <th scope="col">CSV</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {values.users?.map((user, index) => (
            <tr key={index}>
              <td data-label="Access">{user.moduleName}</td>
              <td data-label="Add">
                <input
                  type="checkbox"
                  name={`users[${index}].isAdd`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isAdd`, newValue);
                  }}
                  checked={user.isAdd === "1"}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="View">
                <input
                  type="checkbox"
                  name={`users[${index}].isRead`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isRead`, newValue);
                  }}
                  checked={user.isRead === "1"}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="Update">
                <input
                  type="checkbox"
                  name={`users[${index}].isUpdate`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isUpdate`, newValue);
                  }}
                  checked={user.isUpdate === "1"}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="Delete">
                <input
                  type="checkbox"
                  name={`users[${index}].isDelete`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isDelete`, newValue);
                  }}
                  checked={user.isDelete === "1"}
                  className="uacCheckbox"
                />
              </td>

              <td data-label="Search">
                <input
                  type="checkbox"
                  name={`users[${index}].isSearch`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isSearch`, newValue);
                  }}
                  checked={user.isSearch === "1"}
                  className="uacCheckbox"
                />
              </td>

              <td data-label="CSV">
                <input
                  type="checkbox"
                  name={`users[${index}].isCsv`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isCsv`, newValue);
                  }}
                  checked={user.isCsv === "1"}
                  className="uacCheckbox"
                />
              </td>

              <td data-label="Status">
                <input
                  type="checkbox"
                  name={`users[${index}].isStatus`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? "1" : "0";
                    setFieldValue(`users[${index}].isStatus`, newValue);
                  }}
                  checked={user.isStatus === "1"}
                  className="uacCheckbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="savebtn">
        <button className="savetable" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default UACForm;

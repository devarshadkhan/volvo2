import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { viewUserAccessAction } from "../../redux/slice/uac/viewUserAccessSlice";
import { createUserAccessAction } from "../../redux/slice/uac/createUserAccessSlice";
import { updateUserAccessAction } from "../../redux/slice/uac/updateUserAccessSlice";
import { notify } from "../../utils/utils";

const SupportUAC = () => {
  const dispatch = useDispatch();
  const viewUserAccess = useSelector((state) => state.viewUserAccess);
  const roles = useSelector((state) => state.roles);
  const createUserAccess = useSelector((state) => state.createUserAccess);
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
    dispatch(
      viewUserAccessAction({
        roleId: roles.roles[2]?.id,
      })
    );
  }, [createUserAccess.success]);

  useEffect(() => {
    if (viewUserAccess.success) {
      if (Array.isArray(viewUserAccess?.users)) {
        setInitialValues({
          users: viewUserAccess?.users?.map((user) => ({
            ...user,
            isAdd: user.isAdd || "",
            isRead: user.isRead || "",
            isUpdate: user.isUpdate || "",
            isDelete: user.isDelete || "",
            isStatus: user.isStatus || "",
          })),
        });
      } else {
        setInitialValues([]);
      }
    }
  }, [viewUserAccess.success]);

  // const initialValues = {
  //   users: viewUserAccess?.users?.map((user) => ({
  //     ...user,
  //     isAdd: user.isAdd || "0",
  //     isRead: user.isRead || "0",
  //     isUpdate: user.isUpdate || "0",
  //     isDelete: user.isDelete || "0",
  //     isStatus: user.isStatus || "0",
  //   })),
  // };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const nothingChanged = values.users.every(
        (user) =>
          user.isAdd === "0" &&
          user.isUpdate === "0" &&
          user.isRead === "0" &&
          user.isDelete === "0" &&
          user.isStatus === "0"
      );
      if (nothingChanged) {
        notify("Please check atleast one box", "error");
        return;
      }

      var allValuesAreZero = viewUserAccess.users.every(
        (user) =>
          user.isAdd === "0" &&
          user.isUpdate === "0" &&
          user.isRead === "0" &&
          user.isDelete === "0" &&
          user.isStatus === "0"
      );

      if (allValuesAreZero) {
        const createRequestData = {
          roleId: roles.roles[2]?.id,
          userId: values.users[0]?.userId,
          userPermission: values.users.map((user) => ({
            moduleId: user.moduleId,
            isAdd: user.isAdd.toString(),
            isUpdate: user.isUpdate.toString(),
            isRead: user.isRead.toString(),
            isDelete: user.isDelete.toString(),
            isStatus: user.isStatus.toString(),
          })),
        };

        dispatch(createUserAccessAction(createRequestData));
      } else {
        const transformedData = values.users.map((user) => ({
          ...user,
          moduleId: user.moduleId,
          isAdd: user.isAdd.toString(),
          isUpdate: user.isUpdate.toString(),
          isRead: user.isRead.toString(),
          isDelete: user.isDelete.toString(),
          isStatus: user.isStatus.toString(),
        }));

        const requestData = {
          userPermission: transformedData,
        };

        dispatch(
          updateUserAccessAction({
            roleId: roles.roles[2]?.id,
            companyId: "Yatharth-HOS-197",
            data: requestData,
          })
        );
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <table
        className="table MobileTable uactable"
        cellSpacing="2"
        cellPadding="0"
        border="0"
      >
        <thead>
          <tr>
            <th scope="col">Access</th>
            <th scope="col">Add</th>
            <th scope="col">View</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
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
                    const newValue = event.target.checked ? 1 : 0;
                    setFieldValue(`users[${index}].isAdd`, newValue);
                  }}
                  checked={user.isAdd == 1}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="View">
                <input
                  type="checkbox"
                  name={`users[${index}].isRead`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? 1 : 0;
                    setFieldValue(`users[${index}].isRead`, newValue);
                  }}
                  checked={user.isRead == 1}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="Update">
                <input
                  type="checkbox"
                  name={`users[${index}].isUpdate`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? 1 : 0;
                    setFieldValue(`users[${index}].isUpdate`, newValue);
                  }}
                  checked={user.isUpdate == 1}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="Delete">
                <input
                  type="checkbox"
                  name={`users[${index}].isDelete`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? 1 : 0;
                    setFieldValue(`users[${index}].isDelete`, newValue);
                  }}
                  checked={user.isDelete == 1}
                  className="uacCheckbox"
                />
              </td>
              <td data-label="Status">
                <input
                  type="checkbox"
                  name={`users[${index}].isStatus`}
                  onChange={(event) => {
                    const newValue = event.target.checked ? 1 : 0;
                    setFieldValue(`users[${index}].isStatus`, newValue);
                  }}
                  checked={user.isStatus == 1}
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

// export default SupportUAC;

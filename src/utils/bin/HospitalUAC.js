import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAccessAction } from "../../redux/slice/uac/updateUserAccessSlice";

const HospitalUAC = () => {
  const dispatch = useDispatch();
  const viewUserAccess = useSelector((state) => state.viewUserAccess);
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

  // const initialValues = {
  //   users: viewUserAccess?.users?.map((user) => ({
  //     ...user,
  //     isAdd: user.isAdd || false,
  //     isRead: user.isRead || false,
  //     isUpdate: user.isUpdate || false,
  //     isDelete: user.isDelete || false,
  //   })),
  // };

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

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const transformedData = values.users.map((user) => ({
        moduleId: user.moduleId,
        isAdd: user.isAdd.toString(),
        isUpdate: user.isUpdate.toString(),
        isRead: user.isRead.toString(),
        isDelete: user.isDelete.toString(),
        isStatus: user.isStatus.toString(),
      }));

      // Create the request data object
      const requestData = {
        userPermission: transformedData,
      };

      dispatch(
        updateUserAccessAction({
          roleId: values.users[0]?.roleId,
          companyId: "Yatharth-HOS-197",
          data: requestData,
        })
      );
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <table
        className="table uactable"
        cellSpacing="2"
        cellPadding="0"
        border="0"
      >
        <thead>
          <tr>
            <th>Access</th>
            <th>Add</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {values.users?.map((user, index) => (
            <tr key={index}>
              <td>{user.moduleName}</td>
              <td>
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
              <td>
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
              <td>
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
              <td>
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
              <td>
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

export default HospitalUAC;

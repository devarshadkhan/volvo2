import React, { useEffect, useState } from "react";
import Confirm from "../../components/commonUI/Confirm";
import Switch from "../../components/commonUI/Switch";
import Pagination from "../../components/commonUI/Pagination";
import AddUser from "./AddUser";
// import "../../styles/Patient.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../redux/slice/users/getAllUsersSlice";
import { getUserByIdAction } from "../../redux/slice/users/getUserByIdSlice";
import { userStatusAction } from "../../redux/slice/users/userStatusSlice";
import { deleteUserAction } from "../../redux/slice/users/deleteUserSlice";
import { getRolesAction } from "../../redux/slice/forForms/getRolesSlice";
import { useFormik } from "formik";
import { searchUserAction } from "../../redux/slice/users/searchUserSlice";
import { searchCSVUsersAction } from "../../redux/slice/users/searchCSVUsersSlice";
import { convertToCSV, isPermitted, showError } from "../../utils/utils";
import { userSearchSchema } from "../../utils/schema";
import { useLocation } from "react-router-dom";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateDoctor, setShowUpdateDoctor] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [forCSV, setForCSV] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users);
  const deleteUser = useSelector((s) => s.deleteUser);
  const addUser = useSelector((s) => s.addUser);
  const userStatus = useSelector((s) => s.userStatus);
  const roles = useSelector((s) => s.roles);
  const searchUser = useSelector((s) => s.searchUser);
  const updateUser = useSelector((s) => s.updateUser);
  const searchCSVUsers = useSelector((s) => s.searchCSVUsers);
  const menu = useSelector((state) => state.menu);
  const userByToken = useSelector((state) => state.userByToken);

  const url = useLocation().pathname.replace("/", "");

  const permitted = menu.modules.find((m) => m.slug === url);

  // Getting Values For Form
  useEffect(() => {
    dispatch(getRolesAction());
    // dispatch(getDepartmentAction());
  }, []);

  useEffect(() => {
    if (values.searchValue || values.status || values.userType) {
      dispatch(searchUserAction({ ...values }));
    } else {
      setTimeout(() => {
        dispatch(getAllUsersAction(pageNumber));
      }, 300);
    }
  }, [
    pageNumber,
    deleteUser.success,
    addUser.success,
    userStatus.success,
    updateUser.success,
  ]);

  const initialValues = {
    searchValue: "",
    status: "",
    userType: "",
  };

  const handleStatusChange = (value, id) => {
    console.log("VALUE_______ID", value, id);
    dispatch(userStatusAction({ data: { status: value }, id }));
  };

  // handling CSV
  useEffect(() => {
    if (searchCSVUsers.success && forCSV) {
      const csvContent = convertToCSV(searchCSVUsers.users);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "users.csv";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setForCSV(false);
    }
  }, [searchCSVUsers.success]);

  // Settting All User on component render
  useEffect(() => {
    setUsersList(users.users);
  }, [users.success, users.users]);

  // setting searched User
  useEffect(() => {
    searchUser.success && setUsersList(searchUser.users);
  }, [searchUser.success]);

  // handling Search
  const { handleChange, handleSubmit, values, resetForm, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: userSearchSchema,
      onSubmit: (data) => {
        console.log("DATA", data);
        let searchData;
        if (!data.searchValue && !data.status && !data.userType) {
          searchData = initialValues;
        } else {
          searchData = data;
        }
        if (forCSV) {
          dispatch(searchCSVUsersAction({ ...data, pageNumber }));
          setForCSV(false);
        } else {
          dispatch(searchUserAction({ ...data, pageNumber: pageNumber }));
        }
      },
    });
  // console.log(usersList);
  // seriel Number for pagination
  const startSerialNumber = pageNumber * 20 + 1;
  return (
    <>
      <div className="doctor-wrapper">
        <div className="container container-padd">
          <div className="mid-head mar-20">
            <h2>Users</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mar-20">
              <div className=" col-lg-3 ">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <input
                      type="text"
                      className="input-control"
                      name="searchValue"
                      placeholder="Search by Name/Email/Mobile Number"
                      onChange={handleChange}
                      value={values.searchValue}
                    />
                    {/* {showError(errors.searchValue, touched.searchValue)} */}
                  </div>
                )}
              </div>

              <div className=" col-lg-3 ">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <select
                      className="input-control"
                      onChange={handleChange}
                      name="userType"
                      value={values.userType}
                    >
                      {" "}
                      <option value="" selected>
                        Select Role
                      </option>
                      {/* <option value="user">User</option>
                      <option value="associate">Associate</option>
                      <option value="team Lead">Team Lead</option>
                      <option value="QA">QA</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option> */}
                      {(userByToken.user?.role == "admin" ||
                        userByToken.user?.role == "user") && (
                        <option value="user">User</option>
                      )}
                      {(userByToken.user?.role == "admin" ||
                        userByToken.user?.role == "user" ||
                        userByToken.user?.role == "manager" ||
                        userByToken.user?.role == "associate" ||
                        userByToken.user?.role == "team Lead") && (
                        <option value="associate">Associate</option>
                      )}
                      {(userByToken.user?.role == "admin" ||
                        userByToken.user?.role == "user" ||
                        userByToken.user?.role == "manager") && (
                        <option value="team Lead">Team Lead</option>
                      )}
                      {/* <option value="QA">QA</option> */}
                      {(userByToken.user?.role == "admin" ||
                        userByToken.user?.role == "user") && (
                        <option value="manager">Manager</option>
                      )}
                      {(userByToken.user?.role == "admin" ||
                        userByToken.user?.role == "user") && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  </div>
                )}
              </div>

              <div className=" col-lg-2">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <select
                      className="input-control"
                      onChange={handleChange}
                      value={values.status}
                      name="status"
                    >
                      {" "}
                      <option value="" selected>
                        Select Status
                      </option>
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
                  </div>
                )}
              </div>

              <div className=" col-lg-2 col-5">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <button className=" btn-md btn-md-blue" type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button
                      className=" btn-md btn-md-blue"
                      type="button"
                      onClick={() => {
                        dispatch(getAllUsersAction(pageNumber));
                        resetForm();
                        setPageNumber(0);
                      }}
                    >
                      <i className="fa-solid fa-rotate-right"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className=" col-lg-2 col-7">
                <div className="aling-right bflex">
                  {isPermitted(permitted?.isCsv) && (
                    <button
                      className=" btn-md btn-md-blue"
                      onClick={() => {
                        setForCSV(true);
                        dispatch(searchCSVUsersAction(values));
                      }}
                      type="button"
                    >
                      <i
                        class="fa-solid fa-file-csv"
                        style={{ fontSize: "21px" }}
                      ></i>
                    </button>
                  )}
                  {isPermitted(permitted?.isAdd) && (
                    <button
                      to="/doctors/add-doctor"
                      className=" btn-md btn-md-blue"
                      type="button"
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/plus.svg`}
                        alt="icon"
                      />
                      Add User
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>

          <div className="mid-table ">
            <table
              className="table MobileTable"
              cellSpacing="2"
              cellPadding="0"
              border="0"
            >
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">User Type</th>
                  {isPermitted(permitted?.isStatus) && (
                    <th scope="col">Status</th>
                  )}
                  {(permitted?.isAdd === "1" ||
                    permitted?.isDelete === "1" ||
                    permitted?.isUpdate === "1" ||
                    permitted?.isRead) && <th scope="col"> Action</th>}
                </tr>
              </thead>
              <tbody>
                {usersList?.dataItems?.length === 0 ? (
                  <tr>
                    <td colSpan={"9"} align="center">
                      <h2 className="mt-5 mb-5"> No User Found!</h2>
                    </td>
                  </tr>
                ) : (
                  usersList?.dataItems?.map((user, index) => {
                    const serialNumber = (startSerialNumber + index)
                      .toString()
                      .padStart(2, "0");

                    return (
                      <tr key={index}>
                        <td data-label="S.No">{serialNumber}</td>
                        <td data-label="Name">
                          {/* {user.fname + " " + user.lname} */}
                          {user?.fname &&
                          user?.lname &&
                          (user?.fname.length > 10 || user?.lname.length > 10)
                            ? `${user?.fname.substring(
                                0,
                                10
                              )}...${user?.lname.substring(0, 10)}...`
                            : `${user?.fname} ${user?.lname}`}
                        </td>
                        <td data-label="UUID">{user?.uuid}</td>
                        <td data-label="Email">{user.email}</td>
                        <td data-label="Mobile No.">{user.phoneNumber}</td>
                        <td data-label="User Type">
                          {user.roleType?.toUpperCase()}
                        </td>
                        {isPermitted(permitted?.isStatus) && (
                          <td data-label="Status" className="tdGape">
                            <Switch
                              switchValue={user.status}
                              switchId={user.id}
                              handleChange={handleStatusChange}
                            />
                          </td>
                        )}
                        <td data-label="Action">
                          {isPermitted(permitted?.isUpdate) && (
                            <button
                              className=" btn-small greenbg"
                              type="button"
                              onClick={() => {
                                setShowUpdateDoctor(true);
                                dispatch(getUserByIdAction(user.id));
                              }}
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/icons-images/edit-small.svg`}
                                alt="icon"
                              />
                            </button>
                          )}
                          <button
                            className=" btn-small yellowbg"
                            onClick={() => {
                              setViewUser(true);
                              dispatch(getUserByIdAction(user.id));
                            }}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/icons-images/view-small.svg`}
                              alt="icon"
                            />
                          </button>

                          {isPermitted(permitted?.isDelete) && (
                            <button
                              className=" btn-small redbg"
                              type="submit"
                              onClick={() => {
                                setShowConfirm(true);
                                setDeleteUserId(user.id);
                              }}
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/icons-images/delete-small.svg`}
                                alt="icon"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {usersList?.dataItems?.length > 0 && (
            <Pagination
              totalPages={usersList?.totalPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItems={usersList?.totalItems}
              pageSize={usersList?.dataItems?.length}
            />
          )}
        </div>
      </div>
      {/* <Outlet /> */}
      <AddUser
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Add User"
        type="add"
      />
      <AddUser
        isOpen={showUpdateDoctor}
        onClose={() => setShowUpdateDoctor(false)}
        title="Update User"
        setIsOpen={setShowUpdateDoctor}
        disabled={false}
        type="update"
      />

      <AddUser
        isOpen={viewUser}
        onClose={() => setViewUser(false)}
        title="View User"
        setIsOpen={setViewUser}
        disabled={true}
        type="view"
      />
      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        handleConfirm={() => {
          dispatch(deleteUserAction(deleteUserId));
        }}
      />
    </>
  );
};

export default Users;

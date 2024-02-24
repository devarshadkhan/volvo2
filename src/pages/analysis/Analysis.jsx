import React, { useEffect, useState } from "react";
import Switch from "../../components/commonUI/Switch.js";
import Success from "../../components/commonUI/Success.js";
import AddUser from "../Users/AddUser.js";
import AddAnalysis from "./AddAnalysis.jsx";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnalysisDataListing } from "../../redux/slice/analysis/getAllAnalysisSlice.js";
import {
  convertDateFormat,
  isPermitted,
  showError,
} from "../../utils/utils.js";
import Pagination from "../../components/commonUI/Pagination.js";
import AnswerModal from "../ticketing/AnswerModal.jsx";
import Confirm from "../../components/commonUI/Confirm.js";
import { deleteAnalysisData } from "../../redux/slice/analysis/deleteAnalysis.js";
import { editUpdateAnalysis } from "../../redux/slice/analysis/updateAnalysis.js";
import { getAnalysisByIdAction } from "../../redux/slice/analysis/getAnalysisByIdSlice.js";
import { createAnalysisData } from "../../redux/slice/analysis/createAnalysis.js";
import { useFormik } from "formik";
import { searchAnalysisAction } from "../../redux/slice/analysis/searchAnalysisSlice.js";
import * as yup from "yup";
import { updateAnalysisStatus } from "../../redux/slice/analysis/updateAnalysisSlice.js";
import { analysisSearchSchema } from "../../utils/schema.js";
import { getRolesAction } from "../../redux/slice/forForms/getRolesSlice.js";

const Analysis = () => {
  const menu = useSelector((state) => state.menu);
  console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", menu);
  const url = useLocation().pathname.replace("/", "");
  console.log("UUUUUUUUUUUU", url);
  const permitted = menu.modules.find((m) => m.slug === "setting");
  // const permitted = menu.modules.find((m) => m.slug === url ? "setting":"");
  console.log("PPPPPPPPPPPPPPPPPP", permitted);
  // Getting Values For Form
  // useEffect(() => {
  //   dispatch(getRolesAction());
  // }, []);
  // useEffect(() => {
  //   dispatch(getAnalysisDataListing(pageNumber));
  // }, []);
  const initialValues = {
    searchKey: "",
    name: "",
    analysisType: "",
  };
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(false);
  const [viewModalData, setViewModalData] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [analysisList, setAnalysisList] = useState([]);
  const deleteAnalysis = useSelector((s) => s.deleteAnalysis);
  const createAnalysis = useSelector((s) => s.createAnalysis);
  const searchAnalysis = useSelector((s) => s.getsearchAnalysis);
  const AnalysisAll = useSelector((s) => s.getAnalysis);
  const updateAnalysis = useSelector((s) => s.updateAnalysis);
  const getAnalysisById = useSelector((s) => s.getAnalysisById);
  const updateStatusAnalysis = useSelector((s) => s.updateStatusAnalysis);

  // yeh search karne per api call hogi
  useEffect(() => {
    if (values.searchKey || values.name || values.analysisType) {
      dispatch(searchAnalysisAction({ ...values }));
    } else {
      setTimeout(() => {
        dispatch(getAnalysisDataListing(pageNumber));
        resetForm();
      }, 300);
    }
    // dispatch(getAnalysisDataListing(pageNumber));
  }, [
    pageNumber,
    deleteAnalysis.success,
    createAnalysis.success,
    updateAnalysis.success,
    // updateStatusAnalysis.success,
  ]);
  // setting searched User

  // isme ham redux se data nikal kar rahe hai
  useEffect(() => {
    setAnalysisList(AnalysisAll.analysisData);
  }, [AnalysisAll.success, AnalysisAll.analysisData]);

  // Data search karne per
  useEffect(() => {
    searchAnalysis?.success && setAnalysisList(searchAnalysis.analysisData);
  }, [searchAnalysis?.success]);

  // Analytisc status change notification type

  const handleStatusChange = (value, id) => {
    if ((value, id)) {
      dispatch(updateAnalysisStatus({ data: { status: value }, id }));
    }
  };

  // handling Search
  const { handleChange, handleSubmit, values, resetForm, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: analysisSearchSchema,
      enableReinitialize: true,
      onSubmit: (data) => {
        // console.log("DATA",data);
        let searchData;
        if (!data.searchKey && !data.name && !data.analysisType) {
          searchData = initialValues;
        } else {
          searchData = data;
        }
        dispatch(searchAnalysisAction({ ...data }));
      },
    });
  const startSerialNumber = pageNumber * 20 + 1;

  return (
    <>
      <div className="doctor-wrapper">
        <div className="container container-padd">
          <div className="mid-head mar-20">
            <h2>Analytics</h2>
          </div>

          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={handleSubmit}>
            <div className="row mar-20">
              <div className=" col-lg-3 ">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <input
                      type="text"
                      className="input-control"
                      placeholder="Search by name"
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                    />
                  </div>
                )}

                {showError(errors.name, touched.name)}
              </div>

              <div className=" col-lg-2">
                {isPermitted(permitted?.isSearch) && (
                  <div className="form-group ">
                    <select
                      className="input-control"
                      onChange={handleChange}
                      value={values.analysisType}
                      name="analysisType"
                    >
                      {" "}
                      <option value="" selected>
                        Analytics Type
                      </option>
                      <option value="1">Resolution</option>
                      <option value="2">Purpose</option>
                    </select>
                  </div>
                )}
                {showError(errors.analysisType, touched.analysisType)}
              </div>

              {isPermitted(permitted?.isSearch) && (
                <>
                  <div className=" col-lg-2 col-5">
                    <div className="form-group ">
                      <button className=" btn-md btn-md-blue" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>

                      <button
                        className=" btn-md btn-md-blue"
                        type="button"
                        onClick={() => {
                          dispatch(getAnalysisDataListing(pageNumber));
                          resetForm();
                          setPageNumber(0);
                        }}
                      >
                        <i className="fa-solid fa-rotate-right"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className=" col-lg-2 col-7 ml-auto">
                {isPermitted(permitted?.isAdd) && (
                  <div className="aling-right bflex">
                    <button
                      to="/doctors/add-doctor"
                      className=" btn-md btn-md-blue ml-auto"
                      type="button"
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/icons-images/plus.svg`}
                        alt="icon"
                      />
                      Add Analytics
                    </button>
                  </div>
                )}
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
                  <th scope="col">Analytics Type</th>
                  {isPermitted(permitted?.isStatus) && (
                    <th scope="col">Status</th>
                  )}
                  <th scope="col">Created Date</th>
               <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {analysisList?.analysisData?.length === 0 ? (
                  <>
                    {" "}
                    <tr>
                      <td colSpan={"9"} align="center">
                        <h2 className="mt-5 mb-5"> No Data Found!</h2>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {analysisList?.analysisData?.map((item, i) => {
                      const serialNumber = (startSerialNumber + i)
                        .toString()
                        .padStart(2, "0");
                      return (
                        <>
                          <tr key={item.id}>
                            <td data-label="S.No">{serialNumber}</td>
                            {/* <td data-label="Name">{item.name}</td> */}
                            {/* `${(e?.title || e?.name)?.substring(0, 10)}...` */}
                            <td data-label="Name">
                              {item.name && item.name.length > 20
                                ? `${item.name.substring(0, 20)}...`
                                : item.name}
                            </td>
                            {/* <td data-label="Name">{`${(item.name)?.substring(0, 20)}...` }</td> */}
                            <td data-label="Analytics Type">
                              {item.analysisType}{" "}
                            </td>
                              {isPermitted(permitted?.isStatus) && (
                            <td data-label="Status" className="tdGape">
                                <Switch
                                  switchValue={item.status}
                                  switchId={item.id}
                                  handleChange={handleStatusChange}
                                />
                            </td>
                              )}
                            <td data-label="Created Date">
                              {convertDateFormat(item.createdAt)}
                            </td>

                            <td>
                              {isPermitted(permitted?.isUpdate) && (
                                <button
                                  className=" btn-small greenbg"
                                  type="button"
                                  onClick={() => {
                                    setEditModalData(item.id);
                                    dispatch(getAnalysisByIdAction(item.id));
                                    // dispatch(getAnalysisByIdAction(item.id))
                                  }}
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/icons-images/edit-small.svg`}
                                    alt="icon"
                                  />
                                </button>
                              )}
                              {/* {isPermitted(permitted?.isRead) && ( */}
                              <button
                                className=" btn-small yellowbg"
                                onClick={() => {
                                  setViewModalData(true);
                                  dispatch(getAnalysisByIdAction(item.id));
                                  // dispatch(getAnalysisDataListing(pageNumber))
                                  // getAnalysisByIdAction(item.id)
                                }}
                              >
                                <img
                                  src={`${process.env.PUBLIC_URL}/icons-images/view-small.svg`}
                                  alt="icon"
                                />
                              </button>
                              {/* )} */}
                              {isPermitted(permitted?.isDelete) && (
                                <button
                                  className=" btn-small redbg"
                                  type="submit"
                                  onClick={() => {
                                    setShowConfirm(true);
                                    setDeleteUserId(item.id);
                                    // handleDel(item.id);
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
                        </>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-col">
            {/* <div className="lefttext">
                <p>Showing Result {fetchData.totalItems} found</p>
              </div> */}
            <div className="lefttext">
              {/* <button class=" btn-small bluebg" type="button">
                  <i class="fa-solid fa-chevron-down"></i>
                </button> */}
              <Pagination
                totalPages={analysisList?.totalPages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalItems={analysisList?.totalItems}
                items={analysisList?.totalItems}
              />
            </div>
          </div>
        </div>
      </div>

      {/* form Modal Open for Added, Edited, and Delete full CRUD operation */}
      <AddAnalysis
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Add Analytics"
        type="add"
      />
      <AddAnalysis
        isOpen={editModalData !== false}
        onClose={() => setEditModalData(false)}
        setIsOpen={setEditModalData}
        title="Update Analytics"
        type="update"
        analysisId={editModalData} // Pass the ID here
      />
      <AddAnalysis
        isOpen={viewModalData}
        onClose={() => setViewModalData(false)}
        setIsOpen={setViewModalData}
        title="View Analytics"
        type="view"
        disabled={true}
      />

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        handleConfirm={() => {
          dispatch(deleteAnalysisData(deleteUserId));
        }}
      />
    </>
  );
};

export default Analysis;

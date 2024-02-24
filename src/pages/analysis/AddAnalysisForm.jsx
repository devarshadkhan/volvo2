import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { showError } from "../../utils/utils";
import { createAnalysisData } from "../../redux/slice/analysis/createAnalysis";
import { useDispatch, useSelector } from "react-redux";
import { getAnalysisType } from "../../redux/slice/analysis/analysisType";
import { editUpdateAnalysis } from "../../redux/slice/analysis/updateAnalysis";
import { getAnalysisByIdAction } from "../../redux/slice/analysis/getAnalysisByIdSlice";
import Success from "../../components/commonUI/Success";
import { getAnalysisDataListing } from "../../redux/slice/analysis/getAllAnalysisSlice";
import { AddAnaliticsSchema } from "../../utils/schema";
import Select from "react-dropdown-select";
const validationSchema = yup.object({
  name: yup
    .string("Enter your Analytics name")
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Analytics name is required"),
  analysisType: yup
    .string("Select Analytics Type")
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Analytics type is required"),
  status: yup
    .string("Select Status")
    .trim("Space are not allowed at start and end")
    .required("Status is required"),
});

const AddAnalysisForm = ({
  onClose,
  disable,
  type,
  analysisId,
  onAdd,
  initialData,
}) => {
  const initialValues = {
    name: "",
    analysisType: "",
    status: "",
  };
  const [success, setSuccess] = useState(false);
  const [routeFlag, setRouteFlag] = useState(false);
  const [userValues, setUserValues] = useState(initialValues);
  const getAnalysisById = useSelector(
    (state) => state.getAnalysisById.analysisData
  );
  const deleteAnalysis = useSelector((s) => s.deleteAnalysis);
  const AnalysisAll = useSelector((s) => s.getAnalysis);
  const updateAnalysis = useSelector((s) => s.updateAnalysis);
  const createAnalysis = useSelector((s) => s.createAnalysis);

  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.analysisType.analysisData);

  useEffect(() => {
    dispatch(getAnalysisType());
  }, []);
  useEffect(() => {
    if (getAnalysisById?.success && routeFlag) {
      setSuccess(true);
    }
  }, [getAnalysisById?.success, routeFlag]);
  useEffect(() => {
    if (createAnalysis?.success && routeFlag) {
      setSuccess(true);
    }
  }, [createAnalysis?.success, routeFlag]);
  useEffect(() => {
    if (updateAnalysis?.success && routeFlag) {
      setSuccess(true);
    }
  }, [routeFlag, updateAnalysis?.success]);
  useEffect(() => {
    if (type === "add") {
      setUserValues(initialValues);
    }
    if (getAnalysisById?.success) {
      if (type === "update" || type === "view") {
        setUserValues({
          ...getAnalysisById.analysisData,
          name: getAnalysisById.analysisData?.name,
          analysisType: getAnalysisById.analysisData?.analysisType,
          status: getAnalysisById.analysisData?.status,
        });
      }
    }
  }, [getAnalysisById]);

  const formik = useFormik({
    
    initialValues: userValues,
    validationSchema: AddAnaliticsSchema,
    enableReinitialize: true, // Add this property
    onSubmit: (values, { resetForm,setFieldValue }) => {
      console.log(values);
      const newValue = {
        name: values.name || "",
        analysisType: values.analysisType || "",
        status: values.status || "",
      };
      // console.log(newValue);

      if (type === "add") {
        dispatch(createAnalysisData(values));
      } else if (type === "update") {
        dispatch(editUpdateAnalysis({ id: analysisId, data: newValue }));
      } else if (type === "view") {
        dispatch(getAnalysisByIdAction(newValue));
      }
      setRouteFlag(true);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="scroll">
          <div className="mar-30">
            <div className="Add-form-group">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label>
                    Analytics name<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Analytics name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    disabled={type === "view" || disable}
                  />
                  {showError(formik.errors.name, formik.touched.name)}
                </div>

                <div className="col-md-6 mb-2">
                  <label>
                    Analytics Type<span>*</span>
                  </label>
                  <select
                    className="input-control"
                    name="analysisType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.analysisType}
                    disabled={type === "view" || disable}
                  >
                    <option value="" defaultValue>
                      Select Analytics Type
                    </option>

                    {fetchData?.data?.map((ele) => {
                      return (
                        <>
                          <option key={ele.id} value={ele.id}>
                            {ele.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  {/* <Select
                  name="analysisType"
                  // options={analyticsTypeOption}
                  options={[
                    { value: "", label: "Choose analytics type" },
                    { value: "1", label: "Resolution" },
                    { value: "2", label: "Purpose" },
                  ]}
                  onChange={(selectedOption) =>
                    formik.setFieldValue("analysisType", selectedOption?.value)
                  }
                  onBlur={formik.handleBlur}
                  value={{
                    value: formik.values.analysisType || "",
                    label:
                    formik.values.analysisType === "1" || formik.values.analysisType === "2"
                        ? formik.values.analysisType === "1"
                          ? "Resolution"
                          : "Purpose"
                        : "Choose analytics type",
                  }}
                  // value={{
                  //   value: values.analysisType || "",
                  //   label:
                  //     values.analysisType === "1" ? "Resolution" : "Purpose",
                  // }}
                  // value={analyticsTypeOption?.find(
                  //   (option) => option.value === values.analysisType
                  // )}
                  placeholder="choose analytics type"
                  // styles={styles}
                  className="react-select-container "
                  classNamePrefix="react-select"
                  menuShouldScrollIntoView={true}
                  onWheel={(e) => e.preventDefault()}
                  // isDisabled={type === "update" ? isDisabled:""}
                /> */}
                  {showError(
                    formik.errors.analysisType,
                    formik.touched.analysisType
                  )}
                </div>

                <div className="col-md-6 mb-2">
                  <label>
                    Status<span>*</span>
                  </label>
                  <select
                    className="input-control"
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    disabled={type === "view" || disable}
                  >
                    <option value="" selected>
                      Select Status
                    </option>
                    <option value="0">Pending</option>
                    <option value="1">Active</option>
                  </select>
                  {showError(formik.errors.status, formik.touched.status)}
                </div>
              </div>
            </div>
            <div className="form-group aling-right">
              <button
                type="button"
                className="btn btn-outline-primary big-btn-padd"
                onClick={onClose}
              >
                Cancel
              </button>
              {!disable && (
                <button
                  type="submit"
                  className="btn btn-primary-big big-btn-padd"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      <Success
        isOpen={success}
        onClose={() => setSuccess(false)}
        message={
          type === "update" ? "Updated successfully!" : "Added Successfully"
        }
        descMessage={`Your informations has been ${
          type === "add" ? "added" : "updated"
        } successfully!`}
        closePreviousModal={onClose}
      />
    </>
  );
};

export default AddAnalysisForm;

// import React, { useEffect, useState } from "react";
// import Success from "../../components/commonUI/Success";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import { createAnalysisData } from "../../redux/slice/analysis/createAnalysis";
// import { editUpdateAnalysis } from "../../redux/slice/analysis/updateAnalysis";
// import { getAnalysisByIdAction } from "../../redux/slice/analysis/getAnalysisByIdSlice";
// import { AddAnaliticsSchema } from "../../utils/schema";
// import { getAnalysisType } from "../../redux/slice/analysis/analysisType";
// const AddAnalysisForm = ({
//     onClose,
//   disable,
//   type,
//   analysisId,
//   onAdd,
//   initialData,
// }) => {
//   useEffect(() => {
//     dispatch(getAnalysisType());
//   }, []);
//   const initialValues = {
//     name: "",
//     analysisType: "",
//     status: "",
//   };
//   const [success, setSuccess] = useState(false);
//   const [routeFlag, setRouteFlag] = useState(false);
//   const [userValues, setUserValues] = useState(initialValues);
//   const getAnalysisById = useSelector(
//     (state) => state.getAnalysisById.analysisData
//   );
//   const deleteAnalysis = useSelector((s) => s.deleteAnalysis);
//   const AnalysisAll = useSelector((s) => s.getAnalysis);
//   const updateAnalysis = useSelector((s) => s.updateAnalysis);
//   const createAnalysis = useSelector((s) => s.createAnalysis);

//   const dispatch = useDispatch();
//   const fetchData = useSelector((state) => state.analysisType.analysisData);
//   // console.log("fetchData", fetchData);
//   useEffect(() => {
//     if (type === "add") {
//       setUserValues(initialValues);
//     }
//     if (getAnalysisById?.success) {
//       if (type === "update" || type === "view") {
//         setUserValues({
//           ...getAnalysisById.analysisData,
//           name: getAnalysisById.analysisData?.name,
//           analysisType: getAnalysisById.analysisData?.analysisType,
//           status: getAnalysisById.analysisData?.status,
//         });
//       }
//     }
//   }, [getAnalysisById?.success]);
//   useEffect(() => {
//     if (getAnalysisById.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [getAnalysisById.success, routeFlag]);
//   useEffect(() => {
//     if (createAnalysis.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [createAnalysis.success, routeFlag]);
//   useEffect(() => {
//     if (updateAnalysis?.success && routeFlag) {
//       setSuccess(true);
//     }
//   }, [routeFlag, updateAnalysis?.success]);

//   const formik = useFormik({
//     initialValues: userValues,
//     validationSchema: AddAnaliticsSchema,
//     enableReinitialize: true, // Add this property
//     onSubmit: (values, { resetForm }) => {
//       console.log(values);
//       const newValue = {
//         name: values.name,
//         analysisType: values.analysisType,
//         status: values.status,
//       };

//       if (type === "add") {
//         dispatch(createAnalysisData(values));
//       } else if (type === "update") {
//         const newValue = {
//           name: values.name,
//           analysisType: values.analysisType,
//           status: values.status,
//         };
//         dispatch(editUpdateAnalysis({ id: values.id, data: newValue }));
//       } else if (type === "view") {
//         dispatch(getAnalysisByIdAction(newValue));
//       }
//       setRouteFlag(true);
//     },
//   });
//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="scroll">
//           <div className="mar-30">
//             <div className="Add-form-group">
//               <div className="row">
//                 <div className="col-md-6 mb-2">
//                   <label>
//                     {" "}
//                     Analytics name<span>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="input-control"
//                     placeholder="Analytics name"
//                     name="name"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.name}
//                     disabled={type === "view" || disable}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <label>
//                     Analytics Type<span>*</span>
//                   </label>
//                   <select
//                     className="input-control"
//                     name="analysisType"
//                   >
//                     <option value="" defaultValue>
//                       Select Analytics Type
//                     </option>
//                     <option value={"1"}>Resolution</option>
//                     <option value={"2"}>Purpose</option>

//                     {/* {fetchData?.data?.map((ele) => {
//                       return (
//                         <>
//                           <option key={ele.id} value={ele.id}>
//                             {ele.name}
//                           </option>
//                         </>
//                       );
//                     })}
//                   {showError(
//                     formik.errors.analysisType,
//                     formik.touched.analysisType
//                   )} */}
//                   </select>
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <label>
//                     Status<span>*</span>
//                   </label>
//                   <select
//                     className="input-control"
//                     name="status"
//                   >
//                     <option value="" selected>
//                       Select Status
//                     </option>
//                     <option value="0">Pending</option>
//                     <option value="1">Active</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group aling-right">
//               <button
//                 type="button"
//                 className="btn btn-outline-primary big-btn-padd"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               {!disable && (
//                 <button
//                   type="submit"
//                   className="btn btn-primary-big big-btn-padd"
//                 >
//                   Save
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>

//       <Success
//         isOpen={success}
//         onClose={() => setSuccess(false)}
//         message={
//           type === "update" ? "Updated successfully!" : "Added Successfully"
//         }
//         descMessage={`Your informations has been ${
//           type === "add" ? "added" : "updated"
//         } successfully!`}
//         closePreviousModal={onClose}
//       />
//     </>
//   );
// };

// export default AddAnalysisForm;

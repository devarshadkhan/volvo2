import * as Yup from "yup";
import { getRole, notify, showTicketFields } from "./utils";

// const emailRegex =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// const SUPPORTED_FORMATS = ["jpg", "jpeg", "png"];
// const csvFormat = ["csv"];

const MAX_FILE_SIZE = 2 * 1024 * 1024; //100KB

// Valid formats
const validFileExtensions = {
  image: ["jpg", "png", "jpeg"],
  excel: ["xlsx"],
  video: ["mp4"],
};

// img validation
const maxSize = (value) => {
  if (!value) {
    return true;
  } else if (typeof value === "string" && value?.includes("http")) {
    return true;
  } else {
    return value && value?.size <= MAX_FILE_SIZE;
  }
};

// img validation
const maxExcelSize = (value) => {
  if (!value) {
    return true;
  } else if (typeof value === "string" && value?.includes("http")) {
    return true;
  } else {
    return value && value[0]?.size <= MAX_FILE_SIZE;
  }
};

// file format validation
const imageFormat = (value) => {
  if (!value) {
    return true;
  } else if (typeof value === "string" && value?.includes("http")) {
    return true;
  } else {
    return isValidFileType(value && value.name?.toLowerCase(), "image");
  }
};

const excelFormat = (value) => {
  if (!value) {
    return true;
  } else if (typeof value === "string" && value?.includes("http")) {
    return true;
  } else {
    return isValidFileType(value && value[0]?.name?.toLowerCase(), "excel");
  }
};

const validImage = Yup.mixed()
  .test("is-valid-type", "Not a valid image type", imageFormat)
  .test("is-valid-size", "Max allowed size is 2MB", maxSize);

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const validPhoneNumber = Yup.string()
  .trim("Phone number cannot include start and end spaces")
  .strict(true)
  .matches(phoneRegExp, "Phone number is not valid")
  .min(10, "Phone number must be atleast 10 characters long")
  .max(10, "Phone number can't be greater than 10 digits.")
  .test("is-not-all-zeros", "Invalid phone number", (value) => {
    return value !== "0000000000";
  });

const validDateOfBirth = Yup.date()
  .nullable() // Makes the dateOfBirth field optional
  .test("valid-date", "Please enter a valid date", function (value) {
    return !value || (value instanceof Date && !isNaN(value));
  })
  .max(new Date(), "Date of Birth cannot be in the future");

const validEmail = Yup.string()
  .trim("The Email can't include space(s) at start and end")
  .strict(true)
  .required("Please enter Email")
  .matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/,
    "Email address is not valid"
  );

export const signInSchema = Yup.object({
  username: Yup.string()
    .trim("The Email can't include space(s) at start and end")
    .strict(true)
    .required("Please enter username"),

  password: Yup.string()
    .trim("The last name cannot include start and end spaces")
    .strict(true)
    .required("Please enter password")
    .min(6, "Invalid password"),
});

export const salaryExcelSchema = Yup.object({
  salaryCSV: Yup.mixed()
    .required("Please select excel file")
    .test("is-valid-type", "Not a valid excel file", excelFormat)
    .test("is-valid-size", "Max allowed size is 2MB", maxExcelSize),
});

export const forgotFormSchema = Yup.object({
  email: validEmail,
});

export const updateProfileSchema = Yup.object().shape({
  profileImage: validImage,
  fname: Yup.string()
    .min(3, "Full name must be at least 3 characters long")
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Please enter first name"),
  lname: Yup.string()
    .min(3, "Please enter atleast 3 characters")
    .trim("Space are not allowed at start and end")
    .strict(true),
  phoneNumber: validPhoneNumber.required("Please enter your number."),
  dateOfBirth: validDateOfBirth,
  email: validEmail,
  gender: Yup.string().required("Please select gender"),
});

// Add Doctor Schema
export const addUserSchema = Yup.object({
  fname: Yup.string()
    .required("Please enter first name")
    .min(3, "Please enter atleast 3 characters")
    .trim("Space are not allowed at start and end")
    .strict(true),
  lname: Yup.string()
    .min(3, "Please enter atleast 3 characters")
    .trim("Space are not allowed at start and end")
    .strict(true),
  roleType: Yup.string().required("Please select role"),
  phoneNumber: validPhoneNumber.required("Please enter your number."),
  dateOfBirth: validDateOfBirth,
  email: validEmail,
  gender: Yup.string().required("Please select gender"),
}).shape({
  profileImage: validImage,
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Add Doctor Schema
export const updateUserSchema = Yup.object({
  fname: Yup.string()
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Please enter first name.")
    .min(3, "Please enter atleast 3 characters"),
  lname: Yup.string()
    .trim("Space are not allowed at start and end")
    .strict(true)
    .min(3, "Please enter atleast 3 characters"),
  roleType: Yup.string().required("Please select role"),
  phoneNumber: validPhoneNumber.required("Please enter your number."),
  email: validEmail,
  dateOfBirth: validDateOfBirth,
  gender: Yup.string().required("Please select gender"),
}).shape({
  profileImage: validImage,
});



export const ticketSearchSchema = Yup.object()
  .shape({
    ticketNo: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, 'Special characters not allowed').min(1, "Please enter atleast 1 characters"),
    searchValue: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, 'Special characters not allowed').min(1, "Please enter atleast 1 characters"),
    teamId: Yup.string(),
    searchStatus: Yup.string(),
    startDate: Yup.string(),
    endDate: Yup.string(),
    analysisType: Yup.string(),
  })
  .test(
    "has-at-least-one-value",
    "At least one field must have a value",
    function (value) {
      const { ticketNo, searchValue, teamId,searchStatus,startDate,endDate ,analysisType} = value;
      if (!ticketNo && !searchValue && !teamId && !searchStatus && !startDate  && !endDate && !analysisType) {
        return this.createError({
          path: "ticketNo",
          message: notify("At least one field must have a value", "error"),
        });
      }
      return true;
    }
);

export const ticketSchema = Yup.object().shape({
  team: Yup.string().when([], {
    is: showTicketFields().teamId,
    then: Yup.string().required("Team is required"),
    otherwise: Yup.string(),
  }),
  manager: Yup.string().when([], {
    is: showTicketFields().managerId,
    then: Yup.string().required("Manager is required"),
    otherwise: Yup.string(),
  }),
  teamLead: Yup.string().when([], {
    is: showTicketFields().tlId,
    then: Yup.string().required("Team Lead is required"),
    otherwise: Yup.string(),
  }),
  agent: Yup.string().when([], {
    is: showTicketFields().agentId,
    then: Yup.string().required("Agent is required"),
    otherwise: Yup.string(),
  }),
});

// changePasswordSchema
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Current password is required"),
  newPassword: Yup.string()
    .trim("Space are not allowed at start and end")
    .strict(true)
    .min(6, "New password must be at least 6 characters")
    .max(20, "Password can't be greater than 20 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export function addTicketSchema() {
  const role = getRole();
  if ( role === "ROLE_ADMIN" || role === "ROLE_SUPPORT" || role === "ROLE_USER" || role === "ROLE_QA") {
    return Yup.object().shape({
      taskQuestion: Yup.string()
        .min(3, "Question must be atlead 3 characters long")
        .trim("Space are not allowed at start and end")
        .strict(true)
        .required("Please enter question"),
      teamId: Yup.string().required("Please select a team"),
      managerId: Yup.string().required("Please select a manager"),
      status: Yup.string().required("Please select status"),
      analysisType: Yup.string().required("Please select analytics type"),
      analysisValue: Yup.string().required("Please select analytics value"),
      noOfDay: Yup.string().required("Please select one value either date and hours"),
    
    });
  } else if (role === "ROLE_MANAGER") {
    return Yup.object().shape({
      taskQuestion: Yup.string()
        .min(3, "Question must be atlead 3 characters long")
        .trim("Space are not allowed at start and end")
        .strict(true)
        .required("Please enter question"),
      tlId: Yup.string().required("Please select a team lead"),
      managerId: Yup.string().required("Please select a manager"),
      teamId: Yup.string().required("Please select a team"),
      status: Yup.string().required("Please select status"),
      analysisType: Yup.string().required("Please select analytics type"),
      analysisValue: Yup.string().required("Please select analytics value"),
      noOfDay: Yup.string().required("Please select one value either date and hours"),
    });
  } else if (role === "ROLE_TEAM LEAD") {
    return Yup.object().shape({
      taskQuestion: Yup.string()
        .min(3, "Question must be atlead 3 characters long")
        .trim("Space are not allowed at start and end")
        .strict(true)
        .required("Please enter question"),
      managerId: Yup.string().required("Please select a manager"),
      teamId: Yup.string().required("Please select a team"),
      tlId: Yup.string().required("Please select a team lead"),
      agentId: Yup.string().required("Please select an agent"),
      status: Yup.string().required("Please select status"),
      analysisType: Yup.string().required("Please select analytics type"),
      analysisValue: Yup.string().required("Please select analytics value"),
      noOfDay: Yup.string().required("Please select one value either date and hours"),
    });
  } else if (role === "ROLE_ASSOCIATE") {
    return Yup.object().shape({
      taskQuestion: Yup.string()
        .min(3, "Question must be atlead 3 characters long")
        .trim("Space are not allowed at start and end")
        .strict(true)
        .required("Please enter question"),
      teamId: Yup.string().required("Please select a team"),
      managerId: Yup.string().required("Please select a manager"),
      agentId: Yup.string().required("Please select an agent"),
      tlId: Yup.string().required("Please select a team lead"),
      status: Yup.string().required("Please select status"),
      analysisType: Yup.string().required("Please select analytics type"),
      analysisValue: Yup.string().required("Please select analytics value"),
      noOfDay: Yup.string().required("Please select one value either date and hours"),
    });
  } else {
    return Yup.object().shape({
      taskQuestion: Yup.string()
        .min(3, "Question must be atlead 3 characters long")
        .trim("Space are not allowed at start and end")
        .strict(true)
        .required("Please enter question"),
        teamId: Yup.string().required("Please select a team"),
        managerId: Yup.string().required("Please select a manager"),
        agentId: Yup.string().required("Please select an agent"),
        tlId: Yup.string().required("Please select a team lead"),
        status: Yup.string().required("Please select status"),
        analysisType: Yup.string().required("Please select analytics type"),
        analysisValue: Yup.string().required("Please select analytics value"),
        // noOfDay: Yup.string().required("Please select one value either date and hours"),
      noOfDay: Yup.string().required("Please select one value either date and hours"),
    });
  }
}
const commonAddUserSchema = {
  fname: Yup.string()
    .required("Please enter first name")
    .min(3, "Please enter atleast 3 characters")
    .trim("Space are not allowed at start and end")
    .strict(true),
  lname: Yup.string()
    .min(3, "Please enter atleast 3 characters")
    .trim("Space are not allowed at start and end")
    .strict(true),
  roleType: Yup.string().required("Please select role"),
  phoneNumber: validPhoneNumber.required("Please enter your number."),
  dateOfBirth: validDateOfBirth,
  email: validEmail,
  gender: Yup.string().required("Please select gender"),
  profileImage: validImage,
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be more than 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
};

export function addUserHandleSchema(role) {
  const commonSchema = Yup.object().shape(commonAddUserSchema);

  if (role === "associate") {
    return commonSchema.concat(
      Yup.object().shape({
        managerId: Yup.string().required("Please select a manager"),
        tlId: Yup.string().required("Please select a team lead"),
      })
    );
  }else if (role === "QA" || role === "team Lead") {
    return commonSchema.concat(
      Yup.object().shape({
        managerId: Yup.string().required("Please select a manager"),
      })
    );
  } else {
    return commonSchema;
  }
}

export const replySchema = Yup.object().shape({
  taskAnswer: Yup.string()
    .trim("Space are not allowed at start and end")
    .strict(true),
});




export const analysisSearchSchema = Yup.object()
  .shape({
    searchKey: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, 'Special characters not allowed').min(1, "Please enter atleast 1 characters"),
    name: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, 'Special characters not allowed').min(1, "Please enter atleast 1 characters"),
    analysisType: Yup.string(),
  })
  .test(
    "has-at-least-one-value",
    "At least one field must have a value",
    function (value) {
      const { searchKey,analysisType,name } = value;
      if ( !searchKey  && !name && !analysisType) {
        return this.createError({
          path: "ticketNo",
          message: notify("At least one field must have a value", "error"),
        });
      }
      return true;
    }
);
export const userSearchSchema = Yup.object()
  .shape({
    searchValue: Yup.string().min(3, "Please enter atleast 3 characters"),
    userType: Yup.string(),
    status: Yup.string(),
  })
  .test(
    "has-at-least-one-value",
    "At least one field must have a value",
    function (value) {
      const { searchValue, userType, status } = value;
      if (!searchValue && !userType && !status) {
        return this.createError({
          path: "searchValue",
          message: notify("At least one field must have a value","error"),
        });
      }
      return true;
    }
);



export const AddAnaliticsSchema = Yup.object({
  name: Yup
    .string("Enter your Analytics name")
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Analytics name is required"),
  analysisType: Yup
    .string("Select Analytics Type")
    .trim("Space are not allowed at start and end")
    .strict(true)
    .required("Analytics type is required"),
  status: Yup
    .string("Select Status")
    .trim("Space are not allowed at start and end")
    .required("Status is required"),
});










































// import * as Yup from "yup";
// import { getRole, notify, showTicketFields } from "./utils";

// // const emailRegex =
// //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// // const SUPPORTED_FORMATS = ["jpg", "jpeg", "png"];
// // const csvFormat = ["csv"];

// const MAX_FILE_SIZE = 2 * 1024 * 1024; //100KB

// // Valid formats
// const validFileExtensions = {
//   image: ["jpg", "png", "jpeg"],
//   excel: ["xlsx"],
//   video: ["mp4"],
// };

// // img validation
// const maxSize = (value) => {
//   if (!value) {
//     return true;
//   } else if (typeof value === "string" && value?.includes("http")) {
//     return true;
//   } else {
//     return value && value?.size <= MAX_FILE_SIZE;
//   }
// };

// // img validation
// const maxExcelSize = (value) => {
//   if (!value) {
//     return true;
//   } else if (typeof value === "string" && value?.includes("http")) {
//     return true;
//   } else {
//     return value && value[0]?.size <= MAX_FILE_SIZE;
//   }
// };

// // file format validation
// const imageFormat = (value) => {
//   if (!value) {
//     return true;
//   } else if (typeof value === "string" && value?.includes("http")) {
//     return true;
//   } else {
//     return isValidFileType(value && value.name?.toLowerCase(), "image");
//   }
// };

// const excelFormat = (value) => {
//   if (!value) {
//     return true;
//   } else if (typeof value === "string" && value?.includes("http")) {
//     return true;
//   } else {
//     return isValidFileType(value && value[0]?.name?.toLowerCase(), "excel");
//   }
// };

// const validImage = Yup.mixed()
//   .test("is-valid-type", "Not a valid image type", imageFormat)
//   .test("is-valid-size", "Max allowed size is 2MB", maxSize);

// function isValidFileType(fileName, fileType) {
//   return (
//     fileName &&
//     validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
//   );
// }

// const validPhoneNumber = Yup.string()
//   .trim("Phone number cannot include start and end spaces")
//   .strict(true)
//   .matches(phoneRegExp, "Phone number is not valid")
//   .min(10, "Phone number must be atleast 10 characters long")
//   .max(10, "Phone number can't be greater than 10 digits.")
//   .test("is-not-all-zeros", "Invalid phone number", (value) => {
//     return value !== "0000000000";
//   });

// const validDateOfBirth = Yup.date()
//   .nullable() // Makes the dateOfBirth field optional
//   .test("valid-date", "Please enter a valid date", function (value) {
//     return !value || (value instanceof Date && !isNaN(value));
//   })
//   .max(new Date(), "Date of Birth cannot be in the future");

// const validEmail = Yup.string()
//   .trim("The Email can't include space(s) at start and end")
//   .strict(true)
//   .required("Please enter Email")
//   .matches(
//     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/,
//     "Email address is not valid"
//   );

// export const signInSchema = Yup.object({
//   username: Yup.string()
//     .trim("The Email can't include space(s) at start and end")
//     .strict(true)
//     .required("Please enter username"),

//   password: Yup.string()
//     .trim("The last name cannot include start and end spaces")
//     .strict(true)
//     .required("Please enter password")
//     .min(6, "Invalid password"),
// });

// export const salaryExcelSchema = Yup.object({
//   salaryCSV: Yup.mixed()
//     .required("Please select excel file")
//     .test("is-valid-type", "Not a valid excel file", excelFormat)
//     .test("is-valid-size", "Max allowed size is 2MB", maxExcelSize),
// });

// export const forgotFormSchema = Yup.object({
//   email: validEmail,
// });

// export const updateProfileSchema = Yup.object().shape({
//   profileImage: validImage,
//   fname: Yup.string()
//     .min(3, "Full name must be at least 3 characters long")
//     .trim("Space are not allowed at start and end")
//     .strict(true)
//     .required("Please enter first name"),
//   lname: Yup.string()
//     .min(3, "Please enter atleast 3 characters")
//     .trim("Space are not allowed at start and end")
//     .strict(true),
//   phoneNumber: validPhoneNumber.required("Please enter your number."),
//   dateOfBirth: validDateOfBirth,
//   email: validEmail,
//   gender: Yup.string().required("Please select gender"),
// });

// // Add Doctor Schema
// export const addUserSchema = Yup.object({
//   fname: Yup.string()
//     .required("Please enter first name")
//     .min(3, "Please enter atleast 3 characters")
//     .trim("Space are not allowed at start and end")
//     .strict(true),
//   lname: Yup.string()
//     .min(3, "Please enter atleast 3 characters")
//     .trim("Space are not allowed at start and end")
//     .strict(true),
//   roleType: Yup.string().required("Please select role"),
//   phoneNumber: validPhoneNumber.required("Please enter your number."),
//   dateOfBirth: validDateOfBirth,
//   email: validEmail,
//   gender: Yup.string().required("Please select gender"),
// }).shape({
//   profileImage: validImage,
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm password is required"),
// });

// // Add Doctor Schema
// export const updateUserSchema = Yup.object({
//   fname: Yup.string()
//     .trim("Space are not allowed at start and end")
//     .strict(true)
//     .required("Please enter first name.")
//     .min(3, "Please enter atleast 3 characters"),
//   lname: Yup.string()
//     .trim("Space are not allowed at start and end")
//     .strict(true)
//     .min(3, "Please enter atleast 3 characters"),
//   roleType: Yup.string().required("Please select role"),
//   phoneNumber: validPhoneNumber.required("Please enter your number."),
//   email: validEmail,
//   dateOfBirth: validDateOfBirth,
//   gender: Yup.string().required("Please select gender"),
// }).shape({
//   profileImage: validImage,
// });

// export const userSearchSchema = Yup.object()
//   .shape({
//     searchValue: Yup.string().min(3, "Please enter atleast 3 characters"),
//     userType: Yup.string(),
//     status: Yup.string(),
//   })
//   .test(
//     "has-at-least-one-value",
//     "At least one field must have a value",
//     function (value) {
//       const { searchValue, userType, status } = value;
//       if (!searchValue && !userType && !status) {
//         return this.createError({
//           path: "searchValue",
//           message: "At least one field must have a value",
//         });
//       }
//       return true;
//     }
//   );

// export const ticketSearchSchema = Yup.object()
//   .shape({
//     ticketNo: Yup.string()
//       .matches(/^[a-zA-Z0-9\s]+$/, "Special characters not allowed")
//       .min(1, "Please enter atleast 1 characters"),
//     searchValue: Yup.string()
//       .matches(/^[a-zA-Z0-9\s]+$/, "Special characters not allowed")
//       .min(1, "Please enter atleast 1 characters"),
//     teamId: Yup.string(),
//     searchStatus: Yup.string(),
//     startDate: Yup.string(),
//     endDate: Yup.string(),
//     analysisType: Yup.string(),
//   })
//   .test(
//     "has-at-least-one-value",
//     "At least one field must have a value",
//     function (value) {
//       const {
//         ticketNo,
//         searchValue,
//         teamId,
//         searchStatus,
//         startDate,
//         endDate,
//         analysisType,
//       } = value;
//       if (
//         !ticketNo &&
//         !searchValue &&
//         !teamId &&
//         !searchStatus &&
//         !startDate &&
//         !endDate &&
//         !analysisType
//       ) {
//         return this.createError({
//           path: "ticketNo",
//           message: notify("At least one field must have a value", "error"),
//         });
//       }
//       return true;
//     }
//   );

// export const ticketSchema = Yup.object().shape({
//   team: Yup.string().when([], {
//     is: showTicketFields().teamId,
//     then: Yup.string().required("Team is required"),
//     otherwise: Yup.string(),
//   }),
//   manager: Yup.string().when([], {
//     is: showTicketFields().managerId,
//     then: Yup.string().required("Manager is required"),
//     otherwise: Yup.string(),
//   }),
//   teamLead: Yup.string().when([], {
//     is: showTicketFields().tlId,
//     then: Yup.string().required("Team Lead is required"),
//     otherwise: Yup.string(),
//   }),
//   agent: Yup.string().when([], {
//     is: showTicketFields().agentId,
//     then: Yup.string().required("Agent is required"),
//     otherwise: Yup.string(),
//   }),
// });

// // changePasswordSchema
// export const changePasswordSchema = Yup.object().shape({
//   oldPassword: Yup.string()
//     .trim("Space are not allowed at start and end")
//     .strict(true)
//     .required("Current password is required"),
//   newPassword: Yup.string()
//     .trim("Space are not allowed at start and end")
//     .strict(true)
//     .min(6, "New password must be at least 6 characters")
//     .max(20, "Password can't be greater than 20 characters")
//     .required("New password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//     .required("Confirm password is required"),
// });

// export function addTicketSchema() {
//   const role = getRole();
//   if ( role === "ROLE_ADMIN" || role === "ROLE_SUPPORT" || role === "ROLE_USER" || role === "ROLE_QA") {
//     return Yup.object().shape({
//       taskQuestion: Yup.string()
//         .min(3, "Question must be atlead 3 characters long")
//         .trim("Space are not allowed at start and end")
//         .strict(true)
//         .required("Please enter question"),
//       teamId: Yup.string().required("Please select a team"),
//       managerId: Yup.string().required("Please select a manager"),
//       status: Yup.string().required("Please select status"),
//       analysisType: Yup.string().required("Please select analyticstype"),
//       analysisValue: Yup.string().required("Please select analyticstype"),
//       // noOfDay: Yup.string().required("Please select one value date and hour"),
//       noOfDay: Yup.string().required("Please select one value date and hour"),
//       // noOfHour: Yup.string().required("Please select one value date and hour"),

//     });
//   } else if (role === "ROLE_MANAGER") {
//     return Yup.object().shape({
//       taskQuestion: Yup.string()
//         .min(3, "Question must be atlead 3 characters long")
//         .trim("Space are not allowed at start and end")
//         .strict(true)
//         .required("Please enter question"),
//       tlId: Yup.string().required("Please select a team lead"),
//       managerId: Yup.string().required("Please select a manager"),
//       teamId: Yup.string().required("Please select a team"),
//       status: Yup.string().required("Please select status"),
//       analysisType: Yup.string().required("Please select analyticstype"),
//       analysisValue: Yup.string().required("Please select analyticstype"),
//       noOfDay: Yup.string().required("Please select one value date and hour"),
//     });
//   } else if (role === "ROLE_TEAM LEAD") {
//     return Yup.object().shape({
//       taskQuestion: Yup.string()
//         .min(3, "Question must be atlead 3 characters long")
//         .trim("Space are not allowed at start and end")
//         .strict(true)
//         .required("Please enter question"),
//       managerId: Yup.string().required("Please select a manager"),
//       teamId: Yup.string().required("Please select a team"),
//       tlId: Yup.string().required("Please select a team lead"),
//       agentId: Yup.string().required("Please select an agent"),
//       status: Yup.string().required("Please select status"),
//       analysisType: Yup.string().required("Please select analyticstype"),
//       analysisValue: Yup.string().required("Please select analyticstype"),
//       noOfDay: Yup.string().required("Please select one value date and hour"),
//     });
//   } else if (role === "ROLE_ASSOCIATE") {
//     return Yup.object().shape({
//       taskQuestion: Yup.string()
//         .min(3, "Question must be atlead 3 characters long")
//         .trim("Space are not allowed at start and end")
//         .strict(true)
//         .required("Please enter question"),
//       teamId: Yup.string().required("Please select a team"),
//       managerId: Yup.string().required("Please select a manager"),
//       agentId: Yup.string().required("Please select an agent"),
//       tlId: Yup.string().required("Please select a team lead"),
//       status: Yup.string().required("Please select status"),
//       analysisType: Yup.string().required("Please select analyticstype"),
//       analysisValue: Yup.string().required("Please select analyticstype"),
//       noOfDay: Yup.string().required("Please select one value date and hour"),
//     });
//   } else {
//     return Yup.object().shape({
//       taskQuestion: Yup.string()
//         .min(3, "Question must be atlead 3 characters long")
//         .trim("Space are not allowed at start and end")
//         .strict(true)
//         .required("Please enter question"),
//       status: Yup.string().required("Please select status"),
//       analysisType: Yup.string().required("Please select analyticstype"),
//       analysisValue: Yup.string().required("Please select analyticstype"),
//       noOfDay: Yup.string().required("Please select one value date and hour"),
//     });
//   }
// }
// // export function addTicketSchema() {
// //   const role = getRole();
// //   const baseSchema = {
// //     taskQuestion: Yup.string()
// //       .min(3, "Question must be at least 3 characters long")
// //       .trim("Spaces are not allowed at the start and end")
// //       .strict(true)
// //       .required("Please enter a question"),
// //     status: Yup.string().required("Please select status"),
// //     analysisType: Yup.string().required("Please select analyticstype"),
// //     analysisValue: Yup.string().required("Please select analyticstype"),
// //   };

// //   const dateAndHourSchema = {
// //     noOfDay: Yup.string().required("Please select one value date and hour"),
// //     noOfHour: Yup.string().required("Please select one value date and hour"),
// //   };

// //   if (
// //     role === "ROLE_ADMIN" ||
// //     role === "ROLE_SUPPORT" ||
// //     role === "ROLE_USER" ||
// //     role === "ROLE_QA"
// //   ) {
// //     return Yup.object()
// //       .shape({
// //         ...baseSchema,
// //         ...dateAndHourSchema,
// //         teamId: Yup.string().required("Please select a team"),
// //         managerId: Yup.string().required("Please select a manager"),
// //       })
// //       .test("Please select one value date and hour", null, (obj) => {
// //         const { noOfDay, noOfHour } = obj;
// //         return noOfDay || noOfHour ? true : false;
// //       });
// //   } else if (role === "ROLE_MANAGER") {
// //     return Yup.object()
// //       .shape({
// //         ...baseSchema,
// //         ...dateAndHourSchema,
// //         tlId: Yup.string().required("Please select a team lead"),
// //         managerId: Yup.string().required("Please select a manager"),
// //         teamId: Yup.string().required("Please select a team"),
// //       })
// //       .test("Please select one value date and hour", null, (obj) => {
// //         const { noOfDay, noOfHour } = obj;
// //         return noOfDay || noOfHour ? true : false;
// //       });
// //   } else if (role === "ROLE_TEAM LEAD") {
// //     return Yup.object()
// //       .shape({
// //         ...baseSchema,
// //         ...dateAndHourSchema,
// //         managerId: Yup.string().required("Please select a manager"),
// //         teamId: Yup.string().required("Please select a team"),
// //         tlId: Yup.string().required("Please select a team lead"),
// //         agentId: Yup.string().required("Please select an agent"),
// //       })
// //       .test("Please select one value date and hour", null, (obj) => {
// //         const { noOfDay, noOfHour } = obj;
// //         return noOfDay || noOfHour ? true : false;
// //       });
// //   } else if (role === "ROLE_ASSOCIATE") {
// //     return Yup.object()
// //       .shape({
// //         ...baseSchema,
// //         ...dateAndHourSchema,
// //         teamId: Yup.string().required("Please select a team"),
// //         managerId: Yup.string().required("Please select a manager"),
// //         agentId: Yup.string().required("Please select an agent"),
// //         tlId: Yup.string().required("Please select a team lead"),
// //       })
// //       .test("Please select one value date and hour", null, (obj) => {
// //         const { noOfDay, noOfHour } = obj;
// //         return noOfDay || noOfHour ? true : false;
// //       });
// //   } else {
// //     return Yup.object()
// //       .shape({
// //         ...baseSchema,
// //         ...dateAndHourSchema,
// //       })
// //       .test("Please select one value date and hour", null, (obj) => {
// //         const { noOfDay, noOfHour } = obj;
// //         return noOfDay || noOfHour ? true : false;
// //       });
// //   }
// // }
// // export function addTicketSchema() {
// //   const role = getRole();

// //   const baseSchema = {
// //     taskQuestion: Yup.string()
// //       .min(3, "Question must be at least 3 characters long")
// //       .trim("Spaces are not allowed at the start and end")
// //       .strict(true)
// //       .required("Please enter a question"),
// //     status: Yup.string().required("Please select status"),
// //     analysisType: Yup.string().required("Please select analyticstype"),
// //     analysisValue: Yup.string().required("Please select analyticstype"),
// //   };

// //   const dateAndHourSchema = {
// //     noOfDay: Yup.string(),
// //     noOfHour: Yup.string(),
// //   };

// //   const commonSchema = Yup.object().shape({
// //     ...baseSchema,
// //     ...dateAndHourSchema,
// //   });

// //   switch (role) {
// //     case "ROLE_ADMIN":
// //     case "ROLE_SUPPORT":
// //     case "ROLE_USER":
// //     case "ROLE_QA":
// //       return commonSchema.shape({
// //         teamId: Yup.string().required("Please select a team"),
// //         managerId: Yup.string().required("Please select a manager"),
// //       }).test("either-date-or-hour", null, (obj) => obj.noOfDay || obj.noOfHour);
// //     case "ROLE_MANAGER":
// //       return commonSchema.shape({
// //         tlId: Yup.string().required("Please select a team lead"),
// //         managerId: Yup.string().required("Please select a manager"),
// //         teamId: Yup.string().required("Please select a team"),
// //       }).test("either-date-or-hour", null, (obj) => obj.noOfDay || obj.noOfHour);
// //     case "ROLE_TEAM LEAD":
// //       return commonSchema.shape({
// //         managerId: Yup.string().required("Please select a manager"),
// //         teamId: Yup.string().required("Please select a team"),
// //         tlId: Yup.string().required("Please select a team lead"),
// //         agentId: Yup.string().required("Please select an agent"),
// //       }).test("either-date-or-hour", null, (obj) => obj.noOfDay || obj.noOfHour);
// //     case "ROLE_ASSOCIATE":
// //       return commonSchema.shape({
// //         teamId: Yup.string().required("Please select a team"),
// //         managerId: Yup.string().required("Please select a manager"),
// //         agentId: Yup.string().required("Please select an agent"),
// //         tlId: Yup.string().required("Please select a team lead"),
// //       }).test("either-date-or-hour", null, (obj) => obj.noOfDay || obj.noOfHour);
// //     default:
// //       return commonSchema.test("either-date-or-hour", null, (obj) => obj.noOfDay || obj.noOfHour);
// //   }
// // }
// const commonAddUserSchema = {
//   fname: Yup.string()
//     .required("Please enter first name")
//     .min(3, "Please enter atleast 3 characters")
//     .trim("Space are not allowed at start and end")
//     .strict(true),
//   lname: Yup.string()
//     .min(3, "Please enter atleast 3 characters")
//     .trim("Space are not allowed at start and end")
//     .strict(true),
//   roleType: Yup.string().required("Please select role"),
//   phoneNumber: validPhoneNumber.required("Please enter your number."),
//   dateOfBirth: validDateOfBirth,
//   email: validEmail,
//   gender: Yup.string().required("Please select gender"),
//   profileImage: validImage,
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .max(20, "Password can't be more than 20 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm password is required"),
// };

// export function addUserHandleSchema(role) {
//   const commonSchema = Yup.object().shape(commonAddUserSchema);

//   if (role === "associate") {
//     return commonSchema.concat(
//       Yup.object().shape({
//         managerId: Yup.string().required("Please select a manager"),
//         tlId: Yup.string().required("Please select a team lead"),
//       })
//     );
//   } else if (role === "QA" || role === "team Lead") {
//     return commonSchema.concat(
//       Yup.object().shape({
//         managerId: Yup.string().required("Please select a manager"),
//       })
//     );
//   } else {
//     return commonSchema;
//   }
// }

// export const replySchema = Yup.object().shape({
//   taskAnswer: Yup.string()
//     .trim("Space are not allowed at start and end")
//     .strict(true),
// });

// export const analysisSearchSchema = Yup.object()
//   .shape({
//     searchKey: Yup.string()
//       .matches(/^[a-zA-Z0-9\s]+$/, "Special characters not allowed")
//       .trim("Search cannot include start and end spaces")
//       .min(1, "Please enter atleast 1 characters"),
//     name: Yup.string()
//       .matches(/^[a-zA-Z0-9\s]+$/, "Special characters not allowed")
//       .min(1, "Please enter atleast 1 characters"),
//     analysisType: Yup.string(),
//   })
//   .test(
//     "has-at-least-one-value",
//     "At least one field must have a value",
//     function (value) {
//       const { searchKey, analysisType, name } = value;
//       if (!searchKey && !name && !analysisType) {
//         return this.createError({
//           path: "ticketNo",
//           message: notify("At least one field must have a value", "error"),
//         });
//       }
//       return true;
//     }
//   );

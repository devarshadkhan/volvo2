import { toast } from "react-toastify";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// Function to call api
// api/apiUtils.js
export async function makeApiRequest(
  url,
  { method = "GET", data = null, token = null, apiKey = null }
) {
  try {
    let newOptions = {
      method,
      body: data,
    };

    const headers = {};

    if (token) {
      headers["x-access-token"] = token;
    }

    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    if (data === null) {
      newOptions = newOptions;
    } else if (data instanceof FormData) {
      newOptions = { ...newOptions, body: data };
    } else {
      headers["Content-Type"] = "application/json";
      newOptions = { ...newOptions, body: JSON.stringify(data) };
    }

    newOptions.method = method;
    newOptions.headers = headers;

    const response = await fetch(
      process.env.REACT_APP_BASE_URL + url,
      newOptions
    );
    const processedData = await response.json();

    if (response.ok) {
      return processedData;
    } else {
      if (response.status === 401) {
        removeUserSession();
        window.location.href = "/";
      }
      throw new Error(processedData.message);
    }
  } catch (error) {
    throw error;
  }
}

export function getRole() {
  const userStr = localStorage.getItem("user");

  try {
    if (userStr) {
      const user = JSON.parse(userStr);

      if (user && user.roles && user.roles.length > 0) {
        return user.roles[0];
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  return false;
}

export function getId(currentRole) {
  const userStr = localStorage.getItem("user");

  let role = "";
  let user = {};
  try {
    if (userStr) {
      user = JSON.parse(userStr);
      if (user && user.roles && user.roles.length > 0) {
        role = user.roles[0];
      } else {
        role = false;
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  if (currentRole === role) {
    return user ? user.id : "";
  }
}

export function showTicketFields() {
  const permissions = {
    managerIdVal: false,
    teamIdVal: false,
    associateIdVal: false,
  };
  const userStr = localStorage.getItem("user");

  let role = "";
  try {
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.roles && user.roles.length > 0) {
        role = user.roles[0];
      } else {
        role = false;
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  if (
    role === "ROLE_ADMIN" ||
    role === "ROLE_SUPPORT" ||
    role === "ROLE_USER" ||
    role === "ROLE_QA"
  ) {
    return { ...permissions, managerIdVal: true };
  } else if (role === "ROLE_MANAGER") {
    return { ...permissions, teamIdVal: true };
  } else if (role === "ROLE_TEAM LEAD") {
    return { ...permissions, managerIdVal: true, associateIdVal: true };
  } else if (role === "ROLE_ASSOCIATE") {
    return {
      ...permissions,
      managerIdVal: true,
      teamIdVal: true,
      associateIdVal: true,
    };
  }

  // If no role matches, return the default permissions
  return permissions;
}

export function formatRelativeDate(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  // Calculate the difference in milliseconds
  const diff = now - date;
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} m`;
  } else if (diffInHours < 24 && now.getDate() === date.getDate()) {
    const hoursAgo = diffInHours === 1 ? "h" : "h";
    return `${diffInHours} ${hoursAgo}`;
  } else if (diffInHours < 48) {
    return "yesterday";
  } else {
    // Format the date as 'YYYY-MM-DD'
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  }
}

// convert csv to object
export const parseCsvToObjectArray = async (csv) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true, // Assumes the first row contains headers
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const readExcel = (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = e.target.result;

        // Use xlsx library to parse the Excel data
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to an array of objects
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);

        console.log(arrayOfObjects);
        // Resolve the promise with the arrayOfObjects
        resolve(arrayOfObjects);
      };

      reader.onerror = function (error) {
        // Reject the promise if there is an error
        reject(error);
      };

      reader.readAsBinaryString(file);
    } else {
      // Reject the promise if no file is provided
      reject(new Error("No file provided"));
    }
  });
};

export function canAssign(id) {
  const permissions = {
    teamCan: true,
    managerCan: true,
    tlCan: true,
    agentCan: true,
  };
  const role = getRole();

  if (!role) {
    return permissions;
  } else if (role === "ROLE_ADMIN" || role === "ROLE_SUPPORT") {
    return { ...permissions, teamCan: false, managerCan: false };
  } else if (role === "ROLE_MANAGER") {
    return { ...permissions, tlCan: false, teamCan: false };
  } else if (role === "ROLE_TL") {
    return { ...permissions, agentCan: false };
  } else if (role === "ROLE_AGENT") {
    return {
      ...permissions,
      agentCan: false,
    };
  } else return permissions;
}

export function parseJSON(jsonString) {
  try {
    // Try to parse the JSON data
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    // Handle the case where the input is not valid JSON
    console.error("Error: Invalid JSON data");
    return null;
  }
}

export function handleFullName({ fullName, fname, lname }) {
  if (fullName) {
    return fullName.length > 15 ? fullName.substring(0, 15) + "..." : fullName;
  } else if (fname) {
    let fullNameStr = "";

    if (fname) {
      fullNameStr += fname + " ";
    }

    if (lname) {
      fullNameStr += lname;
    }

    return fullNameStr.length > 15
      ? fullNameStr.substring(0, 15) + "..."
      : fullNameStr;
  } else {
    return "NA";
  }
}

export const fullNameRoles = ["Role_DOCTOR", "Role_PATIENT"];

// Show Validation Error
export const showError = (error, touched) => {
  if (touched && error) {
    return <div className="error-msg">{error}</div>;
  }
  return null;
};

// return the token from the Localstorage
export const getToken = () => {
  return localStorage.getItem("accessToken") || null;
};

export function isPermitted(...values) {
  // console.log("CHECK", ...values);
  return values.every((value) => value === "1");
}

// remove the token and user from the Localstorage
export const removeUserSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// set the token and user from the Localstorage
export const setUserSession = (token, user) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Return the user data from the LocalStorage storage
export const getCurrentUserLT = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const userRole = () => {
  const user = getCurrentUserLT();
  if (user) {
    return user.roles[0];
  } else {
    return null;
  }
};

// Notification message
export const notify = (message, type = "success") => {
  const option = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  if (type === "success") {
    toast.success(message, option);
  } else if (type === "warn") {
    toast.warn(message, option);
  } else if (type === "error") {
    toast.error(message, option);
  }
};

// Dummy data
export const productTableData = (amount) => {
  const names = [
    "Iphone 14 pro",
    "Samsung S23 Ultra",
    "Realme 10 pro",
    "Google Pixel 5",
    "Vivobook s14",
    "Cobb Jeans",
    "Sparx Shoes",
    "Cannon DSLR",
    "Nike Shoes",
    "Redmi Note 10",
  ];

  const images = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
  ];
  let dummyArray = [];
  for (let i = 0; i < amount; i++) {
    dummyArray.push({
      srNo: i < 9 ? "0" + (i + 1) : `${i + 1}`,
      productName: names[Math.floor(Math.random() * 10)],
      productCode: 100000 + Math.floor(Math.random() * 1000000),
      productImages: images[Math.floor(Math.random() * 4)],
    });
  }
  return dummyArray;
};

export function getFormattedDate(dateString) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const dayNumber = date.getDate();
  const suffix = getNumberSuffix(dayNumber);

  const [dayName, month, , year] = formattedDate.split(" ");

  return `${dayName} ${dayNumber}${suffix} ${month}, ${year}`;
}

function getNumberSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// export const getSerielNumber = (index, page = 0) => {
//   return `${index < 9 ? page : ""}${index + 1}`;
// };
export const getSerielNumber = (index, page = 0) => {
  const serialNumber = page * 10 + (index + 1);
  return serialNumber.toString().padStart(2, "0");
};

export const localDateFormat = (timeStamp) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (timeStamp) {
    const date = new Date(timeStamp);
    let day = 0;
    date.getDate() < 10 ? (day = "0" + date.getDate()) : (day = date.getDate());

    return day + " " + monthNames[date.getMonth()] + ", " + date.getFullYear();
  } else {
    return "dd-mm-yy";
  }
};

// reverse date
// export function reverseDate(dateString) {
//   const dateParts = dateString?.toString()?.split("-" || " ");
//   if (dateParts) {
//     const year = dateParts[0];
//     const month = dateParts[1];
//     const day = dateParts[2];
//     return `${day}-${month}-${year}`;
//   } else {
//     return "NA";
//   }
// }

export function reverseDate(dateString) {
  const monthHash = {
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
  };
  const dateParts = dateString?.toString()?.split(" ");
  if (dateParts) {
    const year = dateParts[3];
    // const month = dateParts[1];
    const month = monthHash[dateParts[1].toLowerCase()] || dateParts[1];
    const day = dateParts[2];
    return `${day}-${month}-${year}`;
  } else {
    return "NA";
  }
}

// export const inputDate = (date) => {
//   const newDate = new Date(date);
//   const day =
//     newDate.getDay() < 10
//       ? "0" + (newDate.getDay() + 1)
//       : "" + (newDate.getDay() + 1);
//   const month =
//     newDate.getMonth() < 10
//       ? "0" + (newDate.getMonth() + 1)
//       : "" + (newDate.getMonth() + 1);
//   const year = newDate.getFullYear();
//   return day + "-" + month + "-" + year;
// };

export function inputDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 to get the correct month (0 - 11)
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return formattedDate;
}

export const getOrderStatus = (status) => {
  const allStatus = [
    "Draft",
    "Pending",
    "Payment Failed",
    "Cancel",
    "RTO",
    "Completed",
    "Shipped",
  ];
  return allStatus[status - 1];
};

export function convertDateFormat(dateStr) {
  // Create a new Date object with the input date string
  const date = new Date(dateStr);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to the month as it's zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Concatenate the parts in the desired order with slashes
  const convertedDate = `${day}/${month}/${year}`;

  return convertedDate;
}

export function reverseDateFormat(dateStr) {
  if (!dateStr) return "";
  // Split the input date string into day, month, and year
  const [day, month, year] = dateStr && dateStr.split("/");

  // Create a new Date object using the reversed order of parts
  const date = new Date(`${year}-${month}-${day}`);

  // Extract year, month, and day from the Date object
  const reversedYear = date.getFullYear();
  const reversedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const reversedDay = String(date.getDate()).padStart(2, "0");

  // Concatenate the parts in the desired order with dashes
  const convertedDate = `${reversedYear}-${reversedMonth}-${reversedDay}`;

  return convertedDate;
}

export const convertToCSV = (data) => {
  // Convert data to CSV format
  // Implement your CSV conversion logic here
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((item) => Object.values(item).join(","));
  return header + "\n" + rows.join("\n");
};

export function truncateHTML(html, maxLength) {
  // Create a temporary element to parse the HTML
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;

  // Extract the text content and apply the character limit
  const textContent = tempElement.textContent || tempElement.innerText;
  if (textContent.length > maxLength) {
    return textContent.slice(0, maxLength) + "...";
  } else {
    return textContent;
  }
}

export const getFirstLetterName = function (string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// export const inputHtmlDataformateChange = (params) => {
//   // console.log(params);
//   // if (!params) {
//   //   return '';
//   // }

//   // const inputDate = params;
//   // const parts = inputDate.split("/");

//   // // Rearrange the parts
//   // const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

//   // return formattedDate;
// };


export const  formatCustomDate = (inputDate) =>  {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}





// chatbot time chnages 

export const formateChatTime = (params)=>{
  const dateObject = new Date(params);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now - dateObject;

  if (timeDifference < 60000) { // Within the last minute
    return 'just now';
  }

  // Extract date and time components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  // Format the date and time to a more readable string
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

export const formateTimeWithChatEnd = (params) => {
  const dateObject = new Date(params);
  const now = new Date();

  // Extract date and time components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  // Format the date and time to a more readable string with AM/PM
  const formattedTime = dateObject.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  // Check if the message is from today
  if (
    now.getFullYear() === dateObject.getFullYear() &&
    now.getMonth() === dateObject.getMonth() &&
    now.getDate() === dateObject.getDate()
  ) {
    return formattedTime;
  }

  // If it's not from today, return the date and time
  // return `${year}-${month}-${day} ${formattedTime}`;
  return ` ${formattedTime}`;
}


export const  convertFormateDOB = (params)=>{
  if (!params) return ''; 
  const parts = params?.split('/');
  const formattedDateofBirth = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  return formattedDateofBirth
}
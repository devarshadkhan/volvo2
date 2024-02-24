import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/UI.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const markedDates = ["2023-07-15", "2023-07-20", "2023-07-25"];

  // Function to check if a date is in the markedDates array
  const isDateMarked = (date) =>
    markedDates.includes(date.toISOString().split("T")[0]);

  // Function to customize the appearance of individual calendar tiles
  // const tileContent = ({ date }) => {
  //   if (isDateMarked(date)) {
  //     return <span style={{ fontSize: "20px" }}>✔️</span>;
  //   }
  //   return null; // Return null for days without any custom content
  // };

  const tileClassName = ({ date }) => {
    return isDateMarked(date) ? "marked-date" : "";
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="custom-calendar">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        prevLabel="< Prev"
        nextLabel="Next >"
        // tileContent={tileContent}
        tileClassName={tileClassName}
      />
      {/* You can use the selectedDate state here or pass it to other components as needed */}
      {/* {selectedDate && <p>Selected date: {selectedDate.toDateString()}</p>} */}
    </div>
  );
};

export default MyCalendar;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

function BookingCalendar({ bookings, isLoggedIn, onDateChange }) {
  const [bookedDates, setBookedDates] = useState([]);
  const today = new Date();

  console.log(isLoggedIn);
  useEffect(() => {
    const dates = bookings.flatMap((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const dateArray = [];
      while (start <= end) {
        dateArray.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
      return dateArray;
    });

    setBookedDates(dates);
  }, [bookings]);

  const isDateDisabled = (date) => {
    return bookedDates.some(
      (bookedDate) => bookedDate.toDateString() === date.toDateString()
    );
  };

  const handleDateChange = (selectedRange) => {
    if (isLoggedIn && selectedRange) {
      const [start, end] = selectedRange;

      // Cannot book dates that are booked
      const rangeIsValid = !bookedDates.some((bookedDate) => {
        return bookedDate >= start && bookedDate <= end;
      });

      if (!rangeIsValid) {
        alert("Selected range overlaps with already-booked dates!");
        return;
      }

      onDateChange(selectedRange);
    }
  };

  return (
    <div>
      <Calendar
        selectRange={isLoggedIn}
        tileDisabled={({ date }) => isDateDisabled(date)}
        onChange={handleDateChange}
        minDate={today}
        tileClassName={({ date }) => {
          return date.getDay() === 0 ? "sunday" : "";
        }}
      />
    </div>
  );
}

export default BookingCalendar;

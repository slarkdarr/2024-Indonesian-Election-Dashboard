import React from "react";
import "./Filters.css";

const Filters = ({ onYearChange, onMonthChange }) => {
  return (
    <div className="filters">
      <label>
        Year:
        <select onChange={onYearChange}>
          <option value="">All</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </label>
      <label>
        Month:
        <select onChange={onMonthChange}>
          <option value="">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>
      {/* <label>
        Date:
        <input type="date" onChange={onDateChange} />
      </label> */}
    </div>
  );
};

export default Filters;

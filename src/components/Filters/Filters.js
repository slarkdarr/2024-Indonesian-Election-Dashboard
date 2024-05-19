import React from 'react';
import './Filters.css';

const Filters = ({ onMonthChange, onDateChange }) => {
  return (
    <div className="filters">
      <label>
        Month:
        <select onChange={onMonthChange}>
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </label>
      <label>
        Date:
        <input type="date" onChange={onDateChange} />
      </label>
    </div>
  );
};

export default Filters;

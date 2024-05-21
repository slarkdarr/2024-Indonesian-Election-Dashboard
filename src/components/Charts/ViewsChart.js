import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./Chart.css";

const ViewsChart = ({ data, xAxisKey }) => {
  return (
    <div className="chart-container">
      <div className="chart-title">Views in Last 30 Days</div>
      <LineChart width={550} height={300} data={data}>
        <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="viewCount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ViewsChart;

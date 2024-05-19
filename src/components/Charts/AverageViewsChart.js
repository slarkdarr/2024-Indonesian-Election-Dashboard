import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import './Chart.css';

const AverageViewsChart = ({ data, xAxisKey }) => {
  return (
    <div className="chart-container">
      <div className="chart-title">Average Views Day vs Night</div>
      <LineChart width={550} height={300} data={data}>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="day" stroke="#8884d8" />
        <Line type="monotone" dataKey="night" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default AverageViewsChart;

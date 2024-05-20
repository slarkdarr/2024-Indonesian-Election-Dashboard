import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Chart.css";

const SentimentPieChart = ({ data }) => {
  if (!data) {
    return <div>No data available.</div>;
  }
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const sentimentData = [
    { name: "Positive", value: Number.parseInt(data.positive) || 0 },
    { name: "Negative", value: Number.parseInt(data.negative) || 0 },
    { name: "Neutral", value: Number.parseInt(data.neutral) || 0 },
  ];

  return (
    <div className="chart-container">
      <div className="chart-title">Sentiment Analysis</div>
      <PieChart width={400} height={400}>
        <Pie
          data={sentimentData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {sentimentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SentimentPieChart;

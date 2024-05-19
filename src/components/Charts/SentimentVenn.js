import React from 'react';
import './Chart.css';

const SentimentVenn = ({ data }) => {
  const positiveCount = data.reduce((acc, curr) => acc + curr.positive, 0);
  const negativeCount = data.reduce((acc, curr) => acc + curr.negative, 0);
  const neutralCount = data.reduce((acc, curr) => acc + curr.neutral, 0);

  return (
    <div className="chart-container">
      <div className="chart-title">Sentiment Analysis</div>
      <div className="venn-diagram">
        <div className="circle positive">Positive: {positiveCount}</div>
        <div className="circle negative">Negative: {negativeCount}</div>
        <div className="circle neutral">Neutral: {neutralCount}</div>
      </div>
    </div>
  );
};

export default SentimentVenn;

import React from "react";
import "./Chart.css";

const TopVideosTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }
  return (
    <div className="chart-container">
      <div className="chart-title">Top Like & Comment Count of Each Video</div>
      <table className="top-videos-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Likes</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((video) => (
            <tr key={video.videoId}>
              <td>{video.title}</td>
              <td>{video.likeCount}</td>
              <td>{video.commentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopVideosTable;

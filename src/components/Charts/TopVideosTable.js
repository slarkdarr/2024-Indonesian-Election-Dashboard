import React from 'react';
import './Chart.css';

const TopVideosTable = ({ data }) => {
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
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.likes}</td>
              <td>{video.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopVideosTable;

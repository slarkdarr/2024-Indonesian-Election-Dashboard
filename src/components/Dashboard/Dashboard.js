import React, { useState, useEffect } from 'react';
import Filters from '../Filters/Filters';
import ViewsChart from '../Charts/ViewsChart';
import SentimentMap from '../Charts/SentimentMap';
import SentimentVenn from '../Charts/SentimentVenn';
import AverageViewsChart from '../Charts/AverageViewsChart';
import TopVideosTable from '../Charts/TopVideosTable';
import mockData from '../../data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState(mockData);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    let filtered = { ...mockData };

    // Filter by month
    if (selectedMonth) {
      const monthIndex = new Date(`${selectedMonth} 1, 2024`).getMonth();
      filtered.viewsData = mockData.viewsData.filter(
        (data) => new Date(data.date).getMonth() === monthIndex
      );
      filtered.averageViewsData = mockData.averageViewsData.filter(
        (data) => new Date(data.date).getMonth() === monthIndex
      );
      filtered.topVideos = mockData.topVideos.filter(
        (video) => new Date(video.date).getMonth() === monthIndex
      );
      filtered.sentimentData = mockData.sentimentData.filter(
        (data) => new Date(data.date).getMonth() === monthIndex
      );
    }

    // Filter by date and format data for hourly views
    if (selectedDate) {
      const selected = new Date(selectedDate);
      filtered.viewsData = mockData.viewsData.filter(
        (data) => new Date(data.date).toDateString() === selected.toDateString()
      );
      filtered.averageViewsData = mockData.averageViewsData.filter(
        (data) => new Date(data.date).toDateString() === selected.toDateString()
      );
      filtered.topVideos = mockData.topVideos.filter(
        (video) =>
          new Date(video.date).toDateString() === selected.toDateString()
      );
      filtered.sentimentData = mockData.sentimentData.filter(
        (data) => new Date(data.date).toDateString() === selected.toDateString()
      );

      // Simulate hourly data for demonstration
      const hours = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        views: Math.floor(Math.random() * 100),
        day: Math.floor(Math.random() * 300),
        night: Math.floor(Math.random() * 200),
      }));
      filtered.viewsData = hours;
      filtered.averageViewsData = hours;
    }

    // Sort top videos by total likes and comments
    filtered.topVideos = filtered.topVideos.sort(
      (a, b) => b.likes + b.comments - (a.likes + a.comments)
    );

    setFilteredData(filtered);
  }, [selectedMonth, selectedDate]);

  // Calculate overview values based on filtered data
  const totalVideos = filteredData.viewsData.length;
  const totalDuration = totalVideos * 20 * 60; // Assume each video is 20 minutes
  const averageDuration = totalVideos ? totalDuration / totalVideos : 0;

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}H ${mins}M ${secs}S`;
  };

  return (
    <div className="dashboard">
      <h1>Overview of 2024 Indonesian Election</h1>
      <Filters
        onMonthChange={handleMonthChange}
        onDateChange={handleDateChange}
      />
      <div className="stats">
        <div>Total Video: {totalVideos}</div>
        <div>Total Duration: {formatDuration(totalDuration)}</div>
        <div>Average Duration: {formatDuration(averageDuration)}</div>
      </div>
      <div className="charts">
        <ViewsChart
          data={filteredData.viewsData}
          xAxisKey={selectedDate ? 'hour' : 'date'}
        />
        <SentimentMap data={filteredData.sentimentData} />
        <SentimentVenn data={filteredData.sentimentData} />
        <AverageViewsChart
          data={filteredData.averageViewsData}
          xAxisKey={selectedDate ? 'hour' : 'date'}
        />
        <TopVideosTable data={filteredData.topVideos} />
      </div>
    </div>
  );
};

export default Dashboard;

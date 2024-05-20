import React, { useState, useEffect } from "react";
import Filters from "../Filters/Filters";
import ViewsChart from "../Charts/ViewsChart";
import SentimentMap from "../Charts/SentimentMap";
import SentimentPieChart from "../Charts/SentimentPieChart";
import AverageViewsChart from "../Charts/AverageViewsChart";
import TopVideosTable from "../Charts/TopVideosTable";
import mockData from "../../data/mockData";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);
  const [statsData, setStatsData] = useState("");
  const [viewsData, setViewsData] = useState("");
  const [avgViewsData, setAvgViewsData] = useState("");
  const [topVideosData, setTopVideosData] = useState("");
  const [sentimentData, setSentimentData] = useState("");
  const [sentimentLocData, setSentimentLocData] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    let filtered = { ...mockData };
    console.log(selectedMonth);
    console.log(selectedYear);

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

    const fetchData = async () => {
      // Stats Data
      try {
        const response = await axios.get(
          `http://api:3000/stats?year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;
        setStatsData(data.values);
      } catch (error) {
        console.error("Error:", error);
      }
      // Views Data
      try {
        const response = await axios.get(
          `http://api:3000/views/recent-monthly?year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;
        setViewsData(data.values);
      } catch (error) {
        console.error("Error:", error);
      }
      // Avg Views Data
      try {
        const response = await axios.get(
          `http://api:3000/views/average?filter=dayNight&year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;
        setAvgViewsData(data.values);
      } catch (error) {
        console.error("Error:", error);
      }
      // Top Videos Data
      try {
        const response = await axios.get(
          `http://api:3000/videos/sorted?limit=10&year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;
        setTopVideosData(data.values);
      } catch (error) {
        console.error("Error:", error);
      }
      // Sentiment Data
      try {
        const response = await axios.get(`http://api:3000/sentiments?year=${selectedYear}&month=${selectedMonth}`);
        const data = response.data;
        setSentimentData(data.values[0]);
      } catch (error) {
        console.error("Error:", error);
      }
      // Sentiment Location Data
      try {
        const response = await axios.get(
          `http://api:3000/sentiments?group=location&year=${selectedYear}&month=${selectedMonth}`
        );
        const data = response.data;
        setSentimentLocData(data.values);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedMonth, selectedDate]);

  // Calculate overview values based on filtered data
  const totalVideos = statsData.total_rows;
  const totalDuration = statsData.total_duration; // Assume each video is 20 minutes
  const averageDuration = totalVideos ? totalDuration / totalVideos : 0;

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}H ${mins}M ${secs}S`;
  };

  return (
    <div className="dashboard">
      <h1>Overview of 2024 Indonesian Election</h1>
      <Filters
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
        // onDateChange={handleDateChange}
      />
      <div className="stats">
        <div>Total Video: {totalVideos}</div>
        <div>Total Duration: {formatDuration(totalDuration)}</div>
        <div>Average Duration: {formatDuration(averageDuration)}</div>
      </div>
      <div className="charts">
        <ViewsChart
          data={viewsData}
          xAxisKey={selectedDate ? "hour" : "date"}
        />
        <SentimentMap data={sentimentLocData} />
        <SentimentPieChart data={sentimentData} />
        <AverageViewsChart
          data={avgViewsData}
          xAxisKey={selectedDate ? "hour" : "date"}
        />
        <TopVideosTable data={topVideosData} />
      </div>
    </div>
  );
};

export default Dashboard;

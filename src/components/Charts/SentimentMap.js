import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Chart.css";

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const SentimentMap = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const [coordinatesMap, setCoordinatesMap] = useState({});
  const [countryNamesMap, setCountryNamesMap] = useState({});

  useEffect(() => {
    // Fetch country coordinates data
    fetch("/country_coordinates.json")
      .then((response) => response.json())
      .then((data) => setCoordinatesMap(data));

    fetch('/country_names.json')
      .then((response) => response.json())
      .then((data) => setCountryNamesMap(data));
  }, []);

  const getCoordinates = (countryCode) => {
    console.log(countryCode, coordinatesMap[countryCode]);
    return coordinatesMap[countryCode] || [0, 0]; // Default to [0, 0] if not found
  };

  const getCountryName = (countryCode) => {
    return countryNamesMap[countryCode] || [0, 0]; // Default to [0, 0] if not found
  };

  return (
    <div className="chart-container">
      <div className="chart-title">Sentiment Based on Location</div>
      <div className="map-container">
        <MapContainer
          center={[20.593684, 78.96288]}
          zoom={1}
          className="leaflet-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((location) => (
            <Marker
              key={location.location}
              position={getCoordinates(location.location)}
            >
              <Tooltip>
                <span>{getCountryName(location.location)}</span>
                <br />
                <span>Positive: {location.positive}</span>
                <br />
                <span>Negative: {location.negative}</span>
                <br />
                <span>Neutral: {location.neutral}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SentimentMap;

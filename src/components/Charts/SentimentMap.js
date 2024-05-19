import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Chart.css';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const SentimentMap = ({ data }) => {
  return (
    <div className="chart-container">
      <div className="chart-title">Sentiment Based on Location</div>
      <div className="map-container">
        <MapContainer
          center={[-2.5, 117.5]}
          zoom={5}
          className="leaflet-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((location) => (
            <Marker key={location.id} position={location.coords}>
              <Popup>
                {location.name}
                <br />
                Positive: {location.positive}
                <br />
                Negative: {location.negative}
                <br />
                Neutral: {location.neutral}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SentimentMap;

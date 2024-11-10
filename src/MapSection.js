import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const initialCenter = {
  lat: 40.1215,
  lng: -100.4504,
};
const initialZoom = 4;

function MapSection({ selectedLocation }) {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const PIPEDREAM_URL = process.env.REACT_APP_PIPEDREAM_URL;

  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!selectedLocation) return;

    const fetchMarkers = async () => {
      try {
        const response = await fetch(PIPEDREAM_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: selectedLocation }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const formattedMarkers = data.map((item) => ({
          lat: item.lat,
          lng: item.lon,
          score: item.score,
        }));

        setMarkers(formattedMarkers);
        setCenter(formattedMarkers[0]);
        setZoom(12);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchMarkers();
  }, [selectedLocation]);

  return (
    <div className="map-section">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          mapTypeId="hybrid"
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={`Score: ${marker.score}`}
              onClick={() => setCenter({ lat: marker.lat, lng: marker.lng })}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapSection;

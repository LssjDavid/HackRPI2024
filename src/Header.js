// Header.js
import React, { useState } from "react";

function Header({ onLocationSubmit }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  
  const locations = {
    "Brooklyn": "Brooklyn",
    "The Bronx": "The Bronx",
    "Staten Island": "Staten Island",
    "Queens": "Queens",
    "Manhattan": "Manhattan",
    "Albany": "Troy NY",
  };

  const handleSubmit = () => {
    if (selectedLocation) {
      onLocationSubmit(selectedLocation); 
    }
  };

  return (
    <div className="header">
      <h1>EsntrqSimplicity</h1>
      <h3>
        The optimal way to decide on a location for your business. Select a city to get started.
      </h3>
      <div className="buttons">
        {/* Dropdown */}
        <select onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
          <option value="">Select a City/Borough</option>
          {Object.keys(locations).map((city) => (
            <option key={city} value={locations[city]}>
              {city}
            </option>
          ))}
        </select>

        {/* trigger fetch for the backend */}
        <button onClick={handleSubmit} style={{ padding: "5px 10px" }}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Header;

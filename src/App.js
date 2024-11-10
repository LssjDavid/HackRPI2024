import React, { useState } from "react";
import Header from "./Header";
import MapSection from "./MapSection";
import "./styles.css";

function App() {
  const [location, setLocation] = useState("");

  const handleLocationSubmit = (selectedLocation) => {
    setLocation(selectedLocation); 
  };

  return (
    <div className="app">
      <Header onLocationSubmit={handleLocationSubmit} />
      <MapSection selectedLocation={location} />
    </div>
  );
}

export default App;

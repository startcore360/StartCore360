import React from "react";
import Navbar from "./design-system/Navbar";
import Background3D from "./design-system/Background3D";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Background3D />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        {/* Hero content here */}
      </div>
    </>
  );
}

export default App;

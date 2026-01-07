import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./design-system/Navbar";
import Background3D from "./design-system/Background3D";

import Hero from "./components/Hero";
import WhatWeDoSection from "./components/WhatWeDo";
import WhoItsFor from "./components/WhoItsFor";
import ServicesPage from "./components/ServicesPage";
import StartYourStartupPage from "./components/StartYourStartupPage";

import Footer from "./design-system/Footer";

function App() {
  return (
    <Router>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Background3D />

        <Navbar />

        <Hero />
        <WhatWeDoSection />
        <WhoItsFor />
        <ServicesPage />
        <StartYourStartupPage />

        <Footer />
      </div>
    </Router>
  );
}

export default App;

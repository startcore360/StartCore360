import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./design-system/Navbar";
const Background3D = React.lazy(() => import("./design-system/Background3D"));
// const CursorGlow = React.lazy(() => import("./design-system/CursorGlow"));

import Hero from "./components/Hero";

const WhatWeDoSection = lazy(() => import("./components/WhatWeDo"));
const WhoItsFor = lazy(() => import("./components/WhoItsFor"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));
const StartYourStartupPage = lazy(() =>
  import("./components/StartYourStartupPage")
);
const Footer = lazy(() => import("./design-system/Footer"));

function App() {
  return (
    <Router>
      {/* GLOBAL VISUAL LAYERS */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </div>

      {/* APP CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main>
          <Hero />

          <Suspense fallback={null}>
            <WhatWeDoSection />
            <WhoItsFor />
            <ServicesPage />
            <StartYourStartupPage />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

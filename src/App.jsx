import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./design-system/Navbar";

// Lazy components
const Background3D = lazy(() => import("./design-system/Background3D"));
const Hero = lazy(() => import("./components/Hero"));
const HelpDesk = lazy(() => import("./components/HelpDesk"));
const WhatWeDoSection = lazy(() => import("./components/WhatWeDo"));
const WhoItsFor = lazy(() => import("./components/WhoItsFor"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));
const StartYourStartupPage = lazy(() =>
  import("./components/StartYourStartupPage")
);
const Footer = lazy(() => import("./design-system/Footer"));

const SectionFallback = () => <div style={{ minHeight: "60vh" }} />;

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
          <Suspense fallback={<SectionFallback />}>
            <Hero />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <WhatWeDoSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <WhoItsFor />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ServicesPage />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <StartYourStartupPage />
          </Suspense>

          <Suspense fallback={null}>
            <HelpDesk />
          </Suspense>
        </main>

        <Suspense fallback={<div style={{ height: 120 }} />}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

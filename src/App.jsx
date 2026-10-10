import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Releases from './pages/Releases';
import Artists from './pages/Artists';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

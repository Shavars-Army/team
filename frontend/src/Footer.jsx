import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Support from './support.jsx';
import Impressum from './impressum.jsx';
import Info from './info.jsx';
import Karriere from './karriere.jsx';

function Footer() {
  return (
    <Router>
      <div>
        <div>
          <p>&copy; 2024 Ihr Unternehmen. Alle Rechte vorbehalten.</p>
          <p>Impressum: <Link to="/impressum">Impressum</Link></p>
          <p>Support: <Link to="/support">Support</Link></p>
          <p>Über uns: <Link to="/info">Info</Link></p>
          <p>Karriere: <Link to="/karriere">Karriere</Link></p>
        </div>
        <Routes>
          <Route path="/support" element={<Support />} />
          <Route path="/info" element={<Info />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/karriere" element={<Karriere />} />

        </Routes>
      </div>
    </Router>
  );
}

export default Footer;

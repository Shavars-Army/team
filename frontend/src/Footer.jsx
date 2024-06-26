import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Support from './support.jsx';
import Impressum from './impressum.jsx';
import Info from './info.jsx';
import Karriere from './karriere.jsx';
import "./footer.css"

function Footer() {
  return (
    <Router>
      <div className="footer">
        <div>
          <p><Link to="/info">Info</Link>   <Link to="/karriere">Karriere</Link>   <Link to="/support">Support</Link></p>
          <p><Link to="/impressum">Impressum</Link></p>
          <p>&copy; 2024 Ihr Unternehmen. Alle Rechte vorbehalten.</p>
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

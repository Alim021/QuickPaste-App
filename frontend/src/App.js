import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PasteView from './components/PasteView';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paste/:id" element={<PasteView />} />
          <Route path="/about" element={<div className="page">About Page</div>} />
          <Route path="/features" element={<div className="page">Features Page</div>} />
          <Route path="*" element={<div className="page">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
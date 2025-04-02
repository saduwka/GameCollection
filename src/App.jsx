import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to the Retro Gaming App</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* другие маршруты */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
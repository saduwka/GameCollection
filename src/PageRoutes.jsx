import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ConsolePage from './pages/ConsolePage/ConsolePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/console/:id" element={<ConsolePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
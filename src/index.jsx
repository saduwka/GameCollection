// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/global.css';  // Подключение глобальных стилей

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
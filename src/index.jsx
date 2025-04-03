import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom"; // Подключаем BrowserRouter
import "./assets/styles/global.css"; // Подключение глобальных стилей

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Оборачиваем приложение в Router */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

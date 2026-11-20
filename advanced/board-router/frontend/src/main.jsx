// main.jsx - 앱의 시작점
//   기초 과정과 달라진 점: <BrowserRouter> 로 감싸 Router 기능을 켰다 (4장).

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// main.jsx - 앱의 시작점
//   기초 과정과 달라진 점: <BrowserRouter> 로 감싸 Router 기능을 켰다 (4장).

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

// index.html 의 <div id="root"> 를 찾아 그 안에 React 앱을 그린다
createRoot(document.getElementById("root")).render(
  // StrictMode: 개발 중에만 실수(부작용 등)를 더 잘 찾도록 검사를 켠다. 화면에는 아무것도 그리지 않는다
  <StrictMode>
    {/* BrowserRouter: 브라우저 주소창과 React 를 이어 준다. 이 안쪽에서만 Route·Link·useNavigate 를 쓸 수 있다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// main.jsx - 앱의 시작점 + Router 켜기
//
// 이 파일이 보여 주는 것
//   - <BrowserRouter> 로 앱 전체를 감싸면, 그 안쪽 어디서든 Routes·Link·useNavigate 등
//     Router 기능을 쓸 수 있다. (앱에 딱 한 번만 감싼다)
//   - BrowserRouter 는 브라우저 주소창의 주소(/users/2 등)를 읽고 바꾸는 일을 맡는다.

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

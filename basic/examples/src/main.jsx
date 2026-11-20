// main.jsx - 앱의 시작점 (Vite 가 index.html 에서 가장 먼저 불러오는 파일)
//
// 이 파일이 하는 일
//   - index.html 의 <div id="root"> 를 찾아서 그 안에 <App /> 을 그린다.
//   - StrictMode 는 개발 중에만 동작하는 "실수 찾기 도우미". 화면에는 아무것도 그리지 않는다.
//     (개발 모드에서 컴포넌트·useEffect 를 일부러 한 번 더 실행해 본다 → 콘솔 로그가 두 번 보이는 이유)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // 전체 스타일
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

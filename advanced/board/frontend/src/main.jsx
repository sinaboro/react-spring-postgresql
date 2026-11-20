// main.jsx - 앱의 시작점
//   <BrowserRouter> : Router 기능 켜기 (4장)
//   <AuthProvider>  : 로그인 상태를 앱 전체에 공급 (9장)
//     AuthProvider 안에서도 Router 기능(useNavigate 등)을 쓸 수 있도록 BrowserRouter 가 바깥에 있다.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

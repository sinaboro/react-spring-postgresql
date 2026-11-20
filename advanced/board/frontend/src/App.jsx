// App.jsx - 주소 → 화면 지도 (9장: 로그인 화면과 보호된 화면 추가)
//
//   주소                 화면              누가?
//   /                    PostListPage      누구나   (?mine=1 이면 내 글만)
//   /posts/:id           PostDetailPage    누구나   (수정·삭제 버튼은 글쓴이에게만 보임)
//   /posts/new           PostFormPage      로그인한 사람    ← ProtectedRoute
//   /posts/:id/edit      PostFormPage      로그인한 사람    ← ProtectedRoute (+ 서버가 본인인지 검사)
//   /login               LoginPage         누구나
//   /signup              SignupPage        누구나

import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostFormPage from "./pages/PostFormPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PostListPage />} />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <PostFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <PostFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

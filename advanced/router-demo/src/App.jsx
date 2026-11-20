// App.jsx - "주소 → 화면" 지도 (라우트 설정)
//
// 이 파일이 보여 주는 것
//   - <Routes> 안에 <Route path="주소" element={<화면 />} /> 를 나열한다.
//     지금 주소와 맞는 Route 하나의 element 만 그려진다.
//   - 중첩 라우트: 바깥 Route(Layout) 안에 안쪽 Route 들을 넣으면,
//     Layout 의 <Outlet /> 자리에 안쪽 화면이 들어간다 → 머리글·메뉴를 모든 화면이 함께 쓴다.
//   - index      : 부모 주소(/) 그대로일 때 보여 줄 화면
//   - :userId    : 주소의 그 자리 값을 변수처럼 받는다 (useParams 로 꺼냄)
//   - path="*"   : 위의 어느 것과도 맞지 않는 주소 → 404 화면
//
//   주소              화면
//   /                 HomePage
//   /about            AboutPage
//   /users            UserListPage
//   /users/2          UserDetailPage (userId = "2")
//   /아무거나         NotFoundPage

import { Route, Routes } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} /> {/* 앞에 / 를 안 쓰면 부모 주소 뒤에 붙는다 → /about */}
        <Route path="users" element={<UserListPage />} />
        <Route path="users/:userId" element={<UserDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

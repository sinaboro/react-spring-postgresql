// Layout.jsx - 모든 화면이 함께 쓰는 머리글 + 본문 자리(Outlet)
//   기초 과정 App.jsx 의 <header> 부분이 여기로 옮겨 왔다.
//   제목을 누르면 목록으로: onClick={goList} 대신 <Link to="/">

import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          📋 React 게시판
        </Link>
        <span className="badge">Router</span>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;

// Layout.jsx - 머리글 + 본문 자리 (9장: 로그인 상태 표시 추가)
//   로그인했으면 "닉네임 님 · 로그아웃", 아니면 "로그인 · 회원가입" 링크.
//   useAuth() 로 꺼내므로 App 이 props 로 user 를 내려줄 필요가 없다 (Context 의 힘).

import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // 로그아웃하면 목록으로
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          📋 React 게시판
        </Link>
        <span className="badge">로그인</span>
        <nav className="auth-nav">
          {user ? (
            <>
              <span>
                <strong>{user.nickname}</strong> 님
              </span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="button">
                로그인
              </Link>
              <Link to="/signup" className="button primary">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;

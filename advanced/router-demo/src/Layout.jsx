// Layout.jsx - 모든 화면이 함께 쓰는 틀 (머리글 + 메뉴 + 본문 자리)
//
// 이 파일이 보여 주는 것
//   - <Link to="/about"> : <a href> 처럼 보이지만 페이지를 새로 받지 않고 화면만 바꾼다.
//                          (그래서 state 가 날아가지 않고 빠르다)
//   - <NavLink>          : Link 와 같은데, 지금 주소와 맞으면 class="active" 가 자동으로 붙는다
//                          → 지금 어느 메뉴에 있는지 표시하기 좋다
//   - <Outlet />         : App.jsx 에서 이 Layout 안에 넣은 화면(자식 Route)이 그려질 자리

import { Link, NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          🚦 Router 연습
        </Link>
        <nav>
          {/* end : "/" 는 모든 주소의 앞부분이므로, 정확히 "/" 일 때만 active 가 되게 한다 */}
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/about">소개</NavLink>
          <NavLink to="/users">사용자</NavLink>
          <NavLink to="/nothing">없는 주소</NavLink>
        </nav>
      </header>
      <main>
        <Outlet /> {/* ← 여기에 HomePage, AboutPage ... 중 하나가 들어온다 */}
      </main>
    </div>
  );
}

export default Layout;

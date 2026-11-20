// NotFoundPage.jsx - 없는 주소일 때 ( path="*" )
//   useLocation() 으로 지금 주소 정보를 읽어 어떤 주소로 왔는지 보여 준다.

import { Link, useLocation } from "react-router";

function NotFoundPage() {
  const location = useLocation(); // { pathname: "/nothing", search: "", ... }
  return (
    <div>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>
        요청한 주소: <code>{location.pathname}</code>
      </p>
      <Link to="/">홈으로</Link>
    </div>
  );
}

export default NotFoundPage;

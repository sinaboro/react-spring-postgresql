// ProtectedRoute.jsx - 로그인한 사람만 들어올 수 있는 화면을 감싸는 "문지기"
//
// 이 파일이 보여 주는 것
//   - 로그인 안 했으면 <Navigate> 로 /login 에 보낸다. (그리는 순간 주소를 바꾸는 컴포넌트)
//   - state={{ from: 원래 가려던 주소 }} 를 함께 넘겨, 로그인 후 그 주소로 되돌려 보낸다.
//   - replace : 막힌 주소를 방문 기록에 남기지 않는다 (뒤로 가기를 눌러도 다시 튕기지 않게)
//   - 로그인했으면 감싼 화면(children)을 그대로 보여 준다.
//
//   ※ 이것은 "화면" 을 막을 뿐이다. 진짜 보안은 서버(Spring Boot)가 토큰을 검사하는 것이다.
//     주소를 직접 쳐서 들어와도, 개발자 도구로 요청을 보내도 서버가 401/403 으로 막는다.

import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default ProtectedRoute;

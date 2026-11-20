// NotFoundPage.jsx - 없는 주소 ( path="*" )
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="info">
      <h2>404 - 없는 페이지입니다</h2>
      <Link to="/">목록으로 가기</Link>
    </div>
  );
}

export default NotFoundPage;

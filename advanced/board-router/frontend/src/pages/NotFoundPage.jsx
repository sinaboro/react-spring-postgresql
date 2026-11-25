// NotFoundPage.jsx - 없는 주소 ( path="*" )
//   App.jsx 의 <Route path="*"> 에 연결된다. * 는 "위의 어떤 주소에도 맞지 않으면" 이라는 뜻.
//   /abc 처럼 없는 주소로 들어오면 빈 화면 대신 이 안내를 보여 준다.
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="info">
      <h2>404 - 없는 페이지입니다</h2>
      {/* <a href> 대신 <Link>: 페이지를 새로 받지 않고 React 안에서 주소만 바꾼다 (4장) */}
      <Link to="/">목록으로 가기</Link>
    </div>
  );
}

export default NotFoundPage;

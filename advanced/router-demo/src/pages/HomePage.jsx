// HomePage.jsx - 첫 화면 ( / )
//
// 이 파일이 보여 주는 것
//   - useNavigate() 가 돌려주는 navigate 함수로 "코드에서" 주소를 바꾼다.
//     Link 는 사용자가 누르는 링크, navigate 는 저장 성공 후 이동처럼 코드가 이동시킬 때 쓴다.

import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>홈</h2>
      <p>위 메뉴를 눌러 보세요. 주소창의 주소가 바뀌는데도 페이지가 깜빡이지 않습니다.</p>
      <button onClick={() => navigate("/users")}>사용자 목록으로 이동 (navigate)</button>
      <button onClick={() => navigate("/users/2")}>2번 사용자 바로 가기</button>
    </div>
  );
}

export default HomePage;

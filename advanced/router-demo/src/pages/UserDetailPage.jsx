// UserDetailPage.jsx - 사용자 한 명 ( /users/:userId )
//
// 이 파일이 보여 주는 것
//   - useParams() 로 주소의 :userId 자리 값을 꺼낸다. 값은 항상 "문자열" 이다 ("2")
//     → 숫자 id 와 비교하려면 Number() 로 바꾼다.
//   - 없는 번호(/users/99)면 안내 문구를 보여 준다.
//   - navigate(-1) : 브라우저의 "뒤로 가기" 와 같다.

import { useNavigate, useParams } from "react-router";
import { USERS } from "../data";

function UserDetailPage() {
  const { userId } = useParams(); // App.jsx 의 path="users/:userId" 에서 이름이 정해졌다
  const navigate = useNavigate();
  const user = USERS.find((u) => u.id === Number(userId));

  if (!user) {
    return (
      <div>
        <h2>사용자를 찾을 수 없습니다 (번호 {userId})</h2>
        <button onClick={() => navigate("/users")}>목록으로</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>직업: {user.job}</p>
      <p>{user.bio}</p>
      <button onClick={() => navigate(-1)}>← 뒤로</button>
      {/* 다음 사람으로: 주소만 바뀌고 같은 컴포넌트가 새 userId 로 다시 그려진다 */}
      {user.id < USERS.length && <button onClick={() => navigate(`/users/${user.id + 1}`)}>다음 사람 →</button>}
    </div>
  );
}

export default UserDetailPage;

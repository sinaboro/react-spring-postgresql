// UserListPage.jsx - 사용자 목록 ( /users )
//
// 이 파일이 보여 주는 것
//   - 목록의 각 항목을 <Link to={`/users/${id}`}> 로 만들어 상세 주소로 연결한다.
//   - useSearchParams : 주소 끝의 ?q=김 같은 "검색 조건" 을 읽고 바꾼다.
//     검색어를 state 가 아니라 주소에 두면, 새로 고침·뒤로 가기를 해도 검색 결과가 유지된다.

import { Link, useSearchParams } from "react-router";
import { USERS } from "../data";

function UserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? ""; // ?q=... 가 없으면 빈 글자

  const filtered = USERS.filter((u) => u.name.includes(q));

  return (
    <div>
      <h2>사용자 ({filtered.length}명)</h2>
      <input
        value={q}
        // 입력할 때마다 주소가 /users?q=입력값 으로 바뀐다. 빈 칸이면 ?q 를 없앤다
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
        placeholder="이름 검색"
      />
      <ul>
        {filtered.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link> - {u.job}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserListPage;

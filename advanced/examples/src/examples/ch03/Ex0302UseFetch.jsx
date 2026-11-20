// Ex0302UseFetch.jsx - useFetch 훅으로 데이터 불러오기
//
// 이 예제가 보여 주는 것
//   - 기초 과정의 Ex0802Fetch 와 같은 일을 하는데, 컴포넌트 코드는 훨씬 짧다.
//   - 같은 훅을 다른 주소로 두 번 써도 서로 섞이지 않는다.
//   - reload() 로 다시 불러오기

import { useFetch } from "../../hooks/useFetch";

function UserList() {
  const { data: users, loading, error, reload } = useFetch("/data/users.json");
  // data: users → 꺼내면서 이름을 users 로 바꾼다 (구조 분해의 이름 바꾸기)

  if (loading) return <p>⏳ 불러오는 중...</p>;
  if (error) return <p style={{ color: "crimson" }}>⚠️ {error}</p>;
  return (
    <div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
    </div>
  );
}

function Broken() {
  const { error, loading } = useFetch("/data/없는파일.json");
  if (loading) return <p>⏳ 불러오는 중...</p>;
  return <p style={{ color: "crimson" }}>⚠️ {error}</p>;
}

function Ex0302UseFetch() {
  return (
    <div>
      <h3>사용자 목록</h3>
      <UserList />
      <h3>없는 주소</h3>
      <Broken />
    </div>
  );
}

export default Ex0302UseFetch;

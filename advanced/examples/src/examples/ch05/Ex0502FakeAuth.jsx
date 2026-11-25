// Ex0502FakeAuth.jsx - 로그인 상태를 Context 로 나눠 쓰기 (9장 미리 보기)
//
// 이 예제가 보여 주는 것
//   - Header, WriteButton, LoginBox 가 서로 props 를 주고받지 않는데도
//     같은 로그인 상태를 보고 함께 바뀐다.
//   - 로그인 여부에 따라 버튼을 보여 주거나 숨기는 조건부 렌더링 (기초 5장)

import { useState } from "react";
import { FakeAuthProvider, useFakeAuth } from "../../context/FakeAuthContext";

// 머리글: 로그인했으면 닉네임과 로그아웃 단추
function Header() {
  const { user, logout } = useFakeAuth(); // props 없이 Context 에서 바로 꺼낸다
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 8, background: "#1f3a5f", color: "white" }}>
      <strong>내 게시판</strong>
      {user ? (
        <span>
          {user.nickname} 님 <button onClick={logout}>로그아웃</button>
        </span>
      ) : (
        <span>로그인하지 않음</span>
      )}
    </div>
  );
}

// 글쓰기 단추: 로그인 전에는 안내 문구로 바뀐다
function WriteButton() {
  const { user } = useFakeAuth(); // Header 와 같은 user 를 본다
  if (!user) return <p>🔒 글을 쓰려면 로그인하세요.</p>; // 로그인 전이면 여기서 끝 (조건부 렌더링)
  return <button>✏️ 글쓰기</button>;
}

// 로그인 상자: 닉네임을 넣고 로그인하면 login() 이 Context 의 user 를 바꾼다
//   → Header, WriteButton 이 props 를 받지 않았는데도 함께 다시 그려진다
function LoginBox() {
  const { user, login } = useFakeAuth();
  const [name, setName] = useState(""); // 입력 칸의 글자 (이 상자 안에서만 쓰는 state)
  if (user) return null; // 로그인했으면 이 상자는 숨긴다 (null 을 돌려주면 아무것도 안 그림)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // 페이지 새로 고침 막기
        if (name.trim()) login(name.trim()); // 앞뒤 빈칸을 뺀 닉네임으로 로그인
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임" />
      <button type="submit">로그인</button>
    </form>
  );
}

function Ex0502FakeAuth() {
  return (
    // Provider 로 감싼 안쪽 컴포넌트는 모두 같은 로그인 상태를 나눠 쓴다
    <FakeAuthProvider>
      <Header />
      <div style={{ padding: 8 }}>
        <LoginBox />
        <WriteButton />
      </div>
    </FakeAuthProvider>
  );
}

export default Ex0502FakeAuth;

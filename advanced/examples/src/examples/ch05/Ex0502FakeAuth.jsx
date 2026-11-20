// Ex0502FakeAuth.jsx - 로그인 상태를 Context 로 나눠 쓰기 (9장 미리 보기)
//
// 이 예제가 보여 주는 것
//   - Header, WriteButton, LoginBox 가 서로 props 를 주고받지 않는데도
//     같은 로그인 상태를 보고 함께 바뀐다.
//   - 로그인 여부에 따라 버튼을 보여 주거나 숨기는 조건부 렌더링 (기초 5장)

import { useState } from "react";
import { FakeAuthProvider, useFakeAuth } from "../../context/FakeAuthContext";

function Header() {
  const { user, logout } = useFakeAuth();
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

function WriteButton() {
  const { user } = useFakeAuth();
  if (!user) return <p>🔒 글을 쓰려면 로그인하세요.</p>;
  return <button>✏️ 글쓰기</button>;
}

function LoginBox() {
  const { user, login } = useFakeAuth();
  const [name, setName] = useState("");
  if (user) return null; // 로그인했으면 이 상자는 숨긴다 (null 을 돌려주면 아무것도 안 그림)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) login(name.trim());
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임" />
      <button type="submit">로그인</button>
    </form>
  );
}

function Ex0502FakeAuth() {
  return (
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

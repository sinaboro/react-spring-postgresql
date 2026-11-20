// FakeAuthContext.jsx - Context ② : 로그인 상태를 앱 전체에 알리기 (서버 없는 연습판)
//
// 이 파일이 보여 주는 것
//   - "지금 로그인한 사용자" 는 머리글, 글쓰기 버튼, 내 정보 화면 등 여러 곳에서 필요하다
//     → Context 에 두기 딱 좋은 값이다.
//   - Provider 가 user state 와 login / logout 함수를 함께 내려준다.
//   - 심화 9장의 AuthContext.jsx 는 이 파일과 모양이 같고,
//     login 안에서 진짜 Spring Boot 서버에 요청하는 것만 다르다.

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function FakeAuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = 로그인 안 함

  const login = (nickname) => setUser({ nickname }); // 진짜 앱에서는 서버에 아이디·비밀번호를 보낸다
  const logout = () => setUser(null);

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

export function useFakeAuth() {
  const value = useContext(AuthContext);
  if (value === null) throw new Error("useFakeAuth 는 <FakeAuthProvider> 안에서만 쓸 수 있습니다");
  return value;
}

// AuthContext.jsx - "지금 누가 로그인했나" 를 앱 전체에 알려 주는 Context (9장)
//
// 5장 FakeAuthContext 와 모양이 같다. 다른 점은
//   - login : 진짜 서버(/api/auth/login)에 아이디·비밀번호를 보내고, 받은 토큰을 저장한다.
//   - 앱을 새로 열었을 때 저장된 토큰이 있으면 /api/auth/me 로 "아직 유효한지" 확인해
//     로그인 상태를 되살린다. 확인이 끝날 때까지는 ready=false (그동안 화면을 잠시 기다리게 한다)
//   - 어떤 요청에서든 401 을 받으면(api.js) 자동으로 로그아웃 상태가 된다.
//
// 쓰는 쪽: const { user, login, logout } = useAuth();
//   user 는 로그인 전에는 null, 로그인 후에는 { id, username, nickname }

import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api"; // api.login, api.getMe ... 처럼 쓰려고 통째로 가져온다

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // 처음 토큰 확인이 끝났나?

  // 1) 앱이 처음 열릴 때: 저장된 토큰으로 로그인 상태 되살리기
  useEffect(() => {
    if (!api.tokenStore.get()) {
      setReady(true); // 토큰이 없으면 확인할 것도 없다
      return;
    }
    api
      .getMe()
      .then(setUser) //           토큰이 유효 → 사용자 정보 저장
      .catch(() => api.tokenStore.clear()) // 만료·위조 → 토큰 버림
      .finally(() => setReady(true));
  }, []);

  // 2) 어디서든 401 이 나면 로그아웃 상태로 (api.js 가 부른다)
  useEffect(() => {
    api.setUnauthorizedHandler(() => setUser(null));
  }, []);

  const login = async (username, password) => {
    const data = await api.login(username, password); // 실패하면 ApiError 가 던져져 화면에서 잡는다
    api.tokenStore.set(data.access_token);
    setUser(data.user);
  };

  const logout = () => {
    api.tokenStore.clear(); // JWT 는 서버에 저장되지 않으므로, 브라우저에서 지우면 로그아웃이다
    setUser(null);
  };

  // 회원가입 후 바로 로그인까지
  const signup = async (form) => {
    await api.signup(form);
    await login(form.username, form.password);
  };

  // 토큰 확인 중에는 화면 대신 안내만 (로그인한 사람이 잠깐 "로그인 페이지" 로 튕기는 것을 막는다)
  if (!ready) return <p className="info">로그인 정보를 확인하는 중...</p>;

  return <AuthContext value={{ user, login, logout, signup }}>{children}</AuthContext>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (value === null) throw new Error("useAuth 는 <AuthProvider> 안에서만 쓸 수 있습니다");
  return value;
}

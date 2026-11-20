// LoginPage.jsx - 로그인 ( /login )
//
// 이 파일이 보여 주는 것
//   - 아이디·비밀번호 폼 → useAuth().login() → 성공하면 원래 가려던 곳으로 이동
//   - ProtectedRoute 가 보내 준 location.state.from 에 "원래 가려던 주소" 가 들어 있다.
//     (없으면 목록 "/" 로)
//   - 이미 로그인했으면 이 화면을 보여 줄 필요가 없으므로 <Navigate> 로 목록에 보낸다.

import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // ?. : state 가 없어도(null) 오류 없이 undefined

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(form.username.trim(), form.password);
      navigate(from, { replace: true }); // 로그인 화면은 방문 기록에서 지운다
    } catch (err) {
      setError(err.message); // "아이디 또는 비밀번호가 올바르지 않습니다"
      setBusy(false);
    }
  };

  return (
    <form className="post-form auth-form" onSubmit={handleSubmit}>
      <h2>로그인</h2>
      {/* ProtectedRoute 에서 튕겨 왔으면 이유를 알려 준다 */}
      {location.state?.from && !error && <p className="info-box">로그인이 필요한 화면입니다.</p>}
      {error && <p className="error">⚠️ {error}</p>}
      <label>
        아이디
        <input name="username" value={form.username} onChange={handleChange} autoComplete="username" autoFocus />
      </label>
      <label>
        비밀번호
        <input
          name="password"
          type="password" // 입력한 글자를 ●●● 로 가린다
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </label>
      <button type="submit" className="primary wide" disabled={busy || !form.username || !form.password}>
        {busy ? "확인 중..." : "로그인"}
      </button>
      <p className="hint">
        계정이 없나요? <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );
}

export default LoginPage;

// SignupPage.jsx - 회원가입 ( /signup )
//
// 이 파일이 보여 주는 것
//   - 서버(SignupRequest.java)와 같은 규칙을 화면에서도 미리 검사해, 무엇이 틀렸는지 한국어로 알려 준다.
//       아이디: 영문 소문자·숫자·밑줄 4~20자 / 비밀번호: 8자 이상 / 닉네임: 1~30자
//     (화면 검사는 "친절" 을 위한 것이고, 진짜 검사는 서버가 한다. 둘 다 필요하다)
//   - 비밀번호 확인 칸은 서버로 보내지 않는다 (화면에서만 쓰는 값)
//   - 가입 성공 → 자동 로그인 → 목록으로

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// 검사 함수: 문제가 있으면 안내 문장을, 없으면 null 을 돌려준다
function validate(form) {
  if (!/^[a-z0-9_]{4,20}$/.test(form.username)) return "아이디는 영문 소문자·숫자·밑줄(_)로 4~20자입니다.";
  if (form.password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
  if (form.password !== form.password2) return "비밀번호 확인이 일치하지 않습니다.";
  if (!form.nickname.trim()) return "닉네임을 입력하세요.";
  return null;
}

function SignupPage() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", password2: "", nickname: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const problem = validate(form);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      // password2 는 빼고 서버가 원하는 세 값만 보낸다
      await signup({ username: form.username, password: form.password, nickname: form.nickname.trim() });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message); // 예: "이미 사용 중인 아이디입니다" (409)
      setBusy(false);
    }
  };

  return (
    <form className="post-form auth-form" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      {error && <p className="error">⚠️ {error}</p>}
      <label>
        아이디 <small>영문 소문자·숫자·_ 4~20자</small>
        <input name="username" value={form.username} onChange={handleChange} autoComplete="username" />
      </label>
      <label>
        비밀번호 <small>8자 이상</small>
        <input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
      </label>
      <label>
        비밀번호 확인
        <input name="password2" type="password" value={form.password2} onChange={handleChange} autoComplete="new-password" />
      </label>
      <label>
        닉네임 <small>글에 작성자로 보이는 이름</small>
        <input name="nickname" value={form.nickname} onChange={handleChange} maxLength={30} />
      </label>
      <button type="submit" className="primary wide" disabled={busy}>
        {busy ? "가입 중..." : "가입하기"}
      </button>
      <p className="hint">
        이미 계정이 있나요? <Link to="/login">로그인</Link>
      </p>
    </form>
  );
}

export default SignupPage;

// PostFormPage.jsx - 글쓰기 ( /posts/new ) · 수정 ( /posts/:id/edit )
//
// 7장에서 달라진 점 (9장)
//   - 작성자 입력 칸이 없어졌다. 작성자는 서버가 토큰을 보고 정한다 (남의 이름으로 쓰기 불가)
//   - 이 화면은 ProtectedRoute 안에 있으므로, 여기까지 왔다면 user 는 항상 있다.
//   - 수정 화면에서 남의 글을 불러오면 안내 문구를 보여 주고 저장 버튼을 막는다.
//     (그래도 서버가 마지막에 한 번 더 403 으로 막는다)

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createPost, getPost, updatePost } from "../api";
import { useAuth } from "../context/AuthContext";

function PostFormPage() {
  const { id } = useParams(); // 주소의 :id 꺼내기. /posts/new 에는 :id 가 없어서 undefined
  const isEdit = id !== undefined; // id 가 있으면 수정 화면, 없으면 새 글 화면 (한 컴포넌트로 두 화면을 맡는다)
  const navigate = useNavigate(); // 저장이 끝나면 다른 주소로 옮겨 갈 때 쓴다
  const { user } = useAuth(); // 로그인한 사람 (ProtectedRoute 안이라 항상 있다)
  const [form, setForm] = useState({ title: "", content: "" }); // 입력 칸 두 개를 객체 하나로 관리 (기초 7장)
  const [notMine, setNotMine] = useState(false); // 남의 글을 수정하려는 중인가
  const [saving, setSaving] = useState(false); // 저장 요청 중이면 true → 버튼을 막아 두 번 누르기 방지
  const [error, setError] = useState(null); // 화면에 보여 줄 오류 문구

  // 수정 화면이면 처음 한 번 원래 글을 불러와 입력 칸을 채운다
  useEffect(() => {
    if (!isEdit) return; // 새 글이면 불러올 것이 없다
    getPost(id)
      .then((post) => {
        setForm({ title: post.title, content: post.content });
        setNotMine(post.user_id !== user.id); // 글쓴이 번호와 내 번호가 다르면 남의 글
      })
      .catch((err) => setError(err.message));
  }, [id, isEdit, user.id]); // 이 값들이 바뀔 때만 다시 실행

  // 입력할 때마다: 기존 form 을 펼쳐 복사(...form)하고, 입력한 칸(name 이 title 또는 content)만 새 값으로
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // 브라우저가 페이지를 새로 고치는 기본 동작을 막는다
    if (!form.title.trim()) { // 제목이 비었거나 빈칸뿐이면 서버에 보내지 않는다
      setError("제목을 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      const saved = isEdit ? await updatePost(id, form) : await createPost(form); // 수정이면 PUT, 새 글이면 POST
      // 저장한 글의 상세 화면으로. replace: 뒤로 가기를 눌러도 입력 화면으로 돌아오지 않게 지금 기록을 바꿔치기
      navigate(`/posts/${saved.id}`, { replace: true });
    } catch (err) {
      setError(err.message); // 서버가 돌려준 이유 (401, 403, 422 ...)
      setSaving(false); // 다시 누를 수 있게
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? `${id}번 글 수정` : "새 글 쓰기"}</h2>
      <p className="hint">
        작성자: <strong>{user.nickname}</strong>
      </p>
      {notMine && <p className="error">⚠️ 본인이 쓴 글만 수정할 수 있습니다.</p>}
      {error && <p className="error">⚠️ {error}</p>}
      <label>
        제목
        <input name="title" value={form.title} onChange={handleChange} maxLength={100} />
      </label>
      <label>
        내용
        <textarea name="content" value={form.content} onChange={handleChange} rows={8} />
      </label>
      <div className="buttons">
        {/* type="button": form 안의 버튼은 기본이 submit 이라, 취소 버튼은 button 으로 바꿔야 저장되지 않는다. navigate(-1) = 뒤로 가기 */}
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
        {/* 저장 중이거나 남의 글이면 버튼을 막는다 */}
        <button type="submit" className="primary" disabled={saving || notMine}>
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}

export default PostFormPage;

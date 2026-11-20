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
  const { id } = useParams();
  const isEdit = id !== undefined;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", content: "" });
  const [notMine, setNotMine] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    getPost(id)
      .then((post) => {
        setForm({ title: post.title, content: post.content });
        setNotMine(post.user_id !== user.id);
      })
      .catch((err) => setError(err.message));
  }, [id, isEdit, user.id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("제목을 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      const saved = isEdit ? await updatePost(id, form) : await createPost(form);
      navigate(`/posts/${saved.id}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
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
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
        <button type="submit" className="primary" disabled={saving || notMine}>
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}

export default PostFormPage;

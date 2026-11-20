// PostFormPage.jsx - 글쓰기 ( /posts/new ) · 수정 ( /posts/:id/edit )
//
// 기초 과정 PostForm.jsx 와 비교
//   - 수정인지 아닌지를 주소로 판단: useParams() 에 id 가 있으면 수정
//   - 저장 성공 → navigate(`/posts/${새 번호}`)
//   - 취소 → navigate(-1) (바로 전 화면으로. 기초에서는 어디서 왔는지 직접 따져야 했다)
//   - fetch 코드는 api.js 의 createPost / updatePost 로 바뀌었다.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createPost, getPost, updatePost } from "../api";

const EMPTY = { title: "", writer: "", content: "" };

function PostFormPage() {
  const { id } = useParams(); // /posts/new 에서는 undefined
  const isEdit = id !== undefined;
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    getPost(id)
      .then((post) => setForm({ title: post.title, writer: post.writer, content: post.content }))
      .catch((err) => setError(err.message));
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.writer.trim()) {
      setError("제목과 작성자를 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      const saved = isEdit ? await updatePost(id, form) : await createPost(form);
      // replace: true → 방금 본 글쓰기 화면을 방문 기록에서 바꿔치기한다.
      //   그래서 저장 후 "뒤로" 를 눌러도 다시 글쓰기 화면으로 돌아가지 않는다.
      navigate(`/posts/${saved.id}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? `${id}번 글 수정` : "새 글 쓰기"}</h2>
      {error && <p className="error">⚠️ {error}</p>}
      <label>
        제목
        <input name="title" value={form.title} onChange={handleChange} maxLength={100} />
      </label>
      <label>
        작성자
        <input name="writer" value={form.writer} onChange={handleChange} maxLength={30} />
      </label>
      <label>
        내용
        <textarea name="content" value={form.content} onChange={handleChange} rows={8} />
      </label>
      <div className="buttons">
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
        <button type="submit" className="primary" disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}

export default PostFormPage;

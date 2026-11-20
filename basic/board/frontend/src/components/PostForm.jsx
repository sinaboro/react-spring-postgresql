// PostForm.jsx - 글쓰기 / 수정 화면 (C: Create, U: Update)
//
// 이 파일이 보여 주는 것
//   - 하나의 폼으로 글쓰기와 수정을 함께 처리한다.
//       id 가 없으면 → 빈 폼 → POST /api/posts         (새 글)
//       id 가 있으면 → 그 글을 불러와 폼을 채움 → PUT /api/posts/{id}  (수정)
//   - 입력 칸 여러 개를 객체 state 하나(form)로 관리한다 (7장 Ex0702Form 과 같은 모양).
//   - JSON 을 보낼 때는 method, headers(Content-Type), body(JSON.stringify) 세 가지를 쓴다.
//   - 저장 중에는 버튼을 막아(disabled) 두 번 눌러 글이 두 개 생기는 일을 막는다.

import { useEffect, useState } from "react";
import { API_URL } from "../config";

const EMPTY = { title: "", writer: "", content: "" };

function PostForm({ id, onSaved, onCancel }) {
  const isEdit = id !== undefined; // 수정 화면인가?
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 수정 화면이면 원래 글을 불러와 폼에 채운다
  useEffect(() => {
    if (!isEdit) return; // 글쓰기면 할 일 없음
    async function load() {
      const res = await fetch(`${API_URL}/posts/${id}`);
      if (!res.ok) {
        setError("글을 불러오지 못했습니다");
        return;
      }
      const post = await res.json();
      // 서버가 준 글에는 id, created_at 등도 있지만 폼에는 세 칸만 필요하다
      setForm({ title: post.title, writer: post.writer, content: post.content });
    }
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.writer.trim()) {
      setError("제목과 작성자를 입력하세요.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(isEdit ? `${API_URL}/posts/${id}` : `${API_URL}/posts`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" }, // "본문은 JSON 입니다" 라고 알린다
        body: JSON.stringify(form), //                      객체 → JSON 글자
      });
      if (!res.ok) throw new Error(`저장하지 못했습니다 (${res.status})`);
      const saved = await res.json(); // 서버가 돌려준 글 (새 글이면 새 번호가 들어 있다)
      onSaved(saved.id); //              부모에게 알림 → 그 글 읽기 화면으로
    } catch (err) {
      setError(err.message);
      setSaving(false); // 실패했을 때만 버튼을 다시 살린다 (성공하면 화면이 바뀐다)
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
        <button type="button" onClick={onCancel}>
          취소
        </button>
        {/* type="button" 이 아닌 버튼은 submit → onSubmit 실행 */}
        <button type="submit" className="primary" disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;

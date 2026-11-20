// PostDetail.jsx - 글 읽기 화면 (R: Read 하나 + D: Delete)
//
// 이 파일이 보여 주는 것
//   - props 로 받은 id 의 글을 GET /api/posts/{id} 로 불러온다.
//     useEffect 의 의존성 배열에 [id] 를 넣어, id 가 바뀌면 다시 불러온다.
//   - 삭제: confirm 으로 한 번 더 묻고 → DELETE /api/posts/{id} → 성공(204)하면 목록으로.
//   - 404(없는 글)도 오류 문구로 보여 준다.

import { useEffect, useState } from "react";
import { API_URL, formatDate } from "../config";

function PostDetail({ id, onBack, onEdit, onDeleted }) {
  const [post, setPost] = useState(null); // 아직 못 받았으면 null
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/posts/${id}`);
        if (res.status === 404) throw new Error("글을 찾을 수 없습니다. 이미 지워졌을 수 있어요.");
        if (!res.ok) throw new Error(`글을 불러오지 못했습니다 (${res.status})`);
        setPost(await res.json());
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제할까요? 되돌릴 수 없습니다.")) return; // 취소를 누르면 여기서 끝
    // fetch 의 두 번째 인자로 "방식(method)" 을 정한다. 기본값은 GET
    const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      onDeleted(); // 부모에게 "지웠어요" → 목록 화면으로
    } else {
      alert(`삭제하지 못했습니다 (${res.status})`);
    }
  };

  if (error)
    return (
      <div>
        <p className="error">⚠️ {error}</p>
        <button onClick={onBack}>목록</button>
      </div>
    );
  if (!post) return <p className="info">⏳ 불러오는 중...</p>;

  return (
    <article className="post-detail">
      <h2>{post.title}</h2>
      <div className="meta">
        {post.writer} · {formatDate(post.created_at)}
        {/* 고친 적이 있으면 고친 시각도 보여 준다 */}
        {post.updated_at !== post.created_at && ` · 수정 ${formatDate(post.updated_at)}`}
      </div>
      {/* 줄바꿈을 그대로 보이게 하려고 CSS 에 white-space: pre-wrap 을 주었다 */}
      <div className="content">{post.content || "(내용 없음)"}</div>

      <div className="buttons">
        <button onClick={onBack}>목록</button>
        <button onClick={() => onEdit(post.id)}>수정</button>
        <button className="danger" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default PostDetail;

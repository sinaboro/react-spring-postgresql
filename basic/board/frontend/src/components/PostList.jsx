// PostList.jsx - 글 목록 화면 (CRUD 의 R: Read 목록)
//
// 이 파일이 보여 주는 것
//   - 화면에 처음 나타날 때 useEffect(..., []) 로 GET /api/posts 를 한 번 요청한다 (8장).
//   - loading / error / posts 세 state 로 "불러오는 중 · 실패 · 목록" 을 나눠 그린다.
//   - 제목을 누르면 부모(App)가 내려준 onSelect(id) 를 불러 읽기 화면으로 바꾼다.

import { useEffect, useState } from "react";
import { API_URL, formatDate } from "../config";

function PostList({ onSelect, onWrite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/posts`); // GET 은 fetch(주소) 만 쓰면 된다
        if (!res.ok) throw new Error(`목록을 불러오지 못했습니다 (${res.status})`);
        setPosts(await res.json()); // JSON 배열 → 자바스크립트 배열
      } catch (err) {
        // 서버가 꺼져 있으면 fetch 자체가 실패한다 (TypeError: Failed to fetch)
        setError(err.message === "Failed to fetch" ? "API 서버에 연결할 수 없습니다. 서버가 켜져 있나요?" : err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []); // [] → 처음 한 번만

  if (loading) return <p className="info">⏳ 불러오는 중...</p>;
  if (error) return <p className="error">⚠️ {error}</p>;

  return (
    <div>
      <div className="toolbar">
        <span>전체 {posts.length}개</span>
        <button className="primary" onClick={onWrite}>
          ✏️ 글쓰기
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="info">아직 글이 없습니다. 첫 글을 써 보세요!</p>
      ) : (
        <table className="post-table">
          <thead>
            <tr>
              <th className="col-id">번호</th>
              <th>제목</th>
              <th className="col-writer">작성자</th>
              <th className="col-date">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="col-id">{post.id}</td>
                <td>
                  {/* 링크처럼 보이지만 주소 이동이 아니라 state 를 바꾸는 버튼 */}
                  <button className="link" onClick={() => onSelect(post.id)}>
                    {post.title}
                  </button>
                </td>
                <td className="col-writer">{post.writer}</td>
                <td className="col-date">{formatDate(post.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostList;

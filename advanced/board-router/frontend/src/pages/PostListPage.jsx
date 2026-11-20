// PostListPage.jsx - 글 목록 ( / )
//
// 기초 과정 PostList.jsx 와 비교
//   - useState 3개 + useEffect + fetch + try/catch  →  useApi(getPosts, []) 한 줄
//   - onSelect(id) 버튼 → <Link to={`/posts/${id}`}>  (진짜 주소가 생겼다)
//   - onWrite 버튼     → <Link to="/posts/new">

import { Link } from "react-router";
import { getPosts } from "../api";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../format";

function PostListPage() {
  const { data: posts, loading, error } = useApi(getPosts, []);

  if (loading) return <p className="info">⏳ 불러오는 중...</p>;
  if (error) return <p className="error">⚠️ {error.message}</p>;

  return (
    <div>
      <div className="toolbar">
        <span>전체 {posts.length}개</span>
        <Link to="/posts/new" className="button primary">
          ✏️ 글쓰기
        </Link>
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
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
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

export default PostListPage;

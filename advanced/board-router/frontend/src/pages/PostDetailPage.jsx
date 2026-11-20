// PostDetailPage.jsx - 글 읽기 ( /posts/:id )
//
// 기초 과정 PostDetail.jsx 와 비교
//   - 글 번호를 props(id) 가 아니라 주소에서 꺼낸다: useParams()
//   - 삭제 후 목록으로: onDeleted() → navigate("/")
//   - 이제 /posts/3 주소를 새로 고침해도, 복사해서 보내도 같은 글이 열린다.

import { Link, useNavigate, useParams } from "react-router";
import { deletePost, getPost } from "../api";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../format";

function PostDetailPage() {
  const { id } = useParams(); // "/posts/3" → id = "3" (문자열)
  const navigate = useNavigate();
  const { data: post, loading, error } = useApi(() => getPost(id), [id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제할까요? 되돌릴 수 없습니다.")) return;
    try {
      await deletePost(id);
      navigate("/"); // 목록으로 이동
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="info">⏳ 불러오는 중...</p>;
  if (error)
    return (
      <div>
        <p className="error">⚠️ {error.status === 404 ? "글을 찾을 수 없습니다." : error.message}</p>
        <Link to="/">목록으로</Link>
      </div>
    );

  return (
    <article className="post-detail">
      <h2>{post.title}</h2>
      <div className="meta">
        {post.writer} · {formatDate(post.created_at)}
        {post.updated_at !== post.created_at && ` · 수정 ${formatDate(post.updated_at)}`}
      </div>
      <div className="content">{post.content || "(내용 없음)"}</div>

      <div className="buttons">
        <Link to="/" className="button">
          목록
        </Link>
        <Link to={`/posts/${post.id}/edit`} className="button">
          수정
        </Link>
        <button className="danger" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default PostDetailPage;

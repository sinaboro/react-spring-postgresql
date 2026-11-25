// PostDetailPage.jsx - 글 읽기 ( /posts/:id )
//
// 7장에서 달라진 점 (9장)
//   - 글쓴이 본인(user.id === post.user_id)에게만 수정·삭제 버튼을 보여 준다.
//   - 버튼을 숨기는 것은 "편의" 일 뿐이다. 남이 주소(/posts/3/edit)를 직접 치거나
//     요청을 직접 보내도 서버가 403 으로 막는다 (PostService.checkOwner).

import { Link, useNavigate, useParams } from "react-router";
import { deletePost, getPost } from "../api";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../format";

function PostDetailPage() {
  const { id } = useParams(); // 주소 /posts/3 의 3
  const navigate = useNavigate(); // 삭제 뒤 목록으로 옮겨 갈 때 쓴다
  const { user } = useAuth(); // 로그인한 사람 (안 했으면 null)
  // id 가 바뀔 때마다 그 글을 불러온다. data 를 post 라는 이름으로 꺼낸다
  const { data: post, loading, error } = useApi(() => getPost(id), [id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제할까요? 되돌릴 수 없습니다.")) return; // 취소를 누르면 아무것도 하지 않는다
    try {
      await deletePost(id);
      navigate("/", { replace: true }); // 지운 글 화면으로 뒤로 가기가 되지 않게 기록을 바꿔치기
    } catch (err) {
      alert(err.message); // 403: "본인이 쓴 글만 ...", 401: "로그인이 만료되었습니다 ..."
    }
  };

  // 아직 글이 없을 때(불러오는 중·오류)는 여기서 먼저 끝낸다 → 아래에서는 post 가 항상 있다
  if (loading) return <p className="info">⏳ 불러오는 중...</p>;
  if (error)
    return (
      <div>
        <p className="error">⚠️ {error.status === 404 ? "글을 찾을 수 없습니다." : error.message}</p>
        <Link to="/">목록으로</Link>
      </div>
    );

  const isOwner = user?.id === post.user_id; // 로그인 안 했으면 user 가 null → user?.id 는 undefined → false

  return (
    <article className="post-detail">
      <h2>{post.title}</h2>
      <div className="meta">
        {post.writer} · {formatDate(post.created_at)}
        {/* 한 번이라도 고쳤으면 수정 시각도 보여 준다 */}
        {post.updated_at !== post.created_at && ` · 수정 ${formatDate(post.updated_at)}`}
      </div>
      <div className="content">{post.content || "(내용 없음)"}</div>

      <div className="buttons">
        <Link to="/" className="button">
          목록
        </Link>
        {/* 본인 글일 때만 수정·삭제 단추 (<> </> 는 여러 요소를 감싸는 빈 껍데기, Fragment) */}
        {isOwner && (
          <>
            <Link to={`/posts/${post.id}/edit`} className="button">
              수정
            </Link>
            <button className="danger" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default PostDetailPage;

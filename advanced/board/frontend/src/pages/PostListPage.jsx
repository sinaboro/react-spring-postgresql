// PostListPage.jsx - 글 목록 ( / , 내 글만: /?mine=1 )
//
// 7장 목록에서 달라진 점 (9장)
//   - 로그인했으면 [전체 | 내 글] 탭을 보여 준다. 고른 탭은 주소의 ?mine=1 에 둔다
//     (state 가 아니라 주소에 두면 새로 고침·뒤로 가기에도 유지된다 - 4장 useSearchParams)
//   - 내 글 탭이면 getPosts(user.id) → 서버에 /posts?user_id=번호 로 요청
//   - 글쓰기 버튼: 로그인 전에는 "로그인하고 글쓰기" 로 바뀐다

import { Link, useSearchParams } from "react-router";
import { getPosts } from "../api";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../format";

function PostListPage() {
  const { user } = useAuth(); // 로그인한 사람 (안 했으면 null)
  const [searchParams, setSearchParams] = useSearchParams(); // 주소의 ?mine=1 같은 값을 읽고 바꾸는 도구
  const mine = Boolean(user) && searchParams.get("mine") === "1"; // 로그아웃 상태면 항상 전체
  const userId = mine ? user.id : null; // 내 글 탭이면 내 번호, 아니면 null(= 전체)

  // userId 가 바뀌면(탭을 바꾸면) 다시 불러온다
  const { data: posts, loading, error } = useApi(() => getPosts(userId), [userId]);

  return (
    <div>
      <div className="toolbar">
        <div className="tabs">
          {/* 탭을 누르면 주소만 바꾼다(?mine 지우기) → userId 가 바뀌어 useApi 가 목록을 다시 불러온다 */}
          <button className={mine ? "" : "active"} onClick={() => setSearchParams({})}>
            전체
          </button>
          {/* 내 글 탭은 로그인했을 때만 보인다 (&& : 앞이 참일 때만 뒤를 그린다) */}
          {user && (
            <button className={mine ? "active" : ""} onClick={() => setSearchParams({ mine: "1" })}>
              내 글
            </button>
          )}
          {posts && <span className="count">{posts.length}개</span>}
        </div>
        {user ? (
          <Link to="/posts/new" className="button primary">
            ✏️ 글쓰기
          </Link>
        ) : (
          // state.from: 로그인이 끝나면 글쓰기 화면으로 바로 보내 주려고 "원래 가려던 곳" 을 함께 넘긴다
          <Link to="/login" state={{ from: "/posts/new" }} className="button">
            🔒 로그인하고 글쓰기
          </Link>
        )}
      </div>

      {/* 불러오는 중 / 오류 / 글 없음 / 목록 - 상황마다 하나만 보이게 조건을 나눈다 */}
      {loading && <p className="info">⏳ 불러오는 중...</p>}
      {error && <p className="error">⚠️ {error.message}</p>}
      {posts && !loading && posts.length === 0 && (
        <p className="info">{mine ? "아직 내가 쓴 글이 없습니다." : "아직 글이 없습니다."}</p>
      )}
      {posts && !loading && posts.length > 0 && (
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
            {/* 글마다 한 줄. key 는 React 가 줄을 구분하는 이름표 (글 번호처럼 바뀌지 않는 값) */}
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="col-id">{post.id}</td>
                <td>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  {/* 내 글 표시. user?.id : 로그아웃 상태(user 가 null)여도 오류 없이 undefined 가 된다 */}
                  {user?.id === post.user_id && <span className="mine-badge">내 글</span>}
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

// App.jsx - 게시판의 "화면 전환" 을 맡는 부모 컴포넌트
//
// 이 파일이 보여 주는 것
//   - 지금 어떤 화면을 보여 줄지를 state 하나(page)로 관리한다.
//       { name: "list" }              → 글 목록
//       { name: "detail", id: 3 }     → 3번 글 읽기
//       { name: "form" }              → 글쓰기
//       { name: "form",   id: 3 }     → 3번 글 수정
//   - 화면을 바꾸는 함수(go...)를 자식에게 props 로 내려준다 (6장 state 끌어올리기).
//   - 조건부 렌더링(5장)으로 page.name 에 맞는 컴포넌트 하나만 그린다.
//
//   ※ 이 방식은 주소창의 주소가 바뀌지 않는다. 그래서 새로 고침하면 목록으로 돌아가고,
//     "3번 글" 주소를 친구에게 보낼 수도 없다. 심화 과정에서 React Router 로 해결한다.

import { useState } from "react";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import "./App.css";

function App() {
  const [page, setPage] = useState({ name: "list" }); // 처음 화면은 목록

  // 화면을 바꾸는 함수들 - 자식 컴포넌트가 불러서 쓴다
  const goList = () => setPage({ name: "list" });
  const goDetail = (id) => setPage({ name: "detail", id });
  const goForm = (id) => setPage({ name: "form", id }); // id 가 없으면 글쓰기, 있으면 수정

  return (
    <div className="container">
      <header className="header">
        {/* 제목을 누르면 언제든 목록으로 */}
        <h1 onClick={goList}>📋 React 게시판</h1>
        <span className="badge">Spring Boot + PostgreSQL</span>
      </header>

      {page.name === "list" && <PostList onSelect={goDetail} onWrite={() => goForm()} />}
      {page.name === "detail" && (
        <PostDetail id={page.id} onBack={goList} onEdit={goForm} onDeleted={goList} />
      )}
      {page.name === "form" && (
        <PostForm
          id={page.id}
          onSaved={goDetail} // 저장이 끝나면 그 글 읽기 화면으로
          onCancel={() => (page.id ? goDetail(page.id) : goList())} // 수정 취소 → 글로, 글쓰기 취소 → 목록으로
        />
      )}
    </div>
  );
}

export default App;

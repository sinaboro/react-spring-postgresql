// App.jsx - 게시판의 "주소 → 화면" 지도 (7장: 기초 게시판을 Router 로 바꾸기)
//
// 기초 과정 App.jsx 와 비교
//   기초: const [page, setPage] = useState({ name: "list" })  → 주소는 항상 "/"
//   심화: 주소 자체가 지금 화면을 나타낸다
//
//   주소                 화면                기초 과정의 page state
//   /                    PostListPage        { name: "list" }
//   /posts/new           PostFormPage        { name: "form" }
//   /posts/3             PostDetailPage      { name: "detail", id: 3 }
//   /posts/3/edit        PostFormPage        { name: "form", id: 3 }
//   그 밖                NotFoundPage        (없었음)
//
//   → 화면 전환 함수(goList, goDetail ...)를 props 로 내려줄 필요가 없어졌다.
//     각 화면이 <Link> 나 navigate() 로 직접 주소를 바꾼다.

import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostFormPage from "./pages/PostFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* path 없는 Route = 주소에는 영향 없이 "틀(Layout)" 만 씌운다 */}
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/new" element={<PostFormPage />} /> {/* /posts/:id 보다 구체적인 주소가 우선 */}
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

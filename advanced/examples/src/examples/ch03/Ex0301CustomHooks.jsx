// Ex0301CustomHooks.jsx - useInput 과 useLocalStorage 를 써 보기
//
// 이 예제가 보여 주는 것
//   - useInput 덕분에 입력 칸마다 useState + onChange 를 따로 쓰지 않아도 된다.
//   - useLocalStorage 로 만든 메모 목록은 새로 고침(F5)해도 남아 있다.
//   - 훅을 두 번 부르면(title, author) state 도 두 개 따로 생긴다.

import { useInput } from "../../hooks/useInput";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Ex0301CustomHooks() {
  const title = useInput("");
  const author = useInput("익명");
  const [memos, setMemos] = useLocalStorage("memos", []); // localStorage 의 "memos" 칸에 저장

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.value.trim()) return;
    setMemos([...memos, { id: Date.now(), title: title.value, author: author.value }]);
    title.reset(); // 제목 칸만 비우고 작성자는 남긴다
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...title.bind} placeholder="메모" /> {/* value, onChange 가 한 번에 들어간다 */}
        <input {...author.bind} placeholder="작성자" style={{ width: 80 }} />
        <button type="submit">저장</button>
        <button type="button" onClick={() => setMemos([])}>
          모두 지우기
        </button>
      </form>
      <ul>
        {memos.map((m) => (
          <li key={m.id}>
            {m.title} <small>- {m.author}</small>
          </li>
        ))}
      </ul>
      <p>
        <small>F5 로 새로 고쳐도 메모가 남는다. (개발자 도구 → Application → Local Storage 에서 확인)</small>
      </p>
    </div>
  );
}

export default Ex0301CustomHooks;

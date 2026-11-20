// Ex0201RefFocus.jsx - useRef ① : 화면의 태그(DOM)를 직접 잡기
//
// 이 예제가 보여 주는 것
//   - const inputRef = useRef(null) 로 "상자" 를 만들고, <input ref={inputRef}> 로 태그와 연결한다.
//   - 그 뒤 inputRef.current 에 실제 <input> 태그가 들어 있다 → .focus() 같은 DOM 기능을 쓸 수 있다.
//   - 쓰는 곳: 입력 칸에 커서 두기, 스크롤 이동, 동영상 재생 등 "state 로 할 수 없는 브라우저 동작"

import { useEffect, useRef, useState } from "react";

function Ex0201RefFocus() {
  const nameRef = useRef(null); // 처음엔 비어 있다 (화면이 그려진 뒤에 태그가 들어온다)
  const listEndRef = useRef(null);
  const [name, setName] = useState("");
  const [names, setNames] = useState(["민수", "지수"]);

  // 화면이 처음 그려진 뒤, 이름 칸에 바로 커서를 둔다
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // 목록이 늘어날 때마다 맨 아래로 스크롤
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [names]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      nameRef.current.focus(); // 비었으면 다시 그 칸으로 커서를 보낸다
      return;
    }
    setNames([...names, name.trim()]);
    setName("");
    nameRef.current.focus(); // 추가한 뒤에도 계속 입력할 수 있게
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        <button type="submit">추가</button>
      </form>
      <ul style={{ maxHeight: 120, overflowY: "auto", border: "1px solid #ddd" }}>
        {names.map((n, i) => (
          <li key={i}>{n}</li> // 지우지 않고 뒤에만 붙는 목록이라 index 를 key 로 써도 괜찮다
        ))}
        <li ref={listEndRef} style={{ listStyle: "none" }} /> {/* 스크롤 목표 지점 */}
      </ul>
    </div>
  );
}

export default Ex0201RefFocus;

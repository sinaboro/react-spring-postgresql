// TodoForm.jsx - 할 일 입력 폼 (자식 컴포넌트)
//
// 이 컴포넌트가 하는 일
//   - 입력 칸의 글자는 자기 state(text)로 관리한다. 부모는 몰라도 되는 값이기 때문.
//   - 제출하면 부모가 내려준 onAdd(글자) 를 불러 "이 할 일을 추가해 줘" 라고 알린다.

import { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //       페이지 새로 고침 막기
    if (!text.trim()) return; // 빈칸만 있으면 무시
    onAdd(text.trim()); //       부모에게 알린다
    setText(""); //              입력 칸 비우기
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력하고 Enter" />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;

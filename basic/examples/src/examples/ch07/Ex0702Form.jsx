// Ex0702Form.jsx - 입력 칸이 여러 개인 폼: 객체 state 하나로 관리하기
//
// 이 예제가 보여 주는 것
//   - 입력 칸마다 name 속성을 주고, 하나의 handleChange 로 모두 처리한다.
//     [name]: value  → "name 속성값" 을 키로 쓰는 문법 (계산된 속성 이름)
//   - <form onSubmit> 에서 e.preventDefault() 로 새로 고침(페이지 이동)을 막는다.
//   - 제출 전에 값을 검사하고, 끝나면 폼을 비운다.
//   9장 게시판의 글쓰기·수정 화면(PostForm)이 이 모양 그대로다.

import { useState } from "react";

const EMPTY = { title: "", writer: "", content: "" }; // 빈 폼 (처음값과 비울 때 함께 쓴다)

function Ex0702Form() {
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(null); // 제출된 내용을 보여 주기 위한 state

  // 모든 입력 칸이 같이 쓰는 함수
  const handleChange = (e) => {
    const { name, value } = e.target; // 어느 칸(name)에 무엇(value)을 쳤는지
    setForm({ ...form, [name]: value }); // 나머지는 그대로, 그 칸만 새 값으로
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // <form> 의 기본 동작(페이지 새로 고침)을 막는다. 꼭 필요!
    if (!form.title.trim() || !form.writer.trim()) {
      alert("제목과 작성자는 꼭 입력하세요.");
      return;
    }
    setSaved(form); // 실제 앱이라면 여기서 서버에 보낸다 (9장)
    setForm(EMPTY); // 폼 비우기
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <input name="title" value={form.title} onChange={handleChange} placeholder="제목" />
        </p>
        <p>
          <input name="writer" value={form.writer} onChange={handleChange} placeholder="작성자" />
        </p>
        <p>
          {/* textarea 도 value / onChange 로 똑같이 다룬다 */}
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용" rows={3} />
        </p>
        <button type="submit">저장</button> {/* 폼 안의 submit 버튼 → onSubmit 이 실행된다 */}
      </form>

      <pre>지금 form state: {JSON.stringify(form)}</pre>
      {saved && (
        <div style={{ background: "#eef3f8", padding: 10 }}>
          <strong>저장된 글</strong>
          <p>
            [{saved.title}] {saved.writer} - {saved.content}
          </p>
        </div>
      )}
    </div>
  );
}

export default Ex0702Form;

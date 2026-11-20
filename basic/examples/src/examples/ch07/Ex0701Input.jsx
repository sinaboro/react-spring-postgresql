// Ex0701Input.jsx - 제어 컴포넌트(controlled input): 입력 칸의 값을 state 와 묶기
//
// 이 예제가 보여 주는 것
//   - value={state} : 입력 칸에 보이는 글자는 항상 state 의 값이다.
//   - onChange={e => setState(e.target.value)} : 한 글자 칠 때마다 state 를 새 글자로 바꾼다.
//   - 이렇게 묶어 두면 입력값을 언제든 state 로 읽고, 코드로 비우거나 바꿀 수도 있다.

import { useState } from "react";

function Ex0701Input() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name} //                                  보이는 값 = state
        onChange={(e) => setName(e.target.value)} //      친 글자 → state
        placeholder="이름을 입력하세요"
      />
      <button onClick={() => setName("")}>지우기</button> {/* state 만 비우면 입력 칸도 비워진다 */}

      <p>입력한 이름: {name}</p>
      <p>글자 수: {name.length} / 10</p>
      {name.length > 10 && <p style={{ color: "crimson" }}>10글자를 넘었습니다!</p>}
    </div>
  );
}

export default Ex0701Input;

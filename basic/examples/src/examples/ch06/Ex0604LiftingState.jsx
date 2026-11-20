// Ex0604LiftingState.jsx - state 끌어올리기 (형제 컴포넌트끼리 값 나누기)
//
// 이 예제가 보여 주는 것
//   - 두 자식이 같은 값을 써야 하면, state 를 "공통 부모" 에 둔다.
//   - 부모는 값은 props 로, 값을 바꾸는 함수도 props 로 자식에게 내려준다.
//   - 자식은 받은 함수를 불러서 부모에게 "바꿔 줘" 라고 알린다. (자식 → 부모 소통 방법)
//   9장 게시판의 App.jsx 가 이 방식으로 "지금 보여 줄 화면" 을 관리한다.

import { useState } from "react";

// 자식 1: 값을 바꾸는 버튼들. 값은 모르고 "바꾸는 함수" 만 받는다
function ColorPicker({ onPick }) {
  const colors = ["tomato", "seagreen", "royalblue"];
  return (
    <div>
      {colors.map((c) => (
        <button key={c} onClick={() => onPick(c)} style={{ color: c }}>
          {c}
        </button>
      ))}
    </div>
  );
}

// 자식 2: 값을 보여 주기만 한다
function Preview({ color }) {
  return (
    <div style={{ background: color, color: "white", padding: 20, marginTop: 8, borderRadius: 8 }}>
      지금 고른 색: {color}
    </div>
  );
}

// 부모: state 를 가지고 두 자식을 이어 준다
function Ex0604LiftingState() {
  const [color, setColor] = useState("tomato");
  return (
    <div>
      <ColorPicker onPick={setColor} /> {/* 바꾸는 함수를 내려준다 */}
      <Preview color={color} /> {/*        값을 내려준다 */}
    </div>
  );
}

export default Ex0604LiftingState;

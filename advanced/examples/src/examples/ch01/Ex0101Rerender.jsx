// Ex0101Rerender.jsx - "언제 다시 그려지나?" 를 눈으로 확인하기 (기초 복습)
//
// 이 예제가 보여 주는 것
//   - state 가 바뀐 컴포넌트는 다시 그려지고(함수가 다시 실행되고), 그 자식들도 함께 다시 그려진다.
//   - 다시 그려져도 state 값은 유지된다. 일반 변수는 매번 처음값으로 돌아간다.
//   - key 가 바뀌면 React 는 "다른 컴포넌트" 로 보고 새로 만든다 → 안의 state 가 초기화된다.
//   콘솔(F12)에 찍히는 순서를 보면서 버튼을 눌러 보자.

import { useState } from "react";

// 자식: 자기 state(좋아요 수)를 가진다
function Child({ label }) {
  const [likes, setLikes] = useState(0);
  console.log(`  └ Child(${label}) 그림, likes=${likes}`);
  return (
    <div style={{ margin: "6px 0 6px 20px" }}>
      {label} <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
    </div>
  );
}

function Ex0101Rerender() {
  const [count, setCount] = useState(0);
  const [resetKey, setResetKey] = useState(1);
  console.log(`Parent 그림, count=${count}`);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>부모 count +1 ({count})</button>
      <button onClick={() => setResetKey(resetKey + 1)}>B 의 key 바꾸기</button>
      {/* 부모가 다시 그려지면 A, B 모두 다시 그려지지만 각자의 likes 는 남아 있다 */}
      <Child label="A" />
      {/* key 가 바뀌면 B 는 새로 만들어진다 → likes 가 0 으로 */}
      <Child key={resetKey} label={`B (key=${resetKey})`} />
    </div>
  );
}

export default Ex0101Rerender;

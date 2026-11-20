// Ex0601Counter.jsx - state 와 이벤트의 첫걸음: 카운터
//
// 이 예제가 보여 주는 것
//   - useState(처음값) 은 [지금 값, 값을 바꾸는 함수] 를 돌려준다.
//   - 화면에 쓰이는 값이 바뀌어야 하면 일반 변수가 아니라 state 에 담는다.
//   - set 함수로 값을 바꾸면 React 가 컴포넌트 함수를 "다시 실행" 해서 화면을 새로 그린다.
//   - onClick={함수} 에는 함수를 "넘긴다". onClick={함수()} 처럼 부르면 안 된다.

import { useState } from "react"; // React 가 주는 Hook 을 가져온다

function Ex0601Counter() {
  const [count, setCount] = useState(0); // count 의 처음값은 0

  // 일반 변수는 다시 그릴 때마다 처음값으로 돌아간다 → 화면 값 저장에 못 쓴다
  let normal = 0;

  console.log("Ex0601Counter 함수 실행! count =", count); // 다시 그려질 때마다 찍힌다

  const handleMinus = () => setCount(count - 1); // 이벤트 처리 함수를 미리 만들어 두는 방법

  return (
    <div>
      <h2>{count}</h2>
      {/* 함수를 바로 써 넣는 방법: 클릭할 때 화살표 함수가 실행된다 */}
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={handleMinus}>-1</button>
      <button onClick={() => setCount(0)}>처음으로</button>

      <hr />
      <p>일반 변수 normal = {normal}</p>
      <button
        onClick={() => {
          normal = normal + 1; // 값은 바뀌지만 React 는 다시 그리지 않는다
          console.log("normal =", normal);
        }}
      >
        일반 변수 +1 (화면은 그대로)
      </button>
    </div>
  );
}

export default Ex0601Counter;

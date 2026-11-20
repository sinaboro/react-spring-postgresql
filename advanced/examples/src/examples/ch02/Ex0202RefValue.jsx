// Ex0202RefValue.jsx - useRef ② : 다시 그리지 않고 값을 기억하는 상자
//
// 이 예제가 보여 주는 것
//   - ref.current 에 넣은 값은 다시 그려져도 사라지지 않는다 (일반 변수와 다른 점)
//   - ref.current 를 바꿔도 화면은 다시 그려지지 않는다 (state 와 다른 점)
//   - 그래서 "화면에 보일 필요는 없지만 기억해야 하는 값" 에 쓴다. 예) 타이머 번호
//
//              다시 그려져도 값 유지    값을 바꾸면 다시 그림
//   일반 변수          X                      X
//   state              O                      O
//   ref                O                      X

import { useRef, useState } from "react";

function Ex0202RefValue() {
  const [seconds, setSeconds] = useState(0); // 화면에 보여야 하므로 state
  const timerRef = useRef(null); //             setInterval 번호 - 화면엔 안 보이므로 ref
  const clickRef = useRef(0); //                버튼을 몇 번 눌렀는지 - 몰래 세기만

  const start = () => {
    clickRef.current += 1;
    if (timerRef.current) return; // 이미 돌고 있으면 또 만들지 않는다
    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1); // 함수형 업데이트: 최신 값 기준으로 +1
    }, 1000);
  };

  const stop = () => {
    clickRef.current += 1;
    clearInterval(timerRef.current); // 기억해 둔 번호로 멈춘다
    timerRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <div>
      <h2>⏱ {seconds}초</h2>
      <button onClick={start}>시작</button>
      <button onClick={stop}>멈춤</button>
      <button onClick={reset}>처음으로</button>
      {/* clickRef 는 바뀌어도 바로 다시 그리지 않는다. 다른 이유로 다시 그려질 때 새 값이 보인다 */}
      <p>버튼을 누른 횟수(ref): {clickRef.current} ← 초가 바뀌어 다시 그려질 때만 갱신된다</p>
    </div>
  );
}

export default Ex0202RefValue;

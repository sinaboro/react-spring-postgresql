// Ex0803Clock.jsx - 정리(clean-up) 함수가 필요한 경우: 타이머
//
// 이 예제가 보여 주는 것
//   - setInterval 로 1초마다 시각을 바꾸는 시계
//   - 컴포넌트가 사라질 때 clearInterval 로 타이머를 멈추지 않으면,
//     보이지 않는 곳에서 타이머가 계속 돌아 메모리와 CPU 를 낭비한다.
//   - "시계 숨기기" 를 누르면 Clock 이 사라지면서 정리 함수가 실행된다(콘솔 확인).

import { useEffect, useState } from "react";

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000); // 1초마다 새 시각
    console.log("타이머 시작", id);
    return () => {
      clearInterval(id); // 정리: 타이머 멈춤
      console.log("타이머 정리", id);
    };
  }, []);

  return <h2>🕒 {now.toLocaleTimeString("ko-KR")}</h2>;
}

function Ex0803Clock() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? "시계 숨기기" : "시계 보이기"}</button>
      {show && <Clock />} {/* show 가 false 가 되면 Clock 이 화면에서 사라진다 */}
    </div>
  );
}

export default Ex0803Clock;

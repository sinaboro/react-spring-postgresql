// Ex0801Effect.jsx - useEffect: 화면을 그린 "뒤에" 할 일
//
// 이 예제가 보여 주는 것
//   useEffect(할 일, [의존성 배열])
//   - 배열을 아예 안 쓰면   : 그릴 때마다 매번 실행
//   - 빈 배열 []            : 처음 화면에 나타났을 때 한 번만 실행 (데이터 불러오기에 쓴다)
//   - [count] 처럼 값을 쓰면 : 처음 + 그 값이 바뀔 때마다 실행
//   - 할 일 안에서 함수를 return 하면 "정리(clean-up)" 함수. 사라지기 직전에 실행된다.
//
//   브라우저 개발자 도구(F12) → Console 탭에서 찍히는 순서를 확인하자.
//   (개발 모드의 StrictMode 는 일부러 처음에 두 번 실행해 실수를 찾게 해 준다. 8장 본문 참고)

import { useEffect, useState } from "react";

function Ex0801Effect() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 1) 처음 한 번만
  useEffect(() => {
    console.log("① 처음 한 번: 화면에 나타났다");
    return () => console.log("① 정리: 화면에서 사라진다");
  }, []);

  // 2) count 가 바뀔 때마다 → 브라우저 탭 제목을 바꾼다 (화면 밖의 일 = 부수 효과)
  useEffect(() => {
    console.log("② count 가 바뀜:", count);
    document.title = `클릭 ${count}번`;
  }, [count]);

  // 3) 의존성 배열이 없으면 글자를 칠 때도, 버튼을 눌러도 매번 실행된다
  useEffect(() => {
    console.log("③ 그릴 때마다 실행");
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>클릭 {count}</button>
      <p>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="글자를 쳐 보세요" />
      </p>
      <p>브라우저 탭 제목과 콘솔(F12)을 함께 보세요.</p>
    </div>
  );
}

export default Ex0801Effect;

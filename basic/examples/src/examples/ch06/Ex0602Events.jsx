// Ex0602Events.jsx - 여러 개의 state 와 여러 가지 이벤트
//
// 이 예제가 보여 주는 것
//   - state 는 필요한 만큼 여러 개 만들 수 있다 (불린, 문자열, 숫자 ...)
//   - 이벤트 이름은 camelCase: onClick, onMouseEnter, onChange ...
//   - 이벤트 처리 함수는 이벤트 객체(e)를 받는다. e.target 은 이벤트가 일어난 태그
//   - 값을 하나 올리는 것처럼 "이전 값" 을 바탕으로 바꿀 때는 setX(prev => prev + 1) 이 안전하다

import { useState } from "react";

function Ex0602Events() {
  const [isOn, setIsOn] = useState(false); // 전등 켜짐/꺼짐
  const [message, setMessage] = useState("버튼 위로 마우스를 올려 보세요");
  const [likes, setLikes] = useState(0);

  // 이벤트 객체 e 에서 누른 버튼의 글자를 꺼낸다
  const handleColor = (e) => {
    setMessage(`"${e.target.textContent}" 버튼을 눌렀습니다`);
  };

  // 한 번 클릭에 3씩 올리고 싶다면?
  const addThree = () => {
    // setLikes(likes + 1) 을 세 번 쓰면 세 번 모두 같은 likes(예: 0) 를 보고 계산해서 1 만 오른다.
    // 함수를 넘기면 React 가 "바로 앞의 최신 값" 을 prev 로 넣어 준다 → 정확히 3 오른다.
    setLikes((prev) => prev + 1);
    setLikes((prev) => prev + 1);
    setLikes((prev) => prev + 1);
  };

  return (
    <div>
      {/* 1) 불린 state 뒤집기: !isOn */}
      <div style={{ fontSize: 40 }}>{isOn ? "💡" : "⚫"}</div>
      <button onClick={() => setIsOn(!isOn)}>{isOn ? "끄기" : "켜기"}</button>

      {/* 2) 이벤트 객체와 마우스 이벤트 */}
      <p>{message}</p>
      <button onClick={handleColor} onMouseEnter={() => setMessage("마우스가 올라왔다!")}>
        빨강
      </button>
      <button onClick={handleColor}>파랑</button>

      {/* 3) 이전 값으로 계산하기 */}
      <p>❤️ {likes}</p>
      <button onClick={addThree}>좋아요 +3</button>
    </div>
  );
}

export default Ex0602Events;

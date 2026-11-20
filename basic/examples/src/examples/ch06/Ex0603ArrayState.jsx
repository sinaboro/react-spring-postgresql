// Ex0603ArrayState.jsx - 배열·객체 state 는 "새로 만들어서" 바꾼다 (불변성)
//
// 이 예제가 보여 주는 것
//   - 배열에 추가: [...배열, 새것]            (push 쓰지 않기)
//   - 배열에서 삭제: 배열.filter(x => 조건)    (splice 쓰지 않기)
//   - 배열 안 하나 수정: 배열.map(x => x.id === id ? {...x, 바뀐값} : x)
//   - 원본을 직접 고치면(push 등) 같은 배열이라서 React 가 바뀐 줄 모르고 다시 그리지 않는다.

import { useState } from "react";

function Ex0603ArrayState() {
  const [members, setMembers] = useState([
    { id: 1, name: "민수", score: 80 },
    { id: 2, name: "지수", score: 92 },
  ]);
  const [nextId, setNextId] = useState(3); // 새 회원에게 줄 번호

  // 추가: 기존 배열을 펼치고 새 객체를 뒤에 붙인 "새 배열" 로 바꾼다
  const addMember = () => {
    setMembers([...members, { id: nextId, name: `회원${nextId}`, score: 50 }]);
    setNextId(nextId + 1);
  };

  // 삭제: 그 id 만 빼고 남긴 새 배열
  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // 수정: 그 id 의 객체만 점수를 +10 한 새 객체로 바꾼 새 배열
  const addScore = (id) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, score: m.score + 10 } : m)));
  };

  // 잘못된 방법: 원본을 직접 고친다 → 화면이 바뀌지 않는다
  const wrongAdd = () => {
    members.push({ id: 999, name: "몰래 추가", score: 0 });
    setMembers(members); // 같은 배열이므로 React 는 "그대로네" 하고 넘어간다
    console.log("배열 길이는 늘었는데 화면은 그대로:", members.length);
  };

  return (
    <div>
      <button onClick={addMember}>회원 추가</button>
      <button onClick={wrongAdd}>잘못된 추가(push)</button>
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} ({m.score}점) <button onClick={() => addScore(m.id)}>+10</button>
            {/* 인자를 넘겨야 하는 함수는 화살표 함수로 한 번 감싼다 */}
            <button onClick={() => removeMember(m.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ex0603ArrayState;

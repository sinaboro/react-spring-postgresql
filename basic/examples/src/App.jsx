// App.jsx - 기초 과정 예제 모음의 "메뉴" 화면
//
// 이 파일이 하는 일
//   - 왼쪽 메뉴에서 예제를 고르면 오른쪽에 그 예제 컴포넌트를 보여 준다.
//   - 고른 예제는 주소 끝(#0601 처럼)에도 적어 두어, 새로 고침해도 그 예제가 그대로 보인다.
//   - 이 메뉴는 6장(state)·8장(useEffect)에서 배우는 것으로 만들었다. 지금은 몰라도 괜찮다.
//     각 장에서는 오른쪽에 보이는 예제 파일(src/examples/...)만 보면 된다.

import { useEffect, useState } from "react";
import "./App.css";

import Ex0301Hello from "./examples/ch03/Ex0301Hello";
import Ex0302Rules from "./examples/ch03/Ex0302Rules";
import Ex0401Props from "./examples/ch04/Ex0401Props";
import Ex0501Condition from "./examples/ch05/Ex0501Condition";
import Ex0502List from "./examples/ch05/Ex0502List";
import Ex0601Counter from "./examples/ch06/Ex0601Counter";
import Ex0602Events from "./examples/ch06/Ex0602Events";
import Ex0603ArrayState from "./examples/ch06/Ex0603ArrayState";
import Ex0604LiftingState from "./examples/ch06/Ex0604LiftingState";
import Ex0701Input from "./examples/ch07/Ex0701Input";
import Ex0702Form from "./examples/ch07/Ex0702Form";
import Ex0703TodoApp from "./examples/ch07/Ex0703TodoApp";
import Ex0801Effect from "./examples/ch08/Ex0801Effect";
import Ex0802Fetch from "./examples/ch08/Ex0802Fetch";
import Ex0803Clock from "./examples/ch08/Ex0803Clock";

// 메뉴 목록: [번호, 제목, 컴포넌트, 파일 경로]
const EXAMPLES = [
  ["0301", "3장 첫 JSX", Ex0301Hello, "ch03/Ex0301Hello.jsx"],
  ["0302", "3장 JSX 규칙", Ex0302Rules, "ch03/Ex0302Rules.jsx"],
  ["0401", "4장 컴포넌트와 props", Ex0401Props, "ch04/Ex0401Props.jsx"],
  ["0501", "5장 조건부 렌더링", Ex0501Condition, "ch05/Ex0501Condition.jsx"],
  ["0502", "5장 목록과 key", Ex0502List, "ch05/Ex0502List.jsx"],
  ["0601", "6장 카운터(state)", Ex0601Counter, "ch06/Ex0601Counter.jsx"],
  ["0602", "6장 여러 이벤트", Ex0602Events, "ch06/Ex0602Events.jsx"],
  ["0603", "6장 배열 state", Ex0603ArrayState, "ch06/Ex0603ArrayState.jsx"],
  ["0604", "6장 state 끌어올리기", Ex0604LiftingState, "ch06/Ex0604LiftingState.jsx"],
  ["0701", "7장 입력 칸", Ex0701Input, "ch07/Ex0701Input.jsx"],
  ["0702", "7장 폼", Ex0702Form, "ch07/Ex0702Form.jsx"],
  ["0703", "7장 할 일 앱", Ex0703TodoApp, "ch07/Ex0703TodoApp.jsx"],
  ["0801", "8장 useEffect", Ex0801Effect, "ch08/Ex0801Effect.jsx"],
  ["0802", "8장 데이터 불러오기", Ex0802Fetch, "ch08/Ex0802Fetch.jsx"],
  ["0803", "8장 타이머 정리", Ex0803Clock, "ch08/Ex0803Clock.jsx"],
];

// 주소의 # 뒤 번호를 읽는다. 없으면 첫 예제
const fromHash = () => window.location.hash.slice(1) || EXAMPLES[0][0];

function App() {
  const [current, setCurrent] = useState(fromHash);

  // 고른 번호를 주소 끝에 적는다 (#0601)
  useEffect(() => {
    window.location.hash = current;
  }, [current]);

  const found = EXAMPLES.find((ex) => ex[0] === current) || EXAMPLES[0];
  const [, title, Example, file] = found; // 배열 구조 분해 (첫 칸은 건너뜀)

  return (
    <div className="layout">
      <nav className="menu">
        <h1>React 기초 예제</h1>
        {EXAMPLES.map(([id, label]) => (
          <button key={id} className={id === current ? "active" : ""} onClick={() => setCurrent(id)}>
            {label}
          </button>
        ))}
      </nav>
      <main className="stage">
        <div className="file">src/examples/{file}</div>
        <h2 className="ex-title">{title}</h2>
        {/* key 를 바꾸면 예제를 바꿀 때마다 새로 만들어진다 (state 초기화) */}
        <div className="ex-body">
          <Example key={current} />
        </div>
      </main>
    </div>
  );
}

export default App;

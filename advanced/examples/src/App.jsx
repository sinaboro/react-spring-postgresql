// App.jsx - 심화 과정 예제 모음의 "메뉴" 화면
//
// 이 파일이 하는 일
//   - 왼쪽 메뉴에서 예제를 고르면 오른쪽에 그 예제 컴포넌트를 보여 준다. (기초 과정 예제 앱과 같은 구조)
//   - 4장 React Router 예제는 주소(URL)를 직접 다루므로 이 앱이 아니라
//     따로 만든 advanced/router-demo 프로젝트에 있다.

import { useEffect, useState } from "react";
import "./App.css";

import Ex0101Rerender from "./examples/ch01/Ex0101Rerender";
import Ex0201RefFocus from "./examples/ch02/Ex0201RefFocus";
import Ex0202RefValue from "./examples/ch02/Ex0202RefValue";
import Ex0203Reducer from "./examples/ch02/Ex0203Reducer";
import Ex0301CustomHooks from "./examples/ch03/Ex0301CustomHooks";
import Ex0302UseFetch from "./examples/ch03/Ex0302UseFetch";
import Ex0501Theme from "./examples/ch05/Ex0501Theme";
import Ex0502FakeAuth from "./examples/ch05/Ex0502FakeAuth";

// 메뉴 목록: [번호, 제목, 컴포넌트, 파일 경로]
const EXAMPLES = [
  ["0101", "1장 다시 그리기 관찰", Ex0101Rerender, "examples/ch01/Ex0101Rerender.jsx"],
  ["0201", "2장 useRef - 태그 잡기", Ex0201RefFocus, "examples/ch02/Ex0201RefFocus.jsx"],
  ["0202", "2장 useRef - 값 기억", Ex0202RefValue, "examples/ch02/Ex0202RefValue.jsx"],
  ["0203", "2장 useReducer 장바구니", Ex0203Reducer, "examples/ch02/Ex0203Reducer.jsx"],
  ["0301", "3장 useInput·useLocalStorage", Ex0301CustomHooks, "examples/ch03/Ex0301CustomHooks.jsx"],
  ["0302", "3장 useFetch", Ex0302UseFetch, "examples/ch03/Ex0302UseFetch.jsx"],
  ["0501", "5장 Context 테마", Ex0501Theme, "examples/ch05/Ex0501Theme.jsx"],
  ["0502", "5장 Context 로그인 연습", Ex0502FakeAuth, "examples/ch05/Ex0502FakeAuth.jsx"],
];

const fromHash = () => window.location.hash.slice(1) || EXAMPLES[0][0];

function App() {
  const [current, setCurrent] = useState(fromHash);

  useEffect(() => {
    window.location.hash = current; // 새로 고침해도 같은 예제가 보이게 주소 끝에 기록
  }, [current]);

  const [, title, Example, file] = EXAMPLES.find((ex) => ex[0] === current) || EXAMPLES[0];

  return (
    <div className="layout">
      <nav className="menu">
        <h1>React 심화 예제</h1>
        {EXAMPLES.map(([id, label]) => (
          <button key={id} className={id === current ? "active" : ""} onClick={() => setCurrent(id)}>
            {label}
          </button>
        ))}
      </nav>
      <main className="stage">
        <div className="file">src/{file}</div>
        <h2 className="ex-title">{title}</h2>
        <div className="ex-body">
          <Example key={current} />
        </div>
      </main>
    </div>
  );
}

export default App;

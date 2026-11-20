// Ex0501Theme.jsx - Context 로 테마 나눠 쓰기
//
// 이 예제가 보여 주는 것
//   - Page → Section → Card 처럼 깊이 들어간 컴포넌트도 useTheme() 한 줄로 테마를 꺼낸다.
//   - 중간의 Section 은 테마를 쓰지 않으므로 props 로 받지도 넘기지도 않는다.
//     (props 로만 했다면 Section 이 쓰지도 않는 dark 를 받아서 Card 에 넘겨야 한다 = prop drilling)

import { ThemeProvider, useTheme } from "../../context/ThemeContext";

function ThemeButton() {
  const { dark, toggle } = useTheme();
  return <button onClick={toggle}>{dark ? "☀️ 밝게" : "🌙 어둡게"}</button>;
}

function Card({ title }) {
  const { dark } = useTheme(); // 깊은 곳에서 바로 꺼낸다
  const style = {
    padding: 12,
    margin: 6,
    borderRadius: 8,
    background: dark ? "#2b2f36" : "#f4f7fb",
    color: dark ? "#e8eaed" : "#222",
  };
  return <div style={style}>{title}</div>;
}

// 테마를 모르는 중간 컴포넌트
function Section() {
  return (
    <div>
      <Card title="카드 1" />
      <Card title="카드 2" />
    </div>
  );
}

function Page() {
  const { dark } = useTheme();
  return (
    <div style={{ padding: 12, borderRadius: 10, background: dark ? "#16181d" : "white", border: "1px solid #ccc" }}>
      <ThemeButton />
      <Section />
    </div>
  );
}

function Ex0501Theme() {
  // Provider 로 감싼 안쪽에서만 useTheme 을 쓸 수 있다
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

export default Ex0501Theme;

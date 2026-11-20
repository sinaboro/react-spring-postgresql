// ThemeContext.jsx - Context ① : 앱 전체가 함께 쓰는 "밝은/어두운 테마"
//
// 이 파일이 보여 주는 것 (Context 를 만드는 3단계)
//   1. createContext()      : 값을 실어 나를 "통로" 를 만든다
//   2. <ThemeContext value> : Provider. 이 태그 안쪽의 모든 컴포넌트가 값을 받을 수 있다
//                             (React 19 부터는 <ThemeContext.Provider> 대신 <ThemeContext> 로 바로 쓴다)
//   3. useContext()         : 받는 쪽. props 로 여러 단계를 내려보내지 않아도 바로 꺼낸다
//   - 받는 쪽이 쓰기 편하게 useTheme() 라는 커스텀 훅으로 감싸 둔다.

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null); // 1. 통로 만들기

// 2. 값을 공급하는 컴포넌트
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark((d) => !d);

  // 내려보낼 값: 지금 테마 + 바꾸는 함수
  return <ThemeContext value={{ dark, toggle }}>{children}</ThemeContext>;
}

// 3. 받는 쪽이 쓸 훅
export function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null) {
    // Provider 바깥에서 쓰면 값이 없다 → 실수를 바로 알려 준다
    throw new Error("useTheme 은 <ThemeProvider> 안에서만 쓸 수 있습니다");
  }
  return value;
}

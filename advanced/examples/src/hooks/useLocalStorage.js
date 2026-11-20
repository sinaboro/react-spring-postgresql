// useLocalStorage.js - 커스텀 훅 ② : 새로 고침해도 남는 state
//
// 이 파일이 보여 주는 것
//   - useState 와 똑같이 [값, 바꾸는 함수] 를 돌려주지만, 값이 바뀔 때마다 브라우저의
//     localStorage 에도 저장한다. 처음에는 localStorage 에 저장된 값이 있으면 그것으로 시작한다.
//   - localStorage 는 문자열만 저장하므로 JSON.stringify / JSON.parse 로 바꿔 넣고 꺼낸다.
//   - useState(() => ...) : 함수를 넘기면 "처음 한 번만" 실행된다 (매번 localStorage 를 읽지 않게)
//   심화 9장에서 로그인 토큰을 이렇게 localStorage 에 보관한다.

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key); // 없으면 null
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // 값이 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

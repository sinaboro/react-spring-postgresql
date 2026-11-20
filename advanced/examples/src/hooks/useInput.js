// useInput.js - 커스텀 훅 ① : 입력 칸 하나를 다루는 코드를 묶은 것
//
// 이 파일이 보여 주는 것
//   - 커스텀 훅 = 이름이 use 로 시작하고, 안에서 다른 Hook(useState 등)을 쓰는 "평범한 함수"
//   - 컴포넌트마다 반복되던 "useState + onChange" 를 한 줄로 줄인다.
//   - 훅을 쓰는 컴포넌트마다 state 가 따로 생긴다 (값을 나눠 갖는 것이 아니라 "코드" 를 나눠 쓰는 것)
//
// 사용: const title = useInput("");
//       <input {...title.bind} />      ← value 와 onChange 를 한 번에 펼쳐 넣는다
//       title.value / title.reset()

import { useState } from "react";

export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initialValue);

  return {
    value,
    setValue,
    reset,
    bind: { value, onChange }, // <input {...bind} /> 로 쓰기 좋게 묶음
  };
}

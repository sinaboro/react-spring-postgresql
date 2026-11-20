// 05_module_math.js - 다른 파일에서 가져다 쓸 수 있게 내보내는(export) 쪽
//
// 이 예제가 보여 주는 것
//   - export        : 이름을 붙여 여러 개를 내보낸다 → 가져올 때 { } 안에 같은 이름
//   - export default : 파일의 "대표" 하나를 내보낸다  → 가져올 때 이름을 마음대로
// React 에서는 컴포넌트 하나 = 파일 하나, 그리고 export default 로 내보내는 것이 보통이다.
// 이 파일은 혼자 실행하지 않고 05_module_main.js 가 가져다 쓴다.

export const PI = 3.14; // 이름 붙여 내보내기

export function circleArea(r) {
  return PI * r * r;
}

// 대표로 내보내기 (파일마다 하나만 가능)
export default function add(a, b) {
  return a + b;
}

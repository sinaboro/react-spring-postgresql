// 05_module_main.js - 다른 파일의 함수를 가져오는(import) 쪽
//
// 이 예제가 보여 주는 것
//   - import 대표이름, { 이름1, 이름2 } from "./파일.js"
//   - "./" 는 "지금 이 파일과 같은 폴더" 라는 뜻
// React 의 main.jsx 에 있는 import App from './App.jsx' 와 똑같은 문법이다.
// (Vite 프로젝트 안에서는 .jsx 확장자를 생략해도 되지만, node 에서는 .js 까지 써야 한다)
//
// 실행: node 05_module_main.js

import plus, { PI, circleArea } from "./05_module_math.js";
// plus      ← export default 로 내보낸 add. 가져올 때 이름은 자유
// { PI, ... } ← export 로 내보낸 것. 이름이 정확히 같아야 한다

console.log(plus(2, 3));
console.log(PI);
console.log(circleArea(10));

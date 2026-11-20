// 04_array_methods.js - map, filter, find
//
// 이 예제가 보여 주는 것
//   - map    : 배열의 모든 칸을 바꿔 "같은 길이" 의 새 배열을 만든다
//   - filter : 조건에 맞는 칸만 남긴 새 배열을 만든다
//   - find   : 조건에 맞는 첫 번째 칸 하나를 찾는다 (없으면 undefined)
// 세 메서드 모두 원본 배열을 바꾸지 않는다. React 에서
//   map    → 목록 그리기, 수정하기
//   filter → 삭제하기, 검색하기
//   find   → 하나 고르기
// 에 그대로 쓰인다.
//
// 실행: node 04_array_methods.js

const todos = [
  { id: 1, text: "React 설치", done: true },
  { id: 2, text: "JSX 공부", done: false },
  { id: 3, text: "게시판 만들기", done: false },
];

// 1) map: 할 일 글자만 뽑기
const texts = todos.map((todo) => todo.text);
console.log(texts);

// 2) map: 화면에 그릴 문자열 만들기 (React 에서는 문자열 대신 <li> 태그를 만든다)
console.log(todos.map((t) => `${t.done ? "[v]" : "[ ]"} ${t.text}`));

// 3) filter: 아직 안 끝난 일만 / id 가 2 인 것을 "삭제" 한 새 배열
console.log(todos.filter((t) => !t.done).length, "개 남음");
console.log(todos.filter((t) => t.id !== 2).map((t) => t.id));

// 4) map + 전개 연산자: id 가 2 인 일만 done 을 true 로 "수정" 한 새 배열
const updated = todos.map((t) => (t.id === 2 ? { ...t, done: true } : t));
console.log(updated[1]);
console.log(todos[1]); // 원본은 그대로

// 5) find: id 로 하나 찾기
console.log(todos.find((t) => t.id === 3));
console.log(todos.find((t) => t.id === 9)); // 없으면 undefined

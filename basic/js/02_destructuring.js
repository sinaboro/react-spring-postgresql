// 02_destructuring.js - 구조 분해 할당
//
// 이 예제가 보여 주는 것
//   - 객체에서 원하는 속성만 꺼내 같은 이름의 변수로 만들기
//   - 배열에서 순서대로 값을 꺼내기
//   - 함수 매개변수 자리에서 바로 구조 분해하기
// React 에서는 props 를 받을 때 { title, writer } 처럼,
// useState 를 쓸 때 const [count, setCount] = ... 처럼 매일 쓴다.
//
// 실행: node 02_destructuring.js

const user = { name: "민수", age: 20, city: "서울" };

// 1) 객체 구조 분해: 속성 이름과 같은 변수가 만들어진다
const { name, age } = user; // const name = user.name; const age = user.age; 와 같다
console.log(name, age);

// 2) 없는 속성은 undefined. = 로 기본값을 줄 수 있다
const { job = "학생" } = user;
console.log(job);

// 3) 배열 구조 분해: 이름이 아니라 "순서" 로 꺼낸다
const colors = ["빨강", "초록", "파랑"];
const [first, second] = colors;
console.log(first, second);

// 4) useState 가 돌려주는 [값, 바꾸는 함수] 모양을 흉내 내 보기
function fakeUseState(initial) {
  const setValue = (v) => console.log(`값을 ${v}(으)로 바꿉니다`);
  return [initial, setValue]; // 배열 두 칸을 돌려준다
}
const [count, setCount] = fakeUseState(0);
console.log("count =", count);
setCount(1);

// 5) 매개변수 자리에서 바로 구조 분해 - React 컴포넌트가 props 를 받는 모양과 같다
function Profile({ name, city }) {
  return `${name} 님은 ${city}에 삽니다`;
}
console.log(Profile(user)); // user 객체 통째로 넘겨도 name, city 만 꺼내 쓴다

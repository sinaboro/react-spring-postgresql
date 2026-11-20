// 03_spread.js - 전개 연산자(...) 로 "복사해서 새로 만들기"
//
// 이 예제가 보여 주는 것
//   - ...배열 / ...객체 는 안의 내용을 펼쳐서 새 배열·새 객체를 만든다.
//   - 원본은 그대로 두고, 바뀐 "새 값" 을 만드는 방법 (불변성)
// React 의 state 는 직접 고치지 않고 항상 새 값을 만들어 바꾼다(6장).
// 그때 쓰는 문법이 바로 이것이다.
//
// 실행: node 03_spread.js

// 1) 배열 복사와 추가
const fruits = ["사과", "배"];
const more = [...fruits, "포도"]; // fruits 의 내용 + "포도" 로 된 새 배열
console.log(fruits); // 원본은 그대로
console.log(more);

// 2) 앞에 추가하기, 두 배열 합치기
console.log(["딸기", ...fruits]);
console.log([...fruits, ...["귤", "감"]]);

// 3) 객체 복사 + 일부 속성만 바꾸기
const user = { name: "민수", age: 20 };
const older = { ...user, age: 21 }; // 뒤에 쓴 age 가 앞의 age 를 덮어쓴다
console.log(user); // 원본은 그대로
console.log(older);

// 4) 왜 그냥 고치면 안 될까? - 같은 객체를 가리키기 때문
const a = { n: 1 };
const b = a; //     복사가 아니라 "같은 상자" 를 b 도 가리킨다
b.n = 99;
console.log(a.n); // 99 - b 를 고쳤는데 a 도 바뀌었다
console.log(a === b); // true - React 는 이것을 "안 바뀌었다" 고 판단한다

const c = { ...a, n: 100 }; // 새 상자
console.log(a === c); // false - 새 객체이므로 React 가 "바뀌었다" 고 알아챈다

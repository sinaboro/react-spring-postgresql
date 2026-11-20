# 2장. React 를 위한 JavaScript 문법

## 학습 목표

- 화살표 함수와 템플릿 문자열을 읽고 쓸 수 있다.
- 구조 분해 할당과 전개 연산자(...)로 객체·배열을 다룬다.
- `map`, `filter`, `find` 로 배열에서 새 배열을 만든다.
- `import` / `export` 로 파일을 나누고, `async` / `await` 로 기다리는 코드를 쓴다.

## 2-1. 왜 JavaScript 부터?

React 코드는 **그냥 JavaScript** 다. React 가 어렵게 느껴지는 이유의 대부분은 React 자체가 아니라 아래 문법이 낯설어서다. 이 장의 문법은 3장부터 **매일** 나온다.

| 문법 | React 에서 쓰는 곳 |
|---|---|
| 화살표 함수 `() => ...` | 컴포넌트, 버튼 클릭 처리 |
| 구조 분해 `const { a } = obj` | props 받기, useState |
| 전개 연산자 `...` | state 바꾸기 (6장) |
| `map` / `filter` | 목록 그리기, 삭제하기 |
| `import` / `export` | 컴포넌트를 파일로 나누기 |
| `async` / `await` | 서버에서 데이터 받기 (8·9장) |

이 장의 예제는 브라우저가 아니라 **node** 로 바로 실행한다. 결과가 터미널에 찍힌다.

**[PS]**

```powershell
cd C:\study\react-spring-postgresql\basic\js
node 01_arrow.js
```

## 2-2. 화살표 함수와 템플릿 문자열

<!-- file: basic/js/01_arrow.js -->

```js
// 01_arrow.js - 화살표 함수와 템플릿 문자열
//
// 이 예제가 보여 주는 것
//   - function 으로 만든 함수와 화살표 함수(=>)는 하는 일이 같다.
//   - 몸통이 한 줄이면 { } 와 return 을 생략할 수 있다.
//   - 백틱(`) 문자열 안의 ${ } 에 값을 바로 끼워 넣을 수 있다. (템플릿 문자열)
// React 에서는 컴포넌트와 이벤트 처리 함수를 대부분 화살표 함수로 쓴다.
//
// 실행: node 01_arrow.js

// 1) 예전 방식의 함수 선언
function add(a, b) {
  return a + b;
}

// 2) 같은 함수를 화살표 함수로 - 변수에 함수를 담는다
const add2 = (a, b) => {
  return a + b;
};

// 3) 몸통이 식 하나뿐이면 { } 와 return 을 함께 생략한다
const add3 = (a, b) => a + b;

// 4) 매개변수가 하나면 ( ) 도 생략할 수 있다 (React 코드에서는 보통 그냥 붙여 쓴다)
const double = (n) => n * 2;

console.log(add(1, 2), add2(1, 2), add3(1, 2)); // 세 함수 모두 결과가 같다
console.log(double(21));

// 5) 템플릿 문자열: + 로 이어 붙이는 대신 ${ } 안에 변수나 식을 넣는다
const name = "민수";
const age = 20;
console.log("이름: " + name + ", 나이: " + age); // 예전 방식
console.log(`이름: ${name}, 나이: ${age}`); //       템플릿 문자열
console.log(`내년 나이: ${age + 1}`); //             ${ } 안에는 계산식도 들어간다

// 6) 객체를 바로 돌려주는 화살표 함수는 ( ) 로 감싸야 한다
//    { 를 함수 몸통의 시작으로 오해하지 않게 하기 위해서다
const makeUser = (name, age) => ({ name, age }); // { name: name, age: age } 의 줄임
console.log(makeUser("지수", 22));
```

```text
3 3 3
42
이름: 민수, 나이: 20
이름: 민수, 나이: 20
내년 나이: 21
{ name: '지수', age: 22 }
```

- `(a, b) => a + b` 는 "a 와 b 를 받아서 a + b 를 돌려주는 함수" 다.
- 백틱(`` ` ``, 키보드 숫자 1 왼쪽) 문자열 안의 `${ }` 에 값을 끼워 넣는다.

## 2-3. 구조 분해 할당

객체나 배열에서 값을 **꺼내서 변수로 만드는** 줄임 문법이다.

<!-- file: basic/js/02_destructuring.js -->

```js
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
```

```text
민수 20
학생
빨강 초록
count = 0
값을 1(으)로 바꿉니다
민수 님은 서울에 삽니다
```

> 4번의 `const [count, setCount] = fakeUseState(0)` 모양을 기억해 두자. 6장의 `useState` 가 정확히 이렇게 생겼다.

## 2-4. 전개 연산자(...)와 "복사해서 새로 만들기"

<!-- file: basic/js/03_spread.js -->

```js
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
```

```text
[ '사과', '배' ]
[ '사과', '배', '포도' ]
[ '딸기', '사과', '배' ]
[ '사과', '배', '귤', '감' ]
{ name: '민수', age: 20 }
{ name: '민수', age: 21 }
99
true
false
```

마지막 부분이 중요하다. `const b = a` 는 복사가 아니라 **같은 상자를 둘이 가리키는 것**이다. 그래서 b 를 고치면 a 도 바뀌고, `a === b` 는 `true` 다. React 는 `===` 로 "바뀌었나?" 를 판단하기 때문에, state 는 **항상 `...` 로 새로 만들어서** 바꿔야 한다(6장).

## 2-5. 배열 메서드: map, filter, find

<!-- file: basic/js/04_array_methods.js -->

```js
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
```

```text
[ 'React 설치', 'JSX 공부', '게시판 만들기' ]
[ '[v] React 설치', '[ ] JSX 공부', '[ ] 게시판 만들기' ]
2 개 남음
[ 1, 3 ]
{ id: 2, text: 'JSX 공부', done: true }
{ id: 2, text: 'JSX 공부', done: false }
{ id: 3, text: '게시판 만들기', done: false }
undefined
```

| 메서드 | 돌려주는 것 | React 에서 |
|---|---|---|
| `배열.map(x => 새값)` | 같은 길이의 새 배열 | 목록 그리기, 하나 수정하기 |
| `배열.filter(x => 조건)` | 조건이 참인 것만 모은 새 배열 | 삭제하기, 검색하기 |
| `배열.find(x => 조건)` | 조건이 참인 첫 번째 하나 (없으면 `undefined`) | 하나 고르기 |

## 2-6. import 와 export: 파일 나누기

<!-- file: basic/js/05_module_math.js -->

```js
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
```

<!-- file: basic/js/05_module_main.js -->

```js
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
```

**[PS]**

```powershell
node 05_module_main.js
```

```text
5
3.14
314
```

> node 로 `import` 를 쓰려면 `package.json` 에 `"type": "module"` 이 있어야 한다. `basic/js/package.json` 에 적혀 있다. Vite 로 만든 React 프로젝트도 똑같이 적혀 있다.

## 2-7. Promise 와 async / await

서버에 데이터를 요청하면 답이 **바로 오지 않는다.** 이렇게 "나중에 결과를 주는 일" 을 다룰 때 `async` / `await` 를 쓴다.

<!-- file: basic/js/06_async.js -->

```js
// 06_async.js - Promise 와 async / await
//
// 이 예제가 보여 주는 것
//   - 시간이 걸리는 일(서버 요청 등)은 결과를 "나중에" 준다 → Promise
//   - await 를 붙이면 결과가 올 때까지 그 함수 안에서만 기다린다
//   - await 는 async 함수 안에서만 쓸 수 있다
//   - try / catch 로 실패(오류)를 잡는다
// React 에서 Spring Boot 서버에 fetch 로 요청할 때(8장, 9장) 이 모양을 그대로 쓴다.
//
// 실행: node 06_async.js

// 서버 요청 대신 "ms 밀리초 뒤에 값을 주는" 가짜 함수를 만든다
function fakeServer(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error("서버 오류!")); // 실패를 알린다
      else resolve(value); //                         성공 값을 넘긴다
    }, ms);
  });
}

async function main() {
  console.log("1. 요청 보냄");

  // await: fakeServer 가 값을 줄 때까지(0.5초) 기다렸다가 data 에 넣는다
  const data = await fakeServer({ id: 1, title: "첫 글" }, 500);
  console.log("2. 받은 데이터:", data);

  // 실패하는 요청은 try / catch 로 잡는다
  try {
    await fakeServer(null, 300, true);
    console.log("이 줄은 실행되지 않는다");
  } catch (err) {
    console.log("3. 오류를 잡았다:", err.message);
  }
}

main();
// main() 안의 await 는 main 함수만 기다리게 한다. 바깥의 다음 줄은 바로 실행된다.
console.log("0. main() 을 부른 바로 다음 줄 (먼저 찍힌다!)");
```

```text
1. 요청 보냄
0. main() 을 부른 바로 다음 줄 (먼저 찍힌다!)
2. 받은 데이터: { id: 1, title: '첫 글' }
3. 오류를 잡았다: 서버 오류!
```

번호 순서가 1 → 0 → 2 → 3 인 것에 주목하자. `await` 는 **그 함수 안에서만** 기다리게 한다. 기다리는 동안 바깥의 다른 코드는 계속 실행된다. 그래서 서버 응답을 기다리는 동안에도 화면이 멈추지 않는다.

## 정리

- 화살표 함수 `(a) => a * 2`, 템플릿 문자열 `` `${값}` ``
- 구조 분해: `const { name } = user`, `const [a, b] = arr`
- 전개 연산자로 **새 배열·새 객체** 만들기: `[...arr, x]`, `{ ...obj, age: 21 }`
- `map`(바꾸기) · `filter`(거르기) · `find`(찾기)는 원본을 바꾸지 않는다.
- `export` 로 내보내고 `import` 로 가져온다. `export default` 는 파일마다 하나.
- `await` 는 `async` 함수 안에서 결과가 올 때까지 기다린다. 실패는 `try / catch` 로 잡는다.

## 확인 문제

1. `function square(n) { return n * n; }` 을 화살표 함수 한 줄로 바꾸시오.
2. `const book = { title: "React", price: 30000, page: 300 };` 에서 구조 분해로 `title` 과 `price` 변수를 만드시오.
3. 위의 `book` 을 바꾸지 않고, `price` 만 `27000` 인 새 객체 `sale` 을 만드시오.
4. `const nums = [3, 8, 1, 10, 6];` 에서 5 보다 큰 수만 골라 2배 한 배열(`[16, 20, 12]`)을 만드시오. (`filter` 와 `map` 을 이어서)
5. 다음 코드를 실행하면 어떤 순서로 찍히는가? 이유도 쓰시오.

```js
async function run() {
  console.log("A");
  await new Promise((r) => setTimeout(r, 100));
  console.log("B");
}
run();
console.log("C");
```

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

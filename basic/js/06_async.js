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

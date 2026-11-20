// Ex0301Hello.jsx - 첫 JSX: { } 안에 자바스크립트 값 넣기
//
// 이 예제가 보여 주는 것
//   - 컴포넌트 = "화면 조각(JSX)을 돌려주는 함수". 이름은 반드시 대문자로 시작한다.
//   - JSX 안의 { } 에는 변수, 계산식, 함수 호출처럼 "값이 되는 식" 을 넣을 수 있다.
//   - export default 로 내보내야 다른 파일(App.jsx)에서 가져다 쓸 수 있다.

function Ex0301Hello() {
  // return 위쪽은 보통 자바스크립트 영역 - 화면에 쓸 값을 미리 준비한다
  const name = "민수";
  const today = new Date().toLocaleDateString("ko-KR"); // 예: 2026. 11. 20.
  const score = 87;

  // return 아래는 JSX 영역 - HTML 처럼 생겼지만 자바스크립트로 바뀌어 실행된다
  return (
    <div>
      <h2>안녕하세요, {name} 님!</h2> {/* { } 안의 변수 값이 들어간다 */}
      <p>오늘은 {today} 입니다.</p>
      <p>점수: {score}점, 10점 더하면 {score + 10}점</p> {/* 계산식도 된다 */}
      <p>이름 글자 수: {name.length}</p> {/* 속성·메서드도 된다 */}
    </div>
  );
}

export default Ex0301Hello;

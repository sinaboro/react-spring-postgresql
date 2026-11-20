// Ex0302Rules.jsx - JSX 의 규칙 5가지
//
// 이 예제가 보여 주는 것
//   1. 돌려주는 JSX 는 "부모 태그 하나" 로 감싼다. 감쌀 태그가 필요 없으면 <> </> (Fragment)
//   2. 모든 태그는 닫는다. <img>, <br>, <input> 도 <img /> 처럼 스스로 닫는다
//   3. class 대신 className (class 는 자바스크립트 예약어라서)
//   4. style 은 문자열이 아니라 객체로 쓰고, 속성 이름은 camelCase (font-size → fontSize)
//   5. JSX 안의 주석은 {/* ... */}

function Ex0302Rules() {
  // 4번 규칙: style 에 넘길 객체. 값이 숫자면 px 이 붙는다 (fontSize: 20 → 20px)
  const boxStyle = {
    backgroundColor: "#eef3f8",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
  };

  return (
    // 1번 규칙: 여러 태그를 Fragment(<> </>) 하나로 감쌌다. 화면에 <div> 가 더 생기지 않는다
    <>
      {/* 5번 규칙: JSX 안의 주석은 이렇게 쓴다 */}
      <h2 className="title">JSX 규칙</h2> {/* 3번 규칙: className */}
      <div style={boxStyle}>
        style 은 객체로 넘긴다. 바깥 {"{ }"} 는 "자바스크립트 시작", 안쪽 {"{ }"} 는 객체.
      </div>
      <p style={{ color: "crimson", fontWeight: "bold" }}>바로 객체를 써도 된다 (중괄호 두 겹)</p>
      <img src="/favicon.svg" alt="로고" width="40" /> {/* 2번 규칙: 스스로 닫기 */}
      <br />
      <input placeholder="input 도 스스로 닫는다" />
    </>
  );
}

export default Ex0302Rules;

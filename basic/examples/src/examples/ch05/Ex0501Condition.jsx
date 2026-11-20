// Ex0501Condition.jsx - 조건부 렌더링 (조건에 따라 다른 화면 보여 주기)
//
// 이 예제가 보여 주는 것
//   1. 조건 ? A : B   → 둘 중 하나를 보여 줄 때
//   2. 조건 && A      → 조건이 참일 때만 보여 줄 때 (거짓이면 아무것도 안 그림)
//   3. if 문 + 일찍 return → 경우가 완전히 다를 때
//   JSX 의 { } 안에는 "식" 만 들어가므로 if 문은 쓸 수 없다. 그래서 1·2 를 주로 쓴다.

// 3번 방식: 컴포넌트 안에서 if 로 먼저 걸러 내기
function LoginMessage({ isLogin, name }) {
  if (!isLogin) {
    return <p>로그인이 필요합니다.</p>; // 여기서 끝. 아래 줄은 실행되지 않는다
  }
  return <p>{name} 님, 환영합니다!</p>;
}

function Ex0501Condition() {
  const isLogin = true; // false 로 바꿔 저장하면 화면이 어떻게 바뀌는지 보자
  const name = "민수";
  const unread = 3; // 0 으로도 바꿔 보자

  return (
    <div>
      {/* 1. 삼항 연산자: 버튼 글자를 둘 중 하나로 */}
      <button>{isLogin ? "로그아웃" : "로그인"}</button>

      {/* 2. && : 읽지 않은 알림이 있을 때만 보여 준다 */}
      {unread > 0 && <p>🔔 읽지 않은 알림 {unread}개</p>}
      {/* 주의: {unread && ...} 로 쓰면 unread 가 0 일 때 화면에 0 이 찍힌다. 비교식을 쓰자 */}

      {/* 3. if 문을 쓴 컴포넌트 */}
      <LoginMessage isLogin={isLogin} name={name} />
      <LoginMessage isLogin={false} />
    </div>
  );
}

export default Ex0501Condition;

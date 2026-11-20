// ProfileCard.jsx - 여러 종류의 props (문자열, 숫자, 불린, 배열)
//
// 이 예제가 보여 주는 것
//   - 문자열이 아닌 값(숫자, true/false, 배열, 객체, 함수)은 { } 로 감싸서 넘긴다.
//   - 받는 쪽은 그냥 자바스크립트 값으로 쓴다.
//   - props 는 "읽기 전용" 이다. 받은 컴포넌트가 고치면 안 된다 (고치는 방법은 6장 state).

import "./ProfileCard.css"; // 이 컴포넌트에서만 쓰는 스타일 파일을 불러온다

function ProfileCard({ name, age, isStudent, hobbies }) {
  return (
    <div className="profile-card">
      <h3>{name}</h3>
      <p>나이: {age}세</p>
      {/* 불린은 화면에 그대로 찍히지 않으므로 글자로 바꿔 보여 준다 */}
      <p>신분: {isStudent ? "학생" : "직장인"}</p>
      {/* 배열의 join 으로 쉼표를 넣어 한 줄로 */}
      <p>취미: {hobbies.join(", ")}</p>
    </div>
  );
}

export default ProfileCard;

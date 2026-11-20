// Ex0401Props.jsx - 컴포넌트를 여러 파일로 나누고 props 로 값 넘기기
//
// 이 예제가 보여 주는 것
//   - components 폴더의 컴포넌트를 import 해서 태그처럼 쓴다.
//   - 같은 컴포넌트에 다른 props 를 넘기면 다른 내용이 그려진다 (재사용).
//   - 부모 → 자식 방향으로만 값이 흐른다 (단방향 데이터 흐름).

import Greeting from "./components/Greeting";
import ProfileCard from "./components/ProfileCard";
import Box from "./components/Box";

function Ex0401Props() {
  return (
    <div>
      {/* 1) 문자열 props 는 따옴표로 */}
      <Greeting name="민수" />
      <Greeting name="지수" />
      <Greeting /> {/* name 을 안 넘기면 기본값 "손님" */}

      {/* 2) 숫자·불린·배열은 { } 로 */}
      <ProfileCard name="민수" age={20} isStudent={true} hobbies={["축구", "게임"]} />
      <ProfileCard name="지수" age={27} isStudent={false} hobbies={["독서", "요리", "등산"]} />

      {/* 3) children: 태그 사이의 내용이 Box 안으로 들어간다 */}
      <Box title="📢 공지">
        <p>다음 주 월요일은 휴강입니다.</p>
      </Box>
      <Box title="📝 과제">
        <ul>
          <li>ProfileCard 를 하나 더 만들어 보기</li>
        </ul>
      </Box>
    </div>
  );
}

export default Ex0401Props;

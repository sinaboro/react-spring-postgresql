# 부록 B. 용어 풀이

기초 교안 부록 B 의 용어에 더해, 심화 과정에서 새로 나온 용어다.

| 용어 | 풀이 |
|---|---|
| **리렌더링** | state·props·Context 가 바뀌어 컴포넌트 함수가 다시 실행되는 것 |
| **useRef** | 다시 그려도 남고, 바꿔도 다시 그리지 않는 기억 상자. 태그(DOM)를 잡을 때도 쓴다 |
| **DOM** | 브라우저가 HTML 을 읽어 만든 태그 나무. `ref.current` 로 실제 태그에 접근 |
| **useReducer** | `(state, action) → 새 state` 리듀서 함수로 state 를 바꾸는 Hook |
| **action / dispatch** | "무엇을 할지" 를 담은 객체(`{ type }`) / 그 action 을 리듀서에게 보내는 함수 |
| **순수 함수** | 같은 입력에 항상 같은 결과, 바깥을 바꾸지 않는 함수. 리듀서가 그래야 한다 |
| **커스텀 훅** | `use` 로 시작하고 다른 Hook 을 쓰는 함수. Hook 코드를 재사용 |
| **localStorage** | 브라우저의 작은 글자 저장소. 브라우저를 닫아도 남는다 |
| **useCallback / useMemo / memo** | 함수 유지 / 계산 결과 재사용 / props 가 같으면 다시 그리기 건너뛰기 (최적화) |
| **SPA** | Single Page Application. HTML 한 장을 받고 자바스크립트가 화면을 바꾸는 앱 |
| **라우팅** | 주소(URL)에 맞는 화면을 고르는 것 |
| **React Router** | React 의 라우팅 라이브러리 (`react-router` 패키지) |
| **Route / Routes** | 주소 하나와 화면 하나의 연결 / 그 목록 |
| **Link / NavLink** | 페이지를 새로 받지 않고 주소를 바꾸는 링크 / 지금 주소면 active 가 붙는 링크 |
| **Outlet** | 부모 Route 의 화면 안에서 자식 Route 의 화면이 들어갈 자리 |
| **useParams / useSearchParams** | 주소 속 `:id` 값 / `?q=` 같은 쿼리 값을 읽는 Hook |
| **useNavigate / navigate(-1)** | 코드로 주소를 바꾸는 함수 / 뒤로 가기 |
| **replace** | 이동하면서 지금 방문 기록을 바꿔치기 (뒤로 가기에 남지 않음) |
| **Context** | Provider 로 올려 둔 값을 깊은 곳의 컴포넌트가 바로 꺼내 쓰게 하는 기능 |
| **prop drilling** | 쓰지 않는 중간 컴포넌트를 거쳐 props 를 계속 내려보내는 것 |
| **Provider** | Context 값을 공급하는 컴포넌트 (`<AuthContext value={...}>`) |
| **인증 / 인가** | 누구인지 확인(실패 401) / 그 일을 해도 되는지 확인(실패 403) |
| **해시** | 한쪽으로만 바뀌는 변환. 비밀번호는 해시로 저장한다 |
| **소금 (salt)** | 해시할 때 섞는 무작위 값. 같은 비밀번호도 해시가 달라진다 |
| **BCrypt** | 비밀번호 전용 해시 방식. 일부러 느리고 소금을 섞는다. `$2a$10$...` 모양 (10 = 비용, 2의 10제곱 번 반복) |
| **세션 방식** | 서버가 로그인 명단을 저장하고 브라우저는 세션 번호(쿠키)를 갖는 방식 |
| **토큰 방식 / JWT** | 서버가 서명한 토큰을 브라우저가 보관해 요청마다 보내는 방식 / 그 토큰의 표준 형식 |
| **payload / 서명** | JWT 의 내용(sub, exp) / SECRET_KEY 로 만든 위조 방지 값 |
| **SECRET_KEY (jwt.secret)** | 서버만 아는 서명 열쇠. 새면 토큰을 위조할 수 있다. 이 과정은 application.yml 의 jwt.secret |
| **sub / exp** | JWT 의 주인(사용자 번호) / 만료 시각 |
| **Bearer 토큰** | `Authorization: Bearer <토큰>` 헤더로 보내는 토큰 |
| **Spring Security** | 요청이 Controller 에 닿기 전에 필터들을 거치게 해 로그인 여부·주소별 접근 규칙을 검사하는 Spring 라이브러리 |
| **필터 (Filter)** | 모든 요청이 Controller 전에 지나가는 관문. JwtAuthenticationFilter 가 토큰을 검사한다 |
| **SecurityContext / @AuthenticationPrincipal** | "지금 요청한 사람" 을 담아 두는 곳 / Controller 에서 그 사람(LoginUser)을 꺼내는 표시 |
| **@ManyToOne** | JPA 에서 "여러 개가 하나에 속한다" 는 관계. Post 여러 개 → User 하나, posts.user_id 외래 키가 된다 |
| **N+1 문제 / @EntityGraph** | 목록 N 개의 연관 데이터를 하나씩 따로 읽어 SELECT 가 N+1 번 실행되는 문제 / JOIN 으로 한 번에 읽게 하는 표시 |
| **외래 키 (FK)** | 다른 표의 기본 키를 가리키는 열. posts.user_id → users.id |
| **ON DELETE CASCADE** | 가리키는 줄(사용자)이 지워지면 이 줄(글)도 함께 지운다 |
| **UNIQUE** | 같은 값이 두 번 들어갈 수 없게 하는 제약. 아이디 중복 방지 |
| **409 Conflict** | 이미 있는 것과 충돌 (중복 아이디) |
| **ProtectedRoute** | 로그인 안 했으면 로그인 화면으로 보내는 "문지기" 컴포넌트 (이 과정에서 만든 이름) |
| **XSS** | 페이지에 악성 스크립트를 끼워 넣는 공격. localStorage 의 토큰을 노릴 수 있다 |
| **httpOnly 쿠키** | 자바스크립트가 읽을 수 없는 쿠키. 토큰 보관에 더 안전한 방법 |

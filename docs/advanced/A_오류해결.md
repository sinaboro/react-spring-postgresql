# 부록 A. 자주 만나는 오류와 해결

기초 교안 부록 A 의 내용(설치, JSX, CORS, Docker 등)도 그대로 해당된다. 여기서는 심화 과정에서 새로 만나는 것만 모았다.

## A-1. Hook·Context

| 증상 | 원인 | 해결 |
|---|---|---|
| `Cannot read properties of null (reading 'focus')` | 화면이 그려지기 전에 `ref.current` 를 씀, 또는 `ref={...}` 연결을 빠뜨림 | useEffect 나 이벤트 안에서 쓰기, 태그에 `ref` 확인 |
| `모르는 action: ...` (리듀서의 default 오류) | dispatch 의 type 오타 | 리듀서의 case 이름과 똑같이 |
| 리듀서로 바꿨는데 화면이 안 바뀜 | 리듀서에서 `state.push` 등 원본을 고치고 같은 state 를 return | 새 배열·객체를 return |
| `useTheme 은 <ThemeProvider> 안에서만 ...`, `useAuth 는 <AuthProvider> 안에서만 ...` | Provider 로 감싸지 않은 곳에서 사용 | main.jsx(또는 상위)에서 Provider 로 감쌌는지 확인 |
| `Invalid hook call` | 일반 함수·조건문 안에서 Hook 을 부름 | Hook 은 컴포넌트·커스텀 훅의 맨 위에서만 |
| 커스텀 훅에서 무한 요청 | useEffect 의존성에 매번 새로 만들어지는 함수·객체를 넣음 | `useApi(fn, [id])` 처럼 값(deps)만 넣기 |

## A-2. React Router

| 증상 | 원인 | 해결 |
|---|---|---|
| `useNavigate() may be used only in the context of a <Router> component` | `<BrowserRouter>` 로 감싸지 않음, 또는 Router 바깥 컴포넌트에서 사용 | main.jsx 에서 `<BrowserRouter>` 로 App 을 감싼다 (AuthProvider 보다 바깥) |
| `Failed to resolve import "react-router"` | 패키지를 설치하지 않음 | `npm install react-router` |
| 링크를 누르면 화면이 깜빡이고 state 가 사라짐 | `<a href>` 사용 | `<Link to>` 로 바꾼다 |
| 화면이 안 바뀌고 머리글만 보임 | Layout 에 `<Outlet />` 이 없음 | 자식 화면이 들어갈 자리에 `<Outlet />` |
| `useParams()` 값이 `undefined` | Route path 의 이름과 꺼내는 이름이 다름 (`:id` vs `postId`) | 이름을 똑같이 |
| id 비교가 항상 false | 주소 값은 문자열 (`"2" === 2` 는 false) | `Number(id)` 로 바꿔 비교 |
| 메뉴 "홈" 이 항상 active | `/` 는 모든 주소의 앞부분 | `<NavLink to="/" end>` |

## A-3. 로그인·JWT

| 증상 | 원인 | 해결 |
|---|---|---|
| 로그인했는데 글쓰기가 401 | 요청에 Authorization 헤더가 없음 | Network 탭 → Request Headers 확인. api.js 의 `request` 에서 토큰을 붙이는지 |
| 모든 요청이 401 "로그인이 만료되었습니다" | 토큰 만료, 또는 서버의 jwt.secret 이 바뀜 | 다시 로그인 |
| 로그인했다가 새로 고침하면 로그아웃됨 | 토큰을 localStorage 에 저장하지 않음, 또는 시작할 때 `/me` 복원 코드 누락 | AuthContext 의 login, 첫 useEffect 확인 |
| `/posts/new` 에서 F5 → 잠깐 로그인 화면으로 튕김 | 토큰 확인이 끝나기 전에 ProtectedRoute 가 user=null 로 판단 | AuthProvider 의 `ready` 처리 |
| 회원가입 400 "아이디는 영문 소문자·숫자·밑줄(_)로 4~20자입니다" 등 | 아이디(소문자·숫자·_ 4~20), 비밀번호(8~72) 규칙 위반 (`SignupRequest` 의 검사) | 화면의 validate 와 서버 SignupRequest 규칙을 맞춘다 |
| 409 "이미 사용 중인 아이디입니다" | 아이디 중복 | 다른 아이디 |
| 남의 글 수정 403 | 정상 동작 (PostService 의 소유권 검사) | - |
| 로그인했는데 글쓰기가 401, 서버 로그에는 오류 없음 | SecurityConfig 의 주소 규칙에서 막힘 (토큰이 안 붙었거나 틀림) | Network 탭에서 Authorization 헤더 확인 |
| CORS 오류인데 Authorization 헤더가 있는 요청만 실패 | CORS 설정에서 Authorization 헤더를 허락하지 않음 | SecurityConfig 의 `setAllowedHeaders(List.of("*"))` |
| IntelliJ 에서 `io.jsonwebtoken` 이나 `springframework.security` 에 빨간 줄 | build.gradle 을 바꾼 뒤 Gradle sync 를 안 함 | 오른쪽 Gradle 창 → 🔄 Reload All Gradle Projects |
| 서버 시작 실패 `WeakKeyException` (key byte array is ... bits) | `jwt.secret` 이 32글자(256비트)보다 짧음 | application.yml 의 jwt.secret 을 32글자 이상으로 |
| 콘솔에 `Using generated security password: ...` | UserDetailsService Bean 이 없음 | 저장소 SecurityConfig 처럼 빈 UserDetailsService 를 등록 (동작에는 영향 없음) |
| 서버 시작 실패 `Connection to localhost:5434 refused` | 심화 DB(spring-auth-db)가 꺼져 있음 | `C:\study\authboard` 에서 `docker compose up -d` |
| `Web server failed to start. Port 8080 was already in use.` | 기초 과정 서버가 아직 8080 을 쓰는 중 | IntelliJ 에서 기초 과정 서버를 ■ 로 끈다 |

# 부록 A. 자주 만나는 오류와 해결

오류가 나면 먼저 **어디서** 났는지 본다. ① VS Code 터미널(npm, docker)·IntelliJ Run 창(Spring Boot), ② 브라우저 화면의 빨간 오류 상자(Vite), ③ 브라우저 F12 → Console 탭, ④ F12 → Network 탭(요청 상태 코드). 오류 문장 안의 **파일 이름과 줄 번호**가 가장 큰 힌트다.

## A-1. 설치·실행

| 증상 | 원인 | 해결 |
|---|---|---|
| `'npm' 용어가 ... 인식되지 않습니다` | Node.js 미설치, 또는 설치 전에 연 터미널 | Node.js 설치 후 VS Code 를 완전히 껐다 켠다 |
| `npm run dev` → `Missing script: "dev"` | `package.json` 이 없는 폴더에서 실행 | `cd` 로 프로젝트 폴더(예: `my-react`)에 들어간다 |
| `'vite' 은(는) 내부 또는 외부 명령...이 아닙니다` | `npm install` 을 안 함 | 그 폴더에서 `npm install` |
| `Port 5173 is in use, trying another one...` | 다른 개발 서버가 5173 을 쓰는 중 | 오류는 아니다. 터미널에 나온 새 주소로 연다. 9장에서는 하나만 켜자 (CORS 는 5173 만 허락) |
| 저장했는데 화면이 안 바뀜 | 파일을 저장 안 함 / 다른 프로젝트의 파일을 고침 | 탭 옆 ● 확인, VS Code 왼쪽 탐색기에서 경로 확인 |

## A-2. JSX·React

| 증상 (오류 문장) | 원인 | 해결 |
|---|---|---|
| `Adjacent JSX elements must be wrapped in an enclosing tag` | return 안에 부모 태그가 둘 이상 | `<div>` 나 `<> </>` 로 감싼다 |
| `Expected corresponding JSX closing tag for 'input'` | `<input>`, `<br>`, `<img>` 를 안 닫음 | `<input />` 처럼 스스로 닫는다 |
| 화면이 하얗고 콘솔에 `... is not defined` | import 를 안 했거나 이름 오타 | 파일 위쪽 `import` 확인. 대소문자까지 같아야 한다 |
| `does not provide an export named 'default'` | 그 파일에 `export default` 가 없음 | 파일 끝에 `export default 컴포넌트이름;` |
| `Too many re-renders` | `onClick={setCount(1)}` 처럼 그릴 때 바로 실행 | `onClick={() => setCount(1)}` |
| `Each child in a list should have a unique "key" prop` | map 으로 만든 태그에 key 가 없음 | 가장 바깥 태그에 `key={item.id}` |
| `Objects are not valid as a React child` | `{user}` 처럼 객체를 그대로 JSX 에 넣음 | `{user.name}` 처럼 글자·숫자를 넣는다 |
| 입력 칸에 글자가 안 쳐짐 | `value` 만 있고 `onChange` 가 없음 | `onChange={e => setX(e.target.value)}` 추가 |
| state 를 바꿨는데 화면이 그대로 | `push`, `obj.x = ...` 로 원본을 직접 고침 | `[...arr, x]`, `{...obj, x}` 로 새로 만든다 |
| `Cannot read properties of null (reading 'title')` | 데이터가 오기 전에 `post.title` 을 그림 | `if (!post) return <p>불러오는 중...</p>;` 를 먼저 |
| `Cannot read properties of undefined (reading 'map')` | 배열 state 의 처음값이 없음 | `useState([])` 처럼 빈 배열로 시작 |
| 콘솔 로그가 두 번씩 찍힘 | 개발 모드의 StrictMode | 정상이다 (8-2 참고) |

## A-3. Spring Boot·서버 통신 (9장)

| 증상 | 원인 | 해결 |
|---|---|---|
| 화면에 "API 서버에 연결할 수 없습니다", 콘솔 `Failed to fetch` | Spring Boot 서버가 꺼져 있음 / 주소 오타 | IntelliJ 에서 `BoardApplication` ▶, `config.js` 의 주소(`localhost:8080`) 확인 |
| 콘솔 `blocked by CORS policy` | 서버의 CORS 허락 목록에 지금 주소(포트)가 없음 | `WebConfig.java` 의 `allowedOrigins` 확인. React 를 5173 으로 실행. 고친 뒤 서버를 ■ → ▶ 로 다시 켠다 |
| 저장 시 400 `{"detail": "제목을 입력하세요"}` | `@Valid` 입력 검사 실패 | 정상 동작. Network 탭 → Response 의 `detail` 을 읽는다 |
| 저장 시 415 | `Content-Type: application/json` 헤더를 빠뜨림 | fetch 의 `headers` 확인 |
| 404 | 주소 오타(`/api/post`), 없는 글 번호 | Network 탭에서 실제 요청 주소 확인 |
| 서버 시작 실패 `Connection to localhost:5433 refused` | DB 컨테이너가 꺼져 있음 | `docker compose up -d` 후 `docker compose ps` 가 healthy 인지 |
| 서버 시작 실패 `Web server failed to start. Port 8080 was already in use.` | 서버가 이미 하나 켜져 있음 | IntelliJ Run 창의 다른 탭이나 bootRun 터미널을 끈다 |
| IntelliJ 에서 java 파일에 빨간 줄, `Cannot resolve symbol 'springframework'` | Gradle sync 가 안 됐거나 실패함 | 오른쪽 Gradle 창 → 🔄 Reload. 인터넷 연결 확인 |
| IntelliJ 위쪽에 `Project JDK is not defined` | JDK 가 지정되지 않음 | Setup SDK → 21 선택 또는 Download JDK (Temurin 21) |
| Gradle: `Cannot find a Java installation ... matching ... languageVersion=21` | JDK 21 이 없음 (17 등 다른 버전만 있음) | JDK 21 설치 후 IntelliJ 를 다시 시작 |
| `.\gradlew.bat bootRun` → `JAVA_HOME is not set and no 'java' command could be found` | 터미널이 JDK 를 못 찾음 | JDK 설치 때 JAVA_HOME 설정. 또는 IntelliJ ▶ 로 실행 |
| 코드를 고쳤는데 서버 동작이 그대로 | 서버를 다시 켜지 않음 | IntelliJ ■ → ▶ |

## A-4. Docker

| 증상 | 원인 | 해결 |
|---|---|---|
| `failed to connect to the docker API` / `error during connect` | Docker Desktop 이 꺼져 있음 | Docker Desktop 실행 → Engine running 확인 |
| `Bind for 0.0.0.0:5433 failed: port is already allocated` | 다른 프로그램(컨테이너)이 5433 사용 | `docker ps` 로 확인 후 그 컨테이너를 멈추거나, compose 의 포트를 `"5435:5432"` 로 바꾸고 `application.yml` 의 `datasource.url` 포트도 같이 바꾼다 |
| 한쪽 과정 DB 를 켰더니 다른 과정 DB 컨테이너가 사라짐 | compose 파일에 `name:` 이 없어서 폴더 이름(board)이 겹침 | 저장소의 compose 파일처럼 `name:` 을 붙인다 |
| 글이 모두 사라짐 | `docker compose down -v` 로 볼륨까지 지움 | 되돌릴 수 없다. 평소에는 `stop` 또는 `down`(볼륨 유지)을 쓴다 |

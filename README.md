# React + Spring Boot + PostgreSQL 학습 교안

React 를 처음 배우는 학생을 위한 **2단계(기초 · 심화) 학습 교안과 실습 코드**입니다.
하나의 게시판을 기초 과정에서 만들고, 심화 과정에서 Router · Context · 로그인(JWT)을 더해 키워 갑니다.
서버는 **Spring Boot**(IntelliJ IDEA 로 실행)를 씁니다.

**웹 교안: https://sinaboro.github.io/react-spring-postgresql/** (PC·휴대폰에서 장별로 읽기, 코드 복사 단추)

> 같은 교안의 FastAPI(파이썬) 서버판: https://github.com/sinaboro/react-fastapi-postgresql
> 두 저장소의 React 코드와 API 모양(JSON)은 같고, 서버만 다릅니다.

| 구분 | 1단계 React 기초 | 2단계 React 심화 |
|---|---|---|
| 대상 | React 처음 배우는 학생 | React 기초 과정 수료자 |
| 시간 | 40시간 (5일) | 40시간 (5일) |
| React | JSX, 컴포넌트, props, state, 이벤트, 폼, useEffect, fetch | useRef, useReducer, 커스텀 훅, React Router, Context |
| Spring Boot | 게시글 CRUD REST API (JPA, 입력 검사, CORS) | 회원가입, 로그인(JWT), Spring Security, 소유권 검사 |
| PostgreSQL | Docker 로 DB 실행, posts 테이블 | users · posts 관계(@ManyToOne, FK), BCrypt 비밀번호 해시 |
| 결과물 | 게시판 CRUD 웹 서비스 | 로그인 기반 게시판 (본인 글만 수정·삭제) |
| 교안 | [docs/React_기초_학습교안.pdf](docs/React_기초_학습교안.pdf) | [docs/React_심화_학습교안.pdf](docs/React_심화_학습교안.pdf) |

## 폴더 구성

```text
basic/                     1단계 기초
  js/                      2장  React 를 위한 JavaScript 문법 (node 로 실행)
  examples/                3~8장 예제 완성본 (Vite 앱, 왼쪽 메뉴에서 예제 선택)
  board/                   9장  게시판 CRUD 완성본
    docker-compose.yml       PostgreSQL 18 (localhost:5433, DB board, 컨테이너 spring-board-db)
    backend/                 Spring Boot 4 + Spring Data JPA (IntelliJ 로 열기, :8080)
    frontend/                React (state 로 화면 전환)
advanced/                  2단계 심화
  examples/                1·2·3·5장 예제 완성본 (useRef, useReducer, 커스텀 훅, Context)
  router-demo/             4장  React Router 연습 프로젝트
  concepts/                6장  BCrypt 해시 · JWT 실험 (AuthDemo.java, IntelliJ 로 열기)
  board-router/frontend/   7장  완성본: 기초 게시판 + React Router + API 모듈 (백엔드는 basic/board/backend)
  board/                   8·9장 로그인 게시판 완성본
    docker-compose.yml       PostgreSQL 18 (localhost:5434, DB authboard, 컨테이너 spring-auth-db)
    backend/                 Spring Boot + Spring Security + JWT(jjwt) + BCrypt
    frontend/                React + React Router + AuthContext
docs/
  basic/, advanced/        교안 원고 (Markdown)
  images/                  개념 그림과 실행 화면
  React_기초_학습교안.pdf, React_심화_학습교안.pdf
tools/
  make_figures.py          개념 그림 만들기
  build_guide.py           원고 → PDF (코드 상자는 저장소의 실제 파일로 자동 채움)
  build_site.py            원고 → 웹 교안 (docs/index.html, docs/basic·advanced/*.html)
```

## 실행 환경

- Node.js 22 이상 (LTS), **JDK 21** (Eclipse Temurin), **IntelliJ IDEA**, Docker Desktop, VS Code, Git
- 확인한 버전: React 19.3, Vite 8.3, react-router 8.5, Spring Boot 4.1.2, Gradle 9.9, jjwt 0.13, springdoc 3.2, PostgreSQL 18

## 빠르게 실행해 보기

```powershell
# 1) 기초 게시판 DB
cd basic\board
docker compose up -d
```

2) API 서버: IntelliJ IDEA 에서 **File → Open → `basic\board\backend`** → Gradle sync 가 끝나면
`src/main/java/com/example/board/BoardApplication.java` 를 열고 ▶ 실행 → http://localhost:8080/docs
(터미널에서는 `basic\board\backend` 에서 `.\gradlew.bat bootRun`)

```powershell
# 3) React (새 터미널)
cd basic\board\frontend
npm install
npm run dev                        # http://localhost:5173
```

심화 로그인 게시판은 `advanced\board` 에서 같은 순서로 실행합니다 (DB 포트 5434).
두 과정의 API 서버는 모두 8080 번을 쓰므로 하나씩 켭니다.

## 교안 다시 만들기

```powershell
pip install reportlab matplotlib markdown
python tools\make_figures.py
python tools\build_guide.py              # 두 권 모두
python tools\build_guide.py basic        # 기초만
python tools\build_site.py               # 웹 교안 (GitHub Pages, docs/ 폴더)
```

강사 김대철

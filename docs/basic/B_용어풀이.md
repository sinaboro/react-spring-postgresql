# 부록 B. 용어 풀이

| 용어 | 풀이 |
|---|---|
| **React** | 웹 화면(UI)을 컴포넌트 단위로 만드는 자바스크립트 라이브러리 |
| **Vite** | React 프로젝트를 만들고, 개발 서버를 띄우고, 배포용 파일을 만드는 도구 |
| **npm** | Node.js 의 패키지 관리자. `npm install` 로 패키지를 받고 `npm run 이름` 으로 명령을 실행 |
| **패키지** | 다른 사람이 만들어 공유한 코드 묶음 (react, vite 등). `node_modules` 에 설치된다 |
| **package.json** | 프로젝트 이름, 필요한 패키지 목록, 실행 명령(scripts)을 적은 파일 |
| **개발 서버** | 개발하는 동안 화면을 띄워 주고, 저장하면 바로 반영해 주는 서버 (`npm run dev`) |
| **HMR** | Hot Module Replacement. 새로 고침 없이 바뀐 부분만 바로 바꿔 끼우는 기능 |
| **JSX** | 자바스크립트 안에 HTML 처럼 화면을 적는 문법. 실행 전에 자바스크립트로 바뀐다 |
| **컴포넌트** | 화면 조각을 돌려주는 함수. 이름은 대문자로 시작 |
| **props** | 부모 컴포넌트가 자식에게 넘기는 값들. 자식에게는 읽기 전용 |
| **children** | 여는 태그와 닫는 태그 사이에 넣은 내용을 받는 특별한 prop |
| **state** | 컴포넌트가 기억하는 "바뀌는 값". 바뀌면 화면이 다시 그려진다 |
| **Hook** | `use` 로 시작하는 React 함수 (useState, useEffect 등). 컴포넌트 맨 위에서만 부른다 |
| **렌더링** | 컴포넌트 함수를 실행해 화면을 그리는 것. "다시 그리기" = 리렌더링 |
| **이벤트** | 클릭, 입력, 제출처럼 사용자가 한 행동. `onClick` 등에 함수를 연결 |
| **불변성** | 원본을 고치지 않고 새 배열·객체를 만들어 바꾸는 것. state 를 바꿀 때 필수 |
| **조건부 렌더링** | 조건에 따라 다른 화면을 그리는 것 (`? :`, `&&`, if + return) |
| **key** | 목록의 각 항목을 구분하는 이름표. 형제끼리 고유해야 한다 |
| **제어 컴포넌트** | 입력 칸의 값을 state 와 묶어 React 가 관리하는 방식 (`value` + `onChange`) |
| **부수 효과** | 화면 그리기 말고 하는 일 (서버 요청, 타이머 등). `useEffect` 에 넣는다 |
| **의존성 배열** | useEffect 의 두 번째 인자. 이 값들이 바뀔 때 다시 실행된다 |
| **정리(clean-up) 함수** | useEffect 가 돌려주는 함수. 다음 실행 전·사라질 때 실행 |
| **fetch** | 브라우저가 서버에 HTTP 요청을 보내는 함수 |
| **Promise / async / await** | "나중에 결과를 주는 일" 을 다루는 문법. await 는 결과가 올 때까지 기다린다 |
| **JSON** | `{"title": "글"}` 처럼 데이터를 글자로 주고받는 형식 |
| **API** | 프로그램끼리 데이터를 주고받는 약속. 여기서는 Spring Boot 서버의 주소들 |
| **REST API** | 주소(자원)와 HTTP 방식(GET·POST·PUT·DELETE)으로 할 일을 나타내는 API 설계 규칙 |
| **CRUD** | Create(만들기)·Read(읽기)·Update(고치기)·Delete(지우기) |
| **HTTP 상태 코드** | 응답 결과를 나타내는 숫자. 200 성공, 201 생성, 204 내용 없음, 400 입력 오류, 404 없음, 415 본문 종류 오류 |
| **CORS** | 다른 출처(주소·포트)로 보낸 요청의 응답을 브라우저가 막는 규칙과, 서버가 그것을 허락하는 방법 |
| **출처(origin)** | 프로토콜 + 호스트 + 포트. `http://localhost:5173` 과 `http://localhost:8080` 은 다른 출처 |
| **Spring Boot** | Java 웹 서버를 적은 설정으로 만드는 프레임워크. 내장 Tomcat 이 함께 실행된다 |
| **IntelliJ IDEA** | Java·Spring 개발에 많이 쓰는 편집기(IDE). ▶ 로 서버를 실행한다 |
| **JDK** | Java 개발 도구 (컴파일러 + 실행기). 이 과정은 21 버전 |
| **Gradle / gradlew** | 라이브러리를 받고 빌드·실행하는 도구 / 프로젝트에 들어 있는 Gradle 실행 파일(설치 없이 쓴다) |
| **build.gradle** | 쓸 라이브러리(의존성)와 Java 버전을 적은 Gradle 설정 파일 |
| **application.yml** | 포트, DB 주소 등 Spring Boot 설정 파일 |
| **어노테이션** | `@RestController` 처럼 `@` 로 시작하는 표시. Spring 에게 "이 클래스·메서드는 이런 역할" 이라고 알린다 |
| **Bean / 의존성 주입(DI)** | Spring 이 만들어 보관하는 객체 / 생성자에 필요한 Bean 을 Spring 이 넣어 주는 것 |
| **Controller / Service / Repository** | 주소 담당 / 업무 규칙 담당 / DB 담당 층 |
| **DTO** | 요청·응답 JSON 모양을 정한 클래스 (`PostRequest`, `PostResponse`) |
| **record** | 값만 담는 클래스를 한 줄로 만드는 Java 문법 |
| **JPA / Hibernate** | Java 객체와 DB 테이블을 짝지어 SQL 을 대신 만들어 주는 기술 / 그 구현 라이브러리 |
| **Entity** | 테이블과 짝지어진 Java 클래스 (`@Entity`) |
| **Spring Data JPA** | 인터페이스만 만들면 Repository 구현과 SQL 을 만들어 주는 기능 |
| **@Transactional** | 메서드 안의 DB 작업을 하나로 묶는다. 오류가 나면 모두 취소 |
| **Bean Validation (@Valid)** | `@NotBlank`, `@Size` 같은 규칙으로 요청 값을 검사하는 기능. 어기면 400 |
| **Swagger UI (springdoc)** | `/docs` 에서 API 를 눌러 보며 시험하는 화면. springdoc 라이브러리가 만든다 |
| **PostgreSQL** | 관계형 데이터베이스. 표(테이블)에 데이터를 저장하고 SQL 로 다룬다 |
| **Docker / 컨테이너** | 프로그램을 설치 없이 "상자" 에 담아 실행하는 도구 / 그 상자 |
| **docker compose** | 컨테이너 설정을 `docker-compose.yml` 파일에 적어 한 번에 켜고 끄는 명령 |
| **볼륨** | Docker 가 관리하는 저장 공간. 컨테이너를 지워도 데이터가 남는다 |

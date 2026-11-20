# 부록 C. 확인 문제 풀이

풀이는 하나의 예시다. 결과가 같으면 다르게 써도 정답이다.

## 1장

1. (다) 남은 할 일 개수, (마) 할 일 배열의 길이 - 둘 다 할 일 배열(state)로 **계산**할 수 있다. 따로 state 로 만들면 두 값을 함께 맞춰야 하는 부담과 어긋날 위험만 생긴다. (가)(나)(라)는 바뀌면 화면이 바뀌어야 하고 다른 값으로 계산할 수 없으므로 state 다. (라)는 여러 곳에서 쓰므로 Context 에 둔다.
2. 다시 그려진다. Ex0101Rerender 에서 부모 count 를 올리면 props 가 바뀌지 않은 Child(A) 의 로그도 찍힌다. (건너뛰게 하려면 `memo`)
3. `<PostForm key={id} id={id} />` 처럼 글 번호를 key 로 준다. id 가 바뀌면 key 가 바뀌어 PostForm 이 새로 만들어지고 폼 state 가 처음부터 시작한다.

## 2장

1. (가) state - 화면에 보여야 한다. (나) ref - 기억은 해야 하지만 화면에 안 보인다. (다) 일반 변수(그릴 때 계산) - 매번 다시 계산하면 된다.
2.

```jsx
const listTopRef = useRef(null);
// ...
<button onClick={() => listTopRef.current?.scrollIntoView({ behavior: "smooth" })}>맨 위로</button>
// 첫 항목: names.map((n, i) => <li key={i} ref={i === 0 ? listTopRef : null}>{n}</li>)
```

3.

```js
case "increase":
  return state.map((item) => (item.id === action.id ? { ...item, qty: item.qty + 1 } : item));
```

`+` 버튼: `onClick={() => dispatch({ type: "increase", id: item.id })}`

4. 원본 배열(state)을 `push` 로 고치고 **같은 배열**을 돌려준다. React 는 "같은 값이니 안 바뀌었다" 고 보고 다시 그리지 않는다. `return [...state, { ...action.product, qty: 1 }];`

## 3장

1. React(그리고 검사 도구)는 이름이 `use` 로 시작하는 함수를 Hook 으로 보고 "맨 위에서만 불러야 한다" 같은 규칙을 검사한다. 또 읽는 사람이 "안에서 state 나 effect 를 쓰는 함수" 라는 것을 바로 알 수 있다.
2.

```js
import { useState } from "react";
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle];
}
```

3. 바로 바뀌지 않는다. 훅은 코드만 나눠 쓰고, 부를 때마다 **각자의 state** 가 생긴다. A 가 바꾼 값은 localStorage 에는 저장되지만, B 의 state 는 B 가 처음 만들어질 때 읽은 값 그대로다. (B 가 새로 만들어지면 그때 바뀐 값을 읽는다. 실시간으로 함께 쓰려면 Context 를 쓴다.)
4. url 이 빠르게 바뀔 때, 먼저 보낸 요청의 응답이 나중 요청보다 늦게 도착하면 **지난 요청의 결과로 화면을 덮어쓴다.** 예: 1번 글 → 2번 글로 바로 이동했는데 1번 응답이 늦게 와서 2번 글 주소에 1번 글이 보인다.

## 4장

1. `<Route path="/posts/:id/edit" element={<PostFormPage />} />` 그리고 컴포넌트에서 `const { id } = useParams();` (값은 문자열 `"7"`)
2. `<a href>` 는 브라우저가 서버에서 페이지를 새로 받아 앱이 처음부터 다시 시작된다(깜빡임, state 초기화, 느림). `<Link>` 는 주소만 바꾸고 React 가 화면만 바꾼다.
3. `pages/ContactPage.jsx` 를 만들고, App.jsx 에 `<Route path="contact" element={<ContactPage />} />`, Layout.jsx 메뉴에 `<NavLink to="/contact">연락처</NavLink>` 를 추가한다.
4. `useParams()` 로 꺼낸 값은 문자열 `"2"` 이고 `u.id` 는 숫자 `2` 라서 `===` 비교가 항상 false 다. `u.id === Number(userId)` 로 고친다.
5. 지금 방문 기록(예: 글쓰기 화면)을 새 주소로 **바꿔치기**한다. 저장 후 뒤로 가기를 눌러도 글쓰기 화면으로 돌아가지 않는다. (replace 가 없으면 뒤로 가기로 다시 글쓰기 폼이 나와 같은 글을 또 저장할 수 있다.)

## 5장

1. `const Ctx = createContext(null);` → `<Ctx value={값}>...</Ctx>` → `const v = useContext(Ctx);`
2. 화면이 하얗게 되고 콘솔에 `useTheme 은 <ThemeProvider> 안에서만 쓸 수 있습니다` 오류가 난다. ThemeContext.jsx 의 `useTheme` 함수에서 값이 `null` 일 때 던지는 오류다.
3.

```jsx
const LanguageContext = createContext(null);
function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");
  return <LanguageContext value={{ lang, setLang }}>{children}</LanguageContext>;
}
function Greeting() {
  const { lang } = useContext(LanguageContext);
  return <p>{lang === "ko" ? "안녕하세요" : "Hello"}</p>;
}
function LangButtons() {
  const { setLang } = useContext(LanguageContext);
  return (
    <>
      <button onClick={() => setLang("ko")}>한국어</button>
      <button onClick={() => setLang("en")}>English</button>
    </>
  );
}
// <LanguageProvider><LangButtons /><Section><Greeting /></Section></LanguageProvider>
```

4. `login` 을 `const login = (nickname) => setUser({ nickname, loginAt: new Date() });` 로 바꾸고, Header 에서 `{user.nickname} 님 ({user.loginAt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 로그인)` 처럼 보여 준다.

## 6장

1. (가) 401 (나) 403 (다) 401 (라) 404
2. 해시 문자열 안에 그때 쓴 **소금과 설정**이 함께 저장되어 있다. 검사할 때는 그 소금으로 입력한 비밀번호를 다시 해시해 비교하므로, 해시가 매번 달라도 맞는 비밀번호인지 알 수 있다.
3. 내용을 바꾸면 서명이 맞지 않는다. 서명을 새로 만들려면 서버의 SECRET_KEY 가 필요한데(이 과정에서는 application.yml 의 `jwt.secret`), 공격자는 그것을 모른다. 서버의 `JwtProvider.parseUserId` 안에서 jjwt 가 SignatureException 을 던져 거절된다(→ 401).
4. JWT 의 내용은 암호화가 아니라 base64 인코딩이라 **누구나 디코딩해서 읽을 수 있다.** 토큰이 로그·브라우저 저장소에 남으면 그대로 노출된다.

## 7장

1. ① `<Link to={`/posts/${post.id}`}>` (사용자가 누르는 링크) ② `navigate(`/posts/${id}`)` (저장 후 등 코드에서 이동)
2. `[]` 이면 처음 한 번만 불러온다. `/posts/1` 화면에서 `/posts/2` 로 이동하면 같은 PostDetailPage 컴포넌트가 그대로 쓰이므로(새로 만들어지지 않음) 2번 글을 불러오지 않아, 주소는 2번인데 1번 글 내용이 남는다.
3. `export const searchPosts = (q) => request(`/posts?q=${encodeURIComponent(q)}`);` (한글·특수 문자를 주소에 넣으려면 `encodeURIComponent`)
4. 404 일 때: PostDetailPage 의 `error.status === 404 ? "글을 찾을 수 없습니다." : ...` 에서. 서버가 꺼졌을 때: api.js `request` 의 `catch` 에서 만든 `"API 서버에 연결할 수 없습니다. 서버가 켜져 있나요?"` (status 0) 가 `error.message` 로 보인다.

## 8장

1. (가) SecurityConfig 의 `anyRequest().authenticated()` 에 걸려 **401** "로그인이 필요합니다". (나) PostService 의 `checkOwner` → **403**. (다) `@Valid` 검사 실패 → GlobalExceptionHandler 가 **400** "제목을 입력하세요". (라) PostService 의 `getPost` → **404** "글을 찾을 수 없습니다". (토큰이 없다면 (라)도 먼저 401 이 된다)
2. 저장되지 않는다. `PostRequest` record 에는 title, content 칸만 있어서 user_id 는 무시되고, `PostService.create` 는 `loginUser.id()`(**토큰 주인의 번호**)로 작성자를 정한다.
3. **400** `{"detail": "비밀번호는 8~72자입니다"}`. `SignupRequest` 의 `@Size(min = 8, max = 72, ...)` 규칙을 Controller 의 `@Valid` 가 검사하고, GlobalExceptionHandler 가 이 모양으로 바꾼다.
4. `UserResponse` record 에 `@JsonProperty("created_at") LocalDateTime createdAt` 칸을 추가하고, `UserResponse.from(user)` 에서 `user.getCreatedAt()` 을 넘긴다. (/me 와 로그인 응답의 user 가 모두 UserResponse 를 쓰므로 한 곳만 고치면 둘 다 바뀐다)
5. 이미 발급된 토큰은 모두 서명 검사에 실패해 **401** 이 된다. React 는 다음 요청 때(또는 새로 고침 때 /me 확인에서) 자동으로 로그아웃되고, 다시 로그인해야 한다.
6. 목록 SQL 한 번(`select ... from posts`) 뒤에, 글마다 작성자를 읽는 `select ... from users where id=?` 가 **따로** 실행된다. 같은 사람은 한 번만 읽지만(같은 트랜잭션 안에서 재사용), 작성자가 10명이면 1 + 10 번이 된다(N+1 문제). `@EntityGraph` 가 있으면 `left join users` 로 한 번에 읽는다.

## 9장

1. ① 로그인할 때 토큰을 localStorage 에 저장한다. ② F5 로 앱이 처음부터 다시 시작되면 AuthProvider 의 첫 useEffect 가 localStorage 에서 토큰을 찾는다. ③ 토큰이 있으면 `/api/auth/me` 를 요청한다(request 가 토큰을 헤더에 붙임). ④ 성공하면 받은 사용자 정보로 `setUser` → 로그인 상태가 된다. 그동안은 `ready=false` 로 화면을 기다리게 한다.
2. 토큰 확인(/me)이 끝나기 전, user 가 아직 null 인 순간에 ProtectedRoute 가 그려져 `/login` 으로 보내 버린다. 로그인한 사람인데도 새로 고침할 때마다 로그인 화면으로 튕긴다.
3. React 코드와 화면은 사용자의 브라우저에 있어서 누구나 고칠 수 있다. 주소창에 `/posts/3/edit` 을 치거나, 개발자 도구·curl 로 PUT/DELETE 요청을 직접 보낼 수도 있다. 서버가 막지 않으면 남의 글이 고쳐진다. 화면 숨기기는 편의, 서버 검사가 보안이다.
4. 로그인 화면을 방문 기록에서 바꿔치기해서, 로그인 후 **뒤로 가기**를 눌렀을 때 다시 로그인 화면으로 돌아가지 않게 하려고. (replace 가 없으면 뒤로 가기 → 로그인 화면 → 이미 로그인 상태라 다시 튕겨 나가는 어색한 일이 생긴다.)
5. ① 새로 고침해도 "내 글" 탭이 유지된다. ② 주소(`/?mine=1`)를 북마크하거나 공유할 수 있다. (③ 뒤로 가기로 탭 전환을 되돌릴 수 있다.)

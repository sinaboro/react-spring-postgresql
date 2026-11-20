# 부록 C. 확인 문제 풀이

풀이는 하나의 예시다. 결과가 같으면 다르게 써도 정답이다.

## 1장

1. 켜기: 프로젝트 폴더에서 `npm run dev`. 끄기: 서버가 돌고 있는 터미널에서 **Ctrl+C**.
2. `vite` 패키지가 `node_modules` 에 없어서 `'vite' 은(는) ... 명령이 아닙니다` 같은 오류가 난다. `npm run dev` 는 `package.json` 의 `"dev": "vite"` 를 실행하는데, vite 는 `npm install` 로 설치되기 때문이다.
3. `<p>나의 첫 React 앱입니다.</p>` 아래에 `<p>오늘의 다짐: 매일 30분 코딩</p>` 을 넣고 저장한다. 두 `<p>` 모두 `<div>` 안에 있어야 한다.
4. `index.html`. React 화면은 `<div id="root">` 안에 그려진다.

## 2장

1. `const square = (n) => n * n;`
2. `const { title, price } = book;`
3. `const sale = { ...book, price: 27000 };`
4. `const result = nums.filter((n) => n > 5).map((n) => n * 2);` → `[16, 20, 12]`
5. `A` → `C` → `B`. `run()` 안의 `await` 는 run 함수만 0.1초 기다리게 한다. 그동안 바깥의 `console.log("C")` 가 먼저 실행되고, 0.1초 뒤에 `B` 가 찍힌다.

## 3장

1.

```jsx
<>
  <label className="name">이름</label>
  <input type="text" />
  <p style={{ color: "red", fontSize: 12 }}>필수 입력</p>
</>
```

2. `<p>합계: {(price * count).toLocaleString()}원</p>`
3. `if` 는 값이 되는 식이 아니라 "문장" 이라서 `{ }` 안에 넣을 수 없다. `{age >= 20 ? "성인" : "미성년자"}` 처럼 삼항 연산자를 쓴다. (아무것도 안 보이게 하려면 `{age >= 20 && "성인"}`)
4.

```jsx
function MyIntro() {
  const today = new Date().toLocaleDateString("ko-KR");
  return (
    <div>
      <h2>안녕하세요, 저는 민수입니다</h2>
      <p>좋아하는 음식: 김치찌개</p>
      <p>오늘: {today}</p>
    </div>
  );
}
export default MyIntro;
```

App.jsx 에서 `import MyIntro from "./examples/ch03/MyIntro";` 후 `return <MyIntro />;`

## 4장

1.

```jsx
function Product({ name, price, soldOut }) {
  return (
    <p>
      {name} - {price.toLocaleString()}원{soldOut && " (품절)"}
    </p>
  );
}
export default Product;
```

2. `age="20"` 은 문자열이라 `"20" + 1` 이 글자 이어 붙이기가 되어 `"201"` 이 된다. `<Person age={20} />` 으로 숫자를 넘긴다.
3.

```jsx
function Notice({ title, children }) {
  return (
    <div style={{ background: "#fff8d6", padding: 12, borderRadius: 8 }}>
      <strong>{title}</strong>
      {children}
    </div>
  );
}
// 쓰기: <Notice title="준비물"><ul><li>노트북</li><li>충전기</li></ul></Notice>
```

4. `function Greeting({ name = "손님", emoji = "👋" }) { return <p>{emoji} 반가워요, {name} 님!</p>; }`

## 5장

1. `<p>{score >= 60 ? "합격" : "불합격"}</p>`
2. `items.length` 가 `0` 이면 `0 && ...` 의 결과가 `0` 이라서 화면에 **0** 이 찍힌다. `{items.length > 0 && <p>{items.length}개 있습니다</p>}`
3.

```jsx
<ol>
  {tasks.map((t) => (
    <li key={t.id}>
      {t.text}
      {t.done && " ✔"}
    </li>
  ))}
</ol>
```

4. `const inStock = products.filter((p) => p.stock > 0);` 를 `const expensive = products.filter((p) => p.price >= 30000);` 로 바꾸고, 표의 `inStock` 을 `expensive` 로 바꾼다. (키보드·모니터 2개가 나온다)

## 6장

1.

```jsx
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "좋아요 취소" : "좋아요 👍"}</button>;
}
```

2. `onClick={setCount(count + 1)}` 는 화면을 그리는 순간 setCount 를 바로 실행한다. 그러면 다시 그리고, 또 실행하고… 무한 반복이 되어 `Too many re-renders` 오류가 난다. `onClick={() => setCount(count + 1)}` 처럼 함수를 넘긴다.
3. `setUser({ ...user, age: user.age + 1 });` (또는 `setUser((prev) => ({ ...prev, age: prev.age + 1 }))`)
4. `<button onClick={() => setMembers([...members].sort((a, b) => b.score - a.score))}>점수 높은 순</button>`
5.

```jsx
function SafeCounter() {
  const [n, setN] = useState(0);
  return (
    <div>
      <h2>{n}</h2>
      <button onClick={() => setN(n + 1)}>+1</button>
      <button onClick={() => setN(n + 5)}>+5</button>
      <button onClick={() => setN(Math.max(0, n - 1))}>-1</button>
    </div>
  );
}
```

## 7장

1. `<button onClick={() => setName(name.toUpperCase())}>대문자로</button>`
2. `EMPTY` 에 `email: ""` 를 추가하고 `<input name="email" value={form.email} onChange={handleChange} />` 를 넣는다. `handleChange` 는 `e.target.name` 을 키로 쓰기 때문에, 입력 칸의 `name` 속성만 맞으면 어떤 칸이든 처리한다.
3. `<button onClick={() => setTodos(todos.filter((t) => !t.done))}>완료한 일 지우기</button>`
4. 부모(Ex0703TodoApp)에 함수를 만들고 TodoItem 에 내려준다.

```jsx
// 부모
const editTodo = (id, text) => {
  setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));
};
// <TodoItem ... onEdit={editTodo} />

// TodoItem 의 <span> 에
onDoubleClick={() => {
  const text = prompt("새 내용", todo.text);
  if (text && text.trim()) onEdit(todo.id, text.trim()); // 취소(null)나 빈칸이면 무시
}}
```

## 8장

1. A: 그릴 때마다 매번. B: 처음 화면에 나타났을 때 한 번. C: 처음 한 번 + `keyword` 가 바뀔 때마다.
2. `fetch` 는 **응답을 받기만 하면** 성공으로 본다. 404 도 "서버가 404 라고 응답했다" 는 정상 응답이다. 응답 자체를 못 받을 때(서버 꺼짐 등)만 catch 로 간다. 그래서 `if (!res.ok) throw new Error(...)` 로 직접 실패를 만든다.
3. `public/data/notices.json`:

```json
[
  { "id": 1, "title": "개강 안내" },
  { "id": 2, "title": "실습실 이용 안내" },
  { "id": 3, "title": "휴강 공지" }
]
```

```jsx
function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      const res = await fetch("/data/notices.json");
      setNotices(await res.json());
      setLoading(false);
    }
    load();
  }, []);
  if (loading) return <p>불러오는 중...</p>;
  return (
    <ul>
      {notices.map((n) => (
        <li key={n.id}>{n.title}</li>
      ))}
    </ul>
  );
}
```

4. 숨겼다 보일 때마다 `타이머 시작` 만 찍히고 `타이머 정리` 는 찍히지 않는다. 숨긴 Clock 의 타이머가 멈추지 않고 계속 돌아, 보이지 않는 곳에 타이머가 쌓인다. (사라진 컴포넌트의 state 를 바꾸려는 쓸모없는 작업이 계속된다.) 정리 함수로 `clearInterval` 해야 한다.

## 9장

1. 방식 **PUT**, 주소 `/api/posts/{글번호}` (예: `/api/posts/3`), 성공 시 **200**. `PostController` 의 `update` 메서드 (`@PutMapping("/{id}")`) 가 받는다.
2. `WebConfig.java` 의 `allowedOrigins` 에 지금 React 주소(`http://localhost:5173`)가 있는지, React 가 정말 5173 번 포트로 실행 중인지(5174 등으로 바뀌지 않았는지) 확인한다. 서버 코드를 고쳤다면 서버를 다시 켰는지도 본다.
3. 저장이 실패하고 "저장하지 못했습니다 (415)" 가 보인다. Network 탭의 상태 코드는 **415**. 브라우저가 본문을 `text/plain` 으로 보내서 Spring 이 `PostRequest` 로 바꾸지 못했기 때문이다.
4. "API 서버에 연결할 수 없습니다. 서버가 켜져 있나요?" 가 보인다. `PostList.jsx` 의 `catch` 블록에서 `err.message === "Failed to fetch"` 일 때 넣는 문구다.
5. `down` 은 컨테이너만 지우고 **볼륨(데이터)은 남긴다** → 다시 `up -d` 하면 글이 그대로 있다. `down -v` 는 볼륨까지 지워 **모든 글이 사라진다.**
6. 저장되지 않고 "⚠️ 제목은 100자까지 쓸 수 있습니다" 가 보인다. 규칙(max)은 바꿨지만 **message 글자는 그대로**이기 때문이다. message 도 "50자까지" 로 함께 고쳐야 한다. (DB 열은 여전히 varchar(100) 이다. `ddl-auto: update` 는 열 크기를 줄이지 않는다.)

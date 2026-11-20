// Ex0802Fetch.jsx - useEffect + fetch 로 데이터 불러오기 (로딩·오류 처리 포함)
//
// 이 예제가 보여 주는 것
//   - 화면에 처음 나타날 때([]) 데이터를 요청한다.
//   - 데이터가 오기 전 / 온 뒤 / 실패했을 때를 state 3개로 나눠 보여 준다.
//       loading : 기다리는 중인가?   error : 실패했나?   products : 받은 데이터
//   - useEffect 에 넘기는 함수 자체는 async 로 만들 수 없다.
//     그래서 안쪽에 async 함수를 만들고 바로 부른다.
//   데이터는 public/data/products.json (Vite 가 /data/products.json 주소로 내려준다).
//   9장에서는 이 주소만 Spring Boot 서버 주소로 바뀐다.

import { useEffect, useState } from "react";

function Ex0802Fetch() {
  const [products, setProducts] = useState([]); // 처음엔 빈 배열 (map 이 오류 나지 않게)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("/data/products.json"); // 일부러 틀린 주소로 바꿔 오류도 보자

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        await new Promise((r) => setTimeout(r, 700)); // 느린 서버 흉내 (로딩 문구를 보려고)
        const res = await fetch(url); //                 요청 보내고 응답 기다리기
        if (!res.ok) throw new Error(`요청 실패 (상태 코드 ${res.status})`); // 404, 500 등
        // Vite 개발 서버는 없는 파일을 요청하면 404 대신 index.html(HTML, 상태 200)을 돌려준다.
        // 그대로 res.json() 을 하면 "Unexpected token '<'" 오류가 나므로, JSON 인지 한 번 더 확인한다.
        if (!res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("JSON 이 아닌 응답을 받았습니다. 주소를 확인하세요.");
        }
        const data = await res.json(); //                응답 본문(JSON 글자)을 객체로 바꾸기
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false); // 성공이든 실패든 기다림은 끝
      }
    }
    load();
  }, [url]); // url 이 바뀌면 다시 불러온다

  return (
    <div>
      <button onClick={() => setUrl("/data/products.json")}>올바른 주소</button>
      <button onClick={() => setUrl("/data/nothing.json")}>틀린 주소</button>
      <p>요청 주소: {url}</p>

      {/* 세 가지 상태에 따라 다른 화면 */}
      {loading && <p>⏳ 불러오는 중...</p>}
      {error && <p style={{ color: "crimson" }}>⚠️ {error}</p>}
      {!loading && !error && (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - {p.price.toLocaleString()}원
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Ex0802Fetch;

// useFetch.js - 커스텀 훅 ③ : "불러오기 + 로딩 + 오류" 세트를 한 줄로
//
// 이 파일이 보여 주는 것
//   - 기초 과정 게시판에서 목록·읽기 화면마다 반복했던 코드
//       (useState 3개 + useEffect + fetch + try/catch)
//     를 훅 하나로 묶는다 → 컴포넌트에는 const { data, loading, error } = useFetch(url) 한 줄
//   - url 이 바뀌면 다시 불러온다 (의존성 배열 [url])
//   - 정리 함수에서 ignore = true 로 표시해, 응답이 늦게 도착해도 "이미 지나간 요청" 의
//     결과로 state 를 덮어쓰지 않게 한다. (빠르게 다른 글을 눌렀을 때 생기는 꼬임 방지)
//   - reload() 를 부르면 같은 주소를 다시 불러온다.

import { useCallback, useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // reload 용: 숫자를 바꾸면 effect 가 다시 실행된다

  useEffect(() => {
    if (!url) return; // url 이 아직 없으면 아무것도 안 함
    let ignore = false; // 이 요청이 아직 "유효한지" 표시

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`요청 실패 (${res.status})`);
        // 없는 파일이면 Vite 개발 서버가 index.html(200)을 주므로 JSON 인지도 확인한다 (기초 8장)
        if (!res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("JSON 이 아닌 응답을 받았습니다. 주소를 확인하세요.");
        }
        const json = await res.json();
        if (!ignore) setData(json); // 지나간 요청이면 무시
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();

    return () => {
      ignore = true; // url 이 바뀌거나 화면에서 사라지면 이전 요청은 무시
    };
  }, [url, version]);

  // useCallback: 다시 그려져도 같은 함수를 유지 (자식에게 넘길 때 불필요한 다시 그리기 방지)
  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { data, loading, error, reload };
}

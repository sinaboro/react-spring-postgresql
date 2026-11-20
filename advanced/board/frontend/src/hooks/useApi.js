// useApi.js - "불러오기 + 로딩 + 오류" 를 묶은 커스텀 훅 (3장 useFetch 의 게시판판)
//
// 3장 useFetch(url) 와 다른 점
//   - 주소 대신 "불러오는 함수" 를 받는다 → api.js 의 getPosts, getPost(id) 를 그대로 쓸 수 있다.
//       const { data, loading, error } = useApi(() => getPost(id), [id]);
//   - deps(의존성 배열)를 함께 받아, 그 값이 바뀌면 다시 불러온다.
//     (함수는 그릴 때마다 새로 만들어지므로 함수 자체를 의존성으로 쓰면 무한 반복된다)

import { useEffect, useState } from "react";

export function useApi(loader, deps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // 늦게 도착한 지난 요청의 결과는 버린다
    setLoading(true);
    setError(null);
    loader()
      .then((result) => !ignore && setData(result))
      .catch((err) => !ignore && setError(err)) // err 는 ApiError (status, message)
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
    // 의존성 배열은 부르는 쪽이 정해서 넘긴다 (deps)
  }, deps);

  return { data, loading, error };
}

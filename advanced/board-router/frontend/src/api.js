// api.js - 서버와 주고받는 코드를 한 파일에 모은 "API 모듈"
//
// 기초 과정에서는 화면 컴포넌트마다 fetch(...) 와 오류 검사를 직접 썼다.
// 이 파일로 모으면 좋은 점
//   - 화면 코드에는 getPosts(), createPost(form) 처럼 "무엇을" 만 남고 "어떻게" 는 사라진다.
//   - 주소·헤더·오류 처리를 고칠 때 이 파일만 고치면 된다.
//     (9장에서 로그인 토큰을 붙일 때도 request 함수 한 곳만 고친다)

export const API_URL = "http://localhost:8080/api";

// 서버가 실패 상태 코드(400, 404 ...)를 돌려줬을 때 던질 오류.
// status 를 함께 담아 두면 화면에서 "404 면 이렇게" 처럼 나눠 처리할 수 있다.
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// 모든 요청이 거쳐 가는 함수
//   path    : "/posts" 처럼 API_URL 뒤에 붙을 주소
//   options : { method, body } - body 에는 객체를 넣으면 JSON 으로 바꿔 보낸다
export async function request(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(API_URL + path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // 서버가 꺼져 있거나 주소가 틀리면 응답 자체가 없다
    throw new ApiError(0, "API 서버에 연결할 수 없습니다. 서버가 켜져 있나요?");
  }

  if (res.status === 204) return null; // 204 No Content: 돌려줄 내용 없음 (삭제 성공)

  const data = await res.json().catch(() => null); // 본문이 JSON 이 아니면 null
  if (!res.ok) {
    // 우리 Spring Boot 서버는 오류 이유를 { "detail": "..." } 로 보낸다 (GlobalExceptionHandler)
    const message = typeof data?.detail === "string" ? data.detail : `요청 실패 (${res.status})`;
    throw new ApiError(res.status, message);
  }
  return data;
}

// ---------------------------------------------------------------- 게시글 API
export const getPosts = () => request("/posts");
export const getPost = (id) => request(`/posts/${id}`);
export const createPost = (post) => request("/posts", { method: "POST", body: post });
export const updatePost = (id, post) => request(`/posts/${id}`, { method: "PUT", body: post });
export const deletePost = (id) => request(`/posts/${id}`, { method: "DELETE" });

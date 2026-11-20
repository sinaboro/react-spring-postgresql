// api.js - 서버와 주고받는 코드를 모은 API 모듈 (9장: 로그인 토큰 추가)
//
// 7장 api.js 에서 달라진 점
//   1. 토큰 보관함(tokenStore): 로그인 토큰을 브라우저 localStorage 에 저장·꺼내기·지우기
//   2. request 함수가 토큰이 있으면 모든 요청 헤더에 자동으로 붙인다
//        Authorization: Bearer eyJhbGciOi...
//      → 화면 코드는 토큰을 전혀 신경 쓰지 않아도 된다. (API 모듈로 모아 둔 덕분!)
//   3. 서버가 401(토큰 만료·위조)을 돌려주면 토큰을 지우고, AuthContext 에 "로그아웃 됐어요" 라고 알린다.
//   4. 회원가입 · 로그인 · 내 정보 API 함수 추가, 글쓰기에서 writer 가 빠짐

export const API_URL = "http://localhost:8080/api";

// ---------------------------------------------------------------- 토큰 보관함
// localStorage: 브라우저를 껐다 켜도 남는 저장소 (도메인별로 따로). 문자열만 저장된다.
const TOKEN_KEY = "access_token";
export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// 401 을 받았을 때 부를 함수. AuthContext 가 setUnauthorizedHandler 로 등록해 둔다.
let onUnauthorized = () => {};
export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ---------------------------------------------------------------- 모든 요청이 거쳐 가는 함수
export async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`; // ← 로그인했으면 토큰을 붙인다

  let res;
  try {
    res = await fetch(API_URL + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "API 서버에 연결할 수 없습니다. 서버가 켜져 있나요?");
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    // 토큰을 보냈는데 401 → 토큰이 만료됐거나 잘못됐다. 지우고 로그아웃 상태로 만든다.
    // (로그인 요청 자체의 401 "비밀번호 틀림" 은 토큰 없이 보내므로 여기에 걸리지 않는다)
    if (res.status === 401 && token) {
      tokenStore.clear();
      onUnauthorized();
    }
    // 서버(GlobalExceptionHandler)는 오류 이유를 { "detail": "한국어 메시지" } 로 보낸다
    const message = typeof data?.detail === "string" ? data.detail : `요청 실패 (${res.status})`;
    throw new ApiError(res.status, message);
  }
  return data;
}

// ---------------------------------------------------------------- 인증 API
export const signup = (form) => request("/auth/signup", { method: "POST", body: form });
export const login = (username, password) =>
  request("/auth/login", { method: "POST", body: { username, password } }); // → { access_token, user }
export const getMe = () => request("/auth/me");

// ---------------------------------------------------------------- 게시글 API
// userId 를 주면 그 사람 글만 (/posts?user_id=3)
export const getPosts = (userId) => request(userId ? `/posts?user_id=${userId}` : "/posts");
export const getPost = (id) => request(`/posts/${id}`);
export const createPost = (post) => request("/posts", { method: "POST", body: post }); // post = { title, content }
export const updatePost = (id, post) => request(`/posts/${id}`, { method: "PUT", body: post });
export const deletePost = (id) => request(`/posts/${id}`, { method: "DELETE" });

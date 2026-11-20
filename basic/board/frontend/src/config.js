// config.js - 여러 파일이 함께 쓰는 설정 값
//
// API 서버(Spring Boot) 주소. 서버 주소가 바뀌면 이 한 줄만 고치면 된다.
export const API_URL = "http://localhost:8080/api";

// 날짜 글자 "2026-11-20T10:30:00.123+09:00" → "2026. 11. 20. 오전 10:30" 처럼 읽기 좋게 바꾼다
export function formatDate(text) {
  return new Date(text).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

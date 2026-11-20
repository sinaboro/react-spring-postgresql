// format.js - 화면 표시용 작은 함수
//   "2026-11-20T10:30:00+09:00" → "2026. 11. 20. 오전 10:30"
export function formatDate(text) {
  return new Date(text).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

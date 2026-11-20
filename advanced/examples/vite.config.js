// vite.config.js - Vite(개발 서버·빌드 도구) 설정
//   plugins: [react()] → .jsx 파일의 JSX 를 브라우저가 이해하는 자바스크립트로 바꿔 준다.
//   개발 서버 주소는 기본값 http://localhost:5173
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
})

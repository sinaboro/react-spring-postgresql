package com.example.board.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * LoginRequest - 로그인 요청 JSON  { "username": "minsu", "password": "password123" }
 * 로그인할 때는 형식 규칙을 검사하지 않는다. 틀리면 그냥 "아이디 또는 비밀번호가 올바르지 않습니다".
 */
public record LoginRequest(
		@NotBlank(message = "아이디를 입력하세요") String username,
		@NotBlank(message = "비밀번호를 입력하세요") String password
) {
}

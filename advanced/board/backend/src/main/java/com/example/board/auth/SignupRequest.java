package com.example.board.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * SignupRequest - 회원가입 요청 JSON
 *
 *   { "username": "minsu", "password": "password123", "nickname": "민수" }
 *
 * 규칙 (React SignupPage 의 validate 함수와 같다. 화면 검사는 친절, 서버 검사는 보안)
 *   username : 영문 소문자·숫자·밑줄 4~20자 (정규 표현식 ^[a-z0-9_]{4,20}$)
 *   password : 8~72자 (BCrypt 는 72바이트까지만 쓰기 때문에 위쪽 한계를 둔다)
 *   nickname : 1~30자
 */
public record SignupRequest(
		@NotBlank(message = "아이디를 입력하세요")
		@Pattern(regexp = "^[a-z0-9_]{4,20}$", message = "아이디는 영문 소문자·숫자·밑줄(_)로 4~20자입니다")
		String username,

		@NotBlank(message = "비밀번호를 입력하세요")
		@Size(min = 8, max = 72, message = "비밀번호는 8~72자입니다")
		String password,

		@NotBlank(message = "닉네임을 입력하세요")
		@Size(max = 30, message = "닉네임은 30자까지 쓸 수 있습니다")
		String nickname
) {
}

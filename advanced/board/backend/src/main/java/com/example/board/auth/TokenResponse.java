package com.example.board.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * TokenResponse - 로그인 성공 응답 JSON
 *
 *   { "access_token": "eyJhbGciOi...", "token_type": "bearer",
 *     "user": { "id": 3, "username": "minsu", "nickname": "민수" } }
 *
 * user 를 함께 돌려주는 이유: 로그인하자마자 화면 머리글에 닉네임을 보여 주려고.
 */
public record TokenResponse(
		@JsonProperty("access_token") String accessToken,
		@JsonProperty("token_type") String tokenType,
		UserResponse user
) {

	public static TokenResponse bearer(String token, UserResponse user) {
		return new TokenResponse(token, "bearer", user);
	}
}

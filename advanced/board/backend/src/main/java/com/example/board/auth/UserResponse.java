package com.example.board.auth;

import com.example.board.user.User;

/**
 * UserResponse - 회원 정보 응답 JSON  { "id": 3, "username": "minsu", "nickname": "민수" }
 * 비밀번호 해시는 절대 응답에 넣지 않는다. 그래서 Entity(User)를 그대로 돌려주지 않고 이 DTO 를 쓴다.
 */
public record UserResponse(Long id, String username, String nickname) {

	public static UserResponse from(User user) {
		return new UserResponse(user.getId(), user.getUsername(), user.getNickname());
	}
}

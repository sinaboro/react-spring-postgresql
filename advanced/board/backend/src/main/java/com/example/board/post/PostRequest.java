package com.example.board.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * PostRequest - 글쓰기·수정 요청 JSON (심화)
 *
 *   { "title": "제목", "content": "내용" }
 *
 * 기초 과정과 달리 writer(작성자)가 없다. 작성자는 서버가 로그인 토큰을 보고 정한다.
 * → 남의 이름으로 글을 쓸 수 없다. 본문에 "user_id": 99 를 넣어 보내도 이 record 에 칸이 없어서 무시된다.
 */
public record PostRequest(
		@NotBlank(message = "제목을 입력하세요")
		@Size(max = 100, message = "제목은 100자까지 쓸 수 있습니다")
		String title,

		String content
) {
}

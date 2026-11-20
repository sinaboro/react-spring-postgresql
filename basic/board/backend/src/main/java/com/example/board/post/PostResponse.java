package com.example.board.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

/**
 * PostResponse - API 가 돌려주는 글 하나의 JSON 모양 (응답 DTO)
 *
 *   { "id": 1, "title": "...", "writer": "민수", "content": "...",
 *     "created_at": "2026-11-20T09:37:30.266017", "updated_at": "..." }
 *
 * 이 파일이 보여 주는 것
 *   - Entity(Post)를 JSON 으로 바로 내보내지 않고, 보여 줄 칸만 골라 담는다.
 *   - Java 는 이름을 createdAt(카멜 표기)으로 쓰지만, React 쪽 코드는 created_at(밑줄 표기)을 쓴다.
 *     @JsonProperty 로 JSON 에 나갈 이름을 정해 준다. (JavaScript 쪽 관례를 따르지 않고 DB 열 이름과 맞췄다)
 *   - from(post) : Entity → DTO 로 바꾸는 작은 도우미 메서드
 */
public record PostResponse(
		Long id,
		String title,
		String writer,
		String content,
		@JsonProperty("created_at") LocalDateTime createdAt,
		@JsonProperty("updated_at") LocalDateTime updatedAt
) {

	public static PostResponse from(Post post) {
		return new PostResponse(post.getId(), post.getTitle(), post.getWriter(), post.getContent(),
				post.getCreatedAt(), post.getUpdatedAt());
	}
}

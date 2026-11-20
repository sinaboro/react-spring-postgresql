package com.example.board.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

/**
 * PostResponse - 글 하나의 응답 JSON (심화)
 *
 *   { "id": 1, "user_id": 3, "writer": "민수", "title": "...", "content": "...",
 *     "created_at": "...", "updated_at": "..." }
 *
 *   - user_id : 글쓴이 번호. React 가 "내 글인가?" (user.id === post.user_id) 를 판단할 때 쓴다.
 *   - writer  : 글쓴이 닉네임. 기초 과정과 같은 이름이라 React 화면 코드를 거의 고치지 않아도 된다.
 */
public record PostResponse(
		Long id,
		@JsonProperty("user_id") Long userId,
		String writer,
		String title,
		String content,
		@JsonProperty("created_at") LocalDateTime createdAt,
		@JsonProperty("updated_at") LocalDateTime updatedAt
) {

	public static PostResponse from(Post post) {
		return new PostResponse(post.getId(), post.getAuthor().getId(), post.getAuthor().getNickname(),
				post.getTitle(), post.getContent(), post.getCreatedAt(), post.getUpdatedAt());
	}
}

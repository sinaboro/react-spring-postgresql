package com.example.board.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * PostRequest - 글쓰기·수정 때 React 가 보내는 JSON 의 모양 (요청 DTO)
 *
 *   { "title": "제목", "writer": "민수", "content": "내용" }
 *
 * 이 파일이 보여 주는 것
 *   - record: 값을 담기만 하는 클래스를 한 줄로 만드는 Java 문법. (생성자·getter 가 자동으로 생긴다)
 *     꺼낼 때는 request.title() 처럼 괄호를 붙인다.
 *   - 검사 규칙(Bean Validation): Controller 에서 @Valid 를 붙이면 Spring 이 먼저 검사하고,
 *     어기면 메서드를 실행하지 않고 400 오류를 돌려준다. message 는 그때 보여 줄 문장.
 *   - Entity(Post)를 그대로 받지 않고 DTO 를 따로 두는 이유: 클라이언트가 id, createdAt 같은
 *     값을 마음대로 넣어 보내지 못하게, 받을 칸만 정확히 정하기 위해서다.
 */
public record PostRequest(
		@NotBlank(message = "제목을 입력하세요")                  // null, "", "   " 모두 거절
		@Size(max = 100, message = "제목은 100자까지 쓸 수 있습니다")
		String title,

		@NotBlank(message = "작성자를 입력하세요")
		@Size(max = 30, message = "작성자는 30자까지 쓸 수 있습니다")
		String writer,

		String content                                            // 비어도 된다 (null 이면 "" 로 바꿔 저장)
) {
}

package com.example.board.post;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * PostController - 게시판 REST API 의 주소 담당
 *
 * 이 파일이 보여 주는 것
 *   - @RestController : 메서드가 돌려주는 객체를 JSON 으로 바꿔 응답한다.
 *   - @RequestMapping("/api/posts") : 아래 모든 주소 앞에 /api/posts 가 붙는다.
 *   - 주소 + 방식(HTTP 메서드) 하나에 메서드 하나.
 *
 *   주소                 방식     메서드     CRUD     성공 상태 코드
 *   /api/posts           GET      list       Read     200 OK
 *   /api/posts/{id}      GET      get        Read     200 OK
 *   /api/posts           POST     create     Create   201 Created
 *   /api/posts/{id}      PUT      update     Update   200 OK
 *   /api/posts/{id}      DELETE   delete     Delete   204 No Content
 *
 *   - @PathVariable : 주소의 {id} 자리 값을 Long 으로 받는다.
 *   - @RequestBody  : 요청 본문(JSON)을 PostRequest 객체로 바꿔 받는다.
 *   - @Valid        : PostRequest 의 검사 규칙(@NotBlank 등)을 먼저 검사한다. 어기면 400.
 */
@RestController
@RequestMapping("/api/posts")
public class PostController {

	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping
	public List<PostResponse> list() {
		return postService.findAll(); // List → JSON 배열
	}

	@GetMapping("/{id}")
	public PostResponse get(@PathVariable Long id) {
		return postService.findOne(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED) // 성공하면 200 대신 201
	public PostResponse create(@Valid @RequestBody PostRequest request) {
		return postService.create(request);
	}

	@PutMapping("/{id}")
	public PostResponse update(@PathVariable Long id, @Valid @RequestBody PostRequest request) {
		return postService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT) // 204: 성공했지만 돌려줄 내용 없음
	public void delete(@PathVariable Long id) {
		postService.delete(id);
	}
}

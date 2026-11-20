package com.example.board.post;

import com.example.board.security.LoginUser;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * PostController - 게시글 API (심화)
 *
 *   주소                  방식     로그인   하는 일
 *   /api/posts            GET      -        글 목록 (?user_id=3 이면 그 사람 글만)
 *   /api/posts/{id}       GET      -        글 하나
 *   /api/posts            POST     필요     새 글 (작성자 = 토큰 주인)
 *   /api/posts/{id}       PUT      본인     글 수정
 *   /api/posts/{id}       DELETE   본인     글 삭제 (204)
 *
 *   "로그인 필요" 는 SecurityConfig 의 주소 규칙이 정하고,
 *   "본인" 검사는 PostService 가 한다.
 *
 *   @AuthenticationPrincipal LoginUser user
 *     → JwtAuthenticationFilter 가 토큰을 검사해 넣어 둔 "지금 요청한 사람" 을 받는다.
 *   @SecurityRequirement(name = "bearerAuth")
 *     → /docs 화면에서 자물쇠 표시를 붙이고 Authorize 로 넣은 토큰을 보내게 한다 (OpenApiConfig).
 */
@RestController
@RequestMapping("/api/posts")
public class PostController {

	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping
	public List<PostResponse> list(@RequestParam(name = "user_id", required = false) Long userId) {
		return postService.findAll(userId); // ?user_id=3 (없어도 된다)
	}

	@GetMapping("/{id}")
	public PostResponse get(@PathVariable Long id) {
		return postService.findOne(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@SecurityRequirement(name = "bearerAuth")
	public PostResponse create(@Valid @RequestBody PostRequest request, @AuthenticationPrincipal LoginUser user) {
		return postService.create(request, user);
	}

	@PutMapping("/{id}")
	@SecurityRequirement(name = "bearerAuth")
	public PostResponse update(@PathVariable Long id, @Valid @RequestBody PostRequest request,
			@AuthenticationPrincipal LoginUser user) {
		return postService.update(id, request, user);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@SecurityRequirement(name = "bearerAuth")
	public void delete(@PathVariable Long id, @AuthenticationPrincipal LoginUser user) {
		postService.delete(id, user);
	}
}

package com.example.board.post;

import com.example.board.common.ApiException;
import com.example.board.security.LoginUser;
import com.example.board.user.User;
import com.example.board.user.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * PostService - 게시글 업무 규칙 (심화: 작성자 = 로그인한 사람, 수정·삭제는 본인만)
 *
 * 수정·삭제 검사 순서
 *   1. 글이 있는가?      없으면 404 "글을 찾을 수 없습니다"
 *   2. 내 글인가?        아니면 403 "본인이 쓴 글만 수정·삭제할 수 있습니다"
 *   (로그인 여부 401 은 이 메서드에 오기 전에 Spring Security 가 먼저 검사한다)
 */
@Service
@Transactional(readOnly = true)
public class PostService {

	private final PostRepository postRepository;
	private final UserRepository userRepository;

	public PostService(PostRepository postRepository, UserRepository userRepository) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	/** 글 목록. userId 가 있으면 그 사람 글만 */
	public List<PostResponse> findAll(Long userId) {
		List<Post> posts = (userId == null)
				? postRepository.findAllByOrderByIdDesc()
				: postRepository.findAllByAuthorIdOrderByIdDesc(userId);
		return posts.stream().map(PostResponse::from).toList();
	}

	public PostResponse findOne(Long id) {
		return PostResponse.from(getPost(id));
	}

	@Transactional
	public PostResponse create(PostRequest request, LoginUser loginUser) {
		// 토큰 주인(loginUser)을 작성자로. getReferenceById 는 SELECT 없이 "번호만 아는 User" 를 만든다
		User author = userRepository.getReferenceById(loginUser.id());
		Post post = postRepository.save(new Post(author, request.title().strip(), clean(request.content())));
		return findOne(post.getId()); // 닉네임까지 붙은 모양으로 다시 읽어 돌려준다
	}

	@Transactional
	public PostResponse update(Long id, PostRequest request, LoginUser loginUser) {
		Post post = getPost(id); //      1. 있는가? (404)
		checkOwner(post, loginUser); //  2. 내 글인가? (403)
		post.update(request.title().strip(), clean(request.content()));
		postRepository.flush(); //       UPDATE 를 지금 실행 → updatedAt 이 채워진 값으로 응답
		return PostResponse.from(post);
	}

	@Transactional
	public void delete(Long id, LoginUser loginUser) {
		Post post = getPost(id);
		checkOwner(post, loginUser);
		postRepository.delete(post);
	}

	private Post getPost(Long id) {
		return postRepository.findWithAuthorById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "글을 찾을 수 없습니다"));
	}

	private void checkOwner(Post post, LoginUser loginUser) {
		if (!post.isWrittenBy(loginUser.id())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "본인이 쓴 글만 수정·삭제할 수 있습니다");
		}
	}

	private String clean(String content) {
		return content == null ? "" : content.strip();
	}
}

package com.example.board.post;

import com.example.board.common.ApiException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * PostService - 게시글 "업무 규칙" 을 담당하는 계층
 *
 * 이 파일이 보여 주는 것
 *   - Controller(주소 담당) → Service(규칙 담당) → Repository(DB 담당) 로 일을 나눈다.
 *       Controller : 어떤 주소로 무엇이 왔는지, 무엇을 돌려줄지
 *       Service    : 글이 없으면 404, 앞뒤 빈칸 지우기 같은 규칙
 *       Repository : SQL 실행
 *   - @Transactional : 메서드 안의 DB 작업을 하나로 묶는다. 중간에 오류가 나면 모두 취소(rollback)된다.
 *     readOnly = true 는 "읽기만 한다" 는 표시 (조금 더 가볍게 동작한다).
 *   - 생성자 주입: Spring 이 PostRepository 객체를 만들어 생성자로 넣어 준다. (new 를 직접 하지 않는다)
 */
@Service
@Transactional(readOnly = true)
public class PostService {

	private final PostRepository postRepository;

	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	/** 글 목록 (최근 글이 위로) */
	public List<PostResponse> findAll() {
		return postRepository.findAllByOrderByIdDesc().stream() // List<Post>
				.map(PostResponse::from) //                        → List<PostResponse>
				.toList();
	}

	/** 글 하나 */
	public PostResponse findOne(Long id) {
		return PostResponse.from(getPost(id));
	}

	/** 새 글 저장 → INSERT */
	@Transactional // 쓰기 작업이므로 readOnly 를 풀어 준다
	public PostResponse create(PostRequest request) {
		Post post = new Post(request.title().strip(), request.writer().strip(), clean(request.content()));
		return PostResponse.from(postRepository.save(post)); // save 후 id·시각이 채워진 객체를 돌려준다
	}

	/** 글 수정 → UPDATE (값만 바꾸면 메서드가 끝날 때 JPA 가 알아서 UPDATE 한다) */
	@Transactional
	public PostResponse update(Long id, PostRequest request) {
		Post post = getPost(id);
		post.update(request.title().strip(), request.writer().strip(), clean(request.content()));
		postRepository.flush(); // UPDATE 를 지금 실행해 updatedAt 이 채워진 값으로 응답하게 한다
		return PostResponse.from(post);
	}

	/** 글 삭제 → DELETE */
	@Transactional
	public void delete(Long id) {
		postRepository.delete(getPost(id));
	}

	/** id 로 글을 찾고, 없으면 404 오류를 던진다 */
	private Post getPost(Long id) {
		return postRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "글을 찾을 수 없습니다"));
	}

	/** 내용은 비어도 되지만 null 은 "" 로, 앞뒤 빈칸은 지운다 */
	private String clean(String content) {
		return content == null ? "" : content.strip();
	}
}

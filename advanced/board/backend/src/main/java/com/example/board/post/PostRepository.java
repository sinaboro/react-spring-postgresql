package com.example.board.post;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PostRepository - posts 테이블 창구 (심화)
 *
 * @EntityGraph(attributePaths = "author") : 글을 읽을 때 작성자(users)도 JOIN 으로 "한 번에" 읽는다.
 *   이것이 없으면 글 10개 목록에서 작성자 닉네임을 꺼낼 때 SELECT 가 1 + 10 번 실행된다 (N+1 문제).
 *   콘솔의 SQL 로그(show-sql)에서 left join users 가 보이는지 확인해 보자.
 *
 *   findAllByOrderByIdDesc()                  전체 글, 최근 글이 위로
 *   findAllByAuthorIdOrderByIdDesc(3)         3번 회원의 글만 ("내 글" 보기) → WHERE p.user_id = 3
 *   findWithAuthorById(5)                     글 하나 + 작성자
 */
public interface PostRepository extends JpaRepository<Post, Long> {

	@EntityGraph(attributePaths = "author")
	List<Post> findAllByOrderByIdDesc();

	@EntityGraph(attributePaths = "author")
	List<Post> findAllByAuthorIdOrderByIdDesc(Long authorId);

	@EntityGraph(attributePaths = "author")
	Optional<Post> findWithAuthorById(Long id);
}

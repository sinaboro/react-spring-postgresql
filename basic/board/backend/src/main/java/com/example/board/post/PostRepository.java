package com.example.board.post;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PostRepository - posts 테이블에 SQL 을 보내는 창구 (Spring Data JPA)
 *
 * 이 파일이 보여 주는 것
 *   - 인터페이스만 만들면 Spring 이 구현을 자동으로 만들어 준다.
 *   - JpaRepository<Post, Long> 을 물려받는 것만으로 아래 메서드를 바로 쓸 수 있다.
 *       save(post)       INSERT (새 객체) / UPDATE (이미 있는 객체)
 *       findById(id)     SELECT ... WHERE id = ?   → Optional<Post> (없을 수도 있음)
 *       findAll()        SELECT ...
 *       delete(post)     DELETE ...
 *   - 메서드 이름 규칙으로 쿼리를 만들 수도 있다.
 *       findAllByOrderByIdDesc()  →  SELECT ... ORDER BY id DESC
 */
public interface PostRepository extends JpaRepository<Post, Long> {

	/** 글 목록 - 최근 글이 위로 오게 id 큰 순서 */
	List<Post> findAllByOrderByIdDesc();
}

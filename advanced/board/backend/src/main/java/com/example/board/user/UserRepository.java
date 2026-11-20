package com.example.board.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * UserRepository - users 테이블 창구
 *
 *   findByUsername("minsu")   → SELECT ... WHERE username = 'minsu'      (로그인할 때)
 *   existsByUsername("minsu") → SELECT 1 ... WHERE username = 'minsu'    (가입할 때 중복 확인)
 *   findById(3)               → 토큰 속 사용자 번호로 찾기 (JpaRepository 기본 기능)
 *
 * 메서드 이름만 규칙대로 지으면 Spring Data JPA 가 SQL 을 만들어 준다.
 */
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	boolean existsByUsername(String username);
}

package com.example.board.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * User - 회원 Entity (users 테이블)
 *
 *   id             bigint        자동 번호
 *   username       varchar(30)   로그인 아이디 (UNIQUE: 중복 불가)
 *   password_hash  varchar(255)  비밀번호가 아니라 "해시" 를 저장한다 (BCrypt)
 *   nickname       varchar(30)   화면에 보일 이름
 *   created_at     timestamp     가입 시각
 *
 * 테이블 이름을 user 가 아니라 users 로 정한 이유: PostgreSQL 에서 user 는 예약어라서
 * 그대로 쓰면 SQL 오류가 난다.
 */
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 30)
	private String username;

	@Column(nullable = false)
	private String passwordHash;

	@Column(nullable = false, length = 30)
	private String nickname;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	protected User() {
	}

	public User(String username, String passwordHash, String nickname) {
		this.username = username;
		this.passwordHash = passwordHash;
		this.nickname = nickname;
	}

	@PrePersist
	void onCreate() {
		createdAt = LocalDateTime.now().truncatedTo(ChronoUnit.MICROS);
	}

	public Long getId() { return id; }
	public String getUsername() { return username; }
	public String getPasswordHash() { return passwordHash; }
	public String getNickname() { return nickname; }
	public LocalDateTime getCreatedAt() { return createdAt; }
}

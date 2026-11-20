package com.example.board.post;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * Post - 게시글 Entity (자바 객체 ↔ posts 테이블의 한 줄)
 *
 * 이 파일이 보여 주는 것
 *   - @Entity 가 붙은 클래스는 JPA 가 관리하는 "테이블과 짝지어진 객체" 다.
 *   - 필드 하나 = 열(column) 하나. ddl-auto: update 설정 덕분에 서버가 켜질 때 테이블이 자동으로 만들어진다.
 *       id          bigint      자동 번호 (PRIMARY KEY)
 *       title       varchar(100) not null
 *       writer      varchar(30)  not null
 *       content     text         not null
 *       created_at  timestamp    not null   ← 필드 이름 createdAt 이 created_at 열이 된다
 *       updated_at  timestamp    not null
 *   - SQL 을 직접 쓰지 않아도 PostRepository 가 INSERT·SELECT·UPDATE·DELETE 를 만들어 준다.
 */
@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // DB 가 1, 2, 3 ... 번호를 매긴다
	private Long id;

	@Column(nullable = false, length = 100)
	private String title;

	@Column(nullable = false, length = 30)
	private String writer;

	@Column(nullable = false, columnDefinition = "text")
	private String content;

	@Column(nullable = false, updatable = false) // 쓴 시각은 고칠 때 바뀌지 않게
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	/** JPA 가 DB 에서 읽어 올 때 쓰는 빈 생성자 (직접 쓰지 않는다) */
	protected Post() {
	}

	public Post(String title, String writer, String content) {
		this.title = title;
		this.writer = writer;
		this.content = content;
	}

	/** INSERT 직전에 JPA 가 자동으로 부른다: 쓴 시각과 고친 시각을 같은 값으로 */
	@PrePersist
	void onCreate() {
		createdAt = now();
		updatedAt = createdAt;
	}

	/** UPDATE 직전에 JPA 가 자동으로 부른다: 고친 시각만 바꾼다 */
	@PreUpdate
	void onUpdate() {
		updatedAt = now();
	}

	/** 지금 시각. PostgreSQL 은 마이크로초(소수점 6자리)까지만 저장하므로 거기에 맞춰 자른다.
	 *  (자르지 않으면 응답에 나노초 9자리가 나가서 브라우저가 날짜를 잘못 읽을 수 있다) */
	private static LocalDateTime now() {
		return LocalDateTime.now().truncatedTo(ChronoUnit.MICROS);
	}

	/** 글 수정. 값만 바꾸면 트랜잭션이 끝날 때 JPA 가 UPDATE 를 실행한다 (변경 감지) */
	public void update(String title, String writer, String content) {
		this.title = title;
		this.writer = writer;
		this.content = content;
	}

	// ---- 값 꺼내기 (getter) ----
	public Long getId() { return id; }
	public String getTitle() { return title; }
	public String getWriter() { return writer; }
	public String getContent() { return content; }
	public LocalDateTime getCreatedAt() { return createdAt; }
	public LocalDateTime getUpdatedAt() { return updatedAt; }
}

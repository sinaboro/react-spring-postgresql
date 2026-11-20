package com.example.board.post;

import com.example.board.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Post - 게시글 Entity (심화: 작성자가 "이름 글자" 에서 "회원(User)" 으로 바뀌었다)
 *
 * 기초 과정 Post 와 달라진 점
 *   - String writer 대신 User author
 *     @ManyToOne : 글 여러 개(Many)가 회원 한 명(One)에게 속한다 → posts.user_id 외래 키(FK) 열이 생긴다
 *     @JoinColumn(name = "user_id") : 외래 키 열 이름
 *     @OnDelete(CASCADE) : 회원이 지워지면 그 사람 글도 DB 가 함께 지운다 (ON DELETE CASCADE)
 *     fetch = LAZY : 글을 읽을 때 회원 정보는 "필요할 때" 읽는다 (Repository 의 @EntityGraph 로 한 번에 읽게 했다)
 *   - 수정 메서드에 작성자가 없다. 작성자는 처음 쓴 사람으로 고정된다.
 */
@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User author;

	@Column(nullable = false, length = 100)
	private String title;

	@Column(nullable = false, columnDefinition = "text")
	private String content;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	protected Post() {
	}

	public Post(User author, String title, String content) {
		this.author = author;
		this.title = title;
		this.content = content;
	}

	@PrePersist
	void onCreate() {
		createdAt = now();
		updatedAt = createdAt;
	}

	@PreUpdate
	void onUpdate() {
		updatedAt = now();
	}

	private static LocalDateTime now() {
		return LocalDateTime.now().truncatedTo(ChronoUnit.MICROS); // PostgreSQL 저장 단위(마이크로초)에 맞춘다
	}

	public void update(String title, String content) {
		this.title = title;
		this.content = content;
	}

	/** 이 글을 쓴 사람이 userId 인가? (소유권 검사) */
	public boolean isWrittenBy(Long userId) {
		return author.getId().equals(userId);
	}

	public Long getId() { return id; }
	public User getAuthor() { return author; }
	public String getTitle() { return title; }
	public String getContent() { return content; }
	public LocalDateTime getCreatedAt() { return createdAt; }
	public LocalDateTime getUpdatedAt() { return updatedAt; }
}

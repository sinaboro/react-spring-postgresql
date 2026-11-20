package com.example.concepts;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * AuthDemo - 6장 인증 개념을 눈으로 확인하는 실습 (서버·DB 없이 실행)
 *
 * 이 예제가 보여 주는 것
 *   1. 같은 비밀번호도 해시할 때마다 결과가 다르다 (소금 salt 때문). 그래도 검사는 통과한다.
 *   2. JWT 는 점(.)으로 나뉜 세 부분(헤더.내용.서명)이고, 내용은 누구나 읽을 수 있다.
 *   3. 내용을 한 글자라도 고치면 서명이 맞지 않아 거절된다 (위조 방지).
 *   4. 만료 시각(exp)이 지난 토큰도 거절된다.
 *
 * 실행: IntelliJ 에서 이 파일을 열고 main 왼쪽의 ▶ 버튼, 또는 concepts 폴더에서 .\gradlew.bat run
 */
public class AuthDemo {

	public static void main(String[] args) {
		// ------------------------------------------------------------ 1. 비밀번호 해시 (BCrypt)
		System.out.println("=== 1. 비밀번호 해시 ===");
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String h1 = encoder.encode("password123");
		String h2 = encoder.encode("password123");
		System.out.println("해시 1: " + h1);
		System.out.println("해시 2: " + h2);
		System.out.println("두 해시가 같은가? " + h1.equals(h2)); //                     false - 소금이 달라서
		System.out.println("맞는 비밀번호 검사: " + encoder.matches("password123", h1)); // true
		System.out.println("틀린 비밀번호 검사: " + encoder.matches("password124", h1)); // false

		// ------------------------------------------------------------ 2. JWT 만들기와 읽기
		System.out.println();
		System.out.println("=== 2. JWT 구조 ===");
		SecretKey key = Keys.hmacShaKeyFor("demo-secret-key-for-class-0123456789".getBytes(StandardCharsets.UTF_8));
		Instant now = Instant.now();
		String token = Jwts.builder()
				.subject("1")
				.expiration(Date.from(now.plusSeconds(3600)))
				.signWith(key)
				.compact();
		String[] parts = token.split("\\.");
		System.out.println("토큰: " + token.substring(0, 50) + "...");
		System.out.println("부분 개수: " + parts.length);
		// base64url 로 인코딩되어 있을 뿐이라 누구나 디코딩해서 읽을 수 있다
		System.out.println("헤더 내용: " + decode(parts[0]));
		System.out.println("본문 내용: " + decode(parts[1]));
		String sub = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
		System.out.println("서명 검사 후 꺼낸 sub: " + sub);

		// ------------------------------------------------------------ 3. 위조하면?
		System.out.println();
		System.out.println("=== 3. 내용을 고친 토큰 ===");
		String fakeBody = Base64.getUrlEncoder().withoutPadding()
				.encodeToString("{\"sub\":\"2\",\"exp\":9999999999}".getBytes(StandardCharsets.UTF_8));
		String fake = parts[0] + "." + fakeBody + "." + parts[2]; // 2번 사용자로 바꿔치기, 서명은 원래 것 그대로
		try {
			Jwts.parser().verifyWith(key).build().parseSignedClaims(fake);
		} catch (SignatureException e) {
			System.out.println("거절: " + e.getClass().getSimpleName());
		}

		// ------------------------------------------------------------ 4. 만료된 토큰
		System.out.println();
		System.out.println("=== 4. 만료된 토큰 ===");
		String old = Jwts.builder().subject("1").expiration(Date.from(now.minusSeconds(1))).signWith(key).compact();
		try {
			Jwts.parser().verifyWith(key).build().parseSignedClaims(old);
		} catch (ExpiredJwtException e) {
			System.out.println("거절: " + e.getClass().getSimpleName());
		}
	}

	/** base64url 글자를 원래 JSON 글자로 */
	private static String decode(String part) {
		return new String(Base64.getUrlDecoder().decode(part), StandardCharsets.UTF_8);
	}
}

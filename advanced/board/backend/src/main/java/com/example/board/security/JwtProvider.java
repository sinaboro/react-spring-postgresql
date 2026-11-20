package com.example.board.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * JwtProvider - JWT(로그인 토큰) 만들기와 검사하기 (jjwt 라이브러리)
 *
 * 이 파일이 보여 주는 것
 *   - 토큰 안에 "누구인지(sub)" 와 "언제까지 유효한지(exp)" 를 적고 SECRET_KEY 로 서명(HS256)한다.
 *   - 서버는 토큰을 따로 저장하지 않는다. 서명만 검사하면 위조 여부를 알 수 있다.
 *   - 토큰 내용은 누구나 읽을 수 있다(암호화가 아님). 그래서 비밀번호 같은 것은 넣지 않는다.
 *   - @Value("${jwt.secret}") : application.yml 의 jwt.secret 값을 넣어 준다.
 */
@Component
public class JwtProvider {

	private final SecretKey key;
	private final Duration expiration;

	public JwtProvider(@Value("${jwt.secret}") String secret,
			@Value("${jwt.expiration-minutes}") long expirationMinutes) {
		// HS256 은 32바이트(256비트) 이상의 열쇠가 필요하다. 짧으면 서버가 켜질 때 오류가 난다
		this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expiration = Duration.ofMinutes(expirationMinutes);
	}

	/** 사용자 번호를 담은 토큰을 만든다 */
	public String createToken(Long userId) {
		Instant now = Instant.now();
		return Jwts.builder()
				.subject(String.valueOf(userId)) //              sub: 토큰 주인 (문자열로 넣는 것이 규칙)
				.issuedAt(Date.from(now)) //                     iat: 발급 시각
				.expiration(Date.from(now.plus(expiration))) //  exp: 만료 시각
				.signWith(key) //                                서명 (열쇠 길이를 보고 HS256 을 고른다)
				.compact(); //                                   "헤더.내용.서명" 글자로
	}

	/**
	 * 토큰을 검사해 사용자 번호를 돌려준다. 위조됐거나 만료됐으면 null.
	 * parseSignedClaims 가 서명과 만료 시각을 함께 검사하고, 문제가 있으면 JwtException 을 던진다.
	 *   ExpiredJwtException(만료), SignatureException(위조), MalformedJwtException(모양이 틀림) ...
	 */
	public Long parseUserId(String token) {
		try {
			Claims claims = Jwts.parser().verifyWith(key).build()
					.parseSignedClaims(token)
					.getPayload();
			return Long.valueOf(claims.getSubject());
		} catch (JwtException | IllegalArgumentException e) {
			return null;
		}
	}
}

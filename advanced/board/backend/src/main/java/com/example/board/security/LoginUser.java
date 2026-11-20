package com.example.board.security;

/**
 * LoginUser - "지금 요청한 사람" 을 담는 작은 객체
 *
 * JwtAuthenticationFilter 가 토큰을 검사한 뒤 이 객체를 만들어 Spring Security 에 맡겨 둔다.
 * Controller 에서는 @AuthenticationPrincipal LoginUser user 로 꺼내 쓴다.
 */
public record LoginUser(Long id, String username, String nickname) {
}

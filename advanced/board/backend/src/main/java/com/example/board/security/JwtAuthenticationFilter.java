package com.example.board.security;

import com.example.board.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JwtAuthenticationFilter - 모든 요청에서 토큰을 먼저 검사하는 "필터"
 *
 * 요청이 Controller 에 닿기 전에 이 필터를 지나간다. 하는 일:
 *   1. 헤더 "Authorization: Bearer <토큰>" 에서 토큰을 꺼낸다.
 *   2. JwtProvider 로 서명·만료를 검사해 사용자 번호를 얻는다.
 *   3. DB 에 그 사용자가 있으면 LoginUser 를 만들어 SecurityContext 에 넣는다 = "이 요청은 로그인한 요청"
 *   4. 토큰이 없거나 틀려도 여기서 막지 않는다. 그냥 "로그인 안 한 요청" 으로 다음으로 넘긴다.
 *      → 글 목록처럼 누구나 볼 수 있는 주소는 그대로 통과하고,
 *        로그인이 필요한 주소는 SecurityConfig 의 규칙에 걸려 401 이 된다.
 *      토큰이 틀렸었다는 표시(JWT_ERROR)를 남겨 두면, 401 응답 문구를 "만료되었습니다" 로 고를 수 있다.
 *
 * @Component 를 붙이지 않은 이유: 붙이면 Spring Boot 가 일반 서블릿 필터로도 한 번 더 등록해서
 * 필터가 두 번 실행된다. SecurityConfig 에서 직접 new 로 만들어 Security 필터 줄에만 넣는다.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	public static final String JWT_ERROR = "jwt_error"; // 요청에 남겨 두는 표시 이름

	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;

	public JwtAuthenticationFilter(JwtProvider jwtProvider, UserRepository userRepository) {
		this.jwtProvider = jwtProvider;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			String token = header.substring(7); // "Bearer " 뒤의 글자
			Long userId = jwtProvider.parseUserId(token);
			var user = (userId == null) ? null : userRepository.findById(userId).orElse(null); // 탈퇴했을 수도 있다
			if (user != null) {
				LoginUser loginUser = new LoginUser(user.getId(), user.getUsername(), user.getNickname());
				// 권한 목록은 이 과정에서 쓰지 않으므로 빈 목록 (관리자 기능을 만들면 ROLE_ADMIN 등을 넣는다)
				var authentication = new UsernamePasswordAuthenticationToken(loginUser, null, List.of());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				request.setAttribute(JWT_ERROR, true); // 토큰은 왔지만 쓸 수 없음 (만료·위조·없는 사용자)
			}
		}
		chain.doFilter(request, response); // 다음 필터(그리고 Controller)로 넘긴다
	}
}

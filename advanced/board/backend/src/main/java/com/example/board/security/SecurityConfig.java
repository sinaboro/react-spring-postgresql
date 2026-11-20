package com.example.board.security;

import com.example.board.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * SecurityConfig - Spring Security 설정: "어느 주소를 누가 쓸 수 있나"
 *
 * 이 파일이 보여 주는 것
 *   1. 주소별 규칙 (authorizeHttpRequests)
 *        GET  /api/posts/**                   누구나
 *        POST /api/auth/signup, /api/auth/login  누구나
 *        /docs 등 API 시험 화면                 누구나
 *        그 밖 (글쓰기·수정·삭제, /api/auth/me)   로그인한 사람만 → 아니면 401
 *   2. 세션을 만들지 않는다 (STATELESS) - 요청마다 토큰으로 확인하는 JWT 방식이므로
 *   3. csrf 끄기 - 쿠키로 로그인 상태를 유지하지 않으므로(토큰을 헤더로 보냄) 필요 없다
 *   4. 우리가 만든 JwtAuthenticationFilter 를 Security 필터 줄에 끼워 넣는다
 *   5. 401·403 응답을 { "detail": "..." } JSON 으로 (React 가 그대로 보여 줄 수 있게)
 *   6. CORS - Security 를 쓰면 CORS 도 여기서 켜 줘야 한다 (WebConfig 대신)
 *   7. 비밀번호 해시 도구(PasswordEncoder)로 BCrypt 를 등록
 *   8. 빈 UserDetailsService 등록 - Spring 의 "아이디·비밀번호 로그인 기능" 을 쓰지 않는다는 표시
 */
@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, JwtProvider jwtProvider, UserRepository userRepository)
			throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.cors(Customizer.withDefaults()) // 아래 corsConfigurationSource() 를 쓴다
				.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.formLogin(form -> form.disable()) //  Spring 기본 로그인 화면 끄기
				.httpBasic(basic -> basic.disable()) // 브라우저 기본 로그인 창 끄기
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.GET, "/api/posts", "/api/posts/**").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/auth/signup", "/api/auth/login").permitAll()
						.requestMatchers("/docs", "/swagger-ui/**", "/v3/api-docs/**", "/error").permitAll()
						.anyRequest().authenticated())
				.exceptionHandling(e -> e
						// 로그인이 필요한데 안 됨 → 401. 토큰이 틀렸었다면 "만료" 문구
						.authenticationEntryPoint((request, response, ex) -> writeJson(response, 401,
								request.getAttribute(JwtAuthenticationFilter.JWT_ERROR) != null
										? "로그인이 만료되었습니다. 다시 로그인하세요"
										: "로그인이 필요합니다"))
						// 로그인은 했지만 권한 없음 → 403 (이 과정에서는 거의 쓰이지 않는다)
						.accessDeniedHandler((request, response, ex) -> writeJson(response, 403, "권한이 없습니다")))
				.addFilterBefore(new JwtAuthenticationFilter(jwtProvider, userRepository),
						UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	/** BCrypt: 비밀번호 전용 해시. 일부러 느리고 매번 다른 소금(salt)을 섞는다 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * 이 서버는 로그인을 AuthService(직접 비밀번호 비교) + JWT 로 처리하므로 Spring 의 기본 사용자 조회는 쓰지 않는다.
	 * 이 Bean 이 없으면 Spring 이 임시 계정을 만들고 콘솔에 "Using generated security password: ..." 를 찍는다.
	 */
	@Bean
	public UserDetailsService userDetailsService() {
		return username -> {
			throw new UsernameNotFoundException(username);
		};
	}

	/** React 개발 서버(5173)에서 오는 요청 허락. Authorization 헤더도 허락해야 토큰을 보낼 수 있다 */
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
		config.setAllowedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", config);
		return source;
	}

	private static void writeJson(HttpServletResponse response, int status, String detail) throws IOException {
		response.setStatus(status);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{\"detail\":\"" + detail + "\"}");
	}
}

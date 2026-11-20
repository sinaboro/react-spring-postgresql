package com.example.board.auth;

import com.example.board.security.LoginUser;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController - 회원가입·로그인·내 정보 API
 *
 *   주소                 방식   로그인   하는 일                 성공
 *   /api/auth/signup     POST   -        회원가입                 201
 *   /api/auth/login      POST   -        로그인 → 토큰 발급        200
 *   /api/auth/me         GET    필요     토큰 주인의 정보          200
 *
 *   상태 코드 정리
 *     400 Bad Request  : 입력 규칙 위반 (아이디 형식, 비밀번호 길이)
 *     401 Unauthorized : 로그인 실패, 토큰 없음·만료·위조 → "누구세요?"
 *     403 Forbidden    : 로그인은 했지만 남의 글 → "당신은 알지만 안 됩니다"
 *     409 Conflict     : 이미 있는 아이디로 가입
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/signup")
	@ResponseStatus(HttpStatus.CREATED)
	public UserResponse signup(@Valid @RequestBody SignupRequest request) {
		return authService.signup(request);
	}

	@PostMapping("/login")
	public TokenResponse login(@Valid @RequestBody LoginRequest request) {
		return authService.login(request);
	}

	@GetMapping("/me")
	@SecurityRequirement(name = "bearerAuth")
	public UserResponse me(@AuthenticationPrincipal LoginUser user) {
		return authService.me(user.id());
	}
}

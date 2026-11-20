package com.example.board.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * OpenApiConfig - /docs (Swagger UI) 화면 설정
 *
 * "bearerAuth" 라는 이름의 인증 방식(Authorization: Bearer 토큰)을 등록한다.
 *   → /docs 오른쪽 위에 Authorize 버튼이 생기고, 넣은 토큰이
 *     @SecurityRequirement(name = "bearerAuth") 가 붙은 API 요청에 자동으로 붙는다.
 */
@Configuration
@OpenAPIDefinition(info = @Info(title = "React 게시판 API (심화: 로그인)", version = "1.0"))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfig {
}

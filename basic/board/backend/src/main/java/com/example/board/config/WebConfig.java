package com.example.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig - CORS 설정 (React 개발 서버에서 오는 요청 허락하기)
 *
 * 브라우저는 "다른 출처(주소·포트)" 로 보내는 요청의 응답을 기본으로 막는다.
 *   React 개발 서버  http://localhost:5173
 *   API 서버        http://localhost:8080   ← 포트가 다르면 다른 출처
 * 그래서 API 서버가 "5173 에서 온 요청은 받아도 된다" 고 응답 헤더로 알려 줘야 한다.
 *
 * @Configuration : Spring 이 시작할 때 읽어 가는 설정 클래스라는 표시
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**") //                                     /api 로 시작하는 주소에
				.allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173") // 이 출처에서 온 요청을
				.allowedMethods("GET", "POST", "PUT", "DELETE") //               이 방식으로
				.allowedHeaders("*"); //                                         어떤 헤더든 허락
	}
}

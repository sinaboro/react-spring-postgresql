package com.example.board.common;

import org.springframework.http.HttpStatus;

/**
 * ApiException - "이 상태 코드와 이 문장으로 응답해 줘" 라는 뜻의 우리 앱 전용 예외
 *
 *   throw new ApiException(HttpStatus.NOT_FOUND, "글을 찾을 수 없습니다");
 *
 * 던지기만 하면 GlobalExceptionHandler 가 받아서 { "detail": "글을 찾을 수 없습니다" } (404) 로 응답한다.
 * RuntimeException 을 물려받았으므로 throws 를 적지 않아도 된다.
 */
public class ApiException extends RuntimeException {

	private final HttpStatus status;

	public ApiException(HttpStatus status, String message) {
		super(message);
		this.status = status;
	}

	public HttpStatus getStatus() {
		return status;
	}
}

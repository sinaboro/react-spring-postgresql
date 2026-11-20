package com.example.board.common;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * GlobalExceptionHandler - 오류를 한 곳에서 받아 같은 모양의 JSON 으로 응답한다
 *
 * 이 파일이 보여 주는 것
 *   - @RestControllerAdvice : 모든 Controller 에서 던져진 예외를 여기서 받는다.
 *   - @ExceptionHandler(예외클래스.class) : 그 예외가 나면 이 메서드가 응답을 만든다.
 *   - 오류 응답은 항상 { "detail": "이유" } 모양으로 맞춘다.
 *     → React 쪽에서는 data.detail 하나만 읽으면 된다.
 *
 *   예외                                   상태 코드   언제
 *   ApiException                           지정한 값   없는 글(404) 등 우리가 직접 던진 것
 *   MethodArgumentNotValidException        400        @Valid 검사 실패 (제목이 비었음 등)
 *   HttpMessageNotReadableException        400        본문이 올바른 JSON 이 아님
 *   HttpMediaTypeNotSupportedException     415        Content-Type 이 application/json 이 아님
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<Map<String, String>> handleApi(ApiException e) {
		return ResponseEntity.status(e.getStatus()).body(Map.of("detail", e.getMessage()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException e) {
		// 여러 칸이 틀렸어도 첫 번째 이유만 보여 준다 (예: "제목을 입력하세요")
		String message = e.getBindingResult().getFieldErrors().stream()
				.findFirst()
				.map(error -> error.getDefaultMessage())
				.orElse("입력값을 확인하세요");
		return ResponseEntity.badRequest().body(Map.of("detail", message));
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<Map<String, String>> handleNotReadable(HttpMessageNotReadableException e) {
		return ResponseEntity.badRequest().body(Map.of("detail", "요청 본문이 올바른 JSON 이 아닙니다"));
	}

	@ExceptionHandler(HttpMediaTypeNotSupportedException.class)
	public ResponseEntity<Map<String, String>> handleMediaType(HttpMediaTypeNotSupportedException e) {
		return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
				.body(Map.of("detail", "Content-Type 을 application/json 으로 보내세요"));
	}
}

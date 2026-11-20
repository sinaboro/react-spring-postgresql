package com.example.board.common;

import java.lang.reflect.RecordComponent;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

/**
 * GlobalExceptionHandler - 오류를 한 곳에서 받아 같은 모양의 JSON 으로 응답한다
 *
 * 이 파일이 보여 주는 것
 *   - @RestControllerAdvice : 모든 Controller 에서 던져진 예외를 여기서 받는다.
 *   - @ExceptionHandler(예외클래스.class) : 그 예외가 나면 이 메서드가 응답을 만든다.
 *   - 오류 응답은 항상 { "detail": "이유" } 모양으로 맞춘다.
 *     → React 쪽에서는 data.detail 하나만 읽으면 된다.
 *     (여기서 처리하지 않으면 Spring 기본 모양 {"timestamp":..., "status":400, "error":"Bad Request"} 이 나가서
 *      화면에는 "요청 실패 (400)" 처럼 이유 없는 문구만 보이게 된다)
 *
 *   예외                                   상태 코드   언제
 *   ApiException                           지정한 값   없는 글(404) 등 우리가 직접 던진 것
 *   MethodArgumentNotValidException        400        @Valid 검사 실패 (제목이 비었음 등)
 *   HttpMessageNotReadableException        400        본문이 비었거나 올바른 JSON 이 아님
 *   MethodArgumentTypeMismatchException    400        /api/posts/abc 처럼 숫자 자리에 글자가 옴
 *   NoResourceFoundException               404        /api/nothing 처럼 없는 주소
 *   HttpRequestMethodNotSupportedException 405        PATCH 처럼 만들지 않은 요청 방식
 *   HttpMediaTypeNotSupportedException     415        Content-Type 이 application/json 이 아님
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<Map<String, String>> handleApi(ApiException e) {
		return detail(e.getStatus(), e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException e) {
		return detail(HttpStatus.BAD_REQUEST, firstMessage(e));
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<Map<String, String>> handleNotReadable(HttpMessageNotReadableException e) {
		return detail(HttpStatus.BAD_REQUEST, "요청 본문이 올바른 JSON 이 아닙니다");
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<Map<String, String>> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
		// e.getName() : 값이 잘못된 매개변수 이름 (id, user_id ...)
		return detail(HttpStatus.BAD_REQUEST, "'" + e.getName() + "' 값이 올바르지 않습니다 (숫자를 넣어야 합니다)");
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<Map<String, String>> handleNoResource(NoResourceFoundException e) {
		return detail(HttpStatus.NOT_FOUND, "없는 주소입니다");
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<Map<String, String>> handleMethod(HttpRequestMethodNotSupportedException e) {
		return detail(HttpStatus.METHOD_NOT_ALLOWED, e.getMethod() + " 방식은 이 주소에서 쓸 수 없습니다");
	}

	@ExceptionHandler(HttpMediaTypeNotSupportedException.class)
	public ResponseEntity<Map<String, String>> handleMediaType(HttpMediaTypeNotSupportedException e) {
		return detail(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Content-Type 을 application/json 으로 보내세요");
	}

	/** { "detail": message } 응답을 만드는 작은 도우미 */
	private static ResponseEntity<Map<String, String>> detail(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(Map.of("detail", message));
	}

	/**
	 * 여러 칸이 한꺼번에 틀렸을 때 보여 줄 "첫 번째" 이유를 고른다.
	 *   - Spring 이 돌려주는 오류 목록은 순서가 매번 달라질 수 있다.
	 *     그래서 record 에 칸을 적은 순서(title → writer ...)대로 골라, 항상 위쪽 칸의 오류가 먼저 보이게 한다.
	 *   - 한 칸에 오류가 둘이면(빈 아이디: @NotBlank 와 @Pattern) "입력하세요"(NotBlank) 를 먼저 보여 준다.
	 */
	private static String firstMessage(MethodArgumentNotValidException e) {
		Object target = e.getBindingResult().getTarget(); // 검사한 객체 (PostRequest 등)
		List<String> order = (target != null && target.getClass().isRecord())
				? Arrays.stream(target.getClass().getRecordComponents()).map(RecordComponent::getName).toList()
				: List.of();
		return e.getBindingResult().getFieldErrors().stream()
				.min(Comparator.<FieldError>comparingInt(err -> order.indexOf(err.getField()))
						.thenComparingInt(err -> "NotBlank".equals(err.getCode()) ? 0 : 1))
				.map(FieldError::getDefaultMessage)
				.orElse("입력값을 확인하세요");
	}
}

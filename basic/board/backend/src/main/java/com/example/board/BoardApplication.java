package com.example.board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * BoardApplication - 게시판 API 서버의 시작점 (main 메서드)
 *
 * IntelliJ 에서 이 파일을 열고 class 이름 왼쪽의 초록색 ▶ 버튼을 누르면 서버가 켜진다.
 * (터미널에서는 backend 폴더에서 .\gradlew.bat bootRun)
 *
 * @SpringBootApplication 은 "이 패키지(com.example.board)와 그 아래 패키지를 훑어서
 * @RestController, @Service, @Repository, @Configuration 이 붙은 클래스를 찾아 등록하라" 는 뜻이다.
 * 그래서 다른 클래스들은 반드시 com.example.board 아래 패키지에 둔다.
 */
@SpringBootApplication
public class BoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardApplication.class, args);
	}
}

"""교안에 들어가는 개념 그림을 만든다 (docs/images/fig_*.png).

    python tools/make_figures.py

matplotlib 으로 상자와 화살표를 그린다. 글꼴은 맑은 고딕(Windows 기본).
화면 캡처(b*_*.png, a*_*.png)는 이 파일이 아니라 실제 앱을 실행해 찍은 것이다.
"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

plt.rcParams["font.family"] = "Malgun Gothic"
plt.rcParams["axes.unicode_minus"] = False

OUT = Path(__file__).resolve().parent.parent / "docs" / "images"
OUT.mkdir(parents=True, exist_ok=True)

NAVY, BLUE, CYAN, GREEN, ORANGE, RED, GREY = "#1f3a5f", "#03588C", "#61dafb", "#2e7d32", "#e8890c", "#c0392b", "#6b7280"
FILL = {"navy": "#e3ebf5", "cyan": "#e0f7fd", "green": "#e6f4ea", "orange": "#fff1dc", "red": "#fdecea", "grey": "#f1f3f5"}
EDGE = {"navy": NAVY, "cyan": "#1aa3c8", "green": GREEN, "orange": ORANGE, "red": RED, "grey": GREY}


def canvas(w, h):
    fig, ax = plt.subplots(figsize=(w, h), dpi=150)
    ax.set_xlim(0, w * 10)
    ax.set_ylim(0, h * 10)
    ax.axis("off")
    return fig, ax


def box(ax, x, y, w, h, text, color="navy", size=10, bold=False, align="center"):
    """(x, y) 는 왼쪽 아래. text 는 여러 줄 가능."""
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.3,rounding_size=1.2",
                                fc=FILL[color], ec=EDGE[color], lw=1.4, clip_on=False))
    tx = x + w / 2 if align == "center" else x + 1.2
    ax.text(tx, y + h / 2, text, ha=align, va="center", fontsize=size,
            fontweight="bold" if bold else "normal", color="#1f2937", linespacing=1.5)


def arrow(ax, x1, y1, x2, y2, label="", color=NAVY, both=False, rad=0.0, size=8.5, lx=0, ly=0, dashed=False):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle="<|-|>" if both else "-|>",
                                 mutation_scale=13, color=color, lw=1.5,
                                 connectionstyle=f"arc3,rad={rad}", linestyle="--" if dashed else "-", clip_on=False))
    if label:
        ax.text((x1 + x2) / 2 + lx, (y1 + y2) / 2 + ly, label, ha="center", va="center", fontsize=size,
                color=color, bbox=dict(fc="white", ec="none", pad=1.5))


def title(ax, text, x=None, y=None):
    xl, yl = ax.get_xlim(), ax.get_ylim()
    ax.text(x if x is not None else xl[1] / 2, y if y is not None else yl[1] - 2.5, text,
            ha="center", va="top", fontsize=11.5, fontweight="bold", color=NAVY)


def save(fig, name):
    fig.savefig(OUT / name, bbox_inches="tight", pad_inches=0.12, facecolor="white")
    plt.close(fig)
    print("그림:", name)


# ------------------------------------------------------------------ 1장: 명령형 vs React
def fig_react_idea():
    fig, ax = canvas(9, 3.6)
    title(ax, "화면을 바꾸는 두 가지 방법")
    box(ax, 2, 4, 38, 22, "자바스크립트(DOM 직접 조작)\n\n① 버튼을 찾는다\n② 숫자 태그를 찾는다\n③ 글자를 직접 바꾼다\n→ \"어떻게\" 바꿀지 하나하나 명령", "grey", 9.5)
    box(ax, 50, 4, 38, 22, "React\n\n① 데이터(state)만 바꾼다\n② React 가 화면을 다시 그린다\n\n→ \"무엇을\" 보여 줄지만 적는다\n   화면 = 함수(데이터)", "cyan", 9.5)
    arrow(ax, 41, 15, 49, 15, "발상의 전환", BLUE)
    save(fig, "fig_react_idea.png")


# ------------------------------------------------------------------ 1장: Vite 개발 흐름
def fig_vite_flow():
    fig, ax = canvas(9, 3.0)
    title(ax, "npm run dev 를 하면 일어나는 일")
    box(ax, 1, 5, 20, 14, "src/App.jsx\n(내가 고친 파일)", "orange", 9.5)
    box(ax, 30, 5, 22, 14, "Vite 개발 서버\nJSX → 자바스크립트\n로 바꿔 줌", "navy", 9.5)
    box(ax, 62, 5, 26, 14, "브라우저\nhttp://localhost:5173\n(저장하면 바로 반영)", "cyan", 9.5)
    arrow(ax, 21.5, 12, 29.5, 12, "저장", ORANGE)
    arrow(ax, 52.5, 12, 61.5, 12, "자동 새로 고침", BLUE)
    save(fig, "fig_vite_flow.png")


# ------------------------------------------------------------------ 4장: 컴포넌트 트리 + props
def fig_component_tree():
    fig, ax = canvas(9, 4.4)
    title(ax, "컴포넌트 나무와 데이터 흐름")
    box(ax, 33, 30, 24, 8, "App", "navy", 11, True)
    box(ax, 3, 15, 24, 8, "Header", "cyan", 10)
    box(ax, 33, 15, 24, 8, "PostList", "cyan", 10)
    box(ax, 63, 15, 24, 8, "Footer", "cyan", 10)
    box(ax, 22, 1, 20, 7, "PostItem", "green", 9.5)
    box(ax, 48, 1, 20, 7, "PostItem", "green", 9.5)
    for x in (15, 45, 75):
        arrow(ax, 45, 29.5, x, 23.6)
    arrow(ax, 43, 14.5, 32, 8.5, "props ↓", GREEN, lx=-4)
    arrow(ax, 47, 14.5, 58, 8.5)
    ax.text(79, 4.5, "props: 부모 → 자식\n(읽기 전용)", fontsize=8.5, color=GREEN, ha="center", va="center")
    ax.text(10, 4.5, "함수(props): 자식이 불러서\n부모에게 알림 ↑", fontsize=8.5, color=ORANGE, ha="center", va="center")
    save(fig, "fig_component_tree.png")


# ------------------------------------------------------------------ 6장: state 순환
def fig_state_cycle():
    fig, ax = canvas(8, 4.2)
    title(ax, "state 가 바뀌면 화면이 다시 그려진다")
    box(ax, 30, 28, 20, 8, "① 화면 표시\ncount = 0", "cyan", 9.5)
    box(ax, 58, 15, 20, 8, "② 이벤트\n버튼 클릭", "orange", 9.5)
    box(ax, 30, 2, 20, 8, "③ setCount(1)\nstate 변경 요청", "navy", 9.5)
    box(ax, 2, 15, 20, 8, "④ 다시 그리기\n컴포넌트 함수 재실행", "green", 9.5)
    arrow(ax, 50.5, 32, 62, 23.6, rad=-0.2)
    arrow(ax, 66, 14.5, 50.5, 6, rad=-0.2)
    arrow(ax, 29.5, 6, 14, 14.5, rad=-0.2)
    arrow(ax, 14, 23.6, 29.5, 32, rad=-0.2)
    ax.text(40, 19, "일반 변수는\n이 순환에\n끼지 못한다", ha="center", va="center", fontsize=8.5, color=GREY)
    save(fig, "fig_state_cycle.png")


# ------------------------------------------------------------------ 8장: useEffect 시점
def fig_effect_timing():
    fig, ax = canvas(9, 3.6)
    title(ax, "useEffect 는 화면을 그린 \"뒤에\" 실행된다")
    xs = [1, 19, 37, 55, 73]
    labels = ["컴포넌트\n함수 실행", "화면에\n그리기", "useEffect\n실행", "state 변경\n(데이터 도착)", "다시 그리기"]
    colors = ["navy", "cyan", "orange", "navy", "cyan"]
    for x, t, c in zip(xs, labels, colors):
        box(ax, x, 12, 15, 10, t, c, 9.2)
    for a, b in zip(xs, xs[1:]):
        arrow(ax, a + 15.5, 17, b - 0.5, 17)
    ax.text(44.5, 6, "[ ] 빈 배열: 처음 한 번   [값]: 값이 바뀔 때마다   생략: 그릴 때마다", ha="center",
            fontsize=8.8, color=ORANGE)
    ax.text(44.5, 2, "정리(clean-up) 함수는 다음 실행 직전·화면에서 사라질 때 실행", ha="center", fontsize=8.8, color=GREY)
    save(fig, "fig_effect_timing.png")


# ------------------------------------------------------------------ 9장: 전체 구조
def fig_architecture(name="fig_architecture.png", auth=False):
    fig, ax = canvas(9.5, 4.2)
    title(ax, "게시판의 세 부분" + (" (로그인 추가)" if auth else ""))
    box(ax, 1, 8, 24, 22, "브라우저\nReact (Vite)\n\nhttp://localhost:5173\n\n화면 그리기 · 입력 받기", "cyan", 9.3)
    box(ax, 37, 8, 24, 22, "Spring Boot 서버\n(내장 Tomcat)\n\nhttp://localhost:8080\n\n" +
        ("토큰 검사 · 권한 확인\n" if auth else "") + "API · 입력 검사", "navy", 9.3)
    box(ax, 71, 8, 23, 22, "PostgreSQL\n(Docker 컨테이너)\n\nlocalhost:" + ("5434" if auth else "5433") +
        "\n\n" + ("users · posts" if auth else "posts 테이블"), "green", 9.3)
    arrow(ax, 25.5, 23, 36.5, 23, "요청 (JSON)", BLUE, ly=2.5)
    arrow(ax, 36.5, 15, 25.5, 15, "응답 (JSON)", BLUE, ly=-2.5)
    arrow(ax, 61.5, 23, 70.5, 23, "SQL", GREEN, ly=2.5)
    arrow(ax, 70.5, 15, 61.5, 15, "결과 행", GREEN, ly=-2.5)
    ax.text(31, 3, "fetch()  +  CORS 허락" + ("  +  Authorization 헤더" if auth else ""), ha="center", fontsize=8.6, color=BLUE)
    ax.text(65, 3, "JPA (Hibernate)", ha="center", fontsize=8.6, color=GREEN)
    save(fig, name)


# ------------------------------------------------------------------ 9장: 화면 전환 (state)
def fig_board_pages():
    fig, ax = canvas(9, 4)
    title(ax, "기초 게시판의 화면 전환 (App 의 page state)")
    box(ax, 2, 13, 22, 11, "PostList\n{ name: \"list\" }", "cyan", 9.3)
    box(ax, 36, 13, 22, 11, "PostDetail\n{ name: \"detail\", id }", "navy", 9.3)
    box(ax, 70, 13, 22, 11, "PostForm\n{ name: \"form\", id? }", "orange", 9.3)
    arrow(ax, 24.5, 21, 35.5, 21, "제목 클릭", BLUE, ly=2)
    arrow(ax, 35.5, 16, 24.5, 16, "목록 · 삭제 후", BLUE, ly=-2)
    arrow(ax, 58.5, 21, 69.5, 21, "수정", ORANGE, ly=2)
    arrow(ax, 69.5, 16, 58.5, 16, "저장 · 취소", ORANGE, ly=-2)
    arrow(ax, 13, 12.5, 81, 12.5, "글쓰기", ORANGE, rad=0.25, ly=-9.5)
    ax.text(47, 36.5, "", fontsize=1)
    save(fig, "fig_board_pages.png")


# ------------------------------------------------------------------ 심화 2장: state / ref / 변수
def fig_ref_vs_state():
    fig, ax = canvas(8.5, 3.3)
    title(ax, "값을 담는 세 가지 그릇")
    rows = [("일반 변수", "X (매번 처음값)", "X", "grey"),
            ("state (useState)", "O", "O  다시 그림", "cyan"),
            ("ref (useRef)", "O", "X  조용히 기억", "orange")]
    box(ax, 1, 19, 26, 5, "", "navy")
    ax.text(14, 21.5, "그릇", ha="center", va="center", fontsize=9.5, fontweight="bold")
    ax.text(43, 21.5, "다시 그려져도 값 유지?", ha="center", va="center", fontsize=9.5, fontweight="bold", color=NAVY)
    ax.text(70, 21.5, "값을 바꾸면 다시 그림?", ha="center", va="center", fontsize=9.5, fontweight="bold", color=NAVY)
    for i, (a, b, c, col) in enumerate(rows):
        y = 13 - i * 5.5
        box(ax, 1, y, 26, 4, a, col, 9.3)
        ax.text(43, y + 2, b, ha="center", va="center", fontsize=9.3)
        ax.text(70, y + 2, c, ha="center", va="center", fontsize=9.3)
    save(fig, "fig_ref_vs_state.png")


# ------------------------------------------------------------------ 심화 2장: reducer
def fig_reducer():
    fig, ax = canvas(9, 3.2)
    title(ax, "useReducer: \"무엇을\" 은 컴포넌트, \"어떻게\" 는 리듀서")
    box(ax, 1, 6, 22, 14, "컴포넌트\n\ndispatch({\n type: \"add\", product })", "cyan", 9)
    box(ax, 34, 6, 22, 14, "cartReducer\n(state, action)\n\nswitch (action.type)", "orange", 9)
    box(ax, 67, 6, 22, 14, "새 state\n\n→ 화면 다시 그림", "green", 9)
    arrow(ax, 23.5, 13, 33.5, 13, "action", BLUE, ly=2.5)
    arrow(ax, 56.5, 13, 66.5, 13, "return", GREEN, ly=2.5)
    save(fig, "fig_reducer.png")


# ------------------------------------------------------------------ 심화 4장: Router
def fig_router():
    fig, ax = canvas(9.5, 4.3)
    title(ax, "React Router: 주소 → 화면")
    box(ax, 1, 14, 21, 12, "주소창\n/users/2", "grey", 10)
    box(ax, 30, 14, 25, 12, "<Routes>\npath=\"users/:userId\"\n와 맞는 Route 찾기", "orange", 9)
    box(ax, 63, 4, 31, 32, "", "navy")
    ax.text(78.5, 32, "Layout (머리글·메뉴)", ha="center", fontsize=9.5, fontweight="bold", color=NAVY)
    box(ax, 66, 7, 25, 18, "<Outlet /> 자리\n\nUserDetailPage\nuseParams() → { userId: \"2\" }", "cyan", 8.8)
    arrow(ax, 22.5, 20, 29.5, 20)
    arrow(ax, 55.5, 20, 65.5, 18)
    ax.text(11.5, 9, "<Link> · navigate() 가\n주소를 바꾼다", ha="center", fontsize=8.6, color=BLUE)
    save(fig, "fig_router.png")


# ------------------------------------------------------------------ 심화 5장: prop drilling vs context
def fig_context():
    fig, ax = canvas(9.5, 4.2)
    title(ax, "props 로 내려보내기 vs Context")
    # 왼쪽: drilling
    ax.text(22, 33.5, "props 로만 (prop drilling)", ha="center", fontsize=9.5, fontweight="bold", color=RED)
    for i, (t, c) in enumerate([("App  (user 보유)", "navy"), ("Page", "grey"), ("Section", "grey"), ("Header  (user 사용)", "cyan")]):
        box(ax, 8, 26 - i * 7.5, 28, 4.5, t, c, 9)
        if i:
            arrow(ax, 22, 26 - (i - 1) * 7.5 - 0.6, 22, 26 - i * 7.5 + 5, "user", RED, lx=5, size=7.5)
    ax.text(22, 0.5, "쓰지도 않는 중간 컴포넌트가 계속 전달", ha="center", fontsize=8.3, color=RED)
    # 오른쪽: context
    ax.text(70, 33.5, "Context", ha="center", fontsize=9.5, fontweight="bold", color=GREEN)
    box(ax, 52, 21, 36, 9, "", "green")
    ax.text(70, 28, "<AuthProvider value={user}>", ha="center", fontsize=8.8, color=GREEN)
    box(ax, 55, 22.3, 13, 4, "App", "navy", 8.8)
    for i, t in enumerate(["Page", "Section"]):
        box(ax, 56 + i * 16, 12, 12, 4, t, "grey", 8.8)
    box(ax, 62, 3, 24, 4.5, "Header  useAuth()", "cyan", 8.8)
    arrow(ax, 85, 21, 80, 8, "바로 꺼냄", GREEN, rad=-0.2, lx=6)
    save(fig, "fig_context.png")


# ------------------------------------------------------------------ 심화 6장: 세션 vs 토큰
def fig_session_token():
    fig, ax = canvas(9.5, 3.8)
    title(ax, "로그인 상태를 기억하는 두 방법")
    box(ax, 1, 3, 44, 26, "세션 방식\n\n서버가 \"로그인 명단\" 을 저장\n브라우저는 세션 번호(쿠키)만 가짐\n\n요청마다 서버가 명단에서 확인\n→ 서버가 기억해야 할 것이 많다", "grey", 9.2)
    box(ax, 50, 3, 44, 26, "토큰(JWT) 방식  ← 이 과정\n\n서버가 서명한 \"출입증\" 을 발급\n브라우저가 출입증을 보관\n\n요청마다 출입증을 보여 주면\n서버는 서명만 검사 (저장 X)", "cyan", 9.2)
    save(fig, "fig_session_token.png")


# ------------------------------------------------------------------ 심화 6장: JWT 구조
def fig_jwt():
    fig, ax = canvas(9.5, 3.2)
    title(ax, "JWT = 헤더 . 내용 . 서명")
    box(ax, 1, 9, 26, 12, "헤더 (header)\n{ \"alg\": \"HS256\",\n  \"typ\": \"JWT\" }", "red", 8.8)
    box(ax, 33, 9, 28, 12, "내용 (payload)\n{ \"sub\": \"1\",\n  \"exp\": 만료 시각 }", "navy", 8.8)
    box(ax, 67, 9, 27, 12, "서명 (signature)\nSECRET_KEY 로 만든\n위조 방지 도장", "green", 8.8)
    ax.text(30, 15, ".", fontsize=22, ha="center", va="center", fontweight="bold")
    ax.text(64, 15, ".", fontsize=22, ha="center", va="center", fontweight="bold")
    ax.text(47.5, 3.5, "내용은 누구나 읽을 수 있다(암호화 X) → 비밀번호를 넣지 않는다.  고치면 서명이 맞지 않아 거절된다.",
            ha="center", fontsize=8.6, color=GREY)
    save(fig, "fig_jwt.png")


# ------------------------------------------------------------------ 심화 6·9장: 로그인 흐름
def fig_auth_flow():
    fig, ax = canvas(10, 6.2)
    title(ax, "로그인부터 글쓰기까지")
    ax.text(15, 53, "React", ha="center", fontsize=10.5, fontweight="bold", color="#1aa3c8")
    ax.text(55, 53, "Spring Boot", ha="center", fontsize=10.5, fontweight="bold", color=NAVY)
    ax.text(88, 53, "PostgreSQL", ha="center", fontsize=10.5, fontweight="bold", color=GREEN)
    for x, c in ((15, "#1aa3c8"), (55, NAVY), (88, GREEN)):
        ax.plot([x, x], [2, 51], color=c, lw=1, ls=":")
    steps = [
        (47, 15, 55, "① POST /api/auth/login {아이디, 비밀번호}", BLUE),
        (42, 55, 88, "② 아이디로 사용자 찾기", GREEN),
        (37, 88, 55, "③ password_hash", GREEN),
        (34, 55, 55, "", NAVY),
        (28, 55, 15, "⑤ { access_token, user }", BLUE),
        (15, 15, 55, "⑦ POST /api/posts  +  Authorization: Bearer 토큰", BLUE),
        (6, 55, 15, "⑨ 201 새 글  (토큰 없음·만료 → 401, 남의 글 → 403)", RED),
    ]
    for y, x1, x2, t, c in steps:
        if x1 != x2:
            arrow(ax, x1, y, x2, y, t, c, size=8.3, ly=2)
    ax.text(57, 32.5, "④ BCrypt 해시 비교 → 맞으면 JWT 발급", fontsize=8.3, color=NAVY, va="center")
    ax.text(17, 22.5, "⑥ localStorage 에 토큰 저장\n    AuthContext 의 user 갱신", fontsize=8.3, color="#1aa3c8", va="center")
    ax.text(57, 10.5, "⑧ JWT 필터: 서명·만료 검사 → LoginUser", fontsize=8.3, color=NAVY, va="center")
    save(fig, "fig_auth_flow.png")


# ------------------------------------------------------------------ 심화 8장: ERD
def fig_erd():
    fig, ax = canvas(8.5, 3.6)
    title(ax, "users 와 posts 의 관계 (1 : N)")
    box(ax, 2, 2, 30, 26, "users\n─────────────\nid (PK)\nusername (UNIQUE)\npassword_hash\nnickname\ncreated_at", "navy", 9.2)
    box(ax, 52, 2, 30, 26, "posts\n─────────────\nid (PK)\nuser_id (FK → users.id)\ntitle\ncontent\ncreated_at · updated_at", "green", 9.2)
    arrow(ax, 32.5, 15, 51.5, 15, "한 사람이 여러 글", ORANGE, ly=2.5)
    ax.text(35, 10.5, "1", fontsize=11, fontweight="bold", color=ORANGE)
    ax.text(48, 10.5, "N", fontsize=11, fontweight="bold", color=ORANGE)
    save(fig, "fig_erd.png")


# ------------------------------------------------------------------ 심화 9장: 401 vs 403
def fig_401_403():
    fig, ax = canvas(9, 3.3)
    title(ax, "글 수정·삭제 요청이 거치는 검사")
    box(ax, 1, 8, 18, 12, "요청\nPUT /posts/3", "cyan", 9)
    box(ax, 25, 8, 20, 12, "토큰이 있고\n유효한가?", "navy", 9)
    box(ax, 50, 8, 17, 12, "3번 글이\n있는가?", "navy", 9)
    box(ax, 72, 8, 17, 12, "내 글인가?", "navy", 9)
    arrow(ax, 19.5, 14, 24.5, 14)
    arrow(ax, 45.5, 14, 49.5, 14, "예", GREEN, ly=2.5)
    arrow(ax, 67.5, 14, 71.5, 14, "예", GREEN, ly=2.5)
    ax.text(35, 3.5, "아니오 → 401", ha="center", fontsize=9, color=RED, fontweight="bold")
    ax.text(58.5, 3.5, "아니오 → 404", ha="center", fontsize=9, color=RED, fontweight="bold")
    ax.text(80.5, 3.5, "아니오 → 403\n예 → 200 수정", ha="center", fontsize=9, color=RED, fontweight="bold")
    save(fig, "fig_401_403.png")


if __name__ == "__main__":
    fig_react_idea()
    fig_vite_flow()
    fig_component_tree()
    fig_state_cycle()
    fig_effect_timing()
    fig_architecture()
    fig_architecture("fig_architecture_auth.png", auth=True)
    fig_board_pages()
    fig_ref_vs_state()
    fig_reducer()
    fig_router()
    fig_context()
    fig_session_token()
    fig_jwt()
    fig_auth_flow()
    fig_erd()
    fig_401_403()

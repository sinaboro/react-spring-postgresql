r"""build_site.py - GitHub Pages 용 웹 교안을 만든다 (강사용)

    python tools\build_site.py

docs/basic/*.md, docs/advanced/*.md (PDF 와 같은 원고)를 HTML 로 바꿔
  docs/index.html                   첫 화면 (기초·심화 과정 소개, 목차, 코드 폴더, PDF)
  docs/basic/ch01.html …            기초 장별 읽기 화면
  docs/advanced/ch01.html …         심화 장별 읽기 화면
를 만든다. GitHub Pages 는 main 브랜치의 /docs 폴더를 공개하도록 설정한다.

저장소 이름(git remote), 과정 제목·비교 표·폴더 설명(README.md)을 읽어 쓰므로
react-fastapi-postgresql 과 react-spring-postgresql 두 저장소에 이 파일을 그대로 넣어 쓴다.
원고(.md)를 고친 뒤 build_guide.py(PDF)와 이 스크립트를 실행하고 push 하면 사이트가 바뀐다.
"""
import html
import re
import subprocess
from pathlib import Path
from urllib.parse import quote

import markdown

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

# 저장소 주소 (git remote 에서 읽는다) → 사이트·내려받기·코드 링크
_remote = subprocess.run(["git", "-C", str(ROOT), "remote", "get-url", "origin"], capture_output=True, text=True).stdout
REPO = re.search(r"github\.com[/:]([^/]+/[^/.\s]+)", _remote)[1]
OWNER, NAME = REPO.split("/")
SITE = f"https://{OWNER}.github.io/{NAME}/"
BLOB = f"https://github.com/{REPO}/blob/main/"           # 파일 보기
TREE = f"https://github.com/{REPO}/tree/main/"           # 폴더 보기
ZIP = f"https://github.com/{REPO}/archive/refs/heads/main.zip"
SPRING = "spring" in NAME
SERVER = "Spring Boot" if SPRING else "FastAPI"
# 같은 과정의 다른 서버판 (첫 화면에서 서로 안내)
TWIN = ("react-fastapi-postgresql", "FastAPI(Python)") if SPRING else ("react-spring-postgresql", "Spring Boot(Java)")

COURSES = {  # 폴더 → (과정 이름, PDF 파일)
    "basic": ("1단계 React 기초", "React_기초_학습교안.pdf"),
    "advanced": ("2단계 React 심화", "React_심화_학습교안.pdf"),
}


def web_name(md_file):
    """원고 파일 이름 → 웹 파일 이름 (03_JSX.md → ch03, A_오류해결.md → appA)"""
    head = md_file.stem.split("_")[0]
    return f"ch{head}" if head.isdigit() else f"app{head}"


def menu_name(title):
    """'# 3장. JSX - 자바스크립트 안의 HTML' → '3장 JSX - 자바스크립트 안의 HTML'"""
    return re.sub(r"^(\d+장|부록 [A-Z])\.\s*", r"\1 ", title)


def chapters(course):
    out = []
    for f in sorted((DOCS / course).glob("*.md")):
        md = f.read_text(encoding="utf-8")
        title = re.search(r"^# (.+)$", md, re.M)[1]
        shot = re.search(r"!\[[^\]]*\]\(\.\./images/((?!fig_)[^)]+\.png)\)", md)   # 실행 화면 (개념 그림 제외)
        fig = re.search(r"!\[[^\]]*\]\(\.\./images/([^)]+\.png)\)", md)
        out.append(dict(src=f, md=md, title=title, menu=menu_name(title), name=web_name(f),
                        thumb=(shot or fig)[1] if (shot or fig) else None))
    return out


# ------------------------------------------------------------------ 마크다운 → HTML
def prepare(md):
    """python-markdown 이 잘 읽도록 원고를 조금 다듬는다 (코드 상자 안은 건드리지 않는다)"""
    out, in_code = [], False
    for line in md.split("\n"):
        if line.startswith("```"):
            in_code = not in_code
            if in_code and out and out[-1].strip() and not out[-1].startswith("<!--"):
                out.append("")                                       # 코드 상자 앞에 빈 줄
            out.append(line)
            continue
        if not in_code:
            line = re.sub(r"^ {2,3}([-*] )", r"    \1", line)        # 2~3칸 들여 쓴 하위 목록 → 4칸
            prev = out[-1] if out else ""
            if re.match(r"^(\d+\.|[-*]) ", line) and prev.strip() and not re.match(r"^\s*(\d+\.|[-*]) ", prev):
                out.append("")                                       # 문단 바로 뒤 목록 앞에 빈 줄
        out.append(line)
    return "\n".join(out)


def slug(value, sep):
    return re.sub(r"\s+", "-", re.sub(r"[^\w\s가-힣-]", "", value)).strip("-").lower()


def to_html(md):
    conv = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"],
                             extension_configs={"toc": {"slugify": slug}}, lazy_ol=False)
    body = conv.convert(prepare(md))
    # <!-- file: 경로 --> 표시 → 코드 상자 위에 "파일 이름 + GitHub 에서 보기" 줄
    body = re.sub(r"<!--\s*file:\s*([^\s]+)\s*-->",
                  lambda m: f'<div class="file"><span>📄 {html.escape(m[1])}</span>'
                            f'<a href="{BLOB}{quote(m[1])}" target="_blank">GitHub 에서 보기</a></div>', body)
    body = re.sub(r'<p><img alt="([^"]*)" src="([^"]+)" ?/?></p>',
                  lambda m: (f'<figure><a href="{m[2]}" target="_blank"><img src="{m[2]}" alt="{m[1]}" loading="lazy"></a>'
                             f'<figcaption>{m[1]}</figcaption></figure>'), body)
    body = body.replace("<blockquote>", '<blockquote class="note">')
    body = body.replace("<table>", '<div class="tbl"><table>').replace("</table>", "</table></div>")
    return body


# ------------------------------------------------------------------ README 에서 과정 정보 읽기
README = (ROOT / "README.md").read_text(encoding="utf-8")
TITLE = re.search(r"^# (.+)$", README, re.M)[1].replace(" 학습 교안", "")
INTRO = README.split("\n\n")[1].strip()                        # 제목 아래 첫 문단


def readme_table():
    """README 의 '구분 | 1단계 | 2단계' 비교 표 (교안 줄은 빼고)"""
    m = re.search(r"(^\| 구분.*?)(?:\n\n)", README, re.M | re.S)
    rows = [r for r in m[1].split("\n") if not r.startswith("| 교안")]
    return to_html("\n".join(rows))


def readme_folders():
    """README 폴더 구성에서 '  이름/   설명' 줄 → (경로, 설명) 목록"""
    block = re.search(r"## 폴더 구성\s+```text\n(.*?)```", README, re.S)[1]
    out, top = [], None
    for line in block.split("\n"):
        m0 = re.match(r"^(basic|advanced)/", line)
        if m0:
            top = m0[1]
            continue
        m = re.match(r"^  ([\w./-]+?)/?\s{2,}(.+)$", line)
        if top and m:
            out.append((f"{top}/{m[1].rstrip('/')}", m[2].strip()))
        if line.startswith(("docs/", "tools/")):
            top = None
    return out


# ------------------------------------------------------------------ 공통 틀
CSS = """
:root{--ink:#1f2328;--sub:#59636e;--line:#e3e6ea;--bg:#f7f8fa;--card:#fff;--navy:#16202e;--acc:#61dafb;--acc2:#0b7fab;
--note:#eef8fc;--noteline:#61dafb;--code:#f3f5f7;--link:#0969da}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--ink:#e6edf3;--sub:#9da7b3;--line:#30363d;--bg:#0f141a;
--card:#161b22;--navy:#0b1017;--note:#10232b;--noteline:#2a8fb0;--code:#1b222b;--link:#58a6ff;--acc2:#61dafb}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.75 "Pretendard","Malgun Gothic","Apple SD Gothic Neo",sans-serif;word-break:keep-all}
a{color:var(--link)}img{max-width:100%;height:auto}
header.top{background:var(--navy);color:#fff;position:sticky;top:0;z-index:5}
header.top .in{max-width:1180px;margin:0 auto;padding:10px 16px;display:flex;gap:10px;align-items:center}
header.top a{color:#fff;text-decoration:none}.logo{font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.logo b{color:var(--acc)}
header.top .sp{flex:1}header.top .btn{font-size:14px;border:1px solid #ffffff55;border-radius:8px;padding:4px 10px;white-space:nowrap}
.wrap{max-width:1180px;margin:0 auto;padding:0 16px}
.doc{display:grid;grid-template-columns:250px minmax(0,1fr);gap:32px;padding:24px 16px 60px;max-width:1180px;margin:0 auto}
.side{position:sticky;top:64px;align-self:start;max-height:calc(100vh - 80px);overflow:auto;font-size:14px}
.side .cap{font-weight:800;margin:4px 10px 6px;color:var(--sub)}
.side a{display:block;padding:5px 10px;border-radius:6px;color:var(--ink);text-decoration:none;line-height:1.45}
.side a.on{background:var(--acc);color:#111;font-weight:700}.side a:hover:not(.on){background:var(--line)}
.side .other{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
article{min-width:0}
article h1{font-size:28px;line-height:1.35;margin:0 0 20px;padding-bottom:12px;border-bottom:4px solid var(--acc)}
article h2{font-size:22px;margin:40px 0 12px;padding-left:10px;border-left:5px solid var(--acc2)}
article h3{font-size:18px;margin:28px 0 8px}
figure{margin:18px 0;text-align:center}figure img{border:1px solid var(--line);border-radius:8px;background:#fff}
figcaption{font-size:13px;color:var(--sub);margin-top:6px}
.tbl{overflow-x:auto;margin:14px 0}table{border-collapse:collapse;width:100%;font-size:15px}
th{background:var(--navy);color:#fff;text-align:left}th,td{padding:7px 10px;border:1px solid var(--line);vertical-align:top}
blockquote.note{margin:16px 0;padding:10px 16px;background:var(--note);border-left:5px solid var(--noteline);border-radius:6px}
blockquote.note p{margin:6px 0}
code{background:var(--code);padding:1px 5px;border-radius:4px;font-family:Consolas,"D2Coding",monospace;font-size:.92em}
.file{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:18px 0 -6px;padding:6px 12px;
background:var(--navy);color:#dfe6ee;border-radius:8px 8px 0 0;font:13px Consolas,monospace}
.file a{color:var(--acc);font-family:inherit;white-space:nowrap}.file span{overflow-wrap:anywhere}
.file+pre{border-top-left-radius:0;border-top-right-radius:0;margin-top:6px}
pre{position:relative;background:var(--code);padding:34px 14px 12px;border-radius:8px;overflow-x:auto;border:1px solid var(--line)}
pre code{background:none;padding:0;font-size:14px;line-height:1.55}
pre code.hljs{padding:0;background:none}
.copy{position:absolute;top:6px;right:6px;font-size:12px;padding:3px 9px;border-radius:6px;border:1px solid var(--line);
background:var(--card);color:var(--ink);cursor:pointer;opacity:.85}.copy:hover{opacity:1}.copy.ok{background:#2da44e;color:#fff;border-color:#2da44e}
.pager{display:flex;gap:12px;justify-content:space-between;margin-top:48px;padding-top:20px;border-top:1px solid var(--line)}
.pager a{flex:1;padding:12px 14px;border:1px solid var(--line);border-radius:10px;text-decoration:none;color:var(--ink);background:var(--card)}
.pager a small{display:block;color:var(--sub)}.pager .next{text-align:right}
select.jump{display:none;width:100%;font-size:16px;padding:8px;margin-bottom:12px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
@media (max-width:860px){.doc{display:block;padding-top:16px}.side{display:none}select.jump{display:block}article h1{font-size:23px}
header.top .hide-s{display:none}}
.hero{background:var(--navy);color:#fff;padding:44px 0 36px}
.hero h1{font-size:38px;margin:0 0 10px;line-height:1.25}.hero h1 b{color:var(--acc)}
.hero p{margin:6px 0;color:#c9d4e0;max-width:760px}.hero .cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.cta a{padding:11px 18px;border-radius:10px;text-decoration:none;font-weight:700}
.cta .main{background:var(--acc);color:#111}.cta .sub{border:1px solid #ffffff66;color:#fff}
.hero .twin{margin-top:16px;font-size:14px}.hero .twin a{color:var(--acc)}
section{padding:36px 0 8px}section h2{font-size:24px;margin:0 0 6px}section .lead{color:var(--sub);margin:0 0 18px}
.course{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px}
.course>div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
.course h3{margin:0 0 4px;font-size:21px}.course .pdf{font-size:14px}
.course ol{list-style:none;padding:0;margin:12px 0 0}
.course li a{display:flex;gap:10px;align-items:center;padding:6px 8px;border-radius:8px;text-decoration:none;color:var(--ink)}
.course li a:hover{background:var(--line)}
.course li img{width:72px;height:44px;object-fit:cover;object-position:left top;border:1px solid var(--line);border-radius:5px;background:#fff;flex:none}
.course li .noimg{width:72px;height:44px;border-radius:5px;background:var(--code);flex:none}
.dl{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
.dl a{display:block;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 14px;text-decoration:none;color:var(--ink)}
.dl a:hover{border-color:var(--acc)}.dl b{font-family:Consolas,monospace}.dl small{display:block;color:var(--sub)}
footer{padding:40px 0 50px;color:var(--sub);font-size:14px;text-align:center}
@media (max-width:600px){.hero h1{font-size:28px}.course{grid-template-columns:1fr}}
"""

# 코드 색 구분(highlight.js)과 [복사] 단추
SCRIPT = """
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" media="(prefers-color-scheme: dark)">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/powershell.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/dockerfile.min.js"></script>
<script>
document.querySelectorAll('pre code').forEach(function(el){
  if(window.hljs && !/language-(text|plaintext)/.test(el.className)){ try{ hljs.highlightElement(el); }catch(e){} }
  var b=document.createElement('button'); b.className='copy'; b.textContent='복사';
  b.onclick=function(){                       // 코드 상자의 글자를 그대로 클립보드에 복사
    navigator.clipboard.writeText(el.innerText).then(function(){
      b.textContent='복사됨'; b.classList.add('ok');
      setTimeout(function(){ b.textContent='복사'; b.classList.remove('ok'); },1500);
    });
  };
  el.parentNode.appendChild(b);
});
</script>"""

KAKAO = """<script>
if(/KAKAOTALK/i.test(navigator.userAgent)){location.href='kakaotalk://web/openExternal?url='+encodeURIComponent(location.href);}
</script>"""


def page(title, body, rel="", code=False):
    desc = html.escape(INTRO.replace("**", "").replace("\n", " "))
    og = ""
    hero = hero_image()
    if hero:
        og = f'<meta property="og:image" content="{SITE}images/{quote(hero)}">'
    return f"""<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{desc}">{og}
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-12 -12 24 24'%3E%3Cg fill='none' stroke='%2361dafb' stroke-width='1.6'%3E%3Cellipse rx='10' ry='4'/%3E%3Cellipse rx='10' ry='4' transform='rotate(60)'/%3E%3Cellipse rx='10' ry='4' transform='rotate(120)'/%3E%3C/g%3E%3Ccircle r='2' fill='%2361dafb'/%3E%3C/svg%3E">
{KAKAO}
<style>{CSS}</style></head><body>
<header class="top"><div class="in">
<a class="logo" href="{rel}index.html">React + <b>{SERVER}</b></a><span class="sp"></span>
<a class="btn hide-s" href="{rel}basic/ch00.html">기초</a>
<a class="btn hide-s" href="{rel}advanced/ch00.html">심화</a>
<a class="btn" href="{rel}index.html#pdf">PDF</a>
<a class="btn" href="https://github.com/{REPO}" target="_blank">GitHub</a>
</div></header>
{body}
{SCRIPT if code else ""}
</body></html>"""


def hero_image():
    """첫 화면 그림: 심화 마지막 장(로그인 게시판)의 실행 화면"""
    for c in ("advanced", "basic"):
        for ch in reversed(chapters(c)):
            if ch["thumb"] and not ch["thumb"].startswith("fig_") and ch["name"].startswith("ch"):
                return ch["thumb"]
    return None


# ------------------------------------------------------------------ 장별 화면
def build_course(course):
    label, _pdf = COURSES[course]
    other = "advanced" if course == "basic" else "basic"
    chs = chapters(course)
    for i, ch in enumerate(chs):
        side = f'<div class="cap">{label}</div>' + "".join(
            f'<a href="{c["name"]}.html"{" class=on" if c is ch else ""}>{html.escape(c["menu"])}</a>' for c in chs)
        side += f'<div class="other"><a href="../{other}/ch00.html">→ {COURSES[other][0]}</a></div>'
        jump = "".join(f'<option value="{c["name"]}.html"{" selected" if c is ch else ""}>{html.escape(c["menu"])}</option>'
                       for c in chs)
        prev = chs[i - 1] if i > 0 else None
        nxt = chs[i + 1] if i + 1 < len(chs) else None
        pager = '<nav class="pager">'
        pager += f'<a href="{prev["name"]}.html"><small>← 이전</small>{html.escape(prev["menu"])}</a>' if prev else "<span></span>"
        pager += (f'<a class="next" href="{nxt["name"]}.html"><small>다음 →</small>{html.escape(nxt["menu"])}</a>' if nxt
                  else f'<a class="next" href="../{other}/ch00.html"><small>다른 과정 →</small>{COURSES[other][0]}</a>')
        pager += "</nav>"
        body = f"""<div class="doc">
<nav class="side">{side}</nav>
<article>
<select class="jump" onchange="location.href=this.value" aria-label="장 이동">{jump}</select>
{to_html(ch["md"])}
{pager}
</article></div>
<footer>{html.escape(TITLE)} · {label} · 강사 김대철 · <a href="https://github.com/{REPO}">GitHub</a></footer>"""
        (DOCS / course / f"{ch['name']}.html").write_text(
            page(f"{ch['title']} - {label}", body, "../", code=True), encoding="utf-8")
    print(f"  {course}: {len(chs)}개 장")


# ------------------------------------------------------------------ 첫 화면
def build_index():
    cols = ""
    for course, (label, pdf) in COURSES.items():
        items = ""
        for c in chapters(course):
            img = (f'<img src="images/{quote(c["thumb"])}" alt="" loading="lazy">' if c["thumb"]
                   else '<span class="noimg"></span>')
            items += f'<li><a href="{course}/{c["name"]}.html">{img}<span>{html.escape(c["menu"])}</span></a></li>'
        cols += (f'<div><h3>{label}</h3><a class="pdf" href="{quote(pdf)}" target="_blank">PDF 교안 열기</a>'
                 f'<ol>{items}</ol></div>')
    folders = "".join(f'<a href="{TREE}{quote(p)}" target="_blank"><b>{html.escape(p)}/</b><small>{html.escape(d)}</small></a>'
                      for p, d in readme_folders())
    pdfs = "".join(f'<a href="{quote(pdf)}" target="_blank"><b>{html.escape(pdf)}</b><small>{label} 전체 (인쇄용)</small></a>'
                   for label, pdf in COURSES.values())
    hero = hero_image()
    intro = markdown.markdown(INTRO)
    twin = (f'<p class="twin">같은 과정의 서버를 <b>{TWIN[1]}</b> 로 만든 판도 있습니다 → '
            f'<a href="https://{OWNER}.github.io/{TWIN[0]}/">{TWIN[0]}</a></p>')
    body = f"""<div class="hero"><div class="wrap">
<h1>{html.escape(TITLE).replace(SERVER, f"<b>{SERVER}</b>")}</h1>
{intro}
<div class="cta">
<a class="main" href="basic/ch00.html">1단계 기초 시작 →</a>
<a class="sub" href="advanced/ch00.html">2단계 심화</a>
<a class="sub" href="{ZIP}">실습 코드 전체 받기 (ZIP)</a>
</div>
{twin}
</div></div>
<div class="wrap">
<section><h2>두 단계 과정</h2><p class="lead">하나의 게시판을 기초에서 만들고, 심화에서 Router · Context · 로그인을 더해 키워 갑니다.</p>
{readme_table()}
{f'<figure><img src="images/{quote(hero)}" alt="심화 과정에서 완성하는 로그인 게시판" loading="lazy"><figcaption>심화 과정에서 완성하는 로그인 게시판</figcaption></figure>' if hero else ""}
</section>
<section id="chapters"><h2>과정 목차</h2><p class="lead">각 장은 개념 → 따라 하기 → 실행 결과 → 확인 문제 순서입니다. 답은 부록 C 에 있습니다.</p>
<div class="course">{cols}</div></section>
<section id="code"><h2>실습 코드 폴더</h2><p class="lead">장마다 완성본이 들어 있습니다. 막히면 같은 장의 폴더와 비교해 보세요.
한 번에 받으려면 <a href="{ZIP}">전체 ZIP</a> 이 편합니다.</p>
<div class="dl">{folders}</div></section>
<section id="pdf"><h2>PDF 교안</h2><p class="lead">웹 교안과 같은 내용입니다. 인쇄하거나 내려받아 볼 때 쓰세요.</p>
<div class="dl">{pdfs}</div></section>
</div>
<footer>강사 김대철 · <a href="https://github.com/{REPO}">GitHub 저장소</a></footer>"""
    (DOCS / "index.html").write_text(page(f"{TITLE} 학습 교안", body), encoding="utf-8")
    print("  첫 화면: index.html")


if __name__ == "__main__":
    for course in COURSES:
        build_course(course)
    build_index()
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")    # Jekyll 변환 끄기 (파일을 있는 그대로 공개)

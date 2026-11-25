"""annotate.py - 교안 화면 캡처에 "여기를 보세요" 분홍 상자를 그린다.

    python tools/annotate.py            # tools/annot_base/*.jpg (상자 없는 원본) → docs/images/*.jpg (상자 그린 것)
    python tools/annotate.py --sheet    # 확인용으로 모든 결과를 한 장씩 모은 미리보기도 만든다

원본(annot_base)은 고치지 않는다. 상자 위치를 바꾸려면 아래 BOXES 의 좌표만 고치고 다시 실행한다.
좌표는 원본 그림의 픽셀 (왼쪽, 위, 오른쪽, 아래).
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "tools" / "annot_base"
OUT = ROOT / "docs" / "images"
PINK = (255, 32, 140)

# 그림 → 강조할 상자 목록 (좌표는 원본 그림의 픽셀)
BOXES = {'a8_docs.png': [(1074, 354, 1276, 404), (1196, 606, 1226, 1166)],
 'a9_detail_other.png': [(1204, 467, 1296, 523)],
 'a9_detail_owner.png': [(1108, 468, 1296, 524)],
 'a9_login_error.png': [(388, 288, 966, 356)],
 'b1_vite_default.png': [(585, 515, 762, 568)],
 'b8_fetch_error.png': [(181, 141, 306, 193), (34, 270, 662, 312)],
 'b9_docs.png': [(24, 808, 1276, 866)],
 'ij_a8_open.jpg': [(240, 148, 842, 176), (140, 44, 720, 76)],
 'ij_a8_run_log.jpg': [(618, 206, 1268, 232)],
 'ij_a8_tree.jpg': [(6, 4, 260, 28)],
 'ij_b9_app.jpg': [(122, 330, 242, 356), (474, 366, 500, 392)],
 'ij_b9_open.jpg': [(244, 146, 850, 174), (740, 485, 838, 518)],
 'ij_b9_run_log.jpg': [(618, 184, 1268, 232)],
 'ij_b9_run_menu.jpg': [(46, 40, 262, 66)],
 'ij_b9_tree.jpg': [(64, 186, 150, 236)],
 'ij_b9_trust.jpg': [(46, 98, 340, 124), (200, 150, 288, 176)],
 'ij_file_menu.jpg': [(32, 165, 270, 193)],
 'ij_home.jpg': [(242, 42, 335, 77)],
 'ij_home_list.jpg': [(16, 32, 347, 68)],
 'ij_run_toolbar.jpg': [(163, 5, 193, 35), (229, 5, 261, 35)],
 'ij_sdk_dropdown.jpg': [(72, 51, 444, 79), (72, 78, 244, 104)],
 'vs_explorer.jpg': [(26, 22, 118, 44)],
 'vs_file_menu.jpg': [(26, 87, 192, 102)],
 'vs_terminal_cmd.jpg': [(1323, 6, 1377, 32), (12, 88, 163, 114)],
 'vs_terminal_profiles.jpg': [(15, 96, 165, 122), (15, 239, 165, 266), (245, 308, 280, 334)],
 'vs_terminal_ps.jpg': [(12, 38, 182, 64), (1304, 54, 1555, 84)],
 'vs_view_menu.jpg': [(150, 330, 362, 354)]}


def draw(name, boxes):
    im = Image.open(BASE / name).convert("RGB")
    d = ImageDraw.Draw(im)
    # 선 굵기: PDF 에 줄어 들어갈 비율을 계산해서 종이 위에서 약 2.6pt 가 되게 한다
    #   (build_guide 의 그림 폭: 본문 폭의 86% = 약 424pt, 단 원래 크기 × 0.55pt 를 넘지 않음)
    shown = min(424, im.width * 0.55)
    w = max(3, round(2.6 * im.width / shown))
    for x0, y0, x1, y1 in boxes:
        # 작은 상자는 선을 가늘게 (글자를 덮지 않게), 그리고 상자 바깥쪽으로 그린다
        bw = max(3, min(w, round(min(x1 - x0, y1 - y0) / 4)))
        g = bw // 2 + 2
        d.rounded_rectangle((x0 - g, y0 - g, x1 + g, y1 + g), radius=bw * 3, outline=PINK, width=bw)
    if name.endswith(".png"):
        im.save(OUT / name)
    else:
        im.save(OUT / name, quality=92)
    return im


def main():
    made = []
    for name, boxes in BOXES.items():
        if not (BASE / name).exists():
            print("원본 없음:", name)
            continue
        made.append((name, draw(name, boxes)))
    print(f"상자 그림 {len(made)}장")
    if "--sheet" in sys.argv:   # 확인용 미리보기 (6장씩 한 장)
        sheet_dir = ROOT / "tools" / "annot_preview"
        sheet_dir.mkdir(exist_ok=True)
        for k in range(0, len(made), 6):
            group = made[k:k + 6]
            thumbs = []
            for name, im in group:
                t = im.copy()
                t.thumbnail((760, 420))
                thumbs.append(t)
            sheet = Image.new("RGB", (1540, 3 * 440), "white")
            for i, t in enumerate(thumbs):
                sheet.paste(t, ((i % 2) * 770, (i // 2) * 440))
            sheet.save(sheet_dir / f"sheet{k // 6}.jpg", quality=85)


if __name__ == "__main__":
    main()

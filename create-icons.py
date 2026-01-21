#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Nutri8 PWA Icon Generator
로그인 화면의 food-apple 아이콘과 동일한 스타일로 생성
"""

import sys
import io

# Windows 인코딩 문제 해결
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("PIL/Pillow가 설치되지 않았습니다!")
    print("설치 명령어: pip install Pillow")
    exit(1)

# 아이콘 색상 (로그인 화면과 동일)
BG_COLOR = "#4CAF50"  # 녹색 배경
ICON_COLOR = "#FFFFFF"  # 흰색 아이콘

def create_apple_icon(size):
    """사과 아이콘 생성"""
    # 이미지 생성 (녹색 배경)
    img = Image.new('RGB', (size, size), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # 사과 그리기 (간단한 원형)
    padding = size * 0.25
    apple_size = size - (padding * 2)
    
    # 사과 본체 (큰 원)
    draw.ellipse(
        [padding, padding + size*0.05, padding + apple_size, padding + apple_size + size*0.05],
        fill=ICON_COLOR
    )
    
    # 사과 꼭지 (작은 사각형)
    stem_width = size * 0.08
    stem_height = size * 0.12
    stem_x = (size - stem_width) / 2
    stem_y = padding - stem_height * 0.3
    draw.rectangle(
        [stem_x, stem_y, stem_x + stem_width, stem_y + stem_height],
        fill=ICON_COLOR
    )
    
    # 사과 잎 (작은 타원)
    leaf_width = size * 0.15
    leaf_height = size * 0.08
    leaf_x = stem_x + stem_width
    leaf_y = stem_y
    draw.ellipse(
        [leaf_x, leaf_y, leaf_x + leaf_width, leaf_y + leaf_height],
        fill=ICON_COLOR
    )
    
    return img

def main():
    print("🍎 Nutri8 아이콘 생성 중...")
    print(f"🎨 색상: 배경={BG_COLOR}, 아이콘={ICON_COLOR}")
    
    # 디렉토리 생성
    os.makedirs("assets", exist_ok=True)
    os.makedirs("public", exist_ok=True)
    
    # 각 크기별 아이콘 생성
    icons = [
        ("assets/icon.png", 512),
        ("public/icon.png", 512),
        ("public/icon-192.png", 192),
        ("public/icon-512.png", 512),
        ("public/favicon.png", 32),
    ]
    
    for filepath, size in icons:
        print(f"📦 생성 중: {filepath} ({size}x{size})")
        icon = create_apple_icon(size)
        icon.save(filepath, "PNG")
        print(f"✅ 완료: {filepath}")
    
    print("\n🎉 모든 아이콘 생성 완료!")
    print("\n📋 다음 단계:")
    print("1. npm start (앱 재시작)")
    print("2. npx expo export --platform web (웹 빌드)")
    print("3. git add . && git commit -m '🍎 아이콘 업데이트' && git push")
    print("4. Vercel 자동 배포 대기 (1-2분)")
    print("5. 홈 화면에서 기존 Nutri8 앱 삭제")
    print("6. 웹사이트 재접속 → 홈 화면에 추가")

if __name__ == "__main__":
    main()

-- 🔧 잘못된 이미지 수정 및 올바른 이미지 매핑
-- Supabase SQL Editor에서 실행하세요

-- ============================================
-- 🔄 1단계: 기존 자동 추가된 이미지 모두 제거
-- ============================================

UPDATE meals SET photo_url = NULL;

-- ============================================
-- 📸 2단계: 정확한 음식별 이미지 매핑
-- ============================================

-- === 한식 ===

-- 짜장면 (정확히!)
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&q=80'
WHERE food_name LIKE '%짜장%' AND photo_url IS NULL;

-- 짬뽕
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80'
WHERE food_name LIKE '%짬뽕%' AND photo_url IS NULL;

-- 김치찌개
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80'
WHERE food_name = '김치찌개' AND photo_url IS NULL;

-- 된장찌개
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&q=80'
WHERE food_name LIKE '%된장찌개%' AND photo_url IS NULL;

-- 차돌된장찌개
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&q=80'
WHERE food_name = '차돌된장찌개' AND photo_url IS NULL;

-- 비빔밥
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80'
WHERE food_name = '비빔밥' AND photo_url IS NULL;

-- 불고기
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80'
WHERE food_name = '불고기' AND photo_url IS NULL;

-- 삼겹살
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606479794875-d6257089cebe?w=400&q=80'
WHERE food_name = '삼겹살' AND photo_url IS NULL;

-- 갈비
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80'
WHERE food_name LIKE '%갈비%' AND photo_url IS NULL;

-- 떡볶이
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80'
WHERE food_name = '떡볶이' AND photo_url IS NULL;

-- 김밥
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80'
WHERE food_name = '김밥' AND photo_url IS NULL;

-- 라면
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
WHERE food_name = '라면' AND photo_url IS NULL;

-- 우동
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&q=80'
WHERE food_name = '우동' AND photo_url IS NULL;

-- 만두
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80'
WHERE food_name = '만두' AND photo_url IS NULL;

-- === 양식 ===

-- 치킨
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'
WHERE food_name = '치킨' AND photo_url IS NULL;

-- 피자
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
WHERE food_name = '피자' AND photo_url IS NULL;

-- 햄버거
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
WHERE food_name = '햄버거' AND photo_url IS NULL;

-- 파스타
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80'
WHERE food_name = '파스타' AND photo_url IS NULL;

-- 스테이크
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80'
WHERE food_name = '스테이크' AND photo_url IS NULL;

-- === 일식 ===

-- 초밥/스시
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80'
WHERE (food_name LIKE '%초밥%' OR food_name LIKE '%스시%') AND photo_url IS NULL;

-- 돈까스
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1623679448552-12f2f21b49ca?w=400&q=80'
WHERE food_name = '돈까스' AND photo_url IS NULL;

-- 카레
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80'
WHERE food_name = '카레' AND photo_url IS NULL;

-- === 샐러드/건강식 ===

-- 샐러드
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
WHERE food_name = '샐러드' AND photo_url IS NULL;

-- 연어
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80'
WHERE food_name LIKE '%연어%' AND photo_url IS NULL;

-- === 디저트/간식 ===

-- 아이스크림 (정확히!)
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80'
WHERE food_name = '아이스크림' AND photo_url IS NULL;

-- 케이크
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80'
WHERE food_name = '케이크' AND photo_url IS NULL;

-- 쿠키
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80'
WHERE food_name = '쿠키' AND photo_url IS NULL;

-- === 과일 ===

-- 바나나
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80'
WHERE food_name = '바나나' AND photo_url IS NULL;

-- 사과
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80'
WHERE food_name = '사과' AND photo_url IS NULL;

-- === 빵/베이커리 ===

-- 샌드위치
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
WHERE food_name = '샌드위치' AND photo_url IS NULL;

-- 빵
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80'
WHERE food_name = '빵' AND photo_url IS NULL;

-- === 음료 ===

-- 커피
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'
WHERE food_name = '커피' AND photo_url IS NULL;

-- 요거트
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
WHERE food_name = '요거트' AND photo_url IS NULL;

-- ============================================
-- 🌟 3단계: 나머지에 일반 음식 이미지
-- ============================================

-- 아직 이미지가 없는 모든 음식에 일반 음식 이미지 추가
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'
WHERE photo_url IS NULL;

-- ============================================
-- 📊 4단계: 결과 확인
-- ============================================

-- 전체 통계
SELECT 
  COUNT(*) as total_meals,
  COUNT(photo_url) as with_images,
  ROUND(COUNT(photo_url) * 100.0 / COUNT(*), 1) as percentage
FROM meals;

-- 음식별 이미지 샘플 (상위 30개)
SELECT 
  food_name,
  COUNT(*) as count,
  MIN(photo_url) as image_url
FROM meals
GROUP BY food_name
ORDER BY count DESC
LIMIT 30;

-- 이미지가 없는 음식 (있으면 안 됨!)
SELECT COUNT(*) as no_image_count FROM meals WHERE photo_url IS NULL;

-- 기존 식사 데이터에 음식 이미지 URL 추가
-- Supabase SQL Editor에서 실행하세요

-- 📸 무료 Unsplash 이미지 사용 (저작권 문제 없음)

-- 차돌된장찌개
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&q=80'
WHERE food_name = '차돌된장찌개' AND photo_url IS NULL;

-- 샐러드
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
WHERE food_name = '샐러드' AND photo_url IS NULL;

-- 연어구이
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80'
WHERE food_name = '연어구이' AND photo_url IS NULL;

-- 바나나
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80'
WHERE food_name = '바나나' AND photo_url IS NULL;

-- 김치찌개
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400&q=80'
WHERE food_name LIKE '%김치찌개%' AND photo_url IS NULL;

-- 불고기
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80'
WHERE food_name LIKE '%불고기%' AND photo_url IS NULL;

-- 삼겹살
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1606479794875-d6257089cebe?w=400&q=80'
WHERE food_name LIKE '%삼겹살%' AND photo_url IS NULL;

-- 비빔밥
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80'
WHERE food_name LIKE '%비빔밥%' AND photo_url IS NULL;

-- 떡볶이
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80'
WHERE food_name LIKE '%떡볶이%' AND photo_url IS NULL;

-- 김밥
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&q=80'
WHERE food_name LIKE '%김밥%' AND photo_url IS NULL;

-- 치킨
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'
WHERE food_name LIKE '%치킨%' AND photo_url IS NULL;

-- 피자
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
WHERE food_name LIKE '%피자%' AND photo_url IS NULL;

-- 햄버거
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
WHERE food_name LIKE '%햄버거%' AND photo_url IS NULL;

-- 라면
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
WHERE food_name LIKE '%라면%' AND photo_url IS NULL;

-- 파스타
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80'
WHERE food_name LIKE '%파스타%' AND photo_url IS NULL;

-- 스테이크
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80'
WHERE food_name LIKE '%스테이크%' AND photo_url IS NULL;

-- 초밥/스시
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80'
WHERE (food_name LIKE '%초밥%' OR food_name LIKE '%스시%') AND photo_url IS NULL;

-- 카레
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80'
WHERE food_name LIKE '%카레%' AND photo_url IS NULL;

-- 돈까스
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1623679448552-12f2f21b49ca?w=400&q=80'
WHERE food_name LIKE '%돈까스%' AND photo_url IS NULL;

-- 우동
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&q=80'
WHERE food_name LIKE '%우동%' AND photo_url IS NULL;

-- 🔍 업데이트된 행 수 확인
SELECT 
  COUNT(*) as total_with_images,
  COUNT(*) FILTER (WHERE photo_url IS NOT NULL) as with_photo
FROM meals;

-- 📊 음식별 이미지 현황
SELECT 
  food_name,
  COUNT(*) as count,
  COUNT(photo_url) as images_count
FROM meals
GROUP BY food_name
ORDER BY count DESC
LIMIT 20;

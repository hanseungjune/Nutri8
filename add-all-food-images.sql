-- 🍽️ 모든 음식에 이미지 추가 (포괄적 버전)
-- Supabase SQL Editor에서 실행하세요

-- ============================================
-- 📸 한국 음식 (무료 Unsplash 이미지)
-- ============================================

-- 찌개류
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&q=80'
WHERE (food_name LIKE '%찌개%' OR food_name LIKE '%찜%') AND photo_url IS NULL;

-- 밥류 (비빔밥, 볶음밥 등)
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80'
WHERE (food_name LIKE '%밥%' AND food_name NOT LIKE '%김밥%') AND photo_url IS NULL;

-- 김밥
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80'
WHERE food_name LIKE '%김밥%' AND photo_url IS NULL;

-- 면류 (라면, 우동, 파스타 등)
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
WHERE (food_name LIKE '%면%' OR food_name LIKE '%라면%' OR food_name LIKE '%우동%' OR food_name LIKE '%국수%') AND photo_url IS NULL;

-- 고기류 (불고기, 삼겹살, 스테이크 등)
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1606479794875-d6257089cebe?w=400&q=80'
WHERE (food_name LIKE '%고기%' OR food_name LIKE '%삼겹살%' OR food_name LIKE '%스테이크%' OR food_name LIKE '%갈비%') AND photo_url IS NULL;

-- 치킨
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'
WHERE food_name LIKE '%치킨%' AND photo_url IS NULL;

-- 피자
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
WHERE food_name LIKE '%피자%' AND photo_url IS NULL;

-- 햄버거
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
WHERE food_name LIKE '%햄버거%' AND photo_url IS NULL;

-- 샐러드
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
WHERE food_name LIKE '%샐러드%' AND photo_url IS NULL;

-- 생선/해산물
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80'
WHERE (food_name LIKE '%연어%' OR food_name LIKE '%생선%' OR food_name LIKE '%회%' OR food_name LIKE '%초밥%') AND photo_url IS NULL;

-- 떡볶이
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80'
WHERE food_name LIKE '%떡볶이%' AND photo_url IS NULL;

-- 만두
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80'
WHERE food_name LIKE '%만두%' AND photo_url IS NULL;

-- 과일
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80'
WHERE (food_name LIKE '%과일%' OR food_name LIKE '%바나나%' OR food_name LIKE '%사과%' OR food_name LIKE '%포도%') AND photo_url IS NULL;

-- 빵/베이커리
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80'
WHERE (food_name LIKE '%빵%' OR food_name LIKE '%크로아상%' OR food_name LIKE '%베이글%') AND photo_url IS NULL;

-- 샌드위치
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
WHERE food_name LIKE '%샌드위치%' AND photo_url IS NULL;

-- 커피/음료
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'
WHERE (food_name LIKE '%커피%' OR food_name LIKE '%라떼%' OR food_name LIKE '%음료%') AND photo_url IS NULL;

-- 디저트/케이크
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80'
WHERE (food_name LIKE '%케이크%' OR food_name LIKE '%디저트%' OR food_name LIKE '%아이스크림%') AND photo_url IS NULL;

-- 요거트
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
WHERE food_name LIKE '%요거트%' AND photo_url IS NULL;

-- 계란/달걀 요리
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&q=80'
WHERE (food_name LIKE '%계란%' OR food_name LIKE '%달걀%' OR food_name LIKE '%에그%') AND photo_url IS NULL;

-- 스프/수프
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80'
WHERE (food_name LIKE '%스프%' OR food_name LIKE '%수프%' OR food_name LIKE '%국%') AND photo_url IS NULL;

-- ============================================
-- 🌟 나머지 모든 음식에 기본 이미지 적용
-- ============================================

-- 아직 이미지가 없는 모든 음식에 일반 음식 이미지 추가
UPDATE meals SET photo_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'
WHERE photo_url IS NULL;

-- ============================================
-- 📊 결과 확인
-- ============================================

-- 전체 통계
SELECT 
  COUNT(*) as total_meals,
  COUNT(photo_url) as with_images,
  ROUND(COUNT(photo_url) * 100.0 / COUNT(*), 1) as percentage
FROM meals;

-- 음식별 현황 (상위 30개)
SELECT 
  food_name,
  COUNT(*) as total,
  COUNT(photo_url) as with_images
FROM meals
GROUP BY food_name
ORDER BY total DESC
LIMIT 30;

-- 이미지가 없는 음식 (있으면 안 됨!)
SELECT DISTINCT food_name
FROM meals
WHERE photo_url IS NULL
ORDER BY food_name;

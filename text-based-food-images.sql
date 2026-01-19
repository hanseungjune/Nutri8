-- 🎯 음식 이름 기반 텍스트 이미지
-- DummyImage 서비스 사용 (실제 작동 보장!)
-- Supabase SQL Editor에서 실행하세요

-- 모든 음식에 음식 이름이 텍스트로 표시되는 이미지 추가
UPDATE meals 
SET photo_url = 'https://dummyimage.com/400x300/4CAF50/ffffff&text=' || 
                REPLACE(food_name, ' ', '+')
WHERE photo_url IS NULL OR photo_url = '';

-- 결과 확인
SELECT 
  food_name,
  photo_url,
  COUNT(*) as count
FROM meals
GROUP BY food_name, photo_url
ORDER BY count DESC
LIMIT 30;

-- 예시:
-- 짜장면 → https://dummyimage.com/400x300/4CAF50/ffffff&text=짜장면
-- 김치찌개 → https://dummyimage.com/400x300/4CAF50/ffffff&text=김치찌개

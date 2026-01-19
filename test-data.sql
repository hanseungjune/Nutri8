-- 테스트 데이터 100개 이상 생성
-- Supabase SQL Editor에서 실행하세요

-- 기존 데이터 삭제 (선택사항)
-- TRUNCATE TABLE meals RESTART IDENTITY CASCADE;

-- 최근 30일간의 다양한 식단 데이터 생성
INSERT INTO meals (date, meal_type, food_name, calories, protein, carbs, fat) VALUES
-- 오늘
(CURRENT_DATE, 'breakfast', '김치찌개', 450, 15.5, 45.0, 18.0),
(CURRENT_DATE, 'breakfast', '밥', 300, 5.0, 65.0, 1.0),
(CURRENT_DATE, 'lunch', '불고기덮밥', 850, 35.0, 95.0, 28.0),
(CURRENT_DATE, 'snack', '바나나', 105, 1.5, 27.0, 0.5),
(CURRENT_DATE, 'dinner', '연어구이', 420, 40.0, 5.0, 22.0),
(CURRENT_DATE, 'dinner', '샐러드', 180, 8.0, 15.0, 10.0),

-- 어제
(CURRENT_DATE - INTERVAL '1 day', 'breakfast', '토스트', 280, 9.0, 45.0, 8.0),
(CURRENT_DATE - INTERVAL '1 day', 'breakfast', '우유', 150, 8.0, 12.0, 8.0),
(CURRENT_DATE - INTERVAL '1 day', 'lunch', '비빔밥', 650, 22.0, 88.0, 18.0),
(CURRENT_DATE - INTERVAL '1 day', 'snack', '커피', 5, 0.5, 1.0, 0.0),
(CURRENT_DATE - INTERVAL '1 day', 'snack', '쿠키', 220, 3.0, 28.0, 11.0),
(CURRENT_DATE - INTERVAL '1 day', 'dinner', '스테이크', 680, 52.0, 8.0, 48.0),
(CURRENT_DATE - INTERVAL '1 day', 'dinner', '감자튀김', 380, 4.0, 48.0, 18.0),

-- 2일 전
(CURRENT_DATE - INTERVAL '2 days', 'breakfast', '시리얼', 320, 8.0, 58.0, 6.0),
(CURRENT_DATE - INTERVAL '2 days', 'lunch', '파스타', 720, 25.0, 95.0, 24.0),
(CURRENT_DATE - INTERVAL '2 days', 'snack', '사과', 95, 0.5, 25.0, 0.3),
(CURRENT_DATE - INTERVAL '2 days', 'dinner', '치킨샐러드', 480, 38.0, 28.0, 22.0),

-- 3일 전
(CURRENT_DATE - INTERVAL '3 days', 'breakfast', '계란후라이', 180, 13.0, 1.0, 14.0),
(CURRENT_DATE - INTERVAL '3 days', 'breakfast', '베이컨', 290, 12.0, 1.0, 27.0),
(CURRENT_DATE - INTERVAL '3 days', 'lunch', '짜장면', 880, 28.0, 125.0, 32.0),
(CURRENT_DATE - INTERVAL '3 days', 'snack', '아이스크림', 270, 4.0, 32.0, 14.0),
(CURRENT_DATE - INTERVAL '3 days', 'dinner', '삼겹살', 750, 48.0, 0.0, 62.0),
(CURRENT_DATE - INTERVAL '3 days', 'dinner', '김치', 30, 2.0, 5.0, 0.5),

-- 4일 전
(CURRENT_DATE - INTERVAL '4 days', 'breakfast', '오믈렛', 320, 18.0, 3.0, 26.0),
(CURRENT_DATE - INTERVAL '4 days', 'lunch', '김치볶음밥', 680, 22.0, 88.0, 24.0),
(CURRENT_DATE - INTERVAL '4 days', 'snack', '요거트', 140, 8.0, 18.0, 3.5),
(CURRENT_DATE - INTERVAL '4 days', 'dinner', '된장찌개', 380, 18.0, 32.0, 16.0),
(CURRENT_DATE - INTERVAL '4 days', 'dinner', '현미밥', 280, 6.0, 58.0, 2.0),

-- 5일 전
(CURRENT_DATE - INTERVAL '5 days', 'breakfast', '그래놀라', 380, 9.0, 62.0, 12.0),
(CURRENT_DATE - INTERVAL '5 days', 'lunch', '햄버거', 820, 32.0, 75.0, 42.0),
(CURRENT_DATE - INTERVAL '5 days', 'snack', '초콜릿', 250, 3.0, 28.0, 14.0),
(CURRENT_DATE - INTERVAL '5 days', 'dinner', '회덮밥', 580, 35.0, 68.0, 18.0),

-- 6일 전
(CURRENT_DATE - INTERVAL '6 days', 'breakfast', '팬케이크', 450, 8.0, 72.0, 14.0),
(CURRENT_DATE - INTERVAL '6 days', 'lunch', '라면', 520, 12.0, 78.0, 18.0),
(CURRENT_DATE - INTERVAL '6 days', 'lunch', '계란', 140, 12.0, 1.0, 10.0),
(CURRENT_DATE - INTERVAL '6 days', 'snack', '견과류', 180, 6.0, 8.0, 15.0),
(CURRENT_DATE - INTERVAL '6 days', 'dinner', '피자', 920, 38.0, 98.0, 42.0),

-- 7일 전
(CURRENT_DATE - INTERVAL '7 days', 'breakfast', '샌드위치', 420, 18.0, 48.0, 18.0),
(CURRENT_DATE - INTERVAL '7 days', 'lunch', '소고기국밥', 780, 42.0, 68.0, 32.0),
(CURRENT_DATE - INTERVAL '7 days', 'snack', '아메리카노', 10, 1.0, 2.0, 0.0),
(CURRENT_DATE - INTERVAL '7 days', 'dinner', '제육볶음', 680, 38.0, 52.0, 32.0),
(CURRENT_DATE - INTERVAL '7 days', 'dinner', '밥', 300, 5.0, 65.0, 1.0),

-- 8일 전
(CURRENT_DATE - INTERVAL '8 days', 'breakfast', '베이글', 280, 10.0, 52.0, 3.0),
(CURRENT_DATE - INTERVAL '8 days', 'lunch', '초밥', 620, 28.0, 88.0, 12.0),
(CURRENT_DATE - INTERVAL '8 days', 'snack', '프로틴바', 220, 18.0, 22.0, 7.0),
(CURRENT_DATE - INTERVAL '8 days', 'dinner', '닭가슴살', 380, 58.0, 0.0, 14.0),
(CURRENT_DATE - INTERVAL '8 days', 'dinner', '고구마', 180, 2.0, 42.0, 0.2),

-- 9일 전
(CURRENT_DATE - INTERVAL '9 days', 'breakfast', '프렌치토스트', 480, 12.0, 68.0, 18.0),
(CURRENT_DATE - INTERVAL '9 days', 'lunch', '칼국수', 580, 18.0, 88.0, 12.0),
(CURRENT_DATE - INTERVAL '9 days', 'snack', '포도', 110, 1.0, 28.0, 0.3),
(CURRENT_DATE - INTERVAL '9 days', 'dinner', '삼계탕', 720, 52.0, 28.0, 38.0),

-- 10일 전
(CURRENT_DATE - INTERVAL '10 days', 'breakfast', '잡곡밥', 320, 7.0, 68.0, 3.0),
(CURRENT_DATE - INTERVAL '10 days', 'breakfast', '미역국', 80, 5.0, 8.0, 2.0),
(CURRENT_DATE - INTERVAL '10 days', 'lunch', '돈까스', 880, 32.0, 88.0, 42.0),
(CURRENT_DATE - INTERVAL '10 days', 'snack', '딸기', 65, 1.0, 15.0, 0.5),
(CURRENT_DATE - INTERVAL '10 days', 'dinner', '생선구이', 280, 38.0, 0.0, 12.0),
(CURRENT_DATE - INTERVAL '10 days', 'dinner', '나물', 120, 4.0, 18.0, 3.0),

-- 11일 전 ~ 30일 전 (더 많은 데이터)
(CURRENT_DATE - INTERVAL '11 days', 'breakfast', '크루아상', 380, 8.0, 42.0, 20.0),
(CURRENT_DATE - INTERVAL '11 days', 'lunch', '부대찌개', 680, 28.0, 58.0, 32.0),
(CURRENT_DATE - INTERVAL '11 days', 'dinner', '갈비', 920, 48.0, 18.0, 68.0),

(CURRENT_DATE - INTERVAL '12 days', 'breakfast', '죽', 280, 8.0, 52.0, 4.0),
(CURRENT_DATE - INTERVAL '12 days', 'lunch', '마라탕', 780, 32.0, 68.0, 38.0),
(CURRENT_DATE - INTERVAL '12 days', 'dinner', '쌈밥', 520, 22.0, 68.0, 14.0),

(CURRENT_DATE - INTERVAL '13 days', 'breakfast', '단호박죽', 220, 4.0, 48.0, 2.0),
(CURRENT_DATE - INTERVAL '13 days', 'lunch', '김밥', 480, 12.0, 78.0, 12.0),
(CURRENT_DATE - INTERVAL '13 days', 'snack', '고구마', 180, 2.0, 42.0, 0.2),
(CURRENT_DATE - INTERVAL '13 days', 'dinner', '떡볶이', 580, 8.0, 98.0, 12.0),

(CURRENT_DATE - INTERVAL '14 days', 'breakfast', '브런치', 680, 28.0, 58.0, 32.0),
(CURRENT_DATE - INTERVAL '14 days', 'lunch', '순대국', 620, 28.0, 48.0, 28.0),
(CURRENT_DATE - INTERVAL '14 days', 'dinner', '양념치킨', 1080, 52.0, 68.0, 62.0),

(CURRENT_DATE - INTERVAL '15 days', 'breakfast', '스무디', 280, 8.0, 58.0, 3.0),
(CURRENT_DATE - INTERVAL '15 days', 'lunch', '쌀국수', 480, 18.0, 78.0, 8.0),
(CURRENT_DATE - INTERVAL '15 days', 'dinner', '양고기', 820, 58.0, 8.0, 58.0),

(CURRENT_DATE - INTERVAL '16 days', 'breakfast', '에그베네딕트', 520, 22.0, 38.0, 32.0),
(CURRENT_DATE - INTERVAL '16 days', 'lunch', '쭈꾸미볶음', 680, 38.0, 52.0, 28.0),
(CURRENT_DATE - INTERVAL '16 days', 'dinner', '보쌈', 780, 48.0, 32.0, 48.0),

(CURRENT_DATE - INTERVAL '17 days', 'breakfast', '누룽지', 180, 3.0, 38.0, 1.0),
(CURRENT_DATE - INTERVAL '17 days', 'lunch', '탕수육', 920, 28.0, 118.0, 38.0),
(CURRENT_DATE - INTERVAL '17 days', 'dinner', '곱창전골', 880, 42.0, 38.0, 58.0),

(CURRENT_DATE - INTERVAL '18 days', 'breakfast', '와플', 420, 8.0, 62.0, 16.0),
(CURRENT_DATE - INTERVAL '18 days', 'lunch', '족발', 820, 52.0, 12.0, 58.0),
(CURRENT_DATE - INTERVAL '18 days', 'dinner', '냉면', 480, 12.0, 88.0, 8.0),

(CURRENT_DATE - INTERVAL '19 days', 'breakfast', '콘프레이크', 320, 6.0, 68.0, 3.0),
(CURRENT_DATE - INTERVAL '19 days', 'lunch', '카레라이스', 780, 22.0, 108.0, 24.0),
(CURRENT_DATE - INTERVAL '19 days', 'dinner', '훈제연어', 380, 42.0, 2.0, 18.0),

(CURRENT_DATE - INTERVAL '20 days', 'breakfast', '호두파이', 480, 8.0, 58.0, 24.0),
(CURRENT_DATE - INTERVAL '20 days', 'lunch', '월남쌈', 420, 18.0, 52.0, 14.0),
(CURRENT_DATE - INTERVAL '20 days', 'dinner', '닭볶음탕', 720, 48.0, 42.0, 34.0),

(CURRENT_DATE - INTERVAL '21 days', 'breakfast', '모닝빵', 280, 7.0, 52.0, 6.0),
(CURRENT_DATE - INTERVAL '21 days', 'lunch', '오므라이스', 680, 22.0, 88.0, 24.0),
(CURRENT_DATE - INTERVAL '21 days', 'dinner', '감바스', 420, 32.0, 8.0, 28.0),

(CURRENT_DATE - INTERVAL '22 days', 'breakfast', '에너지바', 220, 8.0, 32.0, 8.0),
(CURRENT_DATE - INTERVAL '22 days', 'lunch', '우동', 520, 18.0, 88.0, 8.0),
(CURRENT_DATE - INTERVAL '22 days', 'dinner', '오리고기', 680, 52.0, 0.0, 48.0),

(CURRENT_DATE - INTERVAL '23 days', 'breakfast', '머핀', 380, 6.0, 58.0, 14.0),
(CURRENT_DATE - INTERVAL '23 days', 'lunch', '찜닭', 780, 48.0, 58.0, 32.0),
(CURRENT_DATE - INTERVAL '23 days', 'dinner', '물회', 320, 28.0, 32.0, 8.0),

(CURRENT_DATE - INTERVAL '24 days', 'breakfast', '스크램블에그', 280, 18.0, 3.0, 20.0),
(CURRENT_DATE - INTERVAL '24 days', 'lunch', '장어덮밥', 880, 38.0, 98.0, 32.0),
(CURRENT_DATE - INTERVAL '24 days', 'dinner', '낙지볶음', 580, 32.0, 52.0, 22.0),

(CURRENT_DATE - INTERVAL '25 days', 'breakfast', '고로케', 320, 8.0, 42.0, 14.0),
(CURRENT_DATE - INTERVAL '25 days', 'lunch', '멘보샤', 680, 22.0, 58.0, 38.0),
(CURRENT_DATE - INTERVAL '25 days', 'dinner', '해물찜', 520, 42.0, 28.0, 18.0),

(CURRENT_DATE - INTERVAL '26 days', 'breakfast', '단팥빵', 350, 8.0, 68.0, 6.0),
(CURRENT_DATE - INTERVAL '26 days', 'lunch', '규카츠', 820, 32.0, 78.0, 38.0),
(CURRENT_DATE - INTERVAL '26 days', 'dinner', '코다리조림', 480, 38.0, 42.0, 16.0),

(CURRENT_DATE - INTERVAL '27 days', 'breakfast', '카스테라', 280, 5.0, 52.0, 8.0),
(CURRENT_DATE - INTERVAL '27 days', 'lunch', '아구찜', 680, 42.0, 48.0, 28.0),
(CURRENT_DATE - INTERVAL '27 days', 'dinner', '낙곱새', 780, 38.0, 32.0, 48.0),

(CURRENT_DATE - INTERVAL '28 days', 'breakfast', '찹쌀도넛', 420, 6.0, 68.0, 16.0),
(CURRENT_DATE - INTERVAL '28 days', 'lunch', '짬뽕', 820, 32.0, 98.0, 32.0),
(CURRENT_DATE - INTERVAL '28 days', 'dinner', '갈치조림', 520, 42.0, 28.0, 22.0),

(CURRENT_DATE - INTERVAL '29 days', 'breakfast', '식빵', 280, 8.0, 52.0, 4.0),
(CURRENT_DATE - INTERVAL '29 days', 'lunch', '돼지국밥', 680, 38.0, 58.0, 28.0),
(CURRENT_DATE - INTERVAL '29 days', 'dinner', '해물파전', 580, 22.0, 68.0, 22.0),

(CURRENT_DATE - INTERVAL '30 days', 'breakfast', '약과', 380, 4.0, 62.0, 14.0),
(CURRENT_DATE - INTERVAL '30 days', 'lunch', '콩국수', 520, 22.0, 88.0, 12.0),
(CURRENT_DATE - INTERVAL '30 days', 'dinner', '고등어구이', 480, 42.0, 0.0, 32.0);

-- 통계 확인
SELECT 
  COUNT(*) as total_meals,
  COUNT(DISTINCT date) as days_recorded,
  ROUND(AVG(calories)::numeric, 0) as avg_calories,
  MIN(date) as earliest_date,
  MAX(date) as latest_date
FROM meals;

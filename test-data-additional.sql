-- 추가 30일치 테스트 데이터 (31일 전 ~ 60일 전)
-- Supabase SQL Editor에서 실행하세요
-- 기존 데이터와 합쳐서 총 60일치 데이터가 됩니다!

INSERT INTO meals (date, meal_type, food_name, calories, protein, carbs, fat) VALUES
-- 31일 전
(CURRENT_DATE - INTERVAL '31 days', 'breakfast', '베이글크림치즈', 450, 12.0, 68.0, 14.0),
(CURRENT_DATE - INTERVAL '31 days', 'lunch', '새우볶음밥', 720, 28.0, 98.0, 22.0),
(CURRENT_DATE - INTERVAL '31 days', 'snack', '밀크쉐이크', 380, 8.0, 52.0, 16.0),
(CURRENT_DATE - INTERVAL '31 days', 'dinner', '갈비탕', 820, 52.0, 38.0, 48.0),

-- 32일 전
(CURRENT_DATE - INTERVAL '32 days', 'breakfast', '참치마요', 320, 18.0, 32.0, 14.0),
(CURRENT_DATE - INTERVAL '32 days', 'lunch', '김치찜', 480, 28.0, 42.0, 22.0),
(CURRENT_DATE - INTERVAL '32 days', 'snack', '녹차라떼', 220, 6.0, 38.0, 6.0),
(CURRENT_DATE - INTERVAL '32 days', 'dinner', '순두부찌개', 380, 22.0, 28.0, 18.0),
(CURRENT_DATE - INTERVAL '32 days', 'dinner', '공기밥', 300, 5.0, 65.0, 1.0),

-- 33일 전
(CURRENT_DATE - INTERVAL '33 days', 'breakfast', '크로플', 520, 8.0, 72.0, 22.0),
(CURRENT_DATE - INTERVAL '33 days', 'lunch', '돈코츠라멘', 880, 38.0, 108.0, 38.0),
(CURRENT_DATE - INTERVAL '33 days', 'snack', '팝콘', 180, 3.0, 28.0, 8.0),
(CURRENT_DATE - INTERVAL '33 days', 'dinner', '훈제오리', 620, 48.0, 8.0, 42.0),

-- 34일 전
(CURRENT_DATE - INTERVAL '34 days', 'breakfast', '곡물쉐이크', 280, 12.0, 48.0, 6.0),
(CURRENT_DATE - INTERVAL '34 days', 'lunch', '등심돈까스', 920, 42.0, 88.0, 46.0),
(CURRENT_DATE - INTERVAL '34 days', 'snack', '망고스무디', 240, 4.0, 52.0, 2.0),
(CURRENT_DATE - INTERVAL '34 days', 'dinner', '해물칼국수', 620, 32.0, 88.0, 14.0),

-- 35일 전
(CURRENT_DATE - INTERVAL '35 days', 'breakfast', '누텔라토스트', 480, 8.0, 68.0, 20.0),
(CURRENT_DATE - INTERVAL '35 days', 'lunch', '김치볶음밥', 680, 22.0, 88.0, 24.0),
(CURRENT_DATE - INTERVAL '35 days', 'lunch', '계란후라이', 140, 12.0, 1.0, 10.0),
(CURRENT_DATE - INTERVAL '35 days', 'snack', '치즈케이크', 420, 8.0, 42.0, 24.0),
(CURRENT_DATE - INTERVAL '35 days', 'dinner', '소갈비찜', 920, 58.0, 28.0, 62.0),

-- 36일 전
(CURRENT_DATE - INTERVAL '36 days', 'breakfast', '프렌치토스트', 520, 14.0, 72.0, 18.0),
(CURRENT_DATE - INTERVAL '36 days', 'lunch', '비빔국수', 580, 18.0, 88.0, 16.0),
(CURRENT_DATE - INTERVAL '36 days', 'snack', '마카롱', 180, 2.0, 22.0, 9.0),
(CURRENT_DATE - INTERVAL '36 days', 'dinner', '삼치구이', 420, 42.0, 0.0, 24.0),
(CURRENT_DATE - INTERVAL '36 days', 'dinner', '된장국', 80, 6.0, 8.0, 2.0),

-- 37일 전
(CURRENT_DATE - INTERVAL '37 days', 'breakfast', '리코타치즈샐러드', 380, 22.0, 12.0, 28.0),
(CURRENT_DATE - INTERVAL '37 days', 'lunch', '짬뽕밥', 820, 32.0, 98.0, 32.0),
(CURRENT_DATE - INTERVAL '37 days', 'snack', '타코야키', 320, 12.0, 38.0, 14.0),
(CURRENT_DATE - INTERVAL '37 days', 'dinner', '양념갈비', 880, 52.0, 42.0, 54.0),

-- 38일 전
(CURRENT_DATE - INTERVAL '38 days', 'breakfast', '딸기요거트', 280, 8.0, 48.0, 6.0),
(CURRENT_DATE - INTERVAL '38 days', 'lunch', '닭갈비', 780, 52.0, 58.0, 34.0),
(CURRENT_DATE - INTERVAL '38 days', 'snack', '츄러스', 420, 4.0, 58.0, 18.0),
(CURRENT_DATE - INTERVAL '38 days', 'dinner', '청국장', 320, 22.0, 28.0, 14.0),
(CURRENT_DATE - INTERVAL '38 days', 'dinner', '잡곡밥', 320, 7.0, 68.0, 3.0),

-- 39일 전
(CURRENT_DATE - INTERVAL '39 days', 'breakfast', '모닝빵세트', 520, 12.0, 78.0, 18.0),
(CURRENT_DATE - INTERVAL '39 days', 'lunch', '육회비빔밥', 720, 38.0, 78.0, 28.0),
(CURRENT_DATE - INTERVAL '39 days', 'snack', '에스프레소', 10, 1.0, 2.0, 0.0),
(CURRENT_DATE - INTERVAL '39 days', 'dinner', '연어스테이크', 580, 52.0, 8.0, 36.0),

-- 40일 전
(CURRENT_DATE - INTERVAL '40 days', 'breakfast', '단호박샐러드', 280, 8.0, 48.0, 8.0),
(CURRENT_DATE - INTERVAL '40 days', 'lunch', '낙지덮밥', 680, 32.0, 88.0, 18.0),
(CURRENT_DATE - INTERVAL '40 days', 'snack', '에그타르트', 280, 6.0, 32.0, 14.0),
(CURRENT_DATE - INTERVAL '40 days', 'dinner', '해물순두부', 420, 28.0, 32.0, 18.0),

-- 41일 전
(CURRENT_DATE - INTERVAL '41 days', 'breakfast', '치아바타샌드위치', 480, 22.0, 52.0, 20.0),
(CURRENT_DATE - INTERVAL '41 days', 'lunch', '간장게장', 620, 42.0, 28.0, 32.0),
(CURRENT_DATE - INTERVAL '41 days', 'lunch', '밥', 300, 5.0, 65.0, 1.0),
(CURRENT_DATE - INTERVAL '41 days', 'snack', '꿀떡', 320, 4.0, 68.0, 4.0),
(CURRENT_DATE - INTERVAL '41 days', 'dinner', '부대찌개', 720, 32.0, 62.0, 34.0),

-- 42일 전
(CURRENT_DATE - INTERVAL '42 days', 'breakfast', '그릭요거트', 220, 18.0, 22.0, 8.0),
(CURRENT_DATE - INTERVAL '42 days', 'lunch', '짜장면', 880, 28.0, 125.0, 32.0),
(CURRENT_DATE - INTERVAL '42 days', 'snack', '호두파이', 380, 6.0, 48.0, 18.0),
(CURRENT_DATE - INTERVAL '42 days', 'dinner', '쭈꾸미볶음', 580, 38.0, 48.0, 22.0),

-- 43일 전
(CURRENT_DATE - INTERVAL '43 days', 'breakfast', '아보카도토스트', 420, 12.0, 42.0, 24.0),
(CURRENT_DATE - INTERVAL '43 days', 'lunch', '등갈비찜', 820, 52.0, 38.0, 52.0),
(CURRENT_DATE - INTERVAL '43 days', 'snack', '초코칩쿠키', 280, 3.0, 38.0, 13.0),
(CURRENT_DATE - INTERVAL '43 days', 'dinner', '동태찌개', 380, 32.0, 22.0, 16.0),
(CURRENT_DATE - INTERVAL '43 days', 'dinner', '공기밥', 300, 5.0, 65.0, 1.0),

-- 44일 전
(CURRENT_DATE - INTERVAL '44 days', 'breakfast', '시나몬롤', 480, 8.0, 68.0, 20.0),
(CURRENT_DATE - INTERVAL '44 days', 'lunch', '해물짬뽕', 780, 32.0, 98.0, 28.0),
(CURRENT_DATE - INTERVAL '44 days', 'snack', '과일샐러드', 180, 2.0, 42.0, 2.0),
(CURRENT_DATE - INTERVAL '44 days', 'dinner', 'LA갈비', 920, 52.0, 28.0, 68.0),

-- 45일 전
(CURRENT_DATE - INTERVAL '45 days', 'breakfast', '브리오슈', 380, 8.0, 58.0, 14.0),
(CURRENT_DATE - INTERVAL '45 days', 'lunch', '제육덮밥', 780, 42.0, 88.0, 32.0),
(CURRENT_DATE - INTERVAL '45 days', 'snack', '카라멜마끼아또', 280, 8.0, 38.0, 10.0),
(CURRENT_DATE - INTERVAL '45 days', 'dinner', '갈치조림', 520, 42.0, 32.0, 24.0),

-- 46일 전
(CURRENT_DATE - INTERVAL '46 days', 'breakfast', '잉글리쉬머핀', 320, 10.0, 52.0, 8.0),
(CURRENT_DATE - INTERVAL '46 days', 'lunch', '매운짬뽕', 820, 32.0, 108.0, 32.0),
(CURRENT_DATE - INTERVAL '46 days', 'snack', '브라우니', 380, 4.0, 48.0, 18.0),
(CURRENT_DATE - INTERVAL '46 days', 'dinner', '닭도리탕', 680, 48.0, 42.0, 32.0),

-- 47일 전
(CURRENT_DATE - INTERVAL '47 days', 'breakfast', '허니버터칩', 280, 3.0, 38.0, 14.0),
(CURRENT_DATE - INTERVAL '47 days', 'lunch', '소고기무국', 520, 32.0, 42.0, 22.0),
(CURRENT_DATE - INTERVAL '47 days', 'lunch', '밥', 300, 5.0, 65.0, 1.0),
(CURRENT_DATE - INTERVAL '47 days', 'snack', '밀크티', 220, 4.0, 42.0, 6.0),
(CURRENT_DATE - INTERVAL '47 days', 'dinner', '훠궈', 880, 42.0, 68.0, 48.0),

-- 48일 전
(CURRENT_DATE - INTERVAL '48 days', 'breakfast', '뮤즐리', 320, 10.0, 58.0, 8.0),
(CURRENT_DATE - INTERVAL '48 days', 'lunch', '우삼겹덮밥', 820, 42.0, 88.0, 38.0),
(CURRENT_DATE - INTERVAL '48 days', 'snack', '버블티', 320, 2.0, 72.0, 4.0),
(CURRENT_DATE - INTERVAL '48 days', 'dinner', '갈비찜', 920, 58.0, 38.0, 62.0),

-- 49일 전
(CURRENT_DATE - INTERVAL '49 days', 'breakfast', '팬케이크', 450, 8.0, 72.0, 14.0),
(CURRENT_DATE - INTERVAL '49 days', 'lunch', '치즈돈까스', 980, 42.0, 98.0, 52.0),
(CURRENT_DATE - INTERVAL '49 days', 'snack', '사탕수수주스', 180, 1.0, 45.0, 0.0),
(CURRENT_DATE - INTERVAL '49 days', 'dinner', '닭발', 620, 38.0, 32.0, 38.0),

-- 50일 전
(CURRENT_DATE - INTERVAL '50 days', 'breakfast', '유부초밥', 380, 12.0, 68.0, 8.0),
(CURRENT_DATE - INTERVAL '50 days', 'lunch', '갈비탕', 820, 52.0, 38.0, 48.0),
(CURRENT_DATE - INTERVAL '50 days', 'snack', '약과', 380, 4.0, 62.0, 14.0),
(CURRENT_DATE - INTERVAL '50 days', 'dinner', '낙지볶음', 580, 32.0, 52.0, 22.0),

-- 51일 전
(CURRENT_DATE - INTERVAL '51 days', 'breakfast', '베이컨에그머핀', 520, 22.0, 42.0, 28.0),
(CURRENT_DATE - INTERVAL '51 days', 'lunch', '쌀국수', 480, 18.0, 78.0, 8.0),
(CURRENT_DATE - INTERVAL '51 days', 'snack', '군밤', 220, 3.0, 48.0, 2.0),
(CURRENT_DATE - INTERVAL '51 days', 'dinner', '황태구이', 380, 42.0, 0.0, 18.0),
(CURRENT_DATE - INTERVAL '51 days', 'dinner', '된장찌개', 180, 12.0, 18.0, 8.0),

-- 52일 전
(CURRENT_DATE - INTERVAL '52 days', 'breakfast', '카푸치노', 120, 6.0, 12.0, 6.0),
(CURRENT_DATE - INTERVAL '52 days', 'breakfast', '크루아상', 380, 8.0, 42.0, 20.0),
(CURRENT_DATE - INTERVAL '52 days', 'lunch', '족발', 820, 52.0, 12.0, 58.0),
(CURRENT_DATE - INTERVAL '52 days', 'snack', '견과류바', 280, 8.0, 28.0, 16.0),
(CURRENT_DATE - INTERVAL '52 days', 'dinner', '김치전', 420, 12.0, 52.0, 18.0),

-- 53일 전
(CURRENT_DATE - INTERVAL '53 days', 'breakfast', '계란죽', 280, 12.0, 42.0, 8.0),
(CURRENT_DATE - INTERVAL '53 days', 'lunch', '소불고기', 720, 48.0, 52.0, 32.0),
(CURRENT_DATE - INTERVAL '53 days', 'snack', '수박', 120, 1.0, 30.0, 0.3),
(CURRENT_DATE - INTERVAL '53 days', 'dinner', '멸치볶음', 180, 18.0, 12.0, 8.0),
(CURRENT_DATE - INTERVAL '53 days', 'dinner', '밥', 300, 5.0, 65.0, 1.0),

-- 54일 전
(CURRENT_DATE - INTERVAL '54 days', 'breakfast', '곡물빵', 280, 8.0, 52.0, 6.0),
(CURRENT_DATE - INTERVAL '54 days', 'lunch', '참치김밥', 520, 18.0, 78.0, 14.0),
(CURRENT_DATE - INTERVAL '54 days', 'snack', '팥빙수', 420, 6.0, 88.0, 4.0),
(CURRENT_DATE - INTERVAL '54 days', 'dinner', '꽁치조림', 480, 38.0, 28.0, 26.0),

-- 55일 전
(CURRENT_DATE - INTERVAL '55 days', 'breakfast', '소시지야채볶음', 420, 18.0, 32.0, 24.0),
(CURRENT_DATE - INTERVAL '55 days', 'lunch', '냉면', 480, 12.0, 88.0, 8.0),
(CURRENT_DATE - INTERVAL '55 days', 'snack', '아이스아메리카노', 10, 1.0, 2.0, 0.0),
(CURRENT_DATE - INTERVAL '55 days', 'dinner', '제육볶음', 680, 38.0, 52.0, 32.0),
(CURRENT_DATE - INTERVAL '55 days', 'dinner', '계란찜', 120, 10.0, 2.0, 8.0),

-- 56일 전
(CURRENT_DATE - INTERVAL '56 days', 'breakfast', '호떡', 380, 4.0, 68.0, 12.0),
(CURRENT_DATE - INTERVAL '56 days', 'lunch', '순대국밥', 620, 28.0, 48.0, 28.0),
(CURRENT_DATE - INTERVAL '56 days', 'snack', '고구마맛탕', 320, 2.0, 68.0, 6.0),
(CURRENT_DATE - INTERVAL '56 days', 'dinner', '대구탕', 420, 38.0, 22.0, 18.0),

-- 57일 전
(CURRENT_DATE - INTERVAL '57 days', 'breakfast', '토마토계란볶음', 280, 14.0, 18.0, 16.0),
(CURRENT_DATE - INTERVAL '57 days', 'lunch', '마파두부덮밥', 720, 28.0, 98.0, 24.0),
(CURRENT_DATE - INTERVAL '57 days', 'snack', '젤라또', 220, 4.0, 38.0, 8.0),
(CURRENT_DATE - INTERVAL '57 days', 'dinner', '꽃게찜', 520, 42.0, 28.0, 22.0),

-- 58일 전
(CURRENT_DATE - INTERVAL '58 days', 'breakfast', '연어크림치즈베이글', 520, 22.0, 58.0, 22.0),
(CURRENT_DATE - INTERVAL '58 days', 'lunch', '양장피', 680, 28.0, 78.0, 28.0),
(CURRENT_DATE - INTERVAL '58 days', 'snack', '쑥떡', 280, 4.0, 58.0, 4.0),
(CURRENT_DATE - INTERVAL '58 days', 'dinner', '황태채볶음', 320, 28.0, 32.0, 12.0),
(CURRENT_DATE - INTERVAL '58 days', 'dinner', '김치', 30, 2.0, 5.0, 0.5),

-- 59일 전
(CURRENT_DATE - INTERVAL '59 days', 'breakfast', '단팥죽', 320, 8.0, 68.0, 2.0),
(CURRENT_DATE - INTERVAL '59 days', 'lunch', '물냉면', 420, 12.0, 78.0, 6.0),
(CURRENT_DATE - INTERVAL '59 days', 'lunch', '만두', 320, 12.0, 42.0, 12.0),
(CURRENT_DATE - INTERVAL '59 days', 'snack', '수정과', 180, 0.0, 45.0, 0.0),
(CURRENT_DATE - INTERVAL '59 days', 'dinner', '김치찌개', 420, 22.0, 32.0, 20.0),

-- 60일 전
(CURRENT_DATE - INTERVAL '60 days', 'breakfast', '모닝빵', 280, 7.0, 52.0, 6.0),
(CURRENT_DATE - INTERVAL '60 days', 'lunch', '돼지국밥', 680, 38.0, 58.0, 28.0),
(CURRENT_DATE - INTERVAL '60 days', 'snack', '군고구마', 180, 2.0, 42.0, 0.2),
(CURRENT_DATE - INTERVAL '60 days', 'dinner', '삼치구이', 480, 42.0, 0.0, 32.0),
(CURRENT_DATE - INTERVAL '60 days', 'dinner', '시금치나물', 80, 3.0, 8.0, 3.0);

-- 통계 확인
SELECT 
  COUNT(*) as total_meals,
  COUNT(DISTINCT date) as days_recorded,
  ROUND(AVG(calories)::numeric, 0) as avg_calories,
  MIN(date) as earliest_date,
  MAX(date) as latest_date
FROM meals;

-- 날짜별 식단 개수 확인
SELECT 
  date,
  COUNT(*) as meal_count,
  SUM(calories) as daily_calories
FROM meals
GROUP BY date
ORDER BY date DESC
LIMIT 10;

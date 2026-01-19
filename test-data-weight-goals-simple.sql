-- 간단한 버전: 체중 변화 및 목표 설정 테스트 데이터
-- Supabase SQL Editor에서 실행하세요 (초보자용)

-- 1. 목표 설정 (체중 감량 목표)
INSERT INTO goals (target_weight, target_calories, start_date, end_date) VALUES
(65.0, 1800, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '30 days');

-- 2. 최근 30일 체중 기록 (72kg → 68kg 점진적 감소)
INSERT INTO weight_records (date, weight) VALUES
(CURRENT_DATE - INTERVAL '30 days', 72.0),
(CURRENT_DATE - INTERVAL '28 days', 71.8),
(CURRENT_DATE - INTERVAL '26 days', 71.5),
(CURRENT_DATE - INTERVAL '24 days', 71.2),
(CURRENT_DATE - INTERVAL '22 days', 71.0),
(CURRENT_DATE - INTERVAL '20 days', 70.7),
(CURRENT_DATE - INTERVAL '18 days', 70.5),
(CURRENT_DATE - INTERVAL '16 days', 70.2),
(CURRENT_DATE - INTERVAL '14 days', 70.0),
(CURRENT_DATE - INTERVAL '12 days', 69.7),
(CURRENT_DATE - INTERVAL '10 days', 69.5),
(CURRENT_DATE - INTERVAL '8 days', 69.2),
(CURRENT_DATE - INTERVAL '6 days', 69.0),
(CURRENT_DATE - INTERVAL '4 days', 68.7),
(CURRENT_DATE - INTERVAL '2 days', 68.3),
(CURRENT_DATE, 68.0);

-- 3. 확인 (테이블별 레코드 수)
SELECT 'goals' as table_name, COUNT(*) as count FROM goals
UNION ALL
SELECT 'weight_records', COUNT(*) FROM weight_records;

-- 4. 결과 확인 (현재 상태)
(SELECT 
  '현재 체중' as label, 
  weight::text || ' kg' as value 
FROM weight_records 
ORDER BY date DESC 
LIMIT 1)
UNION ALL
(SELECT 
  '목표 체중' as label, 
  target_weight::text || ' kg' as value
FROM goals 
ORDER BY created_at DESC 
LIMIT 1)
UNION ALL
(SELECT 
  '목표 칼로리' as label, 
  target_calories::text || ' kcal' as value
FROM goals 
ORDER BY created_at DESC 
LIMIT 1);

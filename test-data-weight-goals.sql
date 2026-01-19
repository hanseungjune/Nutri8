-- 체중 변화 추이 및 목표 설정 테스트 데이터
-- Supabase SQL Editor에서 실행하세요

-- ==============================================
-- 1. 목표 설정 테스트 데이터 (goals 테이블)
-- ==============================================

-- 기존 목표 삭제 (테스트용)
-- DELETE FROM goals;

-- 현재 활성화된 목표 (체중 감량 목표)
INSERT INTO goals (target_weight, target_calories, start_date, end_date) VALUES
(65.0, 1800, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '30 days');

-- 과거 목표 기록 (이미 종료된 목표)
INSERT INTO goals (target_weight, target_calories, start_date, end_date) VALUES
(70.0, 2000, CURRENT_DATE - INTERVAL '150 days', CURRENT_DATE - INTERVAL '61 days');

-- ==============================================
-- 2. 체중 변화 추이 테스트 데이터 (weight_records 테이블)
-- ==============================================

-- 기존 체중 기록 삭제 (테스트용)
-- DELETE FROM weight_records;

-- 60일간의 체중 변화 데이터 (72kg → 68kg로 점진적 감소)
-- 초기 체중: 72kg, 목표: 65kg, 현재: 68kg (4kg 감량 성공!)

INSERT INTO weight_records (date, weight) VALUES
-- 60일 전 ~ 50일 전 (72kg → 71kg)
(CURRENT_DATE - INTERVAL '60 days', 72.0),
(CURRENT_DATE - INTERVAL '58 days', 71.8),
(CURRENT_DATE - INTERVAL '56 days', 71.6),
(CURRENT_DATE - INTERVAL '54 days', 71.5),
(CURRENT_DATE - INTERVAL '52 days', 71.3),
(CURRENT_DATE - INTERVAL '50 days', 71.0),

-- 49일 전 ~ 40일 전 (71kg → 70kg)
(CURRENT_DATE - INTERVAL '48 days', 70.8),
(CURRENT_DATE - INTERVAL '46 days', 70.7),
(CURRENT_DATE - INTERVAL '44 days', 70.5),
(CURRENT_DATE - INTERVAL '42 days', 70.3),
(CURRENT_DATE - INTERVAL '40 days', 70.0),

-- 39일 전 ~ 30일 전 (70kg → 69kg)
(CURRENT_DATE - INTERVAL '38 days', 69.9),
(CURRENT_DATE - INTERVAL '36 days', 69.7),
(CURRENT_DATE - INTERVAL '34 days', 69.6),
(CURRENT_DATE - INTERVAL '32 days', 69.4),
(CURRENT_DATE - INTERVAL '30 days', 69.0),

-- 29일 전 ~ 20일 전 (69kg → 68.5kg)
(CURRENT_DATE - INTERVAL '28 days', 68.9),
(CURRENT_DATE - INTERVAL '26 days', 68.8),
(CURRENT_DATE - INTERVAL '24 days', 68.7),
(CURRENT_DATE - INTERVAL '22 days', 68.6),
(CURRENT_DATE - INTERVAL '20 days', 68.5),

-- 19일 전 ~ 10일 전 (68.5kg → 68kg, 약간의 정체기)
(CURRENT_DATE - INTERVAL '18 days', 68.6),  -- 약간 증가 (정체기)
(CURRENT_DATE - INTERVAL '16 days', 68.5),
(CURRENT_DATE - INTERVAL '14 days', 68.4),
(CURRENT_DATE - INTERVAL '12 days', 68.3),
(CURRENT_DATE - INTERVAL '10 days', 68.2),

-- 9일 전 ~ 오늘 (68kg → 68kg, 유지 단계)
(CURRENT_DATE - INTERVAL '8 days', 68.1),
(CURRENT_DATE - INTERVAL '6 days', 68.0),
(CURRENT_DATE - INTERVAL '4 days', 68.1),
(CURRENT_DATE - INTERVAL '2 days', 68.0),
(CURRENT_DATE - INTERVAL '1 days', 67.9),
(CURRENT_DATE, 68.0);  -- 오늘: 68kg (목표까지 3kg 남음!)

-- ==============================================
-- 3. 추가 시나리오: 체중 증가 후 다시 감량 (리얼한 데이터)
-- ==============================================

-- 주말에 체중 증가하는 현실적인 패턴
INSERT INTO weight_records (date, weight) VALUES
-- 주말 폭식 후 증가
(CURRENT_DATE - INTERVAL '17 days', 68.9),  -- 토요일: 증가
(CURRENT_DATE - INTERVAL '15 days', 68.7),  -- 월요일: 조금 감소
(CURRENT_DATE - INTERVAL '13 days', 68.5),  -- 수요일: 다시 정상화

-- 생리 주기 또는 스트레스로 인한 변동
(CURRENT_DATE - INTERVAL '11 days', 68.4),
(CURRENT_DATE - INTERVAL '9 days', 68.6),   -- 일시적 증가
(CURRENT_DATE - INTERVAL '7 days', 68.3),
(CURRENT_DATE - INTERVAL '5 days', 68.2),
(CURRENT_DATE - INTERVAL '3 days', 68.1);

-- ==============================================
-- 4. 통계 확인 쿼리
-- ==============================================

-- 목표 확인
SELECT 
  id,
  target_weight,
  target_calories,
  start_date,
  end_date,
  CASE 
    WHEN end_date IS NULL OR end_date >= CURRENT_DATE THEN '활성'
    ELSE '종료'
  END as status
FROM goals
ORDER BY created_at DESC;

-- 체중 변화 통계
SELECT 
  COUNT(*) as total_records,
  MIN(date) as first_record_date,
  MAX(date) as last_record_date,
  MIN(weight) as min_weight,
  MAX(weight) as max_weight,
  ROUND(AVG(weight)::numeric, 1) as avg_weight,
  ROUND((MAX(weight) - MIN(weight))::numeric, 1) as total_change
FROM weight_records;

-- 최근 10일 체중 변화
SELECT 
  date,
  weight,
  weight - LAG(weight) OVER (ORDER BY date) as daily_change,
  ROUND((weight - FIRST_VALUE(weight) OVER (ORDER BY date))::numeric, 1) as total_change_from_start
FROM weight_records
ORDER BY date DESC
LIMIT 10;

-- 주간 평균 체중
SELECT 
  DATE_TRUNC('week', date::timestamp) as week_start,
  ROUND(AVG(weight)::numeric, 1) as avg_weight,
  COUNT(*) as record_count
FROM weight_records
GROUP BY DATE_TRUNC('week', date::timestamp)
ORDER BY week_start DESC;

-- 목표 달성 현황
SELECT 
  g.target_weight,
  g.target_calories,
  g.start_date,
  g.end_date,
  w.weight as current_weight,
  w.date as last_weighed_date,
  ROUND((w.weight - g.target_weight)::numeric, 1) as weight_to_goal,
  CASE 
    WHEN w.weight <= g.target_weight THEN '🎉 목표 달성!'
    ELSE CONCAT(ROUND((w.weight - g.target_weight)::numeric, 1), 'kg 남음')
  END as status
FROM goals g
CROSS JOIN LATERAL (
  SELECT weight, date 
  FROM weight_records 
  ORDER BY date DESC 
  LIMIT 1
) w
WHERE g.end_date IS NULL OR g.end_date >= CURRENT_DATE
ORDER BY g.created_at DESC
LIMIT 1;

-- ==============================================
-- 5. 월별 체중 감량 속도 분석
-- ==============================================

SELECT 
  TO_CHAR(date, 'YYYY-MM') as month,
  COUNT(*) as record_count,
  ROUND(MIN(weight)::numeric, 1) as min_weight,
  ROUND(MAX(weight)::numeric, 1) as max_weight,
  ROUND(AVG(weight)::numeric, 1) as avg_weight,
  ROUND((MAX(weight) - MIN(weight))::numeric, 1) as monthly_change
FROM weight_records
GROUP BY TO_CHAR(date, 'YYYY-MM')
ORDER BY month DESC;

-- ==============================================
-- 데이터 요약
-- ==============================================

COMMENT ON TABLE goals IS '목표 설정 데이터: 체중 감량 목표 (72kg → 65kg), 일일 칼로리 목표 1800kcal';
COMMENT ON TABLE weight_records IS '체중 변화 데이터: 60일간 72kg → 68kg (4kg 감량), 리얼한 변동 포함';

-- 예상 결과:
-- - 시작 체중: 72kg (60일 전)
-- - 현재 체중: 68kg (오늘)
-- - 목표 체중: 65kg
-- - 총 감량: 4kg
-- - 남은 감량: 3kg
-- - 일일 칼로리 목표: 1800kcal
-- - 진행률: 약 57% (4kg / 7kg)

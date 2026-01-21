-- =====================================================
-- Nutri8 데이터베이스 마이그레이션
-- 목적: 모든 테이블에 user_id 컬럼 추가
-- 날짜: 2026-01-19
-- =====================================================

-- ===== 1. meals 테이블 =====
-- user_id 컬럼 추가
ALTER TABLE meals
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 기존 데이터 처리: 첫 번째 사용자에게 할당
UPDATE meals
SET user_id = (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- user_id를 필수 컬럼으로 변경
ALTER TABLE meals
ALTER COLUMN user_id SET NOT NULL;

-- 인덱스 추가 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);

-- 외래 키 제약조건 추가 (CASCADE 삭제)
ALTER TABLE meals
DROP CONSTRAINT IF EXISTS meals_user_id_fkey;

ALTER TABLE meals
ADD CONSTRAINT meals_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;


-- ===== 2. goals 테이블 =====
-- user_id 컬럼 추가
ALTER TABLE goals
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 기존 데이터 처리
UPDATE goals
SET user_id = (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- user_id를 필수 컬럼으로 변경
ALTER TABLE goals
ALTER COLUMN user_id SET NOT NULL;

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);

-- 외래 키 제약조건 추가
ALTER TABLE goals
DROP CONSTRAINT IF EXISTS goals_user_id_fkey;

ALTER TABLE goals
ADD CONSTRAINT goals_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;


-- ===== 3. weight_records 테이블 =====
-- user_id 컬럼 추가
ALTER TABLE weight_records
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 기존 데이터 처리
UPDATE weight_records
SET user_id = (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- user_id를 필수 컬럼으로 변경
ALTER TABLE weight_records
ALTER COLUMN user_id SET NOT NULL;

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_weight_records_user_id ON weight_records(user_id);

-- 외래 키 제약조건 추가
ALTER TABLE weight_records
DROP CONSTRAINT IF EXISTS weight_records_user_id_fkey;

ALTER TABLE weight_records
ADD CONSTRAINT weight_records_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;


-- ===== 4. 확인 쿼리 =====
-- 모든 테이블의 user_id 컬럼 확인
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE column_name = 'user_id'
  AND table_schema = 'public'
ORDER BY table_name;


-- ===== 5. 데이터 확인 =====
-- meals 테이블 user_id 확인
SELECT 
  COUNT(*) as total_meals,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as null_user_ids
FROM meals;

-- goals 테이블 user_id 확인
SELECT 
  COUNT(*) as total_goals,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as null_user_ids
FROM goals;

-- weight_records 테이블 user_id 확인
SELECT 
  COUNT(*) as total_records,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as null_user_ids
FROM weight_records;


-- ===== 완료! =====
-- 이제 모든 테이블에 user_id 컬럼이 추가되었습니다.
-- 앱을 재시작하고 테스트하세요!

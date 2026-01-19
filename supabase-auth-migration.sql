-- ============================================
-- Nutri8 인증 시스템 마이그레이션
-- Supabase Dashboard의 SQL Editor에서 실행하세요
-- ============================================

-- 1. 기존 RLS 정책 삭제 (임시 전체 접근 정책)
DROP POLICY IF EXISTS "Enable all access for all users" ON meals;
DROP POLICY IF EXISTS "Enable all access for all users" ON goals;
DROP POLICY IF EXISTS "Enable all access for all users" ON weight_records;
DROP POLICY IF EXISTS "Enable all access for all users" ON user_profile;

-- 2. user_id 컬럼 추가 (각 테이블에)
ALTER TABLE meals 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE goals 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE weight_records 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE user_profile 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE;

-- 3. user_id에 인덱스 추가 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_weight_records_user_id ON weight_records(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_user_id ON user_profile(user_id);

-- 4. RLS 정책 생성 - meals 테이블
-- 사용자는 자신의 식단만 조회 가능
CREATE POLICY "Users can view own meals"
ON meals FOR SELECT
USING (auth.uid() = user_id);

-- 사용자는 자신의 식단만 추가 가능
CREATE POLICY "Users can insert own meals"
ON meals FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 식단만 수정 가능
CREATE POLICY "Users can update own meals"
ON meals FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 식단만 삭제 가능
CREATE POLICY "Users can delete own meals"
ON meals FOR DELETE
USING (auth.uid() = user_id);

-- 5. RLS 정책 생성 - goals 테이블
CREATE POLICY "Users can view own goals"
ON goals FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
ON goals FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
ON goals FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
ON goals FOR DELETE
USING (auth.uid() = user_id);

-- 6. RLS 정책 생성 - weight_records 테이블
CREATE POLICY "Users can view own weight records"
ON weight_records FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weight records"
ON weight_records FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weight records"
ON weight_records FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own weight records"
ON weight_records FOR DELETE
USING (auth.uid() = user_id);

-- 7. RLS 정책 생성 - user_profile 테이블
CREATE POLICY "Users can view own profile"
ON user_profile FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON user_profile FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON user_profile FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
ON user_profile FOR DELETE
USING (auth.uid() = user_id);

-- 8. 기존 데이터 마이그레이션 (선택사항)
-- 주의: 기존 데이터가 있다면, 이 데이터를 특정 사용자에게 할당해야 합니다.
-- 테스트 환경이라면 기존 데이터를 삭제하는 것을 권장합니다.

-- 옵션 A: 기존 데이터 삭제 (테스트 데이터인 경우)
-- DELETE FROM meals WHERE user_id IS NULL;
-- DELETE FROM goals WHERE user_id IS NULL;
-- DELETE FROM weight_records WHERE user_id IS NULL;
-- DELETE FROM user_profile WHERE user_id IS NULL;

-- 옵션 B: 기존 데이터를 특정 사용자에게 할당 (실제 데이터인 경우)
-- 주의: 'YOUR_USER_ID'를 실제 사용자 ID로 교체하세요
-- UPDATE meals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
-- UPDATE goals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
-- UPDATE weight_records SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
-- UPDATE user_profile SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;

-- 9. user_id를 NOT NULL로 변경 (선택사항 - 기존 데이터 처리 후)
-- ALTER TABLE meals ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE goals ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE weight_records ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE user_profile ALTER COLUMN user_id SET NOT NULL;

-- ============================================
-- 검증 쿼리
-- ============================================

-- RLS 정책 확인
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 인덱스 확인
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE '%user_id%'
ORDER BY tablename;

-- 완료 메시지
SELECT '✅ 인증 시스템 마이그레이션이 완료되었습니다!' AS status;

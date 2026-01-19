-- Nutri8 PostgreSQL 테이블 스키마
-- Supabase Dashboard의 SQL Editor에서 실행하세요

-- 1. meals 테이블 생성
CREATE TABLE IF NOT EXISTS meals (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name VARCHAR(255) NOT NULL,
  calories INTEGER NOT NULL CHECK (calories >= 0),
  protein DECIMAL(10, 2),
  carbs DECIMAL(10, 2),
  fat DECIMAL(10, 2),
  image_uri TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. goals 테이블 생성
CREATE TABLE IF NOT EXISTS goals (
  id BIGSERIAL PRIMARY KEY,
  target_weight DECIMAL(10, 2),
  target_calories INTEGER NOT NULL CHECK (target_calories > 0),
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. weight_records 테이블 생성
CREATE TABLE IF NOT EXISTS weight_records (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  weight DECIMAL(10, 2) NOT NULL CHECK (weight > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. user_profile 테이블 생성
CREATE TABLE IF NOT EXISTS user_profile (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INTEGER CHECK (age > 0 AND age < 150),
  height DECIMAL(10, 2) CHECK (height > 0),
  current_weight DECIMAL(10, 2) CHECK (current_weight > 0),
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date);
CREATE INDEX IF NOT EXISTS idx_meals_created_at ON meals(created_at);
CREATE INDEX IF NOT EXISTS idx_weight_records_date ON weight_records(date);
CREATE INDEX IF NOT EXISTS idx_goals_created_at ON goals(created_at);

-- Row Level Security (RLS) 활성화
-- 나중에 인증 기능 추가 시 사용
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;

-- 임시로 모든 사용자가 접근 가능하도록 설정 (개발용)
-- 나중에 인증 추가 후 수정 필요
CREATE POLICY "Enable all access for all users" ON meals FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON goals FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON weight_records FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON user_profile FOR ALL USING (true);

-- 샘플 데이터 삽입 (선택사항)
-- INSERT INTO meals (date, meal_type, food_name, calories) VALUES
--   (CURRENT_DATE, 'breakfast', '김치찌개', 450),
--   (CURRENT_DATE, 'lunch', '불고기덮밥', 850);

-- 테이블 확인
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

COMMENT ON TABLE meals IS '식단 기록 테이블';
COMMENT ON TABLE goals IS '목표 설정 테이블';
COMMENT ON TABLE weight_records IS '체중 기록 테이블';
COMMENT ON TABLE user_profile IS '사용자 프로필 테이블';

/**
 * 데이터베이스 스키마 정의
 * TODO: 2주차에 구현 예정
 */

/**
 * meals 테이블 생성 쿼리
 */
export const CREATE_MEALS_TABLE = `
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    food_name TEXT NOT NULL,
    calories INTEGER NOT NULL,
    protein REAL,
    carbs REAL,
    fat REAL,
    image_uri TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * goals 테이블 생성 쿼리
 */
export const CREATE_GOALS_TABLE = `
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_weight REAL,
    target_calories INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * weight_records 테이블 생성 쿼리
 */
export const CREATE_WEIGHT_RECORDS_TABLE = `
  CREATE TABLE IF NOT EXISTS weight_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    weight REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * user_profile 테이블 생성 쿼리
 */
export const CREATE_USER_PROFILE_TABLE = `
  CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    height REAL,
    current_weight REAL,
    gender TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * 모든 테이블 생성 쿼리 배열
 */
export const CREATE_TABLES = [
  CREATE_MEALS_TABLE,
  CREATE_GOALS_TABLE,
  CREATE_WEIGHT_RECORDS_TABLE,
  CREATE_USER_PROFILE_TABLE,
];

/**
 * 인덱스 생성 쿼리들
 */
export const CREATE_INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date);',
  'CREATE INDEX IF NOT EXISTS idx_weight_records_date ON weight_records(date);',
];

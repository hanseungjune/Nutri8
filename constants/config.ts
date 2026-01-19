/**
 * 앱 설정 상수
 */

export const Config = {
  // 앱 정보
  APP_NAME: 'Nutri8',
  APP_VERSION: '1.0.0',
  
  // 기본 목표 칼로리
  DEFAULT_TARGET_CALORIES: 2000,
  
  // 데이터베이스
  DB_NAME: 'nutri8.db',
  DB_VERSION: 1,
  
  // 날짜 포맷
  DATE_FORMAT: 'YYYY-MM-DD',
  DISPLAY_DATE_FORMAT: 'YYYY년 MM월 DD일',
  
  // 식사 타입 라벨
  MEAL_TYPE_LABELS: {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  } as const,
} as const;

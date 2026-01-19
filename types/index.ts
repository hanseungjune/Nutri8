/**
 * 공통 타입 정의
 */

// ============================================
// 인증 관련 타입 (re-export)
// ============================================
export * from './auth';

// 식사 타입
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// 식단 기록
export interface Meal {
  id?: number;
  user_id?: string; // Supabase auth.users.id
  date: string;
  mealType: MealType;
  foodName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  photoUrl?: string;  // 음식 사진 URL
  createdAt?: string;
}

// 목표 설정
export interface Goal {
  id?: number;
  user_id?: string; // Supabase auth.users.id
  targetWeight?: number;
  targetCalories: number;
  startDate: string;
  endDate?: string;
}

// 체중 기록
export interface WeightRecord {
  id?: number;
  user_id?: string; // Supabase auth.users.id
  date: string;
  weight: number;
  createdAt?: string;
}

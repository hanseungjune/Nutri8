/**
 * 인증 관련 타입 정의
 */

import { User, Session } from '@supabase/supabase-js';

/**
 * 인증 상태
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * 로그인 요청 데이터
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * 회원가입 요청 데이터
 */
export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

/**
 * 사용자 프로필 데이터
 */
export interface UserProfile {
  id: number;
  user_id: string; // Supabase auth.users.id
  name: string | null;
  age: number | null;
  height: number | null;
  current_weight: number | null;
  gender: 'male' | 'female' | 'other' | null;
  created_at: string;
  updated_at: string;
}

/**
 * 인증 에러 타입
 */
export interface AuthError {
  message: string;
  code?: string;
}

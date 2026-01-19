/**
 * Supabase (PostgreSQL) 클라이언트 설정
 */

import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase 정보 가져오기
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// 환경 변수 확인 (디버깅용)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다!');
  console.warn('SUPABASE_URL:', SUPABASE_URL ? '설정됨' : '미설정');
  console.warn('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '설정됨' : '미설정');
}

/**
 * Supabase 클라이언트
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

console.log('✅ Supabase client initialized');

// 기본 export도 제공
export default supabase;

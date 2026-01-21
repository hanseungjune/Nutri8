/**
 * 인증 상태 관리 (Zustand)
 */

import { create } from 'zustand';
import { supabase } from '../utils/db/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthState, LoginCredentials, RegisterCredentials, AuthError } from '../types/auth';

interface AuthStore extends AuthState {
  // 액션
  signIn: (credentials: LoginCredentials) => Promise<{ error: AuthError | null }>;
  signUp: (credentials: RegisterCredentials) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithNaver: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
  setUser: (user: User | null, session: Session | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // 초기 상태
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  // 로그인
  signIn: async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { error: { message: error.message, code: error.status?.toString() } };
      }

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log('✅ 로그인 성공:', data.user?.email);
      return { error: null };
    } catch (error: any) {
      console.error('❌ 로그인 실패:', error);
      return { error: { message: error.message || '로그인에 실패했습니다.' } };
    }
  },

  // 회원가입
  signUp: async (credentials: RegisterCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}/auth/callback`
            : undefined,
        },
      });

      if (error) {
        return { error: { message: error.message, code: error.status?.toString() } };
      }

      // 이메일 확인이 필요한 경우 (Supabase 설정에 따라)
      if (data.user && !data.session) {
        console.log('⚠️ 이메일 확인 필요:', data.user.email);
        
        // 개발 환경: 자동으로 로그인 시도
        if (process.env.NODE_ENV === 'development') {
          console.log('🔧 개발 환경: 자동 로그인 시도...');
          // Supabase 설정에서 이메일 확인을 비활성화해야 합니다
          return { 
            error: { 
              message: '회원가입이 완료되었습니다. 로그인을 시도하세요.\n\n개발 환경: Supabase Dashboard에서 "Enable email confirmations"를 비활성화하면 자동으로 로그인됩니다.',
              code: 'EMAIL_CONFIRMATION_REQUIRED'
            } 
          };
        }
        
        return { 
          error: { 
            message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
            code: 'EMAIL_CONFIRMATION_REQUIRED'
          } 
        };
      }

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: !!data.session,
        isLoading: false,
      });

      console.log('✅ 회원가입 성공:', data.user?.email);
      return { error: null };
    } catch (error: any) {
      console.error('❌ 회원가입 실패:', error);
      return { error: { message: error.message || '회원가입에 실패했습니다.' } };
    }
  },

  // Google 로그인
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'nutri8://auth/callback', // 앱으로 리다이렉트
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        return { error: { message: error.message, code: error.status?.toString() } };
      }

      console.log('✅ Google 로그인 시작');
      return { error: null };
    } catch (error: any) {
      console.error('❌ Google 로그인 실패:', error);
      return { error: { message: error.message || 'Google 로그인에 실패했습니다.' } };
    }
  },

  // 네이버 로그인
  signInWithNaver: async () => {
    try {
      const clientId = process.env.EXPO_PUBLIC_NAVER_CLIENT_ID;
      const redirectUri = typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/callback`
        : 'http://localhost:8081/auth/callback';
      const encodedRedirectUri = encodeURIComponent(redirectUri);
      const state = Math.random().toString(36).substring(7);

      // 디버깅 로그
      console.log('🟢 네이버 로그인 정보:');
      console.log('  - Client ID:', clientId ? `${clientId.substring(0, 10)}...` : 'undefined');
      console.log('  - Redirect URI:', redirectUri);
      console.log('  - Encoded Redirect URI:', encodedRedirectUri);
      console.log('  - State:', state);

      if (!clientId) {
        const errorMsg = '네이버 Client ID가 설정되지 않았습니다. .env 파일을 확인하세요.';
        console.error('❌', errorMsg);
        return { error: { message: errorMsg } };
      }

      // 네이버 로그인 URL 생성
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&state=${state}`;

      console.log('🔗 네이버 로그인 URL:', naverAuthUrl);

      // 브라우저에서 네이버 로그인 페이지 열기
      if (typeof window !== 'undefined') {
        window.location.href = naverAuthUrl;
      }

      console.log('✅ 네이버 로그인 시작');
      return { error: null };
    } catch (error: any) {
      console.error('❌ 네이버 로그인 실패:', error);
      return { error: { message: error.message || '네이버 로그인에 실패했습니다.' } };
    }
  },

  // 로그아웃
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('로그아웃 에러:', error);
      }

      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });

      console.log('✅ 로그아웃 완료');
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    }
  },

  // 세션 확인
  checkSession: async () => {
    try {
      set({ isLoading: true });

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('세션 확인 에러:', error);
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      set({
        user: session?.user ?? null,
        session: session,
        isAuthenticated: !!session,
        isLoading: false,
      });

      console.log('✅ 세션 확인:', session ? '로그인됨' : '로그인 안됨');
    } catch (error) {
      console.error('❌ 세션 확인 실패:', error);
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // 사용자 정보 설정
  setUser: (user: User | null, session: Session | null) => {
    set({
      user,
      session,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },
}));

// 인증 상태 변경 리스너 설정
supabase.auth.onAuthStateChange((event, session) => {
  console.log('🔄 인증 상태 변경:', event);
  
  const store = useAuthStore.getState();
  store.setUser(session?.user ?? null, session);
});

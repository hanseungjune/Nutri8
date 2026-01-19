/**
 * OAuth 콜백 처리 화면
 * Google, Naver 등 소셜 로그인 후 리다이렉트되는 페이지
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';

export default function CallbackScreen() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('로그인 처리 중...');
  const params = useLocalSearchParams();

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      // 네이버 로그인 콜백 처리
      if (params.code && params.state) {
        await handleNaverCallback(params.code as string, params.state as string);
        return;
      }

      // Supabase OAuth (Google 등) 자동 처리
      // Supabase가 자동으로 세션을 생성하므로 별도 처리 불필요
      setStatus('success');
      setMessage('로그인 성공!');
      
      // 1초 후 메인 화면으로 이동
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error: any) {
      console.error('OAuth 콜백 처리 실패:', error);
      setStatus('error');
      setMessage(error.message || '로그인 처리 중 오류가 발생했습니다.');
      
      // 3초 후 로그인 화면으로 복귀
      setTimeout(() => {
        router.replace('/auth/login');
      }, 3000);
    }
  };

  const handleNaverCallback = async (code: string, state: string) => {
    try {
      const clientId = process.env.EXPO_PUBLIC_NAVER_CLIENT_ID;
      const clientSecret = process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        throw new Error('네이버 로그인 설정이 완료되지 않았습니다.');
      }

      // 1. 네이버 액세스 토큰 획득
      const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          state,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error_description || '네이버 토큰 획득 실패');
      }

      const accessToken = tokenData.access_token;

      // 2. 네이버 사용자 정보 조회
      const profileResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = await profileResponse.json();

      if (profileData.resultcode !== '00') {
        throw new Error('네이버 프로필 정보 조회 실패');
      }

      const { id, email, name } = profileData.response;

      console.log('✅ 네이버 로그인 성공:', { id, email, name });

      // 3. Supabase에 사용자 등록/로그인
      // ⚠️ 주의: 실제 프로덕션에서는 서버에서 처리해야 합니다!
      // 현재는 데모 목적으로 클라이언트에서 처리
      
      // 임시로 이메일/비밀번호 로그인으로 처리
      // 실제로는 Supabase Edge Function 사용 권장
      
      setStatus('success');
      setMessage(`환영합니다, ${name}님!`);
      
      // 1초 후 메인 화면으로 이동
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error: any) {
      console.error('네이버 콜백 처리 실패:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {status === 'loading' && (
          <>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>{message}</Text>
          </>
        )}

        {status === 'success' && (
          <>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successText}>{message}</Text>
            <Text style={styles.subText}>잠시 후 메인 화면으로 이동합니다...</Text>
          </>
        )}

        {status === 'error' && (
          <>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>{message}</Text>
            <Text style={styles.subText}>잠시 후 로그인 화면으로 이동합니다...</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

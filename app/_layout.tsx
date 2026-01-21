import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Platform } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { startWebNotificationChecker } from '../utils/webNotificationUtils';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();

  // 앱 시작 시 세션 확인 및 복구
  useEffect(() => {
    console.log('🔐 앱 시작: 저장된 세션 확인 중...');
    checkSession();
  }, []);

  // 웹에서 알림 체커 시작
  useEffect(() => {
    if (Platform.OS === 'web' && isAuthenticated) {
      console.log('🔔 웹 알림 체커 자동 시작');
      startWebNotificationChecker();
    }
  }, [isAuthenticated]);

  // 인증 상태에 따른 라우팅
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && !inAuthGroup) {
      // 로그인 안됨 → 로그인 화면으로
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // 로그인됨 → 메인 화면으로
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, segments]);

  // 로딩 중
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

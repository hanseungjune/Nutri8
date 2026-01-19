import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();

  // 앱 시작 시 세션 확인
  useEffect(() => {
    checkSession();
  }, []);

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

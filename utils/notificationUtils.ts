/**
 * 알림 관련 유틸리티
 * 7주차: 알림 기능
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 알림 설정 키
const NOTIFICATION_SETTINGS_KEY = '@nutri8:notification_settings';

export interface NotificationSettings {
  enabled: boolean;
  breakfast: { enabled: boolean; time: string }; // "08:00"
  lunch: { enabled: boolean; time: string };     // "12:00"
  dinner: { enabled: boolean; time: string };    // "18:00"
  snack: { enabled: boolean; time: string };     // "15:00"
}

// 기본 알림 설정
const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  breakfast: { enabled: false, time: '08:00' },
  lunch: { enabled: false, time: '12:00' },
  dinner: { enabled: false, time: '18:00' },
  snack: { enabled: false, time: '15:00' },
};

/**
 * 알림 핸들러 설정
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * 알림 권한 요청
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * 알림 설정 저장
 */
export async function saveNotificationSettings(
  settings: NotificationSettings
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      NOTIFICATION_SETTINGS_KEY,
      JSON.stringify(settings)
    );
  } catch (error) {
    console.error('Failed to save notification settings:', error);
  }
}

/**
 * 알림 설정 불러오기
 */
export async function loadNotificationSettings(): Promise<NotificationSettings> {
  try {
    const saved = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load notification settings:', error);
  }
  return DEFAULT_SETTINGS;
}

/**
 * 식사 시간 알림 예약
 */
export async function scheduleMealNotification(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  time: string // "HH:MM" 형식
): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    // 기존 알림 취소
    await cancelMealNotification(mealType);

    // 시간 파싱
    const [hours, minutes] = time.split(':').map(Number);

    // 알림 제목 및 내용
    const mealTypeLabels = {
      breakfast: '아침',
      lunch: '점심',
      dinner: '저녁',
      snack: '간식',
    };

    const title = `${mealTypeLabels[mealType]} 식사 시간이에요! 🍽️`;
    const body = `오늘의 ${mealTypeLabels[mealType]} 식사를 기록해보세요.`;

    // 매일 반복되는 알림 예약
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { mealType },
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      } as any, // Note: expo-notifications 타입 이슈, 런타임에서 정상 작동
    });

    console.log(`Scheduled ${mealType} notification:`, identifier);
    return identifier;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    return null;
  }
}

/**
 * 특정 식사 알림 취소
 */
export async function cancelMealNotification(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    // 모든 예약된 알림 가져오기
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    
    // 해당 mealType의 알림 찾아서 취소
    for (const notification of scheduled) {
      if (notification.content.data?.mealType === mealType) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
        console.log(`Cancelled ${mealType} notification`);
      }
    }
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
}

/**
 * 모든 알림 취소
 */
export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Failed to cancel all notifications:', error);
  }
}

/**
 * 알림 초기화 (설정 기반)
 */
export async function initializeNotifications(
  settings: NotificationSettings
): Promise<void> {
  if (!settings.enabled) {
    await cancelAllNotifications();
    return;
  }

  // 각 식사 알림 예약
  if (settings.breakfast.enabled) {
    await scheduleMealNotification('breakfast', settings.breakfast.time);
  } else {
    await cancelMealNotification('breakfast');
  }

  if (settings.lunch.enabled) {
    await scheduleMealNotification('lunch', settings.lunch.time);
  } else {
    await cancelMealNotification('lunch');
  }

  if (settings.dinner.enabled) {
    await scheduleMealNotification('dinner', settings.dinner.time);
  } else {
    await cancelMealNotification('dinner');
  }

  if (settings.snack.enabled) {
    await scheduleMealNotification('snack', settings.snack.time);
  } else {
    await cancelMealNotification('snack');
  }
}

/**
 * 목표 달성 알림 전송 (즉시)
 */
export async function sendGoalAchievedNotification(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 목표 달성!',
        body: '오늘의 칼로리 목표를 달성했습니다!',
        sound: true,
      },
      trigger: null, // 즉시 전송
    });
  } catch (error) {
    console.error('Failed to send goal achieved notification:', error);
  }
}

/**
 * 목표 초과 경고 알림 전송 (즉시)
 */
export async function sendGoalExceededNotification(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚠️ 목표 초과',
        body: '오늘의 칼로리 목표를 초과했습니다.',
        sound: true,
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Failed to send goal exceeded notification:', error);
  }
}

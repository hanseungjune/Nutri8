/**
 * 웹 브라우저 알림 유틸리티
 * Browser Notification API 사용
 */

export interface WebNotificationSettings {
  enabled: boolean;
  breakfast: { enabled: boolean; time: string };
  lunch: { enabled: boolean; time: string };
  dinner: { enabled: boolean; time: string };
  snack: { enabled: boolean; time: string };
}

const STORAGE_KEY = 'nutri8_web_notifications';
let checkInterval: NodeJS.Timeout | null = null;

/**
 * 브라우저 알림 지원 확인
 */
export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}

/**
 * 알림 권한 요청
 */
export async function requestWebNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) {
    console.log('브라우저가 알림을 지원하지 않습니다.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    console.log('알림 권한이 거부되었습니다.');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('알림 권한 요청 실패:', error);
    return false;
  }
}

/**
 * 웹 알림 전송
 */
export function sendWebNotification(title: string, body: string, mealType?: string) {
  if (!isNotificationSupported()) {
    console.log('브라우저가 알림을 지원하지 않습니다.');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.log('알림 권한이 없습니다.');
    return;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: '/assets/icon.png',
      badge: '/assets/icon.png',
      tag: `nutri8-meal-${mealType || 'general'}`,
      requireInteraction: false,
      silent: false,
    });

    // 알림 클릭 시 앱으로 포커스
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // 3초 후 자동 닫기
    setTimeout(() => {
      notification.close();
    }, 5000);

    console.log('✅ 웹 알림 전송:', title);
  } catch (error) {
    console.error('알림 전송 실패:', error);
  }
}

/**
 * 설정 저장 (localStorage)
 */
export function saveWebNotificationSettings(settings: WebNotificationSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    console.log('✅ 웹 알림 설정 저장:', settings);
  } catch (error) {
    console.error('설정 저장 실패:', error);
  }
}

/**
 * 설정 불러오기 (localStorage)
 */
export function loadWebNotificationSettings(): WebNotificationSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('설정 불러오기 실패:', error);
  }

  // 기본값
  return {
    enabled: false,
    breakfast: { enabled: false, time: '08:00' },
    lunch: { enabled: false, time: '12:00' },
    dinner: { enabled: false, time: '18:00' },
    snack: { enabled: false, time: '15:00' },
  };
}

/**
 * 현재 시간 가져오기 (HH:MM 형식)
 */
function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * 식사 시간 체크 및 알림 전송
 */
function checkMealTime(): void {
  const settings = loadWebNotificationSettings();
  
  if (!settings.enabled) {
    return;
  }

  const currentTime = getCurrentTime();
  
  const mealTypeLabels = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  };

  // 각 식사 시간 체크
  if (settings.breakfast.enabled && settings.breakfast.time === currentTime) {
    sendWebNotification(
      `${mealTypeLabels.breakfast} 식사 시간이에요! 🍽️`,
      `오늘의 ${mealTypeLabels.breakfast} 식사를 기록해보세요.`,
      'breakfast'
    );
  }

  if (settings.lunch.enabled && settings.lunch.time === currentTime) {
    sendWebNotification(
      `${mealTypeLabels.lunch} 식사 시간이에요! 🍽️`,
      `오늘의 ${mealTypeLabels.lunch} 식사를 기록해보세요.`,
      'lunch'
    );
  }

  if (settings.dinner.enabled && settings.dinner.time === currentTime) {
    sendWebNotification(
      `${mealTypeLabels.dinner} 식사 시간이에요! 🍽️`,
      `오늘의 ${mealTypeLabels.dinner} 식사를 기록해보세요.`,
      'dinner'
    );
  }

  if (settings.snack.enabled && settings.snack.time === currentTime) {
    sendWebNotification(
      `${mealTypeLabels.snack} 식사 시간이에요! 🍽️`,
      `오늘의 ${mealTypeLabels.snack} 식사를 기록해보세요.`,
      'snack'
    );
  }
}

/**
 * 알림 체커 시작 (1분마다 체크)
 */
export function startWebNotificationChecker(): void {
  // 이미 실행 중이면 중단
  if (checkInterval) {
    return;
  }

  console.log('✅ 웹 알림 체커 시작 (1분마다 체크)');

  // 1분(60초)마다 체크
  checkInterval = setInterval(() => {
    checkMealTime();
  }, 60000);

  // 즉시 한 번 체크 (앱 시작 시)
  checkMealTime();
}

/**
 * 알림 체커 중지
 */
export function stopWebNotificationChecker(): void {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
    console.log('❌ 웹 알림 체커 중지');
  }
}

/**
 * 테스트 알림 전송
 */
export async function sendTestNotification(): Promise<void> {
  const hasPermission = await requestWebNotificationPermission();
  
  if (!hasPermission) {
    alert('알림 권한이 필요합니다. 브라우저 설정에서 알림을 허용해주세요.');
    return;
  }

  sendWebNotification(
    '✅ 테스트 알림',
    'Nutri8 웹 알림이 정상 작동합니다!',
    'test'
  );
}

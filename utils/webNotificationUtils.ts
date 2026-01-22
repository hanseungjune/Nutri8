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
 * iOS 감지
 */
function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

/**
 * Android 감지
 */
function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
}

/**
 * PWA 모드(standalone) 확인
 */
function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
}

/**
 * 브라우저 알림 지원 확인
 */
export function isNotificationSupported(): boolean {
  if (!('Notification' in window)) {
    return false;
  }

  // iOS는 기본적으로 웹 알림을 지원하지 않음
  if (isIOS()) {
    console.log('⚠️ iOS는 웹 알림을 지원하지 않습니다.');
    return false;
  }

  // Android는 PWA 모드에서만 안정적
  if (isAndroid() && !isStandalone()) {
    console.log('⚠️ Android에서는 홈 화면에 추가(PWA)해야 알림이 안정적입니다.');
  }

  return true;
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
  // iOS 체크
  if (isIOS()) {
    alert(
      '❌ iOS는 웹 알림을 지원하지 않습니다.\n\n' +
      '📱 대신 다음 방법을 사용하세요:\n' +
      '1. 매일 같은 시간에 앱을 확인하는 습관 만들기\n' +
      '2. 폰의 기본 알람 앱 사용\n' +
      '3. Android 폰 사용 시 웹 알림 사용 가능'
    );
    return;
  }

  // Android인데 PWA가 아닌 경우
  if (isAndroid() && !isStandalone()) {
    const shouldContinue = confirm(
      '⚠️ 안정적인 알림을 위해 홈 화면에 추가하시겠습니까?\n\n' +
      '현재 브라우저 탭에서도 알림이 작동할 수 있지만,\n' +
      '홈 화면에 추가하면 더 안정적입니다.\n\n' +
      '[확인] = 계속 테스트\n' +
      '[취소] = 홈 화면 추가 방법 보기'
    );

    if (!shouldContinue) {
      alert(
        '📱 홈 화면에 추가하는 방법:\n\n' +
        '1. 우측 상단 ⋮ (메뉴) 클릭\n' +
        '2. "홈 화면에 추가" 선택\n' +
        '3. "추가" 클릭\n\n' +
        '추가 후 홈 화면의 Nutri8 아이콘으로 실행하세요!'
      );
      return;
    }
  }

  const hasPermission = await requestWebNotificationPermission();
  
  if (!hasPermission) {
    alert(
      '❌ 알림 권한이 필요합니다.\n\n' +
      '📱 Android Chrome:\n' +
      '1. 주소창 왼쪽 자물쇠 아이콘 터치\n' +
      '2. "권한" 터치\n' +
      '3. "알림" → "허용" 선택\n\n' +
      '또는\n' +
      '설정 → 사이트 설정 → 알림 → 허용'
    );
    return;
  }

  sendWebNotification(
    '✅ 테스트 알림',
    'Nutri8 웹 알림이 정상 작동합니다! 🎉',
    'test'
  );

  // 성공 메시지
  setTimeout(() => {
    alert('✅ 테스트 알림을 전송했습니다!\n\n알림이 보이지 않으면 브라우저 설정을 확인해주세요.');
  }, 500);
}

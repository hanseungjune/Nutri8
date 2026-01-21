# 🔔 웹 알림 구현 가이드

## ❌ 현재 상태

웹앱(Vercel 배포)에서는 알림이 작동하지 않습니다.

**이유:**
- `expo-notifications`는 네이티브 앱 전용
- 웹에서는 `Platform.OS === 'web'` 체크로 비활성화됨

---

## ✅ 웹 알림 구현 방법

### **방법 1: 브라우저 Notification API (권장, 간단)**

#### **장점:**
- ✅ 서버 불필요
- ✅ 간단한 구현
- ✅ Chrome, Firefox, Safari 지원

#### **단점:**
- ❌ 백그라운드 동작 제한
- ❌ 탭이 닫히면 알림 중단
- ❌ 정확한 시간 예약 어려움

#### **구현 코드:**

```typescript
// utils/webNotificationUtils.ts
export async function requestWebNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function sendWebNotification(title: string, body: string) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/assets/icon.png',
      badge: '/assets/icon.png',
      tag: 'nutri8-meal',
      requireInteraction: false,
    });
  }
}

// 식사 시간 체크 (1분마다)
export function startMealTimeChecker() {
  setInterval(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // localStorage에서 설정 불러오기
    const settings = JSON.parse(localStorage.getItem('notification_settings') || '{}');
    
    if (settings.enabled) {
      if (settings.breakfast?.enabled && settings.breakfast.time === currentTime) {
        sendWebNotification('아침 식사 시간이에요! 🍽️', '오늘의 아침 식사를 기록해보세요.');
      }
      if (settings.lunch?.enabled && settings.lunch.time === currentTime) {
        sendWebNotification('점심 식사 시간이에요! 🍽️', '오늘의 점심 식사를 기록해보세요.');
      }
      if (settings.dinner?.enabled && settings.dinner.time === currentTime) {
        sendWebNotification('저녁 식사 시간이에요! 🍽️', '오늘의 저녁 식사를 기록해보세요.');
      }
      if (settings.snack?.enabled && settings.snack.time === currentTime) {
        sendWebNotification('간식 식사 시간이에요! 🍽️', '오늘의 간식 식사를 기록해보세요.');
      }
    }
  }, 60000); // 1분마다 체크
}
```

---

### **방법 2: Service Worker + Push API (복잡, 프로덕션 권장)**

#### **장점:**
- ✅ 백그라운드 동작
- ✅ 탭이 닫혀도 알림 가능
- ✅ 정확한 시간 예약
- ✅ 오프라인 지원

#### **단점:**
- ❌ 서버 필요 (Push 서버)
- ❌ 복잡한 구현
- ❌ HTTPS 필수

#### **구현 개요:**

1. **Service Worker 등록**

```javascript
// public/service-worker.js
self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/assets/icon.png',
  });
});
```

2. **Push 구독**

```typescript
const registration = await navigator.serviceWorker.register('/service-worker.js');
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
});
```

3. **서버 구현** (Node.js + web-push)

```javascript
const webpush = require('web-push');
webpush.setVapidDetails(
  'mailto:your@email.com',
  PUBLIC_KEY,
  PRIVATE_KEY
);

// 예약된 시간에 푸시 전송
webpush.sendNotification(subscription, JSON.stringify({
  title: '아침 식사 시간이에요!',
  body: '오늘의 아침 식사를 기록해보세요.'
}));
```

---

### **방법 3: Firebase Cloud Messaging (FCM)**

#### **장점:**
- ✅ Google 무료 서비스
- ✅ 백그라운드 동작
- ✅ 크로스 플랫폼 (웹 + 모바일)

#### **단점:**
- ❌ Firebase 계정 필요
- ❌ 추가 설정 필요

---

## 🎯 **권장 솔루션**

현재 Nutri8 웹앱 상황에서는:

### **단기 (간단):**
✅ **브라우저 Notification API** 사용
- 구현 빠름
- 서버 불필요
- 기본 기능 제공

### **장기 (프로덕션):**
✅ **네이티브 앱 빌드** (EAS Build)
- `expo-notifications` 그대로 사용
- 완벽한 알림 기능
- 배터리 최적화

---

## 📱 **현재 알림 상태 요약**

| 플랫폼 | 상태 | 방법 |
|--------|------|------|
| **Android 앱** | ✅ 작동 | expo-notifications |
| **iOS 앱** | ✅ 작동 | expo-notifications |
| **웹 (Vercel)** | ❌ 미작동 | 구현 필요 |

---

## 💡 **빠른 해결책**

웹에서 알림을 원하신다면:

1. **EAS Build로 네이티브 앱 빌드** (권장)
   - `npx eas build --platform android`
   - APK 다운로드 후 설치
   - ✅ 모든 알림 기능 작동

2. **브라우저 Notification API 구현** (웹 전용)
   - `WEB_NOTIFICATION_GUIDE.md` 참고
   - 기본적인 알림 기능 제공

---

## 📞 **문제 해결**

### **"알림 권한이 없습니다"**

**웹:**
```
브라우저 주소창 → 🔒 (자물쇠) → 알림 허용
```

**Android:**
```
설정 → 앱 → Nutri8 → 알림 → 허용
```

**iOS:**
```
설정 → Nutri8 → 알림 → 허용
```

---

## ✅ 결론

- **현재**: 네이티브 앱에서만 알림 작동
- **웹**: 브라우저 Notification API 구현 또는 네이티브 앱 빌드 권장
- **PWA**: 홈 화면 추가 시 알림 권한 요청 가능

---

**네이티브 앱 빌드를 추천합니다!** 📱✨

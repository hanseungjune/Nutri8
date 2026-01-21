# 📱 PWA 웹앱 배포 가이드

## ✅ 완료된 작업

1. ✅ **PWA 설정 추가** (`app.json`)
2. ✅ **Web Manifest 생성** (`public/manifest.json`)
3. ✅ **웹 빌드 완료** (`dist/` 폴더)

---

## 🚀 Vercel 배포 방법

### **방법 1: 터미널에서 배포**

```bash
# 1. Vercel 로그인 (토큰 만료 시)
vercel login

# 2. 배포 (프로덕션)
vercel --prod --yes
```

### **방법 2: Vercel Dashboard에서 배포**

1. **Vercel Dashboard 접속**: https://vercel.com/dashboard
2. **프로젝트 선택**: Nutri8
3. **Settings** → **Git** → **Redeploy** 클릭
4. 또는 **GitHub에 Push**하면 자동 배포

---

## 📱 PWA 기능

배포 후 사용자는 다음과 같이 사용할 수 있습니다:

### **Android (Chrome/Samsung Internet)**

1. 웹사이트 접속
2. 우측 상단 메뉴 (⋮)
3. **"홈 화면에 추가"** 클릭
4. ✅ **앱처럼 설치됨!**

### **iOS (Safari)**

1. 웹사이트 접속
2. 하단 공유 버튼 (📤)
3. **"홈 화면에 추가"** 클릭
4. ✅ **앱처럼 설치됨!**

### **PC (Chrome/Edge)**

1. 웹사이트 접속
2. 주소창 우측에 **설치 아이콘** (⊕) 표시
3. 클릭하여 설치
4. ✅ **독립 앱처럼 실행됨!**

---

## 🎨 PWA 설정 내용

### **1. app.json (Expo 설정)**

```json
"web": {
  "name": "Nutri8",
  "shortName": "Nutri8",
  "themeColor": "#4CAF50",
  "display": "standalone",
  "startUrl": "/",
  "orientation": "portrait"
}
```

### **2. public/manifest.json (Web Manifest)**

```json
{
  "name": "Nutri8 - 스마트 식단 관리",
  "short_name": "Nutri8",
  "display": "standalone",
  "theme_color": "#4CAF50",
  "icons": [
    {
      "src": "/assets/icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "shortcuts": [
    {
      "name": "식단 입력",
      "url": "/(tabs)/input"
    },
    {
      "name": "히스토리",
      "url": "/(tabs)/history"
    }
  ]
}
```

---

## 🔔 웹 알림 제한사항

**현재 상태:**
- ❌ **웹에서는 로컬 알림이 작동하지 않음**
- ✅ **네이티브 앱 (Android/iOS)에서만 알림 작동**

**해결 방법:**
1. **PWA + Service Worker** 사용 (복잡함)
2. **EAS Build**로 네이티브 앱 빌드 (권장)
3. **웹 푸시 알림** API 사용 (서버 필요)

---

## 📊 배포 체크리스트

- [x] PWA 설정 (`app.json`)
- [x] Web Manifest (`public/manifest.json`)
- [x] 웹 빌드 (`npx expo export --platform web`)
- [ ] Vercel 배포 (`vercel --prod --yes`)
- [ ] 배포 URL 확인
- [ ] 모바일에서 "홈 화면에 추가" 테스트
- [ ] PWA 설치 테스트

---

## 🌐 배포 후 확인 사항

### **1. PWA 검증**

- Chrome DevTools → **Application** 탭
- **Manifest** 확인
- **Service Workers** 확인

### **2. Lighthouse 테스트**

```bash
# Chrome DevTools → Lighthouse
# PWA 점수 확인 (90점 이상 목표)
```

### **3. 모바일 테스트**

1. 실제 모바일 기기에서 접속
2. "홈 화면에 추가" 옵션 확인
3. 설치 후 전체 화면으로 실행되는지 확인

---

## 💡 추가 개선 사항 (선택)

### **1. Service Worker 추가 (오프라인 지원)**

```javascript
// public/service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker 설치됨');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### **2. 웹 푸시 알림 (서버 필요)**

```javascript
// 웹 푸시 알림 구독
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: 'YOUR_PUBLIC_KEY'
});
```

---

## 🎯 현재 배포 URL

**프로덕션:** https://nutri8-6z1o.vercel.app/

---

## 📞 문제 해결

### **1. "Vercel 토큰이 유효하지 않음" 에러**

```bash
vercel login
# 이메일로 로그인 후 다시 시도
```

### **2. "홈 화면에 추가" 옵션이 안 보임**

- **HTTPS** 필수 (Vercel은 자동으로 HTTPS)
- **manifest.json** 확인
- **브라우저 호환성** 확인 (Chrome/Safari)

### **3. 설치 후 아이콘이 안 보임**

- `assets/icon.png`가 192x192 이상인지 확인
- `manifest.json`의 icons 경로 확인

---

## ✅ 완료!

이제 Nutri8는 **Progressive Web App (PWA)**입니다! 🎉

**배포 후 모바일에서 홈 화면에 추가해서 앱처럼 사용할 수 있습니다!** 📱✨

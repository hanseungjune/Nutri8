# 📱 앱스토어 배포 완전 가이드

## 🎯 목차
1. [사전 준비](#사전-준비)
2. [EAS Build 설정](#eas-build-설정)
3. [iOS App Store 배포](#ios-app-store-배포)
4. [Google Play Store 배포](#google-play-store-배포)
5. [문제 해결](#문제-해결)

---

## 📋 사전 준비

### ✅ 체크리스트

- [ ] Apple Developer Account ($99/년)
- [ ] Google Play Console Account ($25 일회성)
- [ ] 앱 아이콘 준비 (1024x1024px)
- [ ] 스크린샷 준비 (다양한 기기 크기)
- [ ] 앱 설명 작성
- [ ] 개인정보 처리방침 URL
- [ ] 앱 버전 및 빌드 번호 설정

### 💳 계정 생성

#### **Apple Developer Account**
1. https://developer.apple.com 접속
2. "Account" → "Enroll" 클릭
3. 개인 또는 회사 선택
4. $99 결제
5. 승인 대기 (1-2일)

#### **Google Play Console**
1. https://play.google.com/console 접속
2. "Create app" 클릭
3. $25 일회성 결제
4. 계정 즉시 활성화

---

## 🚀 EAS Build 설정

### Step 1: EAS CLI 설치

```bash
npm install -g eas-cli
```

### Step 2: EAS 로그인

```bash
eas login
```

Expo 계정으로 로그인:
- 이메일
- 비밀번호

### Step 3: EAS Build 초기화

```bash
cd C:\Users\DELL\Desktop\Nutri8
eas build:configure
```

질문에 답변:
```
? Select a platform: All (iOS, Android)
```

이렇게 하면 `eas.json` 파일이 생성됩니다.

### Step 4: `app.json` 업데이트

`app.json` 파일에 다음 추가:

```json
{
  "expo": {
    "name": "Nutri8",
    "slug": "nutri8",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourname.nutri8",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourname.nutri8",
      "versionCode": 1
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### Step 5: 앱 아이콘 및 스플래시 준비

필요한 이미지:
```
assets/
  ├── icon.png (1024x1024px)
  ├── splash.png (1242x2436px)
  └── adaptive-icon.png (1024x1024px, Android)
```

---

## 🍎 iOS App Store 배포

### Step 1: Apple Developer 계정 연결

```bash
eas credentials
```

옵션 선택:
```
? Select platform: iOS
? What do you want to do: Set up credentials
```

### Step 2: iOS 빌드 생성

```bash
eas build --platform ios
```

빌드 타입 선택:
```
? Choose a build profile: production
? Would you like to automatically submit to App Store: No (나중에 수동)
```

⏱️ 빌드 시간: **약 15-30분**

빌드가 완료되면:
```
✅ Build finished
   https://expo.dev/accounts/yourname/projects/nutri8/builds/...
```

### Step 3: App Store Connect 설정

#### 3.1 앱 정보 등록

1. **https://appstoreconnect.apple.com** 접속
2. **"My Apps" → "+" → "New App"** 클릭
3. **앱 정보 입력:**
   ```
   Platform: iOS
   Name: Nutri8
   Primary Language: Korean
   Bundle ID: com.yourname.nutri8
   SKU: nutri8-001 (고유 ID)
   ```

#### 3.2 앱 정보 작성

**App Information:**
- **이름:** Nutri8
- **부제:** 간편한 식단 관리 & 칼로리 추적
- **카테고리:** Health & Fitness
- **연령 등급:** 4+

**Privacy Policy:**
- 개인정보 처리방침 URL 입력 (필수!)
- 예: `https://nutri8-6z1o.vercel.app/privacy`

**Description (한국어):**
```
Nutri8은 일상의 식단을 쉽게 기록하고 관리할 수 있는 스마트 칼로리 추적 앱입니다.

✨ 주요 기능:
• 🍽️ 식단 기록: 아침, 점심, 저녁, 간식 자동 분류
• 🤖 AI 영양 분석: 음식 이름만 입력하면 자동 칼로리 계산
• 📸 사진 첨부: 식사 사진을 저장하고 기록
• 📊 통계 대시보드: 일일/주간/월간 칼로리 추이 확인
• 🎯 목표 설정: 체중 감량/유지/증량 목표 관리
• 🔔 식사 알림: 정시에 식사 리마인더
• ⭐ 즐겨찾기: 자주 먹는 음식 빠른 입력

Nutri8과 함께 건강한 식습관을 만들어보세요!
```

**Keywords (영문):**
```
calorie, diet, food, nutrition, health, fitness, weight, meal, tracker
```

#### 3.3 스크린샷 준비

**필수 스크린샷 크기:**
- **6.7" Display (iPhone 15 Pro Max):** 1290 x 2796px
- **5.5" Display (iPhone 8 Plus):** 1242 x 2208px

최소 3개, 최대 10개 스크린샷 필요

#### 3.4 빌드 업로드

**옵션 1: EAS를 통한 자동 업로드**

```bash
eas submit --platform ios
```

**옵션 2: 수동 업로드 (Transporter 앱)**

1. Mac에서 "Transporter" 앱 다운로드
2. EAS Build에서 `.ipa` 파일 다운로드
3. Transporter로 업로드

#### 3.5 심사 제출

1. App Store Connect → "Nutri8" 앱 선택
2. "1.0 Prepare for Submission" 클릭
3. **Build 선택:** 업로드한 빌드 선택
4. **App Review Information:**
   ```
   Contact: 연락처 정보
   Demo Account: (필요시) 테스트 계정
   Notes: 앱 사용 방법 설명
   ```
5. **Export Compliance:** 암호화 사용 여부
   - 대부분의 경우: "No"
6. **"Submit for Review"** 클릭

⏱️ **심사 기간:** 1-3일 (평균 24시간)

---

## 🤖 Google Play Store 배포

### Step 1: Android 빌드 생성

```bash
eas build --platform android
```

빌드 타입 선택:
```
? Choose a build profile: production
? Generate a new Android Keystore: Yes
```

⏱️ 빌드 시간: **약 15-30분**

빌드 완료 후 `.aab` (Android App Bundle) 파일 다운로드

### Step 2: Google Play Console 설정

#### 2.1 앱 만들기

1. **https://play.google.com/console** 접속
2. **"앱 만들기"** 클릭
3. **앱 정보 입력:**
   ```
   앱 이름: Nutri8
   기본 언어: 한국어
   앱 또는 게임: 앱
   무료 또는 유료: 무료
   ```

#### 2.2 앱 콘텐츠 설정

**필수 항목:**

1. **앱 액세스 권한**
   - "모든 기능을 무료로 제공"

2. **광고**
   - "아니요, 앱에 광고 없음"

3. **콘텐츠 등급**
   - 설문지 작성
   - Health & Fitness 앱
   - 등급: 만 3세 이상

4. **타겟층 및 콘텐츠**
   - 타겟 연령: 13세 이상

5. **데이터 보안**
   - 개인정보 처리방침 URL 입력
   - 수집 데이터 항목 선택:
     - 이름, 이메일
     - 식단 정보
     - 체중 정보

#### 2.3 스토어 등록정보

**앱 세부정보:**

**간단한 설명 (80자 이내):**
```
AI 기반 칼로리 추적으로 건강한 식습관을 만들어보세요!
```

**전체 설명 (4000자 이내):**
```
🍽️ Nutri8 - 스마트 식단 관리 앱

Nutri8은 AI 기술을 활용한 간편한 칼로리 추적 및 식단 관리 앱입니다.
음식 이름만 입력하면 자동으로 영양 정보를 분석해드립니다.

✨ 주요 기능

📝 간편한 식단 기록
• 아침, 점심, 저녁, 간식 자동 분류
• 날짜별 식단 히스토리 확인
• 빠른 입력을 위한 즐겨찾기 기능

🤖 AI 영양 분석
• 음식 이름 입력만으로 자동 칼로리 계산
• 단백질, 탄수화물, 지방 영양소 분석
• 한국 음식 데이터베이스 지원

📸 사진 첨부
• 식사 사진 저장
• 시각적 식단 기록
• Supabase 클라우드 저장

📊 상세한 통계
• 일일/주간/월간 칼로리 추이
• 영양소 밸런스 그래프
• 목표 대비 달성률 확인

🎯 체중 관리
• 체중 감량/유지/증량 목표 설정
• 일일 칼로리 목표 자동 계산
• 체중 변화 추적

🔔 식사 알림
• 정시 식사 리마인더
• 맞춤형 알림 설정
• 건강한 식습관 유지

⭐ 즐겨찾기
• 자주 먹는 음식 저장
• 빠른 입력으로 시간 절약

🔐 안전한 데이터 관리
• Supabase 클라우드 동기화
• Google OAuth 로그인
• 안전한 데이터 백업

Nutri8과 함께 건강한 식습관을 시작하세요! 💪
```

**앱 아이콘:**
- 512 x 512px PNG (32비트)

**스크린샷 (필수):**
- **휴대전화:** 최소 2개 (1080 x 1920px 이상)
- **7인치 태블릿:** 선택 (1024 x 1600px)
- **10인치 태블릿:** 선택 (1920 x 1200px)

**그래픽 이미지 (선택):**
- **기능 그래픽:** 1024 x 500px (추천)

#### 2.4 프로덕션 트랙 설정

1. **"프로덕션" 트랙** 선택
2. **"새 버전 만들기"** 클릭
3. **`.aab` 파일 업로드**
4. **버전 정보 입력:**
   ```
   버전 이름: 1.0.0
   출시 노트 (한국어):
   
   🎉 Nutri8 첫 출시!
   
   • AI 기반 칼로리 자동 계산
   • 식단 사진 첨부
   • 통계 및 그래프
   • 체중 목표 관리
   • 식사 알림 기능
   ```

5. **"검토" → "출시 시작"** 클릭

⏱️ **심사 기간:** 수시간 ~ 3일 (평균 1-2일)

---

## 🔄 업데이트 배포

### 버전 업데이트 시:

1. **`app.json` 업데이트:**
   ```json
   {
     "version": "1.0.1",  // 버전 증가
     "ios": {
       "buildNumber": "2"  // iOS 빌드 번호 증가
     },
     "android": {
       "versionCode": 2    // Android 버전 코드 증가
     }
   }
   ```

2. **새 빌드 생성:**
   ```bash
   eas build --platform all
   ```

3. **스토어에 제출:**
   ```bash
   eas submit --platform all
   ```

---

## 🎨 앱 아이콘 및 스플래시 생성

### 온라인 도구 사용:

**1. 앱 아이콘 생성:**
- https://www.appicon.co/
- https://makeappicon.com/
- 1024x1024px 이미지 업로드
- 모든 크기 자동 생성

**2. 스플래시 스크린:**
- https://www.mockupworld.co/
- Figma (무료)
- Canva (무료)

### Expo 자동 생성:

```bash
npx expo-splash-screen generate
```

---

## 📸 스크린샷 생성 가이드

### 방법 1: 실제 기기에서 촬영

1. 앱 실행
2. 주요 화면 스크린샷
3. 크기 조정 (온라인 도구)

### 방법 2: 시뮬레이터 사용

**iOS (Mac 필요):**
```bash
xcrun simctl io booted screenshot screenshot.png
```

**Android:**
```bash
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### 방법 3: 온라인 도구

- https://previewed.app/
- https://mockuphone.com/
- https://smartmockups.com/

필요한 화면:
1. 로그인 화면
2. 메인 대시보드
3. 식단 입력 화면
4. 통계 화면
5. 히스토리 화면

---

## 📄 개인정보 처리방침 작성

### 필수 항목:

1. **수집하는 정보:**
   - 이메일, 이름 (로그인)
   - 식단 정보 (칼로리, 음식명)
   - 체중 정보

2. **정보 사용 목적:**
   - 서비스 제공
   - 통계 분석
   - 목표 관리

3. **정보 보관:**
   - Supabase 클라우드
   - 암호화 저장

4. **제3자 제공:**
   - Google (OAuth)
   - Gemini API (영양 분석)
   - Supabase (데이터 저장)

5. **사용자 권리:**
   - 데이터 삭제 요청
   - 정보 수정

### 템플릿 사용:

- https://www.privacypolicytemplate.net/
- https://app-privacy-policy-generator.firebaseapp.com/

개인정보 처리방침 페이지를 웹사이트에 추가:
```
https://nutri8-6z1o.vercel.app/privacy
```

---

## 🐛 문제 해결

### 빌드 실패

**문제:** `eas build` 실패

**해결:**
```bash
# 캐시 삭제
eas build:clear cache

# 다시 시도
eas build --platform all --clear-cache
```

### Apple 심사 거부

**일반적인 거부 사유:**

1. **개인정보 처리방침 누락**
   - 해결: URL 추가

2. **앱 충돌**
   - 해결: TestFlight 베타 테스트

3. **스크린샷 불일치**
   - 해결: 실제 앱 화면과 일치하는 스크린샷

4. **메타데이터 불완전**
   - 해결: 모든 필드 작성

### Google Play 심사 거부

**일반적인 거부 사유:**

1. **타겟 API 레벨 미달**
   - 해결: `app.json`에서 `android.targetSdkVersion` 최신화

2. **권한 설명 부족**
   - 해결: `app.json`에서 권한 사용 이유 명시

3. **콘텐츠 등급 오류**
   - 해결: 설문지 다시 작성

---

## 📊 배포 체크리스트

### iOS App Store

- [ ] Apple Developer Account 등록 ($99)
- [ ] Bundle ID 설정
- [ ] 앱 아이콘 (1024x1024px)
- [ ] 스크린샷 (최소 3개)
- [ ] 개인정보 처리방침 URL
- [ ] 앱 설명 작성 (한국어/영어)
- [ ] EAS Build 완료
- [ ] App Store Connect 업로드
- [ ] 심사 제출

### Google Play Store

- [ ] Google Play Console 계정 ($25)
- [ ] Package name 설정
- [ ] 앱 아이콘 (512x512px)
- [ ] 스크린샷 (최소 2개)
- [ ] 기능 그래픽 (1024x500px)
- [ ] 개인정보 처리방침 URL
- [ ] 앱 설명 작성 (한국어/영어)
- [ ] 콘텐츠 등급 설정
- [ ] EAS Build 완료 (.aab)
- [ ] 프로덕션 트랙 업로드
- [ ] 출시 시작

---

## 💡 팁 & 추천사항

### 1. TestFlight 베타 테스트 (iOS)

배포 전 베타 테스터에게 먼저 공개:

```bash
eas build --platform ios --profile preview
eas submit --platform ios --latest
```

App Store Connect에서 "TestFlight" 탭으로 이동하여 테스터 초대

### 2. 내부 테스트 (Android)

Google Play Console에서 "내부 테스트" 트랙 사용:
- 빠른 심사 (수 시간)
- 최대 100명 테스터

### 3. 점진적 출시

처음에는 소수 사용자에게만 공개:
- Google Play: "프로덕션" → "출시 비율" 5% 설정
- iOS: "단계적 출시" 옵션 활성화

### 4. 크래시 모니터링

앱 안정성 추적:
- **Sentry:** https://sentry.io/
- **Firebase Crashlytics**
- **Bugsnag**

### 5. 분석 도구

사용자 행동 추적:
- **Google Analytics for Firebase**
- **Mixpanel**
- **Amplitude**

---

## 📚 참고 자료

### 공식 문서

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo EAS Submit](https://docs.expo.dev/submit/introduction/)
- [App Store Connect](https://developer.apple.com/app-store-connect/)
- [Google Play Console](https://support.google.com/googleplay/android-developer)

### 커뮤니티

- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://www.reactnative.dev/community/overview)

---

## 🎯 예상 타임라인

### 첫 배포:

| 작업 | 예상 시간 |
|------|-----------|
| 계정 생성 | 1-2일 |
| 앱 아이콘/스크린샷 준비 | 2-4시간 |
| 개인정보 처리방침 작성 | 1-2시간 |
| EAS Build 설정 | 30분 |
| 빌드 생성 | 30분 |
| 스토어 등록정보 작성 | 1-2시간 |
| iOS 심사 | 1-3일 |
| Android 심사 | 1-2일 |
| **총 소요 시간** | **약 1주일** |

### 업데이트 배포:

| 작업 | 예상 시간 |
|------|-----------|
| 코드 수정 | 작업량에 따라 |
| 빌드 생성 | 30분 |
| 스토어 제출 | 10분 |
| 심사 | 1-2일 |
| **총 소요 시간** | **1-3일** |

---

**배포 과정에서 질문이 있으면 언제든지 물어보세요!** 🚀

---

*최종 업데이트: 2026년 1월 19일*

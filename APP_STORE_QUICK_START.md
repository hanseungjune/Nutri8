# 📱 앱스토어 배포 - 빠른 시작 가이드

## 🎯 **30분 만에 시작하기**

---

## ✅ **Step 1: 준비 사항 확인**

### **필수:**
- [ ] ✅ EAS CLI 설치됨 (완료!)
- [ ] Expo 계정 (무료) - https://expo.dev/signup
- [ ] Node.js 설치 (완료!)

### **앱스토어 배포 시:**
- [ ] Apple Developer Account ($99/년)
- [ ] Google Play Console ($25 일회성)

---

## 🚀 **Step 2: Expo 계정 로그인**

### **새 터미널 창을 열고 실행:**

```bash
cd C:\Users\DELL\Desktop\Nutri8
eas login
```

### **Expo 계정이 없다면:**

1. 브라우저에서 https://expo.dev/signup 접속
2. GitHub/Google/이메일로 가입
3. 위 명령어로 로그인

---

## 📦 **Step 3: 프로젝트 초기화**

```bash
eas build:configure
```

질문에 답변:
```
? Select a platform: All (iOS, Android)
```

이미 `eas.json` 파일이 생성되어 있습니다! ✅

---

## 🍎 **Step 4: iOS 빌드 (선택)**

### **필요 조건:**
- Apple Developer Account
- $99/년 결제
- Bundle ID: `com.nutri8.app`

### **빌드 명령어:**

```bash
eas build --platform ios --profile production
```

⏱️ 예상 시간: **15-30분**

---

## 🤖 **Step 5: Android 빌드 (선택)**

### **필요 조건:**
- Google Play Console Account
- $25 일회성 결제
- Package: `com.nutri8.app`

### **빌드 명령어:**

```bash
eas build --platform android --profile production
```

⏱️ 예상 시간: **15-30분**

---

## 🎨 **Step 6: 앱 아이콘 준비 (중요!)**

### **현재 상태:**

프로젝트에 이미 다음 파일이 있어야 합니다:
```
assets/
  ├── icon.png (1024x1024px)
  ├── splash-icon.png (스플래시)
  ├── adaptive-icon.png (Android)
  └── favicon.png (웹)
```

### **아이콘이 없다면:**

#### **옵션 1: 온라인 생성 도구**
- https://www.canva.com/ (무료)
- https://www.figma.com/ (무료)
- https://www.appicon.co/

#### **옵션 2: AI 생성**
- DALL-E 3
- Midjourney
- Stable Diffusion

#### **프롬프트 예시:**
```
A modern, minimalist app icon for a nutrition tracking app named "Nutri8". 
Features a fork and knife forming the number 8, with vibrant green color (#4CAF50). 
Clean design, flat style, suitable for iOS and Android app stores.
```

---

## 📸 **Step 7: 스크린샷 준비**

### **필요한 스크린샷:**

#### **iOS App Store:**
- 6.7" Display (iPhone 15 Pro Max): 1290 x 2796px
- 5.5" Display: 1242 x 2208px
- 최소 3개, 최대 10개

#### **Google Play Store:**
- 휴대전화: 1080 x 1920px 이상
- 최소 2개, 최대 8개

### **촬영할 화면:**
1. 🏠 메인 대시보드 (홈)
2. ✏️ 식단 입력 화면
3. 📊 통계/그래프 화면
4. 📅 히스토리 화면
5. ⚙️ 설정 화면

### **스크린샷 생성 방법:**

#### **웹 버전에서 캡처:**

1. 앱 실행:
   ```bash
   npm start
   # w를 눌러 웹 브라우저 열기
   ```

2. Chrome DevTools 열기 (F12)

3. 모바일 화면 에뮬레이션:
   - Ctrl+Shift+M (Windows)
   - Cmd+Shift+M (Mac)

4. 기기 선택:
   - iPhone 15 Pro Max (iOS)
   - Pixel 7 (Android)

5. 스크린샷 캡처:
   - Chrome: Ctrl+Shift+P → "Capture screenshot"

#### **온라인 도구로 꾸미기:**
- https://previewed.app/ (무료)
- https://mockuphone.com/ (무료)
- https://smartmockups.com/

---

## 📝 **Step 8: 스토어 등록정보 작성**

### **앱 이름:**
```
Nutri8
```

### **부제 (iOS) / 간단한 설명 (Android):**
```
AI 기반 칼로리 추적 & 식단 관리
```

### **설명:**

```
🍽️ Nutri8 - 스마트 식단 관리 앱

Nutri8은 AI 기술을 활용한 간편한 칼로리 추적 및 식단 관리 앱입니다.

✨ 주요 기능

📝 간편한 식단 기록
• 아침, 점심, 저녁, 간식 자동 분류
• 날짜별 식단 히스토리 확인

🤖 AI 영양 분석
• 음식 이름 입력만으로 자동 칼로리 계산
• 단백질, 탄수화물, 지방 영양소 분석

📸 사진 첨부
• 식사 사진 저장 및 관리

📊 상세한 통계
• 일일/주간/월간 칼로리 추이
• 영양소 밸런스 그래프

🎯 체중 관리
• 목표 설정 및 추적

Nutri8과 함께 건강한 식습관을 시작하세요! 💪
```

### **키워드 (iOS, 쉼표로 구분):**
```
calorie, diet, food, nutrition, health, fitness, weight, meal, tracker, AI, 칼로리, 식단, 영양
```

### **카테고리:**
```
Health & Fitness
```

---

## 🔐 **Step 9: 개인정보 처리방침**

### **필수!** 두 스토어 모두 개인정보 처리방침 URL이 필요합니다.

#### **옵션 1: 웹사이트에 페이지 추가**

Vercel 배포된 사이트에 추가:
```
https://nutri8-6z1o.vercel.app/privacy
```

#### **옵션 2: GitHub Pages**

프로젝트에 `PRIVACY_POLICY.md` 파일 추가 후 GitHub Pages로 공개

#### **옵션 3: 온라인 생성 도구**
- https://app-privacy-policy-generator.firebaseapp.com/
- https://www.freeprivacypolicy.com/

#### **포함해야 할 내용:**
1. 수집하는 정보: 이메일, 식단 기록, 체중
2. 사용 목적: 서비스 제공
3. 저장 위치: Supabase
4. 제3자 공유: Google OAuth, Gemini API
5. 데이터 삭제 요청 방법

---

## 🍎 **Step 10: iOS App Store 제출**

### **1. Apple Developer 등록**
- https://developer.apple.com
- $99/년 결제
- 1-2일 승인 대기

### **2. App Store Connect 설정**
- https://appstoreconnect.apple.com
- "My Apps" → "+" → "New App"
- Bundle ID: `com.nutri8.app`

### **3. 빌드 업로드**

```bash
# 자동 제출
eas submit --platform ios --latest

# 또는 수동 제출
# 1. EAS Dashboard에서 .ipa 다운로드
# 2. Mac에서 Transporter 앱으로 업로드
```

### **4. 스토어 정보 입력**
- 앱 이름, 설명
- 스크린샷 (최소 3개)
- 개인정보 처리방침 URL
- 카테고리: Health & Fitness

### **5. 심사 제출**
- "Submit for Review" 클릭
- ⏱️ 심사 기간: 1-3일

---

## 🤖 **Step 11: Google Play Store 제출**

### **1. Google Play Console 등록**
- https://play.google.com/console
- $25 일회성 결제
- 즉시 활성화

### **2. 앱 만들기**
- "앱 만들기" 클릭
- Package: `com.nutri8.app`

### **3. 빌드 업로드**

```bash
# 자동 제출 (추천)
eas submit --platform android --latest

# 또는 수동 제출
# 1. EAS Dashboard에서 .aab 다운로드
# 2. Play Console에서 수동 업로드
```

### **4. 앱 콘텐츠 설정**
- 앱 액세스: 무료
- 광고: 없음
- 콘텐츠 등급: 만 3세 이상
- 타겟층: 13세 이상
- 개인정보 처리방침 URL

### **5. 스토어 등록정보**
- 앱 이름, 설명
- 스크린샷 (최소 2개)
- 앱 아이콘 (512x512px)

### **6. 프로덕션 출시**
- "프로덕션" 트랙 선택
- 출시 버전 만들기
- ⏱️ 심사 기간: 1-2일

---

## 🎯 **요약: 필수 명령어**

```bash
# 1. Expo 로그인
eas login

# 2. 프로젝트 초기화 (이미 완료!)
# eas build:configure

# 3. iOS 빌드
eas build --platform ios --profile production

# 4. Android 빌드
eas build --platform android --profile production

# 5. iOS 제출
eas submit --platform ios --latest

# 6. Android 제출
eas submit --platform android --latest

# 7. 빌드 상태 확인
eas build:list

# 8. 빌드 로그 보기
eas build:view [BUILD_ID]
```

---

## 💡 **팁**

### **1. 테스트 빌드 먼저**

프로덕션 배포 전 preview 빌드로 테스트:

```bash
# Preview 빌드 (내부 테스트용)
eas build --platform all --profile preview
```

### **2. 무료 플랜 제한**

EAS Build 무료 플랜: 월 30빌드
- 신중하게 빌드 생성
- 로컬에서 충분히 테스트 후 빌드

### **3. 빌드 실패 시**

```bash
# 캐시 삭제 후 다시 시도
eas build --platform all --clear-cache
```

### **4. 환경 변수 설정**

EAS Build에 환경 변수 추가:

```bash
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "your-url"
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-key"
```

또는 `eas.json`에 추가:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "your-url"
      }
    }
  }
}
```

---

## 📊 **진행 상황 체크리스트**

### **준비 단계**
- [x] ✅ EAS CLI 설치
- [x] ✅ `app.json` 설정
- [x] ✅ `eas.json` 생성
- [ ] Expo 계정 로그인
- [ ] 앱 아이콘 준비
- [ ] 스크린샷 준비
- [ ] 개인정보 처리방침 작성

### **iOS 배포**
- [ ] Apple Developer 등록
- [ ] iOS 빌드 생성
- [ ] App Store Connect 설정
- [ ] 빌드 업로드
- [ ] 스토어 정보 입력
- [ ] 심사 제출

### **Android 배포**
- [ ] Google Play Console 등록
- [ ] Android 빌드 생성
- [ ] 앱 콘텐츠 설정
- [ ] 스토어 등록정보 입력
- [ ] 프로덕션 출시

---

## ❓ **다음 단계**

### **지금 바로 시작:**

1. **새 PowerShell 터미널 열기**

2. **Expo 로그인:**
   ```bash
   cd C:\Users\DELL\Desktop\Nutri8
   eas login
   ```

3. **빌드 생성 (무료!):**
   ```bash
   eas build --platform android --profile preview
   ```

4. **빌드 상태 확인:**
   - https://expo.dev 접속
   - Projects → Nutri8 → Builds

---

## 📚 **더 자세한 내용**

전체 가이드: `APP_STORE_DEPLOY_GUIDE.md`

---

**준비되셨나요? 새 터미널 창을 열고 `eas login`부터 시작하세요!** 🚀

---

*최종 업데이트: 2026년 1월 19일*

# 🚀 Nutri8 빌드 및 배포 가이드

## 📋 **목차**

1. [개발 환경 실행](#개발-환경-실행)
2. [웹 빌드](#웹-빌드)
3. [Android 빌드](#android-빌드)
4. [iOS 빌드](#ios-빌드)
5. [배포](#배포)
6. [문제 해결](#문제-해결)

---

## 🔧 **개발 환경 실행**

### **Prerequisites**
- Node.js 18 이상
- npm 또는 yarn
- Expo CLI

### **설치 및 실행**
```bash
# 1. 저장소 클론
git clone [repository-url]
cd Nutri8

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
# .env 파일 생성 (env.example.txt 참고)
cp env.example.txt .env

# .env 파일 편집
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GEMINI_API_KEY=your-gemini-key (선택사항)

# 4. 개발 서버 시작
npm start

# 5. 플랫폼 선택
# - Web: 'w' 키
# - Android: 'a' 키 (Android Emulator 필요)
# - iOS: 'i' 키 (Mac + Xcode 필요)
```

---

## 🌐 **웹 빌드**

### **방법 1: Expo Export (정적 사이트)**
```bash
# 웹용 정적 파일 생성 (Metro 번들러 사용)
npx expo export --platform web

# 결과물: dist/ 폴더 (기본값)
# 이 폴더를 호스팅 서비스에 업로드

# 출력 디렉토리 지정하려면:
npx expo export --platform web --output-dir web-build
```

**주의**: 현재 프로젝트는 Metro 번들러를 사용합니다 (`app.json`에서 `"bundler": "metro"` 설정).
- `expo export:web`은 Webpack 전용이므로 작동하지 않습니다
- 대신 `expo export --platform web`을 사용하세요

### **호스팅 옵션**

#### **Vercel (추천)**
```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

#### **Netlify**
```bash
# 1. Netlify CLI 설치
npm install -g netlify-cli

# 2. 빌드
npx expo export --platform web --output-dir web-build

# 3. 배포
netlify deploy --prod --dir web-build
```

#### **GitHub Pages**
```bash
# 1. 빌드
npx expo export --platform web --output-dir web-build

# 2. gh-pages 설치
npm install -g gh-pages

# 3. 배포
gh-pages -d web-build
```

---

## 📱 **Android 빌드**

### **방법 1: EAS Build (추천)**

#### **Setup**
```bash
# 1. EAS CLI 설치
npm install -g eas-cli

# 2. Expo 계정 로그인
eas login

# 3. 프로젝트 설정
eas build:configure
```

#### **Preview Build (테스트용 APK)**
```bash
# APK 생성 (Google Play 없이 설치 가능)
eas build --platform android --profile preview

# 완료 후 다운로드 링크 제공됨
# QR 코드로 직접 설치 가능
```

#### **Production Build (스토어 배포용)**
```bash
# AAB 생성 (Google Play Store 업로드용)
eas build --platform android --profile production
```

### **방법 2: 로컬 빌드**

#### **Prerequisites**
- Android Studio
- JDK 11 이상
- Android SDK

#### **빌드 명령어**
```bash
# 1. 네이티브 프로젝트 생성
npx expo prebuild --platform android

# 2. Android Studio에서 열기
# android/ 폴더를 Android Studio로 오픈

# 3. Build > Generate Signed Bundle / APK
# 또는 터미널에서:
cd android
./gradlew assembleRelease

# 결과물: android/app/build/outputs/apk/release/app-release.apk
```

---

## 🍎 **iOS 빌드**

### **Prerequisites**
- macOS
- Xcode 14 이상
- Apple Developer Account ($99/year)

### **방법 1: EAS Build (추천)**

#### **Simulator Build (테스트용)**
```bash
eas build --platform ios --profile preview
```

#### **Production Build (App Store 배포용)**
```bash
eas build --platform ios --profile production
```

### **방법 2: 로컬 빌드**

#### **빌드 명령어**
```bash
# 1. 네이티브 프로젝트 생성
npx expo prebuild --platform ios

# 2. Xcode에서 열기
open ios/Nutri8.xcworkspace

# 3. Xcode에서:
# - Signing & Capabilities 설정
# - Product > Archive
# - Distribute App
```

---

## 🌟 **배포**

### **Google Play Store**

#### **1. Google Play Console 설정**
```
1. https://play.google.com/console 접속
2. 앱 만들기
3. 앱 정보 입력:
   - 앱 이름: Nutri8
   - 기본 언어: 한국어
   - 카테고리: 건강 및 피트니스
```

#### **2. 앱 콘텐츠 준비**
- 스크린샷 (최소 2개)
- 앱 아이콘 (512x512 PNG)
- 설명 (짧은 설명, 전체 설명)
- 개인정보처리방침 URL

#### **3. AAB 업로드**
```bash
# 1. Production 빌드
eas build --platform android --profile production

# 2. 다운로드 받은 .aab 파일을 Play Console에 업로드
```

#### **4. 검토 제출**
- 내부 테스트 → 비공개 테스트 → 프로덕션

---

### **Apple App Store**

#### **1. App Store Connect 설정**
```
1. https://appstoreconnect.apple.com 접속
2. 나의 앱 > + 아이콘 클릭
3. 앱 정보 입력:
   - 이름: Nutri8
   - 기본 언어: 한국어
   - 번들 ID: com.yourcompany.nutri8
   - SKU: nutri8
```

#### **2. 앱 정보 준비**
- 스크린샷 (iPhone, iPad)
- 앱 미리보기 (선택사항)
- 설명
- 키워드
- 지원 URL
- 개인정보처리방침 URL

#### **3. IPA 업로드**
```bash
# 1. Production 빌드
eas build --platform ios --profile production

# 2. 자동으로 App Store Connect에 업로드됨
# 또는 Xcode의 Organizer에서 수동 업로드
```

#### **4. TestFlight & 검토 제출**
- TestFlight 베타 테스트
- App Review 제출

---

## 🔑 **EAS 설정 파일 (eas.json)**

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 🔧 **앱 정보 (app.json)**

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
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.nutri8"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.nutri8"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## 🐛 **문제 해결**

### **빌드 오류**

#### **"AAPT: error: resource ... not found"**
```bash
# Android 빌드 캐시 삭제
cd android
./gradlew clean
cd ..
npx expo prebuild --clean
```

#### **"No matching provisioning profile found"** (iOS)
```
해결:
1. Xcode에서 Signing & Capabilities 확인
2. Automatically manage signing 체크
3. 팀 선택
```

### **환경 변수 문제**
```bash
# .env 파일이 빌드에 포함되지 않음
# app.json에 환경 변수 추가:

{
  "expo": {
    "extra": {
      "supabaseUrl": "$EXPO_PUBLIC_SUPABASE_URL",
      "supabaseKey": "$EXPO_PUBLIC_SUPABASE_ANON_KEY"
    }
  }
}

# 코드에서 사용:
import Constants from 'expo-constants';
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
```

### **이미지 최적화**
```bash
# 이미지 압축 (빌드 크기 감소)
npm install -g sharp-cli

# 모든 이미지 최적화
npx sharp -i assets/**/*.png -o assets-optimized/ --format webp
```

---

## 📊 **빌드 크기 최적화**

### **1. 사용하지 않는 패키지 제거**
```bash
npm prune --production
```

### **2. Metro bundler 설정**
```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.transformer.minifierConfig = {
    keep_classnames: false,
    keep_fnames: false,
    mangle: {
      keep_classnames: false,
      keep_fnames: false,
    },
  };

  return config;
})();
```

### **3. ProGuard (Android)**
```gradle
// android/app/build.gradle
buildTypes {
  release {
    minifyEnabled true
    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
  }
}
```

---

## 🎉 **배포 체크리스트**

### **배포 전**
- [ ] 모든 API 키 확인
- [ ] 테스트 데이터 제거
- [ ] 버전 번호 업데이트
- [ ] 개인정보처리방침 작성
- [ ] 스크린샷 준비
- [ ] 앱 설명 작성

### **배포 후**
- [ ] 스토어 링크 테스트
- [ ] 다운로드 확인
- [ ] 리뷰 모니터링
- [ ] 크래시 리포트 확인
- [ ] 사용자 피드백 수집

---

## 📚 **참고 자료**

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com/)

---

**성공적인 배포를 기원합니다!** 🚀✨

---

*최종 업데이트: 2026년 1월 17일*

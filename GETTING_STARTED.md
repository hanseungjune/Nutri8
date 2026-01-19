# 🚀 Nutri8 시작 가이드

## 환경 준비 완료! ✅

1주차의 **환경 구축 및 네비게이션 설계**가 완료되었습니다.

## 📦 설치된 패키지

### 핵심 패키지
- ✅ **expo** (~54.0.31) - React Native 프레임워크
- ✅ **expo-router** (~6.0.21) - 파일 기반 네비게이션
- ✅ **zustand** (^5.0.10) - 상태 관리
- ✅ **expo-sqlite** (^16.0.10) - 로컬 데이터베이스
- ✅ **typescript** (~5.9.2) - 타입 안정성

### UI 관련
- ✅ **react-native-paper** (^5.14.5) - Material Design 컴포넌트
- ✅ **nativewind** (^4.2.1) - Tailwind CSS for React Native
- ✅ **@expo/vector-icons** - 아이콘 라이브러리

## 🏗 완성된 프로젝트 구조

```
Nutri8/
├── app/                      ✅ Expo Router 페이지
│   ├── _layout.tsx          ✅ Root Layout
│   └── (tabs)/              ✅ Tab Navigation
│       ├── _layout.tsx      ✅ 홈/입력/기록 탭 설정
│       ├── index.tsx        ✅ 홈 화면
│       ├── input.tsx        ✅ 식단 입력 화면
│       └── history.tsx      ✅ 기록 조회 화면
│
├── stores/                   ✅ Zustand 스토어
│   ├── mealStore.ts         ✅ 식단 관리
│   └── goalStore.ts         ✅ 목표 관리
│
├── utils/db/                 ✅ DB 유틸리티 (callback 패턴)
│   ├── database.ts          ✅ Execute 메서드 구현
│   ├── schema.ts            ✅ 테이블 스키마
│   └── queries.ts           ✅ 쿼리 헬퍼
│
├── types/                    ✅ TypeScript 타입 정의
├── constants/                ✅ 색상 및 설정 상수
├── ROADMAP.md               ✅ 8주 개발 계획
└── README.md                ✅ 프로젝트 문서
```

## 🎯 현재 완료 상황

### ✅ 1주차 완료 항목
1. **프로젝트 초기 설정**
   - Expo 프로젝트 생성
   - TypeScript 설정
   - 필수 패키지 설치

2. **네비게이션 구조**
   - Expo Router 설정
   - Tab Navigation 구현
   - 3개 화면 (홈/입력/기록) 기본 UI

3. **기반 코드 작성**
   - TypeScript 타입 정의
   - Zustand 스토어 기본 구조
   - DB 유틸리티 틀 (callback 패턴)
   - 상수 및 설정 파일

4. **문서화**
   - 8주 로드맵 (ROADMAP.md)
   - 프로젝트 구조 설명 (PROJECT_STRUCTURE.md)
   - README 및 시작 가이드

## 🚀 앱 실행하기

### 1. 개발 서버 시작
```bash
npm start
```

이 명령을 실행하면 QR 코드가 표시됩니다.

### 2. 플랫폼별 실행

#### 📱 모바일에서 테스트 (권장)
1. **Expo Go** 앱을 다운로드하세요
   - [iOS App Store](https://apps.apple.com/app/apple-store/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. QR 코드 스캔
   - iOS: 카메라 앱으로 스캔
   - Android: Expo Go 앱에서 스캔

#### 💻 에뮬레이터/시뮬레이터
```bash
# Android 에뮬레이터
npm run android

# iOS 시뮬레이터 (Mac만 가능)
npm run ios
```

#### 🌐 웹 브라우저
```bash
npm run web
```

## 📱 앱 화면 구성

### 🏠 홈 화면 (index)
- 오늘의 칼로리 요약
- 주간 진행 상황
- 빠른 팁

### ➕ 입력 화면 (input)
- 식사 시간 선택 (아침/점심/저녁/간식)
- 음식명 입력
- 칼로리 입력
- 등록 버튼

### 📊 기록 화면 (history)
- 식단 기록 목록
- 통계 정보
- 빈 상태 UI

## 🎨 디자인 시스템

### 컬러
- **Primary**: `#4CAF50` (그린) 🟢
- **Secondary**: `#2196F3` (블루) 🔵
- **Accent**: `#FF9800` (오렌지) 🟠
- **Background**: `#F5F5F5` (연한 회색)

### 아이콘
- MaterialCommunityIcons 사용
- 홈: `home`
- 입력: `plus-circle`
- 기록: `history`

## 🔧 개발 팁

### 1. Hot Reload
- 코드를 수정하면 자동으로 앱이 새로고침됩니다
- 저장(Ctrl+S / Cmd+S)만 하면 됩니다

### 2. 개발자 메뉴
- iOS: `Cmd+D`
- Android: `Cmd+M` (Mac) 또는 `Ctrl+M` (Windows)
- 흔들기로도 열 수 있습니다

### 3. 콘솔 로그 확인
- 터미널에서 확인
- 또는 React Native Debugger 사용

## 📅 다음 단계 (2주차)

### 주요 작업
1. **SQLite 데이터베이스 연동**
   - callback 패턴 execute 메서드 완성
   - 테이블 생성 및 초기화
   - 마이그레이션 로직

2. **CRUD 기능 구현**
   - 식단 입력 → DB 저장
   - 식단 조회 → DB에서 불러오기
   - 식단 수정/삭제 기능

3. **Zustand와 DB 연동**
   - Store에서 DB 쿼리 호출
   - 상태 자동 업데이트

### 준비 사항
- `utils/db/database.ts`의 `execute` 메서드 구현
- `utils/db/schema.ts`의 테이블 생성 쿼리 실행
- `utils/db/queries.ts`의 쿼리 함수 완성

## 📚 참고할 파일

### 코드 스타일 참고
- `utils/db/database.ts` - callback 패턴 execute 메서드
- `stores/mealStore.ts` - Zustand 스토어 구조
- `types/index.ts` - TypeScript 타입 정의

### 화면 구현 참고
- `app/(tabs)/index.tsx` - 카드 레이아웃
- `app/(tabs)/input.tsx` - 폼 입력 UI
- `app/(tabs)/history.tsx` - 리스트 UI

## ❓ 문제 해결

### 앱이 실행되지 않을 때
1. 의존성 재설치
   ```bash
   rm -rf node_modules
   npm install
   ```

2. 캐시 클리어
   ```bash
   npm start -- --clear
   ```

### TypeScript 오류
```bash
npx tsc --noEmit
```

### Metro 번들러 오류
```bash
npm start -- --reset-cache
```

## 🎉 축하합니다!

1주차 **환경 구축 및 네비게이션 설계**가 완료되었습니다!

이제 앱을 실행하고 3개의 화면을 탐색해보세요.
2주차에는 실제로 데이터를 저장하고 불러오는 기능을 구현할 예정입니다.

---

**질문이나 문제가 있으면 언제든지 물어보세요!** 💪

다음 단계: `ROADMAP.md`에서 2주차 계획을 확인하세요.

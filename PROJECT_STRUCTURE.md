# Nutri8 프로젝트 구조

## 📁 디렉토리 구조

```
Nutri8/
├── app/                          # Expo Router 페이지 (파일 기반 라우팅)
│   ├── _layout.tsx              # Root Layout
│   └── (tabs)/                  # Tab Navigation 그룹
│       ├── _layout.tsx          # Tab Layout 설정
│       ├── index.tsx            # 홈 화면 (오늘의 요약)
│       ├── input.tsx            # 식단 입력 화면
│       └── history.tsx          # 기록 조회 화면
│
├── assets/                       # 정적 리소스
│   ├── icon.png                 # 앱 아이콘
│   ├── splash-icon.png          # 스플래시 스크린
│   ├── adaptive-icon.png        # Android 어댑티브 아이콘
│   └── favicon.png              # 웹 파비콘
│
├── components/                   # 재사용 가능한 컴포넌트 (TODO: 향후 추가)
│   ├── common/                  # 공통 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── meal/                    # 식단 관련 컴포넌트
│   │   ├── MealCard.tsx
│   │   └── MealList.tsx
│   └── chart/                   # 차트 컴포넌트
│       ├── CalorieChart.tsx
│       └── WeightChart.tsx
│
├── constants/                    # 상수 정의
│   ├── colors.ts                # 컬러 팔레트
│   └── config.ts                # 앱 설정 상수
│
├── stores/                       # Zustand 상태 관리
│   ├── mealStore.ts             # 식단 관리 스토어
│   └── goalStore.ts             # 목표 관리 스토어
│
├── types/                        # TypeScript 타입 정의
│   └── index.ts                 # 공통 타입 (Meal, Goal, WeightRecord 등)
│
├── utils/                        # 유틸리티 함수
│   └── db/                      # 데이터베이스 관련
│       ├── database.ts          # DB 유틸리티 (callback 패턴)
│       ├── schema.ts            # 테이블 스키마 정의
│       └── queries.ts           # 쿼리 헬퍼 함수
│
├── .gitignore                    # Git 무시 파일
├── app.json                      # Expo 앱 설정
├── global.css                    # Tailwind CSS 글로벌 스타일
├── metro.config.js               # Metro 번들러 설정
├── package.json                  # 프로젝트 의존성
├── PROJECT_STRUCTURE.md          # 이 파일
├── README.md                     # 프로젝트 소개
├── ROADMAP.md                    # 8주 개발 로드맵
├── tailwind.config.js            # Tailwind CSS 설정
└── tsconfig.json                 # TypeScript 설정
```

## 🗂 주요 파일 설명

### 네비게이션 (app/)

#### `app/_layout.tsx`
- 앱의 최상위 레이아웃
- Stack Navigator 설정
- StatusBar 설정

#### `app/(tabs)/_layout.tsx`
- Tab Navigator 설정
- 탭 아이콘 및 라벨 정의
- 각 탭의 헤더 스타일 설정

#### `app/(tabs)/index.tsx` - 홈 화면
- 오늘의 칼로리 요약
- 주간 진행 상황
- 빠른 팁 표시

#### `app/(tabs)/input.tsx` - 식단 입력
- 식사 시간 선택 (아침/점심/저녁/간식)
- 음식명 및 칼로리 입력
- DB 저장 기능 (2주차에 연동 예정)

#### `app/(tabs)/history.tsx` - 기록 조회
- 날짜별 식단 기록 목록
- 통계 정보 표시
- 빈 상태 UI

### 상태 관리 (stores/)

#### `stores/mealStore.ts`
- 식단 데이터 관리
- CRUD 작업 메서드
- 로딩 및 에러 상태 관리

#### `stores/goalStore.ts`
- 목표 설정 관리
- 진행률 계산
- 5주차에 본격 구현 예정

### 데이터베이스 (utils/db/)

#### `utils/db/database.ts`
- **핵심**: callback 패턴의 `execute` 메서드
- 데이터베이스 초기화
- 트랜잭션 지원
- 싱글톤 패턴으로 인스턴스 관리

**Execute 메서드 사용 예시:**
```typescript
database.execute<Meal[]>(
  'SELECT * FROM meals WHERE date = ?',
  [date],
  {
    onSuccess: (meals) => {
      console.log('Meals loaded:', meals);
    },
    onError: (error) => {
      console.error('Failed to load meals:', error);
    }
  }
);
```

#### `utils/db/schema.ts`
- 테이블 생성 쿼리 정의
- 인덱스 정의
- 마이그레이션 쿼리 (추후 추가)

#### `utils/db/queries.ts`
- CRUD 작업을 위한 헬퍼 함수
- MealQueries, GoalQueries, WeightRecordQueries
- callback 패턴으로 일관성 있게 구현

### 타입 정의 (types/)

#### `types/index.ts`
- `Meal`: 식단 기록 타입
- `Goal`: 목표 설정 타입
- `WeightRecord`: 체중 기록 타입
- `UserProfile`: 사용자 프로필 타입
- `MealType`: 식사 타입 ('breakfast' | 'lunch' | 'dinner' | 'snack')

### 상수 (constants/)

#### `constants/colors.ts`
- 앱 전역 컬러 팔레트
- Primary, Secondary, Accent 색상
- 텍스트, 상태, UI 색상

#### `constants/config.ts`
- 앱 설정 값
- 기본 목표 칼로리
- DB 이름 및 버전
- 날짜 포맷
- 식사 타입 라벨

## 🔄 데이터 플로우

### 식단 입력 플로우 (예정)
```
1. 사용자가 input 화면에서 식단 입력
   ↓
2. mealStore.addMeal() 호출
   ↓
3. MealQueries.insert() 호출 (callback 패턴)
   ↓
4. database.execute()로 DB에 저장
   ↓
5. onSuccess 콜백에서 상태 업데이트
   ↓
6. UI 자동 새로고침
```

### 기록 조회 플로우 (예정)
```
1. history 화면 마운트
   ↓
2. mealStore.loadMeals(date) 호출
   ↓
3. MealQueries.getByDate() 호출
   ↓
4. database.execute()로 DB에서 조회
   ↓
5. onSuccess 콜백에서 데이터를 스토어에 저장
   ↓
6. 컴포넌트가 스토어 구독하여 자동 렌더링
```

## 🎯 1주차 완료 상태

### ✅ 완료된 작업
- [x] Expo 프로젝트 생성
- [x] 필수 패키지 설치
  - expo-router
  - zustand
  - expo-sqlite
  - nativewind
  - react-native-paper
- [x] Tab Navigation 구조 구현
- [x] 기본 화면 레이아웃 (Home, Input, History)
- [x] 타입 정의 완료
- [x] Zustand 스토어 기본 구조
- [x] DB 유틸리티 기본 구조 (callback 패턴)
- [x] 스키마 및 쿼리 헬퍼 틀 작성
- [x] 상수 파일 작성
- [x] 8주 로드맵 문서 작성
- [x] 프로젝트 README 작성

### 🔜 다음 단계 (2주차)
- [ ] NativeWind 스타일 적용 (선택사항)
- [ ] SQLite DB 실제 연동
- [ ] callback 패턴 execute 메서드 완성
- [ ] 테이블 생성 및 마이그레이션
- [ ] CRUD 작업 완성

## 📝 개발 가이드

### 새로운 화면 추가하기
1. `app/` 디렉토리에 파일 생성
2. 파일명이 라우트 경로가 됨
3. 예: `app/(tabs)/settings.tsx` → `/settings` 경로

### 새로운 스토어 추가하기
1. `stores/` 디렉토리에 파일 생성
2. Zustand의 `create` 함수 사용
3. 타입 정의와 함께 작성

### DB 쿼리 추가하기
1. `utils/db/queries.ts`에 쿼리 함수 추가
2. callback 패턴 사용
3. `onSuccess`, `onError` 콜백 정의

### 타입 추가하기
1. `types/index.ts`에 interface 또는 type 추가
2. export하여 다른 파일에서 사용

## 🚀 실행 방법

```bash
# 개발 서버 시작
npm start

# Android 에뮬레이터 실행
npm run android

# iOS 시뮬레이터 실행 (Mac만)
npm run ios

# 웹 브라우저 실행
npm run web
```

## 📚 참고 문서

- [Expo Router 공식 문서](https://docs.expo.dev/router/introduction/)
- [Zustand 공식 문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [expo-sqlite 공식 문서](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [NativeWind 공식 문서](https://www.nativewind.dev/)

---

**마지막 업데이트**: 2026년 1월 16일

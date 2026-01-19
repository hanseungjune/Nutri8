# Nutri8 프로젝트 8주 개발 로드맵

> **프로젝트명**: Nutri8 - 다이어트 관리 앱  
> **프레임워크**: Expo (React Native)  
> **언어**: TypeScript  
> **상태 관리**: Zustand  
> **네비게이션**: Expo Router  
> **스타일링**: NativeWind / React Native Paper  
> **로컬 DB**: expo-sqlite

---

## 📋 전체 개발 일정 개요

| 주차 | 주제 | 주요 목표 |
|-----|------|----------|
| 1주차 | 환경 구축 및 네비게이션 | 프로젝트 초기 설정, Tab Navigation 구현 |
| 2주차 | 데이터베이스 설계 및 구현 | SQLite 스키마 설계, DB 유틸리티 구현 |
| 3주차 | 식단 입력 기능 | 음식 입력 폼, 칼로리 계산, DB 저장 |
| 4주차 | 기록 조회 및 통계 | 일별/주별 통계, 차트 구현 |
| 5주차 | 목표 설정 및 관리 | 체중 목표, 칼로리 목표 설정 |
| 6주차 | UI/UX 개선 및 리팩토링 | 디자인 개선, 코드 최적화 |
| 7주차 | 추가 기능 구현 | 사진 첨부, 알림 기능 등 |
| 8주차 | 테스트 및 배포 준비 | 버그 수정, 성능 최적화, 빌드 |

---

## 🎯 주차별 상세 계획

### 1주차: 환경 구축 및 네비게이션 설계

#### 목표
- [x] Expo 프로젝트 생성 및 초기 설정
- [x] 필요한 패키지 설치 (Expo Router, Zustand, expo-sqlite, NativeWind)
- [x] Tab Navigation 구조 구현 (Home, Input, History)
- [ ] NativeWind 또는 React Native Paper 스타일링 시스템 적용
- [ ] 기본 화면 레이아웃 완성

#### 주요 작업
1. **프로젝트 초기 설정**
   - `npx create-expo-app@latest Nutri8`
   - TypeScript 설정
   - 필수 의존성 설치

2. **네비게이션 구조**
   ```
   app/
   ├── _layout.tsx          # Root layout
   └── (tabs)/              # Tab group
       ├── _layout.tsx      # Tab navigation
       ├── index.tsx        # Home 화면
       ├── input.tsx        # 식단 입력 화면
       └── history.tsx      # 기록 조회 화면
   ```

3. **기본 화면 구현**
   - Home: 오늘의 칼로리 요약, 진행 상황
   - Input: 식단 입력 폼 (UI만)
   - History: 기록 목록 (UI만)

#### 완료 기준
- 앱이 에러 없이 실행됨
- 3개의 탭 간 이동이 정상 동작
- 각 화면의 기본 레이아웃이 완성됨

---

### 2주차: 데이터베이스 설계 및 구현

#### 목표
- SQLite 데이터베이스 스키마 설계
- callback 패턴의 execute 메서드를 활용한 DB 유틸리티 구현
- 테이블 생성 및 마이그레이션 로직 구현
- CRUD 작업을 위한 DB 헬퍼 함수 작성

#### 주요 작업
1. **데이터베이스 스키마 설계**
   - `meals` 테이블: 식단 기록
     - id, date, meal_type, food_name, calories, protein, carbs, fat, created_at
   - `goals` 테이블: 목표 설정
     - id, target_weight, target_calories, start_date, end_date
   - `weight_records` 테이블: 체중 기록
     - id, date, weight, created_at

2. **DB 유틸리티 구현**
   ```typescript
   // utils/db/database.ts
   // callback 패턴의 execute 메서드 구현
   class Database {
     execute<T>(
       query: string,
       params: any[],
       callback: (result: T) => void,
       errorCallback?: (error: Error) => void
     ): void
   }
   ```

3. **DB 초기화 및 마이그레이션**
   - 앱 시작 시 테이블 생성
   - 버전 관리 및 마이그레이션 로직

#### 완료 기준
- DB 연결 및 테이블 생성 성공
- CRUD 작업이 정상적으로 동작
- 에러 핸들링이 적절히 구현됨

---

### 3주차: 식단 입력 기능 구현

#### 목표
- 식단 입력 폼 완성
- DB에 데이터 저장 기능 구현
- Zustand를 활용한 상태 관리
- 입력 데이터 유효성 검증

#### 주요 작업
1. **식단 입력 UI 개선**
   - 식사 시간 선택 (아침/점심/저녁/간식)
   - 음식명, 칼로리 입력
   - 추가 영양소 입력 (선택사항: 단백질, 탄수화물, 지방)
   - 날짜 선택 기능

2. **Zustand 스토어 구현**
   ```typescript
   // stores/mealStore.ts
   interface MealStore {
     meals: Meal[];
     addMeal: (meal: Meal) => void;
     updateMeal: (id: number, meal: Partial<Meal>) => void;
     deleteMeal: (id: number) => void;
     loadMeals: (date: string) => void;
   }
   ```

3. **DB 연동**
   - 식단 입력 시 DB에 저장
   - 입력 완료 후 목록 새로고침
   - Toast 메시지로 성공/실패 피드백

#### 완료 기준
- 식단 입력 폼이 완전히 동작
- DB에 데이터가 정상적으로 저장됨
- 입력 후 즉시 목록에 반영됨

---

### 4주차: 기록 조회 및 통계 기능

#### 목표
- 일별/주별/월별 식단 기록 조회
- 칼로리 통계 및 차트 구현
- 영양소 분석 표시
- 데이터 필터링 및 정렬

#### 주요 작업
1. **기록 목록 구현**
   - 날짜별 그룹핑
   - 식사 시간별 분류
   - 총 칼로리 계산 표시

2. **통계 기능**
   - 일별 칼로리 합계
   - 주간 평균 칼로리
   - 월간 트렌드 분석

3. **차트 구현**
   - 라이브러리: `react-native-chart-kit` 또는 `victory-native`
   - 일주일 칼로리 추이 그래프
   - 영양소 비율 파이 차트

4. **필터 및 검색**
   - 날짜 범위 선택
   - 식사 시간별 필터
   - 음식명 검색

#### 완료 기준
- 기록 목록이 정상적으로 표시됨
- 통계가 정확하게 계산됨
- 차트가 시각적으로 표현됨

---

### 5주차: 목표 설정 및 관리 기능

#### 목표
- 체중 목표 설정 기능
- 일일 칼로리 목표 설정
- 목표 대비 진행률 표시
- 체중 기록 및 추적

#### 주요 작업
1. **목표 설정 화면**
   - 목표 체중 입력
   - 목표 칼로리 입력
   - 목표 기간 설정
   - 프로필 정보 (현재 체중, 키, 나이, 성별)

2. **진행률 추적**
   - 오늘의 칼로리 vs 목표 칼로리
   - 주간 달성률
   - 체중 변화 그래프

3. **체중 기록 기능**
   - 체중 입력 화면
   - 체중 변화 추이 그래프
   - 목표까지 남은 체중 표시

4. **Settings 화면 추가**
   - 새로운 탭 또는 모달로 구현
   - 개인 정보 수정
   - 목표 재설정

#### 완료 기준
- 목표를 설정하고 저장할 수 있음
- 진행률이 실시간으로 업데이트됨
- 체중 기록이 차트로 표현됨

---

### 6주차: UI/UX 개선 및 리팩토링

#### 목표
- 전체 디자인 일관성 확보
- 사용성 개선
- 코드 리팩토링 및 최적화
- 성능 개선

#### 주요 작업
1. **디자인 시스템 구축**
   - 컬러 팔레트 정리
   - 타이포그래피 정의
   - 공통 컴포넌트 분리
   - 테마 적용 (Light/Dark 모드)

2. **UX 개선**
   - 로딩 상태 표시
   - 에러 처리 및 사용자 피드백
   - 애니메이션 추가
   - 제스처 및 인터랙션 개선

3. **코드 리팩토링**
   - 컴포넌트 분리 및 재사용성 향상
   - 커스텀 훅 추출
   - 타입 정의 개선
   - 불필요한 코드 제거

4. **성능 최적화**
   - FlatList 최적화
   - 메모이제이션 적용
   - DB 쿼리 최적화
   - 이미지 최적화

#### 완료 기준
- 일관된 디자인 시스템 적용됨
- 사용자 경험이 크게 개선됨
- 코드 품질이 향상됨

---

### 7주차: 추가 기능 구현

#### 목표
- 음식 사진 첨부 기능
- 알림 기능 (식사 시간 알림)
- 음식 데이터베이스 (즐겨찾기)
- 공유 기능

#### 주요 작업
1. **사진 첨부 기능**
   - `expo-image-picker` 사용
   - 식단 기록에 사진 첨부
   - 썸네일 생성 및 표시
   - 이미지 저장 및 관리

2. **알림 기능**
   - `expo-notifications` 사용
   - 식사 시간 알림 설정
   - 목표 달성 알림
   - 알림 권한 처리

3. **음식 즐겨찾기**
   - 자주 먹는 음식 저장
   - 빠른 입력을 위한 즐겨찾기 목록
   - 음식 DB 검색 (선택사항)

4. **공유 기능**
   - 일일 기록 공유
   - 달성률 이미지 생성
   - SNS 공유 연동

#### 완료 기준
- 사진을 첨부하고 조회할 수 있음
- 알림이 정상적으로 동작함
- 즐겨찾기로 빠른 입력 가능

---

### 8주차: 테스트 및 배포 준비

#### 목표
- 버그 수정 및 안정화
- 테스트 작성
- 빌드 및 배포 준비
- 문서화

#### 주요 작업
1. **버그 수정**
   - 알려진 버그 모두 수정
   - 엣지 케이스 처리
   - 크래시 방지 코드 추가

2. **테스트 작성**
   - 단위 테스트 (핵심 로직)
   - 통합 테스트 (주요 플로우)
   - E2E 테스트 (선택사항)

3. **빌드 설정**
   - Android APK 빌드
   - iOS IPA 빌드 (Mac 환경)
   - 앱 아이콘 및 스플래시 스크린 최종 확정
   - 버전 정보 업데이트

4. **문서화**
   - README.md 작성
   - API 문서 정리
   - 사용자 가이드 작성
   - 코드 주석 보완

5. **성능 최종 점검**
   - 메모리 누수 확인
   - DB 쿼리 성능 점검
   - 앱 사이즈 최적화

#### 완료 기준
- 안정적으로 동작하는 앱
- 빌드가 성공적으로 완료됨
- 문서가 완성됨

---

## 🔧 기술 스택 상세

### 핵심 기술
- **Expo SDK 54**: React Native 프레임워크
- **TypeScript**: 타입 안정성
- **Expo Router**: 파일 기반 네비게이션
- **Zustand**: 경량 상태 관리
- **expo-sqlite**: 로컬 데이터베이스
- **NativeWind**: Tailwind CSS for React Native

### 추가 라이브러리 (예정)
- `react-native-chart-kit`: 차트 및 그래프
- `expo-image-picker`: 이미지 선택
- `expo-notifications`: 푸시 알림
- `date-fns`: 날짜 처리
- `react-hook-form`: 폼 관리 (선택사항)
- `zod`: 스키마 유효성 검증 (선택사항)

---

## 📁 예상 프로젝트 구조

```
Nutri8/
├── app/                      # Expo Router 페이지
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx         # Home
│   │   ├── input.tsx         # 식단 입력
│   │   ├── history.tsx       # 기록 조회
│   │   └── settings.tsx      # 설정 (추가 예정)
│   └── modals/               # 모달 화면
│       ├── goal-setting.tsx
│       └── weight-input.tsx
├── components/               # 재사용 컴포넌트
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── meal/
│   │   ├── MealCard.tsx
│   │   └── MealList.tsx
│   └── chart/
│       ├── CalorieChart.tsx
│       └── WeightChart.tsx
├── stores/                   # Zustand 상태 관리
│   ├── mealStore.ts
│   ├── goalStore.ts
│   └── userStore.ts
├── utils/                    # 유틸리티 함수
│   ├── db/
│   │   ├── database.ts       # DB 유틸리티 (callback 패턴)
│   │   ├── migrations.ts
│   │   └── queries.ts
│   ├── date.ts
│   └── calories.ts
├── types/                    # TypeScript 타입 정의
│   ├── meal.ts
│   ├── goal.ts
│   └── database.ts
├── constants/                # 상수 정의
│   ├── colors.ts
│   └── config.ts
├── assets/                   # 이미지 및 폰트
├── ROADMAP.md               # 이 파일
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🎨 디자인 가이드라인

### 컬러 팔레트
- **Primary**: #4CAF50 (Green) - 건강, 성장
- **Secondary**: #2196F3 (Blue) - 신뢰, 차분함
- **Accent**: #FF9800 (Orange) - 활동, 에너지
- **Background**: #F5F5F5 (Light Gray)
- **Text Primary**: #333333
- **Text Secondary**: #666666

### 디자인 원칙
1. **단순함**: 핵심 기능에 집중
2. **일관성**: 동일한 패턴 반복
3. **피드백**: 사용자 행동에 즉각 반응
4. **접근성**: 큰 터치 영역, 명확한 레이블

---

## 🚀 실행 방법

### 개발 환경 실행
```bash
# 의존성 설치
npm install

# Expo 개발 서버 시작
npm start

# Android 실행
npm run android

# iOS 실행 (Mac만 가능)
npm run ios

# 웹 실행
npm run web
```

### 빌드
```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

---

## 📝 참고사항

### DB 유틸리티 설계 패턴
- callback 패턴의 `execute` 메서드 사용
- 에러 핸들링을 위한 `errorCallback` 제공
- 트랜잭션 지원
- 타입 안정성 확보

### 개발 시 주의사항
1. TypeScript 타입 정의를 꼼꼼하게 작성
2. 컴포넌트 재사용성을 고려하여 설계
3. DB 쿼리는 항상 에러 처리 포함
4. 사용자 경험을 최우선으로 고려
5. 성능 최적화는 초기부터 고려

---

## 📅 마일스톤

- **Week 1 (완료)**: ✅ 프로젝트 초기 설정 완료
- **Week 2**: 📅 2월 3주차 - DB 구현
- **Week 4**: 📅 3월 1주차 - 핵심 기능 완성
- **Week 6**: 📅 3월 3주차 - UI/UX 완성
- **Week 8**: 📅 4월 1주차 - 배포 준비 완료

---

**마지막 업데이트**: 2026년 1월 16일  
**프로젝트 시작일**: 2026년 1월 16일  
**예상 완료일**: 2026년 3월 중순

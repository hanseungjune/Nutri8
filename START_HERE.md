# 🎉 Nutri8 프로젝트에 오신 것을 환영합니다!

## ✅ 프로젝트 초기 설정이 완료되었습니다!

이 프로젝트는 **8주간 개발될 다이어트 관리 앱 "Nutri8"**입니다.  
현재 **1주차 "환경 구축 및 네비게이션 설계"**가 완료되었습니다.

---

## 🚀 빠른 시작

### 1단계: 앱 실행하기

```bash
# 개발 서버 시작
npm start
```

그러면 QR 코드가 나타납니다.

### 2단계: 모바일에서 확인하기

1. **Expo Go** 앱을 다운로드하세요
   - [iOS App Store](https://apps.apple.com/app/apple-store/id982107779)
   - [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. QR 코드를 스캔하세요
   - iOS: 카메라 앱으로 스캔
   - Android: Expo Go 앱에서 스캔

3. 앱이 열리면 3개의 탭을 탐색해보세요! 🎊

### 또는 에뮬레이터로 실행

```bash
# Android
npm run android

# iOS (Mac만)
npm run ios

# 웹 브라우저
npm run web
```

---

## 📱 현재 구현된 화면

### 🏠 홈 (Home)
- 오늘의 칼로리 요약
- 이번 주 진행 상황
- 빠른 팁

### ➕ 입력 (Input)
- 식사 시간 선택 (아침/점심/저녁/간식)
- 음식명 입력
- 칼로리 입력
- 등록 버튼 (UI만, 2주차에 DB 연동 예정)

### 📊 기록 (History)
- 빈 상태 UI
- 통계 카드
- (2주차에 실제 데이터 표시 예정)

---

## 📚 중요 문서들

다음 문서들을 순서대로 읽어보세요:

1. **README.md** 📖
   - 프로젝트 전체 개요
   - 기술 스택 소개
   - 기본 사용법

2. **GETTING_STARTED.md** 🚀
   - 상세한 시작 가이드
   - 실행 방법
   - 문제 해결

3. **ROADMAP.md** 🗺️
   - 8주 전체 개발 계획
   - 주차별 상세 작업 내용
   - 마일스톤

4. **PROJECT_STRUCTURE.md** 🏗️
   - 프로젝트 구조 설명
   - 파일별 역할
   - 데이터 플로우

5. **WEEK1_SUMMARY.md** 📊
   - 1주차 완료 요약
   - 생성된 파일 목록
   - 완료율 및 다음 단계

---

## 🎯 현재 진행 상황

### ✅ 완료 (1주차)
- [x] Expo 프로젝트 생성
- [x] 필수 패키지 설치
- [x] Tab Navigation 구현
- [x] 3개 화면 기본 UI
- [x] TypeScript 타입 정의
- [x] Zustand 스토어 기본 구조
- [x] DB 유틸리티 틀 (callback 패턴)
- [x] 유틸리티 함수 작성
- [x] 문서화 완료

### 🔜 다음 단계 (2주차)
- [ ] SQLite 데이터베이스 실제 연동
- [ ] callback 패턴 execute 메서드 완성
- [ ] 식단 입력/조회/삭제 기능
- [ ] 홈 화면에 실제 데이터 표시

---

## 🛠 기술 스택

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State**: Zustand
- **Database**: expo-sqlite
- **Styling**: NativeWind / React Native Paper
- **Icons**: MaterialCommunityIcons

---

## 📂 프로젝트 구조 (간단 버전)

```
Nutri8/
├── app/                    # 화면 (Expo Router)
│   ├── _layout.tsx        # Root Layout
│   └── (tabs)/            # Tab 화면들
│       ├── index.tsx      # 홈
│       ├── input.tsx      # 입력
│       └── history.tsx    # 기록
│
├── stores/                 # 상태 관리 (Zustand)
├── utils/db/              # 데이터베이스 (callback 패턴)
├── types/                 # TypeScript 타입
├── constants/             # 색상 & 설정
└── 문서들...
```

---

## 🎨 디자인

### 컬러
- **Primary**: `#4CAF50` (그린) 🟢
- **Secondary**: `#2196F3` (블루) 🔵
- **Accent**: `#FF9800` (오렌지) 🟠

### 특징
- 깔끔한 카드 레이아웃
- 직관적인 아이콘
- 반응형 디자인

---

## 💡 핵심 특징

### 1. Callback 패턴 DB
```typescript
database.execute<Meal[]>(
  'SELECT * FROM meals WHERE date = ?',
  [date],
  {
    onSuccess: (meals) => { /* ... */ },
    onError: (error) => { /* ... */ }
  }
);
```

### 2. 파일 기반 라우팅
- `app/(tabs)/index.tsx` → `/` 경로
- `app/(tabs)/input.tsx` → `/input` 경로
- 파일 추가만으로 라우트 생성!

### 3. 타입 안정성
- 모든 데이터 타입 정의
- TypeScript strict 모드
- 컴파일 타임 오류 방지

---

## ❓ 자주 묻는 질문

### Q: 앱이 실행되지 않아요
```bash
# 1. 캐시 클리어
npm start -- --clear

# 2. 의존성 재설치
rm -rf node_modules
npm install
```

### Q: TypeScript 오류가 나요
```bash
# 타입 체크
npx tsc --noEmit
```

### Q: 어디서부터 시작하나요?
1. `npm start`로 앱 실행
2. 3개 화면 탐색
3. `ROADMAP.md`에서 2주차 계획 확인
4. `utils/db/database.ts` 구현 준비

---

## 🎓 학습 자료

### Expo Router
- [공식 문서](https://docs.expo.dev/router/introduction/)
- [튜토리얼](https://docs.expo.dev/tutorial/introduction/)

### Zustand
- [공식 문서](https://docs.pmnd.rs/zustand/)
- [예제 모음](https://github.com/pmndrs/zustand)

### expo-sqlite
- [공식 문서](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [SQLite 문법](https://www.sqlite.org/lang.html)

---

## 🤝 다음 단계 가이드

### 이제 무엇을 하나요?

#### 1. 앱 실행 및 탐색 (5분)
```bash
npm start
```
- 3개 탭 모두 확인
- UI 살펴보기

#### 2. 코드 살펴보기 (15분)
- `app/(tabs)/index.tsx` - 홈 화면
- `stores/mealStore.ts` - 스토어 구조
- `utils/db/database.ts` - DB 틀

#### 3. 문서 읽기 (20분)
- `ROADMAP.md` - 전체 계획 파악
- `PROJECT_STRUCTURE.md` - 구조 이해

#### 4. 2주차 준비 (다음 세션)
- SQLite 기본 문법 학습
- expo-sqlite 공식 문서 읽기
- `database.ts`의 TODO 확인

---

## 📞 도움이 필요하신가요?

### 문서 확인
- **기본 사용**: `GETTING_STARTED.md`
- **구조 이해**: `PROJECT_STRUCTURE.md`
- **계획 확인**: `ROADMAP.md`
- **1주차 요약**: `WEEK1_SUMMARY.md`

### 코드 확인
- **화면**: `app/(tabs)/`
- **상태**: `stores/`
- **DB**: `utils/db/`
- **타입**: `types/`

---

## 🎊 축하합니다!

**Nutri8 프로젝트의 1주차가 완료되었습니다!**

### 지금 바로 해보세요
```bash
npm start
```

앱을 실행하고 만들어진 화면들을 확인해보세요! 🚀

---

**Happy Coding!** 💻✨

다음 주에는 실제로 데이터를 저장하고 불러오는 기능을 구현합니다!

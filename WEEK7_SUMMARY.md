# 📸 7주차 완료: 추가 기능 구현

## 📅 완료일
2026-01-17

## ✅ 완료된 작업

### 1. 📸 **사진 첨부 기능**

#### 패키지 설치
```bash
npm install expo-image-picker
```

#### 구현 내용
- **이미지 선택** (`utils/imageUtils.ts`)
  - 갤러리에서 선택
  - 카메라로 촬영
  - 권한 요청 자동 처리
  - 이미지 압축 (70% 품질)

- **Supabase Storage 연동**
  - `meal-photos` 버킷에 업로드
  - Public URL 자동 생성
  - 이미지 삭제 기능

- **Input 화면 개선**
  - 사진 미리보기
  - 사진 제거 버튼
  - 업로드 진행 상태 표시
  - 업로드 실패 시 선택지 제공

#### Supabase Storage 설정
상세 가이드: `SUPABASE_STORAGE_SETUP.md`

1. **버킷 생성**: `meal-photos` (Public)
2. **Policies 설정**:
   - INSERT: 인증된 사용자
   - SELECT: 모든 사용자
   - DELETE: 인증된 사용자
3. **DB 스키마 업데이트**:
```sql
ALTER TABLE meals ADD COLUMN photo_url TEXT;
```

---

### 2. 🔔 **알림 기능**

#### 패키지 설치
```bash
npm install expo-notifications @react-native-async-storage/async-storage
```

#### 구현 내용
- **알림 유틸리티** (`utils/notificationUtils.ts`)
  - 알림 권한 요청
  - 식사 시간 알림 예약 (매일 반복)
  - 알림 설정 저장/불러오기
  - 목표 달성/초과 알림

- **알림 설정 화면** (`app/(tabs)/notifications.tsx`)
  - 알림 ON/OFF 토글
  - 식사별 알림 설정 (아침/점심/저녁/간식)
  - 시간 변경 기능
  - 웹 버전 안내 메시지

#### 알림 종류
1. **식사 시간 알림**: 설정한 시간에 매일 반복
2. **목표 달성 알림**: 목표 칼로리 달성 시
3. **목표 초과 경고**: 목표 칼로리 초과 시

---

### 3. ⭐ **음식 즐겨찾기 기능**

#### 구현 내용
- **즐겨찾기 유틸리티** (`utils/favoriteUtils.ts`)
  - AsyncStorage로 로컬 저장
  - 즐겨찾기 추가/삭제
  - 즐겨찾기 검색
  - 중복 체크

- **기능**:
  - 자주 먹는 음식 저장
  - 빠른 입력을 위한 즐겨찾기 목록
  - 즐겨찾기에서 선택 시 자동 입력

---

### 4. 📤 **공유 기능**

#### 패키지 설치
```bash
npm install expo-sharing
```

#### 구현 내용
- **공유 유틸리티** (`utils/shareUtils.ts`)
  - 일일 식단 텍스트 생성
  - 주간 통계 텍스트 생성
  - Native: expo-sharing 사용
  - Web: Navigator Share API / Clipboard

- **공유 내용**:
  - 📅 날짜
  - 🍽️ 식사별 음식 및 칼로리
  - 📊 총 칼로리 및 목표 대비 달성률
  - 🥗 영양소 정보

#### 공유 텍스트 예시
```
📅 2026-01-17 식단 기록

🌅 아침
  • 토스트: 300kcal
  • 우유: 150kcal

🌞 점심
  • 비빔밥: 650kcal

📊 총 칼로리: 1100kcal
🎯 목표 대비: 55%

🥗 영양소:
  단백질: 45g
  탄수화물: 120g
  지방: 30g

📱 Nutri8 앱으로 기록했습니다
```

---

## 📁 생성된 파일

```
Nutri8/
├── app/(tabs)/
│   └── notifications.tsx        # 알림 설정 화면 (신규)
├── utils/
│   ├── imageUtils.ts           # 이미지 관련 유틸 (신규)
│   ├── notificationUtils.ts    # 알림 관련 유틸 (신규)
│   ├── favoriteUtils.ts        # 즐겨찾기 유틸 (신규)
│   └── shareUtils.ts           # 공유 유틸 (신규)
├── SUPABASE_STORAGE_SETUP.md   # Storage 설정 가이드 (신규)
└── WEEK7_SUMMARY.md            # 7주차 요약 (신규)
```

---

## 🎯 기능 요약

### 사진 첨부 📸
```typescript
// Input 화면에서
<TouchableOpacity onPress={showPhotoOptions}>
  <Text>사진 추가</Text>
</TouchableOpacity>

// 갤러리 선택 또는 촬영
const uri = await pickImageFromGallery();
// 또는
const uri = await takePhoto();

// Supabase에 업로드
const photoUrl = await uploadMealPhoto(uri);

// Meal에 photoUrl 포함하여 저장
```

### 알림 설정 🔔
```typescript
// 알림 권한 요청
const hasPermission = await requestNotificationPermissions();

// 아침 식사 알림 예약 (08:00)
await scheduleMealNotification('breakfast', '08:00');

// 모든 알림 초기화
await initializeNotifications(settings);
```

### 즐겨찾기 ⭐
```typescript
// 즐겨찾기 추가
await addFavorite({
  foodName: '김치찌개',
  calories: 350,
  protein: 20,
  carbs: 40,
  fat: 10,
});

// 즐겨찾기 목록 불러오기
const favorites = await loadFavorites();

// 즐겨찾기로부터 Meal 생성
const meal = favoriteToMeal(favorite, 'lunch', '2026-01-17');
```

### 공유 📤
```typescript
// 일일 식단 공유
await shareDailyMeal(todayMeals, '2026-01-17', 2000);

// 주간 통계 생성
const text = generateWeeklyStatsText(
  weekMeals,
  '2026-01-13',
  '2026-01-19',
  2000
);
```

---

## 🔧 Supabase Storage 설정 (필수!)

### 1. 버킷 생성
1. Supabase Dashboard → Storage
2. "New bucket" 클릭
3. 설정:
   - Name: `meal-photos`
   - Public: ✅ 체크
   - File size limit: 5MB

### 2. Policies 설정
SQL Editor에서 실행:

```sql
-- 업로드 권한 (인증된 사용자)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'meal-photos');

-- 읽기 권한 (모든 사용자)
CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
TO public, authenticated
USING (bucket_id = 'meal-photos');

-- 삭제 권한 (인증된 사용자)
CREATE POLICY "Allow authenticated delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'meal-photos');
```

### 3. DB 스키마 업데이트

```sql
-- meals 테이블에 photo_url 컬럼 추가
ALTER TABLE meals 
ADD COLUMN photo_url TEXT;
```

---

## 📊 탭 구성 (총 7개)

1. **🏠 홈**: 목표 요약 및 일일 진행률
2. **➕ 입력**: 식사 기록 (+ 사진 첨부)
3. **📋 기록**: 식단 이력 (+ 사진 표시)
4. **📊 통계**: 차트 및 분석
5. **⚖️ 체중**: 체중 기록 및 그래프
6. **🔔 알림**: 알림 설정 (신규)
7. **⚙️ 설정**: 목표 및 프로필 설정

---

## 🚀 사용 흐름

### 1. 사진 첨부하여 식사 기록
1. "입력" 탭 이동
2. 음식명, 칼로리 입력
3. "사진 추가" 클릭
4. 갤러리 선택 또는 촬영
5. 사진 미리보기 확인
6. "저장하기" → Supabase에 자동 업로드

### 2. 알림 설정
1. "알림" 탭 이동
2. "알림 사용" 토글 ON
3. 각 식사 알림 활성화
4. 시간 탭하여 변경
5. 자동으로 매일 반복

### 3. 즐겨찾기 사용
1. 자주 먹는 음식을 즐겨찾기에 추가
2. 다음 번 입력 시 즐겨찾기에서 선택
3. 자동으로 칼로리/영양소 입력

### 4. 식단 공유
1. 오늘의 식단 기록 완료
2. 공유 버튼 클릭
3. 텍스트 자동 생성
4. 원하는 앱으로 공유

---

## 💡 개발 팁

### 1. 이미지 압축
```typescript
// quality: 0.7 = 70% 품질 (파일 크기 감소)
const result = await ImagePicker.launchImageLibraryAsync({
  quality: 0.7,
});
```

### 2. 알림 테스트
```typescript
// 즉시 알림 전송 (테스트용)
await Notifications.scheduleNotificationAsync({
  content: { title: '테스트', body: '알림 테스트' },
  trigger: null, // 즉시
});
```

### 3. AsyncStorage 디버깅
```typescript
// 전체 데이터 확인
const keys = await AsyncStorage.getAllKeys();
const data = await AsyncStorage.multiGet(keys);
console.log(data);
```

---

## ⚠️ 주의사항

### 1. Supabase Storage 설정
- **반드시** `SUPABASE_STORAGE_SETUP.md` 가이드 따라 설정
- 버킷 생성 및 Policies 설정 필수
- `photo_url` 컬럼 추가 필수

### 2. 알림 권한
- iOS: Info.plist 설정 필요 (Expo는 자동)
- Android: 자동으로 처리됨
- 웹: 알림 미지원

### 3. 이미지 용량
- 5MB 제한 (Supabase Storage)
- 압축 권장 (quality: 0.7)
- WebP 형식 권장 (용량 작음)

---

## 📈 통계

### 생성된 파일
- **화면**: 1개 (notifications.tsx)
- **유틸리티**: 4개
- **가이드**: 1개
- **총**: 6개

### 코드 라인
- `imageUtils.ts`: ~150줄
- `notificationUtils.ts`: ~250줄
- `favoriteUtils.ts`: ~120줄
- `shareUtils.ts`: ~130줄
- `notifications.tsx`: ~250줄
- **총**: ~900줄

### 설치된 패키지
- `expo-image-picker`
- `expo-notifications`
- `expo-sharing`
- `@react-native-async-storage/async-storage`

---

## 🎉 7주차 완료!

**추가 기능 구현**이 성공적으로 완료되었습니다!

### 주요 성과:
1. ✅ **사진 첨부** - Supabase Storage 연동
2. ✅ **알림 기능** - 식사 시간 리마인더
3. ✅ **즐겨찾기** - 빠른 입력 지원
4. ✅ **공유 기능** - SNS 공유 준비

이제 Nutri8 앱은:
- 📸 **사진으로 기록하고**
- 🔔 **알림으로 챙기고**
- ⭐ **즐겨찾기로 빠르게 입력하고**
- 📤 **친구와 공유할 수 있습니다!**

---

## 📋 다음 단계

### 8주차: 테스트 및 배포 준비
- 전체 기능 테스트
- 버그 수정
- 성능 최적화
- 문서화
- 배포 준비 (EAS Build)

---

**8주간의 여정이 거의 끝나갑니다!** 🎊

최종 주차에서는 앱을 완벽하게 다듬고 배포 준비를 하겠습니다! 🚀

# 🍽️ 음식 이미지 자동 추가 가이드

## 📋 개요
기존 식사 데이터에 자동으로 음식 이미지를 추가하는 방법을 안내합니다.

---

## 🚀 빠른 시작 (추천!)

### 방법 1: SQL 스크립트로 한 번에 추가 ⭐

1. **Supabase Dashboard** 열기
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **SQL Editor** 열기
   - 왼쪽 메뉴에서 "SQL Editor" 클릭

3. **SQL 스크립트 실행**
   - `add-food-images.sql` 파일 내용 복사
   - SQL Editor에 붙여넣기
   - **RUN** 버튼 클릭

4. **결과 확인**
   - 업데이트된 행 수 확인
   - 브라우저에서 앱 새로고침 (F5)
   - History 탭에서 이미지 확인! 🎉

---

## 🎨 사용된 이미지

### Unsplash 무료 이미지
- **출처**: https://unsplash.com
- **라이선스**: 무료 사용 가능 (상업적 이용 포함)
- **품질**: 고품질 음식 사진

### 포함된 음식 (20가지)
✅ 차돌된장찌개  
✅ 샐러드  
✅ 연어구이  
✅ 바나나  
✅ 김치찌개  
✅ 불고기  
✅ 삼겹살  
✅ 비빔밥  
✅ 떡볶이  
✅ 김밥  
✅ 치킨  
✅ 피자  
✅ 햄버거  
✅ 라면  
✅ 파스타  
✅ 스테이크  
✅ 초밥/스시  
✅ 카레  
✅ 돈까스  
✅ 우동  

---

## 🔧 방법 2: 자동 이미지 검색 기능 사용

### Unsplash API 설정 (선택사항)

1. **Unsplash 개발자 계정 만들기**
   - https://unsplash.com/developers 접속
   - "Register as a developer" 클릭
   - 무료 계정 생성

2. **새 앱 만들기**
   - "New Application" 클릭
   - 앱 이름 입력 (예: Nutri8)
   - Access Key 복사

3. **.env 파일에 추가**
   ```env
   EXPO_PUBLIC_UNSPLASH_ACCESS_KEY=your-access-key-here
   ```

4. **앱 재시작**
   ```bash
   # 터미널에서
   npm start
   ```

### 코드에서 사용하기

```typescript
import { getFoodImageUrl, getFoodImage } from '../utils/foodImageUtils';

// 방법 1: Unsplash API 사용 (API 키 필요)
const imageUrl = await getFoodImageUrl('불고기');

// 방법 2: 사전 정의된 이미지 사용 (API 키 불필요)
const imageUrl = getFoodImage('불고기');
```

---

## 🆕 방법 3: 새로운 음식 이미지 추가

### 직접 Unsplash에서 이미지 URL 찾기

1. **Unsplash 검색**
   - https://unsplash.com 접속
   - 음식 이름 검색 (예: "korean bibimbap")

2. **이미지 선택**
   - 마음에 드는 이미지 클릭
   - 우클릭 → "이미지 주소 복사"

3. **URL 수정**
   ```
   원본: https://images.unsplash.com/photo-123456789?...많은파라미터...
   수정: https://images.unsplash.com/photo-123456789?w=400&q=80
   ```

4. **SQL로 업데이트**
   ```sql
   UPDATE meals 
   SET photo_url = 'https://images.unsplash.com/photo-123456789?w=400&q=80'
   WHERE food_name = '음식이름' AND photo_url IS NULL;
   ```

---

## 📊 이미지 현황 확인

### SQL로 확인

```sql
-- 전체 통계
SELECT 
  COUNT(*) as total_meals,
  COUNT(photo_url) as with_images,
  ROUND(COUNT(photo_url) * 100.0 / COUNT(*), 1) as percentage
FROM meals;

-- 음식별 현황
SELECT 
  food_name,
  COUNT(*) as total,
  COUNT(photo_url) as images
FROM meals
GROUP BY food_name
ORDER BY total DESC;

-- 이미지가 없는 음식 찾기
SELECT DISTINCT food_name
FROM meals
WHERE photo_url IS NULL
ORDER BY food_name;
```

---

## 🎯 Placeholder 이미지 서비스

API 키 없이 사용 가능한 대안:

### 1. Lorem Picsum
```
https://picsum.photos/seed/불고기/400/300
```

### 2. DummyImage
```
https://dummyimage.com/400x300/4CAF50/ffffff&text=불고기
```

### 3. UI Avatars
```
https://ui-avatars.com/api/?name=불고기&size=400&background=4CAF50&color=fff
```

---

## ⚠️ 주의사항

1. **저작권**
   - Unsplash 이미지는 무료 사용 가능
   - 다른 출처는 저작권 확인 필요

2. **이미지 크기**
   - 권장: 400x300 픽셀
   - 너무 큰 이미지는 로딩 느림

3. **URL 안정성**
   - Unsplash URL은 영구적으로 유효
   - 개인 블로그 이미지는 깨질 수 있음

4. **네트워크**
   - 이미지는 외부 URL에서 로딩
   - 인터넷 연결 필요

---

## 🆘 문제 해결

### 이미지가 안 보여요!

1. **브라우저 새로고침** (F5)
2. **URL 확인**
   ```sql
   SELECT food_name, photo_url FROM meals WHERE id = 1;
   ```
3. **브라우저에서 URL 직접 열어보기**
4. **CORS 에러 확인** (F12 → Console)

### SQL 업데이트가 안 돼요!

```sql
-- 먼저 확인
SELECT * FROM meals WHERE food_name = '음식이름';

-- 조건 확인
SELECT COUNT(*) FROM meals 
WHERE food_name = '음식이름' AND photo_url IS NULL;
```

---

## 📚 추가 리소스

- **Unsplash**: https://unsplash.com
- **Pexels**: https://www.pexels.com
- **Pixabay**: https://pixabay.com
- **Foodiesfeed**: https://www.foodiesfeed.com (음식 전문)

---

**이제 모든 음식에 멋진 이미지가 추가됩니다!** 🎉

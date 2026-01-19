# 🖼️ 음식 이미지 직접 추가 가이드

## 😔 왜 자동으로 안 되나요?

죄송합니다. AI는 실제로 웹에서 이미지를 검색하거나 확인할 수 없습니다.
그래서 임의로 만든 URL들이 정확하지 않았습니다.

---

## ✅ **해결 방법**

### 방법 1: 텍스트 이미지 사용 (가장 빠름!)

음식 이름이 텍스트로 표시되는 간단한 이미지를 사용합니다.

**장점:**
- ✅ 모든 음식에 자동 적용
- ✅ 100% 작동 보장
- ✅ 즉시 확인 가능

**실행:**
```bash
# Supabase SQL Editor에서 실행
# text-based-food-images.sql 파일 내용 실행
```

**결과 예시:**
```
┌──────────────────────────────┐
│  ┌────────────────────────┐ │
│  │                        │ │
│  │      짜장면             │ │  ← 녹색 배경에 흰 글씨
│  │                        │ │
│  └────────────────────────┘ │
│  짜장면                      │
│  500 kcal                   │
└──────────────────────────────┘
```

---

### 방법 2: 직접 이미지 찾아서 추가 (가장 정확!)

**단계:**

#### 1️⃣ Unsplash에서 이미지 검색
1. https://unsplash.com 접속
2. 검색창에 음식 이름 입력
   - 영어로 검색: "korean bulgogi", "kimchi stew" 등
   - 한글도 가능: "불고기", "김치찌개"

#### 2️⃣ 이미지 URL 복사
1. 마음에 드는 이미지 클릭
2. 우클릭 → **"이미지 주소 복사"**
3. URL 예시: `https://images.unsplash.com/photo-1234567890...`

#### 3️⃣ URL 정리
```
원본: https://images.unsplash.com/photo-1234567890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80

정리: https://images.unsplash.com/photo-1234567890?w=400&q=80
```

**URL 정리 규칙:**
- `?` 뒤의 모든 파라미터 제거
- `?w=400&q=80` 만 추가

#### 4️⃣ Supabase에서 업데이트
```sql
-- 예시: 짜장면 이미지 추가
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1234567890?w=400&q=80'
WHERE food_name = '짜장면';

-- 확인
SELECT food_name, photo_url FROM meals WHERE food_name = '짜장면';
```

---

### 방법 3: 기본 음식 아이콘 사용

하나의 일반 음식 이미지를 모든 항목에 사용:

```sql
-- 모든 음식에 일반 음식 이미지
UPDATE meals 
SET photo_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
```

---

### 방법 4: 이미지 없이 사용

가장 간단한 방법:

```sql
-- 모든 이미지 제거
UPDATE meals SET photo_url = NULL;
```

History 화면에서 이미지 없이 깔끔하게 텍스트만 표시됩니다.

---

## 🎯 **추천 방법**

### 빠르게 해결하고 싶다면
→ **방법 1: 텍스트 이미지** (`text-based-food-images.sql` 실행)

### 정확한 이미지를 원한다면
→ **방법 2: 직접 추가** (시간이 걸리지만 가장 정확)

### 신경 쓰기 싫다면
→ **방법 4: 이미지 없이 사용**

---

## 📝 **직접 추가 예시**

자주 먹는 음식 10개만 직접 추가하는 방법:

```sql
-- 1. 짜장면
UPDATE meals SET photo_url = 'Unsplash에서 복사한 URL'
WHERE food_name = '짜장면';

-- 2. 김치찌개
UPDATE meals SET photo_url = 'Unsplash에서 복사한 URL'
WHERE food_name = '김치찌개';

-- 3. 불고기
UPDATE meals SET photo_url = 'Unsplash에서 복사한 URL'
WHERE food_name = '불고기';

-- ... 자주 먹는 음식만 추가

-- 나머지는 텍스트 이미지
UPDATE meals 
SET photo_url = 'https://dummyimage.com/400x300/4CAF50/ffffff&text=' || 
                REPLACE(food_name, ' ', '+')
WHERE photo_url IS NULL;
```

---

## 💡 **팁**

### Unsplash 검색 키워드
- 한식: "korean food", "korean bulgogi", "kimchi stew"
- 일식: "japanese sushi", "ramen", "tonkatsu"
- 중식: "chinese food", "jajangmyeon", "dumplings"
- 양식: "pasta", "steak", "pizza"

### 좋은 이미지 고르기
- ✅ 음식이 크게 나온 사진
- ✅ 조명이 좋은 사진
- ✅ 배경이 단순한 사진
- ❌ 여러 음식이 함께 있는 사진

---

## ❓ **자주 묻는 질문**

**Q: 이미지가 안 보여요!**
A: 브라우저 새로고침 (F5) 해보세요.

**Q: 텍스트 이미지가 깨져요!**
A: 한글이 제대로 인코딩되지 않았을 수 있습니다. URL을 직접 열어서 확인해보세요.

**Q: 모든 음식에 이미지를 추가해야 하나요?**
A: 아니요! 자주 먹는 음식 10-20개만 추가하고 나머지는 텍스트 이미지로 두어도 충분합니다.

---

**죄송합니다. 자동으로 완벽하게 해드리지 못했습니다.** 😔

위의 방법 중 하나를 선택해서 사용해주세요!

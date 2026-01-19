# 🎨 DALL-E 3 AI 이미지 생성 가이드

## 🎯 목적
"떡볶이 2인분" 같은 음식 이름으로 **AI가 초현실적인 이미지를 생성**하여 자동으로 추가

---

## ✨ 기능
- ✅ AI 적용 버튼 → **영양 정보 + AI 생성 이미지** 자동 입력
- ✅ OpenAI DALL-E 3 사용 (최고 품질)
- ✅ 한국 음식 특화 프롬프트
- ✅ 포토리얼리스틱 품질
- ✅ 404 에러 없음 (안정적)

---

## 💰 비용

| 항목 | 가격 |
|------|------|
| **1024x1024 standard** | $0.04/장 |
| **1024x1024 HD** | $0.08/장 |
| **신규 계정 무료 크레딧** | $5 (125장) |

**예시:**
- 하루 10장 사용 → 월 $12
- 하루 30장 사용 → 월 $36

---

## 📋 Step 1: OpenAI 계정 생성

### 1. OpenAI 가입
https://platform.openai.com/signup

### 2. 결제 정보 등록
- 신규 계정: $5 무료 크레딧 자동 제공
- 크레딧 소진 후: 신용카드/체크카드 등록 필요

---

## 📋 Step 2: API 키 생성

### 1. API Keys 페이지로 이동
https://platform.openai.com/api-keys

### 2. "Create new secret key" 클릭

### 3. 이름 입력 (예: "Nutri8 App")

### 4. API 키 복사
```
예시: sk-proj-AbCdEfGhIjKlMnOpQrStUvWxYz1234567890...
```

⚠️ **중요:** 이 키는 다시 볼 수 없으니 안전한 곳에 저장!

---

## 📋 Step 3: `.env` 파일 설정

프로젝트 루트의 `.env` 파일에 다음을 추가:

```env
# AI 이미지 생성 활성화
EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=true

# OpenAI API Key
EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-your-api-key-here
```

**⚠️ 주의:**
- `.env` 파일은 Git에 커밋되지 않습니다
- `.env` 파일 수정 후 **앱을 반드시 재시작**

---

## 📋 Step 4: 앱 재시작

터미널:
```bash
# 1. 현재 서버 중지 (Ctrl+C)

# 2. 서버 재시작
npm start
```

브라우저 새로고침:
```
Ctrl + Shift + R (강력 새로고침)
```

---

## 🧪 테스트

### 1. Input 탭으로 이동

### 2. 음식 이름 입력
```
떡볶이 2인분
```

### 3. "AI 적용 🤖" 버튼 클릭

### 4. **5-10초 대기** ⏳ (AI가 이미지 생성 중)

### 5. Console (F12) 확인
```
🤖 AI 분석 시작: 영양 정보 + 이미지
✅ 영양 정보 분석 완료
🎨 음식 이미지 가져오기 시작...
🎨 DALL-E 3 이미지 생성 시도 중... (5-10초 소요)
📝 프롬프트: Professional food photography of Korean spicy stir-fried rice cakes...
✅ DALL-E 3 생성 완료!
✅ 최종 이미지 URL: https://oaidalleapiprodscus.blob.core.windows.net/...
```

### 6. 결과 확인
- ✅ 칼로리, 단백질, 탄수화물, 지방 (자동)
- ✅ **AI가 생성한 초현실적인 떡볶이 사진** 🎨✨
- ✅ 404 에러 없음!

---

## 🎨 이미지 품질 비교

| 방법 | 품질 | 속도 | 정확도 | 비용 |
|------|------|------|--------|------|
| **DALL-E 3** | ⭐⭐⭐⭐⭐ | 5-10초 | ⭐⭐⭐⭐⭐ | $0.04/장 |
| Unsplash | ⭐⭐⭐⭐ | 1-2초 | ⭐⭐⭐ | 무료 |
| 사전 정의 | ⭐⭐⭐⭐ | 즉시 | ⭐⭐⭐⭐ | 무료 |

**DALL-E 3의 장점:**
- ✅ "BHC 뿌링클" → 실제로 뿌링클처럼 생긴 치킨 생성
- ✅ "떡볶이 2인분" → 2인분 양으로 생성 가능
- ✅ 한국 음식 정확히 인식
- ✅ 레스토랑 품질 플레이팅

---

## 🎯 이미지 생성 우선순위

### **AI 이미지 생성 활성화 시:**
```
EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=true

1️⃣ DALL-E 3 AI 생성 (최우선)
    ↓ 실패 시
2️⃣ Gemini AI 생성 (베타, 아직 작동 안 함)
    ↓ 실패 시
3️⃣ Unsplash 실제 사진
    ↓ 실패 시
4️⃣ 사전 정의 이미지
```

### **AI 이미지 생성 비활성화 시:**
```
EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=false (기본값)

1️⃣ Unsplash 실제 사진
    ↓ 실패 시
2️⃣ 사전 정의 이미지
```

---

## 💡 한국 음식 특화 프롬프트 예시

앱이 자동으로 생성하는 프롬프트:

### "떡볶이"
```
Professional food photography of Korean spicy stir-fried rice cakes (tteokbokki) 
with bright red gochujang sauce, fish cakes, boiled eggs, and green onions, 
served in a traditional shallow bowl.

Shot on a clean white or neutral background, top-down view at 45-degree angle.
Natural lighting with soft shadows, restaurant-quality plating.
High-resolution, appetizing, vibrant colors, photorealistic style.
No text, no watermarks, no people.
```

### "BHC 뿌링클"
```
Professional food photography of Korean sweet and spicy fried chicken 
with a glossy golden-orange coating, crispy texture, 
topped with almonds and parsley.

Shot on a clean white or neutral background, top-down view at 45-degree angle.
Natural lighting with soft shadows, restaurant-quality plating.
High-resolution, appetizing, vibrant colors, photorealistic style.
No text, no watermarks, no people.
```

---

## 🆘 문제 해결

### 1. "OpenAI API Key가 설정되지 않았습니다" 경고

**해결:**
```env
# .env 파일 확인
EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-your-key-here
```

앱 재시작:
```bash
Ctrl+C
npm start
```

### 2. "API Key가 유효하지 않습니다" 오류

**원인:**
- API 키가 잘못 복사됨
- API 키가 만료됨

**해결:**
1. OpenAI 대시보드에서 새 API 키 생성
2. `.env` 파일에 새 키 붙여넣기
3. 앱 재시작

### 3. "Insufficient credits" 오류

**원인:**
- $5 무료 크레딧 소진
- 결제 정보 미등록

**해결:**
1. https://platform.openai.com/settings/organization/billing
2. 결제 정보 등록
3. 크레딧 충전

### 4. 이미지 생성이 느림 (10초 이상)

**원인:**
- AI 이미지 생성은 시간이 걸림 (정상)

**해결:**
- ✅ 기다리면 완성됩니다! (품질 최고)
- 또는 `EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=false`로 비활성화

---

## 📊 비용 관리

### **사용량 확인**

https://platform.openai.com/usage

### **월 예산 설정**

https://platform.openai.com/settings/organization/billing/limits

예시:
- **하드 리밋:** $20/월
- **소프트 리밋:** $15/월 (경고)

### **비용 절감 팁**

1. **무료 Unsplash 우선 사용**
   ```env
   EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=false
   ```

2. **자주 먹는 음식은 사진 촬영**
   - 카메라 버튼 사용 (무료)

3. **테스트할 때만 AI 사용**
   - 개발 중: `false`
   - 시연/발표: `true`

---

## 🎓 고급 설정

### **이미지 품질 변경**

`utils/dalleImageGen.ts` 파일:

```typescript
const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: prompt,
  n: 1,
  size: "1024x1024",    // 또는 "1024x1792", "1792x1024"
  quality: "hd",         // "standard" → "hd" (더 고품질, $0.08/장)
  style: "vivid",        // "natural" → "vivid" (더 생생한 색감)
});
```

### **프롬프트 커스터마이징**

`utils/dalleImageGen.ts` → `createKoreanFoodPrompt` 함수:

```typescript
function createKoreanFoodPrompt(foodName: string): string {
  return `Ultra-realistic Michelin-star food photography of ${foodName}.
Shot with Canon EOS R5, 50mm f/1.2 lens.
Soft natural window lighting, dramatic shadows.
Professional styling, garnished perfectly.
8K resolution, magazine-quality.`;
}
```

---

## 🎉 실전 예시

### **사용자 시나리오:**

```
1. 사용자: "떡볶이 2인분" 입력
2. AI 적용 버튼 클릭
3. 8초 대기... (DALL-E 3 이미지 생성 중)
4. 결과:
   - 칼로리: 600 kcal ✅
   - 단백질: 15g ✅
   - 탄수화물: 120g ✅
   - 지방: 10g ✅
   - 이미지: AI가 생성한 초현실적인 떡볶이 사진 ✅🎨
      (빨간 소스가 반짝이고, 계란과 어묵이 완벽하게 배치됨)
5. 등록 버튼 클릭
6. 완료! 🎉

비용: $0.04 (4센트)
```

---

## 📚 추가 자료

- [OpenAI DALL-E 3 공식 문서](https://platform.openai.com/docs/guides/images)
- [OpenAI API 가격 정책](https://openai.com/api/pricing/)
- [OpenAI 사용 가이드](https://platform.openai.com/docs/quickstart)

---

## 💬 FAQ

### Q: 무료로 사용할 수 있나요?
A: 신규 계정은 $5 무료 크레딧 (125장) 제공됩니다.

### Q: 한 달에 몇 장 생성하나요?
A: 하루 3끼 × 30일 = 90장 → 약 $3.6/월

### Q: 생성된 이미지 저작권은?
A: OpenAI 약관에 따라 생성된 이미지의 권리는 사용자에게 있습니다.

### Q: 생성 속도를 빠르게 할 수 없나요?
A: DALL-E 3는 5-10초가 정상입니다. 빠른 속도가 필요하면 `EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN=false`로 설정하세요.

### Q: 이미지 품질을 더 높일 수 있나요?
A: `quality: "hd"`로 설정하면 더 고품질 ($0.08/장)

---

**DALL-E 3로 AI가 만든 완벽한 음식 사진을 자동으로 추가하세요!** 🎨✨

더 이상 이미지를 찾을 필요가 없습니다! 🤖🍽️

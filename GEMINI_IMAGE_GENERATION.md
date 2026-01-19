# 🎨 Gemini AI 이미지 생성 가이드

## 🎯 목적
"떡볶이 2인분" 같은 음식 이름으로 **AI가 실시간으로 이미지를 생성**하여 자동으로 추가

---

## ✨ 기능
- ✅ AI 적용 버튼 클릭 → **영양 정보 + AI 생성 이미지** 자동 입력
- ✅ Gemini 2.0 Flash Image Generation 사용
- ✅ 한국 음식 특화 프롬프트 자동 생성
- ✅ 무료 할당량 사용 (이미 있는 Gemini API 키)
- ✅ 실패 시 자동 폴백 (Unsplash → 사전 정의 이미지)

---

## 🎨 **이미지 생성 우선순위**

```
AI 적용 버튼 클릭
    ↓
1️⃣ Gemini AI 이미지 생성 (최우선)
    ↓ 실패 시
2️⃣ Unsplash 실제 사진 검색
    ↓ 실패 시
3️⃣ 사전 정의된 이미지 (40개 이상)
    ↓ 없으면
4️⃣ Placeholder 이미지
```

---

## 📋 설정 방법

### ✅ **추가 설정 불필요!**

**이미 Gemini API 키가 있다면 바로 사용 가능합니다!**

`.env` 파일:
```env
EXPO_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
```

이 키로 **영양 정보 + 이미지 생성** 모두 가능합니다!

---

## 🧪 테스트

### 1. Input 탭으로 이동

### 2. 음식 이름 입력
```
떡볶이 2인분
```

### 3. "AI 적용 🤖" 버튼 클릭

### 4. Console (F12) 확인
```
🤖 AI 분석 시작: 영양 정보 + 이미지
🔄 models/gemini-2.5-flash 시도 중...
✅ 영양 정보 분석 완료
🎨 음식 이미지 가져오기 시작...
🤖 AI 이미지 생성 시도 중...
🎨 이미지 생성 시도: models/gemini-2.0-flash-exp-image-generation
📝 프롬프트: Create a high-quality, professional food photography image of 떡볶이...
✅ AI 생성 이미지 완료!
✅ 최종 이미지 URL: data:image/png;base64,...
```

### 5. 결과 확인
- ✅ 칼로리, 단백질, 탄수화물, 지방 (자동)
- ✅ **AI가 생성한 떡볶이 사진** (자동) 🎨✨

---

## 🎨 **이미지 품질 비교**

| 방법 | 품질 | 속도 | 정확도 | 비용 |
|------|------|------|--------|------|
| **Gemini AI 생성** | ⭐⭐⭐⭐ | 5-10초 | ⭐⭐⭐⭐⭐ | 무료 할당량 |
| Unsplash 실제 사진 | ⭐⭐⭐⭐⭐ | 1-2초 | ⭐⭐⭐ | 50/시간 무료 |
| 사전 정의 이미지 | ⭐⭐⭐⭐ | 즉시 | ⭐⭐⭐⭐ | 무료 |
| Placeholder | ⭐ | 즉시 | ⭐ | 무료 |

---

## 💡 **AI 이미지 생성의 장점**

### ✅ **정확도**
- "BHC 뿌링클" → 실제 뿌링클 스타일 치킨 생성
- "떡볶이 2인분" → 2인분 양으로 생성 가능

### ✅ **커스터마이징**
- 한국 음식 특화 프롬프트 자동 적용
- 플레이팅, 조명, 각도 최적화

### ✅ **무제한**
- Unsplash 50/시간 제한 없음
- 사전 정의 이미지 목록 불필요

---

## 🎯 **한국 음식 특화 프롬프트**

앱이 자동으로 다음과 같은 프롬프트를 생성합니다:

### 예시 1: "떡볶이"
```
Create a high-quality, professional food photography image of 떡볶이.
Style: spicy, red, cylindrical rice cakes, Korean street food
Requirements:
- Top-down view or 45-degree angle
- Natural lighting, clean background
- Vibrant colors, appetizing presentation
- Restaurant-quality plating
```

### 예시 2: "BHC 뿌링클"
```
Create a high-quality, professional food photography image of 뿌링클.
Style: sweet and spicy chicken, Korean fried chicken
Requirements:
- Top-down view or 45-degree angle
- Vibrant colors, crispy texture
- Restaurant-quality plating
```

---

## 🆘 문제 해결

### 1. "이미지 생성 실패" 메시지

**원인:**
- Gemini 이미지 생성 모델이 아직 베타 단계
- API 할당량 초과
- 네트워크 문제

**해결:**
- ✅ **자동으로 Unsplash로 폴백** (문제 없음!)
- Console (F12)에서 다음 메시지 확인:
  ```
  📸 Unsplash 검색 시도 중...
  ```

### 2. 이미지 생성이 너무 느림 (10초 이상)

**원인:**
- AI 이미지 생성은 시간이 걸림 (정상)

**해결:**
- ✅ 기다리면 완성됩니다!
- 또는 직접 사진 촬영 (카메라 버튼)

### 3. "models/gemini-2.0-flash-exp-image-generation is not found"

**원인:**
- 이미지 생성 모델이 계정에서 사용 불가

**해결:**
- ✅ **자동으로 Unsplash로 폴백** (문제 없음!)
- Console 확인:
  ```
  ❌ models/gemini-2.0-flash-exp-image-generation 실패
  📸 Unsplash 검색 시도 중...
  ✅ 이미지 URL: https://images.unsplash.com/...
  ```

---

## 🚀 **다른 AI 이미지 생성 API (고급)**

Gemini 이미지 생성이 작동하지 않으면 다른 API를 사용할 수 있습니다:

### **Option 1: DALL-E 3 (OpenAI)**

**장점:**
- 매우 고품질
- 안정적

**단점:**
- 유료 ($0.04/image)
- 별도 API 키 필요

**설정:**
```env
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-api-key
```

**코드 예시:**
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: "A photo of Korean tteokbokki",
  size: "1024x1024",
  n: 1,
});

const imageUrl = response.data[0].url;
```

### **Option 2: Stable Diffusion API**

**장점:**
- 커스터마이징 가능
- 무료/유료 옵션

**단점:**
- 품질 불안정
- 설정 복잡

**API 제공 업체:**
- Replicate: https://replicate.com/
- Stability AI: https://platform.stability.ai/
- Hugging Face: https://huggingface.co/

---

## 📊 **비용 비교 (2026년 기준)**

| API | 무료 할당량 | 유료 가격 | 품질 |
|-----|------------|----------|------|
| **Gemini Image Gen** | 무료 (제한 있음) | 미정 | ⭐⭐⭐⭐ |
| DALL-E 3 | ❌ | $0.04/image | ⭐⭐⭐⭐⭐ |
| Stable Diffusion | ✅ 다양함 | $0.002-0.02/image | ⭐⭐⭐ |
| Unsplash (실제 사진) | 50/시간 | 무료 | ⭐⭐⭐⭐⭐ |

---

## 💡 **추천 전략**

### **무료로 최대한 활용:**
```
1. Gemini AI 이미지 생성 (무료 할당량)
2. Unsplash 실제 사진 (50/시간)
3. 사전 정의 이미지 (무제한)
```

### **고품질 필요 시:**
```
1. DALL-E 3 (유료, 최고 품질)
2. Unsplash (무료, 실제 사진)
```

### **빠른 속도 필요 시:**
```
1. 사전 정의 이미지 (즉시)
2. Unsplash (1-2초)
3. AI 생성 (5-10초)
```

---

## 🎓 **고급 기능 (커스터마이징)**

### **프롬프트 수정**

`utils/geminiImageGen.ts` 파일에서 프롬프트를 수정할 수 있습니다:

```typescript
function createFoodImagePrompt(foodName: string): string {
  return `Create a ULTRA REALISTIC photo of ${foodName}.
Style: Michelin-star restaurant, professional food photography
Camera: Canon EOS R5, 50mm f/1.2
Lighting: Natural window light, soft shadows
...`;
}
```

### **이미지 크기 조정**

모델 설정에서 크기 조정 (API 지원 시):
```typescript
const model = genAI.getGenerativeModel({ 
  model: modelName,
  generationConfig: {
    imageSize: '1024x1024', // 또는 512x512
  }
});
```

---

## 🎉 **실전 예시**

### **사용자 시나리오:**
```
1. 사용자: "떡볶이 2인분" 입력
2. AI 적용 버튼 클릭
3. 5초 대기...
4. 결과:
   - 칼로리: 600 kcal ✅
   - 단백질: 15g ✅
   - 탄수화물: 120g ✅
   - 지방: 10g ✅
   - 이미지: AI가 생성한 맛있는 떡볶이 사진 ✅🎨
5. 등록 버튼 클릭
6. 완료! 🎉
```

---

**Gemini AI 이미지 생성으로 더 이상 이미지를 찾지 않아도 됩니다!** 🎨✨

AI가 자동으로 맛있는 음식 사진을 만들어드립니다! 🤖🍽️

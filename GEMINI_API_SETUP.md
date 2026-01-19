# 🤖 Google Gemini API 설정 가이드

## 📋 개요
음식 이름으로 칼로리와 영양소(탄단지)를 자동으로 가져오는 AI 기능 설정

---

## 🚀 1단계: Google AI Studio에서 API 키 받기

### 1. Google AI Studio 접속
- https://aistudio.google.com/app/apikey 접속
- Google 계정으로 로그인

### 2. API 키 생성
1. **"Get API key"** 또는 **"Create API key"** 버튼 클릭
2. 프로젝트 선택 또는 새 프로젝트 생성
3. **API 키 복사** (나중에 다시 볼 수 없으니 저장!)

### 3. API 키 예시
```
AIzaSyD...your-api-key-here...xyz123
```

---

## 🔧 2단계: 프로젝트에 API 키 추가

### 1. `.env` 파일 열기
`C:\Users\DELL\Desktop\Nutri8\.env` 파일 열기

### 2. Gemini API 키 추가
파일 끝에 다음 줄 추가:

```env
# Supabase (기존)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini API (새로 추가)
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyD...your-api-key-here...xyz123
```

### 3. 파일 저장
`.env` 파일을 저장하세요!

---

## 📦 3단계: 패키지 설치

터미널에서 실행:

```bash
npm install @google/generative-ai
```

---

## 🧪 4단계: API 테스트

### 브라우저 콘솔(F12)에서 확인

앱 실행 후 콘솔에서 다음 메시지를 찾으세요:

✅ **성공:**
```
✅ Gemini API 초기화 성공
```

❌ **실패:**
```
⚠️ Gemini API Key가 설정되지 않았습니다
```

---

## 💡 5단계: 사용 방법

### Input 화면에서 사용

1. **음식명 입력**
   - 예: "불고기"

2. **"AI 적용" 버튼 클릭** 🤖
   - 자동으로 칼로리, 단백질, 탄수화물, 지방이 입력됩니다!

3. **결과 확인**
   ```
   음식명: 불고기
   칼로리: 280 kcal (자동 입력!)
   단백질: 25g (자동 입력!)
   탄수화물: 8g (자동 입력!)
   지방: 15g (자동 입력!)
   ```

4. **필요시 수정**
   - AI가 입력한 값을 직접 수정할 수 있습니다

5. **등록하기**
   - 값을 확인하고 등록 버튼 클릭!

---

## 📊 지원되는 음식

### 한식
- ✅ 불고기, 김치찌개, 된장찌개, 비빔밥, 삼겹살 등

### 양식
- ✅ 스테이크, 파스타, 피자, 햄버거 등

### 일식
- ✅ 초밥, 라면, 우동, 돈까스 등

### 중식
- ✅ 짜장면, 짬뽕, 탕수육 등

### 기타
- ✅ 샐러드, 과일, 빵, 디저트 등

**거의 모든 음식 지원!** 🎉

---

## ⚙️ AI 작동 방식

### 1. 음식 이름 전송
```
사용자 입력: "불고기"
```

### 2. Gemini AI 분석
```
AI가 1인분 기준 영양 정보 계산:
- 일반적인 불고기 1인분 (약 150g)
- 양념, 조리법 고려
- 평균적인 영양소 계산
```

### 3. 결과 반환
```json
{
  "calories": 280,
  "protein": 25,
  "carbs": 8,
  "fat": 15
}
```

### 4. 자동 입력
폼의 각 필드에 자동으로 값이 입력됩니다!

---

## 🔒 보안 및 제한사항

### API 키 보안
- ✅ `.env` 파일은 `.gitignore`에 포함됨
- ✅ GitHub에 절대 업로드되지 않음
- ⚠️ API 키를 절대 공개하지 마세요!

### 사용 제한
- **무료 할당량**: 월 60회 요청 무료
- **추가 요청**: 유료 (매우 저렴)
- **Rate Limit**: 분당 15회

### 참고사항
- ✅ 1인분 기준으로 계산됨
- ✅ 평균적인 값이므로 실제와 다를 수 있음
- ✅ 필요시 직접 수정 가능

---

## 🆘 문제 해결

### "API Key가 설정되지 않았습니다"
1. `.env` 파일 확인
2. `EXPO_PUBLIC_GEMINI_API_KEY` 오타 확인
3. 앱 재시작 (터미널에서 Ctrl+C 후 다시 `npm start`)

### "AI 분석 실패"
1. 인터넷 연결 확인
2. API 키가 유효한지 확인
3. 음식 이름을 더 구체적으로 입력

### "너무 많은 요청"
1. Rate Limit 초과
2. 잠시 기다린 후 다시 시도
3. 하루에 60회 이상 사용했다면 내일 다시 시도

---

## 💰 비용

### 무료 플랜
- ✅ 월 60회 무료
- ✅ 개인 사용에 충분

### 유료 플랜
- 필요시 Google Cloud에서 결제 설정
- 매우 저렴 (1000회당 약 $0.001)

---

## 📚 추가 정보

- **Gemini API 문서**: https://ai.google.dev/
- **API 키 관리**: https://aistudio.google.com/app/apikey
- **요금제**: https://ai.google.dev/pricing

---

## ✅ 완료 체크리스트

- [ ] Google AI Studio에서 API 키 생성
- [ ] `.env` 파일에 API 키 추가
- [ ] `npm install @google/generative-ai` 실행
- [ ] 앱 재시작 (터미널에서 Ctrl+C 후 `npm start`)
- [ ] 브라우저 새로고침 (F5)
- [ ] Input 탭에서 "AI 적용" 버튼 확인
- [ ] 테스트: "불고기" 입력 후 AI 적용 클릭

---

**설정이 완료되면 AI가 자동으로 영양 정보를 채워줍니다!** 🤖✨

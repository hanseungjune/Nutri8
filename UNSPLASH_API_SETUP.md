# 🖼️ Unsplash API 설정 가이드

## 🎯 목적
Nutri8 앱에서 AI 적용 버튼을 누르면 음식 이름으로 자동으로 **고품질 이미지**를 검색하여 추가

---

## ✨ 기능
- ✅ AI 적용 버튼 클릭 시 **영양 정보 + 이미지** 자동 입력
- ✅ Unsplash의 고품질 무료 이미지 사용
- ✅ 무료 할당량: **50 requests/hour**
- ✅ API 키 없어도 앱 작동 (폴백 이미지 사용)

---

## 📋 1단계: Unsplash 계정 생성

### 1. Unsplash Developers 사이트 접속
https://unsplash.com/developers

### 2. 회원가입 또는 로그인
- 이메일 또는 소셜 계정 (Google, Facebook 등)으로 가입

---

## 📋 2단계: 애플리케이션 등록

### 1. "Register as a developer" 클릭
- 처음 접속 시 개발자 등록 화면이 나타남

### 2. 개발자 약관 동의
- "Accept Terms" 클릭

### 3. 새 애플리케이션 만들기
1. 우측 상단 **"New Application"** 버튼 클릭
2. 약관 체크박스 선택
3. **"Accept Terms"** 클릭

### 4. 애플리케이션 정보 입력
```
Application Name: Nutri8 Diet App
Description: A diet management app that helps users track their meals
```

### 5. "Create Application" 클릭

---

## 📋 3단계: Access Key 복사

### 1. Application 페이지에서 Keys 확인
- **Access Key**: 공개 키 (프론트엔드 사용)
- **Secret Key**: 비밀 키 (사용하지 않음)

### 2. Access Key 복사
```
예시: AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

⚠️ **중요:** Access Key만 복사하세요! (Secret Key는 사용하지 않습니다)

---

## 📋 4단계: `.env` 파일에 API 키 추가

프로젝트 루트의 `.env` 파일을 열고 다음을 추가:

```env
EXPO_PUBLIC_UNSPLASH_ACCESS_KEY=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**⚠️ 주의:**
- `.env` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함)
- `.env` 파일 수정 후 **앱을 반드시 재시작**하세요

---

## 📋 5단계: 앱 재시작

터미널에서:
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

### 4. 결과 확인
- ✅ 칼로리, 단백질, 탄수화물, 지방 자동 입력
- ✅ **음식 이미지 자동 추가** 📸

### 5. Console 확인 (F12)
```
🤖 AI 분석 시작: 영양 정보 + 이미지
🔄 models/gemini-2.5-flash 시도 중...
✅ 영양 정보 분석 완료
🖼️ 음식 이미지 검색 중...
✅ 이미지 URL: https://images.unsplash.com/photo-...
```

---

## 📊 무료 할당량

| 항목 | 제한 |
|------|------|
| **시간당 요청** | 50 requests |
| **월간 요청** | 무제한 (시간당 제한만 있음) |
| **이미지 품질** | 고품질 무료 이미지 |

**💡 팁:**
- 시간당 50회 제한은 일반 사용에 충분합니다
- 제한 초과 시 자동으로 폴백 이미지 사용

---

## 🔧 폴백 옵션 (API 키 없을 때)

Unsplash API 키가 없어도 앱은 정상 작동합니다!

### 자동 폴백 순서:
1. **Unsplash API** (API 키 있을 때)
2. **사전 정의된 한국 음식 이미지** (떡볶이, 김치찌개, 불고기 등)
3. **Placeholder 이미지** (음식 이름 텍스트)

---

## 🆘 문제 해결

### 1. "Unsplash Access Key가 설정되지 않았습니다" 경고
```
해결:
1. .env 파일에 EXPO_PUBLIC_UNSPLASH_ACCESS_KEY 추가
2. 앱 재시작 (Ctrl+C → npm start)
3. 브라우저 새로고침 (Ctrl+Shift+R)
```

### 2. "Rate Limit Exceeded" 오류 (시간당 50회 초과)
```
해결:
1. 1시간 후 다시 시도
2. 또는 폴백 이미지 자동 사용 (앱은 정상 작동)
```

### 3. 이미지가 자동으로 추가되지 않음
```
확인 사항:
1. .env 파일에 API 키가 올바르게 설정되었는지 확인
2. 앱을 재시작했는지 확인
3. 브라우저 Console (F12)에서 오류 메시지 확인
4. 인터넷 연결 확인
```

---

## 🎨 사용 예시

### 예시 1: "떡볶이 2인분"
```
1. 음식명 입력: "떡볶이 2인분"
2. "AI 적용 🤖" 클릭
3. 결과:
   - 칼로리: 600 kcal (자동)
   - 단백질: 15g (자동)
   - 탄수화물: 120g (자동)
   - 지방: 10g (자동)
   - 이미지: 빨간 떡볶이 사진 (자동) 📸
```

### 예시 2: "BHC 뿌링클"
```
1. 음식명 입력: "BHC 뿌링클"
2. "AI 적용 🤖" 클릭
3. 결과:
   - 칼로리: 520 kcal (자동)
   - 단백질: 28g (자동)
   - 탄수화물: 32g (자동)
   - 지방: 28g (자동)
   - 이미지: 황금색 치킨 사진 (자동) 📸
```

---

## 💡 추가 팁

### 더 정확한 이미지 검색을 위해:
- ✅ 구체적인 음식명 사용
  - 좋음: "떡볶이", "김치찌개", "불고기"
  - 피함: "밥", "고기" (너무 일반적)

### API 절약 팁:
- 같은 음식은 한 번만 검색 후 이미지 URL 저장
- 자주 먹는 음식은 직접 사진 촬영 (카메라 버튼)

---

## 📚 참고 자료

- [Unsplash Developers](https://unsplash.com/developers)
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash 이용 약관](https://unsplash.com/terms)

---

**Unsplash API 설정을 완료하시면, AI 영양 정보와 함께 아름다운 음식 사진도 자동으로 추가됩니다!** 🖼️✨

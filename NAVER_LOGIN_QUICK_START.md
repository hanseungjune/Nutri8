# 🟢 네이버 로그인 - 빠른 시작 가이드

## 🎯 **5분 만에 설정하기**

---

## ✅ Step 1: 네이버 개발자 센터 애플리케이션 등록 (3분)

### 1. 네이버 개발자 센터 접속

브라우저에서 열기:
```
https://developers.naver.com/apps/#/register
```

### 2. 애플리케이션 등록

**애플리케이션 이름:**
```
Nutri8
```

**사용 API:**
- ✅ **네이버 로그인** 체크

**제공 정보 선택:**
- ✅ 회원이름
- ✅ 이메일 주소

**서비스 환경:**

**PC 웹:**
- ✅ 체크
- **서비스 URL:**
  ```
  http://localhost:8081
  ```
- **Callback URL:**
  ```
  http://localhost:8081/auth/callback
  ```

**"등록하기"** 클릭!

### 3. Client ID/Secret 복사

등록 완료 후 화면에 표시되는 정보를 복사:

```
Client ID: [복사!]
Client Secret: [복사!]
```

---

## ✅ Step 2: 환경 변수 설정 (1분)

### `.env` 파일 열기

프로젝트 루트의 `.env` 파일을 열어서 추가:

```env
# 네이버 로그인
EXPO_PUBLIC_NAVER_CLIENT_ID=복사한_Client_ID
EXPO_PUBLIC_NAVER_CLIENT_SECRET=복사한_Client_Secret
```

**저장!**

---

## ✅ Step 3: 앱 재시작 (1분)

### 현재 실행 중인 앱 종료

터미널에서 `Ctrl + C`

### 다시 시작

```bash
npm start
```

웹 브라우저 열기 (w키)

---

## ✅ Step 4: 테스트 (1분)

### 로그인 화면에서:

1. **"네이버로 로그인"** 버튼 확인 (초록색)
2. 버튼 클릭
3. 네이버 로그인 페이지로 이동
4. 네이버 계정으로 로그인
5. 동의하기
6. 앱으로 리다이렉트

---

## 🎉 완료!

네이버 로그인이 작동합니다!

---

## 🐛 문제 해결

### "등록되지 않은 Redirect URI" 오류

**원인:** Callback URL이 일치하지 않음

**해결:**
1. 네이버 개발자 센터 → 내 애플리케이션
2. "API 설정" 탭
3. Callback URL 확인:
   ```
   http://localhost:8081/auth/callback
   ```
4. 정확히 일치하는지 확인

### "잘못된 클라이언트" 오류

**원인:** Client ID/Secret이 틀림

**해결:**
1. `.env` 파일 확인
2. 네이버 개발자 센터에서 다시 복사
3. 앱 재시작

### 버튼이 안 보여요

**원인:** 코드가 업데이트되지 않음

**해결:**
```bash
# 캐시 삭제 후 재시작
npm start -- --clear
```

---

## 🚀 Vercel 배포 시

### 1. 네이버 개발자 센터 Callback URL 추가

```
https://nutri8-6z1o.vercel.app/auth/callback
```

### 2. Vercel 환경 변수 추가

Vercel Dashboard → Settings → Environment Variables

```
EXPO_PUBLIC_NAVER_CLIENT_ID = your-client-id
EXPO_PUBLIC_NAVER_CLIENT_SECRET = your-client-secret
```

### 3. 재배포

```bash
git add .
git commit -m "네이버 로그인 추가"
git push origin main
```

---

## 📚 자세한 가이드

전체 문서: `NAVER_LOGIN_SETUP.md`

---

*최종 업데이트: 2026년 1월 19일*

# 🔐 Google OAuth 설정 가이드

## 📋 개요

Nutri8 앱에 Google 소셜 로그인 기능을 추가하는 방법입니다.

---

## 🚀 설정 단계

### 1단계: Supabase에서 Google OAuth 활성화

#### 1.1 Supabase Dashboard 접속
- https://app.supabase.com
- 프로젝트 선택

#### 1.2 Google Provider 활성화
1. 왼쪽 메뉴 → **Authentication** → **Providers**
2. **Google** 찾기
3. **Enable** 토글 켜기
4. 아래 정보를 나중에 사용하기 위해 복사해두기:
   - **Authorized Client IDs**: (나중에 입력)
   - **Callback URL (for OAuth)**: 복사 (예: `https://xxx.supabase.co/auth/v1/callback`)

---

### 2단계: Google Cloud Console 설정

#### 2.1 Google Cloud Console 접속
- https://console.cloud.google.com
- 프로젝트 생성 또는 선택

#### 2.2 OAuth 동의 화면 설정
1. **APIs & Services** → **OAuth consent screen**
2. User Type: **External** 선택 → **Create**
3. 앱 정보 입력:
   - **App name**: Nutri8
   - **User support email**: 본인 이메일
   - **Developer contact information**: 본인 이메일
4. **Save and Continue**
5. Scopes: 기본값 유지 → **Save and Continue**
6. Test users: (선택사항) 테스트 계정 추가 → **Save and Continue**

#### 2.3 OAuth 클라이언트 ID 생성
1. **APIs & Services** → **Credentials**
2. **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Nutri8 Web Client`
5. **Authorized redirect URIs** 추가:
   - Supabase에서 복사한 Callback URL 붙여넣기
   - 예: `https://xxx.supabase.co/auth/v1/callback`
6. **Create** 클릭
7. **Client ID**와 **Client Secret** 복사 (중요!)

#### 2.4 Android OAuth 클라이언트 ID 생성 (모바일용)
1. **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Android**
3. Name: `Nutri8 Android`
4. Package name: `com.nutri8.app` (app.json의 package 확인)
5. SHA-1 certificate fingerprint 입력:

**개발용 SHA-1 얻기 (Windows):**
```powershell
cd %USERPROFILE%\.android
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**개발용 SHA-1 얻기 (Mac/Linux):**
```bash
cd ~/.android
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```

6. SHA-1 복사하여 입력
7. **Create** 클릭
8. **Client ID** 복사

#### 2.5 iOS OAuth 클라이언트 ID 생성 (iOS용)
1. **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **iOS**
3. Name: `Nutri8 iOS`
4. Bundle ID: `com.nutri8.app` (app.json의 bundleIdentifier 확인)
5. **Create** 클릭
6. **Client ID** 복사

---

### 3단계: Supabase에 Google OAuth 정보 입력

1. Supabase Dashboard로 돌아가기
2. **Authentication** → **Providers** → **Google**
3. 다음 정보 입력:
   - **Authorized Client IDs**: 
     ```
     웹 Client ID
     안드로이드 Client ID
     iOS Client ID
     ```
     (각각을 줄바꿈으로 구분)
   - **Client ID (for server side)**: 웹 Client ID
   - **Client Secret (for server side)**: 웹 Client Secret
4. **Save** 클릭

---

### 4단계: app.json 업데이트

`app.json` 파일에 scheme 추가:

```json
{
  "expo": {
    "name": "Nutri8",
    "slug": "nutri8",
    "scheme": "nutri8",  // 이미 있음
    // ... 기타 설정
  }
}
```

---

### 5단계: 앱 실행 및 테스트

```bash
# 캐시 클리어 후 재시작
npm start -- --clear
```

#### 테스트 순서:
1. 로그인 화면에서 "Google로 로그인" 버튼 클릭
2. 브라우저가 열리고 Google 로그인 화면 표시
3. Google 계정 선택 또는 로그인
4. 권한 동의
5. 앱으로 자동 리다이렉트
6. 로그인 완료!

---

## 🔧 문제 해결

### "redirect_uri_mismatch" 에러

**원인**: Google Cloud Console의 Authorized redirect URIs가 올바르지 않음

**해결**:
1. 에러 메시지의 redirect_uri 확인
2. Google Cloud Console → OAuth client → Authorized redirect URIs에 해당 URI 추가
3. Supabase Callback URL과 정확히 일치하는지 확인

### 브라우저가 열리지 않음

**원인**: expo-web-browser 또는 expo-linking 문제

**해결**:
```bash
npm install expo-web-browser expo-linking
npx expo install expo-web-browser expo-linking
npm start -- --clear
```

### 로그인 후 앱으로 돌아오지 않음

**원인**: Deep link scheme 설정 문제

**해결**:
1. `app.json`에서 `"scheme": "nutri8"` 확인
2. Supabase → Authentication → URL Configuration
3. **Redirect URLs** 추가: `nutri8://auth/callback`
4. 앱 재시작

### Android에서 작동하지 않음

**원인**: SHA-1 fingerprint 불일치

**해결**:
1. SHA-1 다시 확인:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```
2. Google Cloud Console에서 올바른 SHA-1 입력
3. 앱 재빌드

### iOS에서 작동하지 않음

**원인**: Bundle ID 불일치

**해결**:
1. `app.json`의 `ios.bundleIdentifier` 확인
2. Google Cloud Console의 iOS Client Bundle ID와 일치하는지 확인
3. 앱 재빌드

---

## 📱 추가 소셜 로그인

같은 방식으로 다른 소셜 로그인도 추가 가능:

### Apple 로그인 (iOS 필수)
- Supabase → Providers → **Apple**
- Apple Developer에서 Sign in with Apple 설정

### Facebook 로그인
- Supabase → Providers → **Facebook**
- Facebook Developer에서 앱 생성

### GitHub 로그인
- Supabase → Providers → **GitHub**
- GitHub OAuth Apps 생성

---

## 🔐 보안 권장사항

1. **Client Secret 보안**
   - Client Secret은 절대 앱 코드에 포함하지 마세요
   - Supabase에서만 관리됩니다

2. **Production 배포 시**
   - SHA-1을 프로덕션 키스토어로 변경
   - OAuth 동의 화면을 "In Production" 상태로 변경
   - Test users 제한 해제

3. **Redirect URIs**
   - 프로덕션 도메인 추가
   - 개발/스테이징/프로덕션 각각 별도 URI

---

## 📚 참고 자료

- [Supabase Google OAuth 문서](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2)
- [Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)

---

## ✅ 체크리스트

- [ ] Supabase에서 Google Provider 활성화
- [ ] Google Cloud Console 프로젝트 생성
- [ ] OAuth 동의 화면 설정
- [ ] 웹 OAuth Client ID 생성
- [ ] Android OAuth Client ID 생성
- [ ] iOS OAuth Client ID 생성
- [ ] Supabase에 Client IDs 입력
- [ ] app.json scheme 확인
- [ ] 앱 재시작 및 테스트
- [ ] Google 로그인 성공!

---

**설정 완료 시간: 약 15-20분**

*최종 업데이트: 2026년 1월 17일*

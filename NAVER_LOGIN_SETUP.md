# 🟢 네이버 로그인 설정 가이드

## 📋 목차
1. [네이버 개발자 센터 애플리케이션 등록](#네이버-개발자-센터-애플리케이션-등록)
2. [Supabase 설정](#supabase-설정)
3. [앱 코드 업데이트](#앱-코드-업데이트)
4. [테스트](#테스트)

---

## 🚀 네이버 개발자 센터 애플리케이션 등록

### Step 1: 네이버 개발자 센터 접속

https://developers.naver.com/apps/#/register

### Step 2: 애플리케이션 등록

1. **"애플리케이션 등록"** 클릭

2. **애플리케이션 정보 입력:**

   **애플리케이션 이름:**
   ```
   Nutri8
   ```

   **사용 API:**
   - ✅ **네이버 로그인** 체크

3. **서비스 환경 설정:**

   **PC 웹:**
   - ✅ 체크
   - **서비스 URL:**
     ```
     http://localhost:8081
     ```
   - **Callback URL:**
     ```
     http://localhost:8081/auth/callback
     https://nutri8-6z1o.vercel.app/auth/callback
     ```

   **모바일 웹:**
   - ✅ 체크 (선택)
   - 같은 URL 입력

4. **제공 정보 선택:**
   - ✅ **회원이름**
   - ✅ **이메일 주소**
   - ✅ **프로필 사진** (선택)

5. **"등록하기"** 클릭

### Step 3: Client ID/Secret 확인

등록 완료 후:

```
Client ID: YOUR_CLIENT_ID (저장!)
Client Secret: YOUR_CLIENT_SECRET (저장!)
```

---

## ⚙️ Supabase 설정

Supabase는 네이버를 기본 OAuth 제공자로 지원하지 않습니다.
따라서 **Edge Function**을 사용하여 네이버 OAuth를 구현합니다.

### 옵션 1: Supabase Edge Function (권장)

#### 1. Supabase Dashboard 접속
```
https://supabase.com/dashboard
```

#### 2. Edge Functions 생성

좌측 메뉴 → **Edge Functions** → **Create a new function**

**Function Name:**
```
naver-oauth
```

**Function Code:**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const NAVER_CLIENT_ID = Deno.env.get('NAVER_CLIENT_ID')!
const NAVER_CLIENT_SECRET = Deno.env.get('NAVER_CLIENT_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  const { code, state } = await req.json()

  try {
    // 1. 네이버 액세스 토큰 획득
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: NAVER_CLIENT_ID,
        client_secret: NAVER_CLIENT_SECRET,
        code,
        state,
      }),
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. 네이버 사용자 정보 조회
    const profileResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const profileData = await profileResponse.json()
    const { id, email, name, profile_image } = profileData.response

    // 3. Supabase에 사용자 생성 또는 로그인
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // 네이버 ID로 사용자 검색
    let { data: user, error } = await supabase.auth.admin.getUserById(`naver_${id}`)

    if (!user) {
      // 새 사용자 생성
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email || `naver_${id}@nutri8.app`,
        email_confirm: true,
        user_metadata: {
          name,
          avatar_url: profile_image,
          provider: 'naver',
          naver_id: id,
        },
      })

      if (createError) throw createError
      user = newUser.user
    }

    // 4. 세션 생성
    const { data: session, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email!,
    })

    if (sessionError) throw sessionError

    return new Response(
      JSON.stringify({ success: true, session }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

#### 3. 환경 변수 설정

Supabase Dashboard → Settings → Functions → **Add secret**

```
NAVER_CLIENT_ID = your_client_id
NAVER_CLIENT_SECRET = your_client_secret
```

### 옵션 2: 직접 구현 (간단)

앱에서 직접 네이버 OAuth를 처리합니다.

---

## 💻 앱 코드 업데이트

### 1. 환경 변수 추가

`.env` 파일:

```env
# 네이버 로그인
EXPO_PUBLIC_NAVER_CLIENT_ID=YOUR_CLIENT_ID
EXPO_PUBLIC_NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

### 2. authStore에 네이버 로그인 함수 추가

`stores/authStore.ts`에 추가됨 ✅

### 3. 로그인 화면에 네이버 버튼 추가

`app/auth/login.tsx`에 추가됨 ✅

---

## 🧪 테스트

### 로컬 테스트:

1. **앱 실행:**
   ```bash
   npm start
   ```

2. **웹 브라우저 열기** (w키)

3. **로그인 화면에서 "네이버로 로그인" 클릭**

4. **네이버 로그인 진행**

5. **앱으로 리다이렉트 확인**

### Vercel 배포 후 테스트:

1. **네이버 개발자 센터**에서 Callback URL에 Vercel URL 추가:
   ```
   https://nutri8-6z1o.vercel.app/auth/callback
   ```

2. **Vercel 환경 변수** 추가:
   ```
   EXPO_PUBLIC_NAVER_CLIENT_ID
   EXPO_PUBLIC_NAVER_CLIENT_SECRET
   ```

3. **재배포 후 테스트**

---

## 🔐 보안 참고사항

### Client Secret 보호:

⚠️ **중요:** Client Secret은 서버에서만 사용해야 합니다!

**해결 방법:**
1. Supabase Edge Function 사용 (권장)
2. 별도 백엔드 API 서버 구축
3. Vercel Serverless Function 사용

### 프로덕션 배포 시:

1. **네이버 개발자 센터**에서 서비스 URL을 실제 도메인으로 변경
2. **Callback URL**을 정확하게 설정
3. **환경 변수**를 안전하게 관리

---

## 📚 참고 자료

- [네이버 로그인 API 가이드](https://developers.naver.com/docs/login/overview/)
- [네이버 OAuth 2.0](https://developers.naver.com/docs/login/api/)
- [Supabase Custom OAuth](https://supabase.com/docs/guides/auth/social-login/auth-custom)

---

## ❓ 자주 묻는 질문

### Q: 네이버 로그인이 실패해요
A: Callback URL이 정확한지 확인하세요. 네이버 개발자 센터에 등록된 URL과 일치해야 합니다.

### Q: "잘못된 클라이언트" 오류
A: Client ID/Secret이 올바른지 확인하세요.

### Q: 앱에서 네이버 로그인이 안 돼요
A: 현재는 웹 버전에서만 작동합니다. 모바일 앱은 추가 설정이 필요합니다.

---

*최종 업데이트: 2026년 1월 19일*

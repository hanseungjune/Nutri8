# 🔐 Nutri8 인증 시스템 가이드

## 📋 개요

Nutri8 앱에 Supabase 기반 인증 시스템이 구현되었습니다. 이제 사용자마다 독립적인 데이터를 관리할 수 있습니다.

---

## ✅ 구현된 기능

### 1. 인증 기능
- ✅ 이메일/비밀번호 회원가입
- ✅ 로그인
- ✅ **Google 소셜 로그인** (OAuth)
- ✅ 로그아웃
- ✅ 세션 관리 (자동 로그인 유지)
- ✅ 인증 상태 확인

### 2. 데이터 보안
- ✅ Row Level Security (RLS) 적용
- ✅ 사용자별 데이터 격리
- ✅ `user_id` 기반 데이터 필터링

### 3. UI 구성
- ✅ 로그인 화면 (`/auth/login`)
  - 이메일/비밀번호 로그인
  - **Google로 로그인 버튼**
- ✅ 회원가입 화면 (`/auth/register`)
  - 이메일/비밀번호 회원가입
  - **Google로 계속하기 버튼**
- ✅ 설정 화면에 로그아웃 버튼

---

## 🚀 설정 방법

### 1단계: Supabase 데이터베이스 마이그레이션

Supabase Dashboard의 SQL Editor에서 다음 파일을 실행하세요:

```bash
supabase-auth-migration.sql
```

이 스크립트는:
- 모든 테이블에 `user_id` 컬럼 추가
- RLS 정책 업데이트 (사용자별 데이터 격리)
- 인덱스 생성 (성능 향상)

### 2단계: 기존 데이터 처리 (선택사항)

기존 데이터가 있는 경우:

#### 옵션 A: 테스트 데이터 삭제 (권장)
```sql
DELETE FROM meals WHERE user_id IS NULL;
DELETE FROM goals WHERE user_id IS NULL;
DELETE FROM weight_records WHERE user_id IS NULL;
DELETE FROM user_profile WHERE user_id IS NULL;
```

#### 옵션 B: 특정 사용자에게 할당
```sql
-- 먼저 회원가입하여 사용자 ID 확인
-- Supabase Dashboard > Authentication > Users에서 ID 복사

UPDATE meals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE goals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE weight_records SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
```

### 3단계: 앱 실행

```bash
npm start
```

앱이 시작되면 자동으로 로그인 화면으로 이동합니다.

---

## 📱 사용 방법

### 회원가입
1. 앱 실행
2. "회원가입" 버튼 클릭
3. 이메일, 비밀번호 입력 (비밀번호 최소 6자)
4. (선택) 이름 입력
5. "회원가입" 버튼 클릭

**참고**: 이메일 확인이 필요한 경우 이메일을 확인하세요.

### 로그인
1. 이메일, 비밀번호 입력
2. "로그인" 버튼 클릭
3. 자동으로 메인 화면으로 이동

### 로그아웃
1. 설정 탭으로 이동
2. 상단의 사용자 정보 카드에서 "로그아웃" 버튼 클릭
3. 확인 대화상자에서 "로그아웃" 선택

---

## 🔒 보안 기능

### Row Level Security (RLS)

모든 테이블에 RLS 정책이 적용되어 있습니다:

```sql
-- 예시: meals 테이블
CREATE POLICY "Users can view own meals"
ON meals FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals"
ON meals FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

이로 인해:
- ✅ 사용자는 자신의 데이터만 조회 가능
- ✅ 사용자는 자신의 데이터만 추가 가능
- ✅ 사용자는 자신의 데이터만 수정 가능
- ✅ 사용자는 자신의 데이터만 삭제 가능

### 자동 user_id 할당

데이터 저장 시 자동으로 현재 로그인한 사용자의 ID가 할당됩니다:

```typescript
// utils/db/queries.ts
const { data: { user } } = await supabase.auth.getUser();

const insertData = {
  user_id: user.id,  // 자동으로 할당
  // ... 기타 데이터
};
```

---

## 🧩 구조

### 인증 관련 파일

```
Nutri8/
├── types/
│   └── auth.ts                    # 인증 타입 정의
├── stores/
│   └── authStore.ts               # 인증 상태 관리 (Zustand)
├── app/
│   ├── _layout.tsx                # 인증 라우팅 로직
│   ├── auth/
│   │   ├── login.tsx              # 로그인 화면
│   │   └── register.tsx           # 회원가입 화면
│   └── (tabs)/
│       └── settings.tsx           # 로그아웃 버튼
├── utils/db/
│   ├── supabase.ts                # Supabase 클라이언트
│   └── queries.ts                 # user_id 포함된 쿼리
└── supabase-auth-migration.sql    # DB 마이그레이션 스크립트
```

### 인증 플로우

```
앱 시작
   ↓
세션 확인
   ↓
┌──────────────┐
│ 로그인 여부? │
└──────────────┘
   ↓          ↓
  예         아니오
   ↓          ↓
메인 앱    로그인 화면
(tabs)    (/auth/login)
            ↓
       회원가입 가능
      (/auth/register)
```

---

## 🎯 인증 스토어 사용법

### 로그인 상태 확인

```typescript
import { useAuthStore } from '../stores/authStore';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }

  if (!isAuthenticated) {
    return <Text>로그인이 필요합니다.</Text>;
  }

  return <Text>환영합니다, {user?.email}!</Text>;
}
```

### 로그인/회원가입

```typescript
import { useAuthStore } from '../stores/authStore';

function LoginComponent() {
  const { signIn, signUp, signOut } = useAuthStore();

  // 로그인
  const handleLogin = async () => {
    const { error } = await signIn({ email, password });
    if (error) {
      Alert.alert('오류', error.message);
    }
  };

  // 회원가입
  const handleRegister = async () => {
    const { error } = await signUp({ email, password, name });
    if (error) {
      Alert.alert('오류', error.message);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    await signOut();
  };
}
```

---

## 🐛 문제 해결

### 로그인이 안 돼요

**원인**: Supabase 환경 변수가 설정되지 않음

**해결**:
1. `.env` 파일 확인
2. `EXPO_PUBLIC_SUPABASE_URL`과 `EXPO_PUBLIC_SUPABASE_ANON_KEY` 확인
3. 앱 재시작: `npm start -- --clear`

### 데이터가 조회되지 않아요

**원인**: RLS 정책이 적용되지 않았거나 user_id가 없음

**해결**:
1. `supabase-auth-migration.sql` 실행 확인
2. Supabase Dashboard에서 RLS 정책 확인
3. 데이터베이스에 `user_id` 컬럼 확인

```sql
-- RLS 정책 확인
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- user_id 컬럼 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'meals';
```

### 이메일 확인이 필요하다고 나와요

**원인**: Supabase에서 이메일 확인이 활성화됨

**해결**:
1. 이메일 확인 링크 클릭
2. 또는 Supabase Dashboard에서 이메일 확인 비활성화:
   - Authentication > Settings
   - "Enable email confirmations" 끄기

### 기존 데이터가 보이지 않아요

**원인**: 기존 데이터에 `user_id`가 없음

**해결**:
```sql
-- 특정 사용자에게 할당
UPDATE meals 
SET user_id = 'YOUR_USER_ID' 
WHERE user_id IS NULL;
```

---

## 📊 데이터베이스 스키마 변경사항

### 변경 전
```sql
CREATE TABLE meals (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  meal_type VARCHAR(20) NOT NULL,
  -- ...
);
```

### 변경 후
```sql
CREATE TABLE meals (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- 추가
  date DATE NOT NULL,
  meal_type VARCHAR(20) NOT NULL,
  -- ...
);
```

모든 테이블(`meals`, `goals`, `weight_records`, `user_profile`)에 동일하게 적용됩니다.

---

## 🔑 환경 변수

`.env` 파일에 다음 변수가 필요합니다:

```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🎉 다음 단계

- [x] **Google 소셜 로그인 추가** ✅
- [ ] 추가 소셜 로그인 (Apple, Kakao, Facebook)
- [ ] 비밀번호 재설정 기능
- [ ] 프로필 정보 수정 기능
- [ ] 계정 삭제 기능

---

## 📖 Google OAuth 설정

Google 로그인을 활성화하려면 추가 설정이 필요합니다:

👉 **[GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)** 파일을 참고하세요.

간단 요약:
1. Google Cloud Console에서 OAuth 클라이언트 생성
2. Supabase에 Client ID/Secret 입력
3. 앱 재시작
4. "Google로 로그인" 버튼 클릭!

---

## 📚 참고 자료

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Expo Router Authentication](https://docs.expo.dev/router/reference/authentication/)

---

**인증 시스템 구현 완료!** 🎊

이제 사용자마다 독립적인 데이터를 안전하게 관리할 수 있습니다.

*최종 업데이트: 2026년 1월 17일*

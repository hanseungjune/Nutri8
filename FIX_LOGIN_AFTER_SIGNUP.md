# 🔧 회원가입 후 로그인 실패 해결 가이드

## 🎯 문제 상황
- ✅ 회원가입 성공
- ✅ Supabase DB에 유저 정보 기록됨
- ❌ 로그인 실패

---

## 💡 원인
**Supabase 이메일 확인이 활성화**되어 있어서, 이메일 확인 전까지 로그인 불가!

---

## ✅ 해결 방법

### **방법 1: 기존 사용자 이메일 수동 확인**

#### **Supabase Dashboard:**

1. **https://supabase.com/dashboard** 접속

2. **프로젝트 선택** (Nutri8)

3. **SQL Editor** 클릭 (좌측 메뉴)

4. **다음 쿼리 실행:**

```sql
-- 모든 미확인 사용자 이메일 확인 처리
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

5. **"Run"** 또는 **"F5"** 클릭

6. ✅ **완료! 이제 로그인 가능**

---

### **방법 2: 이메일 확인 기능 비활성화 (개발 환경)**

#### **Supabase Dashboard:**

1. **Authentication** → **Settings**

2. **"Email" 섹션 찾기**

3. **"Enable email confirmations"** 설정

4. **체크 해제** ✅→❌

5. **"Save"** 클릭

6. **기존 사용자도 방법 1의 SQL 실행 필요!**

---

## 🧪 테스트

### **1. SQL 실행 확인:**

```sql
-- 사용자 확인 상태 조회
SELECT email, email_confirmed_at, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
```

결과:
```
email              | email_confirmed_at      | created_at
-------------------+-------------------------+-------------------------
test@example.com   | 2026-01-19 12:34:56     | 2026-01-19 12:30:00
```

✅ `email_confirmed_at`에 날짜가 있으면 성공!

---

### **2. 로그인 테스트:**

1. 앱 로그인 화면
2. 이메일/비밀번호 입력
3. "로그인" 클릭
4. ✅ 메인 화면으로 이동 확인

---

## 🐛 여전히 안 되면

### **브라우저 Console 확인:**

1. `F12` (개발자 도구)
2. **Console 탭**
3. 로그인 시도
4. 에러 메시지 캡처:

```
❌ 로그인 실패: [에러 메시지]
```

### **일반적인 에러:**

#### **"Email not confirmed"**
```
해결: 위의 SQL 실행
```

#### **"Invalid login credentials"**
```
원인: 비밀번호 틀림
해결: 비밀번호 재확인 또는 재설정
```

#### **"User not found"**
```
원인: 이메일 주소 틀림
해결: Supabase Dashboard → Users에서 실제 이메일 확인
```

---

## 📊 Supabase Users 테이블 확인

### **Dashboard에서:**

1. **Authentication** → **Users**

2. **사용자 목록 확인:**
   - Email
   - Created At
   - Last Sign In At
   - Confirmed ✅/❌

3. **Confirmed가 ❌ 이면:**
   - SQL로 수동 확인 (방법 1)

---

## 🎯 개발 환경 권장 설정

### **Supabase Settings:**

```
Authentication → Settings → Email

✅ Enable email provider: ON
❌ Enable email confirmations: OFF (개발 중)
❌ Enable email OTP: OFF
✅ Secure email change: ON
```

이렇게 설정하면 **즉시 로그인 가능!**

---

## 🚀 프로덕션 배포 시

배포 전에 다시 활성화:

```
✅ Enable email confirmations: ON
✅ Email templates 설정
✅ SMTP 설정 (선택)
```

---

## 💡 예방 팁

### **개발 시 빠른 테스트를 위해:**

1. **이메일 확인 비활성화**
2. **테스트 계정 미리 생성:**

```sql
-- 테스트 계정 생성 (이미 확인된 상태)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'dev@test.com',
  crypt('dev123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

---

## 📚 참고 자료

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Email Confirmation](https://supabase.com/docs/guides/auth/auth-email)

---

*최종 업데이트: 2026년 1월 19일*

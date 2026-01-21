# 🔧 회원가입 문제 해결 가이드

## 🎯 빠른 해결 방법

---

## ✅ **Step 1: Supabase 이메일 확인 비활성화**

### **Supabase Dashboard 설정:**

1. **https://supabase.com/dashboard** 접속

2. **프로젝트 선택** (Nutri8)

3. **좌측 메뉴:**
   ```
   Authentication → Settings
   ```

4. **"Email" 섹션 찾기**

5. **"Enable email confirmations" 체크 해제** ✅→❌

6. **"Save" 버튼 클릭**

---

## ✅ **Step 2: 회원가입 테스트**

### **앱에서 테스트:**

1. 회원가입 화면으로 이동

2. 정보 입력:
   ```
   이메일: test@example.com
   비밀번호: test1234 (최소 6자)
   비밀번호 확인: test1234
   ```

3. **"회원가입"** 버튼 클릭

4. **성공 메시지 확인**

---

## 🐛 **여전히 안 되면: 에러 확인**

### **브라우저 Console에서 에러 보기:**

1. **F12** (개발자 도구)

2. **Console 탭**

3. 회원가입 시도

4. 빨간색 에러 메시지 확인

---

## 📋 **일반적인 에러와 해결책**

### **에러 1: "User already registered"**

**원인:** 이미 등록된 이메일

**해결:** 
- 다른 이메일 사용
- 또는 Supabase Dashboard → Authentication → Users → 해당 유저 삭제

---

### **에러 2: "Invalid email or password"**

**원인:** Supabase Auth 정책 문제

**해결:**

1. **Supabase Dashboard** → **Authentication** → **Policies**

2. **"auth.users" 테이블 확인**

3. **새 Policy 추가:**
   ```sql
   CREATE POLICY "Enable insert for all users"
   ON auth.users
   FOR INSERT
   WITH CHECK (true);
   ```

---

### **에러 3: "Email confirmations are required"**

**원인:** 이메일 확인이 활성화되어 있음

**해결:** Step 1 참고 (이메일 확인 비활성화)

---

### **에러 4: "Password should be at least 6 characters"**

**원인:** 비밀번호가 너무 짧음

**해결:** 6자 이상 입력

---

## 💡 **개발 환경 권장 설정**

### **Supabase Authentication Settings:**

```
✅ Enable email confirmations: OFF (개발 중)
✅ Enable phone confirmations: OFF
✅ Site URL: http://localhost:8081
✅ Redirect URLs: 
   - http://localhost:8081/**
   - http://localhost:8081/auth/callback
```

---

## 🔐 **프로덕션 배포 시 설정**

배포 전에는 다시 활성화:

```
✅ Enable email confirmations: ON (보안을 위해)
✅ Site URL: https://nutri8-6z1o.vercel.app
✅ Redirect URLs:
   - https://nutri8-6z1o.vercel.app/**
   - https://nutri8-6z1o.vercel.app/auth/callback
```

---

## 🧪 **테스트 체크리스트**

- [ ] Supabase 이메일 확인 비활성화
- [ ] 앱 재시작
- [ ] 새로운 이메일로 회원가입 시도
- [ ] 성공 메시지 확인
- [ ] 로그인 시도
- [ ] 메인 화면 접근 확인

---

## 📞 **추가 지원**

여전히 문제가 있다면:

1. **브라우저 Console 에러 로그** 캡처
2. **Supabase Dashboard** → **Logs** 확인
3. 에러 메시지 전달

---

*최종 업데이트: 2026년 1월 19일*

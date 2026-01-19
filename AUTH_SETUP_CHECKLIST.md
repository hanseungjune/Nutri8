# ✅ Nutri8 인증 시스템 설정 체크리스트

## 🎯 빠른 설정 가이드

다음 단계를 순서대로 따라하세요:

---

## 1️⃣ Supabase 데이터베이스 마이그레이션

- [ ] Supabase Dashboard 접속 (https://app.supabase.com)
- [ ] 프로젝트 선택
- [ ] 왼쪽 메뉴에서 "SQL Editor" 클릭
- [ ] "New query" 버튼 클릭
- [ ] `supabase-auth-migration.sql` 파일 내용 복사
- [ ] SQL Editor에 붙여넣기
- [ ] "Run" 버튼 클릭 (또는 Ctrl/Cmd + Enter)
- [ ] 성공 메시지 확인: ✅ 인증 시스템 마이그레이션이 완료되었습니다!

---

## 2️⃣ 기존 데이터 처리 (선택사항)

### 옵션 A: 테스트 데이터 삭제 (권장)

기존 데이터가 테스트 데이터인 경우:

- [ ] SQL Editor에서 다음 쿼리 실행:

```sql
DELETE FROM meals WHERE user_id IS NULL;
DELETE FROM goals WHERE user_id IS NULL;
DELETE FROM weight_records WHERE user_id IS NULL;
DELETE FROM user_profile WHERE user_id IS NULL;
```

### 옵션 B: 기존 데이터를 특정 사용자에게 할당

기존 데이터가 중요한 경우:

- [ ] 먼저 앱에서 회원가입
- [ ] Supabase Dashboard > Authentication > Users
- [ ] 사용자 ID 복사 (UUID 형식)
- [ ] SQL Editor에서 다음 쿼리 실행 (YOUR_USER_ID를 실제 ID로 교체):

```sql
UPDATE meals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE goals SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE weight_records SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE user_profile SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
```

---

## 3️⃣ Supabase 이메일 설정 (선택사항)

개발 중에는 이메일 확인을 비활성화하는 것이 편리합니다:

- [ ] Supabase Dashboard > Authentication > Settings
- [ ] "Email Auth" 섹션 찾기
- [ ] "Enable email confirmations" 체크박스 **끄기**
- [ ] "Save" 버튼 클릭

**주의**: 프로덕션 배포 시에는 다시 켜야 합니다!

---

## 4️⃣ 환경 변수 확인

- [ ] 프로젝트 루트에 `.env` 파일 존재 확인
- [ ] 다음 변수가 설정되어 있는지 확인:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

- [ ] 값이 올바른지 확인 (Supabase Dashboard > Settings > API)

---

## 5️⃣ 앱 실행 및 테스트

### 앱 시작

- [ ] 터미널에서 `npm start` 실행
- [ ] 캐시 문제가 있으면: `npm start -- --clear`

### 회원가입 테스트

- [ ] 앱이 자동으로 로그인 화면으로 이동하는지 확인
- [ ] **방법 1: 이메일 회원가입**
  - [ ] "회원가입" 버튼 클릭
  - [ ] 테스트 이메일/비밀번호 입력 (예: test@example.com / test1234)
  - [ ] 회원가입 성공 확인
  - [ ] 자동으로 메인 화면으로 이동하는지 확인
- [ ] **방법 2: Google 회원가입** (설정 필요)
  - [ ] "Google로 계속하기" 버튼 클릭
  - [ ] 브라우저에서 Google 계정 선택
  - [ ] 자동으로 메인 화면으로 이동하는지 확인

### 로그아웃 테스트

- [ ] 설정 탭으로 이동
- [ ] 사용자 정보 카드에서 이메일 표시 확인
- [ ] "로그아웃" 버튼 클릭
- [ ] 확인 대화상자에서 "로그아웃" 선택
- [ ] 자동으로 로그인 화면으로 이동하는지 확인

### 로그인 테스트

- [ ] **방법 1: 이메일 로그인**
  - [ ] 이메일/비밀번호 입력
  - [ ] "로그인" 버튼 클릭
  - [ ] 자동으로 메인 화면으로 이동하는지 확인
- [ ] **방법 2: Google 로그인** (설정 필요)
  - [ ] "Google로 로그인" 버튼 클릭
  - [ ] 브라우저에서 Google 계정 선택
  - [ ] 자동으로 메인 화면으로 이동하는지 확인

### 데이터 테스트

- [ ] 식단 추가 (Input 탭)
- [ ] 식단이 정상적으로 저장되는지 확인
- [ ] 로그아웃 후 다른 계정으로 로그인
- [ ] 이전 계정의 데이터가 보이지 않는지 확인 ✅

---

## 6️⃣ RLS 정책 검증

Supabase Dashboard에서 확인:

- [ ] SQL Editor에서 다음 쿼리 실행:

```sql
SELECT 
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

- [ ] 모든 테이블에 다음 정책들이 있는지 확인:
  - "Users can view own ..."
  - "Users can insert own ..."
  - "Users can update own ..."
  - "Users can delete own ..."

---

## 7️⃣ 최종 확인

- [ ] 여러 계정으로 로그인/로그아웃 테스트
- [ ] 각 계정의 데이터가 격리되어 있는지 확인
- [ ] 앱을 닫았다가 다시 열어도 로그인 상태 유지되는지 확인
- [ ] 네트워크 연결 없이도 로컬 캐시가 작동하는지 확인

---

## 🎉 완료!

모든 체크박스에 체크했다면 인증 시스템이 정상적으로 작동합니다!

---

## 🐛 문제가 있나요?

### 일반적인 문제 해결

| 문제 | 해결 방법 |
|------|----------|
| "User not authenticated" 에러 | 로그아웃 후 다시 로그인 |
| 데이터가 조회되지 않음 | RLS 정책 확인, SQL 마이그레이션 재실행 |
| 이메일 확인 필요 메시지 | Supabase에서 이메일 확인 비활성화 또는 이메일 확인 |
| 환경 변수 에러 | `.env` 파일 확인, 앱 재시작 |
| 세션 만료 | 자동으로 재로그인되어야 함, 안 되면 재로그인 |

자세한 내용은 다음 문서를 참고하세요:
- `AUTHENTICATION_GUIDE.md` - 인증 시스템 전체 가이드
- `GOOGLE_OAUTH_SETUP.md` - Google 로그인 설정 방법

---

## 🔐 Google OAuth 추가 설정 (선택사항)

Google 로그인을 사용하려면:

- [ ] `GOOGLE_OAUTH_SETUP.md` 파일 확인
- [ ] Google Cloud Console에서 OAuth 클라이언트 생성
- [ ] Supabase에 Client ID/Secret 입력
- [ ] 앱 재시작
- [ ] "Google로 로그인" 버튼 테스트

**주의**: Google OAuth 설정 없이도 이메일/비밀번호 로그인은 정상 작동합니다!

---

*설정 완료 시간: 약 10-15분 (Google OAuth: +15-20분)*

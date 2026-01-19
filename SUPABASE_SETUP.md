# 🐘 Supabase (PostgreSQL) 설정 가이드

Nutri8 앱을 PostgreSQL 데이터베이스와 연결하는 방법입니다.

---

## 📋 1단계: Supabase 프로젝트 생성

### 1.1 Supabase 회원가입
1. [https://supabase.com](https://supabase.com) 접속
2. **"Start your project"** 클릭
3. GitHub 계정으로 로그인 (추천) 또는 이메일로 가입

### 1.2 새 프로젝트 생성
1. Dashboard에서 **"New Project"** 클릭
2. 프로젝트 정보 입력:
   - **Name**: `Nutri8` (또는 원하는 이름)
   - **Database Password**: 안전한 비밀번호 입력 (기억하세요!)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국과 가장 가까움)
   - **Pricing Plan**: `Free` 선택
3. **"Create new project"** 클릭
4. ⏳ 프로젝트 생성 대기 (약 2분)

---

## 📊 2단계: PostgreSQL 테이블 생성

### 2.1 SQL Editor 열기
1. 왼쪽 사이드바에서 **"SQL Editor"** 클릭
2. **"New query"** 클릭

### 2.2 스키마 실행
1. 프로젝트 루트의 `supabase-schema.sql` 파일 내용을 복사
2. SQL Editor에 붙여넣기
3. 오른쪽 하단의 **"Run"** 버튼 클릭 (또는 `Ctrl+Enter`)
4. ✅ 성공 메시지 확인: "Success. No rows returned"

### 2.3 테이블 확인
1. 왼쪽 사이드바에서 **"Table Editor"** 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - ✅ `meals` - 식단 기록
   - ✅ `goals` - 목표 설정
   - ✅ `weight_records` - 체중 기록
   - ✅ `user_profile` - 사용자 프로필

---

## 🔑 3단계: API 키 가져오기

### 3.1 프로젝트 설정 열기
1. 왼쪽 사이드바 아래의 **"Settings"** (톱니바퀴 아이콘) 클릭
2. **"API"** 메뉴 클릭

### 3.2 필요한 정보 복사
다음 2가지 정보를 복사하세요:

#### Project URL
```
예시: https://abcdefghijklmno.supabase.co
```

#### anon public 키
```
예시: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의**: `service_role` 키는 사용하지 마세요! (보안 위험)

---

## ⚙️ 4단계: 앱에 API 키 설정

### 4.1 환경 변수 파일 생성
프로젝트 루트에 `.env` 파일을 생성하세요:

```bash
# .env 파일
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4.2 실제 값으로 변경
1. `your-project.supabase.co`를 복사한 **Project URL**로 변경
2. `your-anon-key-here`를 복사한 **anon public** 키로 변경

### 4.3 .gitignore 확인
`.env` 파일이 `.gitignore`에 포함되어 있는지 확인하세요 (이미 포함됨):

```gitignore
# Environment
.env
.env.local
.env.*.local
```

---

## 🧪 5단계: 연결 테스트

### 5.1 앱 실행
```bash
# 실행 중인 서버가 있다면 중지하고 재시작
npm start
```

### 5.2 테스트 시나리오
1. **Input 탭**에서 식단 입력
   - 음식명: `김치찌개`
   - 칼로리: `450`
   - 등록 버튼 클릭

2. **Supabase Dashboard**에서 확인
   - Table Editor → meals 테이블
   - 방금 입력한 데이터가 보이는지 확인! 🎉

3. **History 탭**에서 확인
   - 입력한 식단이 표시되는지 확인

---

## 🎉 완료!

이제 PostgreSQL (Supabase) 데이터베이스가 연결되었습니다!

### ✅ 확인 사항
- [x] Supabase 프로젝트 생성
- [x] 테이블 생성 완료
- [x] API 키 설정 완료
- [x] 앱에서 데이터 저장/조회 가능

### 📚 추가 기능
나중에 추가할 수 있는 기능들:
- **인증**: Supabase Auth로 사용자 계정 관리
- **실시간 동기화**: 여러 기기에서 실시간 업데이트
- **Storage**: 식단 사진 업로드
- **Functions**: 서버리스 함수로 복잡한 로직 처리

---

## 🆘 문제 해결

### Q: "Failed to fetch" 오류가 나요
**A**: `.env` 파일의 URL과 키를 다시 확인하세요. 앱을 재시작하세요.

### Q: 테이블이 보이지 않아요
**A**: SQL Editor에서 스키마를 다시 실행하세요. Policy 설정을 확인하세요.

### Q: 데이터가 저장되지 않아요
**A**: 
1. 브라우저 콘솔(F12)에서 에러 메시지 확인
2. Supabase Dashboard → Settings → API → RLS 정책 확인
3. `.env` 파일 저장 후 앱 재시작

### Q: 무료 플랜 제한이 궁금해요
**A**: Supabase 무료 플랜:
- 프로젝트: 2개
- 데이터베이스: 500MB
- 대역폭: 5GB/월
- 충분히 개인 프로젝트 사용 가능! 👍

---

## 📞 추가 도움

- [Supabase 공식 문서](https://supabase.com/docs)
- [React Native 가이드](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)
- [PostgreSQL 문법](https://www.postgresql.org/docs/)

---

**마지막 업데이트**: 2026년 1월 17일  
**Nutri8 프로젝트**: PostgreSQL (Supabase) 연동 완료 ✨

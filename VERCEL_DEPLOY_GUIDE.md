# 🚀 Vercel 배포 완전 가이드

## 📋 **2가지 배포 방법**

### ✅ **방법 1: Vercel 웹사이트 (추천) - 가장 쉬움**
### ⚙️ **방법 2: Vercel CLI (고급)**

---

## 🌟 **방법 1: Vercel 웹사이트 배포 (추천)**

### **Step 1: GitHub에 코드 Push**

```bash
# 1. 변경사항 커밋
git add .
git commit -m "Ready for Vercel deployment"

# 2. GitHub에 Push
git push origin main
```

### **Step 2: Vercel 웹사이트에서 배포**

1. **https://vercel.com** 접속
2. **"Sign Up"** 또는 **"Log In"** (GitHub 계정 사용 추천)
3. **"Add New Project"** 또는 **"Import Project"** 클릭
4. **GitHub 저장소 연결**
   - "Import Git Repository" 선택
   - GitHub 권한 승인
   - `Nutri8` 저장소 선택

### **Step 3: 프로젝트 설정**

#### **Framework Preset**
- Select: `Other` (또는 `Expo`)

#### **Build and Output Settings**
```
Build Command: npx expo export --platform web
Output Directory: dist
Install Command: npm install
```

#### **Root Directory**
- Leave as: `.` (루트)

### **Step 4: 환경 변수 추가 (중요!)**

**Environment Variables 섹션에서 추가:**

```
EXPO_PUBLIC_SUPABASE_URL         = your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY    = your-anon-key
EXPO_PUBLIC_GEMINI_API_KEY       = your-gemini-key (선택)
EXPO_PUBLIC_UNSPLASH_ACCESS_KEY  = your-unsplash-key (선택)
EXPO_PUBLIC_OPENAI_API_KEY       = your-openai-key (선택)
EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN  = false
```

**Environment 선택:**
- ✅ Production
- ✅ Preview
- ✅ Development (모두 체크)

### **Step 5: 배포!**

1. **"Deploy"** 버튼 클릭
2. 빌드 진행 상황 확인 (3-5분 소요)
3. ✅ 배포 완료!

### **Step 6: 배포된 URL 확인**

```
https://nutri8-xxxx.vercel.app
```

---

## ⚙️ **방법 2: Vercel CLI 배포**

### **Prerequisites**

✅ 이미 생성된 파일:
- `vercel.json` ✅
- `package.json` (vercel-build 스크립트 추가됨) ✅

### **Step 1: Vercel CLI 로그인**

#### **현재 상태:**
```
터미널에 다음과 같이 표시됨:
  Visit https://vercel.com/oauth/device?user_code=WMLJ-NBDV
  Press [ENTER] to open the browser
  Waiting for authentication...
```

#### **로그인 완료하기:**

1. **브라우저에서 열기:**
   ```
   https://vercel.com/oauth/device?user_code=WMLJ-NBDV
   ```

2. **Vercel 계정 로그인**
   - GitHub/GitLab/Bitbucket 계정으로 가입/로그인

3. **기기 인증**
   - 코드 확인: `WMLJ-NBDV`
   - "Authorize" 클릭

4. **터미널로 돌아가서 Enter 누르기**

#### **로그인 성공 확인:**
```bash
# 로그인 상태 확인
vercel whoami
```

### **Step 2: 환경 변수 설정**

```bash
# 필수 환경 변수 추가
vercel env add EXPO_PUBLIC_SUPABASE_URL production
vercel env add EXPO_PUBLIC_SUPABASE_ANON_KEY production

# 선택 환경 변수
vercel env add EXPO_PUBLIC_GEMINI_API_KEY production
vercel env add EXPO_PUBLIC_UNSPLASH_ACCESS_KEY production
vercel env add EXPO_PUBLIC_OPENAI_API_KEY production
```

입력 프롬프트가 나타나면 각 값을 입력하세요.

### **Step 3: 배포 실행**

#### **Preview 배포 (테스트용)**
```bash
vercel
```

질문에 답변:
```
? Set up and deploy "C:\Users\DELL\Desktop\Nutri8"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? nutri8
? In which directory is your code located? ./
```

#### **Production 배포**
```bash
vercel --prod
```

### **Step 4: 배포 확인**

```bash
# 배포된 URL이 터미널에 표시됨:
✅ Production: https://nutri8.vercel.app
```

---

## 🔄 **자동 배포 설정 (방법 1 사용 시)**

GitHub에 Push할 때마다 자동으로 배포:

```bash
# main 브랜치에 Push
git push origin main
→ 자동으로 Vercel Production 배포

# 다른 브랜치에 Push
git push origin feature-branch
→ 자동으로 Vercel Preview 배포
```

---

## 🐛 **문제 해결**

### **빌드 실패: "dist directory not found"**

```bash
# 로컬에서 빌드 테스트
npm run vercel-build

# dist/ 폴더 생성 확인
ls dist
```

### **환경 변수가 작동하지 않음**

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings > Environment Variables
3. 모든 변수 확인
4. Redeploy

### **Google OAuth 리다이렉트 문제**

Supabase Dashboard에서:
1. Authentication > URL Configuration
2. Site URL 추가:
   ```
   https://nutri8.vercel.app
   ```
3. Redirect URLs 추가:
   ```
   https://nutri8.vercel.app/auth/callback
   ```

---

## 📊 **배포 후 체크리스트**

- [ ] 사이트 접속 확인
- [ ] 로그인/회원가입 테스트
- [ ] Google OAuth 테스트
- [ ] 식단 입력 테스트
- [ ] AI 기능 테스트 (Gemini, DALL-E)
- [ ] 이미지 업로드 테스트
- [ ] 모바일 반응형 확인
- [ ] 성능 측정 (Lighthouse)

---

## 🎯 **권장 사항**

### **방법 1 (Vercel 웹사이트) 선택 이유:**
✅ 가장 쉽고 직관적  
✅ GitHub 자동 배포  
✅ 환경 변수 관리 편리  
✅ 빌드 로그 시각화  
✅ Preview 배포 자동 생성  

### **방법 2 (Vercel CLI) 선택 이유:**
⚙️ 터미널 작업 선호  
⚙️ CI/CD 파이프라인 통합  
⚙️ 스크립트 자동화  

---

## 📚 **참고 자료**

- [Vercel Documentation](https://vercel.com/docs)
- [Expo Web Deployment](https://docs.expo.dev/distribution/publishing-websites/)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**배포에 성공하셨나요? 축하합니다!** 🎉🚀

---

*최종 업데이트: 2026년 1월 18일*

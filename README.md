# 🥗 Nutri8 - AI 기반 다이어트 관리 앱

> **8주 프로젝트 완료!** 건강한 식습관 관리를 위한 스마트 모바일 앱

[![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🎉 **프로젝트 완료 상태**

**✅ Week 1-8 완료 (100%)**  
**🚀 프로덕션 준비 완료**  
**🤖 AI 기능 추가 완료**

---

## 📱 **앱 소개**

Nutri8는 **AI 기술**을 활용하여 식단 관리를 더욱 쉽고 편리하게 만드는 차세대 다이어트 관리 앱입니다.

### ✨ **주요 특징**

#### **🤖 AI 기능 (독보적!)**
- **Gemini API** 영양 정보 자동 입력 (음식명만 입력하면 끝!)
- **자동 번역** 한글 음식명 → 영어 (이미지 검색 정확도 향상)
- **DALL-E 3** AI 이미지 생성 (선택사항)
- **Unsplash** 실제 음식 사진 자동 검색
- **오프라인 모드** 100개 이상 음식 데이터 내장

#### **📊 핵심 기능**
- **식단 입력/조회/수정/삭제** 직관적인 UI
- **영양소 추적** 칼로리, 단백질, 탄수화물, 지방
- **실시간 통계** 일별/주별 칼로리 추이 차트
- **목표 관리** 체중, 칼로리 목표 설정 및 추적
- **체중 추적** 일일 체중 기록 및 그래프
- **사진 첨부** 식단 사진 자동 업로드 (Supabase Storage)

#### **💎 고급 기능**
- **알림** 식사 시간 리마인더
- **즐겨찾기** 자주 먹는 음식 저장
- **공유** 식단 기록 공유
- **BMR/TDEE** 자동 계산

---

## 🛠 **기술 스택**

### **Core**
- **React Native** (Expo SDK 52)
- **TypeScript** (Strict Mode)
- **Expo Router** (File-based Navigation)
- **Zustand** (State Management)

### **Backend & Database**
- **Supabase** (PostgreSQL)
- **Supabase Storage** (이미지 저장)
- **AsyncStorage** (로컬 저장)

### **AI & APIs**
- **Google Gemini API** 영양 정보 + 번역
- **OpenAI DALL-E 3** 이미지 생성 (선택사항)
- **Unsplash API** 이미지 검색 (선택사항)

### **UI/UX**
- **NativeWind** (Tailwind CSS for React Native)
- **React Native Paper** (Material Design)
- **react-native-chart-kit** (차트)
- **expo-image-picker** (카메라/갤러리)
- **expo-notifications** (알림)

---

## 🚀 **빠른 시작**

### **Prerequisites**
- Node.js 18 이상
- npm 또는 yarn
- Expo CLI

### **설치**
```bash
# 1. 저장소 클론
git clone [repository-url]
cd Nutri8

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp env.example.txt .env
# .env 파일 편집 (필수: Supabase, 선택: Gemini, DALL-E, Unsplash)

# 4. 개발 서버 시작
npm start
```

### **플랫폼 선택**
- **Web**: `w` 키
- **Android**: `a` 키
- **iOS**: `i` 키

---

## 📖 **문서**

### **설정 가이드**
- [Supabase 설정](SUPABASE_SETUP.md)
- [Gemini API 설정](GEMINI_API_SETUP.md)
- [DALL-E 3 설정](DALLE3_SETUP.md)
- [Unsplash API 설정](UNSPLASH_API_SETUP.md)

### **개발 문서**
- [프로젝트 구조](PROJECT_STRUCTURE.md)
- [시작 가이드](GETTING_STARTED.md)
- [8주 로드맵](ROADMAP.md)

### **배포**
- [빌드 및 배포 가이드](BUILD_AND_DEPLOY.md)

### **주차별 요약**
- [Week 1 요약](WEEK1_SUMMARY.md)
- [Week 2 요약](WEEK2_SUMMARY.md)
- [Week 3 요약](WEEK3_SUMMARY.md)
- [Week 4 요약](WEEK4_SUMMARY.md)
- [Week 5 요약](WEEK5_SUMMARY.md)
- [Week 6 요약](WEEK6_SUMMARY.md)
- [Week 7 요약](WEEK7_SUMMARY.md)
- **[Week 8 요약 (최종)](WEEK8_SUMMARY.md)**

---

## 🎯 **사용 방법**

### **1. AI로 식단 입력 (가장 쉬운 방법!)**
```
1. Input 탭 → "떡볶이" 입력
2. "AI 적용 🤖" 버튼 클릭
3. 2초 대기...
4. 자동 완성!
   - 칼로리: 450 kcal ✅
   - 단백질: 10g ✅
   - 탄수화물: 85g ✅
   - 지방: 8g ✅
   - 이미지: 떡볶이 사진 ✅
5. 등록 버튼만 누르면 끝!
```

### **2. 오프라인 모드 (API 없이)**
```
100개 이상 음식 데이터가 내장되어 있어
API 키 없이도 대부분의 한국 음식을 지원합니다!

지원 음식:
- 찌개류: 김치찌개, 된장찌개, 순두부찌개...
- 고기류: 불고기, 삼겹살, 갈비...
- 밥류: 비빔밥, 김밥, 볶음밥...
- 면류: 떡볶이, 라면, 짜장면...
- 치킨: 후라이드, 양념치킨, 뿌링클...
- 간식: 홈런볼, 아이스크림, 쿠키...
+ 70개 이상
```

### **3. 통계 확인**
```
Stats 탭에서:
- 주간 칼로리 추이 그래프
- 영양소 비율 파이 차트
- 식사별 칼로리 분포
- 목표 달성률
```

---

## 📊 **프로젝트 통계**

### **개발 기간**
- **8주** (2026년 1월 기준 완료)

### **코드 통계**
- **TypeScript 파일**: 50개 이상
- **문서 파일**: 15개 이상
- **총 라인 수**: 10,000 라인 이상

### **기능 수**
- **핵심 기능**: 10개
- **고급 기능**: 5개
- **AI 기능**: 5개
- **총**: 20개 이상

### **데이터**
- **오프라인 영양 정보**: 100개 음식
- **오프라인 이미지**: 40개 이상
- **사전 번역 데이터**: 40개 이상

---

## 🎨 **스크린샷**

### **홈 화면**
- 일일 칼로리 요약
- 주간 진행률
- 목표 달성률

### **입력 화면**
- AI 자동 입력
- 사진 첨부
- 영양소 입력

### **통계 화면**
- LineChart (칼로리 추이)
- PieChart (영양소 비율)
- 통계 카드

---

## 💡 **사용 팁**

### **무료로 시작하기**
```
1. Supabase 무료 계정 (필수)
2. Gemini API 무료 할당량 (하루 20번)
3. 오프라인 데이터 활용
→ 완전 무료로 모든 기능 사용!
```

### **API 할당량 절약**
```
1. 자주 먹는 음식 → 오프라인 데이터
2. 새로운 음식 → Gemini API
3. 이미지 → 사전 정의 우선
→ 하루 20번으로 충분!
```

---

## 🤝 **기여**

프로젝트 개선 제안은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **라이센스**

This project is licensed under the MIT License.

---

## 👨‍💻 **개발자**

**프로젝트 기간**: 8주  
**완료일**: 2026년 1월 17일  
**버전**: 1.0.0  
**상태**: ✅ 프로덕션 준비 완료

---

## 🙏 **감사의 말**

- **Expo Team** - 훌륭한 개발 도구
- **Supabase** - 무료 PostgreSQL + Storage
- **Google** - Gemini API
- **OpenAI** - DALL-E 3
- **Unsplash** - 무료 고품질 이미지

---

## 📞 **문의**

프로젝트 관련 문의사항이 있으시면 Issue를 생성해주세요.

---

**Nutri8로 건강한 식습관을 시작하세요!** 🥗✨

**Made with ❤️ and AI 🤖**

---

*최종 업데이트: 2026년 1월 17일*

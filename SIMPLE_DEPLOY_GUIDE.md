# 📱 앱 배포 - 초간단 가이드

## 🎯 가장 쉬운 방법: Android APK 만들기

친구들에게 공유할 수 있는 **설치 파일** 만들기 (무료!)

---

## ✅ Step 1: Expo 가입 (5분)

### 브라우저에서:
```
https://expo.dev/signup
```

**"Continue with GitHub"** 클릭 → 로그인 → 완료!

---

## ✅ Step 2: CMD 열기 (1분)

```
Windows 키 + R
→ cmd 입력
→ Enter
```

---

## ✅ Step 3: 프로젝트로 이동 (1분)

```cmd
cd C:\Users\DELL\Desktop\Nutri8
```

---

## ✅ Step 4: Expo 로그인 (2분)

```cmd
eas login --web
```

브라우저가 열리면 → GitHub로 로그인 → 자동 완료!

---

## ✅ Step 5: APK 파일 만들기 (20분)

```cmd
eas build --platform android --profile preview
```

### 질문이 나타나면:

**Q: Generate a new Android Keystore?**
```
Y (Yes 입력)
```

**Q: Would you like to automatically submit to Google Play?**
```
N (No 입력)
```

⏱️ **빌드 시간: 15-20분**

화면에 이런 메시지가 나타납니다:
```
✓ Build finished
  https://expo.dev/accounts/yourname/projects/nutri8/builds/...
```

---

## ✅ Step 6: APK 다운로드 (2분)

빌드가 완료되면:

1. **브라우저로 위 링크 열기**
2. **"Download"** 버튼 클릭
3. **`nutri8.apk`** 파일 저장

---

## ✅ Step 7: 설치 & 공유

### 내 Android 폰에 설치:

1. **APK 파일을 폰으로 전송**
   - USB 케이블
   - 이메일
   - 카카오톡
   - Google Drive

2. **폰에서 APK 파일 실행**
   - "알 수 없는 출처" 허용
   - 설치 완료!

### 친구들에게 공유:

- 📧 이메일로 보내기
- 💬 카카오톡으로 보내기
- ☁️ Google Drive 링크 공유
- 💾 USB로 직접 전송

---

## 🎉 완료!

이제 친구들이 APK 파일을 받아서 설치할 수 있습니다!

---

## 📊 요약

| 단계 | 시간 | 비용 |
|------|------|------|
| Expo 가입 | 5분 | 무료 |
| 로그인 | 2분 | 무료 |
| APK 빌드 | 20분 | 무료 |
| 다운로드 | 2분 | 무료 |
| **총 시간** | **30분** | **무료** |

---

## ❓ 자주 묻는 질문

### Q: iPhone에서도 되나요?
A: 이 방법은 Android만 가능합니다.
iPhone용은 TestFlight 필요 (Apple Developer 계정 $99)

### Q: Google Play Store에 올리려면?
A: 추가 단계 필요:
- Google Play Console 계정 ($25)
- 앱 정보 작성
- 심사 제출 (1-2일)

### Q: 무료 빌드 제한은?
A: 월 30개 빌드까지 무료

### Q: APK 업데이트하려면?
A: 같은 명령어로 다시 빌드 → 새 APK 배포

---

## 🚀 다음 단계

### 테스트가 끝났다면:

**Google Play Store 정식 출시:**
1. Google Play Console 계정 생성 ($25)
2. 프로덕션 빌드 생성:
   ```cmd
   eas build --platform android --profile production
   ```
3. Play Console에 업로드
4. 앱 정보 작성
5. 심사 제출

**전체 가이드:** `APP_STORE_DEPLOY_GUIDE.md`

---

## 💡 팁

### 더 쉽게 공유하려면:

**Expo Go 앱 사용 (가장 쉬움!):**

1. 친구가 "Expo Go" 앱 설치 (Play Store/App Store)
2. 개발자가 앱 실행:
   ```cmd
   npm start
   ```
3. QR 코드가 나타남
4. 친구가 Expo Go로 QR 스캔
5. 즉시 앱 실행!

⚠️ 단점: 
- 친구도 Expo Go 앱 필요
- 개발자 컴퓨터가 켜져 있어야 함

**APK 방식이 더 나음:**
- 설치 파일 한 번 전송
- 독립적으로 실행 가능

---

*최종 업데이트: 2026년 1월 19일*

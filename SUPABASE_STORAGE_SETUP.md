# 📸 Supabase Storage 설정 가이드

## 🎯 목적
Nutri8 앱에서 음식 사진을 저장하기 위한 Supabase Storage 설정

---

## 📋 1단계: Storage 버킷 생성

### 1. Supabase Dashboard 접속
1. https://supabase.com/dashboard 접속
2. Nutri8 프로젝트 선택

### 2. Storage 메뉴로 이동
- 왼쪽 사이드바에서 **"Storage"** 클릭

### 3. 새 버킷 생성
1. **"New bucket"** 버튼 클릭
2. 다음 정보 입력:

```
Bucket name: meal-photos
Public bucket: ✅ (체크)
File size limit: 5MB
Allowed MIME types: image/jpeg, image/png, image/webp
```

3. **"Create bucket"** 클릭

---

## 📋 2단계: 버킷 정책 설정 (Public Access)

### 1. Policies 설정
1. 생성한 `meal-photos` 버킷 클릭
2. 상단의 **"Policies"** 탭 클릭
3. **"New Policy"** 클릭

### 2. 업로드 정책 (INSERT)
**For authenticated users only:**

```sql
-- Policy Name: Allow authenticated uploads
-- Allowed operation: INSERT
-- Target roles: authenticated

CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'meal-photos');
```

**For public (모든 사용자 허용):**

```sql
-- Policy Name: Allow public uploads
-- Allowed operation: INSERT
-- Target roles: public, authenticated

CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public, authenticated
WITH CHECK (bucket_id = 'meal-photos');
```

### 3. 읽기 정책 (SELECT)
**Public 버킷이므로 기본적으로 읽기 가능**

```sql
-- Policy Name: Allow public downloads
-- Allowed operation: SELECT
-- Target roles: public, authenticated

CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
TO public, authenticated
USING (bucket_id = 'meal-photos');
```

### 4. 삭제 정책 (DELETE)
```sql
-- Policy Name: Allow authenticated delete
-- Allowed operation: DELETE
-- Target roles: authenticated

CREATE POLICY "Allow authenticated delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'meal-photos');
```

---

## 📋 3단계: 간편 정책 (GUI 사용)

Supabase UI에서 간편하게 설정:

### 1. New Policy 클릭
### 2. "Get started quickly" 선택
### 3. 다음 템플릿 선택:

**For INSERT (업로드):**
- Template: "Enable insert for authenticated users only"
- 또는 "Give users access to their own folder"

**For SELECT (읽기):**
- Template: "Enable read access for all users"

**For DELETE (삭제):**
- Template: "Enable delete for users based on user_id"

---

## 📋 4단계: 데이터베이스 스키마 업데이트

### meals 테이블에 photo_url 컬럼 추가

Supabase SQL Editor에서 실행:

```sql
-- photo_url 컬럼 추가
ALTER TABLE meals 
ADD COLUMN photo_url TEXT;

-- 인덱스 추가 (선택사항, 성능 향상)
CREATE INDEX idx_meals_photo_url ON meals(photo_url);
```

---

## 📋 5단계: 앱에서 사용할 환경 변수 확인

`.env` 파일에 Supabase 정보가 있는지 확인:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🧪 6단계: 테스트

### 1. 수동 업로드 테스트
1. Storage 탭 → `meal-photos` 버킷
2. **"Upload file"** 클릭
3. 테스트 이미지 업로드
4. 업로드된 파일의 **"Get URL"** 클릭하여 URL 복사
5. 브라우저에서 URL 접속하여 이미지 표시되는지 확인

### 2. SQL로 테스트 데이터 추가

```sql
-- 테스트 meal에 photo_url 추가
UPDATE meals 
SET photo_url = 'https://your-project.supabase.co/storage/v1/object/public/meal-photos/test.jpg'
WHERE id = 1;

-- 확인
SELECT id, food_name, photo_url FROM meals WHERE photo_url IS NOT NULL;
```

---

## 📊 Storage URL 형식

업로드된 파일의 Public URL 형식:

```
https://[PROJECT_REF].supabase.co/storage/v1/object/public/meal-photos/[FILE_NAME]
```

예시:
```
https://abcdefgh.supabase.co/storage/v1/object/public/meal-photos/meal_123_1234567890.jpg
```

---

## 🔒 보안 고려사항

### 1. RLS (Row Level Security)
- Storage objects에 RLS 정책 적용됨
- 인증된 사용자만 업로드 가능 (권장)
- 모든 사용자가 읽기 가능 (Public 버킷)

### 2. 파일 크기 제한
- 기본: 5MB (버킷 설정에서 조정 가능)
- 권장: 2-3MB (압축 후)

### 3. 파일 타입 제한
- 허용: `image/jpeg`, `image/png`, `image/webp`
- 앱에서 업로드 전 검증 필요

---

## 🚀 앱에서 사용하기

### 1. 이미지 업로드 함수 (예시)

```typescript
import { supabase } from './utils/db/supabase';

async function uploadMealPhoto(uri: string, mealId: number) {
  try {
    // 파일 이름 생성
    const fileName = `meal_${mealId}_${Date.now()}.jpg`;
    
    // 파일 읽기 (React Native)
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from('meal-photos')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: false,
      });
    
    if (error) throw error;
    
    // Public URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('meal-photos')
      .getPublicUrl(fileName);
    
    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
```

### 2. meals 테이블에 photo_url 저장

```typescript
// meal 생성 시 photo_url 포함
const meal = {
  food_name: '불고기',
  calories: 500,
  photo_url: uploadedPhotoUrl,  // 업로드된 이미지 URL
  // ... 기타 필드
};
```

---

## ✅ 완료 체크리스트

- [ ] Supabase Storage에서 `meal-photos` 버킷 생성
- [ ] Public bucket으로 설정
- [ ] INSERT, SELECT, DELETE 정책 설정
- [ ] meals 테이블에 `photo_url` 컬럼 추가
- [ ] 테스트 이미지 업로드 확인
- [ ] Public URL로 이미지 접근 가능한지 확인

---

## 🆘 문제 해결

### 1. "Access denied" 에러
- Storage Policies 확인
- Public bucket 설정 확인

### 2. 이미지가 표시되지 않음
- Public URL이 올바른지 확인
- CORS 설정 확인 (Supabase는 기본적으로 CORS 허용)

### 3. 업로드 실패
- 파일 크기 확인 (5MB 이하)
- 파일 타입 확인 (jpg, png, webp)
- Anon Key가 올바른지 확인

---

## 📝 다음 단계

Storage 설정이 완료되면:
1. ✅ 앱에서 이미지 업로드 기능 구현
2. ✅ History 화면에서 사진 표시
3. ✅ 이미지 압축 및 최적화

---

**설정이 완료되면 앱 코드로 돌아가서 이미지 업로드 기능을 구현합니다!** 📸

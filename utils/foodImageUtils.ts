/**
 * 음식 이름으로 이미지 URL 가져오기
 * Unsplash API 사용
 */

/**
 * 음식 이름으로 Unsplash에서 이미지 검색
 * 
 * 사용 방법:
 * 1. https://unsplash.com/developers 에서 무료 계정 생성
 * 2. Access Key 받기
 * 3. .env 파일에 EXPO_PUBLIC_UNSPLASH_ACCESS_KEY 추가
 * 
 * @param foodName 음식 이름 (한글/영어)
 * @param englishName 영어 번역 (옵션, Gemini로 번역된 이름)
 */
export async function getFoodImageUrl(foodName: string, englishName?: string): Promise<string | null> {
  const accessKey = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    console.warn('Unsplash Access Key가 설정되지 않았습니다.');
    return null;
  }

  try {
    // 영어 번역이 있으면 사용, 없으면 원본 사용
    const searchTerm = englishName || foodName;
    const query = `${searchTerm} food korean`;
    
    console.log(`📸 Unsplash 검색: "${query}"`);
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Unsplash API 오류:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      console.log(`✅ Unsplash 이미지 발견!`);
      // 중간 사이즈 이미지 URL 반환
      return data.results[0].urls.regular;
    }

    console.log(`⚠️ Unsplash에서 "${query}" 결과 없음`);
    return null;
  } catch (error) {
    console.error('이미지 검색 실패:', error);
    return null;
  }
}

/**
 * Placeholder 이미지 서비스 사용 (API 키 불필요)
 */
export function getPlaceholderFoodImage(foodName: string): string {
  // Placeholder 이미지 서비스들
  // 1. Lorem Picsum (랜덤 이미지)
  // return `https://picsum.photos/seed/${encodeURIComponent(foodName)}/400/300`;
  
  // 2. UI Avatars (텍스트 기반)
  // return `https://ui-avatars.com/api/?name=${encodeURIComponent(foodName)}&size=400&background=4CAF50&color=fff&bold=true`;
  
  // 3. DummyImage (심플한 placeholder)
  return `https://dummyimage.com/400x300/4CAF50/ffffff&text=${encodeURIComponent(foodName)}`;
}

/**
 * 한국 음식 이미지 매핑 (사전 정의된 URL)
 */
const KOREAN_FOOD_IMAGES: Record<string, string> = {
  // 찌개류
  '김치찌개': 'https://images.unsplash.com/photo-1569050467447-ce7ad2b23744?w=400',
  '된장찌개': 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400',
  '차돌된장찌개': 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400',
  '순두부찌개': 'https://images.unsplash.com/photo-1547928576-d9cdbf89d78d?w=400',
  '부대찌개': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
  
  // 고기류
  '불고기': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
  '삼겹살': 'https://images.unsplash.com/photo-1606479794875-d6257089cebe?w=400',
  '갈비': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
  '제육볶음': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
  
  // 밥류
  '비빔밥': 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400',
  '김밥': 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400',
  '볶음밥': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
  '덮밥': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  
  // 면류
  '떡볶이': 'https://images.unsplash.com/photo-1612940960267-4549a58fb257?w=400',
  '라면': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
  '짜장면': 'https://images.unsplash.com/photo-1603088372583-927759f74259?w=400',
  '짬뽕': 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400',
  '냉면': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
  
  // 치킨
  '치킨': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
  '후라이드': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
  '양념치킨': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
  '뿌링클': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
  
  // 건강식
  '샐러드': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  '연어': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
  '연어구이': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
  '닭가슴살': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
  
  // 과일
  '바나나': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
  '사과': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
  
  // 양식
  '스테이크': 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400',
  '파스타': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
  '피자': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
  '햄버거': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
  
  // 기타 (예시 - 원하는 단어 추가 가능)
  '냉장고': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
  '물': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  '커피': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
  '우유': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
};

/**
 * 음식 이름으로 이미지 URL 가져오기 (폴백 포함)
 */
export function getFoodImage(foodName: string): string {
  // 1. 정확히 일치하는 이미지 확인
  if (KOREAN_FOOD_IMAGES[foodName]) {
    return KOREAN_FOOD_IMAGES[foodName];
  }

  // 2. 부분 문자열 매칭 (예: "떡볶이 2인분" → "떡볶이")
  const normalizedInput = foodName.trim().toLowerCase();
  for (const [key, url] of Object.entries(KOREAN_FOOD_IMAGES)) {
    const normalizedKey = key.toLowerCase();
    // 입력값이 키를 포함하거나, 키가 입력값을 포함하면 매칭
    if (normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput)) {
      console.log(`✅ 이미지 매칭 성공: "${foodName}" → "${key}"`);
      return url;
    }
  }

  // 3. Placeholder 이미지 반환
  console.log(`📦 Placeholder 사용: "${foodName}"`);
  return getPlaceholderFoodImage(foodName);
}

/**
 * OpenAI DALL-E 3를 사용한 AI 음식 이미지 생성
 */

import OpenAI from 'openai';

/**
 * 음식인지 판단하는 함수
 */
function isFoodItem(name: string): boolean {
  const cleanName = name.toLowerCase().trim();
  
  // 음식이 아닌 것들
  const nonFoodKeywords = [
    '냉장고', '전자레인지', '오븐', '에어프라이어',
    '그릇', '접시', '포크', '숟가락', '젓가락',
    '의자', '테이블', '컴퓨터', '핸드폰',
    '물', '생수', // 물은 음식으로 간주하지 않음
  ];
  
  return !nonFoodKeywords.some(keyword => cleanName.includes(keyword));
}

/**
 * DALL-E 3로 음식 이미지 생성
 * 
 * @param foodName 음식 이름 (예: "떡볶이", "BHC 뿌링클")
 * @returns 생성된 이미지 URL 또는 null
 */
export async function generateFoodImageWithDALLE(foodName: string): Promise<string | null> {
  try {
    // 음식이 아니면 스킵
    if (!isFoodItem(foodName)) {
      console.log(`⚠️ "${foodName}"는 음식이 아닙니다. AI 생성 스킵.`);
      return null;
    }

    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ OpenAI API Key가 설정되지 않았습니다.');
      return null;
    }

    const openai = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true // 브라우저에서 사용 허용
    });

    // 프롬프트 생성 (한국 음식 특화)
    const prompt = createKoreanFoodPrompt(foodName);
    console.log('🎨 DALL-E 3 이미지 생성 시작...');
    console.log('📝 프롬프트:', prompt);

    // DALL-E 3 API 호출
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024", // 또는 "1024x1792", "1792x1024"
      quality: "standard", // 또는 "hd" (더 비쌈)
      style: "natural", // 또는 "vivid"
    });

    const imageUrl = response.data?.[0]?.url;

    if (imageUrl) {
      console.log('✅ DALL-E 3 이미지 생성 완료!');
      console.log('🖼️ URL:', imageUrl.substring(0, 60) + '...');
      return imageUrl;
    }

    return null;

  } catch (error: any) {
    console.error('❌ DALL-E 3 이미지 생성 실패:', error.message);
    return null;
  }
}

/**
 * 한국 음식에 최적화된 프롬프트 생성
 */
function createKoreanFoodPrompt(foodName: string): string {
  // 2인분, 1인분 등 제거
  const cleanName = foodName
    .replace(/\d+인분/g, '')
    .replace(/\d+\s*servings?/gi, '')
    .replace(/\d+g/g, '')
    .replace(/\d+ml/g, '')
    .replace(/BHC|BBQ|교촌|페리카나/gi, '')
    .trim();

  // 영어로 된 음식명인 경우 그대로 사용
  const isEnglish = /^[a-zA-Z\s]+$/.test(cleanName);
  
  // 한국 음식별 상세 설명 (영어 이름도 매칭)
  const koreanFoodDescriptions: Record<string, string> = {
    // 한글
    '떡볶이': 'Korean spicy stir-fried rice cakes (tteokbokki) with bright red gochujang sauce, fish cakes, boiled eggs, and green onions, served in a traditional shallow bowl',
    // 영어 (Gemini 번역 결과)
    'tteokbokki': 'Korean spicy stir-fried rice cakes (tteokbokki) with bright red gochujang sauce, fish cakes, boiled eggs, and green onions, served in a traditional shallow bowl',
    'spicy rice cakes': 'Korean spicy stir-fried rice cakes (tteokbokki) with bright red gochujang sauce, fish cakes, boiled eggs, and green onions, served in a traditional shallow bowl',
    // 한글 음식명
    '김치찌개': 'Korean kimchi stew (jjigae) with pork, tofu, and vegetables in a bubbling red spicy broth, served in a traditional stone pot (ttukbaegi)',
    '불고기': 'Korean marinated beef bulgogi with caramelized edges, grilled to perfection, garnished with sesame seeds and green onions, served on a sizzling hot plate',
    '비빔밥': 'Korean mixed rice bowl (bibimbap) with colorful array of seasoned vegetables, gochujang sauce, fried egg on top, arranged beautifully in a traditional stone bowl',
    '삼겹살': 'Korean grilled pork belly (samgyeopsal) with perfect char marks, sizzling on a grill, served with lettuce wraps and side dishes',
    '김밥': 'Korean seaweed rice roll (gimbap) sliced into perfect rounds, showing colorful fillings of vegetables, egg, and meat',
    '짜장면': 'Korean-Chinese black bean noodles (jajangmyeon) with glossy black sauce, topped with fresh cucumber strips',
    '치킨': 'Korean fried chicken with golden crispy coating, perfectly fried, garnished with sesame seeds',
    '뿌링클': 'Korean sweet and spicy fried chicken with a glossy golden-orange coating, crispy texture, topped with almonds and parsley',
    '양념치킨': 'Korean spicy glazed fried chicken with shiny red sauce coating, garnished with sesame seeds',
    
    // 영어 번역 (Gemini가 번역한 결과들)
    'kimchi stew': 'Korean kimchi stew (jjigae) with pork, tofu, and vegetables in a bubbling red spicy broth, served in a traditional stone pot (ttukbaegi)',
    'bulgogi': 'Korean marinated beef bulgogi with caramelized edges, grilled to perfection, garnished with sesame seeds and green onions, served on a sizzling hot plate',
    'bibimbap': 'Korean mixed rice bowl (bibimbap) with colorful array of seasoned vegetables, gochujang sauce, fried egg on top, arranged beautifully in a traditional stone bowl',
    'grilled pork belly': 'Korean grilled pork belly (samgyeopsal) with perfect char marks, sizzling on a grill, served with lettuce wraps and side dishes',
    'samgyeopsal': 'Korean grilled pork belly (samgyeopsal) with perfect char marks, sizzling on a grill, served with lettuce wraps and side dishes',
    'kimbap': 'Korean seaweed rice roll (gimbap) sliced into perfect rounds, showing colorful fillings of vegetables, egg, and meat',
    'black bean noodles': 'Korean-Chinese black bean noodles (jajangmyeon) with glossy black sauce, topped with fresh cucumber strips',
    'jajangmyeon': 'Korean-Chinese black bean noodles (jajangmyeon) with glossy black sauce, topped with fresh cucumber strips',
    'korean fried chicken': 'Korean fried chicken with golden crispy coating, perfectly fried, garnished with sesame seeds',
    'fried chicken': 'Korean fried chicken with golden crispy coating, perfectly fried, garnished with sesame seeds',
  };

  // 한글 또는 영어로 description 찾기 (대소문자 무시)
  const cleanNameLower = cleanName.toLowerCase();
  const description = koreanFoodDescriptions[cleanName] || 
    koreanFoodDescriptions[cleanNameLower] ||
    `${isEnglish ? '' : 'Korean '}dish ${cleanName}, beautifully plated with authentic presentation`;

  return `Professional food photography of ${description}.
Shot on a clean white or neutral background, top-down view at 45-degree angle.
Natural lighting with soft shadows, restaurant-quality plating.
High-resolution, appetizing, vibrant colors, photorealistic style.
No text, no watermarks, no people.`;
}

/**
 * OpenAI API 사용 가능 여부 확인
 */
export function isDALLEAvailable(): boolean {
  return !!process.env.EXPO_PUBLIC_OPENAI_API_KEY;
}

/**
 * 예상 비용 계산
 */
export function estimateDALLECost(imageCount: number): string {
  const costPerImage = 0.04; // DALL-E 3 standard 1024x1024
  const totalCost = imageCount * costPerImage;
  return `$${totalCost.toFixed(2)} (${imageCount}장)`;
}

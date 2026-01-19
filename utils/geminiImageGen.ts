/**
 * Google Gemini API를 사용한 AI 음식 이미지 생성
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini API로 음식 이미지 생성
 * 
 * @param foodName 음식 이름 (예: "떡볶이", "BHC 뿌링클")
 * @returns 생성된 이미지 URL 또는 null
 */
export async function generateFoodImage(foodName: string): Promise<string | null> {
  try {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ Gemini API Key가 설정되지 않았습니다.');
      return null;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 이미지 생성 모델 시도
    const imageModels = [
      'models/gemini-2.0-flash-exp-image-generation',
      'models/gemini-2.5-flash-image',
      'models/imagen-3.0-generate-001', // Imagen 모델
    ];

    let lastError: Error | null = null;

    for (const modelName of imageModels) {
      try {
        console.log(`🎨 이미지 생성 시도: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        // 프롬프트 생성 (한국 음식 특화)
        const prompt = createFoodImagePrompt(foodName);
        console.log(`📝 프롬프트: ${prompt}`);

        // 이미지 생성
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // 이미지 데이터 추출
        const imageData = extractImageData(response);
        
        if (imageData) {
          console.log('✅ 이미지 생성 완료!');
          return imageData;
        }

      } catch (error: any) {
        console.log(`❌ ${modelName} 실패:`, error.message);
        lastError = error;
        continue;
      }
    }

    throw new Error(`모든 이미지 생성 모델 실패. 마지막 오류: ${lastError?.message}`);

  } catch (error) {
    console.error('❌ 이미지 생성 실패:', error);
    return null;
  }
}

/**
 * 음식 이름으로 이미지 생성 프롬프트 생성
 */
function createFoodImagePrompt(foodName: string): string {
  // 2인분, 1인분 등 제거
  const cleanName = foodName
    .replace(/\d+인분/g, '')
    .replace(/\d+g/g, '')
    .replace(/\d+ml/g, '')
    .trim();

  // 한국 음식 키워드 매핑
  const koreanFoodStyles: Record<string, string> = {
    '떡볶이': 'spicy, red, cylindrical rice cakes, Korean street food',
    '김치찌개': 'spicy red soup, kimchi stew, Korean home-style',
    '불고기': 'marinated grilled beef, caramelized, Korean BBQ',
    '비빔밥': 'colorful mixed rice bowl, vegetables, Korean',
    '삼겹살': 'grilled pork belly, Korean BBQ, sizzling',
    '치킨': 'fried chicken, crispy, golden brown, Korean style',
    '뿌링클': 'sweet and spicy chicken, Korean fried chicken',
    '짜장면': 'black bean noodles, Chinese-Korean cuisine',
    '김밥': 'seaweed rice roll, colorful, Korean kimbap',
    '라면': 'instant noodles, spicy, Korean ramyeon',
  };

  const styleHint = koreanFoodStyles[cleanName] || 'delicious, appetizing, Korean food';

  return `Create a high-quality, professional food photography image of ${cleanName}.
Style: ${styleHint}
Requirements:
- Top-down view or 45-degree angle
- Natural lighting, clean background
- Vibrant colors, appetizing presentation
- Served on a white or neutral plate
- Restaurant-quality plating
- No text or watermarks
- Photorealistic style`;
}

/**
 * API 응답에서 이미지 데이터 추출
 */
function extractImageData(response: any): string | null {
  try {
    // 응답 형식은 API 버전에 따라 다를 수 있음
    
    // 1. URL 형식
    if (response.imageUrl) {
      return response.imageUrl;
    }

    // 2. Base64 형식
    if (response.imageData) {
      return `data:image/png;base64,${response.imageData}`;
    }

    // 3. Parts 형식 (multimodal response)
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts && parts.length > 0) {
      for (const part of parts) {
        if (part.inlineData) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const data = part.inlineData.data;
          return `data:${mimeType};base64,${data}`;
        }
      }
    }

    console.warn('⚠️ 응답에서 이미지 데이터를 찾을 수 없습니다:', response);
    return null;

  } catch (error) {
    console.error('이미지 데이터 추출 실패:', error);
    return null;
  }
}

/**
 * Gemini 이미지 생성 사용 가능 여부 확인
 */
export function isGeminiImageGenAvailable(): boolean {
  return !!process.env.EXPO_PUBLIC_GEMINI_API_KEY;
}

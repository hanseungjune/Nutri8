/**
 * Google Gemini API를 사용한 음식 영양 정보 자동 추출
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodAnalysisResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Gemini API 클라이언트 초기화
 */
let genAI: GoogleGenerativeAI | null = null;

function initializeGemini(): GoogleGenerativeAI | null {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️ Gemini API Key가 설정되지 않았습니다.');
    console.warn('   .env 파일에 EXPO_PUBLIC_GEMINI_API_KEY를 추가하세요.');
    return null;
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini API 초기화 성공');
  }

  return genAI;
}

/**
 * 음식 이름으로 영양 정보 가져오기
 * 
 * @param foodName 음식 이름 (예: "불고기", "김치찌개")
 * @returns 칼로리, 단백질, 탄수화물, 지방 정보
 */
export async function getNutritionInfo(foodName: string): Promise<NutritionInfo | null> {
  // 먼저 오프라인 폴백 데이터 확인
  const fallback = getFallbackNutrition(foodName);
  
  try {
    const ai = initializeGemini();
    
    if (!ai) {
      console.warn('⚠️ Gemini API 미설정 - 오프라인 데이터 사용');
      return fallback;
    }

    // 단일 모델만 사용 (Rate Limit 방지)
    const modelName = 'models/gemini-2.5-flash';
    
    let lastError: Error | null = null;

    // 단일 모델로 호출
    try {
      console.log(`🔄 ${modelName} 시도 중...`);
      const model = ai.getGenerativeModel({ model: modelName });
      
      // 프롬프트 작성 (브랜드명 포함 메뉴 인식 개선)
      const prompt = `
음식 이름: "${foodName}"

위 음식의 1인분 기준 영양 정보를 JSON 형식으로만 응답해주세요.

**중요 지침:**
1. 브랜드명이 포함된 경우 (예: "BHC 뿌링클", "BBQ 황금올리브"), 해당 음식의 일반적인 카테고리로 인식하세요.
   - 뿌링클 → 양념치킨
   - 황금올리브 → 치킨
   - 맥도날드 빅맥 → 햄버거
   - 스타벅스 아메리카노 → 아메리카노
   
2. 한국 프랜차이즈 치킨 브랜드 (BHC, BBQ, 교촌, 페리카나 등)의 경우:
   - 프라이드/후라이드: 약 400-450 kcal
   - 양념/간장/매운맛: 약 450-500 kcal
   - 특수 소스(뿌링클, 황금올리브): 약 500-550 kcal
   
3. 1인분 기준은 일반적인 외식 1인분 (치킨의 경우 약 3-4조각)

**응답 형식:**
{
  "calories": 숫자,
  "protein": 숫자,
  "carbs": 숫자,
  "fat": 숫자
}

**규칙:**
- calories: 총 칼로리 (kcal)
- protein: 단백질 (g)
- carbs: 탄수화물 (g)
- fat: 지방 (g)
- 소수점 없이 정수로만
- JSON만 출력 (설명 없이)

**예시:**
입력: "BHC 뿌링클"
출력: {"calories": 520, "protein": 28, "carbs": 32, "fat": 28}

입력: "불고기"
출력: {"calories": 280, "protein": 25, "carbs": 8, "fat": 15}
`;

        console.log(`🤖 AI 분석 시작: ${foodName} (모델: ${modelName})`);

        // API 호출
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('📥 AI 응답:', text);

        // JSON 파싱
        const jsonMatch = text.match(/\{[^}]+\}/);
        if (!jsonMatch) {
          throw new Error('JSON 형식을 찾을 수 없습니다.');
        }

        const nutritionData = JSON.parse(jsonMatch[0]);

        // 유효성 검사
        if (
          typeof nutritionData.calories !== 'number' ||
          typeof nutritionData.protein !== 'number' ||
          typeof nutritionData.carbs !== 'number' ||
          typeof nutritionData.fat !== 'number'
        ) {
          throw new Error('유효하지 않은 영양 정보입니다.');
        }

      console.log(`✅ 영양 정보 분석 완료 (${modelName}):`, nutritionData);

      return {
        calories: Math.round(nutritionData.calories),
        protein: Math.round(nutritionData.protein),
        carbs: Math.round(nutritionData.carbs),
        fat: Math.round(nutritionData.fat),
      };

    } catch (error: any) {
      console.log(`❌ ${modelName} 실패:`, error.message);
      lastError = error;
      throw new Error(`Gemini 모델 실패. 오프라인 데이터로 대체합니다. 오류: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ AI 분석 실패:', error);
    
    // 폴백 데이터 반환
    if (fallback) {
      console.log(`📦 오프라인 데이터 사용: ${foodName}`, fallback);
      return fallback;
    }
    
    return null;
  }
}

/**
 * API 키가 설정되어 있는지 확인
 */
export function isGeminiAvailable(): boolean {
  return !!process.env.EXPO_PUBLIC_GEMINI_API_KEY;
}

/**
 * 일반적인 음식의 영양 정보 (오프라인 폴백) - 100개 이상
 */
const FALLBACK_NUTRITION: Record<string, NutritionInfo> = {
  // 찌개/국물류
  '김치찌개': { calories: 150, protein: 12, carbs: 10, fat: 8 },
  '된장찌개': { calories: 120, protein: 10, carbs: 8, fat: 6 },
  '순두부찌개': { calories: 180, protein: 14, carbs: 12, fat: 10 },
  '부대찌개': { calories: 450, protein: 20, carbs: 40, fat: 20 },
  '감자탕': { calories: 350, protein: 25, carbs: 20, fat: 18 },
  '갈비탕': { calories: 400, protein: 30, carbs: 15, fat: 25 },
  '설렁탕': { calories: 350, protein: 28, carbs: 10, fat: 22 },
  '육개장': { calories: 300, protein: 25, carbs: 15, fat: 15 },
  
  // 고기류
  '불고기': { calories: 280, protein: 25, carbs: 8, fat: 15 },
  '삼겹살': { calories: 500, protein: 20, carbs: 2, fat: 45 },
  '갈비': { calories: 450, protein: 30, carbs: 10, fat: 32 },
  '제육볶음': { calories: 320, protein: 22, carbs: 15, fat: 18 },
  '닭갈비': { calories: 350, protein: 28, carbs: 20, fat: 16 },
  '보쌈': { calories: 400, protein: 30, carbs: 8, fat: 28 },
  '족발': { calories: 380, protein: 25, carbs: 5, fat: 28 },
  
  // 밥류
  '비빔밥': { calories: 450, protein: 15, carbs: 70, fat: 12 },
  '김밥': { calories: 350, protein: 10, carbs: 55, fat: 10 },
  '볶음밥': { calories: 450, protein: 12, carbs: 65, fat: 15 },
  '덮밥': { calories: 500, protein: 20, carbs: 70, fat: 15 },
  '김치볶음밥': { calories: 480, protein: 12, carbs: 68, fat: 16 },
  '오므라이스': { calories: 550, protein: 18, carbs: 75, fat: 18 },
  
  // 면류
  '떡볶이': { calories: 450, protein: 10, carbs: 85, fat: 8 },
  '라면': { calories: 500, protein: 10, carbs: 75, fat: 18 },
  '짜장면': { calories: 600, protein: 15, carbs: 95, fat: 18 },
  '짬뽕': { calories: 550, protein: 20, carbs: 80, fat: 15 },
  '냉면': { calories: 400, protein: 12, carbs: 75, fat: 5 },
  '칼국수': { calories: 380, protein: 12, carbs: 70, fat: 6 },
  '우동': { calories: 350, protein: 10, carbs: 65, fat: 5 },
  '파스타': { calories: 500, protein: 15, carbs: 75, fat: 15 },
  
  // 치킨 (브랜드명 포함)
  '치킨': { calories: 450, protein: 30, carbs: 25, fat: 25 },
  '후라이드': { calories: 420, protein: 28, carbs: 22, fat: 24 },
  '양념치킨': { calories: 480, protein: 28, carbs: 30, fat: 26 },
  'BHC 뿌링클': { calories: 520, protein: 28, carbs: 32, fat: 28 },
  'BBQ 황금올리브': { calories: 500, protein: 30, carbs: 28, fat: 26 },
  '교촌 허니콤보': { calories: 510, protein: 29, carbs: 31, fat: 27 },
  '뿌링클': { calories: 520, protein: 28, carbs: 32, fat: 28 },
  '황금올리브': { calories: 500, protein: 30, carbs: 28, fat: 26 },
  
  // 분식
  '순대': { calories: 380, protein: 15, carbs: 45, fat: 15 },
  '튀김': { calories: 300, protein: 8, carbs: 35, fat: 15 },
  '어묵': { calories: 150, protein: 10, carbs: 12, fat: 6 },
  '만두': { calories: 280, protein: 12, carbs: 35, fat: 10 },
  
  // 양식
  '피자': { calories: 550, protein: 20, carbs: 60, fat: 25 },
  '햄버거': { calories: 500, protein: 25, carbs: 45, fat: 25 },
  '스테이크': { calories: 550, protein: 45, carbs: 5, fat: 35 },
  '샌드위치': { calories: 350, protein: 15, carbs: 40, fat: 15 },
  
  // 간식/디저트
  '아이스크림': { calories: 250, protein: 4, carbs: 30, fat: 12 },
  '케이크': { calories: 350, protein: 5, carbs: 45, fat: 18 },
  '쿠키': { calories: 150, protein: 2, carbs: 20, fat: 7 },
  '초콜릿': { calories: 200, protein: 3, carbs: 22, fat: 12 },
  '홈런볼': { calories: 180, protein: 3, carbs: 28, fat: 7 },
  '빼빼로': { calories: 160, protein: 2, carbs: 22, fat: 8 },
  '새우깡': { calories: 140, protein: 2, carbs: 20, fat: 6 },
  
  // 과일
  '바나나': { calories: 100, protein: 1, carbs: 25, fat: 0 },
  '사과': { calories: 80, protein: 0, carbs: 20, fat: 0 },
  '딸기': { calories: 50, protein: 1, carbs: 12, fat: 0 },
  '수박': { calories: 60, protein: 1, carbs: 15, fat: 0 },
  '포도': { calories: 70, protein: 1, carbs: 18, fat: 0 },
  
  // 음료
  '커피': { calories: 5, protein: 0, carbs: 1, fat: 0 },
  '우유': { calories: 150, protein: 8, carbs: 12, fat: 8 },
  '주스': { calories: 120, protein: 1, carbs: 28, fat: 0 },
  
  // 건강식
  '샐러드': { calories: 150, protein: 8, carbs: 15, fat: 8 },
  '연어': { calories: 280, protein: 30, carbs: 0, fat: 18 },
  '닭가슴살': { calories: 165, protein: 31, carbs: 0, fat: 4 },
  '두부': { calories: 80, protein: 8, carbs: 2, fat: 5 },
};

/**
 * 오프라인 폴백 영양 정보
 */
export function getFallbackNutrition(foodName: string): NutritionInfo | null {
  return FALLBACK_NUTRITION[foodName] || null;
}

/**
 * 사전 번역 데이터 (한국 음식 40개 이상)
 */
const PREDEFINED_TRANSLATIONS: Record<string, string> = {
  // 찌개류
  '김치찌개': 'kimchi stew',
  '된장찌개': 'soybean paste stew',
  '순두부찌개': 'soft tofu stew',
  '부대찌개': 'army stew',
  '차돌된장찌개': 'beef brisket soybean paste stew',
  
  // 고기류
  '불고기': 'bulgogi',
  '삼겹살': 'samgyeopsal',
  '갈비': 'galbi',
  '제육볶음': 'spicy stir-fried pork',
  
  // 밥류
  '비빔밥': 'bibimbap',
  '김밥': 'kimbap',
  '볶음밥': 'fried rice',
  '덮밥': 'rice bowl',
  
  // 면류
  '떡볶이': 'tteokbokki',
  '라면': 'ramen',
  '짜장면': 'jajangmyeon',
  '짬뽕': 'jjamppong',
  '냉면': 'naengmyeon',
  '칼국수': 'kalguksu',
  
  // 치킨
  '치킨': 'korean fried chicken',
  '후라이드': 'fried chicken',
  '양념치킨': 'seasoned chicken',
  '뿌링클': 'seasoned fried chicken',
  '황금올리브': 'garlic chicken',
  
  // 건강식
  '샐러드': 'salad',
  '연어': 'salmon',
  '연어구이': 'grilled salmon',
  '닭가슴살': 'chicken breast',
  
  // 과일
  '바나나': 'banana',
  '사과': 'apple',
  '딸기': 'strawberry',
  '수박': 'watermelon',
  
  // 양식
  '스테이크': 'steak',
  '파스타': 'pasta',
  '피자': 'pizza',
  '햄버거': 'hamburger',
  
  // 기타
  '커피': 'coffee',
  '우유': 'milk',
};

/**
 * 한글 음식명을 영어로 번역
 * 
 * @param foodName 한글 음식명 (예: "떡볶이", "김치찌개")
 * @returns 영어 번역 (예: "tteokbokki", "kimchi stew")
 */
export async function translateFoodNameToEnglish(foodName: string): Promise<string | null> {
  try {
    // 1. 사전 번역 데이터 확인 (Rate Limit 방지)
    const cleanName = foodName
      .replace(/\d+인분/g, '')
      .replace(/\d+g/g, '')
      .replace(/\d+ml/g, '')
      .trim();
    
    if (PREDEFINED_TRANSLATIONS[cleanName]) {
      console.log(`✅ 사전 번역 사용: "${foodName}" → "${PREDEFINED_TRANSLATIONS[cleanName]}"`);
      return PREDEFINED_TRANSLATIONS[cleanName];
    }

    // 2. 이미 영어인 경우 그대로 반환
    const isEnglish = /^[a-zA-Z\s]+$/.test(cleanName);
    if (isEnglish) {
      console.log(`✅ 이미 영어: "${foodName}"`);
      return cleanName.toLowerCase();
    }

    // 3. Gemini API로 번역 (마지막 수단, Rate Limit 주의)
    console.log(`⚠️ "${foodName}"는 사전 데이터에 없음. Gemini API 번역 시도...`);
    
    const ai = initializeGemini();
    
    if (!ai) {
      console.warn('⚠️ Gemini API 미설정 - 원본 사용');
      return foodName;
    }

    // 단일 모델만 사용 (Rate Limit 방지)
    const modelName = 'models/gemini-2.5-flash';

    try {
      const model = ai.getGenerativeModel({ model: modelName });
      
      // 번역 프롬프트 (간단하고 명확하게)
      const prompt = `Translate this Korean food name to English. Only return the English translation, nothing else.

Korean: ${foodName}
English:`;

      console.log(`🌐 Gemini 번역 시도: "${foodName}" (${modelName})`);

      // API 호출
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const englishName = response.text().trim();

      console.log(`✅ Gemini 번역 완료: "${foodName}" → "${englishName}"`);

      return englishName;

    } catch (error: any) {
      // Rate Limit 에러 처리
      if (error.message?.includes('429') || error.message?.includes('Too Many Requests')) {
        console.warn(`⚠️ Rate Limit 초과! 원본 사용: "${foodName}"`);
        return foodName; // 원본 그대로 사용
      }
      
      console.log(`❌ ${modelName} 번역 실패:`, error.message);
      console.warn(`⚠️ 번역 실패. 원본 사용: "${foodName}"`);
      return foodName;
    }

  } catch (error: any) {
    console.error('❌ 번역 에러:', error);
    // 에러 발생 시 원본 반환
    console.warn(`⚠️ 에러 발생! 원본 사용: "${foodName}"`);
    return foodName;
  }
}

/**
 * 이미지에서 음식 정보 분석 (Gemini Vision API)
 * 
 * @param imageUri 이미지 URI 또는 Data URL
 * @returns 음식명, 칼로리, 영양소 정보
 */
export async function analyzeFoodImage(imageUri: string): Promise<FoodAnalysisResult | null> {
  try {
    const ai = initializeGemini();
    
    if (!ai) {
      console.warn('⚠️ Gemini API 미설정');
      return null;
    }

    console.log('🔍 이미지 분석 시작...');

    // Gemini Vision 모델 사용
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // 이미지 데이터 준비
    let imageData: string;
    let mimeType: string = 'image/jpeg';

    if (imageUri.startsWith('data:')) {
      // Data URL인 경우
      const parts = imageUri.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
      imageData = parts[1];
    } else if (imageUri.startsWith('http')) {
      // URL인 경우 fetch로 가져오기
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      imageData = base64.split(',')[1];
      mimeType = blob.type;
    } else {
      // 로컬 파일 경로인 경우 (모바일)
      console.error('❌ 로컬 파일 경로는 웹에서 지원되지 않습니다.');
      return null;
    }

    // 프롬프트
    const prompt = `이 음식 이미지를 분석하여 다음 정보를 JSON 형식으로 제공해주세요:

1. 음식 이름 (한글)
2. 칼로리 (kcal, 1인분 기준)
3. 단백질 (g)
4. 탄수화물 (g)
5. 지방 (g)

응답 형식 (JSON만):
{
  "foodName": "음식명",
  "calories": 숫자,
  "protein": 숫자,
  "carbs": 숫자,
  "fat": 숫자
}

주의사항:
- 반드시 JSON 형식만 반환하세요
- 음식이 아닌 경우 null 반환
- 1인분 기준으로 추정
- 여러 음식이 보이면 가장 주된 음식 분석`;

    // API 호출
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: imageData,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini Vision 응답:', text);

    // JSON 추출 (마크다운 코드 블록 제거)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    // JSON 파싱
    const data = JSON.parse(jsonText);

    if (!data || !data.foodName) {
      console.warn('⚠️ 음식 정보를 찾을 수 없습니다.');
      return null;
    }

    return {
      foodName: data.foodName,
      calories: Number(data.calories) || 0,
      protein: Number(data.protein) || 0,
      carbs: Number(data.carbs) || 0,
      fat: Number(data.fat) || 0,
    };

  } catch (error: any) {
    console.error('❌ 이미지 분석 실패:', error);
    return null;
  }
}

/**
 * Blob을 Base64로 변환
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

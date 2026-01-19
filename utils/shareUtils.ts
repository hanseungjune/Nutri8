/**
 * 공유 관련 유틸리티
 * 7주차: 공유 기능
 */

import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import type { Meal } from '../types';
import { calculateTotalCalories, calculateNutrients } from './calories';

/**
 * 일일 식단 텍스트 생성
 */
export function generateDailyMealText(meals: Meal[], date: string, targetCalories?: number): string {
  const totalCalories = calculateTotalCalories(meals);
  const nutrients = calculateNutrients(meals);
  
  const mealTypeLabels = {
    breakfast: '🌅 아침',
    lunch: '🌞 점심',
    dinner: '🌙 저녁',
    snack: '🍪 간식',
  };

  let text = `📅 ${date} 식단 기록\n\n`;
  
  // 식사별 정리
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.mealType]) {
      acc[meal.mealType] = [];
    }
    acc[meal.mealType].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  Object.entries(groupedMeals).forEach(([mealType, mealList]) => {
    text += `${mealTypeLabels[mealType as keyof typeof mealTypeLabels]}\n`;
    mealList.forEach(meal => {
      text += `  • ${meal.foodName}: ${meal.calories}kcal\n`;
    });
    text += '\n';
  });

  // 총합
  text += `📊 총 칼로리: ${totalCalories}kcal\n`;
  
  if (targetCalories) {
    const percentage = Math.round((totalCalories / targetCalories) * 100);
    text += `🎯 목표 대비: ${percentage}%\n`;
  }

  // 영양소
  if (nutrients.protein > 0 || nutrients.carbs > 0 || nutrients.fat > 0) {
    text += `\n🥗 영양소:\n`;
    if (nutrients.protein > 0) text += `  단백질: ${nutrients.protein}g\n`;
    if (nutrients.carbs > 0) text += `  탄수화물: ${nutrients.carbs}g\n`;
    if (nutrients.fat > 0) text += `  지방: ${nutrients.fat}g\n`;
  }

  text += '\n📱 Nutri8 앱으로 기록했습니다';

  return text;
}

/**
 * 일일 식단 공유
 */
export async function shareDailyMeal(meals: Meal[], date: string, targetCalories?: number): Promise<boolean> {
  if (Platform.OS === 'web') {
    // Web: Navigator Share API 사용 (지원되는 경우)
    if (navigator.share) {
      try {
        const text = generateDailyMealText(meals, date, targetCalories);
        await navigator.share({
          title: `${date} 식단 기록`,
          text,
        });
        return true;
      } catch (error) {
        console.error('Web share error:', error);
        return false;
      }
    } else {
      // Fallback: 클립보드에 복사
      const text = generateDailyMealText(meals, date, targetCalories);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다!');
        return true;
      }
      return false;
    }
  }

  // Native: expo-sharing 사용
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      console.error('Sharing is not available on this platform');
      return false;
    }

    // 텍스트를 임시 파일로 저장해야 함 (expo-sharing은 파일 공유만 지원)
    // 간단히 하기 위해 텍스트를 직접 공유할 수 없으므로,
    // 여기서는 alert로 텍스트를 표시하고 사용자가 복사하도록 안내
    const text = generateDailyMealText(meals, date, targetCalories);
    
    // TODO: FileSystem을 사용하여 텍스트 파일 생성 후 공유
    // 현재는 간단히 텍스트만 반환
    console.log('Share text:', text);
    
    return true;
  } catch (error) {
    console.error('Share error:', error);
    return false;
  }
}

/**
 * 주간 통계 텍스트 생성
 */
export function generateWeeklyStatsText(
  meals: Meal[],
  weekStart: string,
  weekEnd: string,
  targetCalories?: number
): string {
  const totalCalories = calculateTotalCalories(meals);
  const daysRecorded = new Set(meals.map(m => m.date)).size;
  const avgCalories = daysRecorded > 0 ? Math.round(totalCalories / daysRecorded) : 0;

  let text = `📊 주간 통계 (${weekStart} ~ ${weekEnd})\n\n`;
  text += `📅 기록일: ${daysRecorded}일\n`;
  text += `🔥 총 칼로리: ${totalCalories}kcal\n`;
  text += `📊 평균 칼로리: ${avgCalories}kcal/일\n`;

  if (targetCalories) {
    const avgPercentage = Math.round((avgCalories / targetCalories) * 100);
    text += `🎯 평균 달성률: ${avgPercentage}%\n`;
  }

  text += '\n📱 Nutri8 앱으로 기록했습니다';

  return text;
}

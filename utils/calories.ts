/**
 * 칼로리 및 영양소 계산 유틸리티
 */

import type { Meal } from '../types';

/**
 * 여러 식단의 총 칼로리 계산
 */
export const calculateTotalCalories = (meals: Meal[]): number => {
  return meals.reduce((total, meal) => total + meal.calories, 0);
};

/**
 * 영양소 합계 계산
 */
export const calculateNutrients = (meals: Meal[]) => {
  const total = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  meals.forEach((meal) => {
    total.calories += meal.calories;
    total.protein += meal.protein || 0;
    total.carbs += meal.carbs || 0;
    total.fat += meal.fat || 0;
  });

  return total;
};

/**
 * 목표 대비 달성률 계산 (%)
 */
export const calculateAchievementRate = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.round((current / target) * 100);
};

/**
 * BMI 계산
 * @param weight 체중 (kg)
 * @param height 키 (cm)
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/**
 * BMI 상태 반환
 */
export const getBMIStatus = (bmi: number): string => {
  if (bmi < 18.5) return '저체중';
  if (bmi < 23) return '정상';
  if (bmi < 25) return '과체중';
  if (bmi < 30) return '비만';
  return '고도비만';
};

/**
 * 기초대사량(BMR) 계산 - Harris-Benedict 공식
 * @param weight 체중 (kg)
 * @param height 키 (cm)
 * @param age 나이
 * @param gender 성별
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  if (gender === 'male') {
    return Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
  } else {
    return Math.round(447.593 + 9.247 * weight + 3.098 * height - 4.330 * age);
  }
};

/**
 * 권장 칼로리 계산 (활동 수준 고려)
 * @param bmr 기초대사량
 * @param activityLevel 활동 수준 (1.2 ~ 1.9)
 */
export const calculateRecommendedCalories = (
  bmr: number,
  activityLevel: number = 1.375 // 기본: 가벼운 활동
): number => {
  return Math.round(bmr * activityLevel);
};

/**
 * 칼로리를 천 단위로 포맷팅
 */
export const formatCalories = (calories: number): string => {
  return calories.toLocaleString('ko-KR');
};

/**
 * 체중 감량에 필요한 일일 칼로리 적자 계산
 * @param targetWeightLoss 목표 감량 체중 (kg)
 * @param days 기간 (일)
 * @returns 일일 칼로리 적자
 */
export const calculateCalorieDeficit = (targetWeightLoss: number, days: number): number => {
  // 1kg 감량 = 약 7700kcal 적자
  const totalDeficit = targetWeightLoss * 7700;
  return Math.round(totalDeficit / days);
};

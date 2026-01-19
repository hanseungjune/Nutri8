/**
 * 식단 관련 커스텀 훅
 * 6주차: 코드 리팩토링
 */

import { useEffect, useMemo } from 'react';
import { useMealStore } from '../stores/mealStore';
import { getTodayDate } from '../utils/date';
import { calculateTotalCalories, calculateNutrients } from '../utils/calories';

export const useMeals = (date?: string) => {
  const {
    meals,
    isLoading,
    error,
    isInitialized,
    initialize,
    loadMeals,
    loadAllMeals,
    addMeal,
    updateMeal,
    deleteMeal,
    clearError,
  } = useMealStore();

  // 자동 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 날짜별 로드 또는 전체 로드
  useEffect(() => {
    if (isInitialized) {
      if (date) {
        loadMeals(date);
      } else {
        loadAllMeals();
      }
    }
  }, [isInitialized, date]);

  // 오늘 식단 필터링
  const todayMeals = useMemo(() => {
    const today = getTodayDate();
    return meals.filter(meal => meal.date === today);
  }, [meals]);

  // 오늘 총 칼로리
  const todayCalories = useMemo(() => {
    return calculateTotalCalories(todayMeals);
  }, [todayMeals]);

  // 오늘 영양소
  const todayNutrients = useMemo(() => {
    return calculateNutrients(todayMeals);
  }, [todayMeals]);

  return {
    meals,
    todayMeals,
    todayCalories,
    todayNutrients,
    isLoading,
    error,
    addMeal,
    updateMeal,
    deleteMeal,
    loadMeals,
    loadAllMeals,
    clearError,
  };
};

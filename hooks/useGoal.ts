/**
 * 목표 관련 커스텀 훅
 * 6주차: 코드 리팩토링
 */

import { useEffect } from 'react';
import { useGoalStore } from '../stores/goalStore';

export const useGoal = () => {
  const { 
    currentGoal, 
    isLoading, 
    error, 
    isInitialized,
    initialize, 
    loadGoal, 
    setGoal,
    updateGoal,
    clearError,
  } = useGoalStore();

  // 자동 초기화
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 초기화 후 목표 로드
  useEffect(() => {
    if (isInitialized) {
      loadGoal();
    }
  }, [isInitialized, loadGoal]);

  return {
    goal: currentGoal,
    isLoading,
    error,
    setGoal,
    updateGoal,
    loadGoal,
    clearError,
  };
};

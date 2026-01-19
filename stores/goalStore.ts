/**
 * 목표 관리 Zustand Store
 * DB와 연동된 실제 구현 (5주차)
 */

import { create } from 'zustand';
import type { Goal } from '../types';
import { GoalQueries } from '../utils/db/queries';
import { getDatabase } from '../utils/db/database';

interface GoalStore {
  currentGoal: Goal | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Actions
  initialize: () => void;
  setGoal: (goal: Goal, onSuccess?: () => void, onError?: (error: Error) => void) => void;
  updateGoal: (id: number, goal: Partial<Goal>, onSuccess?: () => void, onError?: (error: Error) => void) => void;
  loadGoal: () => void;
  clearError: () => void;
  reset: () => void; // 로그아웃 시 초기화
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  currentGoal: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  
  initialize: async () => {
    if (get().isInitialized) {
      console.log('GoalStore already initialized');
      return;
    }

    try {
      const db = getDatabase();
      await db.initialize();
      set({ isInitialized: true });
      console.log('GoalStore initialized successfully');
    } catch (error) {
      console.error('Failed to initialize GoalStore:', error);
      set({ error: 'DB 초기화 실패', isInitialized: false });
    }
  },
  
  setGoal: (goal, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    
    GoalQueries.insert(
      goal,
      (insertId) => {
        const newGoal = { ...goal, id: insertId };
        set({ currentGoal: newGoal, isLoading: false });
        console.log('Goal set successfully:', newGoal);
        if (onSuccess) onSuccess();
      },
      (error) => {
        set({ error: '목표 저장 실패', isLoading: false });
        console.error('Failed to set goal:', error);
        if (onError) onError(error);
      }
    );
  },

  updateGoal: (id, updatedGoal, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    
    GoalQueries.update(
      id,
      updatedGoal,
      () => {
        set((state) => ({
          currentGoal: state.currentGoal ? { ...state.currentGoal, ...updatedGoal } : null,
          isLoading: false,
        }));
        console.log('Goal updated successfully:', id);
        if (onSuccess) onSuccess();
      },
      (error) => {
        set({ error: '목표 수정 실패', isLoading: false });
        console.error('Failed to update goal:', error);
        if (onError) onError(error);
      }
    );
  },
  
  loadGoal: () => {
    set({ isLoading: true, error: null });
    
    GoalQueries.getCurrent(
      (goal) => {
        set({ currentGoal: goal, isLoading: false });
        if (goal) {
          console.log('Current goal loaded:', goal);
        } else {
          console.log('No current goal found');
        }
      },
      (error) => {
        set({ error: '목표 불러오기 실패', isLoading: false });
        console.error('Failed to load goal:', error);
      }
    );
  },
  
  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      currentGoal: null,
      isLoading: false,
      error: null,
      isInitialized: false,
    });
    console.log('✅ GoalStore 초기화 완료');
  },
}));

/**
 * 식단 관리 Zustand Store
 * DB와 연동된 실제 구현
 */

import { create } from 'zustand';
import type { Meal } from '../types';
import { MealQueries } from '../utils/db/queries';
import { getDatabase } from '../utils/db/database';

interface MealStore {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  editingMeal: Meal | null; // 수정 중인 식사
  
  // Actions
  initialize: () => void;
  addMeal: (meal: Meal, onSuccess?: () => void, onError?: (error: Error) => void) => void;
  updateMeal: (id: number, meal: Partial<Meal>, onSuccess?: () => void, onError?: (error: Error) => void) => void;
  deleteMeal: (id: number, onSuccess?: () => void, onError?: (error: Error) => void) => void;
  loadMeals: (date: string) => void;
  loadAllMeals: () => void;
  setEditingMeal: (meal: Meal | null) => void; // 수정할 식사 설정
  clearError: () => void;
  reset: () => void; // 로그아웃 시 초기화
}

export const useMealStore = create<MealStore>((set, get) => ({
  meals: [],
  isLoading: false,
  error: null,
  isInitialized: false,
  editingMeal: null,
  
  initialize: async () => {
    if (get().isInitialized) {
      console.log('MealStore already initialized');
      return;
    }

    try {
      const db = getDatabase();
      await db.initialize();
      set({ isInitialized: true });
      console.log('MealStore initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MealStore:', error);
      set({ error: 'DB 초기화 실패', isInitialized: false });
    }
  },
  
  addMeal: (meal, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    
    MealQueries.insert(
      meal,
      (insertId) => {
        // DB에 저장 성공 후 스토어 업데이트
        const newMeal = { ...meal, id: insertId };
        set((state) => ({
          meals: [...state.meals, newMeal],
          isLoading: false,
        }));
        console.log('Meal added to store:', newMeal);
        if (onSuccess) onSuccess();
      },
      (error) => {
        set({ error: '식단 저장 실패', isLoading: false });
        console.error('Failed to add meal:', error);
        if (onError) onError(error);
      }
    );
  },
  
  updateMeal: (id, updatedMeal, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    
    MealQueries.update(
      id,
      updatedMeal,
      () => {
        // DB 업데이트 성공 후 스토어 업데이트
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === id ? { ...meal, ...updatedMeal } : meal
          ),
          isLoading: false,
        }));
        console.log('Meal updated in store:', id);
        if (onSuccess) onSuccess();
      },
      (error) => {
        set({ error: '식단 수정 실패', isLoading: false });
        console.error('Failed to update meal:', error);
        if (onError) onError(error);
      }
    );
  },
  
  deleteMeal: (id, onSuccess, onError) => {
    set({ isLoading: true, error: null });
    
    MealQueries.delete(
      id,
      () => {
        // DB 삭제 성공 후 스토어 업데이트
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== id),
          isLoading: false,
        }));
        console.log('Meal deleted from store:', id);
        if (onSuccess) onSuccess();
      },
      (error) => {
        set({ error: '식단 삭제 실패', isLoading: false });
        console.error('Failed to delete meal:', error);
        if (onError) onError(error);
      }
    );
  },
  
  loadMeals: (date) => {
    set({ isLoading: true, error: null });
    
    MealQueries.getByDate(
      date,
      (meals) => {
        set({ meals, isLoading: false });
        console.log(`Loaded ${meals.length} meals for ${date}`);
      },
      (error) => {
        set({ error: '식단 불러오기 실패', isLoading: false, meals: [] });
        console.error('Failed to load meals:', error);
      }
    );
  },

  loadAllMeals: () => {
    set({ isLoading: true, error: null });
    
    MealQueries.getAll(
      (meals) => {
        set({ meals, isLoading: false });
        console.log(`Loaded ${meals.length} total meals`);
      },
      (error) => {
        set({ error: '전체 식단 불러오기 실패', isLoading: false, meals: [] });
        console.error('Failed to load all meals:', error);
      }
    );
  },
  
  setEditingMeal: (meal) => {
    set({ editingMeal: meal });
  },
  
  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      meals: [],
      isLoading: false,
      error: null,
      isInitialized: false,
      editingMeal: null,
    });
    console.log('✅ MealStore 초기화 완료');
  },
}));

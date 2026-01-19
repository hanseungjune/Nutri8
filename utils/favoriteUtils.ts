/**
 * 즐겨찾기 관련 유틸리티
 * 7주차: 음식 즐겨찾기 기능
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Meal } from '../types';

const FAVORITES_KEY = '@nutri8:favorites';

export interface FavoriteMeal {
  id: string;
  foodName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  createdAt: string;
}

/**
 * 즐겨찾기 목록 불러오기
 */
export async function loadFavorites(): Promise<FavoriteMeal[]> {
  try {
    const saved = await AsyncStorage.getItem(FAVORITES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load favorites:', error);
  }
  return [];
}

/**
 * 즐겨찾기 추가
 */
export async function addFavorite(meal: Omit<FavoriteMeal, 'id' | 'createdAt'>): Promise<void> {
  try {
    const favorites = await loadFavorites();
    
    // 중복 체크 (같은 이름의 음식이 있으면 추가하지 않음)
    const exists = favorites.some(
      fav => fav.foodName.toLowerCase() === meal.foodName.toLowerCase()
    );
    
    if (exists) {
      throw new Error('이미 즐겨찾기에 추가된 음식입니다.');
    }

    const newFavorite: FavoriteMeal = {
      ...meal,
      id: `fav_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
    };

    favorites.unshift(newFavorite); // 맨 앞에 추가
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to add favorite:', error);
    throw error;
  }
}

/**
 * 즐겨찾기 삭제
 */
export async function removeFavorite(id: string): Promise<void> {
  try {
    const favorites = await loadFavorites();
    const filtered = favorites.filter(fav => fav.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove favorite:', error);
    throw error;
  }
}

/**
 * 즐겨찾기 검색
 */
export async function searchFavorites(query: string): Promise<FavoriteMeal[]> {
  try {
    const favorites = await loadFavorites();
    
    if (!query.trim()) {
      return favorites;
    }

    const lowerQuery = query.toLowerCase();
    return favorites.filter(fav =>
      fav.foodName.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Failed to search favorites:', error);
    return [];
  }
}

/**
 * 즐겨찾기로부터 Meal 객체 생성
 */
export function favoriteToMeal(
  favorite: FavoriteMeal,
  mealType: Meal['mealType'],
  date: string
): Omit<Meal, 'id'> {
  return {
    foodName: favorite.foodName,
    calories: favorite.calories,
    protein: favorite.protein,
    carbs: favorite.carbs,
    fat: favorite.fat,
    mealType,
    date,
  };
}

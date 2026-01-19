/**
 * PostgreSQL (Supabase) 쿼리 헬퍼 함수들
 */

import type { Meal, Goal, WeightRecord } from '../../types';
import { getDatabase } from './database';
import { supabase } from './supabase';

/**
 * Meals 관련 쿼리 (PostgreSQL)
 */
export const MealQueries = {
  /**
   * 식단 추가
   */
  insert: async (meal: Meal, onSuccess: (id: number) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    // 현재 로그인한 사용자 ID 가져오기
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('User not authenticated:', authError);
      if (onError) onError(new Error('사용자 인증이 필요합니다.'));
      return;
    }
    
    const insertData = {
      user_id: user.id, // 사용자 ID 추가
      date: meal.date,
      meal_type: meal.mealType,
      food_name: meal.foodName,
      calories: meal.calories,
      protein: meal.protein || null,
      carbs: meal.carbs || null,
      fat: meal.fat || null,
      photo_url: meal.photoUrl || null,
    };
    
    client
      .from('meals')
      .insert(insertData)
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to insert meal:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log('Meal inserted successfully, ID:', data.id);
        onSuccess(data.id);
      })
      .catch((err: Error) => {
        console.error('Insert meal error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 날짜별 식단 조회
   */
  getByDate: (date: string, onSuccess: (meals: Meal[]) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('meals')
      .select('*')
      .eq('date', date)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to get meals:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        const meals: Meal[] = (data || []).map((row: any) => ({
          id: row.id,
          date: row.date,
          mealType: row.meal_type,
          foodName: row.food_name,
          calories: row.calories,
          protein: row.protein,
          carbs: row.carbs,
          fat: row.fat,
          photoUrl: row.photo_url, // 사진 URL 추가
          createdAt: row.created_at,
        }));
        
        console.log(`Loaded ${meals.length} meals for date ${date}`);
        onSuccess(meals);
      })
      .catch((err: Error) => {
        console.error('Get meals error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 모든 식단 조회
   */
  getAll: (onSuccess: (meals: Meal[]) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('meals')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to get all meals:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        const meals: Meal[] = (data || []).map((row: any) => ({
          id: row.id,
          date: row.date,
          mealType: row.meal_type,
          foodName: row.food_name,
          calories: row.calories,
          protein: row.protein,
          carbs: row.carbs,
          fat: row.fat,
          photoUrl: row.photo_url, // 사진 URL 추가
          createdAt: row.created_at,
        }));
        
        console.log(`Loaded ${meals.length} total meals`);
        onSuccess(meals);
      })
      .catch((err: Error) => {
        console.error('Get all meals error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 식단 수정
   */
  update: (id: number, meal: Partial<Meal>, onSuccess: () => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    const updateData: any = {};
    if (meal.foodName !== undefined) updateData.food_name = meal.foodName;
    if (meal.calories !== undefined) updateData.calories = meal.calories;
    if (meal.protein !== undefined) updateData.protein = meal.protein;
    if (meal.carbs !== undefined) updateData.carbs = meal.carbs;
    if (meal.fat !== undefined) updateData.fat = meal.fat;
    if (meal.photoUrl !== undefined) updateData.photo_url = meal.photoUrl; // 사진 URL 추가
    
    client
      .from('meals')
      .update(updateData)
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Failed to update meal:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log(`Meal ${id} updated successfully`);
        onSuccess();
      })
      .catch((err: Error) => {
        console.error('Update meal error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 식단 삭제
   */
  delete: (id: number, onSuccess: () => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('meals')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Failed to delete meal:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log(`Meal ${id} deleted successfully`);
        onSuccess();
      })
      .catch((err: Error) => {
        console.error('Delete meal error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 날짜 범위별 식단 조회
   */
  getByDateRange: (
    startDate: string,
    endDate: string,
    onSuccess: (meals: Meal[]) => void,
    onError?: (error: Error) => void
  ) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('meals')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to get meals by date range:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        const meals: Meal[] = (data || []).map((row: any) => ({
          id: row.id,
          date: row.date,
          mealType: row.meal_type,
          foodName: row.food_name,
          calories: row.calories,
          protein: row.protein,
          carbs: row.carbs,
          fat: row.fat,
          photoUrl: row.photo_url, // 사진 URL 추가
          createdAt: row.created_at,
        }));
        
        console.log(`Loaded ${meals.length} meals for date range ${startDate} ~ ${endDate}`);
        onSuccess(meals);
      })
      .catch((err: Error) => {
        console.error('Get meals by date range error:', err);
        if (onError) onError(err);
      });
  },
};

/**
 * Goals 관련 쿼리 (PostgreSQL)
 */
export const GoalQueries = {
  /**
   * 현재 목표 조회
   */
  getCurrent: (onSuccess: (goal: Goal | null) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('goals')
      .select('*')
      .or('end_date.is.null,end_date.gte.' + new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            // No rows found
            console.log('No current goal found');
            onSuccess(null);
            return;
          }
          console.error('Failed to get current goal:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        if (!data) {
          onSuccess(null);
          return;
        }
        
        const goal: Goal = {
          id: data.id,
          user_id: data.user_id,
          targetWeight: data.target_weight,
          targetCalories: data.target_calories,
          startDate: data.start_date,
          endDate: data.end_date,
        };
        console.log('Current goal loaded:', goal);
        onSuccess(goal);
      })
      .catch((err: Error) => {
        console.error('Get current goal error:', err);
        onSuccess(null);
      });
  },

  /**
   * 목표 설정
   */
  insert: async (goal: Goal, onSuccess: (id: number) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    // 현재 로그인한 사용자 ID 가져오기
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('User not authenticated:', authError);
      if (onError) onError(new Error('사용자 인증이 필요합니다.'));
      return;
    }
    
    const insertData = {
      user_id: user.id, // 사용자 ID 추가
      target_weight: goal.targetWeight || null,
      target_calories: goal.targetCalories,
      start_date: goal.startDate,
      end_date: goal.endDate || null,
    };
    
    client
      .from('goals')
      .insert(insertData)
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to insert goal:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log('Goal inserted successfully, ID:', data.id);
        onSuccess(data.id);
      })
      .catch((err: Error) => {
        console.error('Insert goal error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 목표 수정
   */
  update: (id: number, goal: Partial<Goal>, onSuccess: () => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    const updateData: any = {};
    if (goal.targetWeight !== undefined) updateData.target_weight = goal.targetWeight;
    if (goal.targetCalories !== undefined) updateData.target_calories = goal.targetCalories;
    if (goal.endDate !== undefined) updateData.end_date = goal.endDate;
    
    client
      .from('goals')
      .update(updateData)
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Failed to update goal:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log(`Goal ${id} updated successfully`);
        onSuccess();
      })
      .catch((err: Error) => {
        console.error('Update goal error:', err);
        if (onError) onError(err);
      });
  },
};

/**
 * WeightRecords 관련 쿼리 (PostgreSQL)
 */
export const WeightRecordQueries = {
  /**
   * 체중 기록 추가
   */
  insert: async (record: WeightRecord, onSuccess: (id: number) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    // 현재 로그인한 사용자 ID 가져오기
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('User not authenticated:', authError);
      if (onError) onError(new Error('사용자 인증이 필요합니다.'));
      return;
    }
    
    const insertData = {
      user_id: user.id, // 사용자 ID 추가
      date: record.date,
      weight: record.weight,
    };
    
    client
      .from('weight_records')
      .insert(insertData)
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to insert weight record:', error);
          if (onError) onError(error as Error);
          return;
        }
        console.log('Weight record inserted successfully, ID:', data.id);
        onSuccess(data.id);
      })
      .catch((err: Error) => {
        console.error('Insert weight record error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 기간별 체중 기록 조회
   */
  getByDateRange: (
    startDate: string,
    endDate: string,
    onSuccess: (records: WeightRecord[]) => void,
    onError?: (error: Error) => void
  ) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('weight_records')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to get weight records:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        const records: WeightRecord[] = (data || []).map((row: any) => ({
          id: row.id,
          date: row.date,
          weight: row.weight,
          createdAt: row.created_at,
        }));
        
        console.log(`Loaded ${records.length} weight records for date range ${startDate} ~ ${endDate}`);
        onSuccess(records);
      })
      .catch((err: Error) => {
        console.error('Get weight records error:', err);
        if (onError) onError(err);
      });
  },

  /**
   * 최근 체중 기록 조회
   */
  getLatest: (onSuccess: (record: WeightRecord | null) => void, onError?: (error: Error) => void) => {
    const db = getDatabase();
    const client = db.getClient();
    
    client
      .from('weight_records')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            console.log('No weight records found');
            onSuccess(null);
            return;
          }
          console.error('Failed to get latest weight record:', error);
          if (onError) onError(error as Error);
          return;
        }
        
        if (!data) {
          onSuccess(null);
          return;
        }
        
        const record: WeightRecord = {
          id: data.id,
          date: data.date,
          weight: data.weight,
          createdAt: data.created_at,
        };
        console.log('Latest weight record loaded:', record);
        onSuccess(record);
      })
      .catch((err: Error) => {
        console.error('Get latest weight record error:', err);
        onSuccess(null);
      });
  },
};

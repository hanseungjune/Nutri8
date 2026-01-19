import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { useMealStore } from '../../stores/mealStore';
import { useGoalStore } from '../../stores/goalStore';
import { getTodayDate, getWeekRange } from '../../utils/date';
import { calculateTotalCalories, calculateAchievementRate } from '../../utils/calories';
import { Config } from '../../constants/config';
import type { Meal } from '../../types';

export default function HomeScreen() {
  const router = useRouter();
  const { meals, loadAllMeals, initialize: initializeMeal, isInitialized: isMealInitialized } = useMealStore();
  const { currentGoal, loadGoal, initialize: initializeGoal, isInitialized: isGoalInitialized } = useGoalStore();
  const [todayCalories, setTodayCalories] = useState(0);
  const [weekDays, setWeekDays] = useState(0);
  const targetCalories = currentGoal?.targetCalories || Config.DEFAULT_TARGET_CALORIES;

  useEffect(() => {
    // DB 초기화
    if (!isMealInitialized) {
      initializeMeal();
    }
    if (!isGoalInitialized) {
      initializeGoal();
    }
  }, [isMealInitialized, initializeMeal, isGoalInitialized, initializeGoal]);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      if (isMealInitialized) {
        loadAllMeals();
      }
      if (isGoalInitialized) {
        loadGoal();
      }
    }, [loadAllMeals, isMealInitialized, loadGoal, isGoalInitialized])
  );

  // 오늘의 칼로리와 주간 통계 계산
  useEffect(() => {
    const today = getTodayDate();
    const weekRange = getWeekRange();

    // 오늘의 식단만 필터링
    const todayMeals = meals.filter((meal) => meal.date === today);
    const todayTotal = calculateTotalCalories(todayMeals);
    setTodayCalories(todayTotal);

    // 이번 주 기록한 날짜 수 계산
    const weekMeals = meals.filter(
      (meal) => meal.date >= weekRange.start && meal.date <= weekRange.end
    );
    const weekDates = new Set(weekMeals.map((meal) => meal.date));
    setWeekDays(weekDates.size);
  }, [meals]);

  const achievementRate = calculateAchievementRate(todayCalories, targetCalories);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>환영합니다! 🎉</Text>
        <Text style={styles.subtitle}>Nutri8 다이어트 관리 앱</Text>
        
        {/* 목표 설정 알림 */}
        {!currentGoal && (
          <TouchableOpacity 
            style={styles.goalAlert} 
            onPress={() => router.push('/(tabs)/settings')}
          >
            <Text style={styles.goalAlertIcon}>🎯</Text>
            <View style={styles.goalAlertTextContainer}>
              <Text style={styles.goalAlertTitle}>목표를 설정해보세요!</Text>
              <Text style={styles.goalAlertText}>
                설정 탭에서 일일 목표 칼로리를 설정할 수 있습니다.
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* 목표 정보 카드 */}
        {currentGoal && (
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>🎯 내 목표</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/settings')}>
                <Text style={styles.editButton}>수정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalInfo}>
              <View style={styles.goalItem}>
                <Text style={styles.goalLabel}>목표 칼로리</Text>
                <Text style={styles.goalValue}>{currentGoal.targetCalories} kcal</Text>
              </View>
              {currentGoal.targetWeight && (
                <View style={styles.goalItem}>
                  <Text style={styles.goalLabel}>목표 체중</Text>
                  <Text style={styles.goalValue}>{currentGoal.targetWeight} kg</Text>
                </View>
              )}
            </View>
          </View>
        )}
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>오늘의 칼로리</Text>
          <Text style={styles.cardValue}>{todayCalories} kcal</Text>
          <Text style={styles.cardSubtext}>목표: {targetCalories} kcal</Text>
          
          {/* 진행률 바 */}
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${Math.min(achievementRate, 100)}%` },
                achievementRate > 100 && styles.progressBarOver
              ]} 
            />
          </View>
          <Text style={[
            styles.progressText,
            achievementRate > 100 && styles.progressTextOver
          ]}>
            {achievementRate}% 달성 {achievementRate <= 100 ? `(${targetCalories - todayCalories} kcal 남음)` : `(${todayCalories - targetCalories} kcal 초과)`}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>이번 주 진행 상황</Text>
          <Text style={styles.cardValue}>{weekDays}일 기록됨</Text>
          <Text style={styles.cardSubtext}>
            {weekDays >= 5 ? '훌륭해요! 🎉' : '꾸준히 기록해보세요! 💪'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 팁: 하단의 '입력' 탭에서 오늘의 식단을 기록해보세요!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#999',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressBarOver: {
    backgroundColor: '#FF9800',
  },
  progressText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '600',
  },
  progressTextOver: {
    color: '#FF9800',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  goalAlert: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalAlertIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  goalAlertTextContainer: {
    flex: 1,
  },
  goalAlertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  goalAlertText: {
    fontSize: 13,
    color: '#F57C00',
    lineHeight: 18,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  goalInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  goalItem: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  goalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

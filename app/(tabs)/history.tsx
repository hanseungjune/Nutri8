import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useMealStore } from '../../stores/mealStore';
import { calculateTotalCalories } from '../../utils/calories';
import { Config } from '../../constants/config';
import type { Meal } from '../../types';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { FadeIn } from '../../components/animated/FadeIn';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const { meals, isLoading, loadAllMeals, updateMeal, deleteMeal, setEditingMeal, initialize, isInitialized } = useMealStore();
  const [stats, setStats] = useState({ totalDays: 0, avgCalories: 0 });

  useEffect(() => {
    // DB 초기화
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      if (isInitialized) {
        loadAllMeals();
      }
    }, [loadAllMeals, isInitialized])
  );

  // 통계 계산
  useEffect(() => {
    if (meals.length === 0) {
      setStats({ totalDays: 0, avgCalories: 0 });
      return;
    }

    // 날짜별로 그룹화
    const dateSet = new Set(meals.map((meal) => meal.date));
    const totalDays = dateSet.size;

    // 평균 칼로리
    const totalCalories = calculateTotalCalories(meals);
    const avgCalories = Math.round(totalCalories / totalDays);

    setStats({ totalDays, avgCalories });
  }, [meals]);

  const handleDeleteMeal = (id: number | undefined, foodName: string) => {
    if (!id) return;

    // 웹 환경에서도 작동하는 confirm 사용
    const confirmed = confirm(`"${foodName}"을(를) 삭제하시겠습니까?`);
    
    if (confirmed) {
      deleteMeal(
        id,
        () => {
          alert('식단이 삭제되었습니다.');
          loadAllMeals(); // 목록 새로고침
        },
        (error) => {
          alert('식단 삭제에 실패했습니다.');
          console.error('Failed to delete meal:', error);
        }
      );
    }
  };

  const handleEditMeal = (meal: Meal) => {
    if (!meal.id) return;

    // 수정할 식사를 store에 설정
    setEditingMeal(meal);
    
    // 입력 탭으로 이동
    navigation.navigate('input' as never);
  };

  // 날짜별로 그룹화 및 FlatList용 데이터 변환
  const flatListData = Object.keys(meals.reduce((acc, meal) => {
    const date = meal.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>)).map(date => ({
    date,
    meals: meals.filter(m => m.date === date),
  }));

  const renderMealItem = useCallback(({ item }: { item: Meal }) => (
    <FadeIn duration={Theme.animation.fast}>
      <Card style={styles.mealCard} padding="base">
        <View style={styles.mealHeader}>
          <View style={styles.mealTypeContainer}>
            <Text style={styles.mealTypeText}>
              {Config.MEAL_TYPE_LABELS[item.mealType]}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => handleEditMeal(item)}
              style={styles.editButtonContainer}
            >
              <Text style={styles.editButton}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteMeal(item.id, item.foodName)}
            >
              <Text style={styles.deleteButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 사진이 있으면 표시 */}
        {item.photoUrl && (
          <View style={styles.photoContainer}>
            <Image 
              source={{ uri: item.photoUrl }} 
              style={styles.mealPhoto}
              resizeMode="cover"
            />
            <View style={styles.photoLabel}>
              <MaterialCommunityIcons name="camera" size={16} color="#fff" />
            </View>
          </View>
        )}

        <Text style={styles.mealFoodName}>{item.foodName}</Text>
        <Text style={styles.mealCalories}>{item.calories} kcal</Text>
        
        {(item.protein || item.carbs || item.fat) && (
          <View style={styles.nutrientsRow}>
            {item.protein && (
              <Text style={styles.nutrientText}>단백질 {item.protein}g</Text>
            )}
            {item.carbs && (
              <Text style={styles.nutrientText}>탄수화물 {item.carbs}g</Text>
            )}
            {item.fat && (
              <Text style={styles.nutrientText}>지방 {item.fat}g</Text>
            )}
          </View>
        )}
      </Card>
    </FadeIn>
  ), []);

  const renderDateSection = useCallback(({ item }: { item: { date: string; meals: Meal[] } }) => (
    <View style={styles.dateGroup}>
      <Text style={styles.dateTitle}>{item.date}</Text>
      <View style={styles.dateStats}>
        <Text style={styles.dateStatsText}>
          총 {calculateTotalCalories(item.meals)} kcal
        </Text>
      </View>
      <FlatList
        data={item.meals}
        renderItem={renderMealItem}
        keyExtractor={(meal) => meal.id?.toString() || Math.random().toString()}
        scrollEnabled={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </View>
  ), [renderMealItem]);

  const renderListHeader = () => (
    <Text style={styles.title}>식단 기록</Text>
  );

  const renderListFooter = () => (
    <View style={styles.statsContainer}>
      <Card style={styles.statCard} padding="base">
        <Text style={styles.statLabel}>총 기록일</Text>
        <Text style={styles.statValue}>{stats.totalDays}일</Text>
      </Card>
      <Card style={styles.statCard} padding="base">
        <Text style={styles.statLabel}>평균 칼로리</Text>
        <Text style={styles.statValue}>{stats.avgCalories} kcal</Text>
      </Card>
    </View>
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen text="식단 기록을 불러오는 중..." />;
  }

  if (meals.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>식단 기록</Text>
          <EmptyState
            icon="food-outline"
            title="아직 기록이 없습니다"
            description="식단을 입력하면 여기에 표시됩니다"
          />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={flatListData}
      renderItem={renderDateSection}
      keyExtractor={(item) => item.date}
      ListHeaderComponent={renderListHeader}
      ListFooterComponent={renderListFooter}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={3}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xl,
  },
  dateGroup: {
    marginBottom: Theme.spacing.xl,
  },
  dateTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  dateStats: {
    marginBottom: Theme.spacing.md,
  },
  dateStatsText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  mealCard: {
    marginBottom: Theme.spacing.sm,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  photoContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Theme.colors.background.dark,
  },
  mealPhoto: {
    width: '100%',
    height: '100%',
  },
  photoLabel: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  mealTypeContainer: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  mealTypeText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.inverse,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  editButtonContainer: {
    marginRight: Theme.spacing.xs,
  },
  editButton: {
    color: Theme.colors.secondary,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  deleteButton: {
    color: Theme.colors.error,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  nutrientsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.light,
  },
  nutrientText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.secondary,
    backgroundColor: Theme.colors.background.dark,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  mealFoodName: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  mealCalories: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.sm,
  },
  statValue: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
});

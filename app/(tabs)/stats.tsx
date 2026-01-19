import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useMealStore } from '../../stores/mealStore';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { getWeekRange, getTodayDate, formatDate } from '../../utils/date';
import { calculateNutrients } from '../../utils/calories';
import { Colors } from '../../constants/colors';
import type { Meal } from '../../types';

const screenWidth = Dimensions.get('window').width;

export default function StatsScreen() {
  const { meals, loadAllMeals, initialize, isInitialized } = useMealStore();
  const [weekData, setWeekData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [nutrientsData, setNutrientsData] = useState<any[]>([]);
  const [weekStats, setWeekStats] = useState({ total: 0, avg: 0, days: 0 });

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (isInitialized) {
      loadAllMeals();
    }
  }, [isInitialized, loadAllMeals]);

  // 주간 데이터 계산
  useEffect(() => {
    if (meals.length === 0) return;

    const weekRange = getWeekRange();
    const today = new Date();
    
    // 최근 7일 데이터
    const last7Days: { date: string; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      
      const dayMeals = meals.filter(m => m.date === dateStr);
      const dayCalories = dayMeals.reduce((sum, m) => sum + m.calories, 0);
      
      last7Days.push({ date: dateStr, calories: dayCalories });
    }

    // 차트 데이터
    const labels = last7Days.map(d => {
      const date = new Date(d.date);
      return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    });
    const data = last7Days.map(d => d.calories);

    setWeekData({ labels, data });

    // 주간 통계
    const weekMeals = meals.filter(m => m.date >= weekRange.start && m.date <= weekRange.end);
    const weekDates = new Set(weekMeals.map(m => m.date));
    const totalCalories = weekMeals.reduce((sum, m) => sum + m.calories, 0);
    
    setWeekStats({
      total: totalCalories,
      avg: weekDates.size > 0 ? Math.round(totalCalories / weekDates.size) : 0,
      days: weekDates.size,
    });

    // 영양소 데이터 (이번 주)
    const nutrients = calculateNutrients(weekMeals);
    const pieData = [
      {
        name: '단백질',
        population: nutrients.protein || 0,
        color: '#FF6384',
        legendFontColor: '#333',
        legendFontSize: 14,
      },
      {
        name: '탄수화물',
        population: nutrients.carbs || 0,
        color: '#36A2EB',
        legendFontColor: '#333',
        legendFontSize: 14,
      },
      {
        name: '지방',
        population: nutrients.fat || 0,
        color: '#FFCE56',
        legendFontColor: '#333',
        legendFontSize: 14,
      },
    ];

    setNutrientsData(pieData);
  }, [meals]);

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>통계 및 분석</Text>

        {/* 주간 요약 */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>이번 주 요약</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>기록일</Text>
              <Text style={styles.summaryValue}>{weekStats.days}일</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>총 칼로리</Text>
              <Text style={styles.summaryValue}>{weekStats.total.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>평균</Text>
              <Text style={styles.summaryValue}>{weekStats.avg.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* 주간 칼로리 추이 */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>주간 칼로리 추이</Text>
          {weekData.data.length > 0 ? (
            <LineChart
              data={{
                labels: weekData.labels,
                datasets: [{
                  data: weekData.data.length > 0 ? weekData.data : [0],
                }],
              }}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              withDots={true}
              withShadow={false}
              withInnerLines={true}
              withOuterLines={true}
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>데이터가 없습니다</Text>
            </View>
          )}
        </View>

        {/* 영양소 비율 */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>이번 주 영양소 비율</Text>
          {nutrientsData.length > 0 && nutrientsData.some(d => d.population > 0) ? (
            <PieChart
              data={nutrientsData}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>영양소 데이터가 없습니다</Text>
              <Text style={styles.emptySubtext}>식단 입력 시 영양소 정보를 추가해보세요</Text>
            </View>
          )}
        </View>

        {/* 추가 통계 */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statLabel}>총 기록</Text>
            <Text style={styles.statValue}>{meals.length}개</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statLabel}>최고 칼로리</Text>
            <Text style={styles.statValue}>
              {meals.length > 0 ? Math.max(...meals.map(m => m.calories)) : 0} kcal
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🥗</Text>
            <Text style={styles.statLabel}>최저 칼로리</Text>
            <Text style={styles.statValue}>
              {meals.length > 0 ? Math.min(...meals.map(m => m.calories)) : 0} kcal
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statLabel}>연속 기록</Text>
            <Text style={styles.statValue}>{weekStats.days}일</Text>
          </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryCard: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  chartCard: {
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyChart: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#ccc',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { WeightRecordQueries } from '../../utils/db/queries';
import { useGoalStore } from '../../stores/goalStore';
import { getTodayDate, formatDate } from '../../utils/date';
import { Colors } from '../../constants/colors';
import type { WeightRecord } from '../../types';
import { getDatabase } from '../../utils/db/database';

const screenWidth = Dimensions.get('window').width;

export default function WeightScreen() {
  const { currentGoal, loadGoal, initialize, isInitialized } = useGoalStore();
  const [weight, setWeight] = useState('');
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!isInitialized) {
        await initialize();
      }
      loadGoal();
      loadWeightRecords();
    };
    init();
  }, []);

  const loadWeightRecords = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const startDate = formatDate(thirtyDaysAgo);
    const endDate = getTodayDate();

    WeightRecordQueries.getByDateRange(
      startDate,
      endDate,
      (records) => {
        setWeightRecords(records);
        console.log(`Loaded ${records.length} weight records`);
      },
      (error) => {
        console.error('Failed to load weight records:', error);
      }
    );
  };

  const handleSaveWeight = async () => {
    if (!weight) {
      Alert.alert('오류', '체중을 입력해주세요.');
      return;
    }

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0 || weightValue > 300) {
      Alert.alert('오류', '올바른 체중을 입력해주세요. (1-300 kg)');
      return;
    }

    setIsLoading(true);

    const newRecord: WeightRecord = {
      date: getTodayDate(),
      weight: weightValue,
    };

    WeightRecordQueries.insert(
      newRecord,
      (id) => {
        Alert.alert('성공', '체중이 기록되었습니다!');
        setWeight('');
        loadWeightRecords();
        setIsLoading(false);
      },
      (error) => {
        Alert.alert('오류', '체중 기록에 실패했습니다.');
        console.error(error);
        setIsLoading(false);
      }
    );
  };

  const prepareChartData = () => {
    if (weightRecords.length === 0) {
      return { labels: ['데이터 없음'], data: [0] };
    }

    // 최근 10개만 표시
    const recentRecords = weightRecords.slice(-10);
    
    const labels = recentRecords.map(record => {
      const date = new Date(record.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const data = recentRecords.map(record => record.weight);

    return { labels, data };
  };

  const chartData = prepareChartData();
  const latestWeight = weightRecords.length > 0 ? weightRecords[weightRecords.length - 1].weight : null;
  const weightChange = weightRecords.length >= 2 
    ? weightRecords[weightRecords.length - 1].weight - weightRecords[0].weight 
    : 0;

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* 체중 입력 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚖️ 오늘의 체중 기록</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              placeholder="체중 입력 (kg)"
              keyboardType="decimal-pad"
            />
            <TouchableOpacity 
              style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
              onPress={handleSaveWeight}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? '저장 중...' : '저장'}
              </Text>
            </TouchableOpacity>
          </View>

          {latestWeight && (
            <View style={styles.latestWeight}>
              <Text style={styles.latestWeightLabel}>최근 체중</Text>
              <Text style={styles.latestWeightValue}>{latestWeight} kg</Text>
            </View>
          )}
        </View>

        {/* 목표 대비 현황 */}
        {currentGoal?.targetWeight && latestWeight && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 목표 달성 현황</Text>
            <View style={styles.goalProgress}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>목표 체중</Text>
                <Text style={styles.progressValue}>{currentGoal.targetWeight} kg</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>현재 체중</Text>
                <Text style={styles.progressValue}>{latestWeight} kg</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>남은 체중</Text>
                <Text style={[
                  styles.progressValue,
                  (latestWeight - currentGoal.targetWeight) <= 0 ? styles.goalAchieved : styles.goalPending
                ]}>
                  {(latestWeight - currentGoal.targetWeight) > 0 
                    ? `${(latestWeight - currentGoal.targetWeight).toFixed(1)} kg`
                    : '달성! 🎉'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 체중 변화 그래프 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 체중 변화 추이</Text>
          
          {weightRecords.length > 0 ? (
            <>
              <LineChart
                data={{
                  labels: chartData.labels,
                  datasets: [{
                    data: chartData.data,
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
                yAxisSuffix=" kg"
              />

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>기간 변화</Text>
                  <Text style={[
                    styles.statValue,
                    weightChange < 0 ? styles.statNegative : styles.statPositive
                  ]}>
                    {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>총 기록</Text>
                  <Text style={styles.statValue}>{weightRecords.length}회</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>아직 체중 기록이 없습니다</Text>
              <Text style={styles.emptySubtext}>위에서 체중을 기록해보세요!</Text>
            </View>
          )}
        </View>

        {/* 최근 기록 목록 */}
        {weightRecords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 최근 기록</Text>
            {weightRecords.slice(-5).reverse().map((record) => (
              <View key={record.id} style={styles.recordItem}>
                <Text style={styles.recordDate}>{record.date}</Text>
                <Text style={styles.recordWeight}>{record.weight} kg</Text>
              </View>
            ))}
          </View>
        )}
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
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  weightInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  latestWeight: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  latestWeightLabel: {
    fontSize: 14,
    color: '#1976D2',
  },
  latestWeightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  goalProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  goalAchieved: {
    color: '#4CAF50',
  },
  goalPending: {
    color: '#FF9800',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyChart: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statNegative: {
    color: '#4CAF50',
  },
  statPositive: {
    color: '#FF5722',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
  },
  recordWeight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

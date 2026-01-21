import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useGoalStore } from '../../stores/goalStore';
import { useMealStore } from '../../stores/mealStore';
import { useAuthStore } from '../../stores/authStore';
import { Colors } from '../../constants/colors';
import { getTodayDate } from '../../utils/date';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type GenderType = 'male' | 'female' | 'other';

export default function SettingsScreen() {
  const router = useRouter();
  const { currentGoal, loadGoal, setGoal, initialize, isInitialized, reset: resetGoal } = useGoalStore();
  const { reset: resetMeal } = useMealStore();
  const { user, signOut } = useAuthStore();
  
  // 프로필 정보
  const [currentWeight, setCurrentWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<GenderType>('male');
  
  // 목표 정보
  const [targetWeight, setTargetWeight] = useState('');
  const [targetCalories, setTargetCalories] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (isInitialized) {
      loadGoal();
    }
  }, [isInitialized, loadGoal]);

  useEffect(() => {
    if (currentGoal) {
      setTargetWeight(currentGoal.targetWeight?.toString() || '');
      setTargetCalories(currentGoal.targetCalories.toString());
      setTargetDate(currentGoal.endDate || '');
    }
  }, [currentGoal]);

  const handleSave = () => {
    // 유효성 검사
    if (!targetCalories) {
      Alert.alert('오류', '목표 칼로리를 입력해주세요.');
      return;
    }

    const targetCal = parseInt(targetCalories);
    if (isNaN(targetCal) || targetCal <= 0) {
      Alert.alert('오류', '올바른 칼로리를 입력해주세요.');
      return;
    }

    const newGoal = {
      targetCalories: targetCal,
      targetWeight: targetWeight ? parseFloat(targetWeight) : undefined,
      startDate: getTodayDate(),
      endDate: targetDate || undefined,
    };

    setGoal(newGoal, 
      () => {
        Alert.alert('성공', '목표가 저장되었습니다!');
      },
      (error) => {
        Alert.alert('오류', '목표 저장에 실패했습니다.');
        console.error(error);
      }
    );
  };

  const calculateBMR = () => {
    const w = parseFloat(currentWeight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      Alert.alert('정보 필요', '체중, 키, 나이를 모두 입력해주세요.');
      return;
    }

    // Harris-Benedict 공식
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    // 활동량 고려 (보통 활동: 1.55)
    const tdee = Math.round(bmr * 1.55);
    
    setTargetCalories(tdee.toString());
    Alert.alert(
      '권장 칼로리 계산 완료',
      `기초대사량(BMR): ${Math.round(bmr)} kcal\n권장 섭취량(TDEE): ${tdee} kcal\n\n체중 감량 목표: ${Math.round(tdee * 0.8)} kcal`,
      [
        { text: '감량 목표로 설정', onPress: () => setTargetCalories(Math.round(tdee * 0.8).toString()) },
        { text: '유지 목표로 설정', onPress: () => setTargetCalories(tdee.toString()) },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  const handleLogout = () => {
    const confirmMessage = '정말 로그아웃하시겠습니까?';
    
    // 웹에서는 confirm 사용
    if (Platform.OS === 'web') {
      if (!confirm(confirmMessage)) {
        return;
      }
      
      (async () => {
        try {
          // 1. Supabase 로그아웃
          await signOut();
          
          // 2. 모든 스토어 초기화
          resetMeal();
          resetGoal();
          
          console.log('✅ 로그아웃 완료, 로그인 화면으로 이동');
          
          // 3. 웹에서는 window.location으로 강제 리다이렉트
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        } catch (error) {
          console.error('❌ 로그아웃 처리 실패:', error);
          alert('로그아웃 중 문제가 발생했습니다.');
        }
      })();
    } else {
      // 네이티브에서는 Alert 사용
      Alert.alert(
        '로그아웃',
        confirmMessage,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '로그아웃',
            style: 'destructive',
            onPress: async () => {
              try {
                // 1. Supabase 로그아웃
                await signOut();
                
                // 2. 모든 스토어 초기화
                resetMeal();
                resetGoal();
                
                console.log('✅ 로그아웃 완료, 로그인 화면으로 이동');
                
                // 3. 로그인 화면으로 이동
                router.replace('/auth/login');
              } catch (error) {
                console.error('❌ 로그아웃 처리 실패:', error);
                Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
              }
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* 사용자 정보 카드 */}
        <View style={styles.userCard}>
          <View style={styles.userIconContainer}>
            <MaterialCommunityIcons name="account-circle" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userInfo}>Nutri8 회원</Text>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        {/* 프로필 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 프로필 정보</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>현재 체중 (kg)</Text>
            <TextInput
              style={styles.input}
              value={currentWeight}
              onChangeText={setCurrentWeight}
              placeholder="예: 70"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>키 (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="예: 170"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>나이</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="예: 25"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>성별</Text>
            <View style={styles.genderButtons}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
                onPress={() => setGender('male')}
              >
                <Text style={[styles.genderButtonText, gender === 'male' && styles.genderButtonTextActive]}>
                  남성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
                onPress={() => setGender('female')}
              >
                <Text style={[styles.genderButtonText, gender === 'female' && styles.genderButtonTextActive]}>
                  여성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'other' && styles.genderButtonActive]}
                onPress={() => setGender('other')}
              >
                <Text style={[styles.genderButtonText, gender === 'other' && styles.genderButtonTextActive]}>
                  기타
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculateBMR}>
            <Text style={styles.calculateButtonText}>🧮 권장 칼로리 계산</Text>
          </TouchableOpacity>
        </View>

        {/* 목표 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 목표 설정</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>목표 체중 (kg) *선택사항</Text>
            <TextInput
              style={styles.input}
              value={targetWeight}
              onChangeText={setTargetWeight}
              placeholder="예: 65"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>목표 칼로리 (kcal) *필수</Text>
            <TextInput
              style={styles.input}
              value={targetCalories}
              onChangeText={setTargetCalories}
              placeholder="예: 2000"
              keyboardType="number-pad"
            />
            <Text style={styles.hint}>하루 목표 섭취 칼로리를 입력하세요</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>목표 달성 날짜 *선택사항</Text>
            <TextInput
              style={styles.input}
              value={targetDate}
              onChangeText={setTargetDate}
              placeholder="YYYY-MM-DD (예: 2026-03-01)"
            />
          </View>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 저장하기</Text>
        </TouchableOpacity>

        {/* 현재 목표 표시 */}
        {currentGoal && (
          <View style={styles.currentGoal}>
            <Text style={styles.currentGoalTitle}>📌 현재 목표</Text>
            <Text style={styles.currentGoalText}>
              목표 칼로리: {currentGoal.targetCalories} kcal
            </Text>
            {currentGoal.targetWeight && (
              <Text style={styles.currentGoalText}>
                목표 체중: {currentGoal.targetWeight} kg
              </Text>
            )}
            {currentGoal.endDate && (
              <Text style={styles.currentGoalText}>
                목표 날짜: {currentGoal.endDate}
              </Text>
            )}
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
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userIconContainer: {
    marginBottom: 12,
  },
  userEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: '#fff',
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentGoal: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  currentGoalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  currentGoalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

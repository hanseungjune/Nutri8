import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMealStore } from '../../stores/mealStore';
import { getTodayDate } from '../../utils/date';
import { requestImagePermissions, pickImageFromGallery, takePhoto, uploadMealPhoto } from '../../utils/imageUtils';
import { getNutritionInfo, isGeminiAvailable, translateFoodNameToEnglish } from '../../utils/geminiNutrition';
import { getFoodImageUrl, getFoodImage } from '../../utils/foodImageUtils';
import { generateFoodImage } from '../../utils/geminiImageGen';
import { generateFoodImageWithDALLE, isDALLEAvailable } from '../../utils/dalleImageGen';
import type { MealType } from '../../types';
import { Theme } from '../../constants/theme';

export default function InputScreen() {
  const navigation = useNavigation();
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [carbs, setCarbs] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [showNutrients, setShowNutrients] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null); // 로컬 사진 URI
  const [photoFile, setPhotoFile] = useState<File | null>(null); // 웹용 파일 객체
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const [isAILoading, setIsAILoading] = useState<boolean>(false); // AI 분석 중
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 웹용 파일 input ref

  const { addMeal, updateMeal, editingMeal, setEditingMeal, initialize, isInitialized } = useMealStore();

  useEffect(() => {
    // DB 초기화
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // editingMeal이 있으면 폼에 데이터 채우기
  useEffect(() => {
    if (editingMeal) {
      setMealType(editingMeal.mealType);
      setFoodName(editingMeal.foodName);
      setCalories(editingMeal.calories.toString());
      setProtein(editingMeal.protein?.toString() || '');
      setCarbs(editingMeal.carbs?.toString() || '');
      setFat(editingMeal.fat?.toString() || '');
      setPhotoUri(editingMeal.photoUrl || null);
      setSelectedDate(new Date(editingMeal.date));
      
      // 영양소가 있으면 영양소 섹션 열기
      if (editingMeal.protein || editingMeal.carbs || editingMeal.fat) {
        setShowNutrients(true);
      }
    }
  }, [editingMeal]);

  // 웹용 파일 선택 핸들러
  const handleWebFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith('image/')) {
        Alert.alert('오류', '이미지 파일만 선택할 수 있습니다.');
        return;
      }

      // 파일 객체 저장 (업로드용)
      setPhotoFile(file);

      // 파일을 Data URL로 변환하여 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    
    // input 초기화 (같은 파일을 다시 선택할 수 있도록)
    event.target.value = '';
  };

  // 사진 선택 핸들러 (네이티브)
  const handlePickImage = async () => {
    const hasPermission = await requestImagePermissions();
    if (!hasPermission) {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const uri = await pickImageFromGallery();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  // 사진 촬영 핸들러 (네이티브)
  const handleTakePhoto = async () => {
    const hasPermission = await requestImagePermissions();
    if (!hasPermission) {
      Alert.alert('권한 필요', '사진을 촬영하려면 카메라 권한이 필요합니다.');
      return;
    }

    const uri = await takePhoto();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  // 사진 선택 옵션 표시
  const showPhotoOptions = () => {
    // 웹 환경에서는 파일 input 클릭
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
      return;
    }

    // 네이티브 환경에서는 Alert로 선택
    Alert.alert(
      '사진 추가',
      '사진을 어떻게 추가하시겠습니까?',
      [
        { text: '갤러리에서 선택', onPress: handlePickImage },
        { text: '사진 촬영', onPress: handleTakePhoto },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  // 사진 제거
  const handleRemovePhoto = () => {
    setPhotoUri(null);
    setPhotoFile(null);
  };

  // AI로 영양 정보 + 이미지 자동 입력
  const handleAIApply = async () => {
    if (!foodName.trim()) {
      alert('음식 이름을 먼저 입력해주세요!');
      return;
    }

    if (!isGeminiAvailable()) {
      alert('Gemini API가 설정되지 않았습니다.\n\n.env 파일에 EXPO_PUBLIC_GEMINI_API_KEY를 추가하세요.\n\n자세한 내용은 GEMINI_API_SETUP.md 파일을 참고하세요.');
      return;
    }

    setIsAILoading(true);

    try {
      console.log('🤖 AI 분석 시작: 영양 정보 + 이미지');

      // 1. 영양 정보 가져오기
      const nutritionInfo = await getNutritionInfo(foodName.trim());

      if (!nutritionInfo) {
        Alert.alert(
          '영양 정보 없음',
          '죄송합니다. 해당 음식의 영양 정보를 찾을 수 없습니다.\n\n직접 입력하시거나 비슷한 음식명으로 다시 시도해주세요.',
          [{ text: '확인' }]
        );
        return;
      }

      // 자동으로 폼에 값 입력
      setCalories(nutritionInfo.calories.toString());
      setProtein(nutritionInfo.protein.toString());
      setCarbs(nutritionInfo.carbs.toString());
      setFat(nutritionInfo.fat.toString());
      
      // 영양소 섹션 자동으로 열기
      setShowNutrients(true);

      // 2. 이미지 가져오기 (비동기, 실패해도 영양 정보는 유지)
      try {
        console.log('🎨 음식 이미지 가져오기 시작...');
        let imageUrl: string | null = null;
        let englishFoodName: string | null = null;

        // 2-0. 한글 음식명을 영어로 번역 (Gemini API)
        console.log('🌐 음식명 영어 번역 시도...');
        englishFoodName = await translateFoodNameToEnglish(foodName.trim());
        
        if (englishFoodName) {
          console.log(`✅ 번역 완료: "${foodName}" → "${englishFoodName}"`);
        } else {
          console.log(`⚠️ 번역 실패, 원본 사용: "${foodName}"`);
        }

        // 환경 변수로 AI 이미지 생성 활성화 여부 확인
        const enableAIImageGen = process.env.EXPO_PUBLIC_ENABLE_AI_IMAGE_GEN === 'true';

        if (enableAIImageGen) {
          // 2-1. DALL-E 3 이미지 생성 시도 (최우선, 유료)
          if (isDALLEAvailable()) {
            console.log('🎨 DALL-E 3 이미지 생성 시도 중... (5-10초 소요)');
            // 번역된 영어 이름 사용 (프롬프트 품질 향상)
            const nameForDALLE = englishFoodName || foodName.trim();
            imageUrl = await generateFoodImageWithDALLE(nameForDALLE);
            
            if (imageUrl) {
              console.log('✅ DALL-E 3 생성 완료!');
            }
          }

          // 2-2. Gemini AI 이미지 생성 시도 (폴백, 베타)
          if (!imageUrl) {
            console.log('🤖 Gemini AI 이미지 생성 시도 중...');
            imageUrl = await generateFoodImage(foodName.trim());
            
            if (imageUrl) {
              console.log('✅ Gemini AI 생성 완료!');
            }
          }
        }

        // 2-3. Unsplash API 시도 (실제 사진, 영어 번역 사용)
        if (!imageUrl) {
          console.log('📸 Unsplash 검색 시도 중...');
          imageUrl = await getFoodImageUrl(foodName.trim(), englishFoodName || undefined);
        }
        
        // 2-4. 사전 정의된 이미지 사용 (40개 이상 한국 음식)
        if (!imageUrl) {
          console.log('📦 사전 정의된 이미지 사용');
          imageUrl = getFoodImage(foodName.trim());
        }

        if (imageUrl) {
          console.log('✅ 최종 이미지 URL:', imageUrl.substring(0, 60) + '...');
          setPhotoUri(imageUrl);
        }
      } catch (imageError) {
        console.error('이미지 가져오기 실패 (무시):', imageError);
        // 이미지 실패는 무시하고 영양 정보는 유지
      }

      alert(`✅ AI 분석 완료!\n\n칼로리: ${nutritionInfo.calories} kcal\n단백질: ${nutritionInfo.protein}g\n탄수화물: ${nutritionInfo.carbs}g\n지방: ${nutritionInfo.fat}g\n\n${photoUri ? '이미지도 자동으로 추가되었습니다! 📸' : '필요시 사진을 추가해주세요.'}\n\n필요시 수정 후 등록하세요!`);

    } catch (error: any) {
      console.error('AI 적용 실패:', error);
      
      // Quota 초과 에러 체크
      const isQuotaError = error?.message?.includes('quota') || 
                          error?.message?.includes('429') ||
                          error?.message?.includes('Too Many Requests');
      
      if (isQuotaError) {
        Alert.alert(
          '일일 할당량 초과',
          'Gemini API 무료 할당량(하루 20번)을 초과했습니다.\n\n✅ 걱정하지 마세요!\n오프라인 데이터베이스에 100개 이상의 음식 정보가 저장되어 있습니다.\n\n다시 시도하거나, 직접 영양 정보를 입력해주세요.',
          [{ text: '확인' }]
        );
      } else {
        Alert.alert(
          'AI 분석 오류',
          'AI 분석 중 오류가 발생했습니다.\n\n✅ 오프라인 데이터베이스를 확인하거나\n✅ 직접 영양 정보를 입력해주세요.',
          [{ text: '확인' }]
        );
      }
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!foodName.trim() || !calories.trim()) {
      Alert.alert('입력 오류', '음식명과 칼로리를 모두 입력해주세요.');
      return;
    }

    const caloriesNum = parseInt(calories, 10);
    if (isNaN(caloriesNum) || caloriesNum < 0) {
      Alert.alert('입력 오류', '올바른 칼로리 값을 입력해주세요.');
      return;
    }

    // 영양소 값 파싱 (선택사항)
    const proteinNum = protein.trim() ? parseFloat(protein) : undefined;
    const carbsNum = carbs.trim() ? parseFloat(carbs) : undefined;
    const fatNum = fat.trim() ? parseFloat(fat) : undefined;

    setIsSubmitting(true);

    // 선택한 날짜를 YYYY-MM-DD 형식으로 변환
    const dateStr = selectedDate.toISOString().split('T')[0];

    // 사진 업로드 (새로운 사진이 있는 경우만)
    let photoUrl: string | undefined = editingMeal?.photoUrl; // 기존 사진 URL 유지
    
    if (photoUri && photoUri !== editingMeal?.photoUrl) {
      // 새로운 사진이 선택된 경우에만 업로드
      setIsUploadingPhoto(true);
      
      // 웹에서는 File 객체, 네이티브에서는 URI 사용
      const uploadSource = Platform.OS === 'web' && photoFile ? photoFile : photoUri;
      photoUrl = await uploadMealPhoto(uploadSource) || undefined;
      
      setIsUploadingPhoto(false);
      
      if (!photoUrl && !editingMeal) {
        Alert.alert('경고', '사진 업로드에 실패했습니다. 사진 없이 저장하시겠습니까?', [
          { text: '취소', style: 'cancel', onPress: () => setIsSubmitting(false) },
          { text: '사진 없이 저장', onPress: () => saveMeal(dateStr, caloriesNum, proteinNum, carbsNum, fatNum, undefined) },
        ]);
        return;
      }
    }

    saveMeal(dateStr, caloriesNum, proteinNum, carbsNum, fatNum, photoUrl);
  };

  const saveMeal = (
    dateStr: string,
    caloriesNum: number,
    proteinNum: number | undefined,
    carbsNum: number | undefined,
    fatNum: number | undefined,
    photoUrl: string | undefined
  ) => {
    const mealData = {
      date: dateStr,
      mealType,
      foodName: foodName.trim(),
      calories: caloriesNum,
      protein: proteinNum,
      carbs: carbsNum,
      fat: fatNum,
      photoUrl, // 사진 URL 추가
    };

    const resetForm = () => {
      setIsSubmitting(false);
      setFoodName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      setPhotoUri(null);
      setPhotoFile(null);
      setShowNutrients(false);
      setSelectedDate(new Date());
      setEditingMeal(null); // 수정 모드 해제
    };

    if (editingMeal && editingMeal.id) {
      // 수정 모드
      updateMeal(
        editingMeal.id,
        mealData,
        () => {
          resetForm();
          alert('식단이 수정되었습니다!');
          // History 탭으로 이동
          setTimeout(() => {
            navigation.navigate('history' as never);
          }, 100);
        },
        (error) => {
          setIsSubmitting(false);
          alert('식단 수정에 실패했습니다.');
          console.error('Failed to update meal:', error);
        }
      );
    } else {
      // 추가 모드
      addMeal(
        mealData,
        () => {
          resetForm();
          alert('식단이 등록되었습니다!');
          // 홈 화면으로 이동
          setTimeout(() => {
            navigation.navigate('index' as never);
          }, 100);
        },
        (error) => {
          setIsSubmitting(false);
          alert('식단 등록에 실패했습니다.');
          console.error('Failed to save meal:', error);
        }
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 웹용 숨겨진 파일 input */}
      {Platform.OS === 'web' && (
        <input
          ref={fileInputRef as any}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleWebFileChange}
        />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{editingMeal ? '식단 수정' : '식단 입력'}</Text>
        {editingMeal && (
          <View style={styles.editBanner}>
            <MaterialCommunityIcons name="pencil" size={16} color={Theme.colors.primary} />
            <Text style={styles.editBannerText}>수정 모드: {editingMeal.foodName}</Text>
            <TouchableOpacity onPress={() => {
              setEditingMeal(null);
              setFoodName('');
              setCalories('');
              setProtein('');
              setCarbs('');
              setFat('');
              setPhotoUri(null);
              setPhotoFile(null);
              setShowNutrients(false);
              setSelectedDate(new Date());
            }}>
              <MaterialCommunityIcons name="close" size={20} color={Theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.label}>식사 시간</Text>
          <View style={styles.mealTypeContainer}>
            {[
              { key: 'breakfast' as MealType, label: '아침' },
              { key: 'lunch' as MealType, label: '점심' },
              { key: 'dinner' as MealType, label: '저녁' },
              { key: 'snack' as MealType, label: '간식' },
            ].map((meal) => (
              <TouchableOpacity
                key={meal.key}
                style={[
                  styles.mealTypeButton,
                  mealType === meal.key && styles.mealTypeButtonActive,
                ]}
                onPress={() => setMealType(meal.key)}
              >
                <Text
                  style={[
                    styles.mealTypeText,
                    mealType === meal.key && styles.mealTypeTextActive,
                  ]}
                >
                  {meal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>음식명</Text>
            {isGeminiAvailable() && (
              <TouchableOpacity
                style={styles.aiButton}
                onPress={handleAIApply}
                disabled={isAILoading || !foodName.trim()}
              >
                {isAILoading ? (
                  <>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.aiButtonText}>AI 분석 중...</Text>
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons name="robot" size={18} color="#fff" />
                    <Text style={styles.aiButtonText}>AI 적용 🤖</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="예: 김치찌개"
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>칼로리 (kcal) *</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 350"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
        </View>

        {/* 사진 추가 섹션 */}
        <View style={styles.section}>
          <Text style={styles.label}>사진 (선택사항)</Text>
          {photoUri ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photoUri }} style={styles.photoPreview} />
              <TouchableOpacity
                style={styles.removePhotoButton}
                onPress={handleRemovePhoto}
              >
                <MaterialCommunityIcons name="close-circle" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.photoButton}
              onPress={showPhotoOptions}
            >
              <MaterialCommunityIcons name="camera-plus" size={32} color={Theme.colors.text.secondary} />
              <Text style={styles.photoButtonText}>사진 추가</Text>
            </TouchableOpacity>
          )}
          {isUploadingPhoto && (
            <View style={styles.uploadingContainer}>
              <ActivityIndicator size="small" color={Theme.colors.primary} />
              <Text style={styles.uploadingText}>사진 업로드 중...</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>날짜</Text>
          <View style={styles.dateButtonContainer}>
            <TouchableOpacity
              style={[
                styles.dateButton,
                selectedDate.toDateString() === new Date().toDateString() && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(new Date())}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate.toDateString() === new Date().toDateString() && styles.dateButtonTextActive,
                ]}
              >
                오늘
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateButton,
                (() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  return selectedDate.toDateString() === yesterday.toDateString();
                })() && styles.dateButtonActive,
              ]}
              onPress={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                setSelectedDate(yesterday);
              }}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  (() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return selectedDate.toDateString() === yesterday.toDateString();
                  })() && styles.dateButtonTextActive,
                ]}
              >
                어제
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateButton,
                (() => {
                  const dayBefore = new Date();
                  dayBefore.setDate(dayBefore.getDate() - 2);
                  return selectedDate.toDateString() === dayBefore.toDateString();
                })() && styles.dateButtonActive,
              ]}
              onPress={() => {
                const dayBefore = new Date();
                dayBefore.setDate(dayBefore.getDate() - 2);
                setSelectedDate(dayBefore);
              }}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  (() => {
                    const dayBefore = new Date();
                    dayBefore.setDate(dayBefore.getDate() - 2);
                    return selectedDate.toDateString() === dayBefore.toDateString();
                  })() && styles.dateButtonTextActive,
                ]}
              >
                그제
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectedDateDisplay}>
            <MaterialCommunityIcons name="calendar" size={16} color="#666" />
            <Text style={styles.selectedDateText}>
              {selectedDate.toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>

        {/* 영양소 입력 토글 */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowNutrients(!showNutrients)}
        >
          <Text style={styles.toggleText}>
            {showNutrients ? '▼ 영양소 정보 숨기기' : '▶ 영양소 정보 추가 (선택사항)'}
          </Text>
        </TouchableOpacity>

        {/* 영양소 입력 필드들 */}
        {showNutrients && (
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientLabel}>단백질 (g)</Text>
                <TextInput
                  style={styles.nutrientInput}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={protein}
                  onChangeText={setProtein}
                />
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientLabel}>탄수화물 (g)</Text>
                <TextInput
                  style={styles.nutrientInput}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={carbs}
                  onChangeText={setCarbs}
                />
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientLabel}>지방 (g)</Text>
                <TextInput
                  style={styles.nutrientInput}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={fat}
                  onChangeText={setFat}
                />
              </View>
            </View>
            <Text style={styles.nutrientHint}>
              💡 영양소 정보는 선택사항입니다
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            ((!foodName || !calories) || isSubmitting) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!foodName || !calories || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting 
              ? (editingMeal ? '수정 중...' : '등록 중...') 
              : (editingMeal ? '수정하기' : '등록하기')}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 24,
  },
  editBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background.dark,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  editBannerText: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mealTypeButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  mealTypeText: {
    fontSize: 14,
    color: '#666',
  },
  mealTypeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#8B5CF6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  dateButtonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  dateButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dateButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedDateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  selectedDateText: {
    fontSize: 14,
    color: '#666',
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  photoButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 32,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: Theme.colors.text.secondary,
  },
  photoContainer: {
    position: 'relative',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  uploadingText: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
  },
  nutrientsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  nutrientRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  nutrientItem: {
    flex: 1,
  },
  nutrientLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  nutrientInput: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  nutrientHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});

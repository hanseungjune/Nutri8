/**
 * 이미지 관련 유틸리티
 * 7주차: 사진 첨부 기능
 */

import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { supabase } from './db/supabase';

/**
 * 카메라/갤러리 권한 요청
 */
export async function requestImagePermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return true; // 웹은 권한 불필요
  }

  // 카메라 권한
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  
  // 갤러리 권한
  const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  return cameraPermission.granted && mediaPermission.granted;
}

/**
 * 이미지 선택 (갤러리)
 */
export async function pickImageFromGallery(): Promise<string | null> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // 압축 (0.7 = 70% 품질)
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('이미지 선택 오류:', error);
    return null;
  }
}

/**
 * 사진 촬영 (카메라)
 */
export async function takePhoto(): Promise<string | null> {
  try {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('사진 촬영 오류:', error);
    return null;
  }
}

/**
 * Supabase Storage에 이미지 업로드
 */
export async function uploadMealPhoto(
  imageUriOrFile: string | File,
  mealId?: number
): Promise<string | null> {
  try {
    // 파일 이름 생성
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `meal_${mealId || 'temp'}_${timestamp}_${randomStr}.jpg`;

    // Blob 준비
    let fileBlob: Blob;
    
    if (typeof imageUriOrFile === 'string') {
      // URI 문자열인 경우 (네이티브 또는 웹의 Data URL)
      const response = await fetch(imageUriOrFile);
      fileBlob = await response.blob();
    } else {
      // File 객체인 경우 (웹)
      fileBlob = imageUriOrFile;
    }

    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from('meal-photos')
      .upload(fileName, fileBlob, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    // Public URL 생성
    const { data: urlData } = supabase.storage
      .from('meal-photos')
      .getPublicUrl(fileName);

    console.log('Image uploaded successfully:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return null;
  }
}

/**
 * Supabase Storage에서 이미지 삭제
 */
export async function deleteMealPhoto(photoUrl: string): Promise<boolean> {
  try {
    // URL에서 파일 경로 추출
    const urlParts = photoUrl.split('/meal-photos/');
    if (urlParts.length < 2) {
      console.error('Invalid photo URL');
      return false;
    }

    const fileName = urlParts[1];

    // Supabase Storage에서 삭제
    const { error } = await supabase.storage
      .from('meal-photos')
      .remove([fileName]);

    if (error) {
      console.error('Supabase delete error:', error);
      return false;
    }

    console.log('Image deleted successfully:', fileName);
    return true;
  } catch (error) {
    console.error('이미지 삭제 실패:', error);
    return false;
  }
}

/**
 * 이미지 URL 유효성 검사
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  
  return (
    url.startsWith('http://') || 
    url.startsWith('https://') ||
    url.startsWith('file://')
  );
}

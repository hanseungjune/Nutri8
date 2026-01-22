import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { Theme } from '../../constants/theme';
import {
  requestNotificationPermissions,
  loadNotificationSettings,
  saveNotificationSettings,
  initializeNotifications,
  type NotificationSettings,
} from '../../utils/notificationUtils';
import {
  requestWebNotificationPermission,
  saveWebNotificationSettings,
  loadWebNotificationSettings,
  sendTestNotification,
  isNotificationSupported,
  type WebNotificationSettings,
} from '../../utils/webNotificationUtils';
import { Card } from '../../components/common/Card';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    breakfast: { enabled: false, time: '08:00' },
    lunch: { enabled: false, time: '12:00' },
    dinner: { enabled: false, time: '18:00' },
    snack: { enabled: false, time: '15:00' },
  });
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    if (Platform.OS === 'web') {
      // 웹: localStorage에서 불러오기
      const saved = loadWebNotificationSettings();
      setSettings(saved);
      
      // 웹 알림 권한 확인
      if ('Notification' in window) {
        setHasPermission(Notification.permission === 'granted');
      }
    } else {
      // 네이티브: AsyncStorage에서 불러오기
      const saved = await loadNotificationSettings();
      setSettings(saved);
      
      const permission = await requestNotificationPermissions();
      setHasPermission(permission);
    }
  };

  const handleToggleMain = async (value: boolean) => {
    if (Platform.OS === 'web') {
      // 웹: 브라우저 알림 권한 요청
      if (value && !hasPermission) {
        const permission = await requestWebNotificationPermission();
        if (!permission) {
          Alert.alert('권한 필요', '알림을 사용하려면 브라우저 알림 권한이 필요합니다.\n\n브라우저 주소창의 🔒 아이콘을 클릭하여 알림을 허용해주세요.');
          return;
        }
        setHasPermission(true);
      }

      const newSettings = { ...settings, enabled: value };
      setSettings(newSettings);
      saveWebNotificationSettings(newSettings);
    } else {
      // 네이티브: expo-notifications 사용
      if (value && !hasPermission) {
        const permission = await requestNotificationPermissions();
        if (!permission) {
          Alert.alert('권한 필요', '알림을 사용하려면 알림 권한이 필요합니다.');
          return;
        }
        setHasPermission(true);
      }

      const newSettings = { ...settings, enabled: value };
      setSettings(newSettings);
      await saveNotificationSettings(newSettings);
      await initializeNotifications(newSettings);
    }
  };

  const handleToggleMeal = async (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    value: boolean
  ) => {
    const newSettings = {
      ...settings,
      [mealType]: { ...settings[mealType], enabled: value },
    };
    setSettings(newSettings);
    
    if (Platform.OS === 'web') {
      saveWebNotificationSettings(newSettings);
    } else {
      await saveNotificationSettings(newSettings);
      if (settings.enabled) {
        await initializeNotifications(newSettings);
      }
    }
  };

  const handleChangeTime = (
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    time: string
  ) => {
    if (Platform.OS === 'web') {
      // 웹: prompt 사용
      const newTime = prompt(`${mealTypeLabels[mealType]} 알림 시간을 입력하세요 (HH:MM)`, time);
      if (!newTime) return;
      
      // 시간 형식 검증
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(newTime)) {
        alert('올바른 시간 형식을 입력하세요 (예: 08:00)');
        return;
      }

      const newSettings = {
        ...settings,
        [mealType]: { ...settings[mealType], time: newTime },
      };
      setSettings(newSettings);
      saveWebNotificationSettings(newSettings);
    } else {
      // 네이티브: Alert.prompt 사용
      Alert.prompt(
        '시간 설정',
        `${mealTypeLabels[mealType]} 알림 시간을 입력하세요 (HH:MM)`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '저장',
            onPress: async (newTime?: string) => {
              if (!newTime) return;
              
              // 시간 형식 검증
              const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
              if (!timeRegex.test(newTime)) {
                Alert.alert('오류', '올바른 시간 형식을 입력하세요 (예: 08:00)');
                return;
              }

              const newSettings = {
                ...settings,
                [mealType]: { ...settings[mealType], time: newTime },
              };
              setSettings(newSettings);
              await saveNotificationSettings(newSettings);
              if (settings.enabled) {
                await initializeNotifications(newSettings);
              }
            },
          },
        ],
        'plain-text',
        time
      );
    }
  };

  const mealTypeLabels = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  };

  // iOS 체크
  const isIOS = Platform.OS === 'ios' || (Platform.OS === 'web' && /iPad|iPhone|iPod/.test(navigator.userAgent));
  const isWebNotSupported = Platform.OS === 'web' && !isNotificationSupported();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>알림 설정</Text>

        {/* 모바일 안내 메시지 */}
        {isIOS && (
          <Card style={[styles.warningCard, { backgroundColor: '#FFF3CD' }]}>
            <Text style={[styles.warningTitle, { color: '#856404' }]}>⚠️ iOS 알림 제한</Text>
            <Text style={[styles.warningText, { color: '#856404' }]}>
              iOS(iPhone/iPad)는 웹 알림을 지원하지 않습니다.{'\n\n'}
              📱 대신 다음 방법을 사용하세요:{'\n'}
              • 폰의 기본 알람 앱 사용{'\n'}
              • 매일 같은 시간에 앱 확인 습관{'\n'}
              • Android 기기에서는 알림 가능
            </Text>
          </Card>
        )}

        {isWebNotSupported && !isIOS && (
          <Card style={[styles.warningCard, { backgroundColor: '#D1ECF1' }]}>
            <Text style={[styles.warningTitle, { color: '#0C5460' }]}>💡 안정적인 알림을 위해</Text>
            <Text style={[styles.warningText, { color: '#0C5460' }]}>
              홈 화면에 추가하면 더 안정적으로 알림을 받을 수 있습니다!{'\n\n'}
              📱 추가 방법:{'\n'}
              1. 브라우저 메뉴 (⋮) 열기{'\n'}
              2. "홈 화면에 추가" 선택{'\n'}
              3. 홈 화면의 Nutri8 아이콘으로 실행
            </Text>
          </Card>
        )}

        {/* 메인 토글 */}
        <Card style={styles.mainCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>알림 사용</Text>
              <Text style={styles.settingDescription}>
                식사 시간 알림을 받습니다
              </Text>
            </View>
            <Switch
              value={settings.enabled}
              onValueChange={handleToggleMain}
              trackColor={{ false: '#ccc', true: Theme.colors.primaryLight }}
              thumbColor={settings.enabled ? Theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </Card>

        {/* 식사별 설정 */}
        {settings.enabled && (
          <>
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mealType) => (
              <Card key={mealType} style={styles.mealCard}>
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.mealTitle}>
                      {mealTypeLabels[mealType]} 🍽️
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleChangeTime(mealType, settings[mealType].time)}
                    >
                      <Text style={styles.timeText}>
                        {settings[mealType].time} (탭하여 변경)
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Switch
                    value={settings[mealType].enabled}
                    onValueChange={(value) => handleToggleMeal(mealType, value)}
                    trackColor={{ false: '#ccc', true: Theme.colors.primaryLight }}
                    thumbColor={settings[mealType].enabled ? Theme.colors.primary : '#f4f3f4'}
                  />
                </View>
              </Card>
            ))}
          </>
        )}

        {/* 테스트 알림 버튼 (웹에서만 표시) */}
        {Platform.OS === 'web' && (
          <TouchableOpacity
            style={styles.testButton}
            onPress={sendTestNotification}
          >
            <Text style={styles.testButtonText}>🔔 테스트 알림 보내기</Text>
          </TouchableOpacity>
        )}

        {/* 안내 */}
        <View style={styles.infoBox}>
          {Platform.OS === 'web' ? (
            <>
              <Text style={styles.infoText}>
                💡 웹 브라우저 알림을 사용합니다.
              </Text>
              <Text style={styles.infoText}>
                💡 알림을 받으려면 브라우저 탭을 열어두어야 합니다.
              </Text>
              <Text style={styles.infoText}>
                💡 시간을 탭하여 변경할 수 있습니다.
              </Text>
              <Text style={styles.infoText}>
                💡 알림은 매일 설정한 시간에 자동으로 전송됩니다.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>
                💡 알림은 매일 설정한 시간에 반복됩니다.
              </Text>
              <Text style={styles.infoText}>
                💡 시간을 탭하여 변경할 수 있습니다.
              </Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
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
  warningCard: {
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.base,
  },
  warningTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    marginBottom: Theme.spacing.xs,
  },
  warningText: {
    fontSize: Theme.typography.fontSize.sm,
    lineHeight: 20,
  },
  mainCard: {
    marginBottom: Theme.spacing.md,
  },
  mealCard: {
    marginBottom: Theme.spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  settingDescription: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  mealTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  timeText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  infoBox: {
    backgroundColor: Theme.colors.primaryBg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.base,
    marginTop: Theme.spacing.xl,
  },
  infoText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  webNotice: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.warning,
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  webNoticeSubtext: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.base,
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testButtonText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: '#fff',
  },
});
